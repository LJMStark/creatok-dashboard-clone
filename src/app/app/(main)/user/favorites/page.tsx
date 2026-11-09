"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Film, Heart, Image as ImageIcon, Sparkles, Telescope } from "lucide-react";
import { toast } from "sonner";
import { SHOWCASE_VIDEOS } from "@/data/dashboard-content";
import { useWorkspace } from "@/store/workspace-context";
import { cn } from "@/lib/utils";

export default function UserFavoritesPage() {
  const { state, toggleFavorite } = useWorkspace();
  const [activeTab, setActiveTab] = useState<"video" | "image">("video");

  const videoFavorites = useMemo(
    () =>
      SHOWCASE_VIDEOS.filter(
        (item) =>
          state.favoriteIds.includes(item.id) &&
          (item.category === "cloning" || item.category === "video-creation")
      ),
    [state.favoriteIds]
  );

  const imageFavorites = useMemo(
    () =>
      SHOWCASE_VIDEOS.filter(
        (item) => state.favoriteIds.includes(item.id) && item.category === "image-creation"
      ),
    [state.favoriteIds]
  );

  const currentItems = activeTab === "video" ? videoFavorites : imageFavorites;

  return (
    <div className="mx-auto max-w-7xl p-5 md:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">我的收藏</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            管理您在首页广场、灵感中心及爆款趋势中标记喜爱的创意模板与成片参考
          </p>
        </div>

        <Link
          href="/app/dashboard"
          className="inline-flex items-center gap-1.5 rounded-xl border bg-background px-3.5 py-2 text-xs font-medium hover:bg-accent"
        >
          返回创作首页
        </Link>
      </div>

      {/* Dual Tabs: 视频 / 图片 */}
      <div className="mt-6 flex items-center gap-2 border-b pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("video")}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-medium transition-colors",
            activeTab === "video"
              ? "bg-primary text-primary-foreground"
              : "bg-muted/60 text-muted-foreground hover:text-foreground"
          )}
        >
          <Film className="size-3.5" />
          视频 ({videoFavorites.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("image")}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-medium transition-colors",
            activeTab === "image"
              ? "bg-primary text-primary-foreground"
              : "bg-muted/60 text-muted-foreground hover:text-foreground"
          )}
        >
          <ImageIcon className="size-3.5" />
          图片 ({imageFavorites.length})
        </button>
      </div>

      {/* Cards Grid or Empty State */}
      {currentItems.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-muted">
            <Heart className="size-5 text-muted-foreground" />
          </div>
          <h2 className="mt-4 text-sm font-semibold">
            暂无已收藏的{activeTab === "video" ? "视频" : "图片"}灵感
          </h2>
          <p className="mt-1 max-w-sm text-xs text-muted-foreground">
            浏览工作台精选复刻案例或爆款趋势榜单，点击心形按钮即可随时收藏备用。
          </p>
          <Link
            href="/app/trending"
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
          >
            <Telescope className="size-3.5" />
            去发现热门素材
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:border-foreground/20 hover:shadow-sm"
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
                {item.isComparison && (
                  <span className="absolute left-2.5 top-2.5 rounded-md bg-black/65 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                    原片 vs 复刻对比
                  </span>
                )}
                <button
                  type="button"
                  aria-label="取消收藏"
                  onClick={() => {
                    toggleFavorite(item.id);
                    toast.info(`已取消收藏「${item.title}」`);
                  }}
                  className="absolute right-2.5 top-2.5 inline-flex size-8 items-center justify-center rounded-full bg-black/60 text-rose-500 backdrop-blur-sm transition-transform hover:scale-105"
                >
                  <Heart className="size-4 fill-current" />
                </button>
              </div>

              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {item.promptHint}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Link
                    href={item.targetHref}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
                  >
                    <Sparkles className="size-3.5" />
                    {item.actionLabel}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      toggleFavorite(item.id);
                      toast.info(`已取消收藏「${item.title}」`);
                    }}
                    className="rounded-xl border px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    移除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
