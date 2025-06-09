#!/usr/bin/env bun

import { parseMedia } from '@remotion/media-parser';

const VIDEO_URL = 'https://viralcut-s3bucket.s3.us-west-2.amazonaws.com/uploads%2F1749454504863-ikkpy1mr-ivatar_code_overview.mp4';
const SPEED_MULTIPLIER = 0.5;
const FPS = 30;

console.log('🔍 Testing video metadata detection with parseMedia()...');
console.log('📹 Video URL:', VIDEO_URL);
console.log('⚡ Speed Multiplier:', SPEED_MULTIPLIER);
console.log('');

try {
  console.log('🔄 Parsing video metadata...');
  const { durationInSeconds, dimensions } = await parseMedia({
    src: VIDEO_URL,
    fields: {
      durationInSeconds: true,
      dimensions: true,
    },
    acknowledgeRemotionLicense: true,
  });
  
  if (durationInSeconds === null) {
    throw new Error('Could not determine video duration');
  }
  
  console.log('✅ Metadata parsed successfully:');
  console.log('⏱️  Duration (seconds):', durationInSeconds);
  console.log('📐 Width:', dimensions?.width);
  console.log('📏 Height:', dimensions?.height);
  console.log('');
  
  const originalDurationInFrames = Math.ceil(durationInSeconds * FPS);
  const adjustedDurationInFrames = Math.ceil(originalDurationInFrames / SPEED_MULTIPLIER);
  
  console.log('📊 Calculated values:');
  console.log('🎬 Original frames (at 30fps):', originalDurationInFrames);
  console.log('🐌 Adjusted frames (slowed down):', adjustedDurationInFrames);
  console.log('⏰ Final duration (seconds):', adjustedDurationInFrames / FPS);
  console.log('⏰ Final duration (minutes):', (adjustedDurationInFrames / FPS) / 60);
  console.log('');
  console.log('🎉 This should now work correctly in Lambda calculateMetadata!');
  
} catch (error) {
  console.error('❌ Failed to parse video metadata:', error);
  console.log('');
  console.log('🔧 This might be why your composition is falling back to 18000 frames (10 minutes)');
  console.log('Possible causes:');
  console.log('- S3 URL access issues');
  console.log('- CORS headers missing on S3 bucket');
  console.log('- Video file format issues');
  console.log('- Network connectivity problems');
} 