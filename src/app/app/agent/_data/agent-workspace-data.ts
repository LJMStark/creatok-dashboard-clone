export {
  INITIAL_AUTOMATION_CHANNELS,
  OFFICIAL_SKILLS_LIBRARY,
  type AutomationChannel,
  type OfficialSkillCard,
} from "@/app/app/agent/_data/agent-skills-channels-data";

export interface StoryboardShot {
  readonly shotNumber: string;
  readonly duration: string;
  readonly visualPrompt: string;
  readonly voiceover: string;
}

export interface AgentMessage {
  readonly id: string;
  readonly role: "user" | "assistant";
  readonly content: string;
  readonly timestamp: string;
  readonly thinkingSummary?: string;
  readonly shots?: readonly StoryboardShot[];
  readonly mediaPreview?: {
    readonly mediaType: "video" | "image";
    readonly title: string;
    readonly model: string;
    readonly aspectRatio: string;
    readonly videoUrl?: string;
    readonly posterUrl: string;
    readonly cloneHref: string;
  };
}

export interface AgentSession {
  readonly id: string;
  readonly title: string;
  readonly mode: "video" | "image";
  readonly updatedAt: string;
  readonly model: string;
  readonly messages: readonly AgentMessage[];
}

export interface AgentPluginItem {
  readonly id: string;
  readonly name: string;
  readonly kind: "skill" | "plugin";
  readonly author: string;
  readonly version: string;
  readonly icon: string;
  readonly summary: string;
  readonly detailDescription: string;
  readonly capabilities: readonly string[];
  readonly usageCount: string;
  readonly defaultEnabled: boolean;
}

export const INITIAL_AGENT_SESSIONS: readonly AgentSession[] = [
  {
    id: "session-car-fragrance",
    title: "车载香薰前3秒钩子与带货成片",
    mode: "video",
    updatedAt: "12 分钟前",
    model: "Kling 4.0 Omni",
    messages: [
      {
        id: "msg-1",
        role: "user",
        content: "参考爆款带货视频镜头结构，为我的极简金属车载香薰策划 15 秒 TikTok 短视频并生成预览。",
        timestamp: "10:24",
      },
      {
        id: "msg-2",
        role: "assistant",
        content:
          "已完成对北美 TikTok 车载好物 TOP 20 视频的黄金钩子拆解，并为您生成 4 镜高完播脚本与 9:16 商业级成片预览：",
        timestamp: "10:25",
        thinkingSummary: "已调用爆款结构拆解器与 Kling 4.0 运镜规划引擎（耗时 3.4 秒）",
        shots: [
          {
            shotNumber: "镜头 01",
            duration: "00:00 - 00:03",
            visualPrompt: "第一人称拉开车门，阳光穿过挡风玻璃照在中控台金属香薰瓶上，折射细腻光斑",
            voiceover: "每次朋友上我的车，都会追问这股高级木质香是从哪来的。",
          },
          {
            shotNumber: "镜头 02",
            duration: "00:03 - 00:07",
            visualPrompt: "微距推进磁吸旋转开合结构，超清展现铝合金喷砂质感与隐形出风口夹设计",
            voiceover: "不用插电也不挡视线，合金机身在夏天暴晒下依然安全稳定。",
          },
          {
            shotNumber: "镜头 03",
            duration: "00:07 - 00:11",
            visualPrompt: "空调开启瞬间，柔和可见微雾扩香视觉特效环绕车内空间",
            voiceover: "三秒均匀散香，轻松盖住车内异味，留香长达六十天。",
          },
          {
            shotNumber: "镜头 04",
            duration: "00:11 - 00:15",
            visualPrompt: "手持礼盒包装与车内实景同框定格，左下角预留购物车锚点区域",
            voiceover: "点击左下角小黄车，现在入手还送两颗替换香片。",
          },
        ],
        mediaPreview: {
          mediaType: "video",
          title: "极简金属车载香薰 15s 带货成片",
          model: "Kling 4.0 Omni",
          aspectRatio: "9:16",
          videoUrl: "https://content.creatok.com/static/dashboard/recreation/car-fragrance/comparison.mp4",
          posterUrl:
            "https://content.creatok.com/static/dashboard/recreation/car-fragrance/comparison.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
          cloneHref: "/app/viral-video-cloning",
        },
      },
    ],
  },
  {
    id: "session-carousel-bag",
    title: "真皮腋下包 9:16 种草套图策划",
    mode: "image",
    updatedAt: "昨天 21:15",
    model: "Nano Banana 2.1",
    messages: [
      {
        id: "msg-bag-1",
        role: "user",
        content: "基于产品白底图策划一套 9:16 种草带货图文，包含痛点钩子页、对比页与日常通勤场景页。",
        timestamp: "21:14",
      },
      {
        id: "msg-bag-2",
        role: "assistant",
        content: "已为您规划 4 页高点击率 TikTok Shoppable 图文轮播结构，并完成首套奶油晨光风格视觉渲染：",
        timestamp: "21:15",
        thinkingSummary: "已匹配女包类目高转化轮播版式与 Nano Banana 2.1 光影控制参数",
        shots: [
          {
            shotNumber: "第 1 页（封面钩子）",
            duration: "黄金首图",
            visualPrompt: "法式街头晨光咖啡馆桌面特写，奶油白真皮腋下包自然摆放，突出柔润皮质纹理",
            voiceover: "封面标题：不到百元预算，背出千元设计师品牌的松弛感",
          },
          {
            shotNumber: "第 2 页（容量实测）",
            duration: "卖点拆解",
            visualPrompt: "俯拍平铺展示包内可容纳物品：手机、气垫、墨镜、折叠伞与车钥匙整齐排列",
            voiceover: "内页文案：看着小巧显身材，通勤随身小物一包全装下",
          },
        ],
        mediaPreview: {
          mediaType: "image",
          title: "奶油风真皮腋下包 9:16 种草轮播套图",
          model: "Nano Banana 2.1",
          aspectRatio: "9:16",
          posterUrl:
            "https://content.creatok.com/static/dashboard/image-product-listing-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
          cloneHref: "/app/image/shoppable-images",
        },
      },
    ],
  },
] as const;

