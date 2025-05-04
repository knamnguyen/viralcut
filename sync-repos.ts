#!/usr/bin/env bun

import { exec } from 'child_process';
import { promisify } from 'util';
import readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';

const execPromise = promisify(exec);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}

// Execute command and log output
async function runCommand(command: string, cwd?: string): Promise<string> {
  try {
    console.log(`Running: ${command}`);
    const { stdout, stderr } = await execPromise(command, { cwd });
    if (stderr) console.error(`stderr: ${stderr}`);
    return stdout.trim();
  } catch (error: any) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    if (error.stderr) console.error(error.stderr);
    throw error;
  }
}

// Get git root directory
async function getGitRoot(): Promise<string> {
  return await runCommand('git rev-parse --show-toplevel');
}

// Get current repository name
async function getCurrentRepoName(): Promise<string> {
  const remoteUrl = await runCommand('git remote get-url origin');
  const match = remoteUrl.match(/\/([^\/]+?)(\.git)?$/);
  return match ? match[1] : '';
}

// Get list of remotes
async function getRemotes(): Promise<string[]> {
  const remotes = await runCommand('git remote');
  return remotes.split('\n').filter(remote => remote !== 'origin');
}

async function syncRepos() {
  console.log('🔄 Repository Sync Tool - Pull-Only Mode 🔄');
  console.log('=========================================\n');

  // Get current repository info
  const gitRoot = await getGitRoot();
  const currentRepo = await getCurrentRepoName();
  console.log(`Current repository: ${currentRepo}`);
  
  // Get available remotes
  const remotes = await getRemotes();
  
  if (remotes.length === 0) {
    console.error('Error: No remote repositories found other than origin.');
    console.log('Please set up remote repositories first as described in README-sassy-template.md');
    process.exit(1);
  }
  
  console.log('Available remotes:');
  remotes.forEach((remote, index) => {
    console.log(`${index + 1}. ${remote}`);
  });

  // Choose remote to pull from
  const remoteIndex = parseInt(await question(`\nChoose remote to sync FROM (1-${remotes.length}): `)) - 1;
  if (remoteIndex < 0 || remoteIndex >= remotes.length) {
    console.error('Invalid remote selection');
    process.exit(1);
  }
  
  const sourceRemote = remotes[remoteIndex];
  const branchName = `update-from-${sourceRemote}`;
  console.log(`\nPulling changes FROM ${sourceRemote} TO ${currentRepo}`);

  // Fetch latest changes from the remote
  await runCommand(`git fetch ${sourceRemote} main`);

  // Choose sync type
  const syncType = await question(
    '\nChoose what to sync:\n1. Package(s)\n2. Individual file(s)/path(s)\nChoice (1-2): '
  );

  // Get paths to sync
  let pathsToSync: string[] = [];
  
  if (syncType === '1') {
    // Package sync
    // List packages
    const packagesDir = path.join(gitRoot, 'packages');
    if (fs.existsSync(packagesDir)) {
      const packages = fs.readdirSync(packagesDir)
        .filter(item => fs.statSync(path.join(packagesDir, item)).isDirectory());
      
      console.log('\nAvailable packages:');
      packages.forEach((pkg, index) => {
        console.log(`${index + 1}. ${pkg}`);
      });
      
      const selectedPackages = await question('\nEnter package numbers to sync (comma-separated, e.g., 1,3,4): ');
      pathsToSync = selectedPackages.split(',')
        .map(num => parseInt(num.trim()) - 1)
        .filter(index => index >= 0 && index < packages.length)
        .map(index => `packages/${packages[index]}`);
    } else {
      console.error('Packages directory not found');
      process.exit(1);
    }
  } else if (syncType === '2') {
    // File sync
    const filePaths = await question('\nEnter file/directory paths to sync (comma-separated, e.g., packages/ui/src/Button.tsx,apps/web/pages): ');
    pathsToSync = filePaths.split(',').map(path => path.trim());
  } else {
    console.error('Invalid choice');
    process.exit(1);
  }

  if (pathsToSync.length === 0) {
    console.error('No valid paths selected for sync');
    process.exit(1);
  }

  console.log('\nPaths selected for sync:');
  pathsToSync.forEach(path => console.log(`- ${path}`));
  
  const confirmSync = await question('\nProceed with sync? (y/n): ');
  if (confirmSync.toLowerCase() !== 'y') {
    console.log('Sync canceled');
    process.exit(0);
  }

  try {
    // Execute the sync
    console.log('\n🚀 Starting sync process...\n');
    
    // Create branch
    await runCommand(`git checkout main`);
    await runCommand(`git checkout -b ${branchName}`);
    
    // Checkout files/paths from remote
    for (const pathToSync of pathsToSync) {
      await runCommand(`git checkout ${sourceRemote}/main -- ${pathToSync}`);
    }
    
    // Show the changes that will be made
    console.log('\nReviewing changes:');
    try {
      const diff = await runCommand(`git diff --staged --stat`);
      console.log(diff || 'No changes detected');
      
      if (!diff) {
        console.log('No changes detected. Exiting.');
        await runCommand(`git checkout main`);
        await runCommand(`git branch -D ${branchName}`);
        process.exit(0);
      }
    } catch (error) {
      console.log('Unable to show diff');
    }
    
    // Confirm changes after review
    const confirmAfterReview = await question('\nConfirm these changes? (y/n): ');
    if (confirmAfterReview.toLowerCase() !== 'y') {
      console.log('Sync canceled after review');
      await runCommand(`git checkout main`);
      await runCommand(`git branch -D ${branchName}`);
      process.exit(0);
    }
    
    // Commit
    await runCommand(`git add .`);
    const commitMessage = await question('\nEnter commit message: ');
    await runCommand(`git commit -m "${commitMessage}"`);
    
    // Merge to main
    await runCommand(`git checkout main`);
    await runCommand(`git merge ${branchName}`);
    
    // Cleanup
    await runCommand(`git branch -d ${branchName}`);
    
    console.log(`\n✅ Successfully synced changes from ${sourceRemote} to ${currentRepo}!`);
    
  } catch (error: any) {
    console.error('\n❌ Sync process failed!');
    console.error('You may have merge conflicts that need to be resolved manually.');
    
    // Offer cleanup options
    const cleanup = await question('\nWould you like to:\n1. Abort merge and cleanup\n2. Keep branch for manual conflict resolution\nChoice (1-2): ');
    
    if (cleanup === '1') {
      try {
        await runCommand(`git merge --abort`);
        await runCommand(`git checkout main`);
        await runCommand(`git branch -D ${branchName}`);
        console.log('\nCleanup completed. Sync aborted.');
      } catch (cleanupError) {
        console.error('Cleanup failed, you may need to manually reset your repository');
      }
    } else {
      console.log(`\nLeft branch '${branchName}' for you to resolve conflicts manually.`);
      console.log('After resolving conflicts, complete the process with:');
      console.log(`  git add .`);
      console.log(`  git commit -m "Resolve merge conflicts"`);
      console.log(`  git checkout main`);
      console.log(`  git merge ${branchName}`);
      console.log(`  git branch -d ${branchName}`);
    }
    
    process.exit(1);
  }
}

// Run the main function
syncRepos().finally(() => {
  rl.close();
}); 