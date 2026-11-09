"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as Accordion from "@radix-ui/react-accordion";
import { Check, ChevronDown, Sparkles, Tag, Zap } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PricingPlanTier {
  readonly id: string;
  readonly name: string;
  readonly subtitle: string;
  readonly monthlyPrice: string;
  readonly annualPrice: string;
  readonly credits: string;
  readonly highlight?: boolean;
  readonly badge?: string;
  readonly features: readonly string[];
}

const PLANS: readonly PricingPlanTier[] = [
  {
    id: "free",
    name: "Free",
    subtitle: "适合初次探索 AI 带货流程的个人创作者",
    monthlyPrice: "$0",
    annualPrice: "$0",
    credits: "50 初始体验积分",
    features: [
      "基础视频与电商图片生成模型体验",
      "TikTok 脚本提取与无水印下载工具",
      "灵感库收藏夹与趋势榜单浏览",
      "1 个工作区席位",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    subtitle: "适合单店日更测试爆款素材的跨境卖家",
    monthlyPrice: "$19",
    annualPrice: "$12",
    credits: "500 积分 / 月",
    features: [
      "支持 Gemini Omni 1.2 与 Nano Banana 2.1 高清直出",
      "爆款视频复刻与去字幕/去水印全功能开放",
      "绑定最多 2 个 TikTok 账号排期发布",
      "全部生成成片无平台水印商用授权",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    subtitle: "主力爆单卖家与高产带货达人首选方案",
    monthlyPrice: "$49",
    annualPrice: "$25",
    credits: "1,800 积分 / 月",
    highlight: true,
    badge: "限时 5 折热门",
    features: [
      "全量解锁 Kling 4.0 / Veo 3.1 / GPT Image 2.6",
      "全自动带货 Agent 长链路策划与换人换物模式",
      "绑定最多 10 个 TikTok 账号与 3 个 TikTok Shop",
      "开放 CreatOK CLI & Claude Code Skills 自动化密钥",
    ],
  },
  {
    id: "business",
    name: "Business",
    subtitle: "面向多店铺矩阵团队与 MCN 机构规模化生产",
    monthlyPrice: "$149",
    annualPrice: "$79",
    credits: "6,500 积分 / 月",
    badge: "团队高并发",
    features: [
      "包含最多 15 个团队协作席位与共享商品资产库",
      "绑定最多 50 个 TikTok 矩阵账号批量日历排期",
      "VIP 高优 GPU 渲染队列，最高 10 任务并行",
      "成员级月度积分限额管控与专属技术支持",
    ],
  },
];

const CREDIT_PACKS = [
  { id: "pack-500", credits: "500 积分", price: "$9.90", unitNote: "约合 250 张高清带货图" },
  { id: "pack-2000", credits: "2,000 积分", price: "$32.00", unitNote: "加赠 10% · 永不过期" },
  { id: "pack-6000", credits: "6,000 积分", price: "$85.00", unitNote: "加赠 20% · 黑五旺季备货" },
  { id: "pack-15000", credits: "15,000 积分", price: "$189.00", unitNote: "加赠 30% · 机构矩阵专享" },
] as const;

const FAQ_ITEMS = [
  {
    q: "不同 AI 视频和图片模型分别消耗多少积分？",
    a: "电商图片生成（如 Nano Banana 2.1）每张仅消耗 1 积分；爆款视频复刻与 Kling 4.0 标准 5 秒视频每次消耗 2-5 积分，任务失败自动全额退还积分。",
  },
  {
    q: "积分加油包与月度订阅积分有什么区别？",
    a: "月度订阅积分在每个账单周期自动刷新重置；单独购买的「积分加油包」永久有效不过期，系统会优先扣除当月订阅积分，不足时再自动抵扣加油包额度。",
  },
  {
    q: "工作台套餐积分和 API 开放平台余额互通吗？",
    a: "工作台与 CreatOK CLI Skills 共享当前工作区套餐积分池；如果您需要高并发后端服务直连 REST API，可前往 API 开放平台使用按量美元计费。",
  },
  {
    q: "是否可以随时升级、降级或取消自动续费？",
    a: "可以。您可随时在「工作区设置 - 套餐和账单」中一键管理订阅周期，升级立即按比例折算生效，取消后当期剩余权益仍可正常使用至期末。",
  },
] as const;

export default function MarketingPricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
      {/* Promo Banner */}
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-center text-xs font-medium text-amber-700 dark:text-amber-300">
        <Tag className="size-4 shrink-0" />
        <span>多款旗舰 AI 模型限时最高 5 折特惠，年付订阅立省高达 48%，解锁无限跨境爆单产能！</span>
      </div>

      {/* Header & Billing Switch */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">透明灵活的订阅与积分方案</h1>
        <p className="mx-auto mt-3 max-w-xl text-xs text-muted-foreground sm:text-sm">
          无论您是独立测品卖家还是百人跨境矩阵团队，都能以远低于传统实拍的成本驱动内容增长
        </p>

        <div className="mt-7 inline-flex items-center rounded-full border bg-muted/50 p-1 text-xs">
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={cn(
              "rounded-full px-5 py-2 font-semibold transition-all",
              annual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
            )}
          >
            年付方案（最高 5 折）
          </button>
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={cn(
              "rounded-full px-5 py-2 font-semibold transition-all",
              !annual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
            )}
          >
            月付方案
          </button>
        </div>
      </div>

      {/* 4 Plan Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "flex flex-col justify-between rounded-3xl border bg-card p-6 transition-all",
              plan.highlight && "border-primary ring-2 ring-primary/15 shadow-lg"
            )}
          >
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">{plan.name}</h2>
                {plan.badge && (
                  <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                    {plan.badge}
                  </span>
                )}
              </div>
              <p className="mt-1.5 min-h-[32px] text-xs text-muted-foreground">{plan.subtitle}</p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-3xl font-bold">
                  {annual ? plan.annualPrice : plan.monthlyPrice}
                </span>
                <span className="text-xs text-muted-foreground">/ 月</span>
              </div>
              <div className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <Sparkles className="size-3.5" /> {plan.credits}
              </div>

              <ul className="mt-6 space-y-2.5 border-t pt-5">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {plan.id === "free" ? (
              <Link
                href="/app/dashboard"
                className="mt-7 inline-flex w-full items-center justify-center rounded-xl border bg-background py-2.5 text-xs font-semibold hover:bg-accent"
              >
                免费开始使用
              </Link>
            ) : (
              <button
                type="button"
                onClick={() =>
                  toast.success(`已选择 ${plan.name}（${annual ? "年付" : "月付"}），正在跳转工作台结算`)
                }
                className={cn(
                  "mt-7 w-full rounded-xl py-2.5 text-xs font-semibold transition-opacity hover:opacity-90",
                  plan.highlight
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                立即订阅 {plan.name}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add-on Credit Packs */}
      <section className="rounded-3xl border bg-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="size-4 text-amber-500" />
              <h2 className="text-xl font-bold">按需积分加油包</h2>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              永久有效不随月度清零，大促测品高峰期随时弹性扩容算力
            </p>
          </div>
          <Link
            href="/app/workspace/credits"
            className="text-xs font-medium text-primary hover:underline"
          >
            查看当前工作区剩余积分 &rarr;
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CREDIT_PACKS.map((pack) => (
            <div
              key={pack.id}
              className="flex flex-col justify-between rounded-2xl border bg-background p-4"
            >
              <div>
                <div className="text-base font-bold">{pack.credits}</div>
                <div className="mt-1 text-xs text-muted-foreground">{pack.unitNote}</div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t pt-3">
                <span className="font-mono text-lg font-bold">{pack.price}</span>
                <button
                  type="button"
                  onClick={() => toast.success(`已将「${pack.credits}加油包」加入购买清单`)}
                  className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
                >
                  购买
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="mx-auto max-w-3xl">
        <h2 className="text-center text-2xl font-bold">常见问题解答 (FAQ)</h2>
        <Accordion.Root type="single" collapsible className="mt-6 divide-y rounded-2xl border bg-card">
          {FAQ_ITEMS.map((item, idx) => (
            <Accordion.Item key={item.q} value={`faq-${idx}`} className="px-5">
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between py-4 text-left text-sm font-semibold">
                  <span>{item.q}</span>
                  <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="pb-4 text-xs leading-relaxed text-muted-foreground">
                {item.a}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </section>
    </div>
  );
}
