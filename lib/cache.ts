import { LRUCache } from 'lru-cache';

// Create a singleton cache instance for the server
// This will cache up to 500 items, and items will expire after 5 minutes by default
const globalForCache = global as unknown as { serverCache: LRUCache<string, any> };

export const serverCache =
  globalForCache.serverCache ||
  new LRUCache<string, any>({
    max: 500,
    ttl: 1000 * 60 * 5, // 5 minutes
    allowStale: false,
    updateAgeOnGet: false,
    updateAgeOnHas: false,
  });

if (process.env.NODE_ENV !== 'production') globalForCache.serverCache = serverCache;

/**
 * Helper to fetch data from cache, or retrieve it and cache it if missing.
 */
export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMinutes = 5
): Promise<T> {
  const cached = serverCache.get(key);
  if (cached !== undefined) {
    return cached as T;
  }

  const data = await fetcher();
  if (data !== undefined && data !== null) {
    serverCache.set(key, data, { ttl: 1000 * 60 * ttlMinutes });
  }
  return data;
}

export function invalidateCache(keyPrefix: string) {
  const keysToDelete: string[] = [];
  for (const key of serverCache.keys()) {
    if (key.startsWith(keyPrefix)) {
      keysToDelete.push(key);
    }
  }
  for (const key of keysToDelete) {
    serverCache.delete(key);
  }
}
