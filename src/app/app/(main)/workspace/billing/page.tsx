"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, CreditCard, Download, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { SettingsShell } from "@/components/settings/settings-shell";
import { useWorkspace } from "@/store/workspace-context";
import { cn } from "@/lib/utils";

interface UpgradePlan {
  readonly id: string;
  readonly name: string;
  readonly monthlyPrice: string;
  readonly annualPrice: string;
  readonly creditsLabel: string;
  readonly badge?: string;
  readonly features: readonly string[];
}

const UPGRADE_PLANS: readonly UpgradePlan[] = [
  {
    id: "pro",
    name: "Pro 专业版",
    monthlyPrice: "$29",
    annualPrice: "$19",
    creditsLabel: "1,200 积分 / 月",
    badge: "最受欢迎",
    features: [
      "解锁 Kling 4.0 / Veo 3.1 / Gemini Omni 高清无水印生成",
      "爆款复刻与换人换物无限次队列优先调度",
      "绑定最多 5 个 TikTok 账号与 2 个 TikTok Shop",
      "支持 CreatOK CLI 与浏览器扩展全功能同步",
    ],
  },
  {
    id: "team",
    name: "Team 团队版",
    monthlyPrice: "$99",
    annualPrice: "$69",
    creditsLabel: "5,000 积分 / 月",
    features: [
      "包含最多 10 名团队协作席位与共享资产库",
      "绑定最多 30 个 TikTok 矩阵账号批量排期",
      "专属高并发渲染通道，生成提速 3 倍",
      "成员积分限额管控与角色权限审计",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise 企业版",
    monthlyPrice: "定制",
    annualPrice: "定制",
    creditsLabel: "按需弹性积分池",
    features: [
      "不限席位与跨地区多店铺集中管理",
      "私有品牌数字人定制与专属模型微调",
      "99.9% SLA 保障与客户成功经理 1 对 1 支持",
      "支持对公转账发票与定制安全合规协议",
    ],
  },
];

const INVOICE_HISTORY = [
  { id: "INV-2026-1101", date: "2026-11-01", desc: "Free 体验计划月度周期重置", amount: "$0.00", status: "已生效" },
  { id: "INV-2026-1018", date: "2026-10-18", desc: "新注册工作区初始赠送积分包 (50 积分)", amount: "$0.00", status: "已入账" },
] as const;

export default function WorkspaceBillingPage() {
  const { state, setOpenSupportModal } = useWorkspace();
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");

  return (
    <SettingsShell
      title="套餐和账单"
      description="查看当前工作区订阅等级、剩余积分额度与历史账单发票"
      headerAction={
        <Link
          href="/zh/pricing"
          className="inline-flex items-center gap-1 rounded-xl border bg-background px-3.5 py-2 text-xs font-medium hover:bg-accent"
        >
          完整价格对比 <ArrowUpRight className="size-3.5" />
        </Link>
      }
    >
      {/* Current Plan & Remaining Credits */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col justify-between rounded-2xl border bg-card p-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">当前工作区套餐</span>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                运行中
              </span>
            </div>
            <div className="mt-2 text-xl font-semibold">Free 创作者体验版</div>
            <p className="mt-1 text-xs text-muted-foreground">
              包含基础 AI 视频/图片模型试用与本地 CLI 密钥体验权限
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <CreditCard className="size-3.5" />
            尚未绑定默认扣款信用卡
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">当前剩余可用积分</span>
            <Link
              href="/app/workspace/credits"
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              查看消耗明细 <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <Sparkles className="size-5 text-emerald-500" />
            <span className="text-3xl font-bold tracking-tight">{state.credits}</span>
            <span className="text-xs text-muted-foreground">/ 月度上限 {state.settings.monthlyCreditLimit}</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Link
              href="/zh/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
            >
              购买积分加油包
            </Link>
            <Link
              href="/app/workspace/credits"
              className="inline-flex items-center justify-center rounded-xl border px-3.5 py-1.5 text-xs font-medium hover:bg-accent"
            >
              积分流水
            </Link>
          </div>
        </div>
      </div>

      {/* Upgrade Plans Comparison */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold">升级订阅计划</h2>
          <div className="inline-flex rounded-full border bg-muted/50 p-1 text-xs">
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={cn(
                "rounded-full px-3 py-1 font-medium transition-colors",
                billingCycle === "annual" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              年付立省 35%
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "rounded-full px-3 py-1 font-medium transition-colors",
                billingCycle === "monthly" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              按月灵活订阅
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {UPGRADE_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "flex flex-col justify-between rounded-2xl border bg-card p-5",
                plan.badge && "border-foreground/40 ring-1 ring-foreground/10"
              )}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold">{plan.name}</h3>
                  {plan.badge && (
                    <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-2xl font-bold">
                    {billingCycle === "annual" ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  {plan.monthlyPrice !== "定制" && (
                    <span className="text-xs text-muted-foreground">/ 月</span>
                  )}
                </div>
                <div className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {plan.creditsLabel}
                </div>

                <ul className="mt-4 space-y-2 border-t pt-4">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (plan.id === "enterprise") {
                    setOpenSupportModal(true);
                  } else {
                    toast.success(`已为您准备 ${plan.name} 结账会话`);
                  }
                }}
                className={cn(
                  "mt-6 w-full rounded-xl py-2 text-xs font-medium transition-opacity hover:opacity-90",
                  plan.badge
                    ? "bg-primary text-primary-foreground"
                    : "border bg-background text-foreground hover:bg-accent"
                )}
              >
                {plan.id === "enterprise" ? "联系商务顾问" : `升级至 ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History Table */}
      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="border-b px-5 py-3.5 text-sm font-semibold">历史账单明细</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b bg-muted/30 text-muted-foreground">
                <th className="px-5 py-3 font-medium">账单编号</th>
                <th className="px-5 py-3 font-medium">日期</th>
                <th className="px-5 py-3 font-medium">项目说明</th>
                <th className="px-5 py-3 font-medium">金额</th>
                <th className="px-5 py-3 font-medium">状态</th>
                <th className="px-5 py-3 text-right font-medium">凭证</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {INVOICE_HISTORY.map((inv) => (
                <tr key={inv.id} className="hover:bg-muted/20">
                  <td className="px-5 py-3 font-mono font-medium">{inv.id}</td>
                  <td className="px-5 py-3 text-muted-foreground">{inv.date}</td>
                  <td className="px-5 py-3">{inv.desc}</td>
                  <td className="px-5 py-3 font-mono">{inv.amount}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-600 dark:text-emerald-400">
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => toast.info(`已导出账单凭证 ${inv.id}.pdf`)}
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                      <Download className="size-3.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SettingsShell>
  );
}
