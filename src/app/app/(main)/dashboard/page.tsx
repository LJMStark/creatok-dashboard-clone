"use client";

import React, { useState } from "react";
import { TopBannerCarousel } from "@/components/dashboard/top-banner-carousel";
import { HeroComposer, type HeroTabMode } from "@/components/dashboard/hero-composer";
import { VisualToolsStrip } from "@/components/dashboard/visual-tools-strip";
import { ResourceShowcaseHub } from "@/components/dashboard/resource-showcase-hub";

export default function DashboardPage() {
  const [activeHeroTab, setActiveHeroTab] = useState<HeroTabMode>("agent");

  return (
    <div className="flex w-full flex-col gap-4 p-4 sm:p-6">
      <TopBannerCarousel />
      <HeroComposer activeTab={activeHeroTab} onTabChange={setActiveHeroTab} />
      <VisualToolsStrip />
      <ResourceShowcaseHub activeHeroTab={activeHeroTab} />
    </div>
  );
}
