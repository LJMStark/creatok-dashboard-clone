export const INDUSTRIES = [
  { id: "beauty", label: "美妆个护", sampleProduct: "微分子早C晚A修护精华液" },
  { id: "apparel", label: "女装穿搭", sampleProduct: "高腰垂感显瘦冰丝阔腿裤" },
  { id: "auto", label: "数码车载", sampleProduct: "铝合金太阳能磁吸车载香薰" },
  { id: "home", label: "家居清洁", sampleProduct: "无线高压蒸汽除螨清洁机" },
  { id: "pet", label: "萌宠好物", sampleProduct: "雷达感应超静音宠物饮水机" },
  { id: "footwear", label: "鞋靴箱包", sampleProduct: "超临界回弹透气通勤跑鞋" },
] as const;

export const HOOK_TYPES = [
  {
    id: "contrarian",
    label: "反常识痛点提问",
    hookTemplate: "千万别再买传统平庸款了！直到我换上这款{product}，才发现之前交了多少智商税。",
  },
  {
    id: "asmr-unbox",
    label: "沉浸式 ASMR 开箱",
    hookTemplate: "把音量调大！带你第一视角拆箱今年复购率飙升的{product}，这细节质感真的绝了。",
  },
  {
    id: "split-compare",
    label: "左右分屏残酷实测",
    hookTemplate: "左边是普通市面款，右边是升级版{product}，连续实测 10 秒差距一目了然！",
  },
  {
    id: "pov-story",
    label: "第一人称社交追问",
    hookTemplate: "每次出门都被朋友追着要链接！今天统一揭秘我包里常备的{product}。",
  },
  {
    id: "cgi-spectacle",
    label: "超现实巨物奇观",
    hookTemplate: "停下划动的手指！当放大十倍的{product}出现在都市街头，核心结构一眼看清。",
  },
] as const;

export const VISUAL_STYLES = [
  {
    id: "bullet-time",
    label: "360度子弹时间环绕",
    promptSuffix:
      "360-degree bullet-time orbital camera around the hero product, suspended micro droplets, crisp studio rim light, 9:16 vertical commercial.",
  },
  {
    id: "ugc-handheld",
    label: "原生手持 UGC 实拍",
    promptSuffix:
      "Authentic handheld iPhone POV shot in sunlit living space, natural skin and material textures, fast-paced TikTok shop cut, 9:16.",
  },
  {
    id: "macro-fluid",
    label: "微距材质光影特写",
    promptSuffix:
      "100mm macro probe lens gliding smoothly across fine surface craftsmanship, warm golden hour refraction, shallow depth of field, 8k.",
  },
  {
    id: "split-screen",
    label: "高对比实验分屏风",
    promptSuffix:
      "Clean high-contrast split-screen demonstration comparing before and after performance, crisp callout lighting, e-commerce conversion style.",
  },
] as const;

export const FAQ_ITEMS = [
  {
    id: "faq-1",
    question: "1. 创意飞轮有多少个创意分类？",
    answer:
      "创意飞轮内置覆盖美妆个护、服饰穿搭、数码车载、家居日用、萌宠用品、鞋靴箱包等 18 个主流跨境电商类目，搭配 30+ 种黄金前 3 秒钩子模型与 20+ 套商业运镜风格，可组合出上万种不重样的带货创意方案。",
  },
  {
    id: "faq-2",
    question: "2. 生成的文案可以直接使用吗？",
    answer:
      "完全可以。生成的方案同时包含地道口播台词、分镜画面说明以及适配 AI 视频模型的结构化提示词。您可以直接复制用于真人实拍提词，也可以一键发送至 CreatOK Agent 直接渲染成片。",
  },
  {
    id: "faq-3",
    question: "3. 如何将创意飞轮生成的提示词变成真实带货视频？",
    answer:
      "点击方案卡片右下角的「发送至 Agent 生成视频」或前往「视频生成」工具，系统会自动填入当前提示词并匹配最佳竖屏画幅（9:16），您只需补充一张自有商品图即可直出带货成片。",
  },
  {
    id: "faq-4",
    question: "4. 使用创意飞轮抽取灵感会消耗工作区积分吗？",
    answer:
      "在创意飞轮页面自由组合、随机碰撞抽取带货文案与提示词完全免费，不消耗积分；仅当您决定将脚本提交至 AI 视频或图片模型进行实际渲染时才会按对应模型计费。",
  },
] as const;
