"use client";

import React, { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, BarChart3, DollarSign, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const DAILY_SPEND_SERIES = [
  { date: "11-02", requests: 184, spendUsd: 8.4 },
  { date: "11-03", requests: 246, spendUsd: 11.2 },
  { date: "11-04", requests: 198, spendUsd: 9.1 },
  { date: "11-05", requests: 312, spendUsd: 14.8 },
  { date: "11-06", requests: 275, spendUsd: 12.6 },
  { date: "11-07", requests: 340, spendUsd: 16.5 },
  { date: "11-08", requests: 215, spendUsd: 10.05 },
];

const MODEL_USAGE_SERIES = [
  { model: "Kling 4.0", calls: 620, spendUsd: 38.4 },
  { model: "Gemini Omni 1.2", calls: 510, spendUsd: 18.2 },
  { model: "Veo 3.1", calls: 140, spendUsd: 14.9 },
  { model: "Nano Banana 2.1", calls: 320, spendUsd: 7.4 },
  { model: "GPT Image 2.6", calls: 180, spendUsd: 3.75 },
];

export default function ApiPlatformUsagePage() {
  const [dimension, setDimension] = useState<"daily" | "model">("daily");
  const [metric, setMetric] = useState<"spend" | "requests">("spend");

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-5 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="size-5 text-primary" />
            <h1 className="text-2xl font-semibold tracking-tight">用量统计</h1>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            按日期与模型维度透视 API 调用次数、折后实际扣费金额及任务成功率
          </p>
        </div>

        <div className="inline-flex rounded-xl border bg-muted/40 p-1 text-xs">
          <button
            type="button"
            onClick={() => setDimension("daily")}
            className={cn(
              "rounded-lg px-3.5 py-1.5 font-medium transition-colors",
              dimension === "daily"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            按天趋势
          </button>
          <button
            type="button"
            onClick={() => setDimension("model")}
            className={cn(
              "rounded-lg px-3.5 py-1.5 font-medium transition-colors",
              dimension === "model"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            按模型分布
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>近 7 日累计消耗金额</span>
            <DollarSign className="size-4 text-emerald-500" />
          </div>
          <div className="mt-2 font-mono text-2xl font-bold">$82.65</div>
          <div className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400">
            较官方原价已累计节省 $54.80
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>近 7 日总调用次数</span>
            <Activity className="size-4 text-violet-500" />
          </div>
          <div className="mt-2 font-mono text-2xl font-bold">1,770</div>
          <div className="mt-1 text-[11px] text-muted-foreground">成功率 99.4% · 失败零扣费</div>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>活跃调用模型数</span>
            <Layers className="size-4 text-amber-500" />
          </div>
          <div className="mt-2 font-mono text-2xl font-bold">5 款</div>
          <div className="mt-1 text-[11px] text-muted-foreground">主力模型：Kling 4.0 Omni</div>
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="rounded-2xl border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold">
              {dimension === "daily" ? "每日调用与消费走势" : "各模型调用量与金额对比"}
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              所有统计数据按 UTC+8 准实时聚合更新
            </p>
          </div>

          <div className="inline-flex rounded-lg border bg-muted/40 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setMetric("spend")}
              className={cn(
                "rounded-md px-3 py-1 font-medium",
                metric === "spend" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              消耗金额 (USD)
            </button>
            <button
              type="button"
              onClick={() => setMetric("requests")}
              className={cn(
                "rounded-md px-3 py-1 font-medium",
                metric === "requests" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              调用次数
            </button>
          </div>
        </div>

        <div className="mt-6 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {dimension === "daily" ? (
              <AreaChart data={[...DAILY_SPEND_SERIES]} margin={{ top: 10, right: 16, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="apiUsageFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.32} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.16} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    fontSize: "12px",
                    border: "1px solid rgba(128,128,128,0.2)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={metric === "spend" ? "spendUsd" : "requests"}
                  name={metric === "spend" ? "消耗金额 ($)" : "调用次数"}
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#apiUsageFill)"
                />
              </AreaChart>
            ) : (
              <BarChart data={[...MODEL_USAGE_SERIES]} margin={{ top: 10, right: 16, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.16} />
                <XAxis dataKey="model" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    fontSize: "12px",
                    border: "1px solid rgba(128,128,128,0.2)",
                  }}
                />
                <Bar
                  dataKey={metric === "spend" ? "spendUsd" : "calls"}
                  name={metric === "spend" ? "消耗金额 ($)" : "调用次数"}
                  fill="#8b5cf6"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
