"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
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
import { ArrowUpRight, Sparkles, TrendingUp, Users } from "lucide-react";
import { SettingsShell } from "@/components/settings/settings-shell";
import { useWorkspace } from "@/store/workspace-context";
import { cn } from "@/lib/utils";

const DAILY_USAGE_DATA = [
  { date: "11-02", credits: 6 },
  { date: "11-03", credits: 9 },
  { date: "11-04", credits: 4 },
  { date: "11-05", credits: 11 },
  { date: "11-06", credits: 5 },
  { date: "11-07", credits: 6 },
  { date: "11-08", credits: 3 },
];

export default function WorkspaceCreditsPage() {
  const { state } = useWorkspace();
  const [chartTab, setChartTab] = useState<"daily" | "member">("daily");

  const memberChartData = useMemo(
    () =>
      state.members.map((m) => ({
        name: m.name,
        credits: m.creditsUsed,
      })),
    [state.members]
  );

  const ledgerRows = useMemo(() => {
    const taskRows = state.tasks.map((t) => ({
      id: t.id,
      time: t.createdAt,
      action: `${t.toolTitle}（${t.model}）`,
      prompt: t.prompt,
      delta: -t.cost,
    }));

    const seedGrant = {
      id: "grant-initial",
      time: "2026-11-01 00:00",
      action: "工作区月度体验积分发放",
      prompt: "Free 计划周期额度自动到账",
      delta: 50,
    };

    return [...taskRows, seedGrant];
  }, [state.tasks]);

  const totalUsed = useMemo(
    () => state.members.reduce((sum, m) => sum + m.creditsUsed, 0),
    [state.members]
  );

  return (
    <SettingsShell
      title="积分明细"
      description="实时追踪 AI 模型消耗趋势、团队成员用量分布与每一笔任务扣减流水"
      headerAction={
        <Link
          href="/zh/pricing"
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
        >
          <Sparkles className="size-3.5" />
          充值积分 <ArrowUpRight className="size-3.5" />
        </Link>
      }
    >
      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5">
          <div className="text-xs text-muted-foreground">当前可用积分</div>
          <div className="mt-2 flex items-baseline gap-2">
            <Sparkles className="size-4 text-emerald-500" />
            <span className="text-2xl font-bold">{state.credits}</span>
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">实时同步自生成任务队列</div>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <div className="text-xs text-muted-foreground">近 7 日消耗合计</div>
          <div className="mt-2 flex items-baseline gap-2">
            <TrendingUp className="size-4 text-violet-500" />
            <span className="text-2xl font-bold">{totalUsed}</span>
            <span className="text-xs text-muted-foreground">积分</span>
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">
            月度限额：{state.settings.monthlyCreditLimit} 积分
          </div>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <div className="text-xs text-muted-foreground">活跃使用成员</div>
          <div className="mt-2 flex items-baseline gap-2">
            <Users className="size-4 text-amber-500" />
            <span className="text-2xl font-bold">{state.members.length}</span>
            <span className="text-xs text-muted-foreground">人</span>
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">支持成员级消耗统计</div>
        </div>
      </div>

      {/* Recharts Trend Panel */}
      <div className="rounded-2xl border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold">消耗趋势分析</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {chartTab === "daily" ? "最近 7 天每日积分消耗走势" : "当前工作区各成员累计积分消耗对比"}
            </p>
          </div>
          <div className="inline-flex rounded-xl border bg-muted/50 p-1 text-xs">
            <button
              type="button"
              onClick={() => setChartTab("daily")}
              className={cn(
                "rounded-lg px-3 py-1 font-medium transition-colors",
                chartTab === "daily" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              每日用量
            </button>
            <button
              type="button"
              onClick={() => setChartTab("member")}
              className={cn(
                "rounded-lg px-3 py-1 font-medium transition-colors",
                chartTab === "member" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              成员用量
            </button>
          </div>
        </div>

        <div className="mt-5 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartTab === "daily" ? (
              <AreaChart data={[...DAILY_USAGE_DATA]} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="creditGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.18} />
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
                  dataKey="credits"
                  name="消耗积分"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#creditGradient)"
                />
              </AreaChart>
            ) : (
              <BarChart data={[...memberChartData]} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.18} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    fontSize: "12px",
                    border: "1px solid rgba(128,128,128,0.2)",
                  }}
                />
                <Bar dataKey="credits" name="成员消耗积分" fill="#10b981" radius={[6, 6, 0, 0]} barSize={36} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Credit Ledger Table */}
      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="border-b px-5 py-3.5 text-sm font-semibold">积分变动流水</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b bg-muted/30 text-muted-foreground">
                <th className="px-5 py-3 font-medium">时间</th>
                <th className="px-5 py-3 font-medium">工具 / 类型</th>
                <th className="px-5 py-3 font-medium">任务摘要</th>
                <th className="px-5 py-3 text-right font-medium">积分变动</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {ledgerRows.map((row) => (
                <tr key={row.id} className="hover:bg-muted/20">
                  <td className="whitespace-nowrap px-5 py-3 text-muted-foreground">{row.time}</td>
                  <td className="px-5 py-3 font-medium">{row.action}</td>
                  <td className="max-w-xs truncate px-5 py-3 text-muted-foreground">{row.prompt}</td>
                  <td
                    className={cn(
                      "px-5 py-3 text-right font-mono font-semibold",
                      row.delta > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"
                    )}
                  >
                    {row.delta > 0 ? `+${row.delta}` : row.delta}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SettingsShell>
  );
}
