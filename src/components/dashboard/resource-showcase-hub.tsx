"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  FolderOpen,
  Heart,
  Lightbulb,
  Play,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { SHOWCASE_VIDEOS, type ShowcaseVideoItem } from "@/data/dashboard-content";
import type { HeroTabMode } from "@/components/dashboard/hero-composer";
import { useWorkspace } from "@/store/workspace-context";
import { cn } from "@/lib/utils";

type HubPrimaryTab = "featured" | "trending" | "assets" | "collections" | "products";
type FeaturedSubTab = "cloning" | "video-creation" | "image-creation";

function ShowcaseCard({ item }: { readonly item: ShowcaseVideoItem }) {
  const [hovered, setHovered] = useState(false);
  const { state, toggleFavorite } = useWorkspace();
  const isFav = state.favoriteIds.includes(item.id);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card p-2 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[9/13] w-full overflow-hidden rounded-xl bg-zinc-900">
        {hovered ? (
          <video
            src={item.mediaUrl}
            poster={item.posterUrl}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={item.posterUrl}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />

        {item.isComparison && (
          <div className="absolute inset-x-2 top-2 flex items-center justify-between text-[10px] font-medium text-white">
            <span className="rounded-full bg-black/55 px-2 py-0.5 backdrop-blur-sm">原视频</span>
            <span className="rounded-full bg-emerald-500/80 px-2 py-0.5 backdrop-blur-sm">
              复刻结果
            </span>
          </div>
        )}

        <button
          type="button"
          aria-label="收藏案例"
          onClick={() => toggleFavorite(item.id)}
          className="absolute right-2 top-2 z-10 inline-flex size-7 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
        >
          <Heart className={cn("size-3.5", isFav && "fill-rose-500 text-rose-500")} />
        </button>

        {!hovered && (
          <div className="pointer-events-none absolute bottom-2.5 left-2.5 inline-flex size-7 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm">
            <Play className="size-3.5 fill-current" />
          </div>
        )}

        <div className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between gap-2">
          <span className="truncate text-xs font-semibold text-white drop-shadow-sm">
            {item.title}
          </span>
          <Link
            href={item.targetHref}
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-zinc-900 shadow-sm transition-transform hover:scale-105"
          >
            <Sparkles className="size-3" />
            {item.actionLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ResourceShowcaseHub({ activeHeroTab }: { readonly activeHeroTab: HeroTabMode }) {
  const { state } = useWorkspace();
  const [hubTab, setHubTab] = useState<HubPrimaryTab>("featured");
  const [subTab, setSubTab] = useState<FeaturedSubTab>("cloning");
  const [videoCat, setVideoCat] = useState("万圣节");
  const [imageCat, setImageCat] = useState("创意海报");

  if (activeHeroTab === "video") {
    const videoCategories = ["万圣节", "服饰试穿", "美妆个护", "家居日用", "健康保健", "户外、汽车与配饰"];
    return (
      <section data-resource-hub="true" className="space-y-4 pt-2">
        <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto">
          {videoCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setVideoCat(cat)}
              className={cn(
                "inline-flex h-8 shrink-0 items-center rounded-full px-3.5 text-xs font-medium transition-colors",
                videoCat === cat
                  ? "bg-muted font-semibold text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <h2 className="text-center text-sm font-semibold text-foreground">{videoCat}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {SHOWCASE_VIDEOS.slice(0, 10).map((item) => (
            <ShowcaseCard
              key={item.id}
              item={{ ...item, actionLabel: "做同款", targetHref: "/app/ai-video-generator" }}
            />
          ))}
        </div>
      </section>
    );
  }

  if (activeHeroTab === "image") {
    const imageCategories = ["创意海报", "UGC 内容", "生活方式场景", "商品卖点图", "AI 换装"];
    return (
      <section data-resource-hub="true" className="space-y-4 pt-2">
        <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto">
          {imageCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setImageCat(cat)}
              className={cn(
                "inline-flex h-8 shrink-0 items-center rounded-full px-3.5 text-xs font-medium transition-colors",
                imageCat === cat
                  ? "bg-muted font-semibold text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <h2 className="text-center text-sm font-semibold text-foreground">{imageCat}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {SHOWCASE_VIDEOS.filter((v) => v.category !== "cloning").map((item) => (
            <ShowcaseCard
              key={item.id}
              item={{ ...item, actionLabel: "做同款", targetHref: "/app/image/generator" }}
            />
          ))}
        </div>
      </section>
    );
  }

  const primaryTabs: ReadonlyArray<{
    readonly id: HubPrimaryTab;
    readonly label: string;
    readonly icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: "featured", label: "精选", icon: BookOpen },
    { id: "trending", label: "爆款趋势", icon: TrendingUp },
    { id: "assets", label: "资产库", icon: FolderOpen },
    { id: "collections", label: "灵感库", icon: Lightbulb },
    { id: "products", label: "商品库", icon: ShoppingBag },
  ];

  const subTabs: ReadonlyArray<{ readonly id: FeaturedSubTab; readonly label: string }> = [
    { id: "cloning", label: "视频复刻" },
    { id: "video-creation", label: "视频创作" },
    { id: "image-creation", label: "图文创作" },
  ];

  const activeSubLabel = subTabs.find((s) => s.id === subTab)?.label ?? "视频复刻";
  const filteredItems = SHOWCASE_VIDEOS.filter((item) => item.category === subTab);

  return (
    <section data-resource-hub="true" className="space-y-4 pt-2">
      {/* Primary Resource Hub Bar */}
      <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto">
        {primaryTabs.map((t) => {
          const Icon = t.icon;
          const active = hubTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setHubTab(t.id)}
              className={cn(
                "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-xs font-medium transition-colors",
                active
                  ? "bg-muted font-semibold text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div data-resource-tabs-content="true" className="space-y-4">
        {hubTab === "featured" && (
          <>
            <div data-example-tabs-bar="true" className="flex items-center gap-4">
              {subTabs.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  role="tab"
                  aria-selected={subTab === st.id}
                  onClick={() => setSubTab(st.id)}
                  className={cn(
                    "text-xs transition-colors",
                    subTab === st.id
                      ? "font-semibold text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {st.label}
                </button>
              ))}
            </div>

            <h2 className="text-center text-sm font-semibold text-foreground">{activeSubLabel}</h2>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {filteredItems.map((item) => (
                <ShowcaseCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}

        {hubTab === "trending" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">TikTok 实时高转化爆款带货视频与图文</span>
              <Link href="/app/trending" className="text-xs font-medium text-primary hover:underline">
                进入爆款趋势全库 &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {SHOWCASE_VIDEOS.slice(0, 8).map((item) => (
                <ShowcaseCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {hubTab === "assets" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                最近生成的 AI 资产（共 {state.tasks.length} 项）
              </span>
              <Link href="/app/assets" className="text-xs font-medium text-primary hover:underline">
                管理全部资产 &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {state.tasks.map((task) => (
                <div key={task.id} className="rounded-2xl border bg-card p-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{task.toolTitle}</span>
                    <span>{task.createdAt}</span>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">{task.prompt}</p>
                  <div className="mt-2 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    {task.model} · 已完成
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {hubTab === "collections" && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-12 text-center">
            <p className="text-sm font-medium">已收藏 {state.favoriteIds.length} 条爆款灵感案例</p>
            <p className="mt-1 text-xs text-muted-foreground">
              将鼠标悬停在任意视频卡片右上角点击爱心即可加入灵感库
            </p>
            <Link
              href="/app/collections"
              className="mt-4 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"
            >
              前往灵感库查看
            </Link>
          </div>
        )}

        {hubTab === "products" && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-12 text-center">
            <p className="text-sm font-medium">商品数字化资产库</p>
            <p className="mt-1 text-xs text-muted-foreground">
              保存常用的商品白底图、卖点文案与规格，在所有 AI 工具中一键调用
            </p>
            <Link
              href="/app/assets?tab=products"
              className="mt-4 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"
            >
              管理商品库
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
