"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  ArrowUpRight,
  CodeXml,
  PanelLeft,
  Sparkles,
  X,
} from "lucide-react";
import { API_PLATFORM_NAV } from "@/data/navigation";
import { DynamicIcon } from "@/components/icons/dynamic-icon";
import { GlobalModals } from "@/components/layout/global-modals";
import { useWorkspace } from "@/store/workspace-context";
import { cn } from "@/lib/utils";

function ApiSidebarContent({ onNavigate }: { readonly onNavigate?: () => void }) {
  const pathname = usePathname();
  const { state } = useWorkspace();
  const isEn = state.locale === "en";

  return (
    <div className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Top Brand & Return to Dashboard */}
      <div className="flex flex-col gap-3 border-b border-sidebar-border p-3">
        <div className="flex items-center justify-between">
          <Link href="/app/api-platform/pricing" onClick={onNavigate} className="flex items-center gap-2">
            <img
              src="/logo-light_zh-compact.webp"
              alt="CreatOK"
              width={78}
              height={18}
              className="h-[18px] w-auto dark:hidden"
            />
            <img
              src="/logo-dark_zh-compact.webp"
              alt="CreatOK"
              width={78}
              height={18}
              className="hidden h-[18px] w-auto dark:block"
            />
            <span className="inline-flex items-center gap-1 rounded-md bg-violet-500/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-violet-600 dark:text-violet-400">
              <CodeXml className="size-3" />
              API
            </span>
          </Link>
        </div>

        <Link
          href="/app/dashboard"
          onClick={onNavigate}
          className="inline-flex items-center gap-1.5 rounded-lg border border-sidebar-border bg-background/60 px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          返回工作台
        </Link>
      </div>

      {/* 7 API Platform Nav Items */}
      <nav aria-label="API 平台导航" className="flex-1 space-y-1 overflow-y-auto p-2.5">
        {API_PLATFORM_NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                  : "font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
              )}
            >
              <DynamicIcon name={item.icon} className="size-4 shrink-0" />
              <span className="truncate">{isEn ? item.titleEn : item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Top-Up Promo Card & User Footer */}
      <div className="space-y-3 p-3">
        <Link
          href="/app/api-platform/billing#top-up"
          onClick={onNavigate}
          className="group block rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-transparent p-3.5 transition-all hover:border-amber-500/50"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <Sparkles className="size-3.5" />
              充值享优惠
            </span>
            <ArrowUpRight className="size-3.5 text-amber-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-amber-400" />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            立享折扣，按量计费
          </p>
          <div className="mt-2.5 inline-flex rounded-lg bg-amber-500 px-2.5 py-1 text-[11px] font-semibold text-white">
            立即充值
          </div>
        </Link>

        <div className="flex items-center gap-2.5 rounded-xl border border-sidebar-border bg-background/50 px-2.5 py-2">
          <img
            src={state.user.avatar}
            alt={state.user.name}
            className="size-7 rounded-lg object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-semibold">{state.user.name}</div>
            <div className="truncate text-[10px] text-muted-foreground">{state.user.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ApiPlatformLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-svh w-full bg-sidebar">
      {/* Desktop Sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-sidebar-border md:block">
        <div className="sticky top-0 h-svh">
          <ApiSidebarContent />
        </div>
      </aside>

      {/* Mobile Drawer */}
      <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[1px] md:hidden" />
          <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-sidebar shadow-2xl focus:outline-none md:hidden">
            <Dialog.Title className="sr-only">CreatOK API 平台导航</Dialog.Title>
            <div className="absolute right-2.5 top-3 z-10">
              <Dialog.Close className="rounded-md p-1.5 text-muted-foreground hover:bg-accent">
                <X className="size-4" />
              </Dialog.Close>
            </div>
            <ApiSidebarContent onNavigate={() => setMobileOpen(false)} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Main Content */}
      <main className="flex min-w-0 flex-1 flex-col bg-background md:m-2 md:ml-0 md:rounded-2xl md:border md:shadow-sm">
        <header className="flex h-12 shrink-0 items-center justify-between border-b px-4 md:hidden">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="打开 API 导航"
              onClick={() => setMobileOpen(true)}
              className="inline-flex size-8 items-center justify-center rounded-lg hover:bg-accent"
            >
              <PanelLeft className="size-4" />
            </button>
            <span className="text-sm font-semibold">CreatOK API</span>
          </div>
          <Link
            href="/app/dashboard"
            className="text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            返回工作台
          </Link>
        </header>

        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>

      <GlobalModals />
    </div>
  );
}
