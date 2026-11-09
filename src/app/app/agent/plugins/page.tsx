"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import * as Switch from "@radix-ui/react-switch";
import {
  ArrowRight,
  CheckCircle2,
  CodeXml,
  Puzzle,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import {
  AGENT_PLUGINS_LIST,
  type AgentPluginItem,
} from "@/app/app/agent/_data/agent-workspace-data";
import { useAgentSessions } from "@/app/app/agent/_store/agent-session-context";
import { DynamicIcon } from "@/components/icons/dynamic-icon";
import { cn } from "@/lib/utils";

type PluginTab = "all" | "skill" | "plugin";

export default function AgentPluginsPage() {
  const { enabledPluginIds, togglePluginEnabled } = useAgentSessions();
  const [activeTab, setActiveTab] = useState<PluginTab>("skill");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(AGENT_PLUGINS_LIST[0].id);

  const filteredItems = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    return AGENT_PLUGINS_LIST.filter((item) => {
      const matchesTab = activeTab === "all" ? true : item.kind === activeTab;
      const matchesKeyword =
        !keyword ||
        item.name.toLowerCase().includes(keyword) ||
        item.summary.toLowerCase().includes(keyword) ||
        item.capabilities.some((cap) => cap.toLowerCase().includes(keyword));
      return matchesTab && matchesKeyword;
    });
  }, [activeTab, searchQuery]);

  const activeItem: AgentPluginItem = useMemo(
    () =>
      filteredItems.find((item) => item.id === selectedId) ??
      filteredItems[0] ??
      AGENT_PLUGINS_LIST[0],
    [filteredItems, selectedId]
  );

  const handleToggle = (item: AgentPluginItem) => {
    const enabled = togglePluginEnabled(item.id);
    toast.success(enabled ? `已启用「${item.name}」` : `已停用「${item.name}」`);
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 md:px-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Puzzle className="size-3.5" />
            <span>Agent 扩展中枢</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">技能 & 插件</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            管理 Agent 在对话创作过程中可自动编排的爆款拆解技能（Skills）与第三方电商连接器（Plugins）。
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/app/workspace/api-keys"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border bg-background px-3.5 text-xs font-medium hover:bg-accent"
          >
            <CodeXml className="size-3.5" />
            CLI / MCP 密钥
          </Link>
          <Link
            href="/app/agent/skills"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-primary px-3.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
          >
            <Sparkles className="size-3.5" />
            浏览官方技能库
          </Link>
        </div>
      </div>

      {/* Tabs + Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="Skills 与 Plugins 筛选"
          className="inline-flex items-center rounded-xl border bg-muted/50 p-1"
        >
          {(
            [
              { key: "skill", label: "Skills 技能" },
              { key: "plugin", label: "Plugins 插件" },
              { key: "all", label: "全部扩展" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all",
                activeTab === tab.key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索技能或连接器名称..."
            className="h-9 w-full rounded-xl border bg-background pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {/* Master-Detail Grid */}
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        {/* Cards List */}
        <div className="grid content-start gap-3 sm:grid-cols-2">
          {filteredItems.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed p-10 text-center text-sm text-muted-foreground">
              未找到匹配的技能或插件，请尝试更换搜索词。
            </div>
          ) : (
            filteredItems.map((item) => {
              const isEnabled = enabledPluginIds.includes(item.id);
              const isSelected = activeItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={cn(
                    "cursor-pointer rounded-2xl border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm",
                    isSelected && "border-primary ring-1 ring-primary/20"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground">
                        <DynamicIcon name={item.icon} className="size-5" />
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-semibold">{item.name}</h3>
                        </div>
                        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                          <span>{item.kind === "skill" ? "Skill" : "Plugin"}</span>
                          <span>·</span>
                          <span>{item.version}</span>
                        </div>
                      </div>
                    </div>

                    <Switch.Root
                      checked={isEnabled}
                      onCheckedChange={() => handleToggle(item)}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`启用 ${item.name}`}
                      className="relative h-5 w-9 shrink-0 cursor-pointer rounded-full bg-input transition-colors data-[state=checked]:bg-emerald-500"
                    >
                      <Switch.Thumb className="block size-4 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[18px]" />
                    </Switch.Root>
                  </div>

                  <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {item.summary}
                  </p>

                  <div className="mt-3.5 flex items-center justify-between border-t border-border/60 pt-2.5 text-[11px] text-muted-foreground">
                    <span>{item.author}</span>
                    <span>{item.usageCount}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Detail Panel */}
        <aside className="h-fit rounded-2xl border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <DynamicIcon name={activeItem.icon} className="size-5" />
              </span>
              <div>
                <span className="inline-block rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {activeItem.kind === "skill" ? "Official Skill" : "Verified Plugin"}
                </span>
                <h2 className="mt-1 text-base font-bold">{activeItem.name}</h2>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            {activeItem.detailDescription}
          </p>

          <div className="mt-5 space-y-2.5">
            <div className="text-xs font-semibold">核心能力节点</div>
            <ul className="space-y-2">
              {activeItem.capabilities.map((cap) => (
                <li
                  key={cap}
                  className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2 text-xs"
                >
                  <CheckCircle2 className="size-3.5 shrink-0 text-emerald-500" />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 rounded-xl border bg-muted/20 p-3 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              <ShieldCheck className="size-3.5 text-emerald-500" />
              工作区沙箱安全认证
            </div>
            <p className="mt-1">
              由 {activeItem.author} 维护（版本 {activeItem.version}），仅在当前工作区授权范围内按需调用。
            </p>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleToggle(activeItem)}
              className={cn(
                "flex-1 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors",
                enabledPluginIds.includes(activeItem.id)
                  ? "bg-muted text-foreground hover:bg-accent"
                  : "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700"
              )}
            >
              {enabledPluginIds.includes(activeItem.id) ? "当前已启用（点击停用）" : "立即启用扩展"}
            </button>
            <Link
              href={`/app/agent?prompt=${encodeURIComponent(`请调用「${activeItem.name}」为我的主打商品生成带货方案`)}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
            >
              去对话试用
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
