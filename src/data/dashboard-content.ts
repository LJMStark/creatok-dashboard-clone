export interface TopBannerCardItem {
  readonly id: string;
  readonly ariaLabel: string;
  readonly href: string;
  readonly mediaType: "image" | "video";
  readonly mediaSrc: string;
  readonly posterSrc?: string;
  readonly topRightBadge?: string;
  readonly bottomCenterTitle?: string;
  readonly bottomLeftCaption?: string;
}

export interface VisualToolCardItem {
  readonly id: string;
  readonly title: string;
  readonly titleEn: string;
  readonly href: string;
  readonly imageSrc: string;
  readonly mobileTintClass: string;
}

export interface QuickPillItem {
  readonly id: string;
  readonly text: string;
  readonly textEn: string;
  readonly href: string;
  readonly icon: string;
  readonly iconColorClass: string;
}

export interface AgentSkillPillItem {
  readonly id: string;
  readonly text: string;
  readonly textEn: string;
  readonly icon: string;
  readonly promptTemplate: string;
}

export interface ShowcaseVideoItem {
  readonly id: string;
  readonly category: "cloning" | "video-creation" | "image-creation";
  readonly title: string;
  readonly mediaUrl: string;
  readonly posterUrl: string;
  readonly isComparison?: boolean;
  readonly actionLabel: string;
  readonly targetHref: string;
  readonly promptHint: string;
}

export const AGENT_PLACEHOLDERS: readonly string[] = [
  "给我的产品生成各个角度特写",
  "拆解一条 TikTok 视频的钩子、脚本和爆款结构",
  "一次生成电商主图、详情图和社媒素材",
  "参考爆款带货视频，替换成我的护肤品并生成口播",
] as const;

