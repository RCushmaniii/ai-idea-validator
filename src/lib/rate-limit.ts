/**
 * Lightweight in-memory rate limiter — sliding window.
 * No external dependencies. Works on single-instance deployments (Vercel, Hetzner).
 *
 * Usage in any API route:
 *
 *   import { rateLimit } from "@/lib/rate-limit";
 *   const limiter = rateLimit({ limit: 10, windowMs: 60_000 });
 *
 *   export async function POST(req: NextRequest) {
 *     const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
 *     const { success, remaining } = limiter.check(ip);
 *     if (!success) {
 *       return NextResponse.json(
 *         { error: "Too many requests" },
 *         { status: 429, headers: { "Retry-After": "60" } }
 *       );
 *     }
 *     // ... handle request
 *   }
 */

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

// Clean up stale entries every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now - entry.lastReset > 300_000) {
      rateLimitMap.delete(key);
    }
  }
}, 300_000).unref();

interface RateLimitConfig {
  /** Max requests per window (default: 10) */
  limit?: number;
  /** Window size in milliseconds (default: 60s) */
  windowMs?: number;
}

export function rateLimit(config: RateLimitConfig = {}) {
  const { limit = 10, windowMs = 60_000 } = config;

  return {
    check(identifier: string): { success: boolean; remaining: number } {
      const now = Date.now();
      const entry = rateLimitMap.get(identifier);

      if (!entry || now - entry.lastReset > windowMs) {
        rateLimitMap.set(identifier, { count: 1, lastReset: now });
        return { success: true, remaining: limit - 1 };
      }

      if (entry.count >= limit) {
        return { success: false, remaining: 0 };
      }

      entry.count++;
      return { success: true, remaining: limit - entry.count };
    },
  };
}
