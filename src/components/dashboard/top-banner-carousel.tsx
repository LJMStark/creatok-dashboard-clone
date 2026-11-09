"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TOP_BANNER_CARDS } from "@/data/dashboard-content";

export function TopBannerCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 12);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 12);
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  const scrollByOffset = (direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 480, behavior: "smooth" });
  };

  return (
    <div className="hidden w-full md:block">
      <div className="relative">
        {canScrollLeft && (
          <button
            type="button"
            aria-label="上一张"
            onClick={() => scrollByOffset(-1)}
            className="absolute left-2 top-1/2 z-20 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-transparent bg-black/30 bg-gradient-to-b from-white/15 to-transparent text-white shadow-[0_4px_12px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-[opacity,background-color] duration-200 hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            <ChevronLeft className="size-[18px]" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="no-scrollbar overflow-x-auto"
        >
          <div className="flex w-max gap-3 p-0">
            {TOP_BANNER_CARDS.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                aria-label={card.ariaLabel}
                className="group relative aspect-[3/2] w-[224px] shrink-0 overflow-hidden rounded-3xl bg-zinc-900 shadow-sm transition-[filter] duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {card.mediaType === "video" ? (
                  <video
                    src={card.mediaSrc}
                    poster={card.posterSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onLoadedMetadata={(e) => {
                      if (e.currentTarget.duration > 2.6) {
                        e.currentTarget.currentTime = 2.4;
                      }
                    }}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={card.mediaSrc}
                    alt={card.ariaLabel}
                    className="h-full w-full object-cover"
                  />
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
                <div className="pointer-events-none absolute inset-x-1/4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {card.topRightBadge && (
                  <span className="absolute right-3 top-3 inline-flex items-center overflow-hidden rounded-full border border-white/20 bg-black/45 bg-gradient-to-b from-white/10 to-transparent px-2.5 py-1 text-[10px] font-medium leading-tight text-white/95 shadow-[0_4px_12px_rgba(0,0,0,0.25)] backdrop-blur-md">
                    {card.topRightBadge}
                  </span>
                )}

                {card.bottomCenterTitle && (
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="text-center text-sm font-bold text-white drop-shadow-sm">
                      {card.bottomCenterTitle}
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {canScrollRight && (
          <button
            type="button"
            aria-label="下一张"
            onClick={() => scrollByOffset(1)}
            className="absolute right-2 top-1/2 z-20 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-transparent bg-black/25 bg-gradient-to-b from-white/10 to-transparent text-white shadow-[0_4px_12px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-[opacity,background-color] duration-200 hover:bg-black/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            <ChevronRight className="size-[18px]" />
          </button>
        )}
      </div>
    </div>
  );
}
