"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import * as Accordion from "@radix-ui/react-accordion";
import {
  ArrowRight,
  ChevronDown,
  Copy,
  Lightbulb,
  LoaderPinwheel,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  UsersRound,
  Video,
} from "lucide-react";
import { toast } from "sonner";
import {
  FAQ_ITEMS,
  HOOK_TYPES,
  INDUSTRIES,
  VISUAL_STYLES,
} from "@/app/app/(main)/inspiration-hub/_data/flywheel-data";
import { useWorkspace } from "@/store/workspace-context";
import { cn } from "@/lib/utils";

const TARGET_AUDIENCE_CARDS = [
  {
    title: "跨境卖家与 DTC 品牌方",
    Icon: ShoppingBag,
    description:
      "告别单品反复套用同一套平庸口播。通过多维行业痛点与运镜风格随机碰撞，单日即可产出 20+ 组差异化测品脚本。",
  },
  {
    title: "TikTok 带货达人与内容编导",
    Icon: UsersRound,
    description:
      "当面对陌生新品不知如何切入黄金前 3 秒时，一键转动创意飞轮即可获取经过百万播放验证的情绪钩子与镜头调度单。",
  },
  {
    title: "效果广告投手与增长团队",
    Icon: TrendingUp,
    description:
      "自动同步输出可直接喂给 Kling 4.0、Seedance 2.5 与 Agent 的结构化多模态提示词，大幅缩短从灵感到投流素材上线的周期。",
  },
] as const;