export const TOP_BANNER_CARDS: readonly TopBannerCardItem[] = [
  {
    id: "sale-50",
    ariaLabel: "多款 AI 模型限时最高5折",
    href: "/zh/pricing",
    mediaType: "image",
    mediaSrc:
      "https://content.creatok.com/static/dashboard/sale-promotion.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    topRightBadge: "限时优惠",
  },
  {
    id: "gemini-omni-1-2",
    ariaLabel: "Gemini Omni 1.2 Flash",
    href: "/app/ai-video-generator?model=gemini-omni-1.2-flash",
    mediaType: "video",
    mediaSrc: "https://content.creatok.com/static/dashboard/gemini-omni-1-2-flash.mp4",
    posterSrc:
      "https://content.creatok.com/static/dashboard/gemini-omni-1-2-flash.mp4?x-tos-process=video%2Fsnapshot%2Ct_3500%2Cf_jpg%2Cw_400%2Cm_fast",
  },
  {
    id: "gpt-image-2-6",
    ariaLabel: "GPT Image 2.6",
    href: "/app/image/generator?model=gpt-image-2.6-flare",
    mediaType: "video",
    mediaSrc: "https://content.creatok.com/static/dashboard/gpt-image-2-6.mp4",
    posterSrc:
      "https://content.creatok.com/static/dashboard/gpt-image-2-6.mp4?x-tos-process=video%2Fsnapshot%2Ct_3800%2Cf_jpg%2Cw_400%2Cm_fast",
  },
  {
    id: "api-platform",
    ariaLabel: "API",
    href: "/app/api-platform/pricing",
    mediaType: "video",
    mediaSrc: "https://content.creatok.com/static/dashboard/api-card.mp4",
    posterSrc:
      "https://content.creatok.com/static/dashboard/api-card.mp4?x-tos-process=video%2Fsnapshot%2Ct_1000%2Cf_jpg%2Cw_400%2Cm_fast",
  },
  {
    id: "kling-4-0",
    ariaLabel: "Kling 4.0",
    href: "/app/ai-video-generator?model=kling-4-omni",
    mediaType: "video",
    mediaSrc: "https://content.creatok.com/static/dashboard/kling-4-cropped.mp4",
    posterSrc:
      "https://content.creatok.com/static/dashboard/kling-4-cropped.mp4?x-tos-process=video%2Fsnapshot%2Ct_1000%2Cf_jpg%2Cw_400%2Cm_fast",
    bottomCenterTitle: "Kling 4.0",
  },
  {
    id: "video-depth",
    ariaLabel: "视频深度提取",
    href: "/app/video-depth",
    mediaType: "video",
    mediaSrc: "https://content.creatok.com/static/dashboard/video-depth.mp4",
    posterSrc:
      "https://content.creatok.com/static/dashboard/video-depth.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    bottomCenterTitle: "视频深度提取",
  },
  {
    id: "shoppable-photos",
    ariaLabel: "带货图文，从灵感到发布",
    href: "/app/image/shoppable-images",
    mediaType: "image",
    mediaSrc:
      "https://content.creatok.com/static/dashboard/shoppable-photos-card.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
  },
  {
    id: "nano-banana-2-1",
    ariaLabel: "Nano Banana 2.1",
    href: "/app/image/generator?model=nano-banana-2.1",
    mediaType: "image",
    mediaSrc:
      "https://content.creatok.com/static/dashboard/nano-banana-2-1.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
  },
  {
    id: "chrome-ext",
    ariaLabel: "Chrome 扩展",
    href: "/zh/extension",
    mediaType: "image",
    mediaSrc:
      "https://content.creatok.com/static/dashboard/chrome-extension-card.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
  },
  {
    id: "hy-image-3-5",
    ariaLabel: "Hy Image 3.5 Preview",
    href: "/app/image/generator?model=hy-image-3.5-preview",
    mediaType: "image",
    mediaSrc:
      "https://content.creatok.com/static/dashboard/hy-image-3-5-preview.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    topRightBadge: "略胜 Nano 2",
  },
  {
    id: "wan-3-0",
    ariaLabel: "Wan 3.0",
    href: "/app/ai-video-generator?model=wan-3.0",
    mediaType: "image",
    mediaSrc:
      "https://content.creatok.com/static/dashboard/wan-3-0.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    topRightBadge: "限时优惠 8 折",
  },
  {
    id: "seedance-2-5",
    ariaLabel: "Seedance 2.5",
    href: "/app/ai-video-generator?model=doubao-seedance-2.5",
    mediaType: "image",
    mediaSrc:
      "https://content.creatok.com/static/dashboard/seedance-2-5.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    topRightBadge: "限时优惠 9 折",
  },
  {
    id: "minimax-h3",
    ariaLabel: "MiniMax H3",
    href: "/app/ai-video-generator?model=minimax-h3",
    mediaType: "image",
    mediaSrc:
      "https://content.creatok.com/static/dashboard/minimax-h3.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    topRightBadge: "限时优惠 8 折",
  },
] as const;

