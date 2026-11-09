"use client";

import React from "react";
import Link from "next/link";
import { Bot, CheckCircle2, Copy, Film, Layers, Play, Sparkles } from "lucide-react";
import { toast } from "sonner";
import type { AgentMessage } from "@/app/app/agent/_data/agent-workspace-data";

export function AssistantTurnCard({ message }: { readonly message: AgentMessage }) {
  const preview = message.mediaPreview;

  return (
    <div className="flex items-start gap-3.5">
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Bot className="size-4" />
      </div>
      <div className="min-w-0 flex-1 space-y-3.5">
        {message.thinkingSummary && (
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
            <CheckCircle2 className="size-3.5 text-emerald-500" />
            <span>{message.thinkingSummary}</span>
          </div>
        )}

        <div className="rounded-2xl border bg-card p-4 text-sm leading-relaxed text-card-foreground shadow-sm">
          <p>{message.content}</p>

          {message.shots && message.shots.length > 0 && (
            <div className="mt-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Layers className="size-3.5 text-primary" />
                  结构化分镜与口播企划
                </span>
                <span>共 {message.shots.length} 幕</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {message.shots.map((shot) => (
                  <div
                    key={shot.shotNumber}
                    className="rounded-xl border bg-muted/30 p-3 text-xs transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span>{shot.shotNumber}</span>
                      <span className="rounded-md bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        {shot.duration}
                      </span>
                    </div>
                    <p className="mt-1.5 text-muted-foreground">{shot.visualPrompt}</p>
                    <p className="mt-1.5 border-t border-border/60 pt-1.5 font-medium text-foreground">
                      {shot.voiceover}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {preview && (
            <div className="mt-4 overflow-hidden rounded-2xl border bg-muted/20">
              <div className="grid gap-4 p-3.5 sm:grid-cols-[200px_1fr]">
                <div className="relative aspect-[9/14] w-full overflow-hidden rounded-xl bg-black">
                  {preview.mediaType === "video" && preview.videoUrl ? (
                    <video
                      src={preview.videoUrl}
                      poster={preview.posterUrl}
                      controls
                      playsInline
                      loop
                      muted
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={preview.posterUrl}
                      alt={preview.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                  <span className="pointer-events-none absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-black/65 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                    <Play className="size-2.5" />
                    {preview.aspectRatio}
                  </span>
                </div>

                <div className="flex flex-col justify-between py-1">
                  <div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                      <Sparkles className="size-3" />
                      渲染已完成 · {preview.model}
                    </div>
                    <h4 className="mt-2 text-base font-semibold">{preview.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      已自动适配 TikTok 竖屏安全区，保留底部挂车小黄车与字幕锚点空间，可直接二次精修或同步至矩阵频道。
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Link
                      href={preview.cloneHref}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      <Film className="size-3.5" />
                      进入专项工具精修
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(message.content);
                        toast.success("已复制完整分镜脚本");
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl border bg-background px-3 py-2 text-xs font-medium hover:bg-accent"
                    >
                      <Copy className="size-3.5" />
                      复制脚本
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
