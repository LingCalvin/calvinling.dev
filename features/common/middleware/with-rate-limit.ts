import LRUCache from 'lru-cache';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const maxTokens = parseInt(process.env.RATE_LIMIT_MAX_TOKENS ?? '500');

const ipCache = new LRUCache<string, number>({ max: maxTokens });

interface WithRateLimitParams {
  ttl: number;
  limit: number;
}

export default function withRateLimit(
  handler: NextApiHandler,
  { ttl, limit }: WithRateLimitParams
) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    // Retrieve the IP address from the x-forwarded-for header
    const ip: string = (req.headers['x-forwarded-for'] ?? '') as string;

    // Update how many times the IP has sent a request within the time limit
    const hitCount = ipCache.get(ip) ?? 0;
    const usage = hitCount + 1;
    ipCache.set(ip, usage, ttl);

    const isRateLimited = hitCount >= limit;

    // Set headers with rate limiting info
    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', isRateLimited ? 0 : limit - usage);

    // Continue to the handler if the requester has not reached the limit
    if (!isRateLimited) {
      return handler(req, res);
    }

    // Set a header to let the client know when they may retry
    const entry = ipCache.dump().find((entry) => entry.k === ip);
    if (entry) {
      res.setHeader('Retry-After', new Date(entry.e).toUTCString());
    }

    return res.status(429).json({
      statusCode: 429,
      message: 'Too many requests. Please try again later.',
      error: 'Too Many Requests',
    });
  };
}
