"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X } from "lucide-react";

export type AssetTabKey = "materials" | "products" | "ai" | "uploads" | "avatars" | "trash";

export interface AssetRecord {
  readonly id: string;
  readonly title: string;
  readonly tab: Exclude<AssetTabKey, "materials" | "trash">;
  readonly mediaType: "video" | "image";
  readonly previewUrl: string;
  readonly subtitle: string;
  readonly createdAt: string;
  readonly priceTag?: string;
}

export const ASSET_TABS: readonly { readonly key: AssetTabKey; readonly label: string }[] = [
  { key: "materials", label: "素材" },
  { key: "products", label: "商品" },
  { key: "ai", label: "AI 生成" },
  { key: "uploads", label: "上传资产" },
  { key: "avatars", label: "数字人" },
  { key: "trash", label: "回收站" },
];

export const INITIAL_STATIC_ASSETS: readonly AssetRecord[] = [
  {
    id: "prod-1",
    title: "极简金属车载香薰瓶（美区热销款）",
    tab: "products",
    mediaType: "image",
    previewUrl:
      "https://content.creatok.com/static/dashboard/image-product-listing-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    subtitle: "SKU: CK-CAR-01 · 库存充足",
    createdAt: "2026-11-06",
    priceTag: "$24.90",
  },
  {
    id: "prod-2",
    title: "迷迭香防脱护发精油喷雾 120ml",
    tab: "products",
    mediaType: "image",
    previewUrl: "https://content.creatok.com/static/example/dashboard/skill/spray-reveal-product-video/thumbnail.jpg",
    subtitle: "SKU: CK-HAIR-09 · TikTok Shop 同步",
    createdAt: "2026-11-05",
    priceTag: "$18.50",
  },
  {
    id: "upload-1",
    title: "白底实拍商品原图_正面.webp",
    tab: "uploads",
    mediaType: "image",
    previewUrl: "https://content.creatok.com/static/example/dashboard/skill/T-fx4dcaQ7N6u59BEOi-O/material-product.png",
    subtitle: "1080 x 1440 · 本地上传",
    createdAt: "2026-11-07",
  },
  {
    id: "avatar-1",
    title: "北美居家好物口播达人 Mia",
    tab: "avatars",
    mediaType: "image",
    previewUrl:
      "https://content.creatok.com/static/dashboard/viral-cloning-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    subtitle: "支持英语 / 西语自然对口型",
    createdAt: "官方预设",
  },
];

interface CreateProductModalProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly prodName: string;
  readonly onProdNameChange: (val: string) => void;
  readonly prodPrice: string;
  readonly onProdPriceChange: (val: string) => void;
  readonly prodSubtitle: string;
  readonly onProdSubtitleChange: (val: string) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
}

export function CreateProductModal({
  open,
  onOpenChange,
  prodName,
  onProdNameChange,
  prodPrice,
  onProdPriceChange,
  prodSubtitle,
  onProdSubtitleChange,
  onSubmit,
}: CreateProductModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-popover p-6 text-popover-foreground shadow-xl focus:outline-none">
          <div className="flex items-center justify-between">
            <Dialog.Title className="flex items-center gap-2 text-base font-semibold">
              <Plus className="size-4" /> 新建电商商品资产
            </Dialog.Title>
            <Dialog.Close className="rounded-md p-1 text-muted-foreground hover:bg-accent">
              <X className="size-4" />
            </Dialog.Close>
          </div>
          <form onSubmit={onSubmit} className="mt-4 space-y-3.5">
            <div>
              <label className="text-xs font-medium">商品标题</label>
              <input
                type="text"
                value={prodName}
                onChange={(e) => onProdNameChange(e.target.value)}
                placeholder="例如：便携式无线直发梳 美规款"
                className="mt-1.5 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-xs font-medium">售价标签</label>
              <input
                type="text"
                value={prodPrice}
                onChange={(e) => onProdPriceChange(e.target.value)}
                className="mt-1.5 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium">核心卖点备注</label>
              <input
                type="text"
                value={prodSubtitle}
                onChange={(e) => onProdSubtitleChange(e.target.value)}
                placeholder="30秒速热 / 负离子护发 / 防烫齿梳"
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
                保存商品
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
