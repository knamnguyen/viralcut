export function extractClerkToken(headers: Headers): string | null {
  // 1. Try Authorization: Bearer <token>
  const authHeader = headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length);
  }
  // 2. Try Clerk session cookie (if present)
  const cookieHeader = headers.get("cookie");
  if (cookieHeader) {
    const match = cookieHeader.match(/__session=([^;]+)/); // Clerk's default cookie name
    if (match?.[1]) return match[1];
  }
  return null;
}
