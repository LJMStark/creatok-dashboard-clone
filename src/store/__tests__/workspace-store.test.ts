import { describe, expect, it } from "vitest";
import {
  createApiKeyImmutable,
  createInitialWorkspaceState,
  inviteMemberImmutable,
  revokeApiKeyImmutable,
  submitTaskImmutable,
  switchLocaleImmutable,
  toggleFavoriteImmutable,
  updateSettingsImmutable,
} from "@/store/workspace-reducer";

describe("workspace immutable state reducer", () => {
  it("creates initial state matching logged-in CreatOK user liang", () => {
    const state = createInitialWorkspaceState();
    expect(state.user.name).toBe("liang");
    expect(state.user.workspaceName).toBe("liang's workspace");
    expect(state.credits).toBe(6);
    expect(state.locale).toBe("zh");
  });

  it("submits generation task immutably and deducts credits safely", () => {
    const prev = Object.freeze(createInitialWorkspaceState());
    const next = submitTaskImmutable(prev, {
      toolPath: "/app/ai-video-generator",
      toolTitle: "视频生成",
      prompt: "展示极简护肤精华液在阳光下的水润质地特写",
      model: "Kling 4.0",
      cost: 2,
      previewUrl: "https://content.creatok.com/static/dashboard/kling-4-cropped.mp4",
      mediaType: "video",
    });

    expect(next).not.toBe(prev);
    expect(prev.credits).toBe(6);
    expect(next.credits).toBe(4);
    expect(next.tasks[0].prompt).toContain("护肤精华液");
    expect(next.tasks.length).toBe(prev.tasks.length + 1);
  });

  it("toggles favorites without mutating previous list", () => {
    const prev = Object.freeze(createInitialWorkspaceState());
    const itemId = "showcase-1";
    const added = toggleFavoriteImmutable(prev, itemId);
    expect(added.favoriteIds).toContain(itemId);
    expect(prev.favoriteIds).not.toContain(itemId);

    const removed = toggleFavoriteImmutable(added, itemId);
    expect(removed.favoriteIds).not.toContain(itemId);
  });

  it("creates and revokes API keys immutably", () => {
    const prev = Object.freeze(createInitialWorkspaceState());
    const withKey = createApiKeyImmutable(prev, "CLI Macbook Pro");
    expect(withKey.apiKeys.length).toBe(prev.apiKeys.length + 1);
    expect(withKey.apiKeys[0].name).toBe("CLI Macbook Pro");

    const targetId = withKey.apiKeys[0].id;
    const afterRevoke = revokeApiKeyImmutable(withKey, targetId);
    expect(afterRevoke.apiKeys.find((k) => k.id === targetId)).toBeUndefined();
    expect(withKey.apiKeys.find((k) => k.id === targetId)).toBeDefined();
  });

  it("updates workspace settings, members, and locale immutably", () => {
    const prev = Object.freeze(createInitialWorkspaceState());
    const updatedSettings = updateSettingsImmutable(prev, {
      teamName: "CreatOK Growth Lab",
      restrictDeleteCompleted: true,
    });
    expect(updatedSettings.settings.teamName).toBe("CreatOK Growth Lab");
    expect(prev.settings.teamName).toBe("liang's workspace");

    const withMember = inviteMemberImmutable(updatedSettings, "partner@creatok.ai", "编辑者");
    expect(withMember.members.some((m) => m.email === "partner@creatok.ai")).toBe(true);

    const englishState = switchLocaleImmutable(withMember, "en");
    expect(englishState.locale).toBe("en");
    expect(withMember.locale).toBe("zh");
  });
});
