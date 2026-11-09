"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  AGENT_PLUGINS_LIST,
  INITIAL_AGENT_SESSIONS,
  type AgentMessage,
  type AgentSession,
  type StoryboardShot,
} from "@/app/app/agent/_data/agent-workspace-data";

interface SendPromptParams {
  readonly prompt: string;
  readonly mode: "video" | "image";
  readonly model: string;
}

interface AgentSessionContextValue {
  readonly sessions: readonly AgentSession[];
  readonly activeSessionId: string | null;
  readonly activeSession: AgentSession | null;
  readonly startNewSession: () => void;
  readonly selectSession: (sessionId: string) => void;
  readonly sendPromptToAgent: (params: SendPromptParams) => {
    readonly previewUrl: string;
    readonly mediaType: "video" | "image";
    readonly cost: number;
  };
  readonly enabledPluginIds: readonly string[];
  readonly togglePluginEnabled: (pluginId: string) => boolean;
}

const AgentSessionContext = createContext<AgentSessionContextValue | null>(null);

const VIDEO_SAMPLE_POOL = [
  {
    videoUrl: "https://content.creatok.com/static/example/dashboard/skill/reference-bullet-time-ad-prompts/result.mp4",
    posterUrl:
      "https://content.creatok.com/static/example/dashboard/skill/reference-bullet-time-ad-prompts/thumbnail.jpg",
    cloneHref: "/app/viral-video-cloning",
  },
  {
    videoUrl: "https://content.creatok.com/static/dashboard/recreation/sneaker-unboxing/comparison-audio.mp4",
    posterUrl:
      "https://content.creatok.com/static/dashboard/recreation/sneaker-unboxing/comparison-audio.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    cloneHref: "/app/viral-video-cloning",
  },
  {
    videoUrl: "https://content.creatok.com/static/example/dashboard/skill/spray-reveal-product-video/result.mp4",
    posterUrl: "https://content.creatok.com/static/example/dashboard/skill/spray-reveal-product-video/thumbnail.jpg",
    cloneHref: "/app/ai-video-generator",
  },
] as const;

const IMAGE_SAMPLE_POOL = [
  {
    posterUrl:
      "https://content.creatok.com/static/dashboard/shoppable-photos-card.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    cloneHref: "/app/image/shoppable-images",
  },
  {
    posterUrl:
      "https://content.creatok.com/static/dashboard/image-product-listing-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    cloneHref: "/app/image/product-listing",
  },
] as const;

function buildGeneratedShots(prompt: string, mode: "video" | "image"): readonly StoryboardShot[] {
  const shortTopic = prompt.trim().slice(0, 18) || "核心带货单品";
  if (mode === "image") {
    return [
      {
        shotNumber: "第 1 页（痛点封面）",
        duration: "黄金首图",
        visualPrompt: `围绕「${shortTopic}」打造高反差自然光近景特写，顶部留白承接大字报标题`,
        voiceover: "首图钩子：为什么聪明买手今年都换成了这款高颜值方案？",
      },
      {
        shotNumber: "第 2 页（核心卖点）",
        duration: "细节微距",
        visualPrompt: "45 度侧逆光材质微距放大，标注三大差异化工艺与质感细节",
        voiceover: "内页拆解：看得见的扎实做工，日常高频使用依然稳固如新",
      },
      {
        shotNumber: "第 3 页（场景种草）",
        duration: "真实上身/桌面",
        visualPrompt: "北美生活化居家与通勤实景融合展示，强化真实买家秀代入感",
        voiceover: "尾页促单：点击左下角商品卡查看限时折扣与多色库存",
      },
    ];
  }

  return [
    {
      shotNumber: "镜头 01",
      duration: "00:00 - 00:03",
      visualPrompt: `针对「${shortTopic}」设计强视觉反差开场，快速推近产品主体抓住前 3 秒停留`,
      voiceover: "先别划走！如果你还在为选品同质化发愁，看它三秒就懂了。",
    },
    {
      shotNumber: "镜头 02",
      duration: "00:03 - 00:08",
      visualPrompt: "手持原生 UGC 视角切换微距特写，直观演示核心功能与使用前后对比",
      voiceover: "上手零门槛，细节质感直接拉满，完全超出这个价位的预期。",
    },
    {
      shotNumber: "镜头 03",
      duration: "00:08 - 00:13",
      visualPrompt: "多角度高动态环绕展示光影细节，配合节奏卡点强化记忆点",
      voiceover: "不管是自用还是送礼都特别拿得出手，评论区已经全是回购反馈。",
    },
    {
      shotNumber: "镜头 04",
      duration: "00:13 - 00:15",
      visualPrompt: "产品定格特写与限时福利引导画面，突出左下角挂车转化行动点",
      voiceover: "趁现在库存充足，点左下角小黄车直接锁住专属优惠。",
    },
  ];
}

