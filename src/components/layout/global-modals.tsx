"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { BugOff, Headset, Mail, MessageSquare, X } from "lucide-react";
import { toast } from "sonner";
import { useWorkspace } from "@/store/workspace-context";

export function GlobalModals() {
  const pathname = usePathname();
  const {
    openSupportModal,
    setOpenSupportModal,
    openFeedbackModal,
    setOpenFeedbackModal,
  } = useWorkspace();
  const [feedbackType, setFeedbackType] = useState<"bug" | "feature">("bug");
  const [feedbackText, setFeedbackText] = useState("");

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) {
      toast.error("请输入反馈内容");
      return;
    }
    toast.success("感谢您的反馈，工程师团队已收到工单");
    setFeedbackText("");
    setOpenFeedbackModal(false);
  };

  return (
    <>
      {pathname === "/app/dashboard" && (
        <button
          type="button"
          aria-label="反馈"
          onClick={() => setOpenFeedbackModal(true)}
          className="fixed bottom-4 right-4 z-[55] inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background/90 text-muted-foreground shadow-sm backdrop-blur transition-[opacity,colors] hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <BugOff className="h-4 w-4" />
        </button>
      )}

      <Dialog.Root open={openSupportModal} onOpenChange={setOpenSupportModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-popover p-6 text-popover-foreground shadow-xl focus:outline-none">
            <div className="flex items-center justify-between">
              <Dialog.Title className="flex items-center gap-2 text-base font-semibold">
                <Headset className="h-4 w-4 text-primary" />
                联系客服与社区支持
              </Dialog.Title>
              <Dialog.Close className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground">
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>
            <Dialog.Description className="mt-1.5 text-xs text-muted-foreground">
              遇到生成疑问、套餐升级或企业定制 API 需求，可通过以下渠道联系 CreatOK 团队。
            </Dialog.Description>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-xl border bg-muted/40 p-3.5">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">官方支持邮箱</div>
                    <div className="text-xs text-muted-foreground">support@creatok.ai</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText("support@creatok.ai");
                    toast.success("已复制客服邮箱");
                  }}
                  className="rounded-lg border bg-background px-3 py-1 text-xs font-medium hover:bg-accent"
                >
                  复制
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border bg-muted/40 p-3.5">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Discord 创作者社区</div>
                    <div className="text-xs text-muted-foreground">工作日 10:00 - 22:00 实时响应</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toast.info("已为您记录专属客服会话请求")}
                  className="rounded-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:opacity-90"
                >
                  加入交流
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root open={openFeedbackModal} onOpenChange={setOpenFeedbackModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-popover p-6 text-popover-foreground shadow-xl focus:outline-none">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-base font-semibold">提交问题或产品建议</Dialog.Title>
              <Dialog.Close className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground">
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>
            <form onSubmit={handleSendFeedback} className="mt-4 space-y-4">
              <div className="inline-flex rounded-full bg-muted p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setFeedbackType("bug")}
                  className={`rounded-full px-3 py-1 font-medium transition-colors ${
                    feedbackType === "bug" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  问题报告
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType("feature")}
                  className={`rounded-full px-3 py-1 font-medium transition-colors ${
                    feedbackType === "feature" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  功能许愿
                </button>
              </div>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                rows={4}
                placeholder="请详细描述您遇到的问题或期望新增的 AI 模型/工具能力..."
                className="w-full rounded-xl border bg-background p-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <div className="flex justify-end gap-2">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="rounded-lg border px-3.5 py-1.5 text-xs font-medium hover:bg-accent"
                  >
                    取消
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
                >
                  发送反馈
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
