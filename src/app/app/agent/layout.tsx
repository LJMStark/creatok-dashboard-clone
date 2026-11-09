"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import {
  BookOpen,
  Bot,
  Building2,
  ChevronLeft,
  FileImage,
  MessageSquare,
  PanelLeft,
  Plus,
  Puzzle,
  Send,
  Sparkle,
  Video,
  X,
} from "lucide-react";
import { AgentSessionProvider, useAgentSessions } from "@/app/app/agent/_store/agent-session-context";
import { GlobalModals } from "@/components/layout/global-modals";
import { useWorkspace } from "@/store/workspace-context";
import { cn } from "@/lib/utils";

const AGENT_FOOTER_LINKS = [
  {
    title: "技能 & 插件",
    titleEn: "Skills & Plugins",
    href: "/app/agent/plugins",
    Icon: Puzzle,
  },
  {
    title: "技能库",
    titleEn: "Skills Library",
    href: "/app/agent/skills",
    Icon: BookOpen,
  },
  {
    title: "频道",
    titleEn: "Channels",
    href: "/app/agent/channels",
    Icon: Send,
  },
] as const;

function AgentSidebarContent({
  collapsed,
  onToggleCollapse,
  onNavigate,
}: {
  readonly collapsed: boolean;
  readonly onToggleCollapse: () => void;
  readonly onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useWorkspace();
  const { sessions, activeSessionId, startNewSession, selectSession, enabledPluginIds } =
    useAgentSessions();
  const isEn = state.locale === "en";

  const handleCreateNew = () => {
    startNewSession();
    router.push("/app/agent");
    onNavigate?.();
  };

  const handleOpenSession = (sessionId: string) => {
    selectSession(sessionId);
    router.push("/app/agent");
    onNavigate?.();
  };

  return (
    <div className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Top Bar: Back to Dashboard + Collapse */}
      <div className="flex flex-col gap-2 p-2.5">
        <div className={cn("flex items-center justify-between gap-1.5", collapsed && "justify-center")}>
          {!collapsed && (
            <Link
              href="/app/dashboard"
              onClick={onNavigate}
              className="group inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <ChevronLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>{isEn ? "Back to Workspace" : "返回工作台"}</span>
            </Link>
          )}
          <button
            type="button"
            aria-label="切换侧边栏"
            onClick={onToggleCollapse}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <PanelLeft className="size-4" />
          </button>
        </div>

        {/* Agent Brand Header */}
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-2 py-1">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Bot className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold tracking-tight">CreatOK Agent</div>
              <div className="truncate text-[11px] text-muted-foreground">
                {enabledPluginIds.length} 个创作技能运行中
              </div>
            </div>
          </div>
        )}

        {/* New Session CTA */}
        <button
          type="button"
          onClick={handleCreateNew}
          className={cn(
            "mt-1 inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl border bg-background px-3 text-xs font-semibold text-foreground shadow-sm transition-all hover:bg-accent",
            pathname === "/app/agent" && activeSessionId === null && "border-primary/40 ring-1 ring-primary/20",
            collapsed && "h-9 w-9 px-0 mx-auto"
          )}
        >
          <Plus className="size-4 shrink-0" />
          {!collapsed && <span>{isEn ? "New Session" : "新建会话"}</span>}
        </button>
      </div>

      {/* Recent Sessions List */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-2 py-2">
        {!collapsed && (
          <div className="mb-1.5 flex items-center justify-between px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            <span>{isEn ? "Recent Sessions" : "最近会话"}</span>
            <span>{sessions.length}</span>
          </div>
        )}
        <ul className="flex flex-col gap-1">
          {sessions.map((sess) => {
            const isSelected = pathname === "/app/agent" && activeSessionId === sess.id;
            const ModeIcon = sess.mode === "video" ? Video : FileImage;
            return (
              <li key={sess.id}>
                <button
                  type="button"
                  onClick={() => handleOpenSession(sess.id)}
                  title={sess.title}
                  className={cn(
                    "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isSelected
                      ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/85",
                    collapsed && "justify-center px-0"
                  )}
                >
                  <ModeIcon className="size-3.5 shrink-0 text-muted-foreground group-hover:text-foreground" />
                  {!collapsed && (
                    <div className="min-w-0 flex-1">
                      <div className="truncate">{sess.title}</div>
                      <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <span>{sess.updatedAt}</span>
                        <span>·</span>
                        <span className="truncate">{sess.model}</span>
                      </div>
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom Agent Sub-Routes + Credits Pill */}
      <div className="flex flex-col gap-1.5 border-t border-sidebar-border p-2.5">
        <nav aria-label="Agent 模块导航" className="flex flex-col gap-0.5">
          {AGENT_FOOTER_LINKS.map(({ title, titleEn, href, Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onNavigate}
                className={cn(
                  "flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-xs font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  active
                    ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/85",
                  collapsed && "justify-center px-0"
                )}
              >
                <Icon className="size-4 shrink-0" />
                {!collapsed && <span className="truncate">{isEn ? titleEn : title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Credits Pill & Upgrade */}
        {!collapsed ? (
          <div className="mt-1 flex h-8 w-full items-center justify-between rounded-xl bg-foreground/[0.06] px-2.5 dark:bg-muted/70">
            <Link
              href="/app/workspace/credits"
              onClick={onNavigate}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Sparkle className="size-3.5 text-emerald-500" />
              <span>剩余 {state.credits} 积分</span>
            </Link>
            <Link
              href="/zh/pricing"
              onClick={onNavigate}
              className="text-xs font-semibold text-amber-500 transition-colors hover:text-amber-600 dark:hover:text-amber-400"
            >
              {isEn ? "Upgrade" : "升级"}
            </Link>
          </div>
        ) : (
          <Link
            href="/app/workspace/credits"
            title={`剩余 ${state.credits} 积分`}
            className="mx-auto mt-1 flex size-8 items-center justify-center rounded-lg bg-foreground/[0.06] text-xs font-semibold"
          >
            <Sparkle className="size-3.5 text-emerald-500" />
          </Link>
        )}

        {/* Compact Workspace User Footer */}
        {!collapsed && (
          <Link
            href="/app/user/account"
            onClick={onNavigate}
            className="mt-0.5 flex items-center gap-2.5 rounded-xl p-1.5 transition-colors hover:bg-sidebar-accent"
          >
            <img
              src={state.user.avatar}
              alt={state.user.name}
              className="size-7 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1 text-xs leading-tight">
              <div className="truncate font-semibold">{state.user.name}</div>
              <div className="flex items-center gap-1 truncate text-[11px] text-muted-foreground">
                <Building2 className="size-3 shrink-0" />
                <span className="truncate">{state.user.workspaceName}</span>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

function AgentWorkspaceShell({ children }: { readonly children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { state } = useWorkspace();
  const widthClass = collapsed ? "w-[3.75rem]" : "w-[15.5rem]";

  return (
    <div className="flex min-h-svh w-full bg-sidebar">
      {/* Desktop Dedicated Agent Sidebar */}
      <aside className="hidden md:block">
        <div className={cn("transition-[width] duration-200 ease-linear", widthClass)} />
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-20 hidden h-svh p-2 transition-[width] duration-200 ease-linear md:flex",
            widthClass
          )}
        >
          <AgentSidebarContent
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed((prev) => !prev)}
          />
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[1px] md:hidden" />
          <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex w-[16.5rem] flex-col border-r bg-sidebar p-2 shadow-2xl focus:outline-none md:hidden">
            <Dialog.Title className="sr-only">Agent 工作台菜单</Dialog.Title>
            <div className="absolute right-2.5 top-3 z-10">
              <Dialog.Close className="rounded-md p-1.5 text-muted-foreground hover:bg-accent">
                <X className="size-4" />
              </Dialog.Close>
            </div>
            <AgentSidebarContent
              collapsed={false}
              onToggleCollapse={() => setMobileOpen(false)}
              onNavigate={() => setMobileOpen(false)}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Main Agent Content Container */}
      <main className="relative flex w-full flex-1 flex-col overflow-x-hidden rounded-xl bg-background md:m-2 md:ml-0 md:rounded-2xl md:shadow">
        <header className="flex h-12 shrink-0 items-center justify-between border-b px-3 md:hidden">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="打开 Agent 侧边栏"
              onClick={() => setMobileOpen(true)}
              className="inline-flex size-8 items-center justify-center rounded-lg hover:bg-accent"
            >
              <MessageSquare className="size-4" />
            </button>
            <Link href="/app/dashboard" className="text-xs font-medium text-muted-foreground">
              返回首页
            </Link>
          </div>
          <Link
            href="/app/workspace/credits"
            className="inline-flex h-7 items-center gap-1 rounded-full bg-muted px-2.5 text-xs font-medium"
          >
            <Sparkle className="size-3 text-emerald-500" />
            <span>{state.credits}</span>
          </Link>
        </header>

        <div className="relative isolate h-[calc(100dvh-3rem)] w-full overflow-x-hidden overflow-y-auto md:h-[calc(100dvh-1rem)]">
          {children}
        </div>
      </main>

      <GlobalModals />
    </div>
  );
}

export default function AgentLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <AgentSessionProvider>
      <AgentWorkspaceShell>{children}</AgentWorkspaceShell>
    </AgentSessionProvider>
  );
}
