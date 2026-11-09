"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Cpu,
  Files,
  Images,
  Send,
  Sparkles,
  Terminal,
  Video,
} from "lucide-react";
import { SHOWCASE_VIDEOS } from "@/data/dashboard-content";

const MODEL_MATRIX = [
  {
    name: "Kling 4.0 Omni",
    tag: "视频旗舰",
    desc: "首尾帧精准锁定与多主体一致性控制，轻松驾驭长镜头电商口播与实景换品。",
    href: "/app/ai-video-generator?model=kling-4-omni",
  },
  {
    name: "Gemini Omni 1.2 Flash",
    tag: "极速高性价比",
    desc: "多模态原生理解参考分镜，秒级输出高完播 TikTok 带货钩子与商品特写。",
    href: "/app/ai-video-generator?model=gemini-omni-1.2-flash",
  },
  {
    name: "Veo 3.1",
    tag: "电影级声画",
    desc: "真实物理流体光影与同步商业音效直出，打造高溢价品牌广告质感。",
    href: "/app/ai-video-generator",
  },
  {
    name: "Seedance 2.5",
    tag: "高动态运镜",
    desc: "擅长穿搭走秀、开箱旋转与大幅度动作一致性生成，服饰箱包类目首选。",
    href: "/app/ai-video-generator?model=doubao-seedance-2.5",
  },
  {
    name: "Nano Banana 2.1",
    tag: "零乱码商品图",
    desc: "精准保留产品包装瓶身英文标签细节，一键生成 9:16 种草带货轮播套图。",
    href: "/app/image/generator?model=nano-banana-2.1",
  },
  {
    name: "GPT Image 2.6",
    tag: "排版海报专家",
    desc: "深度理解电商痛点对比页、A+ 规格长图与高点击卖点字卡视觉层次。",
    href: "/app/image/generator?model=gpt-image-2.6-flare",
  },
] as const;

const WORKFLOW_PILLARS = [
  {
    icon: Bot,
    title: "全自动带货 Agent",
    desc: "输入一条 TikTok 链接或一张白底商品图，Agent 自动拆解黄金前 3 秒钩子并规划全套分镜。",
    href: "/app/agent",
  },
  {
    icon: Files,
    title: "1:1 爆款视频换品复刻",
    desc: "保留已验证爆款视频的运镜节奏与人物表现，无缝将画面中商品替换成您的自有 SKU。",
    href: "/app/viral-video-cloning",
  },
  {
    icon: Images,
    title: "带货图文与详情套图",
    desc: "批量生成 TikTok Shoppable 滑动图集、主图与 A+ 长图，测试爆款成本降低 90%。",
    href: "/app/image/shoppable-images",
  },
  {
    icon: Send,
    title: "多店铺日历直发与 CLI",
    desc: "连接 TikTok Shop 与矩阵账号定时挂车分发，或通过 CLI 接入 Claude Code 自动化流水线。",
    href: "/app/platform/tiktok",
  },
] as const;

export default function MarketingHomeZhPage() {
  const featuredComparisons = SHOWCASE_VIDEOS.slice(0, 4);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-violet-500/[0.06] via-background to-background pt-16 pb-20 sm:pt-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3.5 py-1.5 text-xs font-medium shadow-sm">
            <Sparkles className="size-3.5 text-amber-500" />
            <span>CreatOK（爆款猎人）全新升级：支持 Kling 4.0 与 CLI Agent Skills</span>
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            把全球 TikTok 爆款视频
            <span className="mt-1 block bg-gradient-to-r from-violet-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              一键复刻成你的带货印钞机
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            集爆款脚本拆解、AI 换人换物复刻、9:16 带货图文生成与 TikTok Shop 多账号自动排期于一体。无需实拍影棚，单人即可日产百条高转化跨境带货素材。
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/app/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-opacity hover:opacity-90"
            >
              免费进入工作台
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/zh/cli"
              className="inline-flex items-center gap-2 rounded-full border bg-background px-6 py-3 text-sm font-medium hover:bg-accent"
            >
              <Terminal className="size-4 text-emerald-500" />
              探索 CLI & Agent Skills
            </Link>
          </div>
        </div>
      </section>

      {/* Viral Cloning & Agent Comparison Showcase */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
              Viral Video Cloning
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              原片 vs 复刻实测对比
            </h2>
            <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
              精准继承百万播放视频的镜头语言与卡点节奏，仅需上传白底产品图即可自然替换主角商品
            </p>
          </div>
          <Link
            href="/app/viral-video-cloning"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline sm:text-sm"
          >
            前往爆款复刻工作台 <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredComparisons.map((item) => (
            <Link
              key={item.id}
              href={item.targetHref}
              className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-md"
            >
              <div className="relative aspect-[9/12] w-full overflow-hidden bg-muted">
                <video
                  src={item.mediaUrl}
                  poster={item.posterUrl}
                  muted
                  loop
                  playsInline
                  onMouseEnter={(e) => {
                    void e.currentTarget.play().catch(() => undefined);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                  }}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                  <Video className="size-3" /> 悬停预览对比
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.promptHint}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4 Workflow Pillars */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">从洞察到出单的完整闭环</h2>
          <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
            打通选品拆解、多模态批量生产与跨店矩阵分发每一个环节
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.title}
                href={pillar.href}
                className="flex flex-col justify-between rounded-2xl border bg-card p-6 transition-colors hover:border-foreground/30"
              >
                <div>
                  <div className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{pillar.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{pillar.desc}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  立即使用 <ArrowRight className="size-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Multi-Model Matrix */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border bg-muted/20 p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <Cpu className="size-4" /> 全球顶尖多模型统一调度
              </div>
              <h2 className="mt-1.5 text-2xl font-bold tracking-tight">顶尖生成模型矩阵，一处尽享</h2>
            </div>
            <Link
              href="/app/api-platform/pricing"
              className="rounded-full border bg-background px-4 py-2 text-xs font-medium hover:bg-accent"
            >
              查看 API 折扣价格表
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODEL_MATRIX.map((m) => (
              <Link
                key={m.name}
                href={m.href}
                className="rounded-2xl border bg-background p-5 transition-all hover:border-foreground/25 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">{m.name}</span>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-semibold">
                    {m.tag}
                  </span>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">{m.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border bg-primary px-6 py-14 text-center text-primary-foreground">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            准备好用 AI 规模化放大你的 TikTok GMV 了吗？
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs opacity-80 sm:text-sm">
            立即进入 CreatOK 工作台，体验爆款视频复刻、商品套图生成与全自动智能体工作流。
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/app/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-background px-7 py-3 text-sm font-semibold text-foreground hover:opacity-95"
            >
              立即进入工作台 <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/zh/pricing"
              className="inline-flex items-center rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10"
            >
              了解套餐价格
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
