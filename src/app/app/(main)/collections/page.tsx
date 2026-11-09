"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Film,
  FolderPlus,
  Heart,
  Images,
  Sparkles,
  Telescope,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { SHOWCASE_VIDEOS } from "@/data/dashboard-content";
import { useWorkspace } from "@/store/workspace-context";
import { cn } from "@/lib/utils";

interface CollectionFolder {
  readonly id: string;
  readonly name: string;
  readonly description: string;
}

const INITIAL_FOLDERS: readonly CollectionFolder[] = [
  { id: "all", name: "全部收藏", description: "默认灵感汇总夹" },
  { id: "q4-hooks", name: "黑五高转化前3秒钩子", description: "美区黑五旺季带货脚本参考" },
];

export default function CollectionsPage() {
  const { state, toggleFavorite } = useWorkspace();
  const [activeTab, setActiveTab] = useState<"video" | "carousel">("video");
  const [folders, setFolders] = useState<readonly CollectionFolder[]>(INITIAL_FOLDERS);
  const [activeFolderId, setActiveFolderId] = useState<string>("all");

  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folderDesc, setFolderDesc] = useState("");

  const favoriteItems = useMemo(() => {
    return SHOWCASE_VIDEOS.filter((item) => {
      if (!state.favoriteIds.includes(item.id)) return false;
      if (activeTab === "video") {
        return item.category === "cloning" || item.category === "video-creation";
      }
      return item.category === "image-creation";
    });
  }, [state.favoriteIds, activeTab]);

  const displayedItems = useMemo(() => {
    if (activeFolderId === "all") return favoriteItems;
    // Custom newly created folders start empty unless viewing all
    if (activeFolderId !== "q4-hooks") return [];
    return favoriteItems.slice(0, 1);
  }, [favoriteItems, activeFolderId]);

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) {
      toast.error("请输入收藏夹名称");
      return;
    }
    const nextFolder: CollectionFolder = {
      id: `folder-${Date.now()}`,
      name: folderName.trim(),
      description: folderDesc.trim() || "自定义灵感分类",
    };
    setFolders((prev) => [...prev, nextFolder]);
    setActiveFolderId(nextFolder.id);
    setFolderName("");
    setFolderDesc("");
    setFolderModalOpen(false);
    toast.success("已创建新收藏夹");
  };

  return (
    <div className="mx-auto max-w-7xl p-5 md:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight">灵感库</h1>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              New
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            沉淀 TikTok 爆款视频结构与带货图文参考，随时发起分镜拆解或一键复刻
          </p>
        </div>

        <button
          type="button"
          onClick={() => setFolderModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
        >
          <FolderPlus className="size-3.5" />
          新建收藏夹
        </button>
      </div>

      {/* Dual Tabs: 视频 / 图文 */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b pb-3">
        <div className="inline-flex rounded-xl bg-muted p-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("video")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-4 py-1.5 font-medium transition-colors",
              activeTab === "video"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Film className="size-3.5" />
            视频
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("carousel")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-4 py-1.5 font-medium transition-colors",
              activeTab === "carousel"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Images className="size-3.5" />
            图文
          </button>
        </div>

        {/* Folder Capsules */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {folders.map((folder) => (
            <button
              key={folder.id}
              type="button"
              onClick={() => setActiveFolderId(folder.id)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                activeFolderId === folder.id
                  ? "border-foreground bg-foreground text-background"
                  : "bg-background text-muted-foreground hover:text-foreground"
              )}
            >
              {folder.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content or Empty Guide */}
      {displayedItems.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-muted">
            <Film className="size-6 text-muted-foreground" />
          </div>
          <h2 className="mt-4 text-base font-semibold">还没有收藏视频</h2>
          <p className="mt-1.5 max-w-md text-xs leading-relaxed text-muted-foreground">
            前往「爆款趋势」或首页灵感案例流点击收藏图标，即可将优质带货视频与图文轮播归档至此处集中拆解。
          </p>
          <Link
            href="/app/trending"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Telescope className="size-4" />
            前往爆款趋势探索
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {displayedItems.map((item) => (
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
                <button
                  type="button"
                  aria-label="取消收藏"
                  onClick={() => {
                    toggleFavorite(item.id);
                    toast.info("已从灵感库移除");
                  }}
                  className="absolute right-2.5 top-2.5 inline-flex size-8 items-center justify-center rounded-full bg-black/55 text-rose-500 backdrop-blur-sm transition-transform hover:scale-105"
                >
                  <Heart className="size-4 fill-current" />
                </button>
              </div>
              <div className="flex flex-1 flex-col justify-between p-3.5">
                <div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.promptHint}</p>
                </div>
                <Link
                  href={item.targetHref}
                  className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-secondary py-2 text-xs font-medium text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Sparkles className="size-3.5" />
                  {item.actionLabel}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Folder Dialog */}
      <Dialog.Root open={folderModalOpen} onOpenChange={setFolderModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-popover p-6 text-popover-foreground shadow-xl focus:outline-none">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-base font-semibold">新建灵感收藏夹</Dialog.Title>
              <Dialog.Close className="rounded-md p-1 text-muted-foreground hover:bg-accent">
                <X className="size-4" />
              </Dialog.Close>
            </div>
            <form onSubmit={handleCreateFolder} className="mt-4 space-y-3.5">
              <div>
                <label className="text-xs font-medium">收藏夹名称</label>
                <input
                  type="text"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  placeholder="例如：美妆个护爆款开头库"
                  className="mt-1.5 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-xs font-medium">用途说明（可选）</label>
                <input
                  type="text"
                  value={folderDesc}
                  onChange={(e) => setFolderDesc(e.target.value)}
                  placeholder="团队共享创意参考说明"
                  className="mt-1.5 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Dialog.Close asChild>
                  <button type="button" className="rounded-lg border px-3.5 py-1.5 text-xs font-medium">
                    取消
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"
                >
                  创建收藏夹
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
