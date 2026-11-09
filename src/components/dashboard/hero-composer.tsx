"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as Popover from "@radix-ui/react-popover";
import { motion } from "framer-motion";
import {
  ArrowUp,
  BookOpen,
  ChevronDown,
  Film,
  ImagePlus,
  LayoutGrid,
  Maximize2,
  MoveUpRight,
  Pencil,
  Plus,
  SlidersHorizontal,
  Sparkle,
  Sparkles,
  Tag,
  WandSparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { AGENT_PLACEHOLDERS, AGENT_SKILL_PILLS } from "@/data/dashboard-content";
import { DynamicIcon } from "@/components/icons/dynamic-icon";
import { PulseBeam } from "@/components/magicui/pulse-beam";
import { TiptapComposer } from "@/components/editor/tiptap-composer";
import { useWorkspace } from "@/store/workspace-context";
import { cn } from "@/lib/utils";

export type HeroTabMode = "agent" | "video" | "image";

export interface HeroComposerProps {
  readonly activeTab: HeroTabMode;
  readonly onTabChange: (tab: HeroTabMode) => void;
}

export function HeroComposer({ activeTab, onTabChange }: HeroComposerProps) {
  const router = useRouter();
  const { state, submitTask } = useWorkspace();
  const isEn = state.locale === "en";

  const [agentText, setAgentText] = useState("");
  const [videoPrompt, setVideoPrompt] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [videoMode, setVideoMode] = useState<"参考" | "首帧/首尾帧" | "编辑">("参考");
  const [videoModel, setVideoModel] = useState("Veo 3.1 Fast (体验)");
  const [videoSpec, setVideoSpec] = useState("720P · 9:16 · 8s");
  const [imageModel, setImageModel] = useState("Nano Banana 2");
  const [imageSpec, setImageSpec] = useState("2K · auto");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % AGENT_PLACEHOLDERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file.name);
      toast.success(`已添加参考文件：${file.name}`);
    }
  };

  const handleAgentSubmit = () => {
    const text = agentText.trim() || AGENT_PLACEHOLDERS[placeholderIndex];
    submitTask({
      toolPath: "/app/agent",
      toolTitle: "Agent 创作",
      prompt: text,
      model: "CreatOK Agent Omni",
      cost: 1,
      previewUrl: "https://content.creatok.com/static/dashboard/kling-4-cropped.mp4",
      mediaType: "video",
    });
    toast.success("已提交至 AI Agent 工作台");
    router.push("/app/agent");
  };

  const handleVideoQuickGenerate = () => {
    const text = videoPrompt.trim();
    if (!text) {
      toast.info("请输入视频画面描述，或点击下方模板一键做同款");
      return;
    }
    submitTask({
      toolPath: "/app/ai-video-generator",
      toolTitle: "视频生成",
      prompt: text,
      model: videoModel,
      cost: 5,
      previewUrl: "https://content.creatok.com/static/dashboard/kling-4-cropped.mp4",
      mediaType: "video",
    });
    toast.success(`已使用 ${videoModel} 启动生成任务，可在资产库查看`);
    setVideoPrompt("");
  };

  const handleImageQuickGenerate = () => {
    const text = imagePrompt.trim();
    if (!text) {
      toast.info("请输入图片生成描述，或选择下方预设");
      return;
    }
    submitTask({
      toolPath: "/app/image/generator",
      toolTitle: "图片生成",
      prompt: text,
      model: imageModel,
      cost: 1,
      previewUrl:
        "https://content.creatok.com/static/dashboard/image-product-listing-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
      mediaType: "image",
    });
    toast.success(`已使用 ${imageModel} 生成商业图片，已存入资产库`);
    setImagePrompt("");
  };

  const tabs: ReadonlyArray<{ readonly id: HeroTabMode; readonly label: string }> = [
    { id: "agent", label: "Agent" },
    { id: "video", label: isEn ? "Video" : "视频" },
    { id: "image", label: isEn ? "Image" : "图片" },
  ];

  return (
    <div className="space-y-4 pt-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFilePick}
        className="hidden"
      />

      <div className="space-y-3 pt-1 text-center">
        <h1 className="px-2 text-[28px] font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
          {isEn
            ? "Analyze, Clone, or Generate Viral Commerce Content"
            : "分析、复刻或生成爆款带货内容"}
        </h1>

        {/* Segmented Pill Tabs */}
        <div className="flex justify-center pt-1">
          <div
            role="tablist"
            aria-label="创作模式切换"
            className="inline-flex h-9 items-center justify-center rounded-full bg-muted p-1 text-muted-foreground"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  data-state={isActive ? "active" : "inactive"}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-full px-3.5 py-1 text-sm font-medium transition-colors focus-visible:outline-none",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="hero-tab-active-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full bg-background shadow-sm dark:bg-card"
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Tab Panel */}
      <div className="mx-auto w-full max-w-4xl px-1 sm:px-4">
        {activeTab === "agent" && (
          <div className="space-y-3">
            <PulseBeam active colorVariant="colorful">
              <div
                data-slot="input-group"
                className="relative flex w-full flex-col overflow-hidden rounded-3xl border border-border bg-muted/55 shadow-[0_6px_16px_rgba(0,0,0,0.04)] backdrop-blur-lg dark:bg-muted/85"
              >
                {attachedFile && (
                  <div className="flex items-center gap-2 px-4 pt-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-2.5 py-1 text-xs font-medium">
                      {attachedFile}
                      <button
                        type="button"
                        onClick={() => setAttachedFile(null)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  </div>
                )}

                <TiptapComposer
                  value={agentText}
                  onChange={setAgentText}
                  onSubmit={handleAgentSubmit}
                  placeholder={AGENT_PLACEHOLDERS[placeholderIndex]}
                  minHeightClass="min-h-[88px]"
                />

                <div
                  data-slot="input-group-addon"
                  data-align="block-end"
                  className="flex w-full items-center justify-between gap-2 px-2.5 pb-2.5 pt-1"
                >
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label="添加附件"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <Plus className="size-4" />
                    </button>

                    <Popover.Root>
                      <Popover.Trigger asChild>
                        <button
                          type="button"
                          aria-label="技能"
                          className="inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                          <BookOpen className="size-4" />
                          <span>{isEn ? "Skills" : "技能"}</span>
                        </button>
                      </Popover.Trigger>
                      <Popover.Portal>
                        <Popover.Content
                          side="bottom"
                          align="start"
                          sideOffset={6}
                          className="z-50 w-72 rounded-2xl border bg-popover p-2 text-popover-foreground shadow-xl"
                        >
                          <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
                            选择官方电商 Agent 技能
                          </div>
                          <div className="mt-1 grid gap-0.5">
                            {AGENT_SKILL_PILLS.map((skill) => (
                              <Popover.Close key={skill.id} asChild>
                                <button
                                  type="button"
                                  onClick={() => setAgentText(skill.promptTemplate)}
                                  className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-xs font-medium hover:bg-accent"
                                >
                                  <DynamicIcon name={skill.icon} className="size-3.5 text-primary" />
                                  <span>{skill.text}</span>
                                </button>
                              </Popover.Close>
                            ))}
                          </div>
                        </Popover.Content>
                      </Popover.Portal>
                    </Popover.Root>
                  </div>

                  <div className="flex items-center gap-2">
                    <Popover.Root>
                      <Popover.Trigger asChild>
                        <button
                          type="button"
                          aria-label="每日 Agent 额度"
                          className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent"
                        >
                          <svg className="size-4 -rotate-90" viewBox="0 0 20 20">
                            <circle
                              cx="10"
                              cy="10"
                              r="7"
                              fill="none"
                              stroke="currentColor"
                              strokeOpacity="0.22"
                              strokeWidth="2"
                            />
                            <circle
                              cx="10"
                              cy="10"
                              r="7"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeDasharray="44"
                              strokeDashoffset="11"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </Popover.Trigger>
                      <Popover.Portal>
                        <Popover.Content
                          side="top"
                          sideOffset={6}
                          className="z-50 rounded-xl border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md"
                        >
                          今日免费对话额度充足（剩余积分：{state.credits}）
                        </Popover.Content>
                      </Popover.Portal>
                    </Popover.Root>

                    <button
                      type="button"
                      aria-label="发送"
                      onClick={handleAgentSubmit}
                      className="inline-flex size-8 items-center justify-center rounded-full bg-foreground/50 text-background transition-all hover:bg-foreground"
                    >
                      <ArrowUp className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </PulseBeam>

            {/* 6 Skill Suggestion Pills */}
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 pt-0.5">
              {AGENT_SKILL_PILLS.map((pill, idx) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setAgentText(pill.promptTemplate)}
                  className={cn(
                    "group inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-transparent px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground",
                    idx >= 2 && "hidden sm:inline-flex"
                  )}
                >
                  <DynamicIcon name={pill.icon} className="size-3.5" />
                  <span>{isEn ? pill.textEn : pill.text}</span>
                  <MoveUpRight className="size-3 opacity-50 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "video" && (
          <div className="relative flex w-full flex-col gap-3 rounded-3xl border border-border bg-muted/55 p-3.5 shadow-[0_6px_16px_rgba(0,0,0,0.04)] backdrop-blur-lg dark:bg-muted/85">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {(["参考", "首帧/首尾帧", "编辑"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setVideoMode(m)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                      videoMode === m
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {m === "参考" && <ImagePlus className="size-3.5" />}
                    {m === "首帧/首尾帧" && <Film className="size-3.5" />}
                    {m === "编辑" && <Pencil className="size-3.5" />}
                    {m}
                  </button>
                ))}
              </div>
              <button
                type="button"
                aria-label="Expand input"
                onClick={() => router.push("/app/ai-video-generator")}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <Maximize2 className="size-3.5" />
              </button>
            </div>

            <div className="flex items-start gap-3">
              <button
                type="button"
                aria-label="Add reference image"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-16 w-12 shrink-0 items-center justify-center rounded-xl border border-dashed border-muted-foreground/35 bg-background/50 text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground"
              >
                <ImagePlus className="size-4" />
              </button>
              <textarea
                value={videoPrompt}
                onChange={(e) => setVideoPrompt(e.target.value)}
                rows={2}
                placeholder="描述视频画面内容和动态过程，使用 @ 指定参考图或参考视频"
                className="min-h-[60px] flex-1 resize-none bg-transparent py-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setVideoModel((prev) =>
                      prev === "Veo 3.1 Fast (体验)" ? "Kling 4.0" : "Veo 3.1 Fast (体验)"
                    )
                  }
                  className="inline-flex h-7 items-center gap-1.5 rounded-full bg-background px-2.5 text-xs font-medium shadow-xs hover:bg-accent"
                >
                  <Sparkles className="size-3.5 text-primary" />
                  {videoModel}
                  <ChevronDown className="size-3 text-muted-foreground" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setVideoSpec((prev) =>
                      prev === "720P · 9:16 · 8s" ? "1080P · 16:9 · 5s" : "720P · 9:16 · 8s"
                    )
                  }
                  className="inline-flex h-7 items-center gap-1 rounded-full bg-background px-2.5 text-xs font-medium shadow-xs hover:bg-accent"
                >
                  <SlidersHorizontal className="size-3" />
                  {videoSpec}
                </button>
                <span className="inline-flex h-7 items-center rounded-full bg-background px-2.5 text-xs font-medium shadow-xs">
                  1 条
                </span>
                <button
                  type="button"
                  onClick={() => setVideoPrompt("360度子弹时间环绕商业特写，慢动作水珠飞溅，影棚级布光")}
                  className="inline-flex h-7 items-center gap-1 rounded-full bg-background px-2.5 text-xs font-medium shadow-xs hover:bg-accent"
                >
                  <LayoutGrid className="size-3" />
                  预设
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setVideoPrompt((prev) =>
                      prev ? `${prev}，4K超清商业摄影质感，柔和电影光效` : "手持UGC沉浸式开箱，自然晨光"
                    )
                  }
                  className="inline-flex h-7 items-center gap-1 rounded-full bg-background px-2.5 text-xs font-medium shadow-xs hover:bg-accent"
                >
                  <Tag className="size-3" />
                  优化
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/app/prompt-agent")}
                  className="inline-flex h-7 items-center gap-1 rounded-full bg-background px-2.5 text-xs font-medium shadow-xs hover:bg-accent"
                >
                  <WandSparkles className="size-3" />
                  向导
                </button>
              </div>

              <button
                type="button"
                onClick={handleVideoQuickGenerate}
                className="inline-flex h-8 items-center gap-1 rounded-full bg-foreground/60 px-3.5 text-xs font-semibold text-background transition-colors hover:bg-foreground"
              >
                <Sparkle className="size-3.5 text-emerald-400" />
                <span>5</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === "image" && (
          <div className="relative flex w-full flex-col gap-3 rounded-3xl border border-border bg-muted/55 p-3.5 shadow-[0_6px_16px_rgba(0,0,0,0.04)] backdrop-blur-lg dark:bg-muted/85">
            <div className="flex items-start gap-3">
              <button
                type="button"
                aria-label="Add reference image"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-16 w-12 shrink-0 items-center justify-center rounded-xl border border-dashed border-muted-foreground/35 bg-background/50 text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground"
              >
                <ImagePlus className="size-4" />
              </button>
              <textarea
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                rows={2}
                placeholder="描述你想生成或修改的内容；如已上传参考图，可输入 @ 引用"
                className="min-h-[64px] flex-1 resize-none bg-transparent py-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="button"
                aria-label="Expand input"
                onClick={() => router.push("/app/image/generator")}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <Maximize2 className="size-3.5" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setImageModel((prev) =>
                      prev === "Nano Banana 2" ? "GPT Image 2.6" : "Nano Banana 2"
                    )
                  }
                  className="inline-flex h-7 items-center gap-1.5 rounded-full bg-background px-2.5 text-xs font-medium shadow-xs hover:bg-accent"
                >
                  <Sparkles className="size-3.5 text-primary" />
                  {imageModel}
                  <ChevronDown className="size-3 text-muted-foreground" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setImageSpec((prev) => (prev === "2K · auto" ? "4K · 3:4" : "2K · auto"))
                  }
                  className="inline-flex h-7 items-center gap-1 rounded-full bg-background px-2.5 text-xs font-medium shadow-xs hover:bg-accent"
                >
                  <SlidersHorizontal className="size-3" />
                  {imageSpec}
                </button>
                <span className="inline-flex h-7 items-center rounded-full bg-background px-2.5 text-xs font-medium shadow-xs">
                  1 张
                </span>
                <button
                  type="button"
                  onClick={() => setImagePrompt("极简大理石台面护肤精华液主图，柔和清晨窗光，高定商业杂志风")}
                  className="inline-flex h-7 items-center gap-1 rounded-full bg-background px-2.5 text-xs font-medium shadow-xs hover:bg-accent"
                >
                  <LayoutGrid className="size-3" />
                  预设
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/app/image/product-listing")}
                  className="inline-flex h-7 items-center gap-1 rounded-full bg-background px-2.5 text-xs font-medium shadow-xs hover:bg-accent"
                >
                  <WandSparkles className="size-3" />
                  向导
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/app/image/layers")}
                  className="inline-flex h-7 items-center gap-1 rounded-full bg-background px-2.5 text-xs font-medium shadow-xs hover:bg-accent"
                >
                  <Pencil className="size-3" />
                  标注
                </button>
              </div>

              <button
                type="button"
                onClick={handleImageQuickGenerate}
                className="inline-flex h-8 items-center gap-1 rounded-full bg-foreground/60 px-3.5 text-xs font-semibold text-background transition-colors hover:bg-foreground"
              >
                <Sparkle className="size-3.5 text-emerald-400" />
                <span>1</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
