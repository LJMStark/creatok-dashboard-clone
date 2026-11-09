"use client";

import React, { useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import { CreditCard, Download, RefreshCw, Sparkles, Wallet } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface TopUpTier {
  readonly amount: number;
  readonly bonus: number;
  readonly badge?: string;
}

const TOP_UP_TIERS: readonly TopUpTier[] = [
  { amount: 20, bonus: 0 },
  { amount: 50, bonus: 5, badge: "赠 $5" },
  { amount: 100, bonus: 15, badge: "赠 $15 · 热门" },
  { amount: 500, bonus: 100, badge: "赠 $100 · 企业首选" },
];

const MONTHLY_STATEMENTS = [
  { id: "API-2026-11", month: "2026 年 11 月（进行中）", totalUsd: "$72.65", status: "按量结算中" },
  { id: "API-2026-10", month: "2026 年 10 月", totalUsd: "$148.20", status: "已结清" },
] as const;

export default function ApiPlatformBillingPage() {
  const [balanceUsd, setBalanceUsd] = useState(127.35);
  const [selectedTier, setSelectedTier] = useState<TopUpTier>(TOP_UP_TIERS[2]);
  const [autoRecharge, setAutoRecharge] = useState(true);
  const [thresholdUsd, setThresholdUsd] = useState("20");

  const handleTopUp = () => {
    const creditAdded = selectedTier.amount + selectedTier.bonus;
    setBalanceUsd((prev) => Number((prev + creditAdded).toFixed(2)));
    toast.success(
      `充值成功！实际到账 $${creditAdded.toFixed(2)}（含赠金 $${selectedTier.bonus}）`
    );
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-5 md:p-8">
      <div>
        <div className="flex items-center gap-2">
          <CreditCard className="size-5 text-primary" />
          <h1 className="text-2xl font-semibold tracking-tight">API 账户账单与充值</h1>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          管理开放平台美元预付余额、阶梯充值赠金、低余额自动续充策略与月度对账单下载
        </p>
      </div>

      {/* Account Balance Card */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-card p-6">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Wallet className="size-6" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground">当前可用 API 余额</div>
            <div className="mt-1 font-mono text-3xl font-bold tracking-tight">
              ${balanceUsd.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="text-right text-xs text-muted-foreground">
          <div>当前并发等级：<span className="font-semibold text-foreground">Tier 2 (100 并发)</span></div>
          <div className="mt-0.5">余额永不过期 · 支持全系视频与图片接口</div>
        </div>
      </div>

      {/* Online Top-up Section (#top-up) */}
      <section id="top-up" className="scroll-mt-6 rounded-2xl border bg-card p-6">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-amber-500" />
          <h2 className="text-base font-semibold">在线充值享阶梯赠金</h2>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          选择充值档位立即到账，除接口本身折扣价外还可叠加充值赠送额度
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TOP_UP_TIERS.map((tier) => {
            const active = selectedTier.amount === tier.amount;
            return (
              <button
                key={tier.amount}
                type="button"
                onClick={() => setSelectedTier(tier)}
                className={cn(
                  "flex flex-col items-start justify-between rounded-2xl border p-4 text-left transition-all",
                  active
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "bg-background hover:border-foreground/30"
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="font-mono text-xl font-bold">${tier.amount}</span>
                  {tier.badge && (
                    <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                      {tier.badge}
                    </span>
                  )}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  实得总额：<span className="font-mono font-semibold text-foreground">${tier.amount + tier.bonus}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
          <div className="text-xs text-muted-foreground">
            应付金额：<span className="font-mono text-sm font-bold text-foreground">${selectedTier.amount}.00 USD</span>
          </div>
          <button
            type="button"
            onClick={handleTopUp}
            className="rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
          >
            确认充值 ${selectedTier.amount}
          </button>
        </div>
      </section>

      {/* Auto Recharge Switch */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-card p-5">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <RefreshCw className="size-4" />
          </div>
          <div>
            <div className="text-sm font-semibold">自动充值防停机保护</div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              当账户余额低于设定阈值时自动按所选档位续充，保障线上自动化流水线不中断
            </p>
            {autoRecharge && (
              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">触发余额阈值 ($)：</span>
                <input
                  type="number"
                  value={thresholdUsd}
                  onChange={(e) => setThresholdUsd(e.target.value)}
                  className="w-20 rounded-lg border bg-background px-2.5 py-1 font-mono text-xs"
                />
              </div>
            )}
          </div>
        </div>

        <Switch.Root
          checked={autoRecharge}
          onCheckedChange={(checked) => {
            setAutoRecharge(checked);
            toast.success(checked ? "已开启低余额自动充值" : "已关闭自动充值");
          }}
          className="relative h-6 w-11 shrink-0 cursor-pointer rounded-full bg-muted transition-colors data-[state=checked]:bg-primary"
        >
          <Switch.Thumb className="block size-5 translate-x-0.5 rounded-full bg-background shadow transition-transform data-[state=checked]:translate-x-[22px]" />
        </Switch.Root>
      </div>

      {/* Monthly Statements Download */}
      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="border-b px-5 py-3.5 text-sm font-semibold">月度账单与发票下载</div>
        <div className="divide-y">
          {MONTHLY_STATEMENTS.map((stmt) => (
            <div
              key={stmt.id}
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 text-xs"
            >
              <div>
                <div className="font-semibold text-foreground">{stmt.month}</div>
                <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                  单号：{stmt.id} · {stmt.status}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm font-semibold">{stmt.totalUsd}</span>
                <button
                  type="button"
                  onClick={() => toast.info(`正在下载月度对账单 ${stmt.id}.pdf`)}
                  className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 font-medium hover:bg-accent"
                >
                  <Download className="size-3.5" /> 下载账单
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
