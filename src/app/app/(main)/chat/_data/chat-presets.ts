export interface TimelineSegment {
  readonly timeRange: string;
  readonly stage: string;
  readonly cameraNote: string;
  readonly spokenLine: string;
}

export interface VideoAnalysisRecord {
  readonly id: string;
  readonly title: string;
  readonly sourceUrl: string;
  readonly category: string;
  readonly analyzedAt: string;
  readonly videoSrc: string;
  readonly posterSrc: string;
  readonly retentionScore: string;
  readonly visualHook: string;
  readonly audioHook: string;
  readonly fullTranscript: string;
  readonly timeline: readonly TimelineSegment[];
}

export const PRESET_ANALYSES: readonly VideoAnalysisRecord[] = [
  {
    id: "ana-car-snack",
    title: "车内双人对话零食种草爆款",
    sourceUrl: "https://www.tiktok.com/@snackclub_us/video/7428910293841",
    category: "食品饮品 · 北美榜 TOP3",
    analyzedAt: "10 分钟前",
    videoSrc: "https://content.creatok.com/static/dashboard/recreation/car-product-swap/comparison-audio.mp4",
    posterSrc:
      "https://content.creatok.com/static/dashboard/recreation/car-product-swap/comparison-audio.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    retentionScore: "94 / 100（前3秒留存 71%）",
    visualHook: "副驾视角手持撕开包装特写，酥脆掉渣细节配合夸张咀嚼表情制造即时食欲冲击。",
    audioHook: "开篇 ASMR 清脆咬合声先于人声 0.5 秒切入，紧接朋友追问式生活化对话降低广告防备心。",
    fullTranscript:
      "Wait, where did you get these crispy bites? I literally hid the last bag in my glovebox because everyone keeps stealing them. Zero added sugar, super crunchy, tap the orange cart before the 2-pack bundle sells out!",
    timeline: [
      {
        timeRange: "00:00 - 00:03",
        stage: "黄金感官钩子",
        cameraNote: "中近景车内自然光，手持包装袋靠近麦克风撕开",
        spokenLine: "Wait, where did you get these crispy bites?",
      },
      {
        timeRange: "00:03 - 00:08",
        stage: "稀缺性与社交证言",
        cameraNote: "双人互动切特写，展示包装正面核心无糖标识",
        spokenLine: "I literally hid the last bag in my glovebox because everyone keeps stealing them.",
      },
      {
        timeRange: "00:08 - 00:13",
        stage: "核心卖点提炼",
        cameraNote: "微距镜头对准酥脆切面，字幕高亮 Zero Sugar",
        spokenLine: "Zero added sugar, super crunchy and guilt-free.",
      },
      {
        timeRange: "00:13 - 00:16",
        stage: "紧迫感促单 CTA",
        cameraNote: "手指向左下角购物车位置，微笑定格",
        spokenLine: "Tap the orange cart before the 2-pack bundle sells out!",
      },
    ],
  },
  {
    id: "ana-sneaker-unbox",
    title: "桌面俯拍潮鞋沉浸式开箱",
    sourceUrl: "https://www.tiktok.com/@kickslab_daily/video/7429104827162",
    category: "鞋靴箱包 · 飙升榜",
    analyzedAt: "昨天 18:40",
    videoSrc: "https://content.creatok.com/static/dashboard/recreation/sneaker-unboxing/comparison-audio.mp4",
    posterSrc:
      "https://content.creatok.com/static/dashboard/recreation/sneaker-unboxing/comparison-audio.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    retentionScore: "91 / 100（完播率 44%）",
    visualHook: "高帧率俯拍双手快速掀开鞋盒防尘纸，鞋身配色与桌面背景形成强烈撞色。",
    audioHook: "防尘纸沙沙声卡点切换重低音节拍，第一句直击“百元内最舒服通勤跑鞋”性价比锚点。",
    fullTranscript:
      "Stop overpaying for daily runners. Look at the rebound on this cloud foam sole—breathable mesh, true to size, and right now it is 40% off in the TikTok Shop flash sale.",
    timeline: [
      {
        timeRange: "00:00 - 00:03",
        stage: "反常识价格锚点",
        cameraNote: "俯拍快速开盒动作，0.8 倍速呈现鞋侧流线轮廓",
        spokenLine: "Stop overpaying for daily runners.",
      },
      {
        timeRange: "00:03 - 00:09",
        stage: "物理按压实测",
        cameraNote: "拇指用力按压中底缓震层展示高回弹形变",
        spokenLine: "Look at the rebound on this cloud foam sole—breathable mesh and true to size.",
      },
      {
        timeRange: "00:09 - 00:15",
        stage: "限时闪购转化",
        cameraNote: "上脚原地轻跳两下转侧面定格展示鞋型",
        spokenLine: "Right now it is 40% off in the TikTok Shop flash sale.",
      },
    ],
  },
  {
    id: "ana-pajama-kick",
    title: "踢腿卡点换装居家服带货",
    sourceUrl: "https://www.tiktok.com/@cozywear_studio/video/7427651908321",
    category: "女装穿搭 · 高转化模板",
    analyzedAt: "2 天前",
    videoSrc: "https://content.creatok.com/static/dashboard/recreation/pajama-kick/comparison.mp4",
    posterSrc:
      "https://content.creatok.com/static/dashboard/recreation/pajama-kick/comparison.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    retentionScore: "89 / 100（互动率 9.2%）",
    visualHook: "镜头前抬腿轻踢瞬间丝滑无缝切换整套家居服造型，动作干净利落极易引发模仿。",
    audioHook: "利用热门卡点鼓点完成换装转场，省去冗长铺垫直接展示垂坠面料动态。",
    fullTranscript:
      "POV: You finally found loungewear soft enough to sleep in and cute enough for coffee runs. Stretchy waistband, zero pilling after ten washes—grab your color below!",
    timeline: [
      {
        timeRange: "00:00 - 00:02",
        stage: "卡点视觉魔术",
        cameraNote: "全身镜前固定机位，踢腿遮挡帧无缝衔接新穿搭",
        spokenLine: "POV: You finally found loungewear soft enough to sleep in...",
      },
      {
        timeRange: "00:02 - 00:08",
        stage: "面料垂感展示",
        cameraNote: "自然转身与拉扯腰头弹性特写，突出透气亲肤",
        spokenLine: "...and cute enough for coffee runs. Stretchy waistband, zero pilling.",
      },
      {
        timeRange: "00:08 - 00:12",
        stage: "多色选品引导",
        cameraNote: "手持另外两款莫兰迪色系同框展示",
        spokenLine: "Grab your favorite color in the link below!",
      },
    ],
  },
] as const;