export const AGENT_PLUGINS_LIST: readonly AgentPluginItem[] = [
  {
    id: "skill-viral-hook-analyzer",
    name: "TikTok 黄金钩子拆解引擎",
    kind: "skill",
    author: "CreatOK Official",
    version: "v2.4.0",
    icon: "TextSearch",
    summary: "自动识别带货短视频前 3 秒视觉反差、口播情绪钩子与镜头切换频率。",
    detailDescription:
      "专为跨境与本土 TikTok 电商团队打造的结构化拆解技能，支持逐帧提取景别、台词节奏、字幕高光词以及商品露出时机。",
    capabilities: ["前 3 秒留存率诊断", "分镜级时间轴切分", "高转化 CTA 话术改写"],
    usageCount: "128.4k 次调用",
    defaultEnabled: true,
  },
  {
    id: "skill-bullet-time-director",
    name: "商业级子弹时间运镜编导",
    kind: "skill",
    author: "CreatOK Studio",
    version: "v1.8.2",
    icon: "Video",
    summary: "一键生成 360 度环绕凝固与高速推拉镜头提示词，强化商品悬浮高级感。",
    detailDescription:
      "内置 24 套经过实测验证的商业广告摄影机轨迹预设，自动适配 Kling 4.0、Seedance 2.5 与 Gemini Omni 模型语法。",
    capabilities: ["360 度环绕轨迹控制", "材质高光物理描述", "多模型提示词自动转译"],
    usageCount: "86.1k 次调用",
    defaultEnabled: true,
  },
  {
    id: "skill-shoppable-carousel",
    name: "9:16 图文轮播种草策划师",
    kind: "skill",
    author: "CreatOK Official",
    version: "v2.1.0",
    icon: "GalleryHorizontalEnd",
    summary: "将单张商品白底图扩展为痛点首图 + 卖点对比 + 场景上身的完整带货图集。",
    detailDescription:
      "结合 TikTok Photo Mode 完播算法特征，自动设计翻页悬念文案与视觉一致性控制参数，显著提升图文挂车点击率。",
    capabilities: ["首图高点击排版规划", "多页色彩光影锁定", "多语种地道卖点文案"],
    usageCount: "94.7k 次调用",
    defaultEnabled: true,
  },
  {
    id: "plugin-tiktok-shop-sync",
    name: "TikTok Shop 商品库连接器",
    kind: "plugin",
    author: "CreatOK Integration",
    version: "v3.0.1",
    icon: "ShoppingBag",
    summary: "实时同步店铺 SKU 标题、主图、评价痛点与库存状态，支持挂车视频直发。",
    detailDescription:
      "通过官方授权安全读取商品详情与买家高频好评词，在 Agent 对话中直接通过 @商品名 引用真实卖点与规格参数。",
    capabilities: ["SKU 卖点自动读取", "买家真实痛点聚类", "草稿箱一键同步挂车"],
    usageCount: "63.9k 次安装",
    defaultEnabled: true,
  },
  {
    id: "plugin-amazon-listing-parser",
    name: "Amazon / Shopify 链接解析插件",
    kind: "plugin",
    author: "CreatOK Integration",
    version: "v2.2.5",
    icon: "Link2",
    summary: "粘贴任意独立站或亚马逊商品链接，秒级提取高清素材、A+ 卖点与竞品差异。",
    detailDescription:
      "无需手动下载整理商品图片与五点描述，插件会自动清洗杂乱背景图并构建结构化商品资产卡供视频生成直接调用。",
    capabilities: ["商品主图无损抓取", "五点描述提炼脚本", "Amazon AI 合规元数据标记"],
    usageCount: "51.2k 次安装",
    defaultEnabled: false,
  },
  {
    id: "plugin-multilingual-voice",
    name: "多语种原生口播与唇形同步",
    kind: "plugin",
    author: "Audio Lab",
    version: "v1.9.4",
    icon: "AudioLines",
    summary: "提供美式英语、英式英语、东南亚多语种真人感带货配音及精准口型对齐。",
    detailDescription:
      "针对带货场景调优语速停顿与重音情绪，支持在 Agent 生成成片后自动合成带情绪起伏的本土达人口播音轨。",
    capabilities: ["28 种跨境语种音色", "带货高转化语速模版", "毫秒级视频唇形驱动"],
    usageCount: "42.8k 次安装",
    defaultEnabled: false,
  },
] as const;
