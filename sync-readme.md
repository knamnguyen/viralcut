# Repository Sync Tool

This is a simple CLI tool to automate synchronization between your project repository and template/other repositories.

## Prerequisites

- Bun.js installed (https://bun.sh/)
- Git repositories properly set up with remotes as described in [README-sassy-template.md](./README-sassy-template.md)

## Installation

1. Make sure the script has execute permissions:

```bash
chmod +x sync-repos.ts
```

2. Install dependencies:

```bash
bun install @types/node
```

## Usage

Run the script from the root of your repository:

```bash
./sync-repos.ts
```

Or using bun directly:

```bash
bun sync-repos.ts
```

## Features

The tool will guide you through an interactive process:

1. Displays current repository name and available remotes
2. Lets you choose sync direction:
   - Push changes from current repo to a remote
   - Pull changes from a remote to current repo
3. Select what to sync:
   - Package(s) - lists and lets you choose packages from the `packages/` directory
   - Individual file(s)/path(s) - lets you specify paths manually
4. Confirms your selections before proceeding
5. Executes the sync process automatically
6. Offers cleanup if the process fails

## Example Workflow

### Pushing Changes to Template

```
🔄 Repository Sync Tool 🔄
==========================

Current repository: founderlog
Available remotes:
1. template

Choose sync direction:
1. Push changes from this repo to remote
2. Pull changes from remote to this repo
Choice (1-2): 1

Choose target remote (1-1): 1

Syncing FROM founderlog TO template

Choose what to sync:
1. Package(s)
2. Individual file(s)/path(s)
Choice (1-2): 1

Available packages:
1. api
2. db
3. stripe
4. ui
5. validators

Enter package numbers to sync (comma-separated, e.g., 1,3,4): 3

Paths selected for sync:
- packages/stripe

Proceed with sync? (y/n): y

🚀 Starting sync process...

Running: git checkout main
Running: git checkout -b founderlog-to-template
Running: git add packages/stripe
Running: git commit -m "Update Stripe package with new payment flow"
Running: git push template founderlog-to-template:main
Running: git checkout main

✅ Successfully pushed changes to template's main branch!
```

### Pulling Changes from Template

```
Current repository: founderlog
Available remotes:
1. template

Choose sync direction:
1. Push changes from this repo to remote
2. Pull changes from remote to this repo
Choice (1-2): 2

Choose source remote (1-1): 1

Syncing FROM template TO founderlog

Choose what to sync:
1. Package(s)
2. Individual file(s)/path(s)
Choice (1-2): 2

Enter file/directory paths to sync (comma-separated, e.g., packages/ui/src/Button.tsx,apps/web/pages): packages/validators/src

Paths selected for sync:
- packages/validators/src

Proceed with sync? (y/n): y

🚀 Starting sync process...

Running: git checkout main
Running: git fetch template main
Running: git checkout -b template-to-founderlog
Running: git checkout template/main -- packages/validators/src
Running: git add .
Running: git commit -m "Pull updated validators from template"
Running: git checkout main
Running: git merge template-to-founderlog
Running: git branch -d template-to-founderlog

✅ Successfully pulled changes from template to main branch!
```

## Troubleshooting

If the sync process fails, the script will offer to help with cleanup. This will:
1. Switch back to the main branch
2. Delete the temporary sync branch

For any other issues, refer to the error messages displayed in the console. 