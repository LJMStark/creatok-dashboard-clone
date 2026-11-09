"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Images,
  List,
  Play,
  Plus,
  ShoppingBag,
  Video,
} from "lucide-react";
import { toast } from "sonner";
import { SHOWCASE_VIDEOS } from "@/data/dashboard-content";
import { cn } from "@/lib/utils";
import {
  type BoundAccount,
  TikTokAccountsSidebar,
} from "./_components/tiktok-accounts-sidebar";
import {
  TIKTOK_WEEK_DAYS,
  TikTokBindModal,
  TikTokCreatePostModal,
} from "./_components/tiktok-modals";

interface ScheduledPost {
  readonly id: string;
  readonly title: string;
  readonly postType: "video" | "carousel";
  readonly dateLabel: string;
  readonly dayIndex: number;
  readonly time: string;
  readonly status: "draft" | "scheduled";
  readonly productTag: string;
}

const CAROUSEL_SLIDES = [
  {
    id: "shoppable",
    tabLabel: "带货图文",
    badge: "新功能 · 带货图文",
    headingLine1: "带货图文",
    headingLine2: "轻松发布",
    description: "上传多张图片、关联商品，支持立即发布或定时发布到 TikTok。",
    cta: "连接账号，开始发布",
    footnote: "当前支持已开通相应图文权限的美国和英国地区账号。",
    leftImg: SHOWCASE_VIDEOS[4]?.posterUrl ?? "https://content.creatok.com/static/dashboard/image-product-listing-example.webp",
    rightImg: SHOWCASE_VIDEOS[5]?.posterUrl ?? "https://content.creatok.com/static/dashboard/viral-cloning-example.webp",
  },
  {
    id: "analytics",
    tabLabel: "数据大盘",
    badge: "核心能力 · 经营诊断",
    headingLine1: "经营数据",
    headingLine2: "一屏看清",
    description: "统一追踪矩阵账号播放量、前 3 秒留存率、商品点击率与挂车成交转化。",
    cta: "连接账号，查看数据",
    footnote: "支持按单账号、单店铺或跨区域汇总导出周报。",
    leftImg: SHOWCASE_VIDEOS[0]?.posterUrl ?? "",
    rightImg: SHOWCASE_VIDEOS[1]?.posterUrl ?? "",
  },
  {
    id: "agent-cli",
    tabLabel: "AI Agent & CLI",
    badge: "开发者生态 · 自动化",
    headingLine1: "让 AI 与 CLI",
    headingLine2: "自动完成发布",
    description: "支持在终端或 Agent 工作流中直接生成爆款文案、Hashtag 并推送排期。",
    cta: "连接账号，配置自动化",
    footnote: "兼容 Claude Code、Codex 与 OpenClaw 技能调用。",
    leftImg: SHOWCASE_VIDEOS[2]?.posterUrl ?? "",
    rightImg: SHOWCASE_VIDEOS[3]?.posterUrl ?? "",
  },
  {
    id: "batch",
    tabLabel: "批量与定时发布",
    badge: "矩阵提效 · 日历排期",
    headingLine1: "一次排期",
    headingLine2: "多账号分发",
    description: "按目标市场黄金活跃时段批量设定发布队列，大幅降低跨境运营人力成本。",
    cta: "打开排期日历",
    footnote: "支持草稿箱协作审批与定时自动重试。",
    leftImg: SHOWCASE_VIDEOS[6]?.posterUrl ?? SHOWCASE_VIDEOS[0]?.posterUrl ?? "",
    rightImg: SHOWCASE_VIDEOS[7]?.posterUrl ?? SHOWCASE_VIDEOS[1]?.posterUrl ?? "",
  },
  {
    id: "markets",
    tabLabel: "支持的市场",
    badge: "全球覆盖 · 官方直连",
    headingLine1: "覆盖主流",
    headingLine2: "跨境电商站点",
    description: "官方 API 合规直连美区、英区及东南亚核心站点，稳定保障账号权重。",
    cta: "连接账号，开始发布",
    footnote: "已支持 US、UK、ID、TH、MY、VN、PH、SG 等核心市场。",
    leftImg: SHOWCASE_VIDEOS[1]?.posterUrl ?? "",
    rightImg: SHOWCASE_VIDEOS[4]?.posterUrl ?? "",
  },
] as const;

