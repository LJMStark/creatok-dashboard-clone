"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import * as Switch from "@radix-ui/react-switch";
import {
  Activity,
  CalendarClock,
  CheckCircle2,
  ExternalLink,
  Play,
  Plus,
  Send,
  Sparkles,
  UsersRound,
  Workflow,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  INITIAL_AUTOMATION_CHANNELS,
  type AutomationChannel,
} from "@/app/app/agent/_data/agent-workspace-data";
import { updateItemById } from "@/lib/utils";
import { useWorkspace } from "@/store/workspace-context";

const PLATFORM_OPTIONS: readonly AutomationChannel["platform"][] = [
  "TikTok",
  "YouTube Shorts",
  "Instagram Reels",
];

export default function AgentChannelsPage() {
  const { submitTask } = useWorkspace();
  const [channels, setChannels] = useState<readonly AutomationChannel[]>(
    () => INITIAL_AUTOMATION_CHANNELS
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newPlatform, setNewPlatform] = useState<AutomationChannel["platform"]>("TikTok");
  const [newHandle, setNewHandle] = useState("");
  const [newSchedule, setNewSchedule] = useState("每日 20:30 自动生成草稿并发布");
  const [newWorkflow, setNewWorkflow] = useState("监控类目飙升视频 -> Agent 换品复刻 -> 自动挂车");

  const handleToggleWorkflow = (channel: AutomationChannel) => {
    const nextEnabled = !channel.autoPublishEnabled;
    setChannels((prev) =>
      updateItemById(prev, channel.id, (item) => ({
        ...item,
        autoPublishEnabled: nextEnabled,
      }))
    );
    toast.success(
      nextEnabled
        ? `已开启 ${channel.handle} 定时自动化工作流`
        : `已暂停 ${channel.handle} 定时任务`
    );
  };

  const handleRunNow = (channel: AutomationChannel) => {
    submitTask({
      toolPath: "/app/agent/channels",
      toolTitle: `频道自动产片 (${channel.platform})`,
      prompt: `${channel.handle} · ${channel.workflowTitle}`,
      model: "Kling 4.0 Omni",
      cost: 1,
      previewUrl: "https://content.creatok.com/static/dashboard/recreation/car-fragrance/comparison.mp4",
      mediaType: "video",
    });
    setChannels((prev) =>
      updateItemById(prev, channel.id, (item) => ({
        ...item,
        weeklyPublished: item.weeklyPublished + 1,
      }))
    );
    toast.success(`已为 ${channel.handle} 触发单次自动成片并推送草稿箱`);
  };

  const handleBindChannel = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanHandle = newHandle.trim();
    if (!cleanHandle) {
      toast.error("请输入要绑定的频道账号 Handle");
      return;
    }
    const formattedHandle = cleanHandle.startsWith("@") ? cleanHandle : `@${cleanHandle}`;
    const created: AutomationChannel = {
      id: `ch-${Date.now()}`,
      platform: newPlatform,
      handle: formattedHandle,
      region: "全球多站点",
      followers: "新建矩阵号",
      weeklyPublished: 0,
      avgViews: "--",
      scheduleRule: newSchedule,
      workflowTitle: newWorkflow,
      autoPublishEnabled: true,
      connected: true,
    };

    setChannels((prev) => [created, ...prev]);
    setNewHandle("");
    setDialogOpen(false);
    toast.success(`成功绑定 ${newPlatform} 频道 ${formattedHandle}`);
  };

  const activeCount = channels.filter((c) => c.autoPublishEnabled).length;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 md:px-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <Send className="size-3.5" />
            <span>多平台无人值守分发</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">频道自动化管理</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            绑定 TikTok、YouTube Shorts 与 Instagram Reels 矩阵账号，配置 Agent 定时盯盘、复刻产片与草稿投递流水线。
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/app/platform/tiktok"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border bg-background px-3.5 text-xs font-medium hover:bg-accent"
          >
            <span>TikTok CLI 批量发布台</span>
            <ExternalLink className="size-3.5" />
          </Link>

          <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90"
              >
                <Plus className="size-4" />
                绑定新频道
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]" />
              <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-popover p-6 text-popover-foreground shadow-xl focus:outline-none">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-base font-semibold">授权绑定社媒频道</Dialog.Title>
                  <Dialog.Close className="rounded-md p-1 text-muted-foreground hover:bg-accent">
                    <X className="size-4" />
                  </Dialog.Close>
                </div>
                <form onSubmit={handleBindChannel} className="mt-4 space-y-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">目标平台</label>
                    <div className="mt-1.5 grid grid-cols-3 gap-2">
                      {PLATFORM_OPTIONS.map((plat) => (
                        <button
                          key={plat}
                          type="button"
                          onClick={() => setNewPlatform(plat)}
                          className={`rounded-xl border px-2.5 py-2 text-xs font-semibold transition-colors ${
                            newPlatform === plat
                              ? "border-primary bg-primary text-primary-foreground"
                              : "bg-background hover:bg-accent"
                          }`}
                        >
                          {plat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground">频道账号标识</label>
                    <input
                      type="text"
                      value={newHandle}
                      onChange={(e) => setNewHandle(e.target.value)}
                      placeholder="例如 @my_brand_shop"
                      className="mt-1.5 h-9 w-full rounded-xl border bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground">定时触发计划</label>
                    <input
                      type="text"
                      value={newSchedule}
                      onChange={(e) => setNewSchedule(e.target.value)}
                      className="mt-1.5 h-9 w-full rounded-xl border bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground">关联 Agent 工作流</label>
                    <input
                      type="text"
                      value={newWorkflow}
                      onChange={(e) => setNewWorkflow(e.target.value)}
                      className="mt-1.5 h-9 w-full rounded-xl border bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className="rounded-xl border px-3.5 py-2 text-xs font-medium hover:bg-accent"
                      >
                        取消
                      </button>
                    </Dialog.Close>
                    <button
                      type="submit"
                      className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
                    >
                      完成 OAuth 绑定
                    </button>
                  </div>
                </form>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>

      {/* Overview Metric Strip */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border bg-card p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>已连接矩阵频道</span>
            <UsersRound className="size-4 text-primary" />
          </div>
          <div className="mt-2 text-2xl font-bold">{channels.length} 个账号</div>
          <div className="mt-1 text-[11px] text-muted-foreground">覆盖 TikTok / Shorts / Reels</div>
        </div>

        <div className="rounded-2xl border bg-card p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>运行中定时流水线</span>
            <Activity className="size-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold">{activeCount} 条激活</div>
          <div className="mt-1 text-[11px] text-muted-foreground">云端定时调度正常</div>
        </div>

        <div className="rounded-2xl border bg-card p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>近 7 日自动产片投递</span>
            <Sparkles className="size-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-bold">
            {channels.reduce((acc, item) => acc + item.weeklyPublished, 0)} 条成片
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">100% 通过平台原创度合规校验</div>
        </div>
      </div>

      {/* Channels List */}
      <div className="grid gap-4">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className="flex flex-col justify-between gap-4 rounded-2xl border bg-card p-5 shadow-sm transition-colors hover:border-primary/30 lg:flex-row lg:items-center"
          >
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                  {channel.platform}
                </span>
                <h2 className="text-base font-bold">{channel.handle}</h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-3" />
                  OAuth 已授权 · {channel.region}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span>粉丝规模：{channel.followers}</span>
                <span>近 7 日发布：{channel.weeklyPublished} 条</span>
                <span>单条均播：{channel.avgViews}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1 font-medium">
                  <CalendarClock className="size-3.5 text-muted-foreground" />
                  {channel.scheduleRule}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted/60 px-2.5 py-1 text-muted-foreground">
                  <Workflow className="size-3.5 text-primary" />
                  {channel.workflowTitle}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t pt-3 lg:border-t-0 lg:pt-0">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-medium text-muted-foreground">
                  {channel.autoPublishEnabled ? "定时工作流已开启" : "已暂停"}
                </span>
                <Switch.Root
                  checked={channel.autoPublishEnabled}
                  onCheckedChange={() => handleToggleWorkflow(channel)}
                  aria-label={`切换 ${channel.handle} 定时工作流`}
                  className="relative h-5 w-9 cursor-pointer rounded-full bg-input transition-colors data-[state=checked]:bg-emerald-500"
                >
                  <Switch.Thumb className="block size-4 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[18px]" />
                </Switch.Root>
              </div>

              <button
                type="button"
                onClick={() => handleRunNow(channel)}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl border bg-background px-3.5 text-xs font-semibold transition-colors hover:bg-accent"
              >
                <Play className="size-3.5" />
                立即执行一次
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
