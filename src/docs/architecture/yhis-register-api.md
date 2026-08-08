# YHIS Register API — Current Understanding

This document captures what we know about the upstream **Yukon Heritage Information System (YHIS)** public register API that YHRP proxies. It reflects live checks against `https://yhis.gov.yk.ca` and the YHSI source in [ytgov/yhsi](https://github.com/ytgov/yhsi).

**Last verified:** 2026-08-06

---

## Overview

| Item | Value |
|------|-------|
| Public base URL | `https://yhis.gov.yk.ca/api/register` |
| Auth | None (public, read-only) |
| Source of truth | [register-router.ts](https://github.com/ytgov/yhsi/blob/main/api/routes/register-router.ts) |
| Our proxy | Express `GET /api/register/*` → YHIS (15‑minute cache) |
| Host config | `YHIS_API_URL` (scheme + host only; defaults to `https://yhis.gov.yk.ca`) |

YHRP does **not** call YHIS from the browser. The Vue app talks to our Express API; Express fetches and caches YHIS responses.

---

## Endpoints We Use

| Method | YHIS path | Purpose |
|--------|-----------|---------|
| `GET` | `/api/register?page={n}` | Paginated list of register places |
| `GET` | `/api/register/{id}` | Single place with description fields |
| `GET` | `/api/register/{id}/photos` | Photo metadata (incl. thumbnails) |
| `GET` | `/api/register/{id}/photos/{photoId}` | Thumbnail image bytes (`image/jpg`) |

There is **no** `GET /api/register/count` (returns 404). Item counts come from list `meta.item_count`.

---

## Pagination

- Query param: **`page`** only (1-based integer).
- Fixed page size: **12** (hardcoded in YHSI; not configurable by clients).
- `skip`, `take`, `page_size`, `search`, `q`, etc. are **ignored** if sent.

Example:

```http
GET https://yhis.gov.yk.ca/api/register?page=2
```

Response envelope:

```json
{
  "data": [ /* up to 12 place summary objects */ ],
  "meta": {
    "page": 2,
    "page_size": 12,
    "item_count": 44,
    "page_count": 4
  }
}
```

Observed register size at last check: **44** places (`page_count` 4).

Our backend must request `?page=` (not `skip`/`take`). Sending `skip`/`take` effectively always returns page 1.

---

## List item shape

List endpoints return **summary** objects (not full bilingual descriptions):

| Field | Type / notes |
|-------|----------------|
| `id` | number — place id |
| `primaryName` | string (English) |
| `fr_primaryName` | string or `null` (French name) |
| `yHSIId` | string (e.g. `"116B/03/024"`) |
| `communityName` | string (English) |
| `fr_communityName` | string or `null` (French community) |
| `latitude` / `longitude` | strings (decimal degrees) |
| `recognitionDate` | `YYYY-MM-DD` |
| `designations` | string (e.g. `"Federal"`) |
| `fr_designations` | string or `null` (French designation label) |
| `ThumbFile` | Node Buffer-like `{ type: "Buffer", data: number[] }` JPEG bytes |
| `caption` | string or `null` |

---

## Detail shape

```http
GET /api/register/{id}
```

Returns a **wrapper**:

```json
{
  "data": { /* place detail */ }
}
```

Detail includes list fields (including `fr_*` metadata) plus bilingual content populated from YHSI description types:

| Field | Role |
|-------|------|
| `placeDescriptionEn` / `placeDescriptionFr` | Description (type 5) |
| `heritageValueEn` / `heritageValueFr` | Heritage value (type 4) |
| `characterDefEn` / `characterDefFr` | Character-defining elements (type 2) |
| `descBoundEn` / `descBoundFr` | Boundary description (type 6) |
| `additionalInfoEn` / `additionalInfoFr` | Additional info (type 30) |

**French note:** As of Aug 2026, YHIS returns real French description text via `fR_DescriptionText` and French metadata via `fr_primaryName` / `fr_communityName` / `fr_designations`. Some `fr_*` values may still be `null` when a translation is missing — UI should fall back to English.

YHRP keeps these wire names on both the backend `RegisterPlace` model and the frontend `Place` model for consistency.

404 with empty body when the id is not on the register.

---

## Photos

```http
GET /api/register/{id}/photos
→ { "data": [ /* photo records */ ] }

GET /api/register/{id}/photos/{photoId}
→ image/jpg thumbnail bytes
```

Photo list items include identifiers such as `rowId`, `id`, `placeId`, filenames, dates, and thumbnail payload fields used by our proxy/frontend. Our Express layer may reshape `ThumbFile` before returning to the Vue app.

---

## Search

**Not available on the public register API.**

| Path / param | Result |
|--------------|--------|
| `GET /api/register/search` | 404 |
| `?search=`, `?q=`, `?text=` on list | Ignored; same page results |

YHSI does expose authenticated search elsewhere (`POST /api/place/search`, role-gated — returns 401 without auth). That is an **internal** places API, not the public register. YHRP should not depend on it for citizen-facing search.

If product needs search, options are:

1. Client- or proxy-side filter over cached register pages (small dataset today).
2. Ask YHSI for a public register search endpoint later.

---

## How YHRP Maps to YHIS

```
Browser  →  GET /api/register?page=N     (our Express)
         →  GET {YHIS_API_URL}/api/register?page=N

Browser  →  GET /api/register/:id
         →  GET {YHIS_API_URL}/api/register/:id

Browser  →  GET /api/register/:id/photos[/:photoId]
         →  same paths on YHIS
```

- Config: `src/api/config/app-config.ts` → `YHIS_API_URL`
- Fetch + cache: `src/api/services/place-service.ts`
- Routes: `src/api/routes/place-routes.ts`
- Frontend client: `src/web/src/modules/places/services/placesApi.js` (real API; mock flag off)

---

### Photos / thumbnails (current upstream behaviour)

Verified against live YHIS (2026-07-28):

| Source | What we see |
|--------|-------------|
| List `ThumbFile` | Present on **only ~4 of 44** register places |
| `GET /api/register/{id}/photos` | Returns `{ data: [] }` for sampled places (including ones that have list `ThumbFile`) |
| Detail payload | No `ThumbFile` / photo fields |

So missing images in the UI are mostly an **upstream data gap**, not YHRP cache. Our list/map UIs use list `ThumbFile` when present; detail galleries depend on the photos endpoint and will show empty until YHIS returns photo records again.

---

## Gaps vs older docs / leftover client quirks

Most TypeScript models and the Express detail response now match live `https://yhis.gov.yk.ca/api/register`. Remaining mismatches:

### Endpoints and query params YHIS register does not support

| Call / assumption | Live YHIS register | Notes |
|-------------------|--------------------|-------|
| `GET /api/register/count` | **404** | Counts are only in list `meta.item_count` |
| `GET /api/register/search` (or search query params) | **404** / ignored | No public register search |
| `?skip=` / `?take=` | **Ignored** | Only `?page=` works; page size fixed at 12 |
| `?page_size=` (frontend still sends it) | **Ignored** | Cannot change page size |
| `GET /api/register/{id}/photo` (singular) | **Not a valid route** | Use `/photos` list or `/photos/{photoId}` |

### Other YHIS APIs (not register)

Do not confuse register with authenticated YHSI surfaces such as `POST /api/place/search` (401 without roles). Those are outside the public register and are not what YHRP proxies today.

### Historical / wrong base URLs in older material

Older mock data and some README examples still mention hosts such as `test.heritage.ynet.gov.yk.ca` or `heritage.yukon.ca`. The production register host we use is **`https://yhis.gov.yk.ca`**.

---

## What We Do Not Have (Yet)

- Public text search / filters (community, designation, etc.)
- Configurable page size
- A dedicated count endpoint
- Reliable French content (placeholders in upstream)
- Guaranteed stable field names beyond what register-router selects (`REGISTER_FIELDS` in YHSI)

---

## Related Docs

- [Application overview](../overview/application-overview.md) — system architecture
- [Caching strategy](./caching-strategy.md) — 15‑minute TTL behaviour
- [Translations](../translations.md) — UI strings vs API `*En`/`*Fr` fields
- Upstream router: https://github.com/ytgov/yhsi/blob/main/api/routes/register-router.ts