const INITIAL_POSTS: readonly ScheduledPost[] = [
  {
    id: "post-1",
    title: "车载香薰沉浸式阳光折射实测 #tiktokmademebuyit",
    postType: "video",
    dateLabel: "11-10",
    dayIndex: 1,
    time: "19:30",
    status: "scheduled",
    productTag: "极简金属车载香薰瓶",
  },
  {
    id: "post-2",
    title: "秋冬高腰阔腿裤 5 套通勤穿搭模板 #ootd",
    postType: "carousel",
    dateLabel: "11-12",
    dayIndex: 3,
    time: "21:00",
    status: "draft",
    productTag: "垂感羊毛混纺阔腿裤",
  },
];

function TikTokPublishContent() {
  const searchParams = useSearchParams();
  const [showCalendar, setShowCalendar] = useState(searchParams.get("view") === "calendar");
  const [showAccountsDrawer, setShowAccountsDrawer] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const [accounts, setAccounts] = useState<readonly BoundAccount[]>([]);
  const [posts, setPosts] = useState<readonly ScheduledPost[]>(INITIAL_POSTS);
  const [copiedCli, setCopiedCli] = useState(false);

  const [bindModalType, setBindModalType] = useState<"account" | "shop" | null>(null);
  const [bindHandle, setBindHandle] = useState("");
  const [bindRegion, setBindRegion] = useState("US 美区");

  const [createOpen, setCreateOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postType, setPostType] = useState<"video" | "carousel">("video");
  const [postDayIdx, setPostDayIdx] = useState(2);
  const [postTime, setPostTime] = useState("20:00");
  const [postProduct, setPostProduct] = useState("");

  useEffect(() => {
    setShowCalendar(searchParams.get("view") === "calendar");
  }, [searchParams]);

  const activeSlide = CAROUSEL_SLIDES[slideIdx] ?? CAROUSEL_SLIDES[0];

  const handleCopyCli = () => {
    navigator.clipboard?.writeText("npx creatok-cli publish --platform tiktok --schedule 20:00");
    setCopiedCli(true);
    toast.success("已复制 CLI 发布命令");
    setTimeout(() => setCopiedCli(false), 1800);
  };

  const handleBindSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bindModalType || !bindHandle.trim()) {
      toast.error("请输入账号或店铺标识");
      return;
    }
    const newEntry: BoundAccount = {
      id: `acc-${Date.now()}`,
      handle: bindHandle.trim(),
      type: bindModalType,
      region: bindRegion,
    };
    setAccounts((prev) => [...prev, newEntry]);
    setBindHandle("");
    setBindModalType(null);
    toast.success(bindModalType === "shop" ? "TikTok Shop 店铺授权成功" : "TikTok 账号绑定成功");
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim()) {
      toast.error("请填写发布标题与文案");
      return;
    }
    const dayInfo = TIKTOK_WEEK_DAYS[postDayIdx] ?? TIKTOK_WEEK_DAYS[0];
    const nextPost: ScheduledPost = {
      id: `post-${Date.now()}`,
      title: postTitle.trim(),
      postType,
      dateLabel: dayInfo.date,
      dayIndex: postDayIdx,
      time: postTime,
      status: "scheduled",
      productTag: postProduct.trim() || "未挂载商品",
    };
    setPosts((prev) => [nextPost, ...prev]);
    setPostTitle("");
    setPostProduct("");
    setCreateOpen(false);
    setShowCalendar(true);
    toast.success("已加入 TikTok 发布排期队列");
  };

  return (
    <div className="flex min-h-full w-full flex-col">
      {/* Sub-action bar matching orig-tiktok-desktop.png */}
      <div className="flex items-center justify-end gap-2 border-b border-border/70 px-4 py-2.5 sm:px-6">
        <button
          type="button"
          onClick={() => setShowCalendar((prev) => !prev)}
          className={cn(
            "inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition-colors",
            showCalendar ? "bg-accent text-foreground" : "bg-background text-muted-foreground hover:text-foreground"
          )}
        >
          <CalendarIcon className="size-3.5" />
          <span>{showCalendar ? "返回概览" : "排期日历"}</span>
        </button>
        <button
          type="button"
          onClick={() => setBindModalType("account")}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900"
        >
          <Plus className="size-3.5" />
          <span>连接账号</span>
        </button>
        <button
          type="button"
          onClick={() => setShowAccountsDrawer((prev) => !prev)}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent"
        >
          <List className="size-3.5" />
          <span>账号与店铺{accounts.length > 0 ? ` (${accounts.length})` : ""}</span>
        </button>
      </div>

      <div className="flex flex-1 flex-col lg:flex-row">
        {showAccountsDrawer && (
          <TikTokAccountsSidebar
            accounts={accounts}
            copiedCli={copiedCli}
            onCopyCli={handleCopyCli}
            onOpenBindModal={setBindModalType}
          />
        )}

        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-7 sm:px-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">TikTok 发布工作台</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">管理账号、商品与视频发布</p>
          </div>

          {showCalendar ? (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">本周自动发布排期表</span>
                <button
                  type="button"
                  onClick={() => setCreateOpen(true)}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-xs font-semibold text-primary-foreground"
                >
                  <Plus className="size-3.5" /> 新建定时任务
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-7">
                {TIKTOK_WEEK_DAYS.map((day, idx) => {
                  const dayPosts = posts.filter((p) => p.dayIndex === idx);
                  return (
                    <div key={day.date} className="flex min-h-[190px] flex-col rounded-xl border bg-card p-3">
                      <div className="flex items-center justify-between border-b pb-2 text-xs">
                        <span className="font-semibold">{day.label}</span>
                        <span className="text-muted-foreground">{day.date}</span>
                      </div>
                      <div className="mt-2.5 flex flex-1 flex-col gap-2">
                        {dayPosts.map((post) => (
                          <div key={post.id} className="rounded-lg border bg-muted/40 p-2 text-xs">
                            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                              <span className="inline-flex items-center gap-1">
                                <Clock className="size-2.5" /> {post.time}
                              </span>
                              <span>{post.postType === "video" ? "视频" : "图文"}</span>
                            </div>
                            <div className="mt-1 line-clamp-2 font-medium leading-snug">{post.title}</div>
                            <div className="mt-1 flex items-center gap-1 truncate text-[10px] text-muted-foreground">
                              <ShoppingBag className="size-2.5" /> {post.productTag}
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            setPostDayIdx(idx);
                            setCreateOpen(true);
                          }}
                          className="mt-auto inline-flex items-center justify-center gap-1 rounded-lg border border-dashed py-1.5 text-[11px] text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                        >
                          <Plus className="size-3" /> 排期
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              {/* Hero Feature Showcase Card matching orig-tiktok-desktop.png */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs">
                <div className="grid grid-cols-1 items-center gap-8 p-6 sm:p-10 lg:grid-cols-12">
                  <div className="flex flex-col items-start lg:col-span-5">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground/80">
                      {activeSlide.badge}
                    </span>
                    <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
                      {activeSlide.headingLine1}
                      <br />
                      {activeSlide.headingLine2}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {activeSlide.description}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        activeSlide.id === "batch"
                          ? setShowCalendar(true)
                          : setBindModalType("account")
                      }
                      className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-zinc-900 px-5 text-xs font-semibold text-white transition-opacity hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900"
                    >
                      <span>{activeSlide.cta}</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                    <p className="mt-4 text-xs text-muted-foreground">{activeSlide.footnote}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 lg:col-span-7">
                    <div className="aspect-[3/4] overflow-hidden rounded-2xl border bg-muted">
                      <img
                        src={activeSlide.leftImg}
                        alt={activeSlide.tabLabel}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="aspect-[3/4] overflow-hidden rounded-2xl border bg-muted">
                      <img
                        src={activeSlide.rightImg}
                        alt={`${activeSlide.tabLabel} 预览`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Card Bottom Tab & Pagination Strip */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 px-6 py-3 sm:px-10">
                  <div className="no-scrollbar flex items-center gap-6 overflow-x-auto">
                    {CAROUSEL_SLIDES.map((s, idx) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSlideIdx(idx)}
                        className={cn(
                          "relative whitespace-nowrap py-2 text-xs font-medium transition-colors",
                          slideIdx === idx
                            ? "font-semibold text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {s.tabLabel}
                        {slideIdx === idx && (
                          <span className="absolute inset-x-0 -bottom-3 h-0.5 bg-foreground" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <button
                      type="button"
                      aria-label="上一页"
                      onClick={() =>
                        setSlideIdx((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length)
                      }
                      className="inline-flex size-7 items-center justify-center rounded-lg border bg-background hover:bg-accent"
                    >
                      <ChevronLeft className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      aria-label="自动播放切换"
                      onClick={() => setSlideIdx((prev) => (prev + 1) % CAROUSEL_SLIDES.length)}
                      className="inline-flex size-7 items-center justify-center rounded-lg border bg-background hover:bg-accent"
                    >
                      <Play className="size-3" />
                    </button>
                    <span className="px-1 font-mono text-[11px]">
                      0{slideIdx + 1} / 0{CAROUSEL_SLIDES.length}
                    </span>
                    <button
                      type="button"
                      aria-label="下一页"
                      onClick={() => setSlideIdx((prev) => (prev + 1) % CAROUSEL_SLIDES.length)}
                      className="inline-flex size-7 items-center justify-center rounded-lg border bg-background hover:bg-accent"
                    >
                      <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Connect Account CTA Bar matching orig-tiktok-desktop.png */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-6">
                <div>
                  <h3 className="text-base font-semibold text-foreground">接入账号，开始发布</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {accounts.length > 0
                      ? `已成功绑定 ${accounts.length} 个账号/店铺，点击右侧按钮可继续新增或排期发布。`
                      : "新增账号后，即可开始管理商品、任务与发布。"}
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setBindModalType("account")}
                    className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-zinc-900 px-4 text-xs font-semibold text-white transition-opacity hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900"
                  >
                    <Plus className="size-3.5" />
                    <span>连接账号</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBindModalType("shop")}
                    className="inline-flex h-9 items-center rounded-xl border bg-background px-4 text-xs font-semibold text-foreground transition-colors hover:bg-accent"
                  >
                    连接店铺
                  </button>
                  {accounts.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setCreateOpen(true)}
                      className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground"
                    >
                      <Video className="size-3.5" /> 新建发布
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <TikTokBindModal
        bindModalType={bindModalType}
        onClose={() => setBindModalType(null)}
        bindHandle={bindHandle}
        onBindHandleChange={setBindHandle}
        bindRegion={bindRegion}
        onBindRegionChange={setBindRegion}
        onSubmit={handleBindSubmit}
      />

      <TikTokCreatePostModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        postType={postType}
        onPostTypeChange={setPostType}
        postTitle={postTitle}
        onPostTitleChange={setPostTitle}
        postDayIdx={postDayIdx}
        onPostDayIdxChange={setPostDayIdx}
        postTime={postTime}
        onPostTimeChange={setPostTime}
        postProduct={postProduct}
        onPostProductChange={setPostProduct}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}

export default function TikTokPlatformPage() {
  return (
    <Suspense fallback={null}>
      <TikTokPublishContent />
    </Suspense>
  );
}
