import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  // Public profile page (matches /any-username)
  // Needs careful regex or matching to avoid conflicts if other top-level routes exist
  "/((?!sign-in|sign-up|api|dashboard).+)",
  // Sign in/up routes
  "/sign-in(.*)",
  "/sign-up(.*)",
  // Root page is public
  "/",
  // tRPC public procedures (adjust specific paths as needed)
  "/api/trpc/founderlog.getPublicTimeline",
  "/api/trpc/founderlog.upvoteEntry",
  "/api/trpc/founderlog.getAllPublicEntries",
]);

// Define routes that should be protected
const isProtectedRoute = createRouteMatcher([
  "/dashboard", // Protect dashboard routes
  "/dashboard/(.*)", // Protect all nested dashboard routes too
  // Add other protected routes here if necessary
]);

export default clerkMiddleware((auth, request) => {
  // Protect routes that are explicitly listed as protected
  if (isProtectedRoute(request)) {
    auth.protect();
    return; // Ensure we don't process public routes logic if protected
  }

  // Allow access to public routes (implicitly handles non-matched routes too)
  // No action needed if it's not a protected route
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
