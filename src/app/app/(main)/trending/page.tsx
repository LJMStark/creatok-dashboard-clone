"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Bookmark,
  Calendar,
  ChevronDown,
  Heart,
  Link2,
  Play,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import {
  TRENDING_CATEGORIES,
  TRENDING_ITEMS,
  type TrendingCommerceItem,
} from "@/app/app/(main)/trending/_data/trending-items";
import { useWorkspace } from "@/store/workspace-context";
import { cn } from "@/lib/utils";

const DURATIONS = ["00:40", "00:14", "00:13", "00:30", "00:54", "01:11", "00:59", "01:08", "00:24", "00:38"] as const;
const GMV_LIST = ["$2.2K", "$8.7K", "$17.7K", "$15.9K", "$19.1K", "$12.4K", "$9.8K", "$24.3K", "$11.2K", "$31.5K"] as const;
const SALES_NUMS = ["272", "535", "341", "332", "196", "418", "289", "610", "245", "812"] as const;
const LIKE_COUNTS = ["36.8K", "50.5K", "92.3K", "12.0K", "50.8K", "15.2K", "18.3K", "22.3K", "41.2K", "348.9K"] as const;

function TrendingMediaCard({
  item,
  idx,
  isFavorited,
  onToggleFavorite,
}: {
  readonly item: TrendingCommerceItem;
  readonly idx: number;
  readonly isFavorited: boolean;
  readonly onToggleFavorite: (id: string, title: string, nextState: boolean) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play().catch(() => {
      /* ignore autoplay block */
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const duration = DURATIONS[idx % DURATIONS.length];
  const gmv = GMV_LIST[idx % GMV_LIST.length];
  const sales = SALES_NUMS[idx % SALES_NUMS.length];
  const likes = LIKE_COUNTS[idx % LIKE_COUNTS.length];

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-col gap-2.5"
    >
      {/* Vertical Video Cover matching orig-trending-desktop.png */}
      <div className="relative aspect-[9/14] w-full overflow-hidden rounded-2xl bg-zinc-900">
        <video
          ref={videoRef}
          src={item.mediaUrl}
          poster={item.posterUrl}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />

        {/* Top Left Duration & Top Right Heart + Likes */}
        <div className="absolute inset-x-3 top-3 flex items-start justify-between">
          <span className="rounded-full bg-black/50 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
            {item.contentType === "photo" ? `图文 ${item.slideCount ?? 5}P` : duration}
          </span>

          <div className="flex flex-col items-center gap-0.5">
            <button
              type="button"
              aria-label={isFavorited ? "取消收藏" : "加入收藏"}
              onClick={() => onToggleFavorite(item.id, item.title, !isFavorited)}
              className="inline-flex size-8 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-transform hover:scale-110"
            >
              <Heart className={cn("size-4", isFavorited && "fill-rose-500 text-rose-500")} />
            </button>
            <span className="text-[11px] font-semibold text-white drop-shadow">{likes}</span>
          </div>
        </div>

        {/* Center Play Circle */}
        {!hovered && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm">
              <Play className="ml-0.5 size-5 fill-current" />
            </div>
          </div>
        )}

        {/* Bottom Left Product Thumbnail + 2-Line Caption */}
        <div className="absolute inset-x-3 bottom-3 flex items-end gap-2.5">
          <img
            src={item.posterUrl}
            alt={item.title}
            className="size-10 shrink-0 rounded-lg border border-white/80 bg-white object-cover shadow-sm"
          />
          <p className="line-clamp-2 text-xs font-medium leading-snug text-white drop-shadow">
            {item.title} · {item.hookSummary}
          </p>
        </div>
      </div>

      {/* 3-Column Metrics Row: 播放量 | 销量 | GMV */}
      <div className="grid grid-cols-3 px-1 pt-0.5 text-left">
        <div>
          <div className="text-sm font-bold text-foreground">{item.views}</div>
          <div className="text-[11px] text-muted-foreground">播放量</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-bold text-foreground">{sales}</div>
          <div className="text-[11px] text-muted-foreground">销量</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-foreground">{gmv}</div>
          <div className="text-[11px] text-muted-foreground">GMV</div>
        </div>
      </div>

      {/* Bottom Action Bar: 查看 + Link + Bookmark */}
      <div className="flex items-center gap-2">
        <Link
          href="/app/viral-video-cloning"
          className="inline-flex h-8 flex-1 items-center justify-center rounded-full border border-border/80 bg-background text-xs font-semibold text-foreground transition-colors hover:bg-accent"
        >
          查看
        </Link>
        <button
          type="button"
          aria-label="复制链接"
          onClick={() => {
            navigator.clipboard?.writeText(item.mediaUrl);
            toast.success("已复制爆款视频源链接");
          }}
          className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Link2 className="size-3.5" />
        </button>
        <button
          type="button"
          aria-label="加入灵感库"
          onClick={() => onToggleFavorite(item.id, item.title, !isFavorited)}
          className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Bookmark className={cn("size-3.5", isFavorited && "fill-foreground text-foreground")} />
        </button>
      </div>
    </article>
  );
}

function TrendingContentInner() {
  const searchParams = useSearchParams();
  const { state, toggleFavorite } = useWorkspace();

  const [activeTab, setActiveTab] = useState<"all" | "photo">("all");
  const [region, setRegion] = useState<string>("ALL");
  const [category, setCategory] = useState<string>("全部类目");
  const [aiFilter, setAiFilter] = useState<string>("是否 AI");

  useEffect(() => {
    const queryType = searchParams.get("contentType");
    if (queryType === "photo") {
      setActiveTab("photo");
    } else if (queryType === "all") {
      setActiveTab("all");
    }
  }, [searchParams]);

  const filteredList = useMemo(() => {
    return TRENDING_ITEMS.filter((item) => {
      const matchTab = activeTab === "all" || item.contentType === "photo";
      const matchRegion = region === "ALL" || item.region === region;
      const matchCat = category === "全部类目" || item.category === category;
      return matchTab && matchRegion && matchCat;
    });
  }, [activeTab, region, category]);

  const handleFavorite = (id: string, title: string, added: boolean) => {
    toggleFavorite(id);
    toast.success(added ? `已收藏「${title}」` : `已从收藏夹移除「${title}」`);
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-7 sm:px-7">
      {/* Centered Hero Heading matching orig-trending-desktop.png */}
      <div className="pt-2 text-center">
        <h1 className="inline-flex items-center justify-center gap-2 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
          <span>探索 TikTok 上正在流行的带货内容</span>
          <TrendingUp className="size-7 text-foreground" />
        </h1>
      </div>

      {/* Filter Toolbar matching orig-trending-desktop.png */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div role="tablist" aria-label="内容类型切换" className="flex items-center gap-5">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "all"}
            onClick={() => setActiveTab("all")}
            className={cn(
              "relative pb-1.5 text-sm font-medium transition-colors",
              activeTab === "all"
                ? "font-semibold text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            全部
            {activeTab === "all" && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-foreground" />
            )}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "photo"}
            onClick={() => setActiveTab("photo")}
            className={cn(
              "relative pb-1.5 text-sm font-medium transition-colors",
              activeTab === "photo"
                ? "font-semibold text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            图文
            {activeTab === "photo" && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-foreground" />
            )}
          </button>
        </div>

        <div className="no-scrollbar flex flex-wrap items-center gap-2 overflow-x-auto">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="h-8 rounded-lg border bg-background px-2.5 text-xs font-medium text-foreground focus:outline-none"
          >
            <option value="ALL">美国</option>
            <option value="US">美区精选</option>
            <option value="UK">英国</option>
            <option value="SEA">东南亚</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-8 rounded-lg border bg-background px-2.5 text-xs font-medium text-foreground focus:outline-none"
          >
            {TRENDING_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "全部类目" ? "商品分类" : cat}
              </option>
            ))}
          </select>

          {["时长", "播放量", "推广方式"].map((filterLabel) => (
            <button
              key={filterLabel}
              type="button"
              onClick={() => toast.info(`已应用「${filterLabel}」智能排序`)}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border bg-background px-2.5 text-xs font-medium text-foreground hover:bg-accent"
            >
              <span>{filterLabel}</span>
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>
          ))}

          <select
            value={aiFilter}
            onChange={(e) => setAiFilter(e.target.value)}
            className="h-8 rounded-lg border bg-background px-2.5 text-xs font-medium text-foreground focus:outline-none"
          >
            <option value="是否 AI">是否 AI</option>
            <option value="AI">仅看 AI 创作</option>
            <option value="REAL">真人实拍</option>
          </select>

          <button
            type="button"
            onClick={() => toast.info("当前统计周期：11/1 - 11/7")}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border bg-background px-3 text-xs font-medium text-foreground hover:bg-accent"
          >
            <Calendar className="size-3.5 text-muted-foreground" />
            <span>11/1 - 11/7</span>
          </button>
        </div>
      </div>

      {/* 5-Column Vertical Video Grid matching orig-trending-desktop.png */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {(filteredList.length > 0 ? filteredList : TRENDING_ITEMS).map((item, idx) => (
          <TrendingMediaCard
            key={item.id}
            item={item}
            idx={idx}
            isFavorited={state.favoriteIds.includes(item.id)}
            onToggleFavorite={handleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default function TrendingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-xs text-muted-foreground">正在加载爆款趋势...</div>}>
      <TrendingContentInner />
    </Suspense>
  );
}
