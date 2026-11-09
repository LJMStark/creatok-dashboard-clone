export type FlowCommunityCategory = "全部" | "电商" | "营销" | "创意" | "媒体";

export interface FlowTemplateCard {
  readonly id: string;
  readonly title: string;
  readonly author: string;
  readonly category: Exclude<FlowCommunityCategory, "全部">;
  readonly nodeCount: number;
  readonly forks: string;
  readonly coverImage: string;
  readonly summary: string;
  readonly presetData: {
    readonly productName: string;
    readonly productSpec: string;
    readonly productThumb: string;
    readonly sellingPoints: readonly string[];
    readonly storyboardSteps: readonly string[];
    readonly outputVideoUrl: string;
    readonly outputPosterUrl: string;
  };
}

export const COMMUNITY_FLOW_CATEGORIES: readonly FlowCommunityCategory[] = [
  "全部",
  "电商",
  "营销",
  "创意",
  "媒体",
] as const;

export const FLOW_COMMUNITY_TEMPLATES: readonly FlowTemplateCard[] = [
  {
    id: "socks-ecommerce",
    title: "袜子带货",
    author: "CreatOK 电商实验室",
    category: "电商",
    nodeCount: 4,
    forks: "3.4k",
    coverImage:
      "https://content.creatok.com/static/dashboard/viral-cloning-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    summary: "从纯棉防臭运动袜白底图自动提炼透气吸汗卖点，一键合成上脚拉伸实测与挂车短视频。",
    presetData: {
      productName: "高弹精梳棉防滑运动短袜（5双装）",
      productSpec: "透气网眼 / 足弓加压支撑 / 机洗不起球",
      productThumb:
        "https://content.creatok.com/static/dashboard/image-product-listing-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
      sellingPoints: [
        "痛点钩子：告别运动后闷汗滑跟与反复起球尴尬",
        "核心证明：200针高密编织回弹测试 + 透气孔水雾穿透画面",
        "促单策略：5双莫兰迪组合装单双折算不到2美元",
      ],
      storyboardSteps: [
        "00-03s 双手暴力拉伸袜口微距镜头，松手瞬间恢复平整",
        "03-08s 蒸汽穿透蜂窝网眼实验，直观可视化排汗透气力",
        "08-12s 室内木地板上脚轻跳走动，展示后跟硅胶不掉跟",
        "12-15s 五色礼盒叠放特写，引导点击左下角组合装链接",
      ],
      outputVideoUrl:
        "https://content.creatok.com/static/dashboard/recreation/sneaker-unboxing/comparison-audio.mp4",
      outputPosterUrl:
        "https://content.creatok.com/static/dashboard/recreation/sneaker-unboxing/comparison-audio.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    },
  },
  {
    id: "pet-store",
    title: "宠物店",
    author: "萌宠出海增长组",
    category: "营销",
    nodeCount: 4,
    forks: "2.1k",
    coverImage:
      "https://content.creatok.com/static/dashboard/detail-page-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    summary: "专为宠物用品门店与独立站设计：宠物互动痛点脚本 + 居家实景分镜 + 治愈系成片工作流。",
    presetData: {
      productName: "自动感应静音宠物饮水机 Pro",
      productSpec: "四重活水过滤 / 无线超长续航 / 倾倒断电",
      productThumb:
        "https://content.creatok.com/static/dashboard/detail-page-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
      sellingPoints: [
        "痛点钩子：猫咪不爱喝静止水导致泌尿健康隐患",
        "核心证明：雷达靠近自动涌泉吸引好奇心 + 22分贝睡眠级静音",
        "促单策略：首单附赠 3 个月原装滤芯套装",
      ],
      storyboardSteps: [
        "00-03s 金渐层猫咪好奇凑近镜头，感应水柱轻柔涌出",
        "03-07s 拆解四层滤网结构，动画高亮拦截浮毛杂质过程",
        "07-11s 无线摆放在客厅角落，无电线防啃咬安全演示",
        "11-15s 萌宠畅饮治愈特写 + 限时滤芯买赠引导",
      ],
      outputVideoUrl:
        "https://content.creatok.com/static/dashboard/recreation/ovaltine-fridge/comparison.mp4",
      outputPosterUrl:
        "https://content.creatok.com/static/dashboard/recreation/ovaltine-fridge/comparison.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    },
  },
  {
    id: "flower-xiaoqiang",
    title: "鲜花用户/小强",
    author: "小强视觉工作室",
    category: "创意",
    nodeCount: 4,
    forks: "1.8k",
    coverImage:
      "https://content.creatok.com/static/dashboard/shoppable-photos-card.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    summary: "鲜花同城配送与节日礼盒情感故事流：晨露微距绽放镜头衔接礼盒开箱仪式感。",
    presetData: {
      productName: "厄瓜多尔碎冰蓝玫瑰限定礼盒",
      productSpec: "冷链保鲜直达 / 手写火漆贺卡 / 7天超长花期",
      productThumb:
        "https://content.creatok.com/static/dashboard/shoppable-photos-card.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
      sellingPoints: [
        "情绪钩子：把纪念日仪式感拉满的一束渐变星河玫瑰",
        "核心证明：晨露水珠喷洒微距花瓣质感 + 抽屉式首饰盒双层设计",
        "促单策略：同城定时专人闪送，支持定制专属语音卡片",
      ],
      storyboardSteps: [
        "00-03s 逆光水雾轻洒在渐变蓝白花瓣上，晶莹露珠滑落",
        "03-07s 双手解开丝绒缎带，缓缓打开高定黑金花盒",
        "07-11s 阳光窗台摆放全景，展现饱满花头直径对比",
        "11-15s 火漆印章信封定格，引导提前预订节日档期",
      ],
      outputVideoUrl:
        "https://content.creatok.com/static/example/dashboard/skill/spray-reveal-product-video/result.mp4",
      outputPosterUrl:
        "https://content.creatok.com/static/example/dashboard/skill/spray-reveal-product-video/thumbnail.jpg",
    },
  },
  {
    id: "bullet-time-footwear",
    title: "360度子弹时间球鞋大片",
    author: "Motion CGI Team",
    category: "创意",
    nodeCount: 4,
    forks: "2.9k",
    coverImage:
      "https://content.creatok.com/static/example/dashboard/skill/reference-bullet-time-ad-prompts/thumbnail.jpg",
    summary: "单张侧拍商品图生成商业级时空凝固环绕大片，适配新品首发高溢价TVC投流。",
    presetData: {
      productName: "碳板竞速马拉松跑鞋 V4",
      productSpec: "全掌异构碳板 / 超临界氮气中底 / 168g轻量",
      productThumb:
        "https://content.creatok.com/static/example/dashboard/skill/reference-bullet-time-ad-prompts/thumbnail.jpg",
      sellingPoints: [
        "视觉钩子：空中水花飞溅瞬间凝固的 360 度环绕镜头",
        "核心证明：透视爆炸图展现全掌碳板推进结构",
        "促单策略：首发配色限量编号发售",
      ],
      storyboardSteps: [
        "00-04s 跑鞋腾空踩碎水洼瞬间进入 360 度子弹时间环绕",
        "04-08s 镜头高速贴地跟拍跑者步态推进瞬间",
        "08-12s 暗调影棚聚光灯扫过鞋面反光流线",
        "12-15s 品牌标语与首发入手通道同框收尾",
      ],
      outputVideoUrl:
        "https://content.creatok.com/static/example/dashboard/skill/reference-bullet-time-ad-prompts/result.mp4",
      outputPosterUrl:
        "https://content.creatok.com/static/example/dashboard/skill/reference-bullet-time-ad-prompts/thumbnail.jpg",
    },
  },
  {
    id: "car-scent-matrix",
    title: "车载香薰多语言投流矩阵",
    author: "Global Ads Hub",
    category: "媒体",
    nodeCount: 4,
    forks: "1.5k",
    coverImage:
      "https://content.creatok.com/static/dashboard/a-plus-content-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    summary: "一次编排即可并行生成美区、英区与东南亚多语种口播带货视频流，最大化素材复用率。",
    presetData: {
      productName: "铝合金太阳能旋转车载香薰",
      productSpec: "见光自转散香 / 法国进口植物精油 / 耐高温",
      productThumb:
        "https://content.creatok.com/static/dashboard/a-plus-content-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
      sellingPoints: [
        "视觉钩子：阳光照射仪表台瞬间悬浮环自动加速旋转",
        "核心证明：0电池免充电安全结构 + 孕婴可用植物认证",
        "促单策略：买主机赠三款大师调香补充液",
      ],
      storyboardSteps: [
        "00-03s 驶出隧道阳光洒入车内，香薰环优雅自转特写",
        "03-08s 滴入植物精油微距镜头，金属拉丝纹路清晰可见",
        "08-12s 副驾乘客深呼吸点赞的自然生活化反馈",
        "12-15s 礼盒套装与限时包邮贴纸收尾",
      ],
      outputVideoUrl:
        "https://content.creatok.com/static/dashboard/recreation/car-fragrance/comparison.mp4",
      outputPosterUrl:
        "https://content.creatok.com/static/dashboard/recreation/car-fragrance/comparison.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    },
  },
  {
    id: "apparel-lookbook-flow",
    title: "秋冬女装换人换景批量出片",
    author: " Studio Moda",
    category: "电商",
    nodeCount: 4,
    forks: "2.7k",
    coverImage:
      "https://content.creatok.com/static/dashboard/video-upscale.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    summary: "平铺服装图接入虚拟模特与巴黎街头外景节点，零外拍成本批量产出 9:16 穿搭视频。",
    presetData: {
      productName: "酒红色修身羊绒针织连衣裙",
      productSpec: "亲肤软糯羊毛混纺 / 收腰显瘦剪裁 / 秋冬内搭外穿",
      productThumb:
        "https://content.creatok.com/static/dashboard/video-upscale.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
      sellingPoints: [
        "视觉钩子：暖调午后转身裙摆自然垂坠高光",
        "核心证明：领口与袖口罗纹走线微距不扎皮肤",
        "促单策略：S-XL 全尺码现货速发",
      ],
      storyboardSteps: [
        "00-03s 室内落地窗前暖光转身，展现酒红显白质感",
        "03-08s 手部轻抚针织肌理，展示细腻绒感与高弹力",
        "08-12s 搭配大衣与单穿两种造型分屏对比",
        "12-15s 尺码推荐表与左下角购物车引导",
      ],
      outputVideoUrl:
        "https://content.creatok.com/static/dashboard/recreation/burgundy-outfit/comparison.mp4",
      outputPosterUrl:
        "https://content.creatok.com/static/dashboard/recreation/burgundy-outfit/comparison.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    },
  },
] as const;
