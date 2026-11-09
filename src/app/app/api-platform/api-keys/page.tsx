"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, Copy, KeyRound, Plus, Settings2, ShieldCheck, Trash2, X } from "lucide-react";
import { toast } from "sonner";

interface PlatformKeyItem {
  readonly id: string;
  readonly name: string;
  readonly maskedToken: string;
  readonly monthlyLimitUsd: number | null;
  readonly spentUsd: number;
  readonly rpmLimit: number;
  readonly createdAt: string;
}

const INITIAL_PLATFORM_KEYS: readonly PlatformKeyItem[] = [
  {
    id: "pk-prod-1",
    name: "Production Video Pipeline",
    maskedToken: "sk-creatok-prod-8a2f****************3d91",
    monthlyLimitUsd: 500,
    spentUsd: 64.2,
    rpmLimit: 300,
    createdAt: "2026-10-20",
  },
  {
    id: "pk-stag-2",
    name: "Staging TikTok Auto-Publisher",
    maskedToken: "sk-creatok-stag-4e11****************7c04",
    monthlyLimitUsd: 50,
    spentUsd: 8.45,
    rpmLimit: 60,
    createdAt: "2026-11-02",
  },
];

export default function ApiPlatformKeysPage() {
  const [keys, setKeys] = useState<readonly PlatformKeyItem[]>(INITIAL_PLATFORM_KEYS);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [budgetInput, setBudgetInput] = useState("200");
  const [rpmInput, setRpmInput] = useState("120");

  const [editingKey, setEditingKey] = useState<PlatformKeyItem | null>(null);
  const [editBudget, setEditBudget] = useState("");

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      toast.error("请输入 API Key 名称");
      return;
    }
    const rand = Math.random().toString(36).slice(2, 6);
    const parsedBudget = Number(budgetInput);
    const nextKey: PlatformKeyItem = {
      id: `pk-${Date.now()}`,
      name: nameInput.trim(),
      maskedToken: `sk-creatok-live-${rand}****************9f1b`,
      monthlyLimitUsd: Number.isNaN(parsedBudget) || parsedBudget <= 0 ? null : parsedBudget,
      spentUsd: 0,
      rpmLimit: Math.max(10, Number(rpmInput) || 120),
      createdAt: "2026-11-08",
    };
    setKeys((prev) => [nextKey, ...prev]);
    setNameInput("");
    setCreateOpen(false);
    toast.success("已创建新的按量计费 API Key");
  };

  const handleUpdateLimit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingKey) return;
    const val = Number(editBudget);
    const nextLimit = Number.isNaN(val) || val <= 0 ? null : val;
    setKeys((prev) =>
      prev.map((item) =>
        item.id === editingKey.id ? { ...item, monthlyLimitUsd: nextLimit } : item
      )
    );
    setEditingKey(null);
    toast.success("密钥月度消费限额已更新");
  };

  const handleRevoke = (id: string, name: string) => {
    setKeys((prev) => prev.filter((item) => item.id !== id));
    toast.info(`已吊销密钥「${name}」`);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-5 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">API Keys</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            为生产微服务、CI 任务与自动化矩阵配置独立预算上限与速率配额的访问密钥
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
        >
          <Plus className="size-3.5" />
          创建 API Key
        </button>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border bg-muted/30 p-4 text-xs">
        <ShieldCheck className="size-4 shrink-0 text-emerald-500" />
        <span className="text-muted-foreground">
          安全建议：请始终通过服务端环境变量注入 <code className="rounded bg-muted px-1 py-0.5 font-mono">CREATOK_API_KEY</code>，切勿将其硬编码于浏览器前端代码中。
        </span>
      </div>

      {/* Keys Table */}
      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b bg-muted/30 text-muted-foreground">
                <th className="px-5 py-3.5 font-medium">密钥名称</th>
                <th className="px-4 py-3.5 font-medium">Token</th>
                <th className="px-4 py-3.5 font-medium">已用 / 月度限额</th>
                <th className="px-4 py-3.5 font-medium">并发 RPM</th>
                <th className="px-4 py-3.5 font-medium">创建时间</th>
                <th className="px-5 py-3.5 text-right font-medium">管理</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {keys.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20">
                  <td className="px-5 py-4 font-semibold text-foreground">
                    <span className="inline-flex items-center gap-2">
                      <KeyRound className="size-3.5 text-violet-500" />
                      {item.name}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-mono text-muted-foreground">{item.maskedToken}</td>
                  <td className="px-4 py-4 font-mono">
                    <span>${item.spentUsd.toFixed(2)}</span>
                    <span className="text-muted-foreground">
                      {" / "}
                      {item.monthlyLimitUsd ? `$${item.monthlyLimitUsd}` : "无上限"}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-mono text-muted-foreground">{item.rpmLimit} RPM</td>
                  <td className="px-4 py-4 text-muted-foreground">{item.createdAt}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText(item.maskedToken.replace(/\*/g, "a"));
                          setCopiedId(item.id);
                          toast.success("已复制密钥");
                          setTimeout(() => setCopiedId(null), 1600);
                        }}
                        className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 hover:bg-accent"
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
                          setEditingKey(item);
                          setEditBudget(item.monthlyLimitUsd ? String(item.monthlyLimitUsd) : "");
                        }}
                        className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 hover:bg-accent"
                      >
                        <Settings2 className="size-3" />
                        限额
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRevoke(item.id, item.name)}
                        className="inline-flex items-center gap-1 rounded-lg border border-destructive/30 px-2.5 py-1 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="size-3" />
                        吊销
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Key Dialog */}
      <Dialog.Root open={createOpen} onOpenChange={setCreateOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-popover p-6 text-popover-foreground shadow-xl focus:outline-none">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-base font-semibold">新建开放平台 API Key</Dialog.Title>
              <Dialog.Close className="rounded-md p-1 text-muted-foreground hover:bg-accent">
                <X className="size-4" />
              </Dialog.Close>
            </div>
            <form onSubmit={handleCreateKey} className="mt-4 space-y-3.5">
              <div>
                <label className="text-xs font-medium">密钥名称</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="例如：US Shop Video Worker"
                  className="mt-1.5 w-full rounded-xl border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium">月度消费限额 (USD)</label>
                  <input
                    type="number"
                    value={budgetInput}
                    onChange={(e) => setBudgetInput(e.target.value)}
                    placeholder="留空或 0 为不限"
                    className="mt-1.5 w-full rounded-xl border bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium">速率限制 (RPM)</label>
                  <input
                    type="number"
                    value={rpmInput}
                    onChange={(e) => setRpmInput(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border bg-background px-3 py-2 text-sm"
                  />
                </div>
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

      {/* Edit Limit Dialog */}
      <Dialog.Root open={editingKey !== null} onOpenChange={(o) => !o && setEditingKey(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-popover p-6 text-popover-foreground shadow-xl focus:outline-none">
            <Dialog.Title className="text-base font-semibold">修改密钥月度限额</Dialog.Title>
            <form onSubmit={handleUpdateLimit} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-medium">月度美元硬上限 ($)</label>
                <input
                  type="number"
                  value={editBudget}
                  onChange={(e) => setEditBudget(e.target.value)}
                  placeholder="输入 0 或留空代表无上限"
                  className="mt-1.5 w-full rounded-xl border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Dialog.Close asChild>
                  <button type="button" className="rounded-lg border px-3 py-1.5 text-xs">
                    取消
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"
                >
                  保存配置
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
