"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { ArrowRight, Moon, Sun } from "lucide-react";
import { GlobalModals } from "@/components/layout/global-modals";
import { cn } from "@/lib/utils";

const PUBLIC_NAV_ITEMS = [
  { label: "产品", href: "/zh" },
  { label: "价格", href: "/zh/pricing" },
  { label: "CLI & Skills", href: "/zh/cli" },
  { label: "浏览器扩展", href: "/zh/extension" },
  { label: "API 平台", href: "/app/api-platform/pricing" },
] as const;

export default function MarketingZhLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Glassmorphic Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/zh" className="flex items-center gap-2">
              <img
                src="/logo-light_zh-compact.webp"
                alt="CreatOK"
                width={92}
                height={21}
                className="h-[20px] w-auto dark:hidden"
              />
              <img
                src="/logo-dark_zh-compact.webp"
                alt="CreatOK"
                width={92}
                height={21}
                className="hidden h-[20px] w-auto dark:block"
              />
            </Link>

            <nav aria-label="官网主导航" className="hidden items-center gap-1 md:flex">
              {PUBLIC_NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              aria-label="切换深浅主题"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex size-9 items-center justify-center rounded-full border bg-background/80 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Sun className="size-4 dark:hidden" />
              <Moon className="hidden size-4 dark:block" />
            </button>

            <Link
              href="/app/dashboard"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 sm:text-sm"
            >
              进入工作台
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Mobile Sub-strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto border-t border-border/50 px-4 py-2 no-scrollbar md:hidden">
          {PUBLIC_NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 text-xs font-medium",
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </header>

      {/* Main Marketing Body */}
      <main className="flex-1">{children}</main>

      {/* Unified Footer */}
      <footer className="border-t bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <Link href="/zh" className="inline-flex items-center">
                <img
                  src="/logo-light_zh-compact.webp"
                  alt="CreatOK"
                  width={88}
                  height={20}
                  className="h-[19px] w-auto dark:hidden"
                />
                <img
                  src="/logo-dark_zh-compact.webp"
                  alt="CreatOK"
                  width={88}
                  height={20}
                  className="hidden h-[19px] w-auto dark:block"
                />
              </Link>
              <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">
                CreatOK（爆款猎人）— 专为 TikTok 跨境电商团队打造的 AI 视频复刻、带货图文与自动化分发平台。
              </p>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-foreground">
                核心工作台
              </div>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                <li>
                  <Link href="/app/viral-video-cloning" className="hover:text-foreground">
                    爆款视频复刻
                  </Link>
                </li>
                <li>
                  <Link href="/app/agent" className="hover:text-foreground">
                    带货创作 Agent
                  </Link>
                </li>
                <li>
                  <Link href="/app/image/shoppable-images" className="hover:text-foreground">
                    9:16 带货图文
                  </Link>
                </li>
                <li>
                  <Link href="/app/platform/tiktok" className="hover:text-foreground">
                    TikTok 矩阵发布
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-foreground">
                开发者与生态
              </div>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                <li>
                  <Link href="/zh/cli" className="hover:text-foreground">
                    CreatOK CLI & Skills
                  </Link>
                </li>
                <li>
                  <Link href="/zh/extension" className="hover:text-foreground">
                    Chrome 浏览器扩展
                  </Link>
                </li>
                <li>
                  <Link href="/app/api-platform/pricing" className="hover:text-foreground">
                    开放平台 API 价格
                  </Link>
                </li>
                <li>
                  <Link href="/app/api-platform/playground" className="hover:text-foreground">
                    API 在线调试台
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-foreground">
                支持与订阅
              </div>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                <li>
                  <Link href="/zh/pricing" className="hover:text-foreground">
                    套餐与积分加油包
                  </Link>
                </li>
                <li>
                  <Link href="/app/workspace/settings" className="hover:text-foreground">
                    工作区管理
                  </Link>
                </li>
                <li>
                  <Link href="/app/trending" className="hover:text-foreground">
                    TikTok 爆款趋势榜
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-xs text-muted-foreground">
            <span>Copyright 2026 CreatOK AI Inc. All rights reserved.</span>
            <span>专为全球电商创作者构建</span>
          </div>
        </div>
      </footer>

      <GlobalModals />
    </div>
  );
}
