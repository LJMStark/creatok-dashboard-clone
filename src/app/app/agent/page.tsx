"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowUp,
  FileImage,
  ImagePlus,
  Puzzle,
  Sparkle,
  Sparkles,
  Video,
} from "lucide-react";
import { toast } from "sonner";
import { AGENT_PLACEHOLDERS, AGENT_SKILL_PILLS } from "@/data/dashboard-content";
import { DynamicIcon } from "@/components/icons/dynamic-icon";
import { PulseBeam } from "@/components/magicui/pulse-beam";
import { TiptapComposer } from "@/components/editor/tiptap-composer";
import { AssistantTurnCard } from "@/app/app/agent/_components/assistant-turn-card";
import { useAgentSessions } from "@/app/app/agent/_store/agent-session-context";
import { useWorkspace } from "@/store/workspace-context";
import { cn } from "@/lib/utils";

const VIDEO_MODELS = ["Kling 4.0 Omni", "Seedance 2.5", "Gemini Omni 1.2 Flash"] as const;
const IMAGE_MODELS = ["Nano Banana 2.1", "GPT Image 2.6", "Hy Image 3.5 Preview"] as const;

function AgentStudioInner() {
  const searchParams = useSearchParams();
  const { state, submitTask } = useWorkspace();
  const { activeSession, sendPromptToAgent, enabledPluginIds } = useAgentSessions();

  const [creationMode, setCreationMode] = useState<"video" | "image">("video");
  const [selectedModel, setSelectedModel] = useState<string>(VIDEO_MODELS[0]);
  const [composerText, setComposerText] = useState("");
  const [attachedProductTag, setAttachedProductTag] = useState<string | null>(null);

  useEffect(() => {
    const queryMode = searchParams.get("mode");
    const queryPrompt = searchParams.get("prompt");
    if (queryMode === "image" || queryMode === "video") {
      setCreationMode(queryMode);
      setSelectedModel(queryMode === "image" ? IMAGE_MODELS[0] : VIDEO_MODELS[0]);
    }
    if (queryPrompt) {
      setComposerText(queryPrompt);
    }
  }, [searchParams]);

  const handleModeSwitch = (nextMode: "video" | "image") => {
    setCreationMode(nextMode);
    setSelectedModel(nextMode === "video" ? VIDEO_MODELS[0] : IMAGE_MODELS[0]);
  };

  const handleSend = () => {
    const cleanText = composerText.trim();
    if (!cleanText) {
      toast.error("请输入创作需求或选择一个预设技能卡片");
      return;
    }

    const finalPrompt = attachedProductTag ? `[参考素材: ${attachedProductTag}] ${cleanText}` : cleanText;
    const result = sendPromptToAgent({
      prompt: finalPrompt,
      mode: creationMode,
      model: selectedModel,
    });

    submitTask({
      toolPath: "/app/agent",
      toolTitle: creationMode === "video" ? "Agent 视频创作" : "Agent 图文创作",
      prompt: finalPrompt,
      model: selectedModel,
      cost: result.cost,
      previewUrl: result.previewUrl,
      mediaType: result.mediaType,
    });

    setComposerText("");
    setAttachedProductTag(null);
    toast.success("Agent 已完成分镜策划与成片预览生成");
  };

  const modelList = creationMode === "video" ? VIDEO_MODELS : IMAGE_MODELS;
  const placeholderText =
    creationMode === "video" ? AGENT_PLACEHOLDERS[1] : AGENT_PLACEHOLDERS[2];
  const hasConversation = Boolean(activeSession && activeSession.messages.length > 0);

  return (
    <div className="flex min-h-full flex-col justify-between px-4 py-5 md:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="创作模式切换"
          className="inline-flex items-center rounded-full border bg-muted/60 p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={creationMode === "video"}
            onClick={() => handleModeSwitch("video")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
              creationMode === "video"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Video className="size-3.5" />
            视频创作
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={creationMode === "image"}
            onClick={() => handleModeSwitch("image")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
              creationMode === "image"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <FileImage className="size-3.5" />
            图文创作
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/app/agent/skills"
            className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Sparkles className="size-3.5 text-amber-500" />
            官方技能库
          </Link>
          <Link
            href="/app/agent/plugins"
            className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Puzzle className="size-3.5 text-violet-500" />
            已启用 {enabledPluginIds.length} 项技能
          </Link>
        </div>
      </div>

      {!hasConversation ? (
        <div className="mx-auto my-auto flex w-full max-w-3xl flex-col items-center py-10 text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkle className="size-3.5 text-emerald-500" />
            <span>CreatOK Ecommerce Agent · 一句话直出分镜与带货成片</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {creationMode === "video"
              ? "策划、拆解并生成高转化带货视频"
              : "一键生成 9:16 种草轮播与电商商品套图"}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            输入商品卖点、粘贴爆款参考或点选下方官方技能，Agent 将自动编排钩子脚本并驱动多模态模型完成渲染。
          </p>

          <div className="mt-7 grid w-full gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {AGENT_SKILL_PILLS.map((pill) => (
              <button
                key={pill.id}
                type="button"
                onClick={() => setComposerText(pill.promptTemplate)}
                className="group flex flex-col items-start gap-2 rounded-2xl border bg-card p-3.5 text-left transition-all hover:border-primary/40 hover:bg-accent/40 hover:shadow-sm"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="inline-flex size-8 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <DynamicIcon name={pill.icon} className="size-4" />
                  </span>
                  <span className="text-[11px] text-muted-foreground">点击填入</span>
                </div>
                <div className="text-xs font-semibold">{pill.text}</div>
                <p className="line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                  {pill.promptTemplate}
                </p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto my-6 flex w-full max-w-4xl flex-1 flex-col gap-6">
          {activeSession?.messages.map((msg) =>
            msg.role === "user" ? (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[82%] rounded-2xl bg-primary px-4 py-3 text-sm text-primary-foreground shadow-sm">
                  <p>{msg.content}</p>
                  <div className="mt-1 text-right text-[10px] opacity-70">{msg.timestamp}</div>
                </div>
              </div>
            ) : (
              <AssistantTurnCard key={msg.id} message={msg} />
            )
          )}
        </div>
      )}

      <div className="mx-auto mt-4 w-full max-w-3xl pb-2">
        <PulseBeam active colorVariant="colorful">
          <div className="rounded-3xl border bg-card/95 p-2 shadow-lg backdrop-blur">
            {attachedProductTag && (
              <div className="mx-3 mt-1.5 inline-flex items-center gap-2 rounded-lg bg-muted px-2.5 py-1 text-xs">
                <ImagePlus className="size-3.5 text-primary" />
                <span>已关联商品白底图：{attachedProductTag}</span>
                <button
                  type="button"
                  onClick={() => setAttachedProductTag(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  移除
                </button>
              </div>
            )}

            <TiptapComposer
              value={composerText}
              onChange={setComposerText}
              onSubmit={handleSend}
              placeholder={placeholderText}
              minHeightClass="min-h-[76px]"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 px-3 pb-1 pt-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setAttachedProductTag("SKU-极简车载香薰主图.webp");
                    toast.info("已挂载示例商品素材图");
                  }}
                  className="inline-flex h-8 items-center gap-1.5 rounded-full border bg-background px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <ImagePlus className="size-3.5" />
                  上传商品图
                </button>

                <select
                  aria-label="选择生成模型"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="h-8 rounded-full border bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  {modelList.map((modelName) => (
                    <option key={modelName} value={modelName}>
                      {modelName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-[11px] text-muted-foreground">
                  消耗 {creationMode === "video" ? 2 : 1} 积分 · 剩余 {state.credits}
                </span>
                <button
                  type="button"
                  aria-label="发送指令"
                  onClick={handleSend}
                  className="inline-flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-105 active:scale-95"
                >
                  <ArrowUp className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </PulseBeam>
      </div>
    </div>
  );
}

export default function AgentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          正在加载 Agent 创作台...
        </div>
      }
    >
      <AgentStudioInner />
    </Suspense>
  );
}