export const VISUAL_TOOL_CARDS: readonly VisualToolCardItem[] = [
  {
    id: "viral-cloning",
    title: "爆款复刻",
    titleEn: "Viral Cloning",
    href: "/app/viral-video-cloning",
    imageSrc:
      "https://content.creatok.com/static/dashboard/viral-cloning-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    mobileTintClass: "bg-rose-50/70 dark:bg-rose-950/20",
  },
  {
    id: "video-to-prompt",
    title: "提示词反推",
    titleEn: "Video to Prompt",
    href: "/app/video-to-prompt",
    imageSrc:
      "https://content.creatok.com/static/dashboard/video-to-prompt-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    mobileTintClass: "bg-zinc-50 dark:bg-zinc-900/60",
  },
  {
    id: "subtitle-remover",
    title: "去字幕",
    titleEn: "Remove Subtitles",
    href: "/app/video-subtitle-remover",
    imageSrc:
      "https://content.creatok.com/static/dashboard/video-subtitle-remover-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    mobileTintClass: "bg-amber-50/60 dark:bg-amber-950/20",
  },
  {
    id: "video-upscale",
    title: "画质提升",
    titleEn: "Video Upscale",
    href: "/app/video-upscale",
    imageSrc:
      "https://content.creatok.com/static/dashboard/video-upscale.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    mobileTintClass: "bg-emerald-50/60 dark:bg-emerald-950/20",
  },
  {
    id: "product-listing",
    title: "商品套图",
    titleEn: "Product Listing",
    href: "/app/image/product-listing",
    imageSrc:
      "https://content.creatok.com/static/dashboard/image-product-listing-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    mobileTintClass: "bg-stone-50 dark:bg-stone-900/50",
  },
  {
    id: "aplus-content",
    title: "A+内容",
    titleEn: "A+ Content",
    href: "/app/image/product-listing-aplus",
    imageSrc:
      "https://content.creatok.com/static/dashboard/a-plus-content-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    mobileTintClass: "bg-orange-50/60 dark:bg-orange-950/20",
  },
  {
    id: "detail-page",
    title: "详情长图",
    titleEn: "Detail Long Image",
    href: "/app/image/detail-page",
    imageSrc:
      "https://content.creatok.com/static/dashboard/detail-page-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    mobileTintClass: "bg-blue-50/60 dark:bg-blue-950/20",
  },
  {
    id: "video-publishing",
    title: "视频/图文发布",
    titleEn: "TikTok Publishing",
    href: "/app/platform/tiktok",
    imageSrc:
      "https://content.creatok.com/static/dashboard/video-publishing.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    mobileTintClass: "bg-violet-50/60 dark:bg-violet-950/20",
  },
] as const;

export const QUICK_TOOL_PILLS: readonly QuickPillItem[] = [
  {
    id: "watermark",
    text: "去水印",
    textEn: "Remove Watermark",
    href: "/app/video-watermark-remover",
    icon: "Droplets",
    iconColorClass: "text-cyan-500",
  },
  {
    id: "remove-bg",
    text: "图片去背景",
    textEn: "Remove Background",
    href: "/app/image/remove-bg",
    icon: "Eraser",
    iconColorClass: "text-violet-500",
  },
  {
    id: "tts",
    text: "文字转语音（TTS）",
    textEn: "Text to Speech (TTS)",
    href: "/app/audio/text-to-speech",
    icon: "AudioLines",
    iconColorClass: "text-amber-500",
  },
  {
    id: "transcript",
    text: "TikTok 脚本提取",
    textEn: "TikTok Transcript",
    href: "/app/tiktok-transcript-generator",
    icon: "FileText",
    iconColorClass: "text-blue-500",
  },
  {
    id: "img-translate",
    text: "图片翻译",
    textEn: "Image Translate",
    href: "/app/image/translate",
    icon: "Languages",
    iconColorClass: "text-violet-400",
  },
  {
    id: "img-clone",
    text: "图片复刻",
    textEn: "Image Clone",
    href: "/app/image/image-clone",
    icon: "Images",
    iconColorClass: "text-pink-400/80",
  },
] as const;

export const AGENT_SKILL_PILLS: readonly AgentSkillPillItem[] = [
  {
    id: "analyze",
    text: "拆解视频/图文",
    textEn: "Analyze Video/Carousel",
    icon: "TextSearch",
    promptTemplate: "帮我深度拆解这条 TikTok 带货视频的前 3 秒黄金钩子、分镜节奏与转化话术：",
  },
  {
    id: "clone-video",
    text: "复刻视频",
    textEn: "Clone Viral Video",
    icon: "Film",
    promptTemplate: "参考爆款带货视频镜头结构，将其中商品替换为我的新品并生成复刻分镜与成片",
  },
  {
    id: "create-video",
    text: "创作带货视频",
    textEn: "Create Commerce Video",
    icon: "Workflow",
    promptTemplate: "为我的跨境电商主打单品策划并生成一条 15 秒高完播 TikTok 带货短视频",
  },
  {
    id: "video-prompt",
    text: "视频转提示词",
    textEn: "Video to Prompt",
    icon: "Sparkles",
    promptTemplate: "提取参考视频的运镜方式、光影色调与主体动作，输出可直接用于 Kling / Veo 的结构化提示词",
  },
  {
    id: "clone-carousel",
    text: "复刻带货图文",
    textEn: "Clone Carousel",
    icon: "GalleryHorizontalEnd",
    promptTemplate: "复刻爆款 TikTok 图文轮播结构，为我的产品生成 5 张高点击封面与卖点内页",
  },
  {
    id: "create-carousel",
    text: "创作带货图文",
    textEn: "Create Carousel",
    icon: "ShoppingBag",
    promptTemplate: "基于产品白底图策划一套 9:16 种草带货图文，包含痛点钩子页、对比页与使用场景页",
  },
] as const;

