# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Essential Scripts
```bash
# Install dependencies
pnpm i

# Development (watch mode for all apps)
pnpm dev

# Development (Next.js app only)
pnpm dev:next

# Build all packages and apps
pnpm build

# Database operations
pnpm db:push      # Push schema changes to database
pnpm db:studio    # Open Prisma Studio
pnpm db:generate  # Generate Prisma client

# Code quality
pnpm lint         # Run ESLint across all packages
pnpm lint:fix     # Fix ESLint issues
pnpm typecheck    # TypeScript type checking
pnpm format       # Check formatting with Prettier
pnpm format:fix   # Fix formatting issues

# UI components
pnpm ui-add       # Add new shadcn/ui components

# Clean workspace
pnpm clean        # Clean git artifacts
pnpm clean:workspaces  # Clean all workspace artifacts
```

### Testing Scripts (Package-specific)
```bash
# Run tests in specific packages
cd packages/api
pnpm test:remotion-gemini    # Test Remotion integration
pnpm test:lambda-direct      # Test Lambda functions
pnpm test:server-upload      # Test upload functionality
pnpm test:gemini-streaming   # Test Gemini streaming
```

### Environment Setup
Before running any environment-dependent scripts, ensure `.env` exists:
```bash
cp .env.example .env
# Configure required environment variables
```

## Architecture Overview

This is a **T3 Turbo Stack monorepo** for ViralCut, a video processing application with AI capabilities.

### Core Technologies
- **Turborepo**: Monorepo build system
- **Next.js 15**: Frontend with App Router
- **tRPC**: End-to-end typesafe API
- **Prisma**: Database ORM with PostgreSQL/Supabase
- **Clerk**: Authentication
- **Stripe**: Payment processing
- **Tailwind CSS v4**: Styling
- **Remotion Lambda**: Video generation
- **Google Gemini**: AI video processing

### Workspace Structure

#### Apps
- `apps/nextjs/`: Main Next.js application
- `apps/upload-server/`: Express server for file uploads (deployed to AWS EC2)

#### Packages (Domain-specific)
- `packages/api/`: tRPC router definitions and API endpoints
- `packages/db/`: Prisma schema, client, and database utilities
- `packages/ui/`: Shared UI components (shadcn/ui based)
- `packages/validators/`: Zod validation schemas
- `packages/stripe/`: Stripe integration and payment handling
- `packages/remotion/`: Remotion Lambda video generation
- `packages/gemini-video/`: Google Gemini video processing
- `packages/gemini-upload-lambda/`: AWS Lambda for Gemini uploads
- `packages/s3/`: AWS S3 operations
- `packages/langchain/`: LangChain integrations
- `packages/tiktok-download/`: TikTok video downloading utilities

#### Tooling
- `tooling/eslint/`: Shared ESLint configurations
- `tooling/prettier/`: Shared Prettier configuration
- `tooling/tailwind/`: Shared Tailwind CSS configuration
- `tooling/typescript/`: Shared TypeScript configurations

## Development Patterns

### Service Co-location
Services are co-located with their domain rather than grouped by framework:

✅ **Correct**: `packages/remotion/src/remotion-service.ts`
❌ **Incorrect**: `packages/api/src/services/remotion-service.ts`

This enables reusability across API endpoints and standalone scripts.

### Package Export Pattern
All packages use barrel exports:
```typescript
// packages/domain/src/index.ts
export { DomainService } from './domain-service';
export type { DomainServiceTypes } from './domain-service';

// Usage
import { DomainService } from '@sassy/domain';
```

### Environment Variables in Packages
Packages that need environment variables use the dotenv-cli pattern:
```json
{
  "scripts": {
    "with-env": "dotenv -e ../../.env --",
    "my-script": "pnpm with-env bun scripts/my-script.ts"
  }
}
```

### tRPC Integration

#### Server-side (packages/api)
- Routers defined in `packages/api/src/router/`
- Procedures use `publicProcedure` or `protectedProcedure` (with Clerk auth)
- Context includes database access and user authentication

#### Client-side (apps/nextjs)
- Client setup in `apps/nextjs/src/trpc/`
- Uses React Query integration
- Server components use `prefetch` and `HydrateClient`
- Client components use `useQuery` and `useMutation`

### Third-party Service Integration
- Store only foreign IDs between services (e.g., `stripeCustomerId` in Clerk, `clerkUserId` in Stripe)
- Each service remains source of truth for its domain
- Fetch fresh data when needed rather than maintaining duplicate state
- Webhooks maintain relationship integrity, not complete data mirroring

## Key Constraints

### Type Safety
- All communication between services is fully typed
- Never use `any` - create proper types
- Export types alongside implementation code

### Package Dependencies
- Install dependencies where they're used, not in root
- Run `pnpm build` in packages after changes for TypeScript resolution
- Use workspace catalog for version consistency

### Database Schema Changes
1. Modify `packages/db/prisma/schema.prisma`
2. Run `pnpm db:push` to apply changes
3. Run `pnpm db:generate` to update Prisma client

### Authentication Flow
- Clerk handles all user authentication
- Basic user info (username, email) always queried from Clerk
- Custom app features stored in local database User table
- Use `protectedProcedure` in tRPC for authenticated endpoints

### Video Processing Pipeline
1. Upload handling via `packages/s3/` or `apps/upload-server/`
2. AI processing via `packages/gemini-video/`
3. Video generation via `packages/remotion/` on AWS Lambda
4. Final output stored in S3

## Environment Variables (Global)
Key environment variables used across the monorepo:
- `DATABASE_URL` - Supabase/PostgreSQL connection
- `CLERK_*` - Authentication configuration
- `STRIPE_*` - Payment processing
- `REMOTION_*` - AWS Lambda video generation
- `GEMINI_API_KEY` - Google AI integration
- `UPLOAD_SERVER_URL` - File upload endpoint

## Testing Guidelines
- Tests are not written by default - always confirm with user first
- Use domain-specific test scripts in relevant packages
- Follow Red-Green-Refactor cycle when requested
- Test environment-dependent functionality with `pnpm with-env`