"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowUp,
  BookOpen,
  Clock,
  FileText,
  GitFork,
  Layers,
  Paperclip,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import {
  COMMUNITY_FLOW_CATEGORIES,
  FLOW_COMMUNITY_TEMPLATES,
  type FlowCommunityCategory,
} from "@/app/app/(main)/flow/_data/flow-templates";
import { cn } from "@/lib/utils";

type ProjectTab = "recent" | "mine" | "team";

const IDEA_QUICK_CHIPS = [
  { label: "产品多角度图", prompt: "上传一张产品主图，自动生成前视、侧视、45度微距与手持场景4组多角度商业图" },
  { label: "UGC素材", prompt: "围绕美妆护肤单品生成真人感手持自拍口播分镜与15秒带货短视频" },
  { label: "品牌横幅", prompt: "提取品牌视觉主色，批量生成独立站 Hero Banner 与社媒多尺寸横幅" },
  { label: "促销海报", prompt: "结合黑五限时折扣卖点，一键生成高对比度电商转化海报套图" },
] as const;

export default function FlowCanvasHomePage() {
  const router = useRouter();
  const [ideaInput, setIdeaInput] = useState("");
  const [projectTab, setProjectTab] = useState<ProjectTab>("recent");
  const [communityCategory, setCommunityCategory] = useState<FlowCommunityCategory>("全部");

  const filteredTemplates = useMemo(
    () =>
      communityCategory === "全部"
        ? FLOW_COMMUNITY_TEMPLATES
        : FLOW_COMMUNITY_TEMPLATES.filter((tpl) => tpl.category === communityCategory),
    [communityCategory]
  );

  const handleCreateFromIdea = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = ideaInput.trim();
    const query = clean ? `?idea=${encodeURIComponent(clean)}` : "";
    toast.success("正在为您编排 AI 节点画布...");
    router.push(`/app/flow/socks-ecommerce${query}`);
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 md:px-8">
      {/* Top AI Idea Composer Section matching orig-flow-desktop.png */}
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center pt-6 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <img
            src="/logo-light_zh-compact.webp"
            alt="CreatOK 爆款猎人"
            className="h-8 w-auto dark:hidden"
          />
          <img
            src="/logo-dark_zh-compact.webp"
            alt="CreatOK 爆款猎人"
            className="hidden h-8 w-auto dark:block"
          />
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
            描述你的想法 AI 帮你实现
          </h1>
        </div>

        <form
          onSubmit={handleCreateFromIdea}
          className="mt-7 flex w-full flex-col justify-between rounded-3xl border border-border/80 bg-card p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
        >
          <textarea
            value={ideaInput}
            onChange={(e) => setIdeaInput(e.target.value)}
            rows={4}
            placeholder="描述你想创建的内容，例如「生成一段产品视频」或「批量制作社媒图片」."
            className="w-full resize-none bg-transparent px-1 py-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <div className="mt-2 flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="添加参考附件"
                onClick={() => toast.info("可在进入画布后拖入多张商品图片")}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border/80 bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Paperclip className="size-4" />
              </button>
              <button
                type="button"
                aria-label="选择工作流预设"
                onClick={() => setIdeaInput(IDEA_QUICK_CHIPS[0].prompt)}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border/80 bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <BookOpen className="size-4" />
              </button>
            </div>
            <button
              type="submit"
              aria-label="提交创建工作流"
              className="inline-flex size-9 items-center justify-center rounded-full bg-zinc-500 text-white transition-colors hover:bg-zinc-900 dark:hover:bg-zinc-100 dark:hover:text-zinc-900"
            >
              <ArrowUp className="size-4" />
            </button>
          </div>
        </form>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          {IDEA_QUICK_CHIPS.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => setIdeaInput(chip.prompt)}
              className="rounded-full border border-border/80 bg-background px-4 py-1.5 text-xs font-semibold text-foreground shadow-2xs transition-colors hover:bg-accent"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Section matching orig-flow-desktop.png */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-foreground">项目</h2>
          <Link
            href="/app/flow/socks-ecommerce"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-zinc-900 px-4 text-xs font-semibold text-white transition-opacity hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900"
          >
            <Plus className="size-4" />
            <span>新建工作流</span>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div
            role="tablist"
            aria-label="画布项目切换"
            className="inline-flex items-center rounded-xl bg-muted/70 p-1"
          >
            {(
              [
                { key: "recent", label: "最近", icon: Clock },
                { key: "mine", label: "我的(0)", icon: FileText },
                { key: "team", label: "团队(0)", icon: FileText },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={projectTab === tab.key}
                  onClick={() => setProjectTab(tab.key)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                    projectTab === tab.key
                      ? "bg-background font-semibold text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="size-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <Link
            href="/app/flow/socks-ecommerce"
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border bg-background px-3 text-xs font-medium text-foreground hover:bg-accent"
          >
            <span>查看全部</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* Empty / Create Canvas Box matching orig-flow-desktop.png */}
        <Link
          href="/app/flow/socks-ecommerce"
          className="flex min-h-[210px] flex-col items-center justify-center rounded-2xl bg-muted/45 px-6 py-12 text-center transition-colors hover:bg-muted/70"
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Plus className="size-6" />
          </div>
          <p className="mt-3 text-xs font-medium text-muted-foreground">
            还没有工作流，创建一个新的吧！
          </p>
        </Link>
      </section>

      {/* Community Templates Section: 全部 / 电商 / 营销 / 创意 / 媒体 */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold tracking-tight">社区精选模板</h2>
            <p className="text-xs text-muted-foreground">
              精选高转化电商与品牌视频自动化工作流模板，一键打开即可体验多节点编排。
            </p>
          </div>

          <div
            role="tablist"
            aria-label="社区模板分类"
            className="flex flex-wrap items-center gap-1.5"
          >
            {COMMUNITY_FLOW_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={communityCategory === cat}
                onClick={() => setCommunityCategory(cat)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                  communityCategory === cat
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((tpl) => (
            <Link
              key={tpl.id}
              href={`/app/flow/${tpl.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                <img
                  src={tpl.coverImage}
                  alt={tpl.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-black/65 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                  {tpl.category}
                </span>
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white/90">
                  <span className="inline-flex items-center gap-1">
                    <Layers className="size-3" />
                    {tpl.nodeCount} 步节点串联
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="size-3" />
                    {tpl.forks} 次复用
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h3 className="text-base font-bold">{tpl.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {tpl.summary}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
                  <span className="text-muted-foreground">作者：{tpl.author}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-primary transition-transform group-hover:translate-x-0.5">
                    打开画布
                    <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
