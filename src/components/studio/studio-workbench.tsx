"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeftRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Download,
  Folder,
  Pencil,
  Sparkle,
  Sparkles,
  Store,
  Upload,
  Volume2,
  WandSparkles,
} from "lucide-react";
import { toast } from "sonner";
import { getStudioToolByPath, type StudioToolConfig } from "@/data/studio-tools";
import { SHOWCASE_VIDEOS } from "@/data/dashboard-content";
import { useWorkspace } from "@/store/workspace-context";
import { cn } from "@/lib/utils";

function StudioWorkbenchInner({ tool }: { readonly tool: StudioToolConfig }) {
  const searchParams = useSearchParams();
  const { state, submitTask } = useWorkspace();

  const [selectedModel, setSelectedModel] = useState<string>(tool.models[0] ?? "Default");
  const [selectedMode, setSelectedMode] = useState<string>(tool.modeTabs?.[0] ?? "");
  const [selectedRatio, setSelectedRatio] = useState<string>(tool.aspectRatios?.[0] ?? "9:16");
  const [prompt, setPrompt] = useState<string>("");
  const [videoLink, setVideoLink] = useState<string>("");
  const [productInfo, setProductInfo] = useState<string>("");
  const [targetLang, setTargetLang] = useState<string>("英语");
  const [targetRegion, setTargetRegion] = useState<string>("美国");
  const [uploadedName, setUploadedName] = useState<string | null>(null);
  const [rightTab, setRightTab] = useState<"history" | "hot" | "examples">("examples");
  const [activeExampleIdx, setActiveExampleIdx] = useState<number>(0);
  const [transcriptView, setTranscriptView] = useState<"script" | "shots" | "structure">("script");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const modelQuery = searchParams.get("model");
    if (modelQuery) {
      const matched = tool.models.find((m) =>
        m
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "")
          .includes(modelQuery.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 6))
      );
      if (matched) setSelectedModel(matched);
    }
    const modeQuery = searchParams.get("mode");
    if (modeQuery === "elements" && tool.modeTabs?.includes("换人换物")) {
      setSelectedMode("换人换物");
    }
  }, [searchParams, tool.models, tool.modeTabs]);

  const relatedTasks = state.tasks.filter((t) => t.toolPath === tool.path);
  const examples = SHOWCASE_VIDEOS.slice(0, 5);
  const currentExample = examples[activeExampleIdx] ?? examples[0];
  const isCloningTool = tool.slug === "viral-video-cloning" || tool.slug === "cloning";
  const hasInputReady = Boolean(uploadedName || videoLink.trim() || prompt.trim());

  const applyTryExample = () => {
    const sampleTitle = currentExample?.title ?? tool.title;
    setUploadedName(`tiktok-viral-${activeExampleIdx + 1}.mp4`);
    setVideoLink(`https://www.tiktok.com/@shop/video/743892019283${activeExampleIdx}`);
    setProductInfo(`${sampleTitle} · 跨境高转化主力款`);
    setPrompt(
      currentExample?.promptHint ??
        `${tool.title}：${tool.presets[0] ?? "高转化电商视觉生成"}（${selectedMode || selectedRatio}）`
    );
    toast.success(`已载入示例「${sampleTitle}」，点击左下角按钮即可生成`);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPrompt =
      prompt.trim() ||
      videoLink.trim() ||
      `${tool.title}：${tool.presets[0] ?? "高转化电商视觉生成"}（${selectedMode || selectedRatio}）`;

    const mediaType =
      tool.category === "video"
        ? "video"
        : tool.category === "audio"
          ? "audio"
          : tool.category === "image"
            ? "image"
            : "text";

    submitTask({
      toolPath: tool.path,
      toolTitle: tool.title,
      prompt: finalPrompt,
      model: selectedModel,
      cost: tool.creditCost,
      previewUrl: tool.sampleMediaUrl,
      mediaType,
    });

    toast.success(`${tool.title}任务已完成，已添加至历史记录`);
    setRightTab("history");
  };

  return (
    <div className="flex min-h-full w-full flex-col gap-5 p-4 lg:flex-row lg:p-5">
      <input
        ref={fileInputRef}
        type="file"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) {
            setUploadedName(f.name);
            toast.success(`已载入素材：${f.name}`);
          }
        }}
        className="hidden"
      />

      {/* Left Carded Configuration Panel (matches orig-cloning-desktop.png) */}
      <form
        onSubmit={handleGenerate}
        className="flex w-full shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs lg:w-[410px] xl:w-[436px]"
      >
        <div className="flex flex-col gap-5 p-5">
          {/* Card Header */}
          <div className="flex items-center gap-2">
            <Copy className="size-4 text-foreground/80" />
            <h1 className="text-base font-semibold tracking-tight">{tool.title}</h1>
          </div>

          {/* Mode Tabs if present */}
          {tool.modeTabs && tool.modeTabs.length > 0 && (
            <div className="no-scrollbar flex items-center gap-1 overflow-x-auto rounded-xl bg-muted/70 p-1">
              {tool.modeTabs.map((m, idx) => (
                <button
                  key={m}
                  type="button"
                  role="tab"
                  aria-selected={selectedMode === m}
                  onClick={() => setSelectedMode(m)}
                  className={cn(
                    "inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                    selectedMode === m
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {idx === 0 ? <Copy className="size-3.5" /> : <ArrowLeftRight className="size-3.5" />}
                  {m}
                </button>
              ))}
            </div>
          )}

          {isCloningTool ? (
            <>
              {/* Target Video Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">目标视频</label>
                <div className="flex h-12 items-center gap-1.5 rounded-xl border border-border/80 bg-background px-3 focus-within:ring-1 focus-within:ring-ring">
                  <input
                    type="text"
                    value={uploadedName ? `已选择：${uploadedName}` : videoLink}
                    onChange={(e) => {
                      setUploadedName(null);
                      setVideoLink(e.target.value);
                    }}
                    placeholder="输入链接、上传或从资产库选择"
                    className="min-w-0 flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                  <button
                    type="button"
                    aria-label="上传本地视频"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex size-8 items-center justify-center rounded-lg bg-muted/70 text-foreground transition-colors hover:bg-muted"
                  >
                    <Upload className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="从资产库选择"
                    onClick={applyTryExample}
                    className="inline-flex size-8 items-center justify-center rounded-lg bg-muted/70 text-foreground transition-colors hover:bg-muted"
                  >
                    <Folder className="size-3.5" />
                  </button>
                </div>
                <div className="text-center text-[11px] text-muted-foreground">
                  链接支持： <span className="font-medium text-foreground/80">TikTok</span>
                </div>
              </div>

              {/* Product Info Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">商品信息</label>
                <div className="flex h-12 items-center gap-1.5 rounded-xl border border-border/80 bg-background px-3 focus-within:ring-1 focus-within:ring-ring">
                  <input
                    type="text"
                    value={productInfo}
                    onChange={(e) => setProductInfo(e.target.value)}
                    placeholder="输入链接、手动填写或从商品库选择"
                    className="min-w-0 flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                  <button
                    type="button"
                    aria-label="手动填写商品"
                    onClick={() => setProductInfo("高保湿玻尿酸面部精华液 30ml · 主打7天焕亮")}
                    className="inline-flex size-8 items-center justify-center rounded-lg bg-muted/70 text-foreground transition-colors hover:bg-muted"
                  >
                    <Pencil className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="从商品库选择"
                    onClick={() => {
                      setProductInfo("便携车载金属香薰机 · 美区月销 12,000+");
                      toast.info("已从商品库载入商品卖点");
                    }}
                    className="inline-flex size-8 items-center justify-center rounded-lg bg-muted/70 text-foreground transition-colors hover:bg-muted"
                  >
                    <Store className="size-3.5" />
                  </button>
                </div>
                <div className="text-center text-[11px] text-muted-foreground">
                  链接支持： <span className="font-medium text-foreground/80">EchoTik 及其他数据平台</span>
                </div>
              </div>

              {/* Language & Region */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground">语言</label>
                  <select
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="h-10 w-full rounded-xl border border-border/80 bg-background px-3 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    {["英语", "西班牙语", "印尼语", "泰语", "越南语", "日语", "德语"].map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground">投放区域</label>
                  <select
                    value={targetRegion}
                    onChange={(e) => setTargetRegion(e.target.value)}
                    className="h-10 w-full rounded-xl border border-border/80 bg-background px-3 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    {["美国", "英国", "印度尼西亚", "泰国", "马来西亚", "德国", "日本"].map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-xs leading-relaxed text-muted-foreground">{tool.subtitle}</p>

              {/* Upload / Link Input Zone */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">参考素材与输入源</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-muted/35 px-4 py-5 text-center transition-colors hover:border-primary/40 hover:bg-muted/60"
                >
                  <div className="flex size-8 items-center justify-center rounded-full bg-background shadow-xs">
                    <Upload className="size-3.5 text-muted-foreground" />
                  </div>
                  <div className="text-xs font-medium text-foreground">
                    {uploadedName ? `已选择：${uploadedName}` : tool.uploadLabel}
                  </div>
                  <button
                    type="button"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      applyTryExample();
                    }}
                    className="rounded-full border bg-background px-3 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground"
                  >
                    一键载入示例素材
                  </button>
                </div>
              </div>

              {/* Model & Aspect Ratio Selectors */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">AI 模型引擎</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="h-9 w-full rounded-xl border bg-background px-3 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    {tool.models.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>

                {tool.aspectRatios && tool.aspectRatios.length > 0 && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">画幅规格</label>
                    <div className="flex h-9 items-center gap-1 rounded-xl border bg-muted/40 p-1">
                      {tool.aspectRatios.map((ratio) => (
                        <button
                          key={ratio}
                          type="button"
                          onClick={() => setSelectedRatio(ratio)}
                          className={cn(
                            "h-full flex-1 rounded-lg text-[11px] font-medium transition-colors",
                            selectedRatio === ratio
                              ? "bg-background text-foreground shadow-xs"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {ratio}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Presets */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">快捷场景预设</label>
                <div className="flex flex-wrap gap-1.5">
                  {tool.presets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() =>
                        setPrompt(`${preset} — 突出商品卖点、自然光影质感与 TikTok 前 3 秒强完播节奏`)
                      }
                      className="inline-flex items-center gap-1 rounded-full border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                    >
                      <WandSparkles className="size-3 text-amber-500" />
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Textarea */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground">创作指令 / 参数说明</label>
                  {prompt && (
                    <button
                      type="button"
                      onClick={() => setPrompt("")}
                      className="text-[11px] text-muted-foreground hover:text-foreground"
                    >
                      清空
                    </button>
                  )}
                </div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                  placeholder={tool.promptPlaceholder}
                  className="w-full resize-none rounded-2xl border bg-muted/35 p-3 text-xs leading-relaxed text-foreground placeholder:text-muted-foreground focus:bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </>
          )}
        </div>

        {/* Sticky Card Footer Action Bar */}
        <div className="border-t border-border/70 bg-card p-4">
          {isCloningTool && !hasInputReady && (
            <div className="mb-2.5 text-center text-xs text-muted-foreground">请先上传视频</div>
          )}
          <button
            type="submit"
            className={cn(
              "flex h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all",
              isCloningTool && !hasInputReady
                ? "bg-zinc-500/85 text-white hover:bg-zinc-600"
                : "bg-primary text-primary-foreground shadow-sm hover:opacity-90"
            )}
          >
            <Sparkles className="size-4" />
            <span>{isCloningTool ? "免费开始分析" : "立即生成"}</span>
            {!isCloningTool && (
              <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-primary-foreground/15 px-2 py-0.5 text-xs">
                <Sparkle className="size-3 text-emerald-400" />
                {tool.creditCost === 0 ? "免费" : tool.creditCost}
              </span>
            )}
          </button>
        </div>
      </form>

      {/* Right Preview & History / Examples Workspace */}
      <div className="flex flex-1 flex-col justify-between py-1">
        {/* Top Segmented Pill Tabs: 历史 v | 热门爆款 | 示例 */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div role="tablist" className="inline-flex items-center rounded-xl bg-muted/70 p-1">
            <button
              type="button"
              role="tab"
              aria-selected={rightTab === "history"}
              onClick={() => setRightTab("history")}
              className={cn(
                "inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                rightTab === "history"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span>历史{relatedTasks.length > 0 ? ` (${relatedTasks.length})` : ""}</span>
              <ChevronDown className="size-3 opacity-60" />
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={rightTab === "hot"}
              onClick={() => setRightTab("hot")}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                rightTab === "hot"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              热门爆款
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={rightTab === "examples"}
              onClick={() => setRightTab("examples")}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                rightTab === "examples"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              示例
            </button>
          </div>

          {tool.slug === "tiktok-transcript-generator" && (
            <div className="inline-flex rounded-full border p-0.5 text-xs">
              {(
                [
                  { id: "script", label: "脚本文案" },
                  { id: "shots", label: "分镜" },
                  { id: "structure", label: "内容解构" },
                ] as const
              ).map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setTranscriptView(v.id)}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[11px] font-medium",
                    transcriptView === v.id ? "bg-muted text-foreground" : "text-muted-foreground"
                  )}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center Preview Content */}
        <div className="my-auto py-6">
          {rightTab === "history" ? (
            relatedTasks.length === 0 ? (
              <div className="mx-auto flex h-72 max-w-lg flex-col items-center justify-center rounded-2xl border border-dashed text-center">
                <Clock className="size-8 text-muted-foreground/50" />
                <p className="mt-3 text-sm font-medium">暂无「{tool.title}」生成记录</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  在左侧配置参数或点击示例中的「试一试」，结果将实时保存在此处
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {relatedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col overflow-hidden rounded-2xl border bg-card p-3 shadow-xs"
                  >
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-900">
                      {task.mediaType === "video" ? (
                        <video
                          src={task.previewUrl}
                          controls
                          muted
                          playsInline
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <img
                          src={task.previewUrl}
                          alt={task.toolTitle}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="size-3.5" /> 已完成 · {task.model}
                      </span>
                      <span className="text-muted-foreground">{task.createdAt}</span>
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">{task.prompt}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText(task.prompt);
                          toast.success("已复制提示词");
                        }}
                        className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-medium hover:bg-accent"
                      >
                        <Copy className="size-3" /> 复制指令
                      </button>
                      <a
                        href={task.previewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-medium hover:bg-accent"
                      >
                        <Download className="size-3" /> 下载成片
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : rightTab === "hot" ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {SHOWCASE_VIDEOS.slice(0, 8).map((item, idx) => (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border bg-card p-2 transition-shadow hover:shadow-sm"
                >
                  <div className="relative aspect-[9/13] overflow-hidden rounded-xl bg-zinc-900">
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setActiveExampleIdx(idx % examples.length);
                        setRightTab("examples");
                        applyTryExample();
                      }}
                      className="absolute bottom-2 right-2 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-zinc-900 shadow-sm"
                    >
                      做同款
                    </button>
                  </div>
                  <div className="mt-2 truncate px-1 text-xs font-medium">{item.title}</div>
                </div>
              ))}
            </div>
          ) : (
            /* Default "示例" Showcase matching orig-cloning-desktop.png */
            <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {selectedMode || tool.title}
              </h2>
              <p className="mt-2 max-w-md text-xs leading-relaxed text-muted-foreground">
                {isCloningTool
                  ? selectedMode === "换人换物"
                    ? "保留原视频运镜与动作节奏，一键替换出镜模特与手中商品。"
                    : "参考原视频的开头、节奏和叙事结构，围绕你的商品重新创作。"
                  : tool.subtitle}
              </p>

              {/* Side-by-Side Comparison or Single Showcase */}
              {tool.category === "audio" ? (
                <div className="mt-6 grid w-full max-w-lg gap-3 text-left">
                  {["US ALLE 精华液广告", "ES Mujer 美妆广告", "UK 家居好物口播"].map((voiceTitle) => (
                    <div
                      key={voiceTitle}
                      className="flex items-center justify-between rounded-2xl border bg-card p-3.5 shadow-xs"
                    >
                      <div className="flex items-center gap-2.5 text-xs font-semibold">
                        <Volume2 className="size-4 text-amber-500" />
                        {voiceTitle}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPrompt(
                            `使用「${voiceTitle}」音色播报：This serum changed my skin routine in just 7 days!`
                          );
                          toast.success(`已填入 ${voiceTitle} 示例文案`);
                        }}
                        className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium hover:bg-accent"
                      >
                        试用音色
                      </button>
                    </div>
                  ))}
                </div>
              ) : tool.slug === "tiktok-transcript-generator" ? (
                <div className="mt-6 w-full max-w-lg rounded-2xl border bg-card p-5 text-left text-xs leading-relaxed text-muted-foreground shadow-xs">
                  {transcriptView === "script" && (
                    <p>
                      [00:00-00:03 强钩子] Stop scrolling if your car still smells like fast food!
                      <br />
                      [00:03-00:09 产品演示] Clip this matte alloy diffuser onto your vent and watch micro-mist fill the cabin...
                    </p>
                  )}
                  {transcriptView === "shots" && (
                    <p>镜头1：车内近景痛点特写 -&gt; 镜头2：微距金属香薰卡扣安装 -&gt; 镜头3：阳光下纳米喷雾扩散</p>
                  )}
                  {transcriptView === "structure" && (
                    <p>完播黄金结构：前3秒痛点反问(20%) + 核心卖点视觉演示(50%) + 限时福利引导下单(30%)</p>
                  )}
                </div>
              ) : (
                <div className="mt-6 grid w-full max-w-[500px] grid-cols-2 gap-4">
                  {/* Left: Original Media */}
                  <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border bg-zinc-900 shadow-sm">
                    <img
                      src={currentExample?.posterUrl ?? tool.samplePosterUrl}
                      alt="原素材"
                      className="h-full w-full object-cover brightness-95"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-black/65 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                      {tool.category === "image" ? "原图素材" : "原视频"}
                    </span>
                  </div>

                  {/* Right: Result Media */}
                  <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border bg-zinc-900 shadow-sm">
                    {tool.category === "video" || tool.category === "tool" ? (
                      <video
                        key={currentExample?.mediaUrl ?? tool.sampleMediaUrl}
                        src={currentExample?.mediaUrl ?? tool.sampleMediaUrl}
                        poster={currentExample?.posterUrl ?? tool.samplePosterUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img
                        src={tool.samplePosterUrl}
                        alt="生成结果"
                        className="h-full w-full object-cover"
                      />
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-black/65 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                      {isCloningTool ? "复刻结果" : "生成结果"}
                    </span>
                  </div>
                </div>
              )}

              {/* Center "试一试" Dark Pill Button */}
              <button
                type="button"
                onClick={applyTryExample}
                className="mt-5 inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-zinc-900 px-6 text-xs font-semibold text-white shadow-sm transition-opacity hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900"
              >
                <Sparkles className="size-3.5" />
                <span>试一试</span>
              </button>

              {/* Bottom 5-Thumbnail Switcher with Prev/Next Arrows */}
              <div className="mt-5 flex items-center justify-center gap-2.5">
                <button
                  type="button"
                  aria-label="上一个示例"
                  onClick={() =>
                    setActiveExampleIdx((prev) => (prev - 1 + examples.length) % examples.length)
                  }
                  className="inline-flex size-8 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <ChevronLeft className="size-4" />
                </button>

                <div className="flex items-center gap-2">
                  {examples.map((ex, idx) => (
                    <button
                      key={ex.id}
                      type="button"
                      aria-label={`示例 ${idx + 1}`}
                      onClick={() => setActiveExampleIdx(idx)}
                      className={cn(
                        "size-12 overflow-hidden rounded-xl border-2 transition-all sm:size-14",
                        activeExampleIdx === idx
                          ? "border-foreground p-0.5 opacity-100 shadow-xs"
                          : "border-transparent opacity-55 hover:opacity-85"
                      )}
                    >
                      <img
                        src={ex.posterUrl}
                        alt={ex.title}
                        className="h-full w-full rounded-lg object-cover"
                      />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  aria-label="下一个示例"
                  onClick={() => setActiveExampleIdx((prev) => (prev + 1) % examples.length)}
                  className="inline-flex size-8 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function StudioWorkbenchPage({ toolPath }: { readonly toolPath: string }) {
  const tool = getStudioToolByPath(toolPath);
  if (!tool) {
    return <div className="p-8 text-sm text-muted-foreground">未找到工具配置：{toolPath}</div>;
  }

  return (
    <Suspense fallback={<div className="p-6 text-xs text-muted-foreground">正在加载工作台...</div>}>
      <StudioWorkbenchInner tool={tool} />
    </Suspense>
  );
}
