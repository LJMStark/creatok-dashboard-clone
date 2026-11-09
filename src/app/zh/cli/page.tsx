"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Check, Code2, Copy, KeyRound, Send, Sparkles, Terminal } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type DemoScenario = "analyze" | "generate" | "publish";

const TERMINAL_DEMOS: Readonly<
  Record<
    DemoScenario,
    {
      readonly label: string;
      readonly command: string;
      readonly output: string;
    }
  >
> = {
  analyze: {
    label: "1. TikTok 爆款拆解",
    command: 'npx creatok-cli analyze --url "https://www.tiktok.com/@glowshop/video/74281920"',
    output: `[CreatOK Skill] 正在拉取无水印源视频与音轨...
[Hook 00:00-00:02.8] 视觉反差特写：车内空调出风口浓密细腻香雾瞬间散开
[Pacing] 共 6 个镜头切分，平均镜长 2.1s，第 4 秒出现痛点字幕卡
[Script] "Stop buying cheap cardboard air fresheners that last two days..."
[Output] 已导出结构化复刻脚本至 ./creatok-analysis.json`,
  },
  generate: {
    label: "2. AI 复刻生视频",
    command:
      'npx creatok-cli clone --from ./creatok-analysis.json --product ./my-sku.png --model kling-4.0-omni',
    output: `[CreatOK Skill] 正在上传自有商品白底图 ./my-sku.png...
[Model] Kling 4.0 Omni · 9:16 · 1080P · 保持原片运镜节奏
[Task] task_ck_89120f 已提交渲染 (消耗 2 积分)
[Done] 成片已就绪: https://content.creatok.com/outputs/replicated_9x16.mp4`,
  },
  publish: {
    label: "3. 多账号自动挂车发布",
    command:
      'npx creatok-cli publish --file ./replicated_9x16.mp4 --shop-sku "CK-CAR-01" --schedule "20:00"',
    output: `[CreatOK Skill] 验证 OAuth 账号授权 (@creatok_us, @creatok_uk)...
[Shop Anchor] 已绑定 TikTok Shop 商品锚点: SKU CK-CAR-01 ($24.90)
[Caption] AI 自动注入高转化标签 #tiktokmademebuyit #carfinds
[Scheduled] 成功排期至美西时间今日 20:00 自动发布`,
  },
};

const SUPPORTED_AGENTS = [
  {
    name: "Claude Code",
    cmd: "npx creatok-cli init --agent claude",
    desc: "自动写入 .claude/skills 规范，对话式指挥爆款监控与批量换品。",
  },
  {
    name: "Codex CLI",
    cmd: "npx creatok-cli init --agent codex",
    desc: "零配置注入AGENTS指令集与工具脚本，在本地仓库直接批处理百款 SKU。",
  },
  {
    name: "OpenClaw",
    cmd: "npx creatok-cli init --agent openclaw",
    desc: "无缝接入 7x24 小时自主电商运营 Agent，定时抓取竞品并排期发布。",
  },
] as const;

