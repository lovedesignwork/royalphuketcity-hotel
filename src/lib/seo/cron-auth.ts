import { NextRequest } from "next/server";

// Cron routes live under /api/cron/* which the admin middleware does NOT
// cover, so they guard themselves with a shared secret.
//
// Vercel Cron automatically sends "Authorization: Bearer $CRON_SECRET" when a
// CRON_SECRET env var is set. We also accept "?secret=" for manual/local
// triggering. If CRON_SECRET is unset we allow the request (dev convenience).
export function isAuthorizedCron(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;

  const auth = request.headers.get("authorization");
  if (auth === `Bearer ${secret}`) return true;

  const url = new URL(request.url);
  if (url.searchParams.get("secret") === secret) return true;

  return false;
}
