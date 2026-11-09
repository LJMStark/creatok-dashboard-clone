"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2 } from "lucide-react";
import { WORKSPACE_SETTINGS_NAV } from "@/data/navigation";
import { DynamicIcon } from "@/components/icons/dynamic-icon";
import { useWorkspace } from "@/store/workspace-context";
import { cn } from "@/lib/utils";

export interface SettingsShellProps {
  readonly title: string;
  readonly description?: string;
  readonly headerAction?: React.ReactNode;
  readonly children: React.ReactNode;
}

export function SettingsShell({
  title,
  description,
  headerAction,
  children,
}: SettingsShellProps) {
  const pathname = usePathname();
  const { state } = useWorkspace();
  const isEn = state.locale === "en";

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-5 md:flex-row md:gap-8 md:p-8">
      {/* Mobile Horizontal Pill Navigation */}
      <nav
        aria-label="设置导航（移动端）"
        className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar md:hidden"
      >
        {WORKSPACE_SETTINGS_NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "border-foreground bg-foreground text-background"
                  : "bg-background text-muted-foreground hover:text-foreground"
              )}
            >
              <DynamicIcon name={item.icon} className="size-3.5" />
              <span>{isEn ? item.titleEn : item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Desktop Vertical Secondary Sidebar */}
      <aside className="hidden w-56 shrink-0 md:block">
        <div className="mb-4 flex items-center gap-2.5 rounded-xl border bg-muted/30 px-3 py-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Building2 className="size-4" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-xs font-semibold">{state.settings.teamName}</div>
            <div className="truncate text-[11px] text-muted-foreground">{state.user.email}</div>
          </div>
        </div>

        <nav aria-label="设置导航" className="flex flex-col gap-1">
          {WORKSPACE_SETTINGS_NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-accent font-semibold text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                )}
              >
                <DynamicIcon
                  name={item.icon}
                  className={cn("size-4 shrink-0", active ? "text-foreground" : "text-muted-foreground")}
                />
                <span className="truncate">{isEn ? item.titleEn : item.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-5">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
            {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>

        <div className="mt-6 space-y-6">{children}</div>
      </div>
    </div>
  );
}
