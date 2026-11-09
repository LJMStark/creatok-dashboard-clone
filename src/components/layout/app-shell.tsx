"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Popover from "@radix-ui/react-popover";
import { BugOff, ChevronDown, Gift, PanelLeft, Sparkle } from "lucide-react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { GlobalModals } from "@/components/layout/global-modals";
import { DynamicIcon } from "@/components/icons/dynamic-icon";
import { STUDIO_TOOLS_LIST, getStudioToolByPath } from "@/data/studio-tools";
import { useWorkspace } from "@/store/workspace-context";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { readonly children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolMenuOpen, setToolMenuOpen] = useState(false);
  const { state, setOpenFeedbackModal } = useWorkspace();

  const isDashboard = pathname === "/app/dashboard";
  const currentStudioTool = getStudioToolByPath(pathname);
  const siblingTools = currentStudioTool
    ? STUDIO_TOOLS_LIST.filter((item) => item.category === currentStudioTool.category)
    : [];

  return (
    <div className="group/sidebar-wrapper flex min-h-svh w-full bg-sidebar">
      <AppSidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
        mobileOpen={mobileOpen}
        onMobileOpenChange={setMobileOpen}
      />

      <main className="relative flex w-full flex-1 flex-col overflow-x-hidden rounded-xl bg-background md:m-2 md:ml-0 md:rounded-2xl md:shadow">
        {/* Mobile Header Bar */}
        <header className="flex h-12 shrink-0 items-center justify-between border-b px-3 md:hidden">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-foreground hover:bg-accent"
            >
              <PanelLeft className="size-4" />
            </button>
            <Link href="/app/dashboard" className="flex items-center">
              <img
                src="/logo-light_zh-compact.webp"
                alt="CreatOK"
                width={76}
                height={17}
                className="h-[17px] w-auto dark:hidden"
              />
              <img
                src="/logo-dark_zh-compact.webp"
                alt="CreatOK"
                width={76}
                height={17}
                className="hidden h-[17px] w-auto dark:block"
              />
            </Link>
          </div>
          <div className="flex items-center gap-1.5">
            <Link
              href="/app/workspace/credits"
              className="inline-flex h-7 items-center gap-1 rounded-full bg-muted px-2.5 text-xs font-medium"
            >
              <Sparkle className="size-3 text-emerald-500" />
              <span>{state.credits}</span>
            </Link>
            <Link
              href="/zh/pricing"
              className="inline-flex h-7 items-center rounded-full bg-amber-500/15 px-2.5 text-xs font-semibold text-amber-600 dark:text-amber-400"
            >
              低至 5 折
            </Link>
          </div>
        </header>

        {/* Desktop Subpage Inset Top Bar (matches orig-cloning/trending/flow/tiktok-desktop.png) */}
        {!isDashboard && (
          <div className="hidden h-12 shrink-0 items-center justify-between border-b border-border/70 px-4 md:flex">
            <div className="flex items-center gap-2">
              {currentStudioTool && (
                <Popover.Root open={toolMenuOpen} onOpenChange={setToolMenuOpen}>
                  <Popover.Trigger asChild>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                    >
                      <span>{currentStudioTool.title}</span>
                      <ChevronDown className="size-3.5 text-muted-foreground" />
                    </button>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content
                      align="start"
                      sideOffset={6}
                      className="z-50 w-64 rounded-2xl border bg-popover p-1.5 text-popover-foreground shadow-xl"
                    >
                      <div className="px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground">
                        切换创作工具
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {siblingTools.map((t) => (
                          <Link
                            key={t.path}
                            href={t.path}
                            onClick={() => setToolMenuOpen(false)}
                            className={cn(
                              "flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium transition-colors hover:bg-accent",
                              t.path === pathname && "bg-accent font-semibold text-foreground"
                            )}
                          >
                            <span className="flex items-center gap-2">
                              <DynamicIcon name="Sparkles" className="size-3.5 text-muted-foreground" />
                              {t.title}
                            </span>
                            {t.creditCost === 0 && (
                              <span className="rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] text-emerald-600">
                                免费
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/zh/pricing"
                className="inline-flex h-7 items-center gap-1 rounded-full bg-amber-500/15 px-3 text-xs font-semibold text-amber-600 transition-colors hover:bg-amber-500/25 dark:text-amber-400"
              >
                <Gift className="size-3.5" />
                <span>低至 5 折</span>
              </Link>
              <button
                type="button"
                aria-label="界面反馈与诊断开关"
                onClick={() => setOpenFeedbackModal(true)}
                className="inline-flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <BugOff className="size-4" />
              </button>
            </div>
          </div>
        )}

        <div
          id="agent-welcome-scroll-container"
          className={cn(
            "relative isolate w-full overflow-x-hidden overflow-y-auto",
            isDashboard
              ? "h-[calc(100dvh-3rem)] md:h-[calc(100dvh-1rem)]"
              : "h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)]"
          )}
        >
          {children}
        </div>
      </main>

      <GlobalModals />
    </div>
  );
}
