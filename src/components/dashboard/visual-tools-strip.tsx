"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { QUICK_TOOL_PILLS, VISUAL_TOOL_CARDS } from "@/data/dashboard-content";
import { DynamicIcon } from "@/components/icons/dynamic-icon";
import { useWorkspace } from "@/store/workspace-context";
import { cn } from "@/lib/utils";

export function VisualToolsStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { state } = useWorkspace();
  const isEn = state.locale === "en";

  const scrollNext = () => {
    scrollRef.current?.scrollBy({ left: 460, behavior: "smooth" });
  };

  return (
    <div className="space-y-3 pt-1">
      {/* Desktop Horizontal Visual Tool Cards */}
      <div className="relative hidden md:block">
        <div ref={scrollRef} className="no-scrollbar overflow-x-auto">
          <div className="flex w-max gap-3">
            {VISUAL_TOOL_CARDS.map((tool) => (
              <Link
                key={tool.id}
                href={tool.href}
                className="group relative flex w-[228px] shrink-0 flex-col overflow-hidden rounded-2xl border border-border/60 bg-muted/40 p-2 transition-all duration-200 hover:border-border hover:bg-muted/70"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-zinc-900">
                  <img
                    src={tool.imageSrc}
                    alt={tool.title}
                    className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-md"
                  />
                  <img
                    src={tool.imageSrc}
                    alt={tool.title}
                    className="relative z-10 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between px-1.5 pb-0.5 pt-2">
                  <h3 className="text-xs font-semibold text-foreground">
                    {isEn ? tool.titleEn : tool.title}
                  </h3>
                  <ArrowRight className="size-3.5 shrink-0 text-primary/60 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="下一张"
          onClick={scrollNext}
          className="absolute right-2 top-1/2 z-20 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-transparent bg-black/30 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-black/50"
        >
          <ChevronRight className="size-[18px]" />
        </button>
      </div>

      {/* Mobile Compact Horizontal Cards matching orig-dashboard-mobile.png */}
      <div className="no-scrollbar flex gap-2.5 overflow-x-auto pb-1 md:hidden">
        {VISUAL_TOOL_CARDS.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className={cn(
              "flex w-[166px] shrink-0 items-center gap-2.5 rounded-2xl border border-border/50 p-2",
              tool.mobileTintClass
            )}
          >
            <img
              src={tool.imageSrc}
              alt={tool.title}
              className="size-14 shrink-0 rounded-xl object-cover"
            />
            <span className="line-clamp-2 text-xs font-semibold text-foreground">
              {isEn ? tool.titleEn : tool.title}
            </span>
          </Link>
        ))}
      </div>

      {/* 6 Quick Tool Pills */}
      <div className="no-scrollbar hidden items-center gap-2.5 overflow-x-auto py-0.5 md:flex">
        {QUICK_TOOL_PILLS.map((pill) => (
          <Link
            key={pill.id}
            href={pill.href}
            className="group inline-flex h-10 flex-[1_0_auto] items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-border/70 bg-background px-4 text-xs font-medium text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors hover:bg-accent"
          >
            <DynamicIcon
              name={pill.icon}
              className={cn("size-4 shrink-0 transition-transform group-hover:scale-105", pill.iconColorClass)}
            />
            <span>{isEn ? pill.textEn : pill.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
