# @sassy/s3

S3 bucket service for handling file uploads, downloads, and management for the ViralCut application.

## Features

- Upload files to S3
- Download files from S3
- Generate presigned URLs for upload/download
- Delete files from S3
- Check if files exist
- List files in a bucket
- Generate unique file keys

## Installation

This package is part of the ViralCut monorepo and is installed automatically.

## Usage

### Initialize the S3BucketService

```typescript
import { S3BucketService } from "@sassy/s3";

const s3Service = new S3BucketService({
  region: "us-west-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  uploadBucket: "viralcut-uploads",
  processedBucket: "viralcut-processed", // Optional, defaults to uploadBucket
});
```

### Upload a file

```typescript
// Upload from a buffer, blob, or stream
const fileBuffer = Buffer.from("Hello, world!");
const result = await s3Service.uploadFile(
  fileBuffer,
  "hello.txt",
  "text/plain",
  { userId: "123" } // Optional metadata
);

console.log(`File uploaded to: ${result.location}`);
```

### Generate a presigned URL for direct upload

```typescript
// Generate a presigned URL for client-side upload
const key = s3Service.generateUniqueKey("video.mp4", "uploads");
const uploadUrl = await s3Service.getPresignedUploadUrl(key, "video/mp4", 3600);

// Send this URL to the client for direct upload
console.log(`Upload URL: ${uploadUrl}`);
```

### Download a file

```typescript
// Download a file as a buffer
const fileBuffer = await s3Service.downloadFile("hello.txt");

// Or get a presigned URL for direct download
const downloadUrl = await s3Service.getPresignedDownloadUrl("hello.txt", undefined, 3600);
console.log(`Download URL: ${downloadUrl}`);
```

### Delete a file

```typescript
const deleted = await s3Service.deleteFile("hello.txt");
console.log(`File deleted: ${deleted}`);
```

### Check if a file exists

```typescript
const exists = await s3Service.fileExists("hello.txt");
console.log(`File exists: ${exists}`);
```

### List files in a bucket

```typescript
// List all files with a prefix
const files = await s3Service.listFiles("uploads/", undefined, 100);
console.log(`Found ${files.length} files`);
```

## Environment Variables

The following environment variables should be set:

```
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
S3_UPLOAD_BUCKET=viralcut-uploads
S3_PROCESSED_BUCKET=viralcut-processed
```

## License

MIT 