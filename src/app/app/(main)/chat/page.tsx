"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Copy,
  Files,
  Film,
  History,
  Link2,
  MessageCircle,
  ScanText,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import {
  PRESET_ANALYSES,
  type VideoAnalysisRecord,
} from "@/app/app/(main)/chat/_data/chat-presets";
import { PulseBeam } from "@/components/magicui/pulse-beam";
import { useWorkspace } from "@/store/workspace-context";
import { cn } from "@/lib/utils";

export default function VideoChatAnalysisPage() {
  const { submitTask } = useWorkspace();
  const [historyList, setHistoryList] = useState<readonly VideoAnalysisRecord[]>(() => PRESET_ANALYSES);
  const [selectedId, setSelectedId] = useState<string>(PRESET_ANALYSES[0].id);
  const [urlInput, setUrlInput] = useState("");
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);

  const currentRecord = useMemo(
    () => historyList.find((item) => item.id === selectedId) ?? historyList[0],
    [historyList, selectedId]
  );

  const handleAnalyzeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUrl = urlInput.trim();
    if (!cleanUrl) {
      toast.error("请粘贴 TikTok 视频链接或直接点选下方示例视频");
      return;
    }

    const newRecord: VideoAnalysisRecord = {
      id: `ana-${Date.now()}`,
      title: `TikTok 链接深度拆解 #${historyList.length + 1}`,
      sourceUrl: cleanUrl,
      category: "实时链接解析 · 带货短视频",
      analyzedAt: "刚刚",
      videoSrc: "https://content.creatok.com/static/dashboard/recreation/car-fragrance/comparison.mp4",
      posterSrc:
        "https://content.creatok.com/static/dashboard/recreation/car-fragrance/comparison.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
      retentionScore: "92 / 100（AI 实时诊断）",
      visualHook: "前 2.5 秒采用近景特写切入核心使用场景，明暗对比突出产品轮廓与材质高光。",
      audioHook: "开门见山指出日常使用痛点，语速保持 165 词/分钟高信息密度节奏。",
      fullTranscript:
        "Everyone keeps asking what makes my daily setup look so clean—this compact magnetic diffuser installs in two seconds, lasts two months, and is on deal today!",
      timeline: [
        {
          timeRange: "00:00 - 00:03",
          stage: "痛点好奇钩子",
          cameraNote: "手持推进主体特写，制造视觉焦点",
          spokenLine: "Everyone keeps asking what makes my setup look so clean...",
        },
        {
          timeRange: "00:03 - 00:09",
          stage: "三秒安装实测",
          cameraNote: "单手卡入出风口微距演示，突出便捷性",
          spokenLine: "This magnetic diffuser installs in two seconds and lasts two months.",
        },
        {
          timeRange: "00:09 - 00:14",
          stage: "限时折扣收尾",
          cameraNote: "成品全景与优惠提示贴纸同框",
          spokenLine: "Check the bottom-left cart while the bundle deal is live!",
        },
      ],
    };

    setHistoryList((prev) => [newRecord, ...prev]);
    setSelectedId(newRecord.id);
    setActiveStageIdx(0);
    setUrlInput("");

    submitTask({
      toolPath: "/app/chat",
      toolTitle: "视频爆款拆解",
      prompt: cleanUrl,
      model: "Gemini Omni 1.2 Flash",
      cost: 1,
      previewUrl: newRecord.videoSrc,
      mediaType: "video",
    });

    toast.success("已完成视频钩子、分镜时间轴与口播脚本提炼");
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-8">
      {/* Top Hero & Link Input */}
      <section className="rounded-3xl border bg-gradient-to-b from-muted/50 to-background p-6 md:p-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <MessageCircle className="size-3.5 text-primary" />
            <span>AI Video Chat & Viral Deconstructor</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            分析、复刻或生成爆款带货内容
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            粘贴任意 TikTok 带货视频链接或选择热门样本，秒级拆解黄金前 3 秒钩子、逐帧分镜节奏与高转化口播文案。
          </p>

          <PulseBeam active colorVariant="colorful" className="mt-6">
            <form
              onSubmit={handleAnalyzeSubmit}
              className="flex flex-col gap-2 rounded-2xl border bg-card p-2 shadow-md sm:flex-row sm:items-center"
            >
              <div className="flex flex-1 items-center gap-2.5 px-3">
                <Link2 className="size-4 shrink-0 text-muted-foreground" />
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="粘贴 TikTok 视频链接，例如 https://www.tiktok.com/@shop/video/..."
                  className="h-10 w-full bg-transparent text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-primary px-5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Sparkles className="size-3.5" />
                开始深度拆解
              </button>
            </form>
          </PulseBeam>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground">快速体验示例视频：</span>
            {PRESET_ANALYSES.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setSelectedId(preset.id);
                  setActiveStageIdx(0);
                }}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  currentRecord.id === preset.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Film className="size-3" />
                {preset.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Workspace + Right Session History & Transcript Tool */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <div className="grid gap-5 rounded-2xl border bg-card p-5 shadow-sm md:grid-cols-[240px_1fr]">
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-black">
              <video
                key={currentRecord.videoSrc}
                src={currentRecord.videoSrc}
                poster={currentRecord.posterSrc}
                controls
                playsInline
                loop
                muted
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-between space-y-4">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {currentRecord.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="size-3.5" />
                    {currentRecord.retentionScore}
                  </span>
                </div>

                <h2 className="mt-2.5 text-lg font-bold">{currentRecord.title}</h2>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  来源：{currentRecord.sourceUrl}
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border bg-muted/30 p-3">
                    <div className="text-xs font-semibold">前 3 秒视觉钩子</div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {currentRecord.visualHook}
                    </p>
                  </div>
                  <div className="rounded-xl border bg-muted/30 p-3">
                    <div className="text-xs font-semibold">听觉与情绪锚点</div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {currentRecord.audioHook}
                    </p>
                  </div>
                </div>

                <div className="mt-3 rounded-xl border bg-muted/20 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">完整口播文案提炼</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(currentRecord.fullTranscript);
                        toast.success("已复制提炼口播文案");
                      }}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <Copy className="size-3" />
                      复制口播
                    </button>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-foreground/90">
                    {currentRecord.fullTranscript}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <Link
                  href="/app/viral-video-cloning"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
                >
                  <Files className="size-3.5" />
                  一键复刻同款结构
                </Link>
                <Link
                  href={`/app/agent?mode=video&prompt=${encodeURIComponent(`参考「${currentRecord.title}」的钩子与分镜节奏，替换成我的产品生成新脚本`)}`}
                  className="inline-flex items-center gap-1.5 rounded-xl border bg-background px-3.5 py-2 text-xs font-semibold hover:bg-accent"
                >
                  发送至 Agent 改写
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-bold">
                <Clock className="size-4 text-primary" />
                分镜时间轴拆解
              </h3>
              <span className="text-xs text-muted-foreground">
                共 {currentRecord.timeline.length} 个关键转化节点
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {currentRecord.timeline.map((seg, idx) => (
                <button
                  key={seg.timeRange}
                  type="button"
                  onClick={() => setActiveStageIdx(idx)}
                  className={cn(
                    "flex flex-col items-start rounded-xl border p-3.5 text-left transition-all",
                    activeStageIdx === idx
                      ? "border-primary bg-primary/[0.04] ring-1 ring-primary/20"
                      : "bg-muted/20 hover:bg-muted/40"
                  )}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="rounded-md bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
                      {seg.timeRange}
                    </span>
                    <span className="text-xs font-semibold">{seg.stage}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">运镜：{seg.cameraNote}</p>
                  <p className="mt-1.5 text-xs font-medium text-foreground">
                    口播：“{seg.spokenLine}”
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-card p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold">
              <ScanText className="size-4 text-primary" />
              <span>视频脚本工具</span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              仅需批量提取无水印视频逐字稿、双语字幕 SRT 与纯净口播文案？立即前往轻量级脚本提取器。
            </p>
            <Link
              href="/app/tiktok-transcript-generator"
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
            >
              <span>打开视频脚本工具</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="flex items-center gap-1.5 text-sm font-bold">
                <History className="size-4 text-muted-foreground" />
                会话历史
              </h3>
              <span className="text-xs text-muted-foreground">{historyList.length} 条</span>
            </div>

            <ul className="mt-3 space-y-2">
              {historyList.map((item) => {
                const isSelected = item.id === currentRecord.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedId(item.id);
                        setActiveStageIdx(0);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-colors",
                        isSelected
                          ? "border-primary bg-accent/60"
                          : "border-transparent hover:bg-muted/60"
                      )}
                    >
                      <img
                        src={item.posterSrc}
                        alt={item.title}
                        className="size-11 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-xs font-semibold">{item.title}</div>
                        <div className="mt-0.5 truncate text-[11px] text-muted-foreground">
                          {item.analyzedAt} · {item.category}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
