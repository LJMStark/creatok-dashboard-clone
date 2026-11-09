export interface TrendingCommerceItem {
  readonly id: string;
  readonly title: string;
  readonly contentType: "video" | "photo";
  readonly region: "US" | "UK" | "SEA";
  readonly regionLabel: string;
  readonly category: "美妆个护" | "女装穿搭" | "数码车载" | "家居日用" | "鞋靴箱包";
  readonly period: "7d" | "30d";
  readonly views: string;
  readonly likeRate: string;
  readonly conversionLift: string;
  readonly estSales: string;
  readonly mediaUrl: string;
  readonly posterUrl: string;
  readonly slideCount?: number;
  readonly hookSummary: string;
}

export const TRENDING_REGIONS = [
  { value: "ALL", label: "全部国家/地区" },
  { value: "US", label: "美国 (US)" },
  { value: "UK", label: "英国 (UK)" },
  { value: "SEA", label: "东南亚 (SEA)" },
] as const;

export const TRENDING_CATEGORIES = [
  "全部类目",
  "女装穿搭",
  "美妆个护",
  "数码车载",
  "家居日用",
  "鞋靴箱包",
] as const;

export const TRENDING_PERIODS = [
  { value: "7d", label: "近 7 天飙升" },
  { value: "30d", label: "近 30 天稳健" },
] as const;

