"use client";

import React from "react";
import Link from "next/link";
import { Check, Copy, ExternalLink, Plus, Store, Terminal, UserPlus } from "lucide-react";

export interface BoundAccount {
  readonly id: string;
  readonly handle: string;
  readonly type: "account" | "shop";
  readonly region: string;
}

interface TikTokAccountsSidebarProps {
  readonly accounts: readonly BoundAccount[];
  readonly copiedCli: boolean;
  readonly onCopyCli: () => void;
  readonly onOpenBindModal: (type: "account" | "shop") => void;
}

export function TikTokAccountsSidebar({
  accounts,
  copiedCli,
  onCopyCli,
  onOpenBindModal,
}: TikTokAccountsSidebarProps) {
  const accountCount = accounts.filter((a) => a.type === "account").length;
  const shopCount = accounts.filter((a) => a.type === "shop").length;

  return (
    <aside className="w-full shrink-0 border-b bg-muted/20 p-5 lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight">账号与店铺</h2>
        <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          OAuth 2.0
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl border bg-background p-3">
          <div className="text-xs text-muted-foreground">账号 {accountCount}</div>
          <div className="mt-1 text-lg font-semibold">{accountCount}</div>
        </div>
        <div className="rounded-xl border bg-background p-3">
          <div className="text-xs text-muted-foreground">店铺 {shopCount}</div>
          <div className="mt-1 text-lg font-semibold">{shopCount}</div>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        <div className="rounded-xl border bg-background p-3.5">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <Store className="size-3.5 text-rose-500" />
              TikTok Shop {shopCount}
            </span>
            <span className="text-[11px] text-muted-foreground">跨境/本土</span>
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            同步店铺商品目录，发布时自动挂载带货商品锚点。
          </p>
          <button
            type="button"
            onClick={() => onOpenBindModal("shop")}
            className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border bg-muted/50 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
          >
            <Plus className="size-3.5" />
            绑定 TikTok Shop
          </button>
        </div>

        <div className="rounded-xl border bg-background p-3.5">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <UserPlus className="size-3.5 text-violet-500" />
              TikTok {accountCount}
            </span>
            <span className="text-[11px] text-muted-foreground">官方直发</span>
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            绑定达人号或品牌矩阵号，支持视频与 9:16 图文定时发布。
          </p>
          <button
            type="button"
            onClick={() => onOpenBindModal("account")}
            className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Plus className="size-3.5" />
            绑定 TikTok 账号
          </button>
        </div>
      </div>

      {accounts.length > 0 && (
        <div className="mt-4 space-y-1.5">
          <div className="text-xs font-medium text-muted-foreground">已连接授权</div>
          {accounts.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border bg-background px-2.5 py-2 text-xs"
            >
              <span className="truncate font-medium">{item.handle}</span>
              <span className="shrink-0 rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] text-emerald-600 dark:text-emerald-400">
                {item.region}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 rounded-xl border bg-background p-3.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-semibold">
            <Terminal className="size-3.5 text-emerald-500" />
            CLI 快捷发布
          </span>
          <Link
            href="/zh/cli"
            className="inline-flex items-center gap-0.5 text-[11px] text-muted-foreground hover:text-foreground"
          >
            文档 <ExternalLink className="size-3" />
          </Link>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2 rounded-lg bg-muted px-2.5 py-2 font-mono text-[11px]">
          <span className="truncate">npx creatok-cli publish</span>
          <button
            type="button"
            onClick={onCopyCli}
            aria-label="复制 CLI 命令"
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            {copiedCli ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
