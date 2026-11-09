"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Images, Video, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const TIKTOK_WEEK_DAYS = [
  { label: "周一", date: "11-09" },
  { label: "周二", date: "11-10" },
  { label: "周三", date: "11-11" },
  { label: "周四", date: "11-12" },
  { label: "周五", date: "11-13" },
  { label: "周六", date: "11-14" },
  { label: "周日", date: "11-15" },
] as const;

interface BindModalProps {
  readonly bindModalType: "account" | "shop" | null;
  readonly onClose: () => void;
  readonly bindHandle: string;
  readonly onBindHandleChange: (val: string) => void;
  readonly bindRegion: string;
  readonly onBindRegionChange: (val: string) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
}

export function TikTokBindModal({
  bindModalType,
  onClose,
  bindHandle,
  onBindHandleChange,
  bindRegion,
  onBindRegionChange,
  onSubmit,
}: BindModalProps) {
  return (
    <Dialog.Root open={bindModalType !== null} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-popover p-6 text-popover-foreground shadow-xl focus:outline-none">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-base font-semibold">
              {bindModalType === "shop" ? "授权绑定 TikTok Shop" : "授权绑定 TikTok 创作者账号"}
            </Dialog.Title>
            <Dialog.Close className="rounded-md p-1 text-muted-foreground hover:bg-accent">
              <X className="size-4" />
            </Dialog.Close>
          </div>
          <form onSubmit={onSubmit} className="mt-4 space-y-3.5">
            <div>
              <label className="text-xs font-medium">账号 Handle 或店铺名称</label>
              <input
                type="text"
                value={bindHandle}
                onChange={(e) => onBindHandleChange(e.target.value)}
                placeholder={
                  bindModalType === "shop" ? "例如：CreatOK Official US Shop" : "例如：@creatok_us"
                }
                className="mt-1.5 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-xs font-medium">运营站点地区</label>
              <select
                value={bindRegion}
                onChange={(e) => onBindRegionChange(e.target.value)}
                className="mt-1.5 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none"
              >
                <option value="US 美区">US 美区</option>
                <option value="UK 英区">UK 英区</option>
                <option value="SEA 东南亚">SEA 东南亚</option>
              </select>
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
                确认授权连接
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface CreatePostModalProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly postType: "video" | "carousel";
  readonly onPostTypeChange: (type: "video" | "carousel") => void;
  readonly postTitle: string;
  readonly onPostTitleChange: (val: string) => void;
  readonly postDayIdx: number;
  readonly onPostDayIdxChange: (idx: number) => void;
  readonly postTime: string;
  readonly onPostTimeChange: (val: string) => void;
  readonly postProduct: string;
  readonly onPostProductChange: (val: string) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
}

export function TikTokCreatePostModal({
  open,
  onOpenChange,
  postType,
  onPostTypeChange,
  postTitle,
  onPostTitleChange,
  postDayIdx,
  onPostDayIdxChange,
  postTime,
  onPostTimeChange,
  postProduct,
  onPostProductChange,
  onSubmit,
}: CreatePostModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-popover p-6 text-popover-foreground shadow-xl focus:outline-none">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-base font-semibold">新建视频 / 图文发布排期</Dialog.Title>
            <Dialog.Close className="rounded-md p-1 text-muted-foreground hover:bg-accent">
              <X className="size-4" />
            </Dialog.Close>
          </div>
          <form onSubmit={onSubmit} className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onPostTypeChange("video")}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-medium",
                  postType === "video"
                    ? "border-primary bg-primary/5 text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <Video className="size-4" /> 带货短视频
              </button>
              <button
                type="button"
                onClick={() => onPostTypeChange("carousel")}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-medium",
                  postType === "carousel"
                    ? "border-primary bg-primary/5 text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <Images className="size-4" /> 9:16 带货图文
              </button>
            </div>
            <div>
              <label className="text-xs font-medium">发布文案与话题标签</label>
              <textarea
                rows={3}
                value={postTitle}
                onChange={(e) => onPostTitleChange(e.target.value)}
                placeholder="输入吸引停留的前 3 秒钩子文案及 #Hashtags..."
                className="mt-1.5 w-full rounded-xl border bg-background p-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium">排期日期</label>
                <select
                  value={postDayIdx}
                  onChange={(e) => onPostDayIdxChange(Number(e.target.value))}
                  className="mt-1.5 w-full rounded-xl border bg-background px-3 py-2 text-sm"
                >
                  {TIKTOK_WEEK_DAYS.map((d, i) => (
                    <option key={d.date} value={i}>
                      {d.label} ({d.date})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium">发布时间</label>
                <input
                  type="time"
                  value={postTime}
                  onChange={(e) => onPostTimeChange(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium">挂载 TikTok Shop 商品（可选）</label>
              <input
                type="text"
                value={postProduct}
                onChange={(e) => onPostProductChange(e.target.value)}
                placeholder="输入商品名称或 SKU ID"
                className="mt-1.5 w-full rounded-xl border bg-background px-3 py-2 text-sm"
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
                保存排期
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
