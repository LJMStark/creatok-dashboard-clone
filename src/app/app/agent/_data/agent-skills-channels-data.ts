export interface OfficialSkillCard {
  readonly id: string;
  readonly title: string;
  readonly category: "analyze" | "video" | "commerce-image";
  readonly badge: string;
  readonly description: string;
  readonly mode: "video" | "image";
  readonly model: string;
  readonly mediaUrl: string;
  readonly posterUrl: string;
  readonly prompt: string;
  readonly runsCount: string;
}

export interface AutomationChannel {
  readonly id: string;
  readonly platform: "TikTok" | "YouTube Shorts" | "Instagram Reels";
  readonly handle: string;
  readonly region: string;
  readonly followers: string;
  readonly weeklyPublished: number;
  readonly avgViews: string;
  readonly scheduleRule: string;
  readonly workflowTitle: string;
  readonly autoPublishEnabled: boolean;
  readonly connected: boolean;
}

export const OFFICIAL_SKILLS_LIBRARY: readonly OfficialSkillCard[] = [
  {
    id: "skill-analyze-video",
    title: "拆解视频",
    category: "analyze",
    badge: "官方必用",
    description: "深度拆解爆款 TikTok 视频的前 3 秒黄金钩子、景别切换节奏与促单话术结构。",
    mode: "video",
    model: "Gemini Omni 1.2 Flash",
    mediaUrl: "https://content.creatok.com/static/dashboard/recreation/car-product-swap/comparison-audio.mp4",
    posterUrl:
      "https://content.creatok.com/static/dashboard/recreation/car-product-swap/comparison-audio.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    prompt: "帮我深度拆解这条 TikTok 带货视频的前 3 秒黄金钩子、分镜时间轴与转化口播结构，并给出复刻建议",
    runsCount: "142k",
  },
  {
    id: "skill-viral-clone",
    title: "爆款复刻",
    category: "analyze",
    badge: "高转化",
    description: "锁定参考爆款的镜头运动与卡点节奏，无缝替换成你的自有品牌商品并直出成片。",
    mode: "video",
    model: "Kling 4.0 Omni",
    mediaUrl: "https://content.creatok.com/static/dashboard/recreation/pajama-kick/comparison.mp4",
    posterUrl:
      "https://content.creatok.com/static/dashboard/recreation/pajama-kick/comparison.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    prompt: "参考爆款换装转场视频结构，保留卡点运镜节奏，将画面商品替换为我的新款夏季家居服套装",
    runsCount: "118k",
  },
  {
    id: "skill-product-set-planner",
    title: "商品套图策划",
    category: "commerce-image",
    badge: "电商热推",
    description: "从单张产品白底图一键规划主图、场景氛围图、尺寸规格图与微距细节套图。",
    mode: "image",
    model: "Nano Banana 2.1",
    mediaUrl: "https://content.creatok.com/static/example/dashboard/skill/product-image-set-planner-9x16/result.mp4",
    posterUrl:
      "https://content.creatok.com/static/example/dashboard/skill/product-image-set-planner-9x16/video-thumbnail.jpg",
    prompt: "为我的新品策划一套 9:16 电商高转化商品套图，包含首图视觉钩子、使用场景图、核心卖点微距特写",
    runsCount: "96k",
  },
  {
    id: "skill-bullet-time-ad",
    title: "子弹时间广告",
    category: "video",
    badge: "视觉大片",
    description: "生成 360 度时空凝固环绕镜头，凸显护肤瓶身、数码潮玩或鞋履悬浮质感。",
    mode: "video",
    model: "Kling 4.0 Omni",
    mediaUrl: "https://content.creatok.com/static/example/dashboard/skill/reference-bullet-time-ad-prompts/result.mp4",
    posterUrl:
      "https://content.creatok.com/static/example/dashboard/skill/reference-bullet-time-ad-prompts/thumbnail.jpg",
    prompt: "使用 360 度环绕凝固子弹时间商业广告运镜，突出我方产品的悬浮水珠与金属玻璃光影质感",
    runsCount: "89k",
  },
  {
    id: "skill-spider-web-hook",
    title: "蛛丝牵引视觉钩子",
    category: "video",
    badge: "强停留",
    description: "超现实蛛丝瞬间将商品拉回镜头中央，极大提升前 3 秒完播停留指标。",
    mode: "video",
    model: "Seedance 2.5",
    mediaUrl: "https://content.creatok.com/static/example/dashboard/skill/spider-web-object-retrieval/video (5).mp4",
    posterUrl:
      "https://content.creatok.com/static/example/dashboard/skill/spider-web-object-retrieval/codex-clipboard-043a7267-8854-4475-a703-f6745d53b851.png",
    prompt: "创作一条超现实蛛丝牵引视觉钩子短视频：前 2 秒蛛丝发射瞬间将我的主打单品拉向镜头特写",
    runsCount: "64k",
  },
  {
    id: "skill-overheight-truck",
    title: "巨物货车街头 CGI",
    category: "video",
    badge: "社媒爆款",
    description: "巨型透明展示货车装载放大十倍的品牌单品驶过繁华都市街头，引爆评论区互动。",
    mode: "video",
    model: "Seedance 2.5",
    mediaUrl: "https://content.creatok.com/static/example/dashboard/skill/overheight-truck-product-ad/video (2).mp4",
    posterUrl:
      "https://content.creatok.com/static/example/dashboard/skill/overheight-truck-product-ad/codex-clipboard-c04fd934-320b-47d3-a50b-15f45322d1c2.png",
    prompt: "生成街头巨物 CGI 视觉奇观视频：一辆透明展示卡车装载巨型放大版品牌单品缓缓驶过晴朗都市街角",
    runsCount: "73k",
  },
  {
    id: "skill-spray-reveal",
    title: "水雾凝结显形广告",
    category: "video",
    badge: "美妆香氛",
    description: "细腻水雾在空气中喷洒瞬间凝结显形出产品瓶身，极具高奢香氛与护肤品冲击力。",
    mode: "video",
    model: "Kling 4.0 Omni",
    mediaUrl: "https://content.creatok.com/static/example/dashboard/skill/spray-reveal-product-video/result.mp4",
    posterUrl: "https://content.creatok.com/static/example/dashboard/skill/spray-reveal-product-video/thumbnail.jpg",
    prompt: "制作细腻水雾喷洒凝结显形产品大片：晶莹雾气在逆光中聚拢化作高清精华瓶身特写",
    runsCount: "58k",
  },
  {
    id: "skill-commerce-carousel-clone",
    title: "带货图文复刻",
    category: "commerce-image",
    badge: "Photo Mode",
    description: "一键复刻爆款 TikTok 图文滑动轮播的分页节奏、对比排版与种草标题钩子。",
    mode: "image",
    model: "GPT Image 2.6",
    mediaUrl:
      "https://content.creatok.com/static/example/dashboard/skill/replicate-commerce-carousel/replicate-commerce-carousel.mp4",
    posterUrl:
      "https://content.creatok.com/static/example/dashboard/skill/replicate-commerce-carousel/replicate-commerce-carousel-thumbnail.jpg",
    prompt: "复刻高互动 TikTok Shoppable 图文轮播排版，为我的护发精油生成 5 张前后对比种草套图与标题",
    runsCount: "81k",
  },
] as const;

