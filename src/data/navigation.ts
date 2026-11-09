export type PopoverMenuKey = "video" | "image" | "audio" | "tools";

export interface NavSubItem {
  readonly title: string;
  readonly titleEn: string;
  readonly href: string;
  readonly icon: string;
  readonly badge?: string;
  readonly description?: string;
}

export interface SidebarNavItem {
  readonly title: string;
  readonly titleEn: string;
  readonly href?: string;
  readonly icon: string;
  readonly badge?: string;
  readonly badgeVariant?: "secondary" | "new" | "cli";
  readonly popoverKey?: PopoverMenuKey;
}

export interface SidebarNavGroup {
  readonly id: string;
  readonly items: readonly SidebarNavItem[];
}

export const SIDEBAR_GROUPS: readonly SidebarNavGroup[] = [
  {
    id: "primary",
    items: [
      { title: "首页", titleEn: "Home", href: "/app/dashboard", icon: "House" },
      { title: "Agent", titleEn: "Agent", href: "/app/agent", icon: "Bot" },
      { title: "视频分析", titleEn: "Video Chat", href: "/app/chat", icon: "MessageCircle" },
      {
        title: "爆款趋势",
        titleEn: "Trending",
        href: "/app/trending",
        icon: "Telescope",
        badge: "图文",
        badgeVariant: "secondary",
      },
    ],
  },
  {
    id: "creation",
    items: [
      { title: "视频", titleEn: "Video", icon: "Video", popoverKey: "video" },
      { title: "图片", titleEn: "Image", icon: "Image", popoverKey: "image" },
      { title: "音频", titleEn: "Audio", icon: "Music", popoverKey: "audio" },
      { title: "画布", titleEn: "Canvas", href: "/app/flow", icon: "Workflow" },
      { title: "工具", titleEn: "Tools", icon: "Wrench", popoverKey: "tools" },
    ],
  },
  {
    id: "publishing",
    items: [
      {
        title: "视频/图文发布",
        titleEn: "TikTok Publish",
        href: "/app/platform/tiktok",
        icon: "Send",
        badge: "CLI",
        badgeVariant: "cli",
      },
    ],
  },
  {
    id: "library",
    items: [
      { title: "资产库", titleEn: "Assets", href: "/app/assets", icon: "Shapes" },
      {
        title: "灵感库",
        titleEn: "Collections",
        href: "/app/collections",
        icon: "Film",
        badge: "New",
        badgeVariant: "new",
      },
    ],
  },
] as const;