export default function InspirationHubPage() {
  const { submitTask } = useWorkspace();
  const [industryIdx, setIndustryIdx] = useState(0);
  const [hookIdx, setHookIdx] = useState(0);
  const [styleIdx, setStyleIdx] = useState(0);
  const [customProduct, setCustomProduct] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);

  const selectedIndustry = INDUSTRIES[industryIdx];
  const selectedHook = HOOK_TYPES[hookIdx];
  const selectedStyle = VISUAL_STYLES[styleIdx];

  const generatedPlan = useMemo(() => {
    const productTitle = customProduct.trim() || selectedIndustry.sampleProduct;
    const spokenHook = selectedHook.hookTemplate.replace("{product}", productTitle);
    const aiPrompt = `[${selectedIndustry.label} · ${productTitle}] ${selectedStyle.promptSuffix}`;
    return {
      productTitle,
      spokenHook,
      aiPrompt,
      structure: [
        `00-03s（${selectedHook.label}）：${spokenHook}`,
        `03-10s（${selectedStyle.label}）：聚焦展示「${productTitle}」的核心差异化细节与使用反馈`,
        "10-15s（紧迫感促单 CTA）：点明限时组合折扣，引导点击左下角小黄车立即下单",
      ],
    };
  }, [customProduct, selectedHook, selectedIndustry, selectedStyle]);

  const handleSpinWheel = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const nextInd =
        (industryIdx + 1 + Math.floor(Math.random() * (INDUSTRIES.length - 1))) %
        INDUSTRIES.length;
      const nextHook =
        (hookIdx + 1 + Math.floor(Math.random() * (HOOK_TYPES.length - 1))) % HOOK_TYPES.length;
      const nextStyle =
        (styleIdx + 1 + Math.floor(Math.random() * (VISUAL_STYLES.length - 1))) %
        VISUAL_STYLES.length;
      setIndustryIdx(nextInd);
      setHookIdx(nextHook);
      setStyleIdx(nextStyle);
      setIsSpinning(false);

      submitTask({
        toolPath: "/app/inspiration-hub",
        toolTitle: "创意飞轮灵感碰撞",
        prompt: `${INDUSTRIES[nextInd].label} × ${HOOK_TYPES[nextHook].label} × ${VISUAL_STYLES[nextStyle].label}`,
        model: "Inspiration Engine",
        cost: 0,
        previewUrl:
          "https://content.creatok.com/static/dashboard/viral-cloning-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
        mediaType: "text",
      });
      toast.success("已碰撞生成全新爆款带货创意组合！");
    }, 280);
  };

  const handleCopyAll = () => {
    const fullText = [
      `【目标单品】${generatedPlan.productTitle}`,
      `【黄金钩子口播】${generatedPlan.spokenHook}`,
      `【三段分镜脚本】\n${generatedPlan.structure.join("\n")}`,
      `【AI 视频提示词】${generatedPlan.aiPrompt}`,
    ].join("\n\n");
    navigator.clipboard?.writeText(fullText);
    toast.success("完整带货文案与提示词方案已复制");
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 md:px-8">
      <section className="text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border bg-muted/50 px-3.5 py-1 text-xs font-medium text-muted-foreground">
          <LoaderPinwheel className={cn("size-3.5 text-primary", isSpinning && "animate-spin")} />
          <span>带货视频文案 & 提示词生成工具</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          告别创意枯竭，点燃你的灵感
        </h1>
        <p className="mx-auto mt-2.5 max-w-2xl text-sm text-muted-foreground">
          自由拨动「细分行业 × 黄金钩子 × 视觉运镜」三维创意飞轮，一键碰撞生成高留存 TikTok 带货口播文案与多模态视频提示词。
        </p>
      </section>

      <section className="rounded-3xl border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-5">
          <div className="flex flex-1 items-center gap-2.5">
            <Lightbulb className="size-5 shrink-0 text-amber-500" />
            <input
              type="text"
              value={customProduct}
              onChange={(e) => setCustomProduct(e.target.value)}
              placeholder={`输入你的商品名称（默认示例：${selectedIndustry.sampleProduct}）`}
              className="h-10 w-full max-w-md rounded-xl border bg-background px-3.5 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <button
            type="button"
            onClick={handleSpinWheel}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-sm transition-transform hover:opacity-95 active:scale-95"
          >
            <RefreshCw className={cn("size-4", isSpinning && "animate-spin")} />
            随机转动创意飞轮
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-muted/20 p-4">
            <div className="text-xs font-bold text-muted-foreground">01 · 选择目标行业</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {INDUSTRIES.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndustryIdx(idx)}
                  className={cn(
                    "rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all",
                    industryIdx === idx
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "bg-background hover:bg-accent"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/20 p-4">
            <div className="text-xs font-bold text-muted-foreground">02 · 黄金前 3 秒钩子</div>
            <div className="mt-3 flex flex-col gap-1.5">
              {HOOK_TYPES.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setHookIdx(idx)}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-all",
                    hookIdx === idx
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "bg-background hover:bg-accent"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/20 p-4">
            <div className="text-xs font-bold text-muted-foreground">03 · 商业视觉运镜</div>
            <div className="mt-3 flex flex-col gap-1.5">
              {VISUAL_STYLES.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStyleIdx(idx)}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-all",
                    styleIdx === idx
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "bg-background hover:bg-accent"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border bg-gradient-to-br from-muted/50 via-background to-muted/30 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold">
              <Sparkles className="size-4 text-emerald-500" />
              <span>
                当前创意配方：{selectedIndustry.label} × {selectedHook.label} × {selectedStyle.label}
              </span>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              高完播推荐结构
            </span>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="space-y-2 rounded-xl border bg-card p-4">
              <div className="text-xs font-semibold text-muted-foreground">带货分镜与口播脚本</div>
              <ul className="space-y-2 text-xs leading-relaxed">
                {generatedPlan.structure.map((line) => (
                  <li key={line} className="rounded-lg bg-muted/40 px-3 py-2">
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between rounded-xl border bg-card p-4">
              <div>
                <div className="text-xs font-semibold text-muted-foreground">
                  可直接投喂模型的视频提示词（Prompt）
                </div>
                <p className="mt-2 rounded-lg bg-muted/40 p-3 font-mono text-xs leading-relaxed text-foreground">
                  {generatedPlan.aiPrompt}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyAll}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border bg-background px-3.5 py-2 text-xs font-semibold hover:bg-accent"
                >
                  <Copy className="size-3.5" />
                  一键复制完整方案
                </button>
                <Link
                  href={`/app/agent?mode=video&prompt=${encodeURIComponent(`${generatedPlan.spokenHook} ${generatedPlan.aiPrompt}`)}`}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
                >
                  <Video className="size-3.5" />
                  发送至 Agent 生成视频
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">谁需要创意飞轮？</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            为高频产出短视频与种草图文的电商增长团队量身打造
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {TARGET_AUDIENCE_CARDS.map(({ title, Icon, description }) => (
            <div key={title} className="rounded-2xl border bg-card p-5 shadow-sm">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-3.5 text-base font-bold">{title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl space-y-4 pb-6">
        <div className="text-center">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">常见问题</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            关于创意飞轮分类数量、商用授权与成片转化的解答
          </p>
        </div>

        <Accordion.Root
          type="single"
          defaultValue="faq-1"
          collapsible
          className="divide-y rounded-2xl border bg-card shadow-sm"
        >
          {FAQ_ITEMS.map((faq) => (
            <Accordion.Item key={faq.id} value={faq.id} className="px-5">
              <Accordion.Header className="flex">
                <Accordion.Trigger className="group flex flex-1 items-center justify-between py-4 text-left text-sm font-semibold transition-colors hover:text-primary">
                  <span>{faq.question}</span>
                  <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden pb-4 text-xs leading-relaxed text-muted-foreground">
                {faq.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </section>
    </div>
  );
}
