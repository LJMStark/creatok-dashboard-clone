import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { WorkspaceProvider, useWorkspace } from "@/store/workspace-context";
import { DynamicIcon } from "@/components/icons/dynamic-icon";
import { PulseBeam } from "@/components/magicui/pulse-beam";
import { StudioWorkbenchPage } from "@/components/studio/studio-workbench";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/app/viral-video-cloning",
  useSearchParams: () => new URLSearchParams(),
}));

function ContextHarness() {
  const {
    state,
    toggleFavorite,
    openSupportModal,
    setOpenSupportModal,
    switchLocale,
    createApiKey,
    revokeApiKey,
    updateSettings,
    inviteMember,
  } = useWorkspace();

  return (
    <div>
      <span data-testid="locale">{state.locale}</span>
      <span data-testid="fav-count">{state.favoriteIds.length}</span>
      <span data-testid="modal">{openSupportModal ? "support" : "none"}</span>
      <span data-testid="keys">{state.apiKeys.length}</span>
      <span data-testid="team">{state.settings.teamName}</span>
      <span data-testid="members">{state.members.length}</span>
      <button type="button" onClick={() => toggleFavorite("item-new")}>
        fav
      </button>
      <button type="button" onClick={() => setOpenSupportModal(true)}>
        open-support
      </button>
      <button type="button" onClick={() => switchLocale("en")}>
        to-en
      </button>
      <button type="button" onClick={() => createApiKey("Test Key")}>
        add-key
      </button>
      <button
        type="button"
        onClick={() => state.apiKeys[0] && revokeApiKey(state.apiKeys[0].id)}
      >
        del-key
      </button>
      <button type="button" onClick={() => updateSettings({ teamName: "New Team" })}>
        set-team
      </button>
      <button type="button" onClick={() => inviteMember("dev@creatok.ai", "编辑者")}>
        add-member
      </button>
    </div>
  );
}

describe("WorkspaceProvider and core UI components", () => {
  it("manages context actions cleanly without mutation", () => {
    render(
      <WorkspaceProvider>
        <ContextHarness />
      </WorkspaceProvider>
    );

    expect(screen.getByTestId("locale").textContent).toBe("zh");
    const beforeFavs = Number(screen.getByTestId("fav-count").textContent);
    fireEvent.click(screen.getByText("fav"));
    expect(Number(screen.getByTestId("fav-count").textContent)).toBe(beforeFavs + 1);

    fireEvent.click(screen.getByText("open-support"));
    expect(screen.getByTestId("modal").textContent).toBe("support");

    fireEvent.click(screen.getByText("to-en"));
    expect(screen.getByTestId("locale").textContent).toBe("en");

    const beforeKeys = Number(screen.getByTestId("keys").textContent);
    fireEvent.click(screen.getByText("add-key"));
    expect(Number(screen.getByTestId("keys").textContent)).toBe(beforeKeys + 1);
    fireEvent.click(screen.getByText("del-key"));
    expect(Number(screen.getByTestId("keys").textContent)).toBe(beforeKeys);

    fireEvent.click(screen.getByText("set-team"));
    expect(screen.getByTestId("team").textContent).toBe("New Team");

    const beforeMembers = Number(screen.getByTestId("members").textContent);
    fireEvent.click(screen.getByText("add-member"));
    expect(Number(screen.getByTestId("members").textContent)).toBe(beforeMembers + 1);
  });

  it("renders DynamicIcon and PulseBeam glow wrapper", () => {
    const { container } = render(
      <PulseBeam active colorVariant="colorful">
        <DynamicIcon name="Sparkles" className="test-icon" />
      </PulseBeam>
    );
    expect(container.querySelector("[data-beam]")).toBeTruthy();
    expect(container.querySelector("svg")).toBeTruthy();
  });

  it("renders cloning studio workbench and populates sample via try button", () => {
    render(
      <WorkspaceProvider>
        <StudioWorkbenchPage toolPath="/app/viral-video-cloning" />
      </WorkspaceProvider>
    );

    expect(screen.getByText("目标视频")).toBeInTheDocument();
    expect(screen.getByText("商品信息")).toBeInTheDocument();
    expect(screen.getByText("请先上传视频")).toBeInTheDocument();

    fireEvent.click(screen.getByText("试一试"));
    expect(screen.queryByText("请先上传视频")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("免费开始分析"));
    expect(screen.getAllByText(/已完成/).length).toBeGreaterThan(0);
  });
});
