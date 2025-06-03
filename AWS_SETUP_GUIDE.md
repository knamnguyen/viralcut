# AWS S3 Setup Guide for ViralCut

## Quick Start Summary

After following this guide, you'll have:
- ✅ Single IAM user: `viralcut-user` (for both S3 and Remotion)
- ✅ Single S3 bucket: `viralcut-[your-suffix]`
- ✅ Folder structure: `uploads/`, `processed/`, `thumbnails/`
- ✅ Combined permissions for S3 + Remotion Lambda
- ✅ Video upload working at `/viralcut`

**Required Environment Variables:**
```env
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET=viralcut-[your-suffix]
```

## Prerequisites
- AWS Account (create at https://aws.amazon.com/)
- Basic understanding of AWS Console

## Step 1: Create S3 Bucket

1. **Login to AWS Console**
   - Go to https://console.aws.amazon.com/
   - Login with your AWS credentials

2. **Navigate to S3**
   - Search for "S3" in the services search bar
   - Click on "S3" service

3. **Create Single Bucket**
   - Click "Create bucket"
   - **Bucket name**: `viralcut-[your-unique-suffix]` (must be globally unique)
   - **AWS Region**: Choose closest to your users (e.g., `us-west-2`)
   - **Object Ownership**: Keep "ACLs disabled" (recommended)
   - **Block all public access**: Keep checked (we'll use presigned URLs)
   - **Bucket Versioning**: Disable (for now)
   - **Default encryption**: Enable with Amazon S3 managed keys (SSE-S3)
   - Click "Create bucket"

4. **Folder Structure** (created automatically when uploading)
   - `uploads/` - For original video files
   - `processed/` - For processed video files (future use)
   - `thumbnails/` - For video thumbnails (future use)

## Step 2: Create Single IAM User (Combined Permissions)

1. **Navigate to IAM**
   - Search for "IAM" in AWS Console
   - Click on "IAM" service

2. **Create New User**
   - Click "Users" in left sidebar
   - Click "Create user"
   - **User name**: `viralcut-user`
   - **Select AWS access type**: Check "Programmatic access"
   - Click "Next"

3. **Create Combined Policy**
   - Click "Attach existing policies directly"
   - Click "Create policy"
   - Choose "JSON" tab and paste this **combined policy**:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "ViralCutS3Access",
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:ListBucket",
                "s3:GetObjectAcl",
                "s3:PutObjectAcl"
            ],
            "Resource": [
                "arn:aws:s3:::viralcut-[your-suffix]",
                "arn:aws:s3:::viralcut-[your-suffix]/*"
            ]
        },
        {
            "Sid": "RemotionS3Access",
            "Effect": "Allow",
            "Action": [
                "s3:CreateBucket",
                "s3:ListBucket",
                "s3:PutBucketAcl",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:PutObjectAcl",
                "s3:PutObject",
                "s3:GetBucketLocation",
                "s3:DeleteBucket",
                "s3:PutBucketOwnershipControls",
                "s3:PutBucketPublicAccessBlock",
                "s3:PutLifecycleConfiguration"
            ],
            "Resource": [
                "arn:aws:s3:::remotionlambda-*",
                "arn:aws:s3:::remotionlambda-*/*"
            ]
        },
        {
            "Sid": "RemotionLambdaAccess",
            "Effect": "Allow",
            "Action": [
                "lambda:InvokeFunction",
                "lambda:InvokeAsync",
                "lambda:CreateFunction",
                "lambda:DeleteFunction",
                "lambda:PutFunctionEventInvokeConfig",
                "lambda:PutRuntimeManagementConfig",
                "lambda:TagResource",
                "lambda:ListFunctions",
                "lambda:GetFunction"
            ],
            "Resource": [
                "arn:aws:lambda:*:*:function:remotion-render-*"
            ]
        },
        {
            "Sid": "RemotionIAMAccess",
            "Effect": "Allow",
            "Action": [
                "iam:PassRole",
                "iam:SimulatePrincipalPolicy"
            ],
            "Resource": [
                "arn:aws:iam::*:role/remotion-lambda-role"
            ]
        },
        {
            "Sid": "RemotionLogsAccess",
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents",
                "logs:PutRetentionPolicy"
            ],
            "Resource": [
                "arn:aws:logs:*:*:log-group:/aws/lambda/remotion-render-*",
                "arn:aws:logs:*:*:log-group:/aws/lambda-insights:*"
            ]
        },
        {
            "Sid": "RemotionQuotasAccess",
            "Effect": "Allow",
            "Action": [
                "servicequotas:GetServiceQuota",
                "servicequotas:GetAWSDefaultServiceQuota",
                "servicequotas:RequestServiceQuotaIncrease",
                "servicequotas:ListRequestedServiceQuotaChangeHistoryByQuota"
            ],
            "Resource": ["*"]
        },
        {
            "Sid": "RemotionLayersAccess",
            "Effect": "Allow",
            "Action": [
                "lambda:GetLayerVersion"
            ],
            "Resource": [
                "arn:aws:lambda:*:678892195805:layer:remotion-binaries-*",
                "arn:aws:lambda:*:580247275435:layer:LambdaInsightsExtension*"
            ]
        },
        {
            "Sid": "GeneralS3ListAccess",
            "Effect": "Allow",
            "Action": [
                "s3:ListAllMyBuckets"
            ],
            "Resource": ["*"]
        }
    ]
}
```

   - **Replace `[your-suffix]`** with your actual bucket suffix
   - **Policy name**: `ViralCutCombinedPolicy`
   - Click "Create policy"

4. **Attach Policy to User**
   - Go back to user creation tab, refresh policies
   - Search for `ViralCutCombinedPolicy` and select it
   - Click "Next" → "Create user"

5. **Save Credentials**
   - **Important**: Copy the Access Key ID and Secret Access Key
   - Store them securely - you won't see the Secret Key again!

## Step 3: Configure CORS for S3 Bucket

1. **Go to S3 Console**
   - Select your `viralcut-[your-suffix]` bucket
   - Click "Permissions" tab
   - Scroll to "Cross-origin resource sharing (CORS)"
   - Click "Edit" and paste:

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "PUT",
            "POST",
            "DELETE",
            "HEAD"
        ],
        "AllowedOrigins": [
            "http://localhost:3000",
            "https://your-domain.com"
        ],
        "ExposeHeaders": [
            "ETag"
        ]
    }
]
```