export const TRENDING_ITEMS: readonly TrendingCommerceItem[] = [
  {
    id: "cloning-example-car-fragrance-comparison",
    title: "铝合金磁吸车载香薰 · 阳光折射质感实拍",
    contentType: "video",
    region: "US",
    regionLabel: "美国 US",
    category: "数码车载",
    period: "7d",
    views: "4.8M",
    likeRate: "8.9%",
    conversionLift: "CVR 4.6%",
    estSales: "18.2K 单",
    mediaUrl: "https://content.creatok.com/static/dashboard/recreation/car-fragrance/comparison.mp4",
    posterUrl:
      "https://content.creatok.com/static/dashboard/recreation/car-fragrance/comparison.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    hookSummary: "前 2 秒空调出风口逆光微距切入，强化无遮挡极简金属质感",
  },
  {
    id: "cloning-example-pajama-kick-comparison",
    title: "夏季冰丝垂感家居服套装 · 踢腿卡点换装",
    contentType: "video",
    region: "US",
    regionLabel: "美国 US",
    category: "女装穿搭",
    period: "7d",
    views: "6.2M",
    likeRate: "10.4%",
    conversionLift: "CVR 5.1%",
    estSales: "26.5K 单",
    mediaUrl: "https://content.creatok.com/static/dashboard/recreation/pajama-kick/comparison.mp4",
    posterUrl:
      "https://content.creatok.com/static/dashboard/recreation/pajama-kick/comparison.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    hookSummary: "零废话踢腿动作无缝转场，3 套配色连续上身提升多件连带率",
  },
  {
    id: "replicate-commerce-carousel",
    title: "早C晚A焕亮精华组 · 5页痛点对比种草图文",
    contentType: "photo",
    region: "US",
    regionLabel: "美国 US",
    category: "美妆个护",
    period: "7d",
    views: "3.1M",
    likeRate: "9.7%",
    conversionLift: "CVR 6.2%",
    estSales: "14.9K 单",
    mediaUrl:
      "https://content.creatok.com/static/example/dashboard/skill/replicate-commerce-carousel/replicate-commerce-carousel.mp4",
    posterUrl:
      "https://content.creatok.com/static/example/dashboard/skill/replicate-commerce-carousel/replicate-commerce-carousel-thumbnail.jpg",
    slideCount: 5,
    hookSummary: "Photo Mode 首图直击熬夜暗沉痛点，第 3 页周期实测对比拉升挂车点击",
  },
  {
    id: "cloning-example-brown-wide-leg-pants-comparison",
    title: "高腰垂坠感阔腿西装裤 · 梨形身材显瘦走秀",
    contentType: "video",
    region: "UK",
    regionLabel: "英国 UK",
    category: "女装穿搭",
    period: "30d",
    views: "5.4M",
    likeRate: "7.8%",
    conversionLift: "CVR 4.3%",
    estSales: "21.0K 单",
    mediaUrl: "https://content.creatok.com/static/dashboard/recreation/kick-outfit/comparison-audio.mp4",
    posterUrl:
      "https://content.creatok.com/static/dashboard/recreation/kick-outfit/comparison-audio.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    hookSummary: "全身镜前步伐动态展示面料垂顺度，精准命中通勤穿搭需求",
  },
  {
    id: "shoppable-carousel-from-product-image",
    title: "黑金极简香氛蜡烛礼盒 · 9:16 滑动氛围图集",
    contentType: "photo",
    region: "UK",
    regionLabel: "英国 UK",
    category: "家居日用",
    period: "7d",
    views: "1.9M",
    likeRate: "11.2%",
    conversionLift: "CVR 5.8%",
    estSales: "9.4K 单",
    mediaUrl:
      "https://content.creatok.com/static/example/dashboard/skill/shoppable-carousel-from-product-image/generated-images-2026-09-11-slideshow-9x16-black.mp4",
    posterUrl:
      "https://content.creatok.com/static/example/dashboard/skill/shoppable-carousel-from-product-image/thumbnail-black.jpg",
    slideCount: 6,
    hookSummary: "高对比暗调氛围首图锁住停留，内页拆解前中后调香型降低决策门槛",
  },
  {
    id: "cloning-example-sneaker-unboxing-comparison",
    title: "超轻云感透气通勤跑鞋 · 桌面按压回弹开箱",
    contentType: "video",
    region: "SEA",
    regionLabel: "东南亚 SEA",
    category: "鞋靴箱包",
    period: "7d",
    views: "7.6M",
    likeRate: "8.2%",
    conversionLift: "CVR 4.9%",
    estSales: "33.8K 单",
    mediaUrl: "https://content.creatok.com/static/dashboard/recreation/sneaker-unboxing/comparison-audio.mp4",
    posterUrl:
      "https://content.creatok.com/static/dashboard/recreation/sneaker-unboxing/comparison-audio.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    hookSummary: "俯拍快节奏拆盒 + 拇指按压中底回弹特写，直观传递脚感优势",
  },
  {
    id: "simpsons-tiktok-carousel-rosemary-hair-spray",
    title: "迷迭香丰盈护发喷雾 · 美式漫画痛点轮播图文",
    contentType: "photo",
    region: "US",
    regionLabel: "美国 US",
    category: "美妆个护",
    period: "30d",
    views: "4.2M",
    likeRate: "12.6%",
    conversionLift: "CVR 6.7%",
    estSales: "19.7K 单",
    mediaUrl: "https://content.creatok.com/static/example/dashboard/skill/simpsons-tiktok-carousel/result.mp4",
    posterUrl: "https://content.creatok.com/static/example/dashboard/skill/simpsons-tiktok-carousel/thumbnail.jpg",
    slideCount: 4,
    hookSummary: "趣味故事化分格漫画降低硬广排斥感，尾页无缝衔接真实产品瓶身",
  },
  {
    id: "cloning-example-elements-bag-comparison",
    title: "复古法式腋下小方包 · 街头自然光多角度跟拍",
    contentType: "video",
    region: "SEA",
    regionLabel: "东南亚 SEA",
    category: "鞋靴箱包",
    period: "30d",
    views: "3.9M",
    likeRate: "9.1%",
    conversionLift: "CVR 4.4%",
    estSales: "15.3K 单",
    mediaUrl: "https://content.creatok.com/static/dashboard/recreation/elements-bag/comparison.mp4",
    posterUrl:
      "https://content.creatok.com/static/dashboard/recreation/elements-bag/comparison.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    hookSummary: "街拍步伐律动配合五金扣特写，打造高客单价视觉锚点",
  },
  {
    id: "trending-us-magnetic-tumbler",
    title: "磁吸手机支架保温杯 · 健身房一秒吸附实测",
    contentType: "video",
    region: "US",
    regionLabel: "美国 US",
    category: "家居日用",
    period: "7d",
    views: "3.7M",
    likeRate: "9.4%",
    conversionLift: "CVR 5.3%",
    estSales: "17.7K 单",
    mediaUrl: "https://content.creatok.com/static/dashboard/recreation/car-product-swap/comparison-audio.mp4",
    posterUrl:
      "https://content.creatok.com/static/dashboard/viral-cloning-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    hookSummary: "单手啪嗒磁吸跟拍自拍视角，解决健身房拍摄无支架痛点",
  },
  {
    id: "trending-us-mini-retro-cam",
    title: "复古CCD口袋数码相机 · 闺蜜拆礼物情绪反差",
    contentType: "video",
    region: "US",
    regionLabel: "美国 US",
    category: "数码车载",
    period: "7d",
    views: "3.2M",
    likeRate: "10.8%",
    conversionLift: "CVR 4.9%",
    estSales: "19.1K 单",
    mediaUrl: "https://content.creatok.com/static/dashboard/kling-4-cropped.mp4",
    posterUrl:
      "https://content.creatok.com/static/dashboard/image-product-listing-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    hookSummary: "双人开箱对比直出复古胶片肤色，评论区高频求同款链接",
  },
  {
    id: "trending-us-candy-freeze-dried",
    title: "冻干彩虹脆糖果礼盒 · ASMR 酥脆咀嚼声带货",
    contentType: "video",
    region: "US",
    regionLabel: "美国 US",
    category: "家居日用",
    period: "7d",
    views: "4.2M",
    likeRate: "8.7%",
    conversionLift: "CVR 6.1%",
    estSales: "22.4K 单",
    mediaUrl: "https://content.creatok.com/static/example/dashboard/skill/T-fx4dcaQ7N6u59BEOi-O/result.mp4",
    posterUrl: "https://content.creatok.com/static/example/dashboard/skill/T-fx4dcaQ7N6u59BEOi-O/material-product.png",
    hookSummary: "高饱和色彩铺满镜头配合近距离收音，冲动消费转化极高",
  },
] as const;
