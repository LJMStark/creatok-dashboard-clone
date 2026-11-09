import { describe, expect, it } from "vitest";
import {
  ALL_ROUTE_PATHS,
  API_PLATFORM_NAV,
  SIDEBAR_GROUPS,
  SIDEBAR_POPOVER_MENUS,
  USER_MENU_LINKS,
  WORKSPACE_SETTINGS_NAV,
} from "@/data/navigation";
import { STUDIO_TOOLS_BY_SLUG, getStudioToolByPath } from "@/data/studio-tools";

describe("navigation and full 60-route registry", () => {
  it("registers all 60 unique routes without duplicates", () => {
    const uniquePaths = new Set(ALL_ROUTE_PATHS);
    expect(uniquePaths.size).toBe(ALL_ROUTE_PATHS.length);
    expect(ALL_ROUTE_PATHS.length).toBeGreaterThanOrEqual(60);
  });

  it("matches exact item counts for sidebar popover menus from CreatOK", () => {
    expect(SIDEBAR_POPOVER_MENUS.video).toHaveLength(12);
    expect(SIDEBAR_POPOVER_MENUS.image).toHaveLength(13);
    expect(SIDEBAR_POPOVER_MENUS.audio).toHaveLength(2);
    expect(SIDEBAR_POPOVER_MENUS.tools).toHaveLength(6);
  });

  it("ensures every sidebar, popover, user menu, settings, and API platform href resolves to a registered route", () => {
    const routeSet = new Set(ALL_ROUTE_PATHS);
    const normalize = (href: string) => href.split("?")[0].split("#")[0] || "/";

    for (const group of SIDEBAR_GROUPS) {
      for (const item of group.items) {
        if (item.href) {
          expect(routeSet.has(normalize(item.href))).toBe(true);
        }
      }
    }

    for (const items of Object.values(SIDEBAR_POPOVER_MENUS)) {
      for (const item of items) {
        expect(routeSet.has(normalize(item.href))).toBe(true);
      }
    }

    for (const link of [...USER_MENU_LINKS, ...WORKSPACE_SETTINGS_NAV, ...API_PLATFORM_NAV]) {
      expect(routeSet.has(normalize(link.href))).toBe(true);
    }
  });

  it("resolves studio tool config for video, image, audio, and utility tool paths", () => {
    expect(Object.keys(STUDIO_TOOLS_BY_SLUG).length).toBeGreaterThanOrEqual(30);
    const cloning = getStudioToolByPath("/app/viral-video-cloning");
    expect(cloning?.title).toBe("爆款复刻");

    const listing = getStudioToolByPath("/app/image/product-listing");
    expect(listing?.title).toBe("商品套图");

    const tts = getStudioToolByPath("/app/audio/text-to-speech");
    expect(tts?.title).toContain("文字转语音");
  });
});