export const INITIAL_AUTOMATION_CHANNELS: readonly AutomationChannel[] = [
  {
    id: "ch-tiktok-us",
    platform: "TikTok",
    handle: "@lumina_home_us",
    region: "美国 (US Shop)",
    followers: "48.2K",
    weeklyPublished: 14,
    avgViews: "62.4K",
    scheduleRule: "每日 09:30 / 20:00 (EST)",
    workflowTitle: "监控家居飙升榜 -> 自动复刻分镜 -> 挂车草稿推送",
    autoPublishEnabled: true,
    connected: true,
  },
  {
    id: "ch-youtube-shorts",
    platform: "YouTube Shorts",
    handle: "@LuminaGadgetsOfficial",
    region: "全球英语区",
    followers: "21.9K",
    weeklyPublished: 7,
    avgViews: "34.1K",
    scheduleRule: "每日 18:00 (UTC)",
    workflowTitle: "主站爆款视频自动去水印重混 -> 英文配音 -> 定时发布",
    autoPublishEnabled: true,
    connected: true,
  },
  {
    id: "ch-ig-reels",
    platform: "Instagram Reels",
    handle: "@lumina.aesthetic.studio",
    region: "北美与欧洲",
    followers: "16.5K",
    weeklyPublished: 5,
    avgViews: "19.8K",
    scheduleRule: "每周二、四、六 19:30",
    workflowTitle: "新品白底图 -> 9:16 奶油风套图与 Reels 卡点轮播",
    autoPublishEnabled: false,
    connected: true,
  },
] as const;