## Step 4: Environment Variables Setup

Add these to your `.env` file in the project root:

```env
# AWS Configuration (single user for everything)
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=AKIA... # Your viralcut-user Access Key ID
AWS_SECRET_ACCESS_KEY=... # Your viralcut-user Secret Access Key

# S3 Bucket (single bucket with folder structure)
S3_BUCKET=viralcut-[your-suffix]

# Optional: For Lambda processing (reuses same credentials)
VIDEO_PROCESSING_LAMBDA=remotion-render-video-speed
```

## Step 5: Test the Setup

1. **Start your development server**:
   ```bash
   pnpm dev
   ```

2. **Test upload**:
   - Go to http://localhost:3000/viralcut
   - Try uploading a small video file
   - Check if it appears in your S3 bucket under `uploads/` folder

3. **Test Remotion (if already set up)**:
   ```bash
   cd packages/remotion
   pnpm with-env remotion lambda policies validate
   ```

## Benefits of Single User Approach

1. **Simplicity**: One set of credentials to manage
2. **Easier Development**: No switching between different AWS users
3. **Single Source of Truth**: All permissions in one policy
4. **Cost Effective**: Fewer resources to monitor
5. **Maintenance**: Easier to audit and update permissions

## Security Considerations

While using a single user is simpler, consider these best practices:

1. **Principle of Least Privilege**: The policy above only grants necessary permissions
2. **Regular Rotation**: Rotate access keys every 90 days
3. **Environment Isolation**: Use different users for dev/staging/production
4. **Monitoring**: Enable CloudTrail to track API usage
5. **Key Management**: Never commit credentials to Git

## Troubleshooting

### Common Issues:

1. **"Access Denied" Error**
   - Check policy has correct bucket name (replace `[your-suffix]`)
   - Verify AWS credentials are correct
   - Ensure bucket name matches exactly

2. **CORS Error in Browser**
   - Verify CORS configuration on S3 bucket
   - Check allowed origins include your domain

3. **Remotion Validation Fails**
   - Ensure `remotion-lambda-role` exists (from previous setup)
   - Check all permissions are included in the combined policy

4. **Invalid Credentials**
   - Double-check Access Key ID and Secret Key
   - Ensure no extra spaces in environment variables

## Migration from Multiple Users

If you already have separate users:

1. **Copy credentials** from existing working user
2. **Apply combined policy** to that user
3. **Remove old policies** to clean up
4. **Update environment variables** to use single user
5. **Test both S3 upload and Remotion** functionality

## Cost Estimation

**S3 Storage**: ~$0.023/GB/month
**S3 Requests**: ~$0.0004 per 1,000 PUT requests
**Lambda Execution**: Based on Remotion usage
**Data Transfer**: First 1GB/month free

For a typical video app with moderate usage, expect $5-20/month in AWS costs.

## Next Steps

Once this basic setup works:
1. Add Lambda functions for video processing
2. Set up CloudFront CDN for faster video delivery
3. Implement video thumbnails and metadata extraction
4. Add monitoring with CloudWatch 