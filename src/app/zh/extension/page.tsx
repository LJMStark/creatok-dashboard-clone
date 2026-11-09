"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Chrome,
  Download,
  Files,
  FolderHeart,
  ScanText,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const EXTENSION_TABS = [
  {
    id: "script",
    title: "一键拆解爆款脚本",
    icon: ScanText,
    badge: "毫秒级提取",
    summary:
      "在浏览 TikTok 网页版任意带货视频时，悬浮窗自动解析前 3 秒视觉钩子、逐句带时间戳口播台词与转化成交话术结构。",
    mockLines: [
      "[00:00 - 00:03] 痛点钩子：展示传统支架颠簸掉落瞬间，引发车主共鸣",
      "[00:03 - 00:09] 核心演示：单手一贴磁吸稳固，急转弯实测特写",
      "[00:09 - 00:14] 促单行动：左下角 TikTok Shop 限时免邮锚点引导",
    ],
  },
  {
    id: "collect",
    title: "高清无水印采集素材",
    icon: Download,
    badge: "原画直存",
    summary:
      "支持单条短视频及 9:16 Shoppable 图文轮播全图集无水印下载，或一键归档至您的 CreatOK 云端灵感库与团队共享。",
    mockLines: [
      "已解析源视频流：1080 x 1920 (60fps, 无平台浮水印)",
      "已提取独立背景音乐 BGM 与原始净音人声轨",
      "同步归档至灵感库收藏夹：「黑五高转化前3秒钩子」",
    ],
  },
  {
    id: "push",
    title: "直推复刻工作台换品",
    icon: Files,
    badge: "无缝流转",
    summary:
      "告别繁琐的下载再上传！点击视频右上角「复刻此爆款」按钮，立即携带原片参数跳转至 CreatOK 复刻台替换您的自有商品。",
    mockLines: [
      "已捕获参考源视频 ID：7428192039182",
      "自动匹配工作区商品资产：极简金属车载香薰瓶",
      "已预填 Kling 4.0 Omni 换品分镜提示词，随时点击生成",
    ],
  },
] as const;

const INSTALL_STEPS = [
  {
    step: "01",
    title: "添加至 Chrome / Edge 浏览器",
    desc: "支持所有 Chromium 内核浏览器，安装后固定至右上角扩展工具栏。",
  },
  {
    step: "02",
    title: "自动同步工作台登录态",
    desc: "与您的 CreatOK 工作区无缝共享收藏夹、商品库与模型额度。",
  },
  {
    step: "03",
    title: "刷 TikTok 时悬浮即用",
    desc: "在任意视频卡片或详情页悬停，即可触发脚本拆解、无水印保存与一键复刻。",
  },
] as const;

export default function MarketingExtensionPage() {
  const [activeFeatureId, setActiveFeatureId] = useState<string>("script");

  const currentFeature =
    EXTENSION_TABS.find((f) => f.id === activeFeatureId) ?? EXTENSION_TABS[0];

  return (
    <div className="mx-auto max-w-6xl space-y-20 px-4 py-14 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3.5 py-1 text-xs font-medium">
          <Chrome className="size-3.5 text-violet-500" />
          <span>CreatOK Chrome 浏览器扩展 v2.3</span>
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
          边刷 TikTok，边拆解脚本与一键复刻爆款
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-base">
          将 CreatOK 的 AI 洞察与复刻引擎直接嵌入 TikTok 网页端。看到同行起量视频的瞬间，1 秒完成台词反推、无水印素材入库并推送到复刻工作台。
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={() => toast.success("已触发 CreatOK Chrome 扩展安装引导，亦可直接在工作台使用全部拆解工具")}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-md hover:opacity-90"
          >
            <Chrome className="size-4" />
            免费添加至 Chrome
          </button>
          <Link
            href="/app/viral-video-cloning"
            className="inline-flex items-center gap-2 rounded-full border bg-background px-6 py-3 text-sm font-medium hover:bg-accent"
          >
            直接在复刻工作台体验
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Interactive Browser Overlay Demo */}
      <section className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="space-y-3 lg:col-span-5">
          {EXTENSION_TABS.map((tab) => {
            const Icon = tab.icon;
            const active = tab.id === activeFeatureId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFeatureId(tab.id)}
                className={cn(
                  "w-full rounded-2xl border p-5 text-left transition-all",
                  active
                    ? "border-primary bg-card shadow-sm ring-1 ring-primary/15"
                    : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Icon className={cn("size-4", active ? "text-primary" : "text-muted-foreground")} />
                    <span className="text-sm font-semibold text-foreground">{tab.title}</span>
                  </div>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold">
                    {tab.badge}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{tab.summary}</p>
              </button>
            );
          })}
        </div>

        {/* Simulated Browser Extension Sidecar Preview */}
        <div className="overflow-hidden rounded-3xl border bg-card shadow-lg lg:col-span-7">
          <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-rose-500/70" />
              <span className="size-2.5 rounded-full bg-amber-500/70" />
              <span className="size-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-2 rounded-md bg-background px-3 py-1 font-mono text-[11px] text-muted-foreground">
                tiktok.com/@shop_creator/video/74281920
              </span>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-violet-600 dark:text-violet-400">
              <Sparkles className="size-3" /> CreatOK 助手已就绪
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-12">
            <div className="relative aspect-[9/14] overflow-hidden rounded-2xl bg-muted sm:col-span-5">
              <img
                src="https://content.creatok.com/static/dashboard/recreation/car-fragrance/comparison.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast"
                alt="TikTok 视频预览"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-2.5 top-2.5 flex justify-end">
                <span className="rounded-lg bg-primary px-2.5 py-1 text-[10px] font-semibold text-primary-foreground shadow">
                  一键复刻
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border bg-muted/20 p-4 sm:col-span-7">
              <div>
                <div className="text-xs font-semibold text-foreground">
                  {currentFeature.title} · 实时侧栏输出
                </div>
                <div className="mt-3 space-y-2.5">
                  {currentFeature.mockLines.map((line) => (
                    <div
                      key={line}
                      className="flex items-start gap-2 rounded-xl border bg-background p-2.5 text-xs leading-relaxed"
                    >
                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 pt-2">
                <Link
                  href="/app/viral-video-cloning"
                  className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl bg-primary py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
                >
                  推送至复刻工作台 <ArrowRight className="size-3.5" />
                </Link>
                <Link
                  href="/app/collections"
                  aria-label="查看灵感库"
                  className="inline-flex items-center justify-center rounded-xl border bg-background px-3 py-2 text-xs font-medium hover:bg-accent"
                >
                  <FolderHeart className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps */}
      <section className="rounded-3xl border bg-muted/20 p-6 sm:p-10">
        <h2 className="text-center text-2xl font-bold">三步开启高效选品与拆解工作流</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {INSTALL_STEPS.map((s) => (
            <div key={s.step} className="rounded-2xl border bg-background p-5">
              <div className="font-mono text-xs font-bold text-violet-600 dark:text-violet-400">
                STEP {s.step}
              </div>
              <h3 className="mt-2 text-base font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
