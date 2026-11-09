"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowUpRight,
  Copy,
  FileImage,
  Heart,
  Lightbulb,
  Maximize2,
  Play,
  Search,
  Sparkles,
  Video,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  GALLERY_ARTWORKS,
  STYLE_TAGS,
  type GalleryArtwork,
} from "@/app/app/(main)/gallery/_data/gallery-artworks";
import { useWorkspace } from "@/store/workspace-context";
import { cn } from "@/lib/utils";

function MasonryGalleryCard({
  item,
  isFavorited,
  onToggleFav,
  onInspect,
}: {
  readonly item: GalleryArtwork;
  readonly isFavorited: boolean;
  readonly onToggleFav: (id: string) => void;
  readonly onInspect: (item: GalleryArtwork) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    videoRef.current?.play().catch(() => {
      /* ignore */
    });
  };

  const handleLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(item.prompt);
    toast.success("提示词已复制到剪贴板");
  };

  return (
    <article
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => onInspect(item)}
      className="group relative mb-4 break-inside-avoid cursor-pointer overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-lg"
    >
      <div className={cn("relative w-full overflow-hidden bg-muted", item.aspectClass)}>
        {item.mediaType === "video" && item.videoUrl ? (
          <video
            ref={videoRef}
            src={item.videoUrl}
            poster={item.imageUrl}
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
            {item.mediaType === "video" ? (
              <Play className="size-3 text-sky-400" />
            ) : (
              <Sparkles className="size-3 text-amber-400" />
            )}
            {item.model}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="收藏灵感"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFav(item.id);
              }}
              className={cn(
                "inline-flex size-7 items-center justify-center rounded-full backdrop-blur-sm transition-transform hover:scale-110",
                isFavorited ? "bg-rose-500 text-white" : "bg-black/55 text-white/90"
              )}
            >
              <Heart className={cn("size-3.5", isFavorited && "fill-current")} />
            </button>
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-black/55 text-white/90 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              <Maximize2 className="size-3.5" />
            </span>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 pt-12 text-white opacity-95 transition-all sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <div className="text-xs font-bold">{item.title}</div>
          <p className="mt-1 line-clamp-3 text-[11px] leading-relaxed text-white/85">
            {item.prompt}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyPrompt}
              className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl bg-white/20 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              <Copy className="size-3" />
              复制提示词
            </button>
            <Link
              href={`${item.remixHref}${item.remixHref.includes("?") ? "&" : "?"}prompt=${encodeURIComponent(item.prompt)}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl bg-white px-2.5 py-1.5 text-xs font-semibold text-zinc-950 transition-opacity hover:opacity-90"
            >
              <span>做同款</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function InspirationGalleryPage() {
  const { state, toggleFavorite } = useWorkspace();
  const [mediaTab, setMediaTab] = useState<"all" | "video" | "image">("video");
  const [styleTag, setStyleTag] = useState<(typeof STYLE_TAGS)[number]>("全部");
  const [searchText, setSearchText] = useState("");
  const [inspectedItem, setInspectedItem] = useState<GalleryArtwork | null>(null);

  const visibleArtworks = useMemo(() => {
    const clean = searchText.trim().toLowerCase();
    return GALLERY_ARTWORKS.filter((art) => {
      const matchMedia = mediaTab === "all" || art.mediaType === mediaTab;
      const matchTag = styleTag === "全部" || art.tag === styleTag;
      const matchSearch =
        !clean ||
        art.title.toLowerCase().includes(clean) ||
        art.prompt.toLowerCase().includes(clean) ||
        art.model.toLowerCase().includes(clean);
      return matchMedia && matchTag && matchSearch;
    });
  }, [mediaTab, styleTag, searchText]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
            <Lightbulb className="size-3.5" />
            <span>Community Prompt Showcase</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">灵感广场</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            探索全球创作者使用 Kling 4.0、Seedance 2.5 与 Nano Banana 2.1 生成的高清电商作品，悬停查看配方并一键做同款。
          </p>
        </div>

        <div
          role="tablist"
          aria-label="作品媒体类型切换"
          className="inline-flex items-center rounded-xl border bg-muted/60 p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mediaTab === "video"}
            onClick={() => setMediaTab("video")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-xs font-semibold transition-all",
              mediaTab === "video"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Video className="size-3.5" />
            视频
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mediaTab === "image"}
            onClick={() => setMediaTab("image")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-xs font-semibold transition-all",
              mediaTab === "image"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <FileImage className="size-3.5" />
            图片
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mediaTab === "all"}
            onClick={() => setMediaTab("all")}
            className={cn(
              "rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all",
              mediaTab === "all"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            全部
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {STYLE_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setStyleTag(tag)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                styleTag === tag
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="搜索提示词、模型或视觉风格..."
            className="h-9 w-full rounded-full border bg-background pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {visibleArtworks.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-12 text-center text-sm text-muted-foreground">
          没有找到匹配的灵感作品，请尝试切换分类或搜索其他关键词。
        </div>
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {visibleArtworks.map((art) => (
            <MasonryGalleryCard
              key={art.id}
              item={art}
              isFavorited={state.favoriteIds.includes(art.id)}
              onToggleFav={(id) => {
                toggleFavorite(id);
                toast.success("已更新灵感收藏状态");
              }}
              onInspect={setInspectedItem}
            />
          ))}
        </div>
      )}

      <Dialog.Root open={Boolean(inspectedItem)} onOpenChange={(open) => !open && setInspectedItem(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-popover p-6 text-popover-foreground shadow-2xl focus:outline-none">
            {inspectedItem && (
              <div className="grid gap-5 sm:grid-cols-[220px_1fr]">
                <div className="overflow-hidden rounded-xl bg-black">
                  {inspectedItem.mediaType === "video" && inspectedItem.videoUrl ? (
                    <video
                      src={inspectedItem.videoUrl}
                      poster={inspectedItem.imageUrl}
                      controls
                      autoPlay
                      loop
                      playsInline
                      className="aspect-[9/14] w-full object-cover"
                    />
                  ) : (
                    <img
                      src={inspectedItem.imageUrl}
                      alt={inspectedItem.title}
                      className="aspect-[4/5] w-full object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                        {inspectedItem.model} · {inspectedItem.creator}
                      </span>
                      <Dialog.Close className="rounded-md p-1 text-muted-foreground hover:bg-accent">
                        <X className="size-4" />
                      </Dialog.Close>
                    </div>
                    <Dialog.Title className="mt-2.5 text-lg font-bold">
                      {inspectedItem.title}
                    </Dialog.Title>
                    <div className="mt-3 rounded-xl border bg-muted/40 p-3 text-xs leading-relaxed text-foreground">
                      {inspectedItem.prompt}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(inspectedItem.prompt);
                        toast.success("完整提示词已复制");
                      }}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold hover:bg-accent"
                    >
                      <Copy className="size-3.5" />
                      复制提示词
                    </button>
                    <Link
                      href={`${inspectedItem.remixHref}${inspectedItem.remixHref.includes("?") ? "&" : "?"}prompt=${encodeURIComponent(inspectedItem.prompt)}`}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
                    >
                      <span>一键做同款</span>
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
