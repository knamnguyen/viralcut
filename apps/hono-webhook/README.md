# FounderLog Webhook Handler

A Cloudflare Workers service for handling Clerk webhooks and syncing user data with the database.

## Features

- Processes Clerk webhook events (`user.created`, `user.updated`, `user.deleted`)
- Validates webhook signatures using Svix
- Uses tRPC to update the database with user data
- Runs on Cloudflare's edge network

## Prerequisites

- Cloudflare account
- Clerk account with webhook configuration capability
- Node.js 18+ and pnpm

## Local Development

1. Install dependencies:

   ```
   pnpm install
   ```

2. Create a `.dev.vars` file in the project root with the following environment variables:

   ```
   CLERK_WEBHOOK_SECRET=YOUR_CLERK_WEBHOOK_SECRET
   DATABASE_URL=YOUR_DATABASE_URL
   DIRECT_URL=YOUR_DIRECT_URL
   ```

3. Run the development server:

   ```
   pnpm dev
   ```

4. The webhook handler will be available at `http://localhost:8787`

## Deployment

### First-time Setup

1. Login to Cloudflare:

   ```
   npx wrangler login
   ```

2. Add your secrets to Cloudflare (choose one method):

   **Option 1: Individual secrets**

   ```
   npx wrangler secret put CLERK_WEBHOOK_SECRET
   npx wrangler secret put DATABASE_URL
   npx wrangler secret put DIRECT_URL
   ```

   **Option 2: Bulk upload (recommended)**

   ```
   # Create a secrets.json file from the template
   cp secrets.example.json secrets.json
   # Edit secrets.json with your actual values
   nano secrets.json
   # Upload all secrets at once
   npx wrangler secret:bulk secrets.json
   ```

3. Deploy the worker:

   ```
   pnpm deploy
   ```

   Or use the convenience script:

   ```
   ./deploy.sh
   ```

### Subsequent Deployments

Just run:

```
pnpm deploy
```

Or use the convenience script:

```
./deploy.sh
```

## Setting Up Clerk Webhooks

1. In the Clerk Dashboard, go to **Webhooks** in the sidebar
2. Click **Add Endpoint**
3. Enter your worker URL (e.g., `https://founderlog-webhook-handler.your-account.workers.dev/api/webhooks/clerk`)
4. Select the following events to listen for:
   - `user.created`
   - `user.updated`
   - `user.deleted`
5. Copy the signing secret and add it to your worker environment using one of the methods above

## Testing

To test your webhook locally with Clerk:

1. Run `pnpm dev` to start the local server
2. Use a tool like [ngrok](https://ngrok.com/) to create a public URL:
   ```
   ngrok http 8787
   ```
3. Add the ngrok URL to Clerk's webhook endpoint configuration
4. Create, update, or delete a user in Clerk to trigger the webhook

## Troubleshooting

- Check the Cloudflare Worker logs in the dashboard for any errors
- Verify that the webhook secret is correctly set both in Clerk and as a worker secret
- Ensure your database connection string is properly formatted and accessible from Cloudflare Workers
