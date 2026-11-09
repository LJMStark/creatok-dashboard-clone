"use client";

import React, { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, Copy, Eye, FileText, Search, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ApiLogRecord {
  readonly requestId: string;
  readonly timestamp: string;
  readonly endpoint: string;
  readonly model: string;
  readonly statusCode: 200 | 429 | 400;
  readonly durationMs: number;
  readonly costUsd: string;
  readonly clientIp: string;
  readonly payloadSnippet: string;
}

const MOCK_LOGS: readonly ApiLogRecord[] = [
  {
    requestId: "req_ck_98f2m10x7a",
    timestamp: "2026-11-08 10:41:19",
    endpoint: "POST /v1/videos/generations",
    model: "kling-4.0-omni",
    statusCode: 200,
    durationMs: 312,
    costUsd: "$0.420",
    clientIp: "54.219.108.42",
    payloadSnippet: '{"model":"kling-4.0-omni","aspect_ratio":"9:16","duration":5}',
  },
  {
    requestId: "req_ck_98f1k09c3b",
    timestamp: "2026-11-08 10:36:04",
    endpoint: "POST /v1/images/generations",
    model: "nano-banana-2.1",
    statusCode: 200,
    durationMs: 186,
    costUsd: "$0.056",
    clientIp: "54.219.108.42",
    payloadSnippet: '{"model":"nano-banana-2.1","size":"1024x1536","n":2}',
  },
  {
    requestId: "req_ck_98e8z77q1p",
    timestamp: "2026-11-08 09:58:47",
    endpoint: "POST /v1/videos/generations",
    model: "gemini-omni-1.2-flash",
    statusCode: 429,
    durationMs: 24,
    costUsd: "$0.000",
    clientIp: "35.162.41.19",
    payloadSnippet: '{"model":"gemini-omni-1.2-flash","error":"rate_limit_exceeded"}',
  },
  {
    requestId: "req_ck_98d4v21w8n",
    timestamp: "2026-11-08 09:12:30",
    endpoint: "POST /v1/videos/clone",
    model: "creatok-clone-v3",
    statusCode: 200,
    durationMs: 428,
    costUsd: "$0.360",
    clientIp: "54.219.108.42",
    payloadSnippet: '{"model":"creatok-clone-v3","keep_camera_rhythm":true}',
  },
  {
    requestId: "req_ck_98c0t55m6r",
    timestamp: "2026-11-07 23:49:11",
    endpoint: "POST /v1/images/generations",
    model: "gpt-image-2.6-flare",
    statusCode: 400,
    durationMs: 19,
    costUsd: "$0.000",
    clientIp: "35.162.41.19",
    payloadSnippet: '{"model":"gpt-image-2.6-flare","error":"invalid_aspect_ratio"}',
  },
  {
    requestId: "req_ck_98b7h12d9e",
    timestamp: "2026-11-07 22:15:03",
    endpoint: "POST /v1/tiktok/publish",
    model: "tiktok-publish-v1",
    statusCode: 200,
    durationMs: 265,
    costUsd: "$0.008",
    clientIp: "54.219.108.42",
    payloadSnippet: '{"model":"tiktok-publish-v1","media_type":"carousel"}',
  },
];

export default function ApiPlatformLogsPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | "200" | "429" | "400">("all");
  const [modelFilter, setModelFilter] = useState("all");
  const [searchId, setSearchId] = useState("");
  const [selectedLog, setSelectedLog] = useState<ApiLogRecord | null>(null);
  const [copiedReqId, setCopiedReqId] = useState(false);

  const uniqueModels = useMemo(
    () => Array.from(new Set(MOCK_LOGS.map((l) => l.model))),
    []
  );

  const filteredLogs = useMemo(() => {
    return MOCK_LOGS.filter((item) => {
      if (statusFilter !== "all" && String(item.statusCode) !== statusFilter) {
        return false;
      }
      if (modelFilter !== "all" && item.model !== modelFilter) {
        return false;
      }
      if (searchId.trim()) {
        const q = searchId.toLowerCase();
        return (
          item.requestId.toLowerCase().includes(q) ||
          item.endpoint.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [statusFilter, modelFilter, searchId]);

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-5 md:p-8">
      <div>
        <div className="flex items-center gap-2">
          <FileText className="size-5 text-primary" />
          <h1 className="text-2xl font-semibold tracking-tight">请求日志</h1>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          检索最近 30 天内每一次 API 调用的状态码、网关耗时、扣费明细与 Request ID 追踪上下文
        </p>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex rounded-xl border bg-muted/40 p-1 text-xs">
            {(
              [
                { key: "all", label: "全部状态" },
                { key: "200", label: "200 成功" },
                { key: "429", label: "429 限流" },
                { key: "400", label: "400 参数错误" },
              ] as const
            ).map((st) => (
              <button
                key={st.key}
                type="button"
                onClick={() => setStatusFilter(st.key)}
                className={cn(
                  "rounded-lg px-3 py-1.5 font-medium transition-colors",
                  statusFilter === st.key
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {st.label}
              </button>
            ))}
          </div>

          <select
            value={modelFilter}
            onChange={(e) => setModelFilter(e.target.value)}
            className="rounded-xl border bg-background px-3 py-2 text-xs font-medium focus:outline-none"
          >
            <option value="all">全部模型 ({uniqueModels.length})</option>
            {uniqueModels.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="按 Request ID 或端点过滤..."
            className="w-full rounded-xl border bg-background py-2 pl-9 pr-3 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b bg-muted/30 text-muted-foreground">
                <th className="px-5 py-3.5 font-medium">时间</th>
                <th className="px-4 py-3.5 font-medium">Request ID</th>
                <th className="px-4 py-3.5 font-medium">模型</th>
                <th className="px-4 py-3.5 font-medium">状态码</th>
                <th className="px-4 py-3.5 font-medium">耗时</th>
                <th className="px-4 py-3.5 font-medium">扣费</th>
                <th className="px-5 py-3.5 text-right font-medium">详情</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredLogs.map((log) => (
                <tr key={log.requestId} className="hover:bg-muted/20">
                  <td className="whitespace-nowrap px-5 py-3.5 text-muted-foreground">
                    {log.timestamp}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 font-mono font-medium">
                    {log.requestId}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <span className="rounded bg-muted px-2 py-0.5 font-mono text-[11px]">
                      {log.model}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold",
                        log.statusCode === 200
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                          : log.statusCode === 429
                            ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                            : "bg-destructive/15 text-destructive"
                      )}
                    >
                      {log.statusCode}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 font-mono text-muted-foreground">
                    {log.durationMs} ms
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 font-mono font-medium">
                    {log.costUsd}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedLog(log)}
                      className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 font-medium hover:bg-accent"
                    >
                      <Eye className="size-3" /> 查看
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request ID Detail Modal */}
      <Dialog.Root open={selectedLog !== null} onOpenChange={(o) => !o && setSelectedLog(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-popover p-6 text-popover-foreground shadow-xl focus:outline-none">
            {selectedLog && (
              <>
                <div className="flex items-center justify-between">
                  <Dialog.Title className="font-mono text-sm font-semibold">
                    {selectedLog.requestId}
                  </Dialog.Title>
                  <Dialog.Close className="rounded-md p-1 text-muted-foreground hover:bg-accent">
                    <X className="size-4" />
                  </Dialog.Close>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border bg-muted/30 p-3.5 text-xs">
                  <div>
                    <span className="text-muted-foreground">调用端点：</span>
                    <div className="mt-0.5 font-mono font-medium">{selectedLog.endpoint}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">客户端 IP：</span>
                    <div className="mt-0.5 font-mono font-medium">{selectedLog.clientIp}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">网关耗时：</span>
                    <div className="mt-0.5 font-mono font-medium">{selectedLog.durationMs} ms</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">计费金额：</span>
                    <div className="mt-0.5 font-mono font-medium">{selectedLog.costUsd}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span>请求载荷摘要</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(selectedLog.requestId);
                        setCopiedReqId(true);
                        toast.success("已复制 Request ID");
                        setTimeout(() => setCopiedReqId(false), 1500);
                      }}
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                      {copiedReqId ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                      复制 Request ID
                    </button>
                  </div>
                  <pre className="mt-2 overflow-x-auto rounded-xl bg-zinc-950 p-3.5 font-mono text-xs text-zinc-100">
                    <code>{selectedLog.payloadSnippet}</code>
                  </pre>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
