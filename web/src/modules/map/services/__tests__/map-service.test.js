import { beforeEach, describe, expect, it, vi } from "vitest";
import { communityBookmarks } from "../../data/communityBookmarks";
import { useMapService } from "../mapService";

describe("mapService", () => {
  let mapService;
  let originalEnv;

  beforeEach(() => {
    // Save original env
    originalEnv = { ...import.meta.env };
    // Reset mocks before each test
    vi.resetModules();
    mapService = useMapService();
  });

  afterEach(() => {
    // Restore original env
    import.meta.env = originalEnv;
  });

  describe("bookmarks", () => {
    it("should initialize with community bookmarks", () => {
      expect(mapService.bookmarks.value).toEqual(communityBookmarks);
    });

    it("should have correct structure for each bookmark", () => {
      mapService.bookmarks.value.forEach((bookmark) => {
        expect(bookmark).toHaveProperty("name");
        expect(bookmark).toHaveProperty("viewpoint");
        expect(bookmark.viewpoint).toHaveProperty("targetGeometry");
        expect(bookmark.viewpoint.targetGeometry).toHaveProperty(
          "type",
          "extent"
        );
        expect(bookmark.viewpoint.targetGeometry).toHaveProperty(
          "spatialReference"
        );
        expect(
          bookmark.viewpoint.targetGeometry.spatialReference
        ).toHaveProperty("wkid", 3579);
        expect(bookmark.viewpoint.targetGeometry).toHaveProperty("xmin");
        expect(bookmark.viewpoint.targetGeometry).toHaveProperty("ymin");
        expect(bookmark.viewpoint.targetGeometry).toHaveProperty("xmax");
        expect(bookmark.viewpoint.targetGeometry).toHaveProperty("ymax");
      });
    });

    it("should have valid coordinate ranges", () => {
      mapService.bookmarks.value.forEach((bookmark) => {
        const { xmin, ymin, xmax, ymax } = bookmark.viewpoint.targetGeometry;
        expect(xmin).toBeLessThan(xmax);
        expect(ymin).toBeLessThan(ymax);
        // Yukon UTM coordinates are typically in these ranges
        expect(xmin).toBeGreaterThan(0);
        expect(ymin).toBeGreaterThan(0);
        expect(xmax).toBeLessThan(1000000);
        expect(ymax).toBeLessThan(2000000);
      });
    });
  });
});
