import { vi } from "vitest";

// Mock window.fetch
global.fetch = vi.fn();

// Mock import.meta.env
vi.mock("import.meta.env", () => ({
  VITE_ARCGIS_TOKEN: "test-token",
}));

// Mock console.error to keep test output clean
console.error = vi.fn();
