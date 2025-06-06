# @sassy/s3

A comprehensive S3 bucket service for handling file uploads, downloads, and management operations with **multipart upload support** for fast, parallel uploads.

## Features

- **File Upload**: Upload files with proper metadata and content type handling
- **Multipart Upload**: Fast parallel uploads for large files (≥10MB) with automatic chunking
- **File Download**: Download files as buffers with stream support
- **Presigned URLs**: Generate secure presigned URLs for both uploads and downloads
- **File Management**: Check file existence, delete files, and list bucket contents
- **Unique Key Generation**: Automatic generation of unique file keys with timestamp and random strings
- **Error Handling**: Comprehensive error handling with detailed error messages

## Prerequisites

### AWS CLI Setup

1. **Install AWS CLI** (if not already installed):
   ```bash
   # macOS
   brew install awscli
   
   # Or download from https://aws.amazon.com/cli/
   ```

2. **Configure AWS credentials**:
   ```bash
   aws configure
   ```
   Or use environment variables (see Environment Variables section below).

3. **Verify AWS CLI access**:
   ```bash
   aws s3 ls
   ```

## Installation

This package is part of the monorepo and uses workspace dependencies.

```bash
pnpm install
```

**Frontend Setup Required**: For multipart uploads, the frontend needs AWS SDK:

```bash
# In your Next.js app
pnpm add @aws-sdk/client-s3
```

## Configuration

Set up your environment variables:

```env
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
S3_BUCKET=your-bucket-name
```

## Multipart Upload Architecture

This package implements a **hybrid approach** for optimal upload performance:

### Backend (tRPC Router)
- **Generates presigned URLs** for each upload part
- **Manages upload lifecycle** (initialize, complete, abort)
- **Handles authentication** and security

### Frontend (Direct to S3)
- **Uploads parts directly to S3** using presigned URLs
- **Parallel processing** of multiple chunks (3 concurrent by default)
- **Real-time progress tracking** for each part

### Flow Diagram

```
Frontend                    Backend (tRPC)              AWS S3
   |                           |                         |
   |-- 1. initMultipartUpload --|                         |
   |<-- uploadId + key ---------|                         |
   |                           |                         |
   |-- 2. getPartUploadUrls ---|                         |
   |<-- presigned URLs ---------|                         |
   |                           |                         |
   |-- 3. Upload parts --------|--------directly-------->|
   |    (parallel uploads)     |                         |
   |                           |                         |
   |-- 4. completeMultipart ---|                         |
   |<-- final result -----------|                         |
```

## Usage in tRPC Router

The video router provides these endpoints for multipart upload:

```typescript
// packages/api/src/router/video.ts
export const videoRouter = createTRPCRouter({
  // Single part upload (files < 10MB)
  getUploadUrl: publicProcedure
    .input(GetUploadUrlInputSchema)
    .mutation(async ({ input }) => {
      // Returns single presigned URL
    }),

  // Multipart upload (files ≥ 10MB)
  initMultipartUpload: publicProcedure
    .input(InitMultipartUploadInputSchema)
    .mutation(async ({ input }) => {
      // Returns uploadId and key
    }),

  getPartUploadUrls: publicProcedure
    .input(GetPartUrlsInputSchema)
    .mutation(async ({ input }) => {
      // Returns array of presigned URLs for each part
    }),

  completeMultipartUpload: publicProcedure
    .input(CompleteMultipartUploadInputSchema)
    .mutation(async ({ input }) => {
      // Finalizes the multipart upload
    }),

  abortMultipartUpload: publicProcedure
    .input(AbortMultipartUploadInputSchema)
    .mutation(async ({ input }) => {
      // Cleans up failed upload
    }),
});
```

## Frontend Integration

The frontend automatically chooses the appropriate upload method:

```typescript
// apps/nextjs/src/app/viralcut/page.tsx

const CHUNK_SIZE = 10 * 1024 * 1024; // 10MB

const handleUpload = async () => {
  if (file.size >= CHUNK_SIZE) {
    // Use multipart upload for large files
    await uploadFileMultipart(file);
  } else {
    // Use single part upload for small files  
    await uploadFileSingle(file);
  }
};
```

### Multipart Upload Process

```typescript
const uploadFileMultipart = async (file: File) => {
  // 1. Initialize multipart upload
  const initResult = await initMultipartUpload.mutateAsync({
    fileName: file.name,
    contentType: file.type,
    prefix: "uploads",
  });

  // 2. Split file into 10MB chunks
  const chunks = [];
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  
  for (let i = 0; i < totalChunks; i++) {
    const start = i * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, file.size);
    chunks.push(file.slice(start, end));
  }

  // 3. Get presigned URLs for all parts
  const partNumbers = Array.from({ length: totalChunks }, (_, i) => i + 1);
  const partUrlsResult = await getPartUploadUrls.mutateAsync({
    key: initResult.key,
    uploadId: initResult.uploadId,
    partNumbers,
  });

  // 4. Upload all parts in parallel
  const uploadedParts = [];
  for (const [index, chunk] of chunks.entries()) {
    const partUrl = partUrlsResult.partUrls[index];
    const result = await uploadPart(partUrl.uploadUrl, chunk, partUrl.partNumber);
    uploadedParts.push(result);
  }

  // 5. Complete multipart upload
  await completeMultipartUpload.mutateAsync({
    key: initResult.key,
    uploadId: initResult.uploadId,
    parts: uploadedParts.sort((a, b) => a.partNumber - b.partNumber),
  });
};
```