export const SIDEBAR_POPOVER_MENUS: Readonly<Record<PopoverMenuKey, readonly NavSubItem[]>> = {
  video: [
    { title: "视频生成", titleEn: "AI Video Generator", href: "/app/ai-video-generator", icon: "Video" },
    { title: "爆款复刻", titleEn: "Viral Video Cloning", href: "/app/viral-video-cloning", icon: "Files" },
    { title: "商品生视频", titleEn: "Link to Video", href: "/app/link-to-video", icon: "Link2" },
    { title: "提示词反推", titleEn: "Video to Prompt", href: "/app/video-to-prompt", icon: "WandSparkles" },
    { title: "去字幕", titleEn: "Subtitle Remover", href: "/app/video-subtitle-remover", icon: "Captions" },
    { title: "去水印", titleEn: "Watermark Remover", href: "/app/video-watermark-remover", icon: "Eraser" },
    { title: "画质提升", titleEn: "Video Upscale", href: "/app/video-upscale", icon: "Sparkles" },
    { title: "视频对口型", titleEn: "Video Lip Sync", href: "/app/video-lip-sync", icon: "MicVocal" },
    { title: "视频翻译", titleEn: "Video Translate", href: "/app/video-translate", icon: "Languages" },
    { title: "角色替换", titleEn: "Character Swap", href: "/app/video-character-swap", icon: "UsersRound" },
    { title: "动作控制", titleEn: "Motion Control", href: "/app/motion-control", icon: "PersonStanding" },
    { title: "深度提取", titleEn: "Video Depth", href: "/app/video-depth", icon: "Layers" },
  ],
  image: [
    { title: "图片生成", titleEn: "Image Generator", href: "/app/image/generator", icon: "FileImage" },
    { title: "商品套图", titleEn: "Product Listing", href: "/app/image/product-listing", icon: "ShoppingBag" },
    { title: "图文带货", titleEn: "Shoppable Images", href: "/app/image/shoppable-images", icon: "Images" },
    { title: "A+内容", titleEn: "A+ Content", href: "/app/image/product-listing-aplus", icon: "LayoutList" },
    { title: "商品详情图", titleEn: "Detail Page", href: "/app/image/detail-page", icon: "PanelTop" },
    { title: "商品图复刻", titleEn: "Image Clone", href: "/app/image/image-clone", icon: "Copy" },
    { title: "商品多角度", titleEn: "Multi-Angle", href: "/app/image/multi-angle", icon: "Pyramid" },
    { title: "AI 换装", titleEn: "Virtual Try-On", href: "/app/image/virtual-try-on", icon: "Shirt" },
    { title: "图片翻译", titleEn: "Image Translate", href: "/app/image/translate", icon: "Languages" },
    { title: "去除背景", titleEn: "Remove Background", href: "/app/image/remove-bg", icon: "Eraser" },
    { title: "高清放大", titleEn: "Image Upscale", href: "/app/image/upscale", icon: "ZoomIn" },
    { title: "图片分层", titleEn: "Image Layers", href: "/app/image/layers", icon: "Layers" },
    { title: "分镜图", titleEn: "Storyboard", href: "/app/image/storyboard", icon: "Images" },
  ],
  audio: [
    { title: "文字转语音（TTS）", titleEn: "Text to Speech", href: "/app/audio/text-to-speech", icon: "AudioLines" },
    { title: "声音克隆", titleEn: "Voice Clone", href: "/app/audio/voice-clone", icon: "MicVocal" },
  ],
  tools: [
    { title: "TikTok 脚本提取", titleEn: "TikTok Transcript", href: "/app/tiktok-transcript-generator", icon: "ScanText" },
    { title: "TikTok 视频/图文下载器", titleEn: "TikTok Downloader", href: "/app/tiktok-downloader", icon: "Download" },
    { title: "Amazon AI 合规标记", titleEn: "Amazon AI Tagger", href: "/app/synthetic-performer-tagger", icon: "ShieldCheck" },
    { title: "灵感广场", titleEn: "Inspiration Gallery", href: "/app/gallery", icon: "Lightbulb" },
    { title: "带货脚本创意Agent", titleEn: "Prompt Agent", href: "/app/prompt-agent", icon: "Bot" },
    { title: "创意飞轮", titleEn: "Inspiration Hub", href: "/app/inspiration-hub", icon: "LoaderPinwheel" },
  ],
} as const;

export const USER_MENU_LINKS: readonly NavSubItem[] = [
  { title: "账户", titleEn: "Account", href: "/app/user/account", icon: "UserCog" },
  { title: "设置", titleEn: "Settings", href: "/app/workspace/settings", icon: "Settings" },
  { title: "计划和账单", titleEn: "Billing & Plans", href: "/app/workspace/billing", icon: "Receipt" },
  { title: "Skills/CLI", titleEn: "Skills / CLI Keys", href: "/app/workspace/api-keys", icon: "KeyRound" },
  { title: "API", titleEn: "API Platform", href: "/app/api-platform", icon: "CodeXml" },
  { title: "我的收藏", titleEn: "My Favorites", href: "/app/user/favorites", icon: "Heart" },
] as const;

