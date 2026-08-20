"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverCache = void 0;
exports.fetchWithCache = fetchWithCache;
exports.invalidateCache = invalidateCache;
const lru_cache_1 = require("lru-cache");
// Create a singleton cache instance for the server
// This will cache up to 500 items, and items will expire after 5 minutes by default
const globalForCache = global;
exports.serverCache = globalForCache.serverCache ||
    new lru_cache_1.LRUCache({
        max: 500,
        ttl: 1000 * 60 * 5, // 5 minutes
        allowStale: false,
        updateAgeOnGet: false,
        updateAgeOnHas: false,
    });
if (process.env.NODE_ENV !== 'production')
    globalForCache.serverCache = exports.serverCache;
/**
 * Helper to fetch data from cache, or retrieve it and cache it if missing.
 */
async function fetchWithCache(key, fetcher, ttlMinutes = 5) {
    const cached = exports.serverCache.get(key);
    if (cached !== undefined) {
        return cached;
    }
    const data = await fetcher();
    if (data !== undefined && data !== null) {
        exports.serverCache.set(key, data, { ttl: 1000 * 60 * ttlMinutes });
    }
    return data;
}
function invalidateCache(keyPrefix) {
    const keysToDelete = [];
    for (const key of exports.serverCache.keys()) {
        if (key.startsWith(keyPrefix)) {
            keysToDelete.push(key);
        }
    }
    for (const key of keysToDelete) {
        exports.serverCache.delete(key);
    }
}
