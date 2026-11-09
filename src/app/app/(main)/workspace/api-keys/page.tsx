"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, Copy, ExternalLink, KeyRound, Plus, Terminal, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { SettingsShell } from "@/components/settings/settings-shell";
import { useWorkspace } from "@/store/workspace-context";

const CLI_ENV_SNIPPET = `# 1. 配置工作区 CLI 访问密钥
export CREATOK_API_KEY="ck_live_9f82_your_workspace_key"

# 2. 在 Claude Code / Codex / OpenClaw 中初始化 Skills
npx creatok-cli init --workspace default

# 3. 发起爆款视频分析或直接生成成片
npx creatok-cli clone --url "https://www.tiktok.com/@shop/video/7419281"`;

export default function WorkspaceApiKeysPage() {
  const { state, createApiKey, revokeApiKey } = useWorkspace();
  const [modalOpen, setModalOpen] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyName.trim()) {
      toast.error("请输入密钥备注名称");
      return;
    }
    createApiKey(keyName.trim());
    setKeyName("");
    setModalOpen(false);
    toast.success("已生成新的 Skills / CLI 访问密钥");
  };

  const handleCopyKey = (id: string, maskedKey: string) => {
    navigator.clipboard?.writeText(maskedKey.replace(/\*/g, "x"));
    setCopiedId(id);
    toast.success("已复制密钥至剪贴板");
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleCopySnippet = () => {
    navigator.clipboard?.writeText(CLI_ENV_SNIPPET);
    setCopiedSnippet(true);
    toast.success("已复制 CLI 环境变量配置命令");
    setTimeout(() => setCopiedSnippet(false), 1800);
  };

  return (
    <SettingsShell
      title="API Keys"
      description="管理用于 CreatOK CLI、Claude Code Skills 与本地自动化工作流的工作区密钥"
      headerAction={
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
        >
          <Plus className="size-3.5" />
          创建新密钥
        </button>
      }
    >
      {/* Notice Banner linking to API Platform */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-muted/30 p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <KeyRound className="size-4" />
          </div>
          <div className="text-xs">
            <div className="font-semibold text-foreground">Skills / CLI 专属工作区密钥</div>
            <p className="mt-0.5 text-muted-foreground">
              此处的密钥消耗当前工作区积分池。如需按量计费 RESTful 接口，请前往独立 API 开放平台。
            </p>
          </div>
        </div>
        <Link
          href="/app/api-platform/api-keys"
          className="inline-flex items-center gap-1 rounded-xl border bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent"
        >
          前往 API 开放平台 <ExternalLink className="size-3.5" />
        </Link>
      </div>

      {/* Keys Table */}
      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b bg-muted/30 text-muted-foreground">
                <th className="px-5 py-3 font-medium">名称</th>
                <th className="px-5 py-3 font-medium">密钥令牌</th>
                <th className="px-5 py-3 font-medium">创建日期</th>
                <th className="px-5 py-3 font-medium">最近调用</th>
                <th className="px-5 py-3 text-right font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {state.apiKeys.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                    当前暂无有效密钥，请点击右上角「创建新密钥」生成。
                  </td>
                </tr>
              ) : (
                state.apiKeys.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/20">
                    <td className="px-5 py-3.5 font-medium text-foreground">{item.name}</td>
                    <td className="px-5 py-3.5 font-mono text-muted-foreground">{item.maskedKey}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{item.createdAt}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{item.lastUsedAt}</td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleCopyKey(item.id, item.maskedKey)}
                          className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 font-medium hover:bg-accent"
                        >
                          {copiedId === item.id ? (
                            <Check className="size-3 text-emerald-500" />
                          ) : (
                            <Copy className="size-3" />
                          )}
                          复制
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            revokeApiKey(item.id);
                            toast.info(`已吊销密钥「${item.name}」`);
                          }}
                          className="inline-flex items-center gap-1 rounded-lg border border-destructive/30 px-2.5 py-1 font-medium text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="size-3" />
                          吊销
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CLI Quick Setup Code Block */}
      <div className="rounded-2xl border bg-card p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="size-4 text-emerald-500" />
            <h2 className="text-sm font-semibold">CreatOK CLI 环境变量快速配置</h2>
          </div>
          <button
            type="button"
            onClick={handleCopySnippet}
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-medium hover:bg-accent"
          >
            {copiedSnippet ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
            复制配置脚本
          </button>
        </div>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-zinc-100">
          <code>{CLI_ENV_SNIPPET}</code>
        </pre>
      </div>

      {/* Create Key Modal */}
      <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-popover p-6 text-popover-foreground shadow-xl focus:outline-none">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-base font-semibold">创建 Skills / CLI 密钥</Dialog.Title>
              <Dialog.Close className="rounded-md p-1 text-muted-foreground hover:bg-accent">
                <X className="size-4" />
              </Dialog.Close>
            </div>
            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-medium">密钥用途名称</label>
                <input
                  type="text"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  placeholder="例如：MacBook Pro Claude Code"
                  className="mt-1.5 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
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
                  生成密钥
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </SettingsShell>
  );
}
