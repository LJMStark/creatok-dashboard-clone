"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FileImage,
  Film,
  FolderOpen,
  RotateCcw,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  Upload,
  UsersRound,
} from "lucide-react";
import { toast } from "sonner";
import { useWorkspace } from "@/store/workspace-context";
import { cn } from "@/lib/utils";
import {
  ASSET_TABS,
  type AssetRecord,
  type AssetTabKey,
  CreateProductModal,
  INITIAL_STATIC_ASSETS,
} from "./_components/create-product-modal";

function resolveTabParam(param: string | null): AssetTabKey {
  if (
    param === "materials" ||
    param === "products" ||
    param === "ai" ||
    param === "uploads" ||
    param === "avatars" ||
    param === "trash"
  ) {
    return param;
  }
  return "materials";
}

function AssetsPageContent() {
  const searchParams = useSearchParams();
  const { state } = useWorkspace();

  const [activeTab, setActiveTab] = useState<AssetTabKey>(() =>
    resolveTabParam(searchParams.get("tab"))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [mediaFilter, setMediaFilter] = useState<"all" | "video" | "image">("all");
  const [customAssets, setCustomAssets] = useState<readonly AssetRecord[]>(INITIAL_STATIC_ASSETS);
  const [trashedIds, setTrashedIds] = useState<readonly string[]>([]);

  const [productModalOpen, setProductModalOpen] = useState(false);
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("$29.90");
  const [prodSubtitle, setProdSubtitle] = useState("");

  useEffect(() => {
    const nextTab = searchParams.get("tab");
    if (nextTab) {
      setActiveTab(resolveTabParam(nextTab));
    }
  }, [searchParams]);

  const taskAssets: readonly AssetRecord[] = useMemo(
    () =>
      state.tasks.map((task) => ({
        id: task.id,
        title: task.prompt,
        tab: "ai",
        mediaType: task.mediaType === "video" ? "video" : "image",
        previewUrl: task.previewUrl,
        subtitle: `${task.toolTitle} · ${task.model}`,
        createdAt: task.createdAt,
      })),
    [state.tasks]
  );

  const allCombined = useMemo(
    () => [...taskAssets, ...customAssets],
    [taskAssets, customAssets]
  );

  const filteredAssets = useMemo(() => {
    return allCombined.filter((item) => {
      const inTrash = trashedIds.includes(item.id);
      if (activeTab === "trash") {
        if (!inTrash) return false;
      } else {
        if (inTrash) return false;
        if (activeTab !== "materials" && item.tab !== activeTab) return false;
      }

      if (mediaFilter !== "all" && item.mediaType !== mediaFilter) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allCombined, activeTab, mediaFilter, searchQuery, trashedIds]);

  const handleSimulateUpload = () => {
    const newUpload: AssetRecord = {
      id: `upload-${Date.now()}`,
      title: `实拍参考素材_${customAssets.length + 1}.mp4`,
      tab: "uploads",
      mediaType: "video",
      previewUrl:
        "https://content.creatok.com/static/dashboard/recreation/sneaker-unboxing/comparison-audio.mp4",
      subtitle: "1080P 60fps · 刚刚上传",
      createdAt: "刚刚",
    };
    setCustomAssets((prev) => [newUpload, ...prev]);
    setActiveTab("uploads");
    toast.success("已成功上传素材至资产库");
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) {
      toast.error("请输入商品名称");
      return;
    }
    const created: AssetRecord = {
      id: `prod-${Date.now()}`,
      title: prodName.trim(),
      tab: "products",
      mediaType: "image",
      previewUrl:
        "https://content.creatok.com/static/dashboard/a-plus-content-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
      subtitle: prodSubtitle.trim() || "新建跨境带货商品",
      createdAt: "刚刚",
      priceTag: prodPrice.trim() || "$19.90",
    };
    setCustomAssets((prev) => [created, ...prev]);
    setProdName("");
    setProdSubtitle("");
    setProductModalOpen(false);
    setActiveTab("products");
    toast.success("商品资产已创建，可直接用于爆款复刻与挂车发布");
  };

  const moveToTrash = (id: string) => {
    if (state.settings.restrictDeleteCompleted && id.startsWith("task-")) {
      toast.error("当前工作区已开启「限制删除已完成任务」保护");
      return;
    }
    setTrashedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    toast.info("已移入回收站");
  };

  const restoreFromTrash = (id: string) => {
    setTrashedIds((prev) => prev.filter((item) => item !== id));
    toast.success("资产已恢复");
  };

  return (
    <div className="mx-auto max-w-7xl p-5 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">资产库</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            统一管理您的商品白底图、AI 生成成片、数字人模特与本地上传素材
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setProductModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border bg-background px-3.5 py-2 text-xs font-medium hover:bg-accent"
          >
            <ShoppingBag className="size-3.5" />
            新建商品
          </button>
          <button
            type="button"
            onClick={handleSimulateUpload}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
          >
            <Upload className="size-3.5" />
            上传资产
          </button>
        </div>
      </div>

      {/* 6 Tabs */}
      <div className="mt-6 flex items-center gap-1 overflow-x-auto border-b pb-px no-scrollbar">
        {ASSET_TABS.map((tab) => {
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "relative shrink-0 px-3.5 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "text-foreground after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索资产名称、模型或 SKU..."
            className="w-full rounded-xl border bg-background py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        <div className="inline-flex rounded-xl border bg-muted/40 p-1 text-xs">
          {(
            [
              { key: "all", label: "全部类型" },
              { key: "video", label: "视频" },
              { key: "image", label: "图片" },
            ] as const
          ).map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setMediaFilter(f.key)}
              className={cn(
                "rounded-lg px-3 py-1 font-medium transition-colors",
                mediaFilter === f.key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredAssets.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-muted">
            <FolderOpen className="size-5 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-sm font-semibold">当前分类暂无匹配资产</h3>
          <p className="mt-1 max-w-sm text-xs text-muted-foreground">
            您可以上传本地实拍素材、创建电商商品，或前往 AI 视频/图片工具生成带货内容。
          </p>
          <div className="mt-5 flex items-center gap-2">
            <button
              type="button"
              onClick={handleSimulateUpload}
              className="rounded-xl border px-3.5 py-2 text-xs font-medium hover:bg-accent"
            >
              上传本地素材
            </button>
            <Link
              href="/app/ai-video-generator"
              className="inline-flex items-center gap-1 rounded-xl bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground"
            >
              <Sparkles className="size-3.5" /> 去生成视频
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredAssets.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:border-foreground/20 hover:shadow-sm"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                {item.mediaType === "video" ? (
                  <video
                    src={item.previewUrl}
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
                ) : (
                  <img
                    src={item.previewUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <div className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-md bg-black/65 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                  {item.mediaType === "video" ? (
                    <Film className="size-3" />
                  ) : item.tab === "avatars" ? (
                    <UsersRound className="size-3" />
                  ) : (
                    <FileImage className="size-3" />
                  )}
                  {item.tab === "ai"
                    ? "AI 生成"
                    : item.tab === "products"
                      ? "商品"
                      : item.tab === "avatars"
                        ? "数字人"
                        : "上传"}
                </div>
                {item.priceTag && (
                  <div className="absolute bottom-2.5 right-2.5 rounded-md bg-emerald-500 px-2 py-0.5 text-[11px] font-semibold text-white">
                    {item.priceTag}
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col justify-between p-3.5">
                <div>
                  <h3 className="line-clamp-1 text-sm font-medium">{item.title}</h3>
                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{item.subtitle}</p>
                </div>
                <div className="mt-3 flex items-center justify-between border-t pt-2.5 text-[11px] text-muted-foreground">
                  <span>{item.createdAt}</span>
                  {activeTab === "trash" ? (
                    <button
                      type="button"
                      onClick={() => restoreFromTrash(item.id)}
                      className="inline-flex items-center gap-1 font-medium text-emerald-600 hover:underline"
                    >
                      <RotateCcw className="size-3" /> 还原
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => moveToTrash(item.id)}
                      aria-label="移入回收站"
                      className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-destructive"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateProductModal
        open={productModalOpen}
        onOpenChange={setProductModalOpen}
        prodName={prodName}
        onProdNameChange={setProdName}
        prodPrice={prodPrice}
        onProdPriceChange={setProdPrice}
        prodSubtitle={prodSubtitle}
        onProdSubtitleChange={setProdSubtitle}
        onSubmit={handleCreateProduct}
      />
    </div>
  );
}

export default function AssetsPage() {
  return (
    <Suspense fallback={null}>
      <AssetsPageContent />
    </Suspense>
  );
}
