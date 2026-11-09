"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  FileImage,
  Play,
  Search,
  Sparkles,
  Video,
} from "lucide-react";
import {
  OFFICIAL_SKILLS_LIBRARY,
  type OfficialSkillCard,
} from "@/app/app/agent/_data/agent-workspace-data";
import { cn } from "@/lib/utils";

type SkillFilter = "all" | "analyze" | "video" | "commerce-image";

const CATEGORY_TABS: readonly { readonly key: SkillFilter; readonly label: string }[] = [
  { key: "all", label: "全部技能" },
  { key: "analyze", label: "爆款拆解 & 复刻" },
  { key: "video", label: "商业视频特效" },
  { key: "commerce-image", label: "套图策划 & 轮播" },
] as const;

function SkillShowcaseCard({ skill }: { readonly skill: OfficialSkillCard }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play().catch(() => {
      /* ignore autoplay block */
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const targetAgentUrl = `/app/agent?skill=${encodeURIComponent(skill.id)}&mode=${skill.mode}&prompt=${encodeURIComponent(skill.prompt)}`;

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <video
          ref={videoRef}
          src={skill.mediaUrl}
          poster={skill.posterUrl}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute left-3 top-3 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-black/65 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
            {skill.mode === "video" ? (
              <Video className="size-3 text-sky-400" />
            ) : (
              <FileImage className="size-3 text-amber-400" />
            )}
            {skill.badge}
          </span>
        </div>

        <div className="absolute right-3 top-3">
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm">
            <Play className={cn("size-3.5 transition-transform", hovered && "scale-110")} />
          </span>
        </div>

        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white/90">
          <span className="truncate font-medium">{skill.model}</span>
          <span>{skill.runsCount} 次复用</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight">{skill.title}</h3>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {skill.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
          <span className="text-[11px] text-muted-foreground">
            {skill.mode === "video" ? "视频工作流模板" : "图文工作流模板"}
          </span>
          <Link
            href={targetAgentUrl}
            className="inline-flex items-center gap-1 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <span>立即使用</span>
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function AgentSkillsLibraryPage() {
  const [activeCategory, setActiveCategory] = useState<SkillFilter>("all");
  const [keyword, setKeyword] = useState("");

  const visibleSkills = useMemo(() => {
    const clean = keyword.trim().toLowerCase();
    return OFFICIAL_SKILLS_LIBRARY.filter((item) => {
      const matchCat = activeCategory === "all" || item.category === activeCategory;
      const matchText =
        !clean ||
        item.title.toLowerCase().includes(clean) ||
        item.description.toLowerCase().includes(clean) ||
        item.model.toLowerCase().includes(clean);
      return matchCat && matchText;
    });
  }, [activeCategory, keyword]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 md:px-8">
      {/* Header Banner */}
      <div className="flex flex-wrap items-end justify-between gap-4 rounded-3xl border bg-gradient-to-br from-muted/70 via-background to-muted/40 p-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <BookOpen className="size-3.5 text-primary" />
            <span>Official Skills Playbook</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">官方技能库</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            精选经过百万级播放验证的电商短视频与种草图文生产配方。悬停预览真实成片效果，点击即可一键带入 Agent 对话台替换成你的商品。
          </p>
        </div>

        <Link
          href="/app/agent"
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90"
        >
          <Sparkles className="size-4" />
          新建自由创作会话
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveCategory(tab.key)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all",
                activeCategory === tab.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="搜索拆解、子弹时间、套图..."
            className="h-9 w-full rounded-full border bg-background pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {/* Skills Matrix */}
      {visibleSkills.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-12 text-center text-sm text-muted-foreground">
          暂无匹配的技能配方，请切换分类或清空搜索关键词。
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleSkills.map((skill) => (
            <SkillShowcaseCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
}
