/**
 * Input validation helpers for register routes.
 *
 * IDs are interpolated into upstream YHIS URLs, so they must be plain
 * positive integers. Anything else (e.g. "../..", "1abc", "%2F") is rejected
 * before it can change the upstream path.
 */

// The register has a handful of pages; this cap only bounds cache keys.
export const MAX_PAGE = 1000;

// Search text is user input that becomes part of a cache key.
export const MAX_QUERY_LENGTH = 200;

const POSITIVE_INTEGER = /^[1-9]\d{0,9}$/;

/** Returns the id as a canonical numeric string, or undefined if invalid. */
export function parseId(value: unknown): string | undefined {
  if (typeof value !== "string" || !POSITIVE_INTEGER.test(value)) {
    return undefined;
  }
  return value;
}

/** Parses a page query parameter, defaulting to 1 and clamping to MAX_PAGE. */
export function parsePage(value: unknown): number | undefined {
  if (value === undefined || value === "") return 1;
  if (typeof value !== "string" || !POSITIVE_INTEGER.test(value)) {
    return undefined;
  }
  const page = Number(value);
  return page <= MAX_PAGE ? page : undefined;
}