export const SHOWCASE_VIDEOS: readonly ShowcaseVideoItem[] = [
  {
    id: "cloning-example-car-product-swap-comparison",
    category: "cloning",
    title: "车内零食产品替换对比",
    mediaUrl: "https://content.creatok.com/static/dashboard/recreation/car-product-swap/comparison-audio.mp4",
    posterUrl:
      "https://content.creatok.com/static/dashboard/recreation/car-product-swap/comparison-audio.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    isComparison: true,
    actionLabel: "一键复刻",
    targetHref: "/app/viral-video-cloning",
    promptHint: "保持车内双人对话运镜与节奏，将原袋装零食自然替换为目标品牌包装",
  },
  {
    id: "cloning-example-pajama-kick-comparison",
    category: "cloning",
    title: "居家穿搭转场爆款复刻",
    mediaUrl: "https://content.creatok.com/static/dashboard/recreation/pajama-kick/comparison.mp4",
    posterUrl:
      "https://content.creatok.com/static/dashboard/recreation/pajama-kick/comparison.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    isComparison: true,
    actionLabel: "一键复刻",
    targetHref: "/app/viral-video-cloning",
    promptHint: "复刻踢腿换装卡点节奏，替换为新款夏季家居服套装",
  },
  {
    id: "cloning-example-brown-wide-leg-pants-comparison",
    category: "cloning",
    title: "阔腿裤上身展示复刻",
    mediaUrl: "https://content.creatok.com/static/dashboard/recreation/kick-outfit/comparison-audio.mp4",
    posterUrl:
      "https://content.creatok.com/static/dashboard/recreation/kick-outfit/comparison-audio.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    isComparison: true,
    actionLabel: "一键复刻",
    targetHref: "/app/viral-video-cloning",
    promptHint: "保留全身镜前走秀垂坠感动态，替换为棕色高腰阔腿裤",
  },
  {
    id: "cloning-example-burgundy-outfit-comparison",
    category: "cloning",
    title: "酒红礼服穿搭复刻",
    mediaUrl: "https://content.creatok.com/static/dashboard/recreation/burgundy-outfit/comparison.mp4",
    posterUrl:
      "https://content.creatok.com/static/dashboard/recreation/burgundy-outfit/comparison.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    isComparison: true,
    actionLabel: "一键复刻",
    targetHref: "/app/viral-video-cloning",
    promptHint: "复刻室内暖光转身展示动作，替换为酒红色修身针织套装",
  },
  {
    id: "cloning-example-ovaltine-fridge-comparison",
    category: "cloning",
    title: "冰箱饮品补货视角复刻",
    mediaUrl: "https://content.creatok.com/static/dashboard/recreation/ovaltine-fridge/comparison.mp4",
    posterUrl:
      "https://content.creatok.com/static/dashboard/recreation/ovaltine-fridge/comparison.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    isComparison: true,
    actionLabel: "一键复刻",
    targetHref: "/app/viral-video-cloning",
    promptHint: "第一人称冰箱拿取冲泡饮品镜头结构复刻",
  },
  {
    id: "cloning-example-sneaker-unboxing-comparison",
    category: "cloning",
    title: "潮鞋沉浸式开箱复刻",
    mediaUrl: "https://content.creatok.com/static/dashboard/recreation/sneaker-unboxing/comparison-audio.mp4",
    posterUrl:
      "https://content.creatok.com/static/dashboard/recreation/sneaker-unboxing/comparison-audio.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    isComparison: true,
    actionLabel: "一键复刻",
    targetHref: "/app/viral-video-cloning",
    promptHint: "保留桌面俯拍开箱手部动作节奏，替换为新款运动跑鞋",
  },
  {
    id: "cloning-example-car-fragrance-comparison",
    category: "cloning",
    title: "车载香薰特写带货复刻",
    mediaUrl: "https://content.creatok.com/static/dashboard/recreation/car-fragrance/comparison.mp4",
    posterUrl:
      "https://content.creatok.com/static/dashboard/recreation/car-fragrance/comparison.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    isComparison: true,
    actionLabel: "一键复刻",
    targetHref: "/app/viral-video-cloning",
    promptHint: "中控台安装车载香薰特写与阳光折射镜头复刻",
  },
  {
    id: "cloning-example-elements-bag-comparison",
    category: "cloning",
    title: "时尚女包换人换物复刻",
    mediaUrl: "https://content.creatok.com/static/dashboard/recreation/elements-bag/comparison.mp4",
    posterUrl:
      "https://content.creatok.com/static/dashboard/recreation/elements-bag/comparison.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    isComparison: true,
    actionLabel: "一键复刻",
    targetHref: "/app/viral-video-cloning?mode=elements",
    promptHint: "换人换物模式：保留街拍步伐姿态，同步替换模特与手提包款",
  },
  {
    id: "T-fx4dcaQ7N6u59BEOi-O",
    category: "video-creation",
    title: "Seedance 提示词",
    mediaUrl: "https://content.creatok.com/static/example/dashboard/skill/T-fx4dcaQ7N6u59BEOi-O/result.mp4",
    posterUrl: "https://content.creatok.com/static/example/dashboard/skill/T-fx4dcaQ7N6u59BEOi-O/material-product.png",
    actionLabel: "试一试",
    targetHref: "/app/ai-video-generator?model=doubao-seedance-2.5",
    promptHint: "使用 Seedance 高动态商业运镜模板生成产品大片",
  },
  {
    id: "8mwespY-a2mgC1Vtjmj5P",
    category: "video-creation",
    title: "子弹时间广告",
    mediaUrl: "https://content.creatok.com/static/example/dashboard/skill/reference-bullet-time-ad-prompts/result.mp4",
    posterUrl: "https://content.creatok.com/static/example/dashboard/skill/reference-bullet-time-ad-prompts/thumbnail.jpg",
    actionLabel: "试一试",
    targetHref: "/app/ai-video-generator",
    promptHint: "360度环绕凝固子弹时间商业广告镜头，突出产品悬浮质感",
  },
  {
    id: "spider-web-object-retrieval",
    category: "video-creation",
    title: "蛛丝牵引产品",
    mediaUrl: "https://content.creatok.com/static/example/dashboard/skill/spider-web-object-retrieval/video (5).mp4",
    posterUrl:
      "https://content.creatok.com/static/example/dashboard/skill/spider-web-object-retrieval/codex-clipboard-043a7267-8854-4475-a703-f6745d53b851.png",
    actionLabel: "试一试",
    targetHref: "/app/ai-video-generator",
    promptHint: "创意视觉钩子：超现实蛛丝瞬间拉回画面中心的产品特写",
  },
  {
    id: "idRu8DcGon1kCmfEN5wV6",
    category: "video-creation",
    title: "超高货车广告",
    mediaUrl: "https://content.creatok.com/static/example/dashboard/skill/overheight-truck-product-ad/video (2).mp4",
    posterUrl:
      "https://content.creatok.com/static/example/dashboard/skill/overheight-truck-product-ad/codex-clipboard-c04fd934-320b-47d3-a50b-15f45322d1c2.png",
    actionLabel: "试一试",
    targetHref: "/app/ai-video-generator",
    promptHint: "街头巨物CGI视觉奇观：巨型透明货车装载放大版品牌单品驶过街头",
  },
  {
    id: "U3tZ4k-Mn1KAVH8-Mh9z1",
    category: "video-creation",
    title: "喷雾显形",
    mediaUrl: "https://content.creatok.com/static/example/dashboard/skill/spray-reveal-product-video/result.mp4",
    posterUrl: "https://content.creatok.com/static/example/dashboard/skill/spray-reveal-product-video/thumbnail.jpg",
    actionLabel: "试一试",
    targetHref: "/app/ai-video-generator",
    promptHint: "细腻水雾喷洒瞬间在空气中凝结显形出产品瓶身",
  },
  {
    id: "Gt1uPWr1MmwsiyFXgDajI",
    category: "video-creation",
    title: "荒诞钩子",
    mediaUrl: "https://content.creatok.com/static/example/dashboard/skill/chase-hook-product-video/result.mp4",
    posterUrl: "https://content.creatok.com/static/example/dashboard/skill/chase-hook-product-video/thumbnail.jpg",
    actionLabel: "试一试",
    targetHref: "/app/ai-video-generator",
    promptHint: "前3秒强反差戏剧化追逐钩子无缝衔接产品卖点展示",
  },
  {
    id: "replicate-commerce-carousel",
    category: "image-creation",
    title: "带货图文复刻",
    mediaUrl:
      "https://content.creatok.com/static/example/dashboard/skill/replicate-commerce-carousel/replicate-commerce-carousel.mp4",
    posterUrl:
      "https://content.creatok.com/static/example/dashboard/skill/replicate-commerce-carousel/replicate-commerce-carousel-thumbnail.jpg",
    actionLabel: "试一试",
    targetHref: "/app/image/shoppable-images",
    promptHint: "一键复刻高互动 TikTok Shoppable 图文轮播排版与钩子文案",
  },
  {
    id: "shoppable-carousel-from-product-image",
    category: "image-creation",
    title: "图文带货",
    mediaUrl:
      "https://content.creatok.com/static/example/dashboard/skill/shoppable-carousel-from-product-image/generated-images-2026-09-11-slideshow-9x16-black.mp4",
    posterUrl:
      "https://content.creatok.com/static/example/dashboard/skill/shoppable-carousel-from-product-image/thumbnail-black.jpg",
    actionLabel: "试一试",
    targetHref: "/app/image/shoppable-images",
    promptHint: "从单张商品白底图自动生成黑金高级感 9:16 滑动带货图集",
  },
  {
    id: "product-image-set-planner-9x16",
    category: "image-creation",
    title: "商品套图策划",
    mediaUrl:
      "https://content.creatok.com/static/example/dashboard/skill/product-image-set-planner-9x16/result.mp4",
    posterUrl:
      "https://content.creatok.com/static/example/dashboard/skill/product-image-set-planner-9x16/video-thumbnail.jpg",
    actionLabel: "试一试",
    targetHref: "/app/image/product-listing",
    promptHint: "自动规划主图、场景图、尺寸规格图与细节微距特写套图",
  },
  {
    id: "simpsons-tiktok-carousel-rosemary-hair-spray",
    category: "image-creation",
    title: "辛普森轮播",
    mediaUrl: "https://content.creatok.com/static/example/dashboard/skill/simpsons-tiktok-carousel/result.mp4",
    posterUrl: "https://content.creatok.com/static/example/dashboard/skill/simpsons-tiktok-carousel/thumbnail.jpg",
    actionLabel: "试一试",
    targetHref: "/app/image/generator",
    promptHint: "美式卡通故事痛点漫画风格迷迭香护发喷雾种草轮播图",
  },
] as const;