export default function MarketingCliPage() {
  const [scenario, setScenario] = useState<DemoScenario>("analyze");
  const [copiedInit, setCopiedInit] = useState(false);

  const installCmd = "npx creatok-cli init";

  const handleCopyInit = () => {
    navigator.clipboard?.writeText(installCmd);
    setCopiedInit(true);
    toast.success("已复制一键安装命令");
    setTimeout(() => setCopiedInit(false), 1800);
  };

  const activeDemo = TERMINAL_DEMOS[scenario];

  return (
    <div className="mx-auto max-w-6xl space-y-20 px-4 py-14 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3.5 py-1 text-xs font-medium">
          <Terminal className="size-3.5 text-emerald-500" />
          <span>CreatOK CLI & Agent Skills v1.4</span>
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
          让你的编码 Agent 成为全天候 TikTok 带货操盘手
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-base">
          一行命令为 Claude Code、Codex 与 OpenClaw 安装官方电商视频技能包。在终端内直接完成爆款脚本提取、Kling 4.0 批量生视频与 TikTok 多账号定时挂车发布。
        </p>

        {/* One-click Install Box */}
        <div className="mx-auto mt-8 flex max-w-md items-center justify-between gap-3 rounded-2xl border bg-zinc-950 px-4 py-3 text-zinc-100 shadow-lg">
          <div className="flex items-center gap-2.5 font-mono text-sm">
            <span className="text-emerald-400">$</span>
            <span>{installCmd}</span>
          </div>
          <button
            type="button"
            onClick={handleCopyInit}
            className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-100 hover:bg-zinc-700"
          >
            {copiedInit ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
            复制
          </button>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/app/workspace/api-keys"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
          >
            <KeyRound className="size-3.5" />
            获取工作区 CLI Key <ArrowRight className="size-3.5" />
          </Link>
          <Link
            href="/app/agent/skills"
            className="inline-flex items-center gap-1.5 rounded-full border bg-background px-5 py-2.5 text-xs font-medium hover:bg-accent"
          >
            浏览工作台技能库
          </Link>
        </div>
      </section>

      {/* Interactive Terminal Showcase */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold">终端全链路实战演示</h2>
          <div className="inline-flex rounded-xl border bg-muted/50 p-1 text-xs">
            {(["analyze", "generate", "publish"] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setScenario(key)}
                className={cn(
                  "rounded-lg px-3.5 py-1.5 font-medium transition-colors",
                  scenario === key
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {TERMINAL_DEMOS[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-zinc-950 text-zinc-100 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-rose-500/80" />
              <span className="size-2.5 rounded-full bg-amber-500/80" />
              <span className="size-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono">zsh — creatok-cli</span>
            </div>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(activeDemo.command);
                toast.success("已复制示例终端命令");
              }}
              className="text-zinc-400 hover:text-white"
            >
              复制命令
            </button>
          </div>

          <div className="space-y-3 p-5 font-mono text-xs leading-relaxed sm:text-sm">
            <div className="flex items-start gap-2 text-emerald-400">
              <span>$</span>
              <span className="break-all text-zinc-100">{activeDemo.command}</span>
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed text-zinc-400">
              {activeDemo.output}
            </pre>
          </div>
        </div>
      </section>

      {/* Supported AI Coding Agents */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">原生兼容主流本地 Agent 生态</h2>
          <p className="mt-1.5 text-xs text-muted-foreground">
            遵循开放 SKILL.md 规范，安装后自动注册视频拆解、电商生图与社媒发布工具集
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {SUPPORTED_AGENTS.map((ag) => (
            <div key={ag.name} className="flex flex-col justify-between rounded-2xl border bg-card p-5">
              <div>
                <div className="flex items-center gap-2">
                  <Bot className="size-4 text-violet-500" />
                  <h3 className="text-base font-semibold">{ag.name}</h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{ag.desc}</p>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl bg-muted px-3 py-2 font-mono text-[11px]">
                <span className="truncate">{ag.cmd}</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(ag.cmd);
                    toast.success(`已复制 ${ag.name} 初始化指令`);
                  }}
                  className="ml-2 shrink-0 text-muted-foreground hover:text-foreground"
                >
                  <Copy className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Bottom Strip */}
      <section className="grid grid-cols-1 gap-4 rounded-3xl border bg-muted/20 p-6 sm:grid-cols-3">
        <div className="flex items-start gap-3">
          <Code2 className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <div className="text-sm font-semibold">结构化 JSON 输出</div>
            <p className="mt-1 text-xs text-muted-foreground">
              所有子命令均支持 <code className="font-mono">--json</code> 标志，便于串联 Shell 与 Python 批处理管道。
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 size-5 shrink-0 text-emerald-500" />
          <div>
            <div className="text-sm font-semibold">共享工作区积分池</div>
            <p className="mt-1 text-xs text-muted-foreground">
              无需额外部署复杂计费，直接使用现有工作区订阅积分与商品资产库。
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Send className="mt-0.5 size-5 shrink-0 text-rose-500" />
          <div>
            <div className="text-sm font-semibold">定时无人值守发布</div>
            <p className="mt-1 text-xs text-muted-foreground">
              配合 Cron 定时任务，每日凌晨自动分析美区飙升榜并推送待审成片。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
