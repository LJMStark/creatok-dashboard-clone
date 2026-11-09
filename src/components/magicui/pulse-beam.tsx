"use client";

import React, { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";

export interface PulseBeamProps {
  readonly children: React.ReactNode;
  readonly active?: boolean;
  readonly className?: string;
  readonly colorVariant?: "colorful" | "mono";
  readonly strength?: number;
}

/**
 * Replicates CreatOK's `data-beam` / `data-beam-bloom` harmonic oscillator border & bottom glow
 * extracted from chunk `1vsiz9a09s6jn.js`.
 */
export function PulseBeam({
  children,
  active = true,
  className,
  colorVariant = "colorful",
  strength = 1,
}: PulseBeamProps) {
  const rawId = useId();
  const beamId = rawId.replace(/:/g, "-");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const el = containerRef.current;
    if (!el) return;

    let rafId = 0;
    let lastTick = 0;
    const interval = 1000 / 30 - 2;
    const twoPi = Math.PI * 2;
    const cosineWave = (t: number) => (1 - Math.cos(twoPi * t)) / 2;

    const animate = (now: number) => {
      rafId = requestAnimationFrame(animate);
      if (now - lastTick < interval) return;
      lastTick = now;

      const sec = now / 1000;
      const shiftX = -18 + 36 * cosineWave(sec / 7.5);
      const shiftX2 = 22 - 44 * cosineWave((sec - 1.4) / 9.2);
      const hue = -24 + 48 * cosineWave(sec / 14);
      const pulse = 0.72 + 0.28 * cosineWave(sec / 4.8);

      el.style.setProperty("--beam-x1", `${shiftX.toFixed(2)}%`);
      el.style.setProperty("--beam-x2", `${shiftX2.toFixed(2)}%`);
      el.style.setProperty("--beam-hue", `${hue.toFixed(1)}deg`);
      el.style.setProperty("--beam-pulse", pulse.toFixed(3));
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [active]);

  const bloomGradient =
    colorVariant === "colorful"
      ? `radial-gradient(ellipse 140px 28px at calc(38% + var(--beam-x1, 0%)) 100%, rgba(255, 70, 130, ${0.26 * strength}), transparent 72%),
         radial-gradient(ellipse 150px 26px at calc(52% + var(--beam-x2, 0%)) 100%, rgba(60, 175, 255, ${0.24 * strength}), transparent 74%),
         radial-gradient(ellipse 110px 24px at calc(64% - var(--beam-x1, 0%)) 100%, rgba(255, 175, 55, ${0.22 * strength}), transparent 72%),
         radial-gradient(ellipse 120px 26px at calc(46% - var(--beam-x2, 0%)) 100%, rgba(165, 85, 255, ${0.24 * strength}), transparent 75%)`
      : `radial-gradient(ellipse 160px 24px at 50% 100%, rgba(160, 160, 160, 0.22), transparent 70%)`;

  return (
    <div
      ref={containerRef}
      data-beam={beamId}
      data-active={active ? "" : undefined}
      className={cn("relative rounded-3xl", className)}
    >
      {active && (
        <>
          <div
            data-beam-bloom="true"
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-2 -bottom-2.5 h-10 rounded-[inherit] blur-md transition-opacity duration-500"
            style={{
              backgroundImage: bloomGradient,
              filter: "hue-rotate(var(--beam-hue, 0deg)) blur(10px)",
              opacity: "var(--beam-pulse, 0.85)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] z-10"
          >
            <div
              className="absolute inset-x-8 bottom-0 h-[1.5px]"
              style={{
                backgroundImage:
                  colorVariant === "colorful"
                    ? "linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.65) 28%, rgba(244,114,182,0.8) 50%, rgba(251,191,36,0.7) 72%, transparent 100%)"
                    : "linear-gradient(90deg, transparent, rgba(161,161,170,0.5), transparent)",
                filter: "hue-rotate(var(--beam-hue, 0deg))",
              }}
            />
          </div>
        </>
      )}
      {children}
    </div>
  );
}