export function AgentSessionProvider({ children }: { readonly children: React.ReactNode }) {
  const [sessions, setSessions] = useState<readonly AgentSession[]>(() => INITIAL_AGENT_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [enabledPluginIds, setEnabledPluginIds] = useState<readonly string[]>(() =>
    AGENT_PLUGINS_LIST.filter((item) => item.defaultEnabled).map((item) => item.id)
  );

  const startNewSession = useCallback(() => {
    setActiveSessionId(null);
  }, []);

  const selectSession = useCallback((sessionId: string) => {
    setActiveSessionId(sessionId);
  }, []);

  const togglePluginEnabled = useCallback(
    (pluginId: string): boolean => {
      const willEnable = !enabledPluginIds.includes(pluginId);
      setEnabledPluginIds((prev) =>
        prev.includes(pluginId) ? prev.filter((id) => id !== pluginId) : [...prev, pluginId]
      );
      return willEnable;
    },
    [enabledPluginIds]
  );

  const sendPromptToAgent = useCallback(
    ({ prompt, mode, model }: SendPromptParams) => {
      const cleanPrompt = prompt.trim();
      const nowLabel = new Date().toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const sampleIdx = cleanPrompt.length % VIDEO_SAMPLE_POOL.length;
      const videoSample = VIDEO_SAMPLE_POOL[sampleIdx];
      const imageSample = IMAGE_SAMPLE_POOL[cleanPrompt.length % IMAGE_SAMPLE_POOL.length];

      const userMsg: AgentMessage = {
        id: `msg-u-${Date.now()}`,
        role: "user",
        content: cleanPrompt,
        timestamp: nowLabel,
      };

      const assistantMsg: AgentMessage = {
        id: `msg-a-${Date.now() + 1}`,
        role: "assistant",
        content:
          mode === "video"
            ? `已基于 ${model} 完成带货受众痛点分析、分镜时间轴拆解与 9:16 成片渲染预览：`
            : `已基于 ${model} 完成 TikTok Shoppable 图文轮播企划与高清种草套图渲染：`,
        timestamp: nowLabel,
        thinkingSummary: `已协同 ${enabledPluginIds.length} 个已启用技能完成钩子编排与画面生成`,
        shots: buildGeneratedShots(cleanPrompt, mode),
        mediaPreview:
          mode === "video"
            ? {
                mediaType: "video",
                title: `${cleanPrompt.slice(0, 16) || "爆款带货视频"} · AI 成片预览`,
                model,
                aspectRatio: "9:16",
                videoUrl: videoSample.videoUrl,
                posterUrl: videoSample.posterUrl,
                cloneHref: videoSample.cloneHref,
              }
            : {
                mediaType: "image",
                title: `${cleanPrompt.slice(0, 16) || "种草带货图文"} · 9:16 套图`,
                model,
                aspectRatio: "9:16",
                posterUrl: imageSample.posterUrl,
                cloneHref: imageSample.cloneHref,
              },
      };

      if (activeSessionId) {
        setSessions((prev) =>
          prev.map((sess) =>
            sess.id === activeSessionId
              ? {
                  ...sess,
                  updatedAt: "刚刚",
                  mode,
                  model,
                  messages: [...sess.messages, userMsg, assistantMsg],
                }
              : sess
          )
        );
      } else {
        const newSessionId = `session-${Date.now()}`;
        const newSession: AgentSession = {
          id: newSessionId,
          title: cleanPrompt.slice(0, 20) || "新建爆款创作会话",
          mode,
          updatedAt: "刚刚",
          model,
          messages: [userMsg, assistantMsg],
        };
        setSessions((prev) => [newSession, ...prev]);
        setActiveSessionId(newSessionId);
      }

      return {
        previewUrl: mode === "video" ? videoSample.videoUrl : imageSample.posterUrl,
        mediaType: mode,
        cost: mode === "video" ? 2 : 1,
      };
    },
    [activeSessionId, enabledPluginIds.length]
  );

  const activeSession = useMemo(
    () => sessions.find((s) => s.id === activeSessionId) ?? null,
    [sessions, activeSessionId]
  );

  const value = useMemo<AgentSessionContextValue>(
    () => ({
      sessions,
      activeSessionId,
      activeSession,
      startNewSession,
      selectSession,
      sendPromptToAgent,
      enabledPluginIds,
      togglePluginEnabled,
    }),
    [
      sessions,
      activeSessionId,
      activeSession,
      startNewSession,
      selectSession,
      sendPromptToAgent,
      enabledPluginIds,
      togglePluginEnabled,
    ]
  );

  return <AgentSessionContext.Provider value={value}>{children}</AgentSessionContext.Provider>;
}

export function useAgentSessions(): AgentSessionContextValue {
  const ctx = useContext(AgentSessionContext);
  if (!ctx) {
    throw new Error("useAgentSessions must be used inside AgentSessionProvider");
  }
  return ctx;
}
