//TODO: cleaning up and organize types for rep
[done] figure ways to reuse types from db inside react components and trpc routes
[done] fix prisma types issues not resolve properly in trpc router
[doing] resolve auth flow in api being reliant on nextjs hence not working in others
[] relearn auth flow - currently at the api level but any others?
[] diff between type off interfence and RouterOutput infer utility
[] set up persistent working hono js server on aws/cloudfare
[] sync clerk/stripe webhook to user creation in db

//TODO: to synct to template later:
packages/db/prisma/schema.prisma
packages/ui/package.json
turbo.json
package.json

//For some schema validators, you might not need to provide everything in the input. For example, for update user, you don't need to provide userId, because it can be provided at the context api layer. But still for others, you kinda do.

//If you move your logic to repo in api, you wouldn't need to set up separate things but can still reuse that logic in hono, given that hono probably has access to your db
