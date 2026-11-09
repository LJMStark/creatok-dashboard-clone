"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Check,
  Copy,
  Cpu,
  Gauge,
  Globe,
  KeyRound,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type CodeLang = "curl" | "node" | "python";

const CODE_EXAMPLES: Readonly<Record<CodeLang, string>> = {
  curl: `curl -X POST "https://api.creatok.ai/v1/videos/generations" \\
  -H "Authorization: Bearer $CREATOK_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "kling-4.0-omni",
    "prompt": "特写阳光下金属车载香薰旋转出雾，商业级微距运镜，9:16",
    "aspect_ratio": "9:16",
    "duration": 5
  }'`,
  node: `import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.CREATOK_API_KEY,
  baseURL: "https://api.creatok.ai/v1",
});

const task = await fetch("https://api.creatok.ai/v1/videos/generations", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.CREATOK_API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "gemini-omni-1.2-flash",
    prompt: "电商爆款前3秒开箱钩子镜头，自然日光，60fps",
    aspect_ratio: "9:16",
  }),
});
console.log(await task.json());`,
  python: `import os
import requests

resp = requests.post(
    "https://api.creatok.ai/v1/videos/generations",
    headers={
        "Authorization": f"Bearer {os.environ['CREATOK_API_KEY']}",
        "Content-Type": "application/json",
    },
    json={
        "model": "veo-3.1-fast",
        "prompt": "迷迭香护发喷雾水雾凝结显形商业大片，9:16竖屏",
        "duration": 5,
    },
    timeout=30,
)
print(resp.json())`,
};

const QUOTA_CARDS = [
  {
    label: "并发任务上限",
    value: "30 并发",
    hint: "Tier 1 默认配额，充值满 $100 自动升至 100 并发",
    icon: Cpu,
  },
  {
    label: "速率限制 (RPM)",
    value: "600 次 / 分钟",
    hint: "全局网关低延迟智能负载均衡",
    icon: Gauge,
  },
  {
    label: "服务可用性 SLA",
    value: "99.95%",
    hint: "多云集群自动故障转移保护",
    icon: ShieldCheck,
  },
  {
    label: "Webhook 回调延迟",
    value: "< 180 ms",
    hint: "支持 HMAC-SHA256 签名安全验签",
    icon: Activity,
  },
] as const;

export default function ApiPlatformOverviewPage() {
  const [lang, setLang] = useState<CodeLang>("curl");
  const [copiedBase, setCopiedBase] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const baseUrl = "https://api.creatok.ai/v1";

  const copyBaseUrl = () => {
    navigator.clipboard?.writeText(baseUrl);
    setCopiedBase(true);
    toast.success("已复制 API Base URL");
    setTimeout(() => setCopiedBase(false), 1800);
  };

  const copyCode = () => {
    navigator.clipboard?.writeText(CODE_EXAMPLES[lang]);
    setCopiedCode(true);
    toast.success("已复制示例代码");
    setTimeout(() => setCopiedCode(false), 1800);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-5 md:p-8">
      {/* Hero Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">CreatOK API 开放平台概览</h1>
          <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-muted-foreground">
            一个统一密钥即可按量调用全球顶尖视频生成、电商套图生成、爆款复刻拆解与 TikTok 自动发布接口，官方直连且最高立省 50%。
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/app/api-platform/api-keys"
            className="inline-flex items-center gap-1.5 rounded-xl border bg-background px-3.5 py-2 text-xs font-medium hover:bg-accent"
          >
            <KeyRound className="size-3.5" />
            获取 API Key
          </Link>
          <Link
            href="/app/api-platform/playground"
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
          >
            <Terminal className="size-3.5" />
            在线调试台 <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Base URL Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-card p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <Globe className="size-5" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground">统一网关 Base URL</div>
            <div className="mt-0.5 font-mono text-sm font-semibold">{baseUrl}</div>
          </div>
        </div>
        <button
          type="button"
          onClick={copyBaseUrl}
          className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-medium hover:bg-accent"
        >
          {copiedBase ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
          复制网关地址
        </button>
      </div>

      {/* Concurrency & Quota Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {QUOTA_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-2xl border bg-card p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{card.label}</span>
                <Icon className="size-4 text-primary" />
              </div>
              <div className="mt-2 text-xl font-bold">{card.value}</div>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{card.hint}</p>
            </div>
          );
        })}
      </div>

      {/* Quickstart Code Examples */}
      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/30 px-5 py-3">
          <div className="flex items-center gap-1.5">
            {(
              [
                { id: "curl", label: "cURL" },
                { id: "node", label: "Node.js / TypeScript" },
                { id: "python", label: "Python" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setLang(tab.id)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  lang === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={copyCode}
            className="inline-flex items-center gap-1.5 rounded-lg border bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent"
          >
            {copiedCode ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
            复制代码
          </button>
        </div>

        <pre className="overflow-x-auto bg-zinc-950 p-5 font-mono text-xs leading-relaxed text-zinc-100">
          <code>{CODE_EXAMPLES[lang]}</code>
        </pre>
      </div>
    </div>
  );
}