export const WORKSPACE_SETTINGS_NAV: readonly NavSubItem[] = [
  { title: "基础设置", titleEn: "General", href: "/app/workspace/settings", icon: "Settings" },
  { title: "成员管理", titleEn: "Members", href: "/app/workspace/members", icon: "UsersRound" },
  { title: "套餐和账单", titleEn: "Billing & Plans", href: "/app/workspace/billing", icon: "Receipt" },
  { title: "积分明细", titleEn: "Credit Usage", href: "/app/workspace/credits", icon: "Sparkles" },
  { title: "API Keys", titleEn: "API Keys", href: "/app/workspace/api-keys", icon: "KeyRound" },
  { title: "账户", titleEn: "Account", href: "/app/user/account", icon: "UserCog" },
] as const;

export const API_PLATFORM_NAV: readonly NavSubItem[] = [
  { title: "概览", titleEn: "Overview", href: "/app/api-platform/overview", icon: "LayoutGrid" },
  { title: "价格", titleEn: "Pricing", href: "/app/api-platform/pricing", icon: "Tag" },
  { title: "API Keys", titleEn: "API Keys", href: "/app/api-platform/api-keys", icon: "KeyRound" },
  { title: "Playground", titleEn: "Playground", href: "/app/api-platform/playground", icon: "Terminal" },
  { title: "日志", titleEn: "Logs", href: "/app/api-platform/logs", icon: "FileText" },
  { title: "用量", titleEn: "Usage", href: "/app/api-platform/usage", icon: "BarChart3" },
  { title: "账单", titleEn: "Billing", href: "/app/api-platform/billing", icon: "CreditCard" },
] as const;

export const AGENT_SUB_NAV: readonly NavSubItem[] = [
  { title: "新建对话", titleEn: "New Session", href: "/app/agent", icon: "Plus" },
  { title: "技能 & 插件", titleEn: "Skills & Plugins", href: "/app/agent/plugins", icon: "Puzzle" },
  { title: "技能库", titleEn: "Skills Library", href: "/app/agent/skills", icon: "BookOpen" },
  { title: "频道", titleEn: "Channels", href: "/app/agent/channels", icon: "Send" },
] as const;

export const ALL_ROUTE_PATHS: readonly string[] = [
  "/",
  "/zh",
  "/zh/pricing",
  "/zh/cli",
  "/zh/extension",
  "/app/dashboard",
  "/app/agent",
  "/app/agent/plugins",
  "/app/agent/skills",
  "/app/agent/channels",
  "/app/chat",
  "/app/trending",
  "/app/ai-video-generator",
  "/app/viral-video-cloning",
  "/app/link-to-video",
  "/app/video-to-prompt",
  "/app/video-subtitle-remover",
  "/app/video-watermark-remover",
  "/app/video-upscale",
  "/app/video-lip-sync",
  "/app/video-translate",
  "/app/video-character-swap",
  "/app/motion-control",
  "/app/video-depth",
  "/app/image/generator",
  "/app/image/product-listing",
  "/app/image/shoppable-images",
  "/app/image/product-listing-aplus",
  "/app/image/detail-page",
  "/app/image/image-clone",
  "/app/image/multi-angle",
  "/app/image/virtual-try-on",
  "/app/image/translate",
  "/app/image/remove-bg",
  "/app/image/upscale",
  "/app/image/layers",
  "/app/image/storyboard",
  "/app/audio/text-to-speech",
  "/app/audio/voice-clone",
  "/app/flow",
  "/app/flow/socks-ecommerce",
  "/app/tiktok-transcript-generator",
  "/app/tiktok-downloader",
  "/app/synthetic-performer-tagger",
  "/app/gallery",
  "/app/prompt-agent",
  "/app/inspiration-hub",
  "/app/platform/tiktok",
  "/app/assets",
  "/app/collections",
  "/app/user/account",
  "/app/user/favorites",
  "/app/workspace/settings",
  "/app/workspace/members",
  "/app/workspace/billing",
  "/app/workspace/credits",
  "/app/workspace/api-keys",
  "/app/api-platform",
  "/app/api-platform/overview",
  "/app/api-platform/pricing",
  "/app/api-platform/api-keys",
  "/app/api-platform/playground",
  "/app/api-platform/logs",
  "/app/api-platform/usage",
  "/app/api-platform/billing",
] as const;
