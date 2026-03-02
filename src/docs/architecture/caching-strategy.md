# Caching Strategy

## Overview

The YHRP application implements server-side caching to improve performance and reduce load on the upstream YHIS government API.

## Implementation

### Backend Caching (Active)

The Express backend uses `node-cache` to cache all responses from the YHIS API.

**Location:** `src/api/services/place-service.ts`

**Configuration:**
```typescript
const cache = new NodeCache({ stdTTL: 900 }); // 15 minutes
```

**How it works:**

```typescript
private async fetchWithCache<T>(url: string, cacheKey: string): Promise<T> {
  // Check cache first
  const cachedData = cache.get<T>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  // Fetch from external API
  const response = await fetch(url);
  const data = await response.json();

  // Store in cache
  cache.set(cacheKey, data);
  return data;
}
```

**Cache Keys:**
| Endpoint | Cache Key Format |
|----------|------------------|
| Places list | `places_{skip}_{take}` |
| Place count | `place_count` |
| Place details | `place_{id}` |
| Place photos | `place_photos_{id}` |
| Photo file | `photo_{placeId}_{photoId}` |

### Benefits

1. **Reduced API Load** - External API only called once per 15 minutes per unique request
2. **Faster Response Times** - Cached responses return immediately
3. **Resilience** - App continues working briefly if upstream API has issues
4. **Cost Reduction** - Fewer external API calls

### Limitations

1. **Memory-based** - Cache clears on server restart
2. **Single instance** - Not shared across multiple containers
3. **No invalidation** - Data may be up to 15 minutes stale

## Frontend Caching (Not Implemented)

The frontend does not implement its own caching layer. Browser caching of static assets is handled by standard HTTP cache headers.

## Cache Configuration

To modify cache duration, update the TTL in `place-service.ts`:

```typescript
// Change 900 (seconds) to desired duration
const cache = new NodeCache({ stdTTL: 900 });
```

## Monitoring

Cache hits and misses are logged to the console:
```
[Cache Hit] places_0_12
[Cache Miss] place_42
[Cache Set] place_42
```

## Future Considerations

If scaling to multiple instances, consider:
- Redis for shared caching
- Cache invalidation webhooks from YHIS
- Longer TTL for rarely-changing data (place details)
- Shorter TTL for frequently-changing data (if any)