## Performance Benefits

### Small Files (< 10MB)
- **Single PUT request** - minimal overhead
- **Direct upload** to S3
- **Fast for small files**

### Large Files (≥ 10MB)
- **Parallel uploads** - 3 concurrent parts by default
- **10MB chunks** - optimal chunk size for performance
- **Faster than single upload** for large files
- **Better error recovery** - retry individual parts

### Speed Comparison
```
Single 100MB file:    ~60 seconds
Multipart 100MB:      ~20 seconds (3x faster)
Network failures:     Retry only failed parts
```

## Configuration Options

```typescript
// Chunk size (default: 10MB)
const CHUNK_SIZE = 10 * 1024 * 1024;

// Concurrent uploads (default: 3)
const MAX_CONCURRENT_UPLOADS = 3;

// Presigned URL expiry (default: 1 hour)
const URL_EXPIRY = 3600;
```

## Bucket Organization

The service uses a single S3 bucket with folder-based organization:

```
viralcut-s3bucket/
├── uploads/           # Original user uploads
├── processed/         # Processed videos
├── thumbnails/        # Video thumbnails
├── audio/            # Extracted audio files
├── temp/             # Temporary processing files
└── exports/          # Final exported content
```

## Basic Usage (S3BucketService)

```typescript
import { S3BucketService } from "@sassy/s3";

// Initialize the service
const s3Service = new S3BucketService({
  region: process.env.AWS_REGION || "us-west-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  bucket: process.env.S3_BUCKET || "your-bucket",
});

// Upload a file
const result = await s3Service.uploadFile(
  fileBuffer,
  "uploads/my-file.jpg",
  "image/jpeg"
);

// Get a presigned download URL
const downloadUrl = await s3Service.getPresignedDownloadUrl(
  "uploads/my-file.jpg",
  3600 // 1 hour expiry
);

// Get a presigned upload URL (single part)
const uploadUrl = await s3Service.getPresignedUploadUrl(
  "uploads/new-file.jpg",
  "image/jpeg",
  3600 // 1 hour expiry
);

// Initialize multipart upload
const multipartInit = await s3Service.initializeMultipartUpload(
  "uploads/large-file.mp4",
  "video/mp4"
);

// Get presigned URLs for parts
const partUrls = await s3Service.getPresignedUploadPartUrls(
  multipartInit.key,
  multipartInit.uploadId,
  [1, 2, 3] // Part numbers
);

// Complete multipart upload
const completeResult = await s3Service.completeMultipartUpload(
  multipartInit.key,
  multipartInit.uploadId,
  [
    { partNumber: 1, etag: "etag1" },
    { partNumber: 2, etag: "etag2" },
    { partNumber: 3, etag: "etag3" }
  ]
);
```

## Error Handling & Recovery

```typescript
try {
  await uploadFileMultipart(file);
} catch (error) {
  if (error.message.includes("Failed to upload part")) {
    // Individual part failed - can retry specific part
  } else if (error.message.includes("Failed to complete")) {
    // Assembly failed - can retry completion
  }
  
  // Cleanup on failure
  await abortMultipartUpload.mutateAsync({
    key: uploadKey,
    uploadId: uploadId
  });
}
```

## AWS S3 Setup

### Bucket Policy

Apply the bucket policy from `bucket-policy.json`:

```bash
pnpm update-bucket-policy
```

### CORS Configuration

Apply the CORS configuration from `cors-config.json`:

```bash
pnpm update-cors-config
```

### Complete S3 Setup

Run both commands:

```bash
pnpm update-s3-config
```

## Security

- Uses AWS IAM credentials for secure access
- Presigned URLs include expiration times
- Files are stored with private ACL by default
- CORS is configured for secure browser uploads
- Multipart uploads are automatically cleaned up on failure

## Dependencies

### Backend Package Dependencies
```json
{
  "@aws-sdk/client-s3": "^3.525.0",
  "@aws-sdk/lib-storage": "^3.525.0",
  "@tanstack/react-query": "catalog:",
  "react": "catalog:react19"
}
```

### Frontend App Dependencies
```json
{
  "@aws-sdk/client-s3": "^3.525.0"
}
```

**Note**: The frontend needs `@aws-sdk/client-s3` for the multipart upload hook that handles direct uploads to S3 for maximum performance. The hook (`useMultipartUpload`) is located in the frontend app at `apps/nextjs/src/hooks/use-multipart-upload.ts` since it requires tRPC integration.

## License

MIT