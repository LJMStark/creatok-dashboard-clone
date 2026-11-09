"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Clock, Copy, Play, RotateCcw, Terminal } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface EndpointPreset {
  readonly id: string;
  readonly method: "POST";
  readonly path: string;
  readonly label: string;
  readonly defaultBody: (model: string) => string;
}

const ENDPOINTS: readonly EndpointPreset[] = [
  {
    id: "video-gen",
    method: "POST",
    path: "/v1/videos/generations",
    label: "视频生成 (Videos Generations)",
    defaultBody: (model) =>
      JSON.stringify(
        {
          model: model || "kling-4.0-omni",
          prompt: "自然晨光下金属车载香薰在中控台特写旋转出雾，微距商业广告镜头",
          aspect_ratio: "9:16",
          duration: 5,
          webhook_url: "https://example.com/webhooks/creatok",
        },
        null,
        2
      ),
  },
  {
    id: "image-gen",
    method: "POST",
    path: "/v1/images/generations",
    label: "电商图片生成 (Images Generations)",
    defaultBody: (model) =>
      JSON.stringify(
        {
          model: model.includes("image") || model.includes("banana") ? model : "nano-banana-2.1",
          prompt: "奶油色极简桌面摆放护发精油瓶，柔和窗影，TikTok Shop 首图构图",
          size: "1024x1536",
          n: 2,
        },
        null,
        2
      ),
  },
  {
    id: "viral-clone",
    method: "POST",
    path: "/v1/videos/clone",
    label: "爆款视频复刻 (Viral Cloning)",
    defaultBody: () =>
      JSON.stringify(
        {
          model: "creatok-clone-v3",
          reference_video_url: "https://content.creatok.com/static/dashboard/recreation/car-fragrance/comparison.mp4",
          product_image_url: "https://content.creatok.com/static/example/dashboard/skill/T-fx4dcaQ7N6u59BEOi-O/material-product.png",
          keep_camera_rhythm: true,
        },
        null,
        2
      ),
  },
  {
    id: "tiktok-pub",
    method: "POST",
    path: "/v1/tiktok/publish",
    label: "TikTok 视频/图文直发 (Publish)",
    defaultBody: () =>
      JSON.stringify(
        {
          model: "tiktok-publish-v1",
          account_id: "tt_acc_us_9012",
          media_type: "video",
          caption: "Car diffuser upgrade you actually need #tiktokshop #caraccessories",
          schedule_at: "2026-11-10T20:00:00Z",
        },
        null,
        2
      ),
  },
];

function PlaygroundContent() {
  const searchParams = useSearchParams();
  const modelFromUrl = searchParams.get("model") ?? "kling-4.0-omni";

  const [selectedEndpointId, setSelectedEndpointId] = useState<string>("video-gen");
  const [bodyText, setBodyText] = useState<string>(() => ENDPOINTS[0].defaultBody(modelFromUrl));
  const [responseText, setResponseText] = useState<string>(() =>
    JSON.stringify(
      {
        id: "req_ck_01j9x7m4p2v8n",
        object: "generation.task",
        status: "queued",
        model: modelFromUrl,
        estimated_cost_usd: 0.42,
        created_at: "2026-11-08T10:45:00Z",
        result_preview_url:
          "https://content.creatok.com/static/dashboard/recreation/car-fragrance/comparison.mp4",
      },
      null,
      2
    )
  );
  const [statusCode, setStatusCode] = useState<number>(200);
  const [latencyMs, setLatencyMs] = useState<number>(284);
  const [sending, setSending] = useState(false);
  const [copiedResp, setCopiedResp] = useState(false);

  const currentEndpoint =
    ENDPOINTS.find((e) => e.id === selectedEndpointId) ?? ENDPOINTS[0];

  useEffect(() => {
    const paramModel = searchParams.get("model");
    if (paramModel) {
      const targetEp =
        paramModel.includes("image") || paramModel.includes("banana")
          ? ENDPOINTS[1]
          : paramModel.includes("publish")
            ? ENDPOINTS[3]
            : paramModel.includes("clone")
              ? ENDPOINTS[2]
              : ENDPOINTS[0];
      setSelectedEndpointId(targetEp.id);
      setBodyText(targetEp.defaultBody(paramModel));
    }
  }, [searchParams]);

  const handleSelectEndpoint = (ep: EndpointPreset) => {
    setSelectedEndpointId(ep.id);
    setBodyText(ep.defaultBody(modelFromUrl));
  };

  const handleSendRequest = () => {
    setSending(true);
    let parsed: Record<string, unknown> | null = null;
    try {
      parsed = JSON.parse(bodyText) as Record<string, unknown>;
    } catch {
      setSending(false);
      setStatusCode(400);
      setLatencyMs(18);
      setResponseText(
        JSON.stringify(
          {
            error: {
              code: "invalid_json_payload",
              message: "请求体不是合法的 JSON 格式，请检查括号与引号。",
            },
          },
          null,
          2
        )
      );
      toast.error("JSON 语法校验未通过");
      return;
    }

    setTimeout(() => {
      const simulatedMs = 210 + Math.floor(Math.random() * 190);
      const reqId = `req_ck_${Date.now().toString(36)}`;
      setStatusCode(200);
      setLatencyMs(simulatedMs);
      setResponseText(
        JSON.stringify(
          {
            id: reqId,
            endpoint: currentEndpoint.path,
            status: "succeeded",
            model: typeof parsed?.model === "string" ? parsed.model : "kling-4.0-omni",
            billing: {
              unit_discount_applied: true,
              charged_usd: 0.084,
            },
            output: {
              media_url:
                "https://content.creatok.com/static/dashboard/kling-4-cropped.mp4",
            },
            created_at: new Date().toISOString(),
          },
          null,
          2
        )
      );
      setSending(false);
      toast.success(`请求成功 (${simulatedMs} ms)`);
    }, 260);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-5 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Terminal className="size-5 text-primary" />
            <h1 className="text-2xl font-semibold tracking-tight">Playground</h1>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            在线构造 JSON 请求载荷并实时验证 CreatOK API 响应结构与延迟表现
          </p>
        </div>

        <button
          type="button"
          disabled={sending}
          onClick={handleSendRequest}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <Play className="size-3.5 fill-current" />
          {sending ? "请求发送中..." : "发送请求 (Send)"}
        </button>
      </div>

      {/* Dual Pane Workspace */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Left: Endpoint Selector & JSON Request Editor */}
        <div className="flex flex-col overflow-hidden rounded-2xl border bg-card">
          <div className="border-b bg-muted/30 p-3.5">
            <label className="text-[11px] font-medium text-muted-foreground">选择 API 端点</label>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="rounded-md bg-emerald-500/15 px-2 py-1 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                POST
              </span>
              <select
                value={selectedEndpointId}
                onChange={(e) => {
                  const found = ENDPOINTS.find((item) => item.id === e.target.value);
                  if (found) handleSelectEndpoint(found);
                }}
                className="min-w-0 flex-1 rounded-xl border bg-background px-3 py-1.5 font-mono text-xs focus:outline-none"
              >
                {ENDPOINTS.map((ep) => (
                  <option key={ep.id} value={ep.id}>
                    {ep.path} — {ep.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between border-b px-4 py-2 text-xs text-muted-foreground">
            <span>Request Body (application/json)</span>
            <button
              type="button"
              onClick={() => setBodyText(currentEndpoint.defaultBody(modelFromUrl))}
              className="inline-flex items-center gap-1 hover:text-foreground"
            >
              <RotateCcw className="size-3" /> 重置示例
            </button>
          </div>

          <textarea
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            rows={16}
            spellCheck={false}
            className="w-full flex-1 resize-none bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-zinc-100 focus:outline-none"
          />
        </div>

        {/* Right: Response Status, Latency & Output JSON */}
        <div className="flex flex-col overflow-hidden rounded-2xl border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-muted/30 px-4 py-3">
            <div className="flex items-center gap-2.5 text-xs">
              <span className="font-medium text-muted-foreground">响应状态</span>
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 font-mono font-semibold",
                  statusCode === 200
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                    : "bg-destructive/15 text-destructive"
                )}
              >
                {statusCode === 200 ? "200 OK" : `${statusCode} Bad Request`}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-muted-foreground">
                <Clock className="size-3.5" /> {latencyMs} ms
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(responseText);
                setCopiedResp(true);
                toast.success("已复制响应 JSON");
                setTimeout(() => setCopiedResp(false), 1600);
              }}
              className="inline-flex items-center gap-1 rounded-lg border bg-background px-2.5 py-1 text-xs font-medium hover:bg-accent"
            >
              {copiedResp ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
              复制响应
            </button>
          </div>

          <pre className="flex-1 overflow-auto bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-emerald-300">
            <code>{responseText}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function ApiPlatformPlaygroundPage() {
  return (
    <Suspense fallback={null}>
      <PlaygroundContent />
    </Suspense>
  );
}
