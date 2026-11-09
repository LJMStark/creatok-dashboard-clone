"use client";

import React, { useEffect, useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import * as Slider from "@radix-ui/react-slider";
import { Bot, Check, ShieldAlert, SlidersHorizontal, Users } from "lucide-react";
import { toast } from "sonner";
import { SettingsShell } from "@/components/settings/settings-shell";
import { useWorkspace } from "@/store/workspace-context";

export default function WorkspaceGeneralSettingsPage() {
  const { state, updateSettings } = useWorkspace();
  const [teamNameDraft, setTeamNameDraft] = useState(state.settings.teamName);
  const [limitDraft, setLimitDraft] = useState(state.settings.monthlyCreditLimit);

  useEffect(() => {
    setTeamNameDraft(state.settings.teamName);
  }, [state.settings.teamName]);

  useEffect(() => {
    setLimitDraft(state.settings.monthlyCreditLimit);
  }, [state.settings.monthlyCreditLimit]);

  const handleSaveTeamName = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = teamNameDraft.trim();
    if (!cleaned) {
      toast.error("团队名称不能为空");
      return;
    }
    updateSettings({ teamName: cleaned });
    toast.success("团队名称已保存并同步至导航栏");
  };

  const handleLimitCommit = (nextVal: number) => {
    const clamped = Math.max(100, Math.min(50000, Number.isNaN(nextVal) ? 100 : nextVal));
    setLimitDraft(clamped);
    updateSettings({ monthlyCreditLimit: clamped });
  };

  return (
    <SettingsShell
      title="工作区设置"
      description="管理团队基础标识、月度积分消耗上限及 Agent 安全管控策略"
    >
      {/* Team Name Card */}
      <form onSubmit={handleSaveTeamName} className="rounded-2xl border bg-card p-5">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Users className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold">团队名称</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              显示在侧边栏工作区切换器、协作邀请邮件及账单抬头中
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={teamNameDraft}
                onChange={(e) => setTeamNameDraft(e.target.value)}
                maxLength={48}
                className="w-full max-w-sm rounded-xl border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
              >
                <Check className="size-3.5" />
                保存修改
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Monthly Credit Limit Card */}
      <div className="rounded-2xl border bg-card p-5">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <SlidersHorizontal className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold">每月积分用量限制</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  当团队成员当月累计消耗达到该阈值时，系统将自动发送预警并暂停超额任务
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={100}
                  max={50000}
                  step={100}
                  value={limitDraft}
                  onChange={(e) => handleLimitCommit(Number(e.target.value))}
                  className="w-28 rounded-xl border bg-background px-3 py-1.5 text-right text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <span className="text-xs text-muted-foreground">积分 / 月</span>
              </div>
            </div>

            <div className="mt-5 px-1">
              <Slider.Root
                value={[limitDraft]}
                min={100}
                max={20000}
                step={100}
                onValueChange={(vals) => {
                  if (vals[0] !== undefined) {
                    setLimitDraft(vals[0]);
                  }
                }}
                onValueCommit={(vals) => {
                  if (vals[0] !== undefined) {
                    updateSettings({ monthlyCreditLimit: vals[0] });
                    toast.success(`每月积分上限已更新为 ${vals[0]} 积分`);
                  }
                }}
                className="relative flex h-5 w-full touch-none select-none items-center"
              >
                <Slider.Track className="relative h-1.5 grow rounded-full bg-muted">
                  <Slider.Range className="absolute h-full rounded-full bg-primary" />
                </Slider.Track>
                <Slider.Thumb
                  aria-label="每月积分用量限制"
                  className="block size-4 rounded-full border-2 border-primary bg-background shadow focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </Slider.Root>
              <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                <span>100 积分</span>
                <span>5,000 积分</span>
                <span>10,000 积分</span>
                <span>20,000 积分</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Radix Switch Controls */}
      <div className="divide-y rounded-2xl border bg-card">
        <div className="flex items-center justify-between gap-4 p-5">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <Bot className="size-4" />
            </div>
            <div>
              <div className="text-sm font-semibold">Agent 额外用量</div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                允许全自动带货 Agent 在套餐基础积分耗尽后，自动调用加油包或按量额度继续完成长链路任务
              </p>
            </div>
          </div>
          <Switch.Root
            id="switch-extra-agent"
            checked={state.settings.extraAgentUsage}
            onCheckedChange={(checked) => {
              updateSettings({ extraAgentUsage: checked });
              toast.success(checked ? "已开启 Agent 额外用量授权" : "已关闭 Agent 额外用量授权");
            }}
            className="relative h-6 w-11 shrink-0 cursor-pointer rounded-full bg-muted transition-colors data-[state=checked]:bg-primary"
          >
            <Switch.Thumb className="block size-5 translate-x-0.5 rounded-full bg-background shadow transition-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
        </div>

        <div className="flex items-center justify-between gap-4 p-5">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <ShieldAlert className="size-4" />
            </div>
            <div>
              <div className="text-sm font-semibold">限制删除已完成任务</div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                开启后，编辑者成员无法将已完成的 AI 视频与套图资产移入回收站，保障团队数字资产安全
              </p>
            </div>
          </div>
          <Switch.Root
            id="switch-restrict-delete"
            checked={state.settings.restrictDeleteCompleted}
            onCheckedChange={(checked) => {
              updateSettings({ restrictDeleteCompleted: checked });
              toast.success(checked ? "已开启已完成任务删除保护" : "已解除已完成任务删除限制");
            }}
            className="relative h-6 w-11 shrink-0 cursor-pointer rounded-full bg-muted transition-colors data-[state=checked]:bg-primary"
          >
            <Switch.Thumb className="block size-5 translate-x-0.5 rounded-full bg-background shadow transition-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
        </div>
      </div>
    </SettingsShell>
  );
}
