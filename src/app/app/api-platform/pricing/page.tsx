"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, Sparkles, Tag, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

type PricingCategory = "all" | "video-gen" | "image-gen" | "video-tools" | "video-publish";

interface ApiModelPriceRow {
  readonly id: string;
  readonly modelName: string;
  readonly modelSlug: string;
  readonly category: Exclude<PricingCategory, "all">;
  readonly categoryLabel: string;
  readonly unit: string;
  readonly officialPrice: string;
  readonly creatokPrice: string;
  readonly discountBadge: string;
  readonly specs: string;
}

const CATEGORY_TABS: readonly { readonly key: PricingCategory; readonly label: string }[] = [
  { key: "all", label: "全部" },
  { key: "video-gen", label: "视频生成" },
  { key: "image-gen", label: "图片生成" },
  { key: "video-tools", label: "视频工具" },
  { key: "video-publish", label: "视频发布" },
];

const API_PRICE_ROWS: readonly ApiModelPriceRow[] = [
  {
    id: "kling-4-0",
    modelName: "Kling 4.0",
    modelSlug: "kling-4.0-omni",
    category: "video-gen",
    categoryLabel: "视频生成",
    unit: "每秒 (1080P)",
    officialPrice: "$0.140",
    creatokPrice: "$0.084",
    discountBadge: "6 折",
    specs: "支持首尾帧控制、多主体一致性与商业原声同步",
  },
  {
    id: "gemini-omni-1-2",
    modelName: "Gemini Omni 1.2 Flash",
    modelSlug: "gemini-omni-1.2-flash",
    category: "video-gen",
    categoryLabel: "视频生成",
    unit: "每秒 (720P/1080P)",
    officialPrice: "$0.090",
    creatokPrice: "$0.045",
    discountBadge: "5 折限时",
    specs: "超低延迟多模态带货短视频生成与爆款分镜直出",
  },
  {
    id: "veo-3-1",
    modelName: "Veo 3.1",
    modelSlug: "veo-3.1-pro",
    category: "video-gen",
    categoryLabel: "视频生成",
    unit: "每秒 (1080P 含音效)",
    officialPrice: "$0.250",
    creatokPrice: "$0.165",
    discountBadge: "6.6 折",
    specs: "电影级物理光影模拟、真实口播对口型与环境立体声",
  },
  {
    id: "seedance-2-5",
    modelName: "Seedance 2.5",
    modelSlug: "doubao-seedance-2.5",
    category: "video-gen",
    categoryLabel: "视频生成",
    unit: "每条 (5s 1080P)",
    officialPrice: "$0.400",
    creatokPrice: "$0.280",
    discountBadge: "7 折",
    specs: "大幅度产品特写运镜与电商模特换装动态表现优异",
  },
  {
    id: "nano-banana-2-1",
    modelName: "Nano Banana 2.1",
    modelSlug: "nano-banana-2.1",
    category: "image-gen",
    categoryLabel: "图片生成",
    unit: "每张 (2K 高清)",
    officialPrice: "$0.050",
    creatokPrice: "$0.028",
    discountBadge: "5.6 折",
    specs: "精准保留商品包装文字标签，适合电商主图与 9:16 轮播",
  },
  {
    id: "gpt-image-2-6",
    modelName: "GPT Image 2.6",
    modelSlug: "gpt-image-2.6-flare",
    category: "image-gen",
    categoryLabel: "图片生成",
    unit: "每张 (1024x1536)",
    officialPrice: "$0.080",
    creatokPrice: "$0.048",
    discountBadge: "6 折",
    specs: "复杂多图排版理解、A+ 详情图文字海报直出无乱码",
  },
  {
    id: "subtitle-watermark-remover",
    modelName: "Video Clean & Upscale",
    modelSlug: "video-clean-v2",
    category: "video-tools",
    categoryLabel: "视频工具",
    unit: "每秒处理",
    officialPrice: "$0.030",
    creatokPrice: "$0.015",
    discountBadge: "5 折",
    specs: "AI 无痕去字幕、去平台水印与 4K 60fps 画质增强接口",
  },
  {
    id: "viral-clone-pipeline",
    modelName: "Viral Video Cloning Engine",
    modelSlug: "creatok-clone-v3",
    category: "video-tools",
    categoryLabel: "视频工具",
    unit: "每次完整拆解+替换",
    officialPrice: "$0.600",
    creatokPrice: "$0.360",
    discountBadge: "6 折",
    specs: "输入参考 TikTok 视频与新商品图，一键复刻分镜与产品主体",
  },
  {
    id: "tiktok-direct-publish",
    modelName: "TikTok Matrix Publisher API",
    modelSlug: "tiktok-publish-v1",
    category: "video-publish",
    categoryLabel: "视频发布",
    unit: "每次发布 / 排期",
    officialPrice: "$0.020",
    creatokPrice: "$0.008",
    discountBadge: "4 折",
    specs: "支持 OAuth 多账号短视频与 9:16 带货图文挂载商品锚点直发",
  },
];

export default function ApiPlatformPricingPage() {
  const [activeCategory, setActiveCategory] = useState<PricingCategory>("all");
  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    return API_PRICE_ROWS.filter((row) => {
      if (activeCategory !== "all" && row.category !== activeCategory) {
        return false;
      }
      if (query.trim()) {
        const q = query.toLowerCase();
        return (
          row.modelName.toLowerCase().includes(q) ||
          row.modelSlug.toLowerCase().includes(q) ||
          row.specs.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeCategory, query]);

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-5 md:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">价格</h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <Tag className="size-3" /> 按量透明计费
            </span>
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            无需月租最低消费，失败请求自动全额退回余额，大额充值叠加阶梯赠金折上折
          </p>
        </div>

        <Link
          href="/app/api-platform/billing#top-up"
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
        >
          <Sparkles className="size-3.5" />
          充值获取额外折扣 <ArrowUpRight className="size-3.5" />
        </Link>
      </div>

      {/* 5 Filter Tabs + Search */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto rounded-xl border bg-muted/40 p-1 text-xs no-scrollbar">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveCategory(tab.key)}
              className={cn(
                "shrink-0 rounded-lg px-3.5 py-1.5 font-medium transition-colors",
                activeCategory === tab.key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索模型名称或调用代号..."
            className="w-full rounded-xl border bg-background py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {/* Pricing Comparison Table */}
      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b bg-muted/30 text-muted-foreground">
                <th className="px-5 py-3.5 font-medium">模型 / 接口名称</th>
                <th className="px-4 py-3.5 font-medium">分类</th>
                <th className="px-4 py-3.5 font-medium">计费单位</th>
                <th className="px-4 py-3.5 font-medium">官方基准价</th>
                <th className="px-4 py-3.5 font-medium">CreatOK 折后单价</th>
                <th className="px-5 py-3.5 text-right font-medium">快速体验</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredRows.map((row) => (
                <tr key={row.id} className="transition-colors hover:bg-muted/20">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{row.modelName}</span>
                      <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {row.modelSlug}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{row.specs}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <span className="rounded-full border px-2.5 py-0.5 text-[11px] font-medium">
                      {row.categoryLabel}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">{row.unit}</td>
                  <td className="whitespace-nowrap px-4 py-4 font-mono text-muted-foreground line-through">
                    {row.officialPrice}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        {row.creatokPrice}
                      </span>
                      <span className="rounded-md bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                        {row.discountBadge}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-right">
                    <Link
                      href={`/app/api-platform/playground?model=${encodeURIComponent(row.modelSlug)}`}
                      className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 font-medium hover:bg-accent"
                    >
                      <Terminal className="size-3" /> 调试
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
