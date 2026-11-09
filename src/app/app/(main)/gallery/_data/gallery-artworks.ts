export interface GalleryArtwork {
  readonly id: string;
  readonly title: string;
  readonly mediaType: "video" | "image";
  readonly tag: "商业大片" | "创意CGI" | "穿搭种草" | "电商套图";
  readonly model: string;
  readonly aspectClass: string;
  readonly videoUrl?: string;
  readonly imageUrl: string;
  readonly prompt: string;
  readonly remixHref: string;
  readonly creator: string;
}

export const STYLE_TAGS = ["全部", "商业大片", "创意CGI", "穿搭种草", "电商套图"] as const;

export const GALLERY_ARTWORKS: readonly GalleryArtwork[] = [
  {
    id: "gal-bullet-time",
    title: "360度凝固水珠商业产品大片",
    mediaType: "video",
    tag: "商业大片",
    model: "Kling 4.0 Omni",
    aspectClass: "aspect-[9/14]",
    videoUrl: "https://content.creatok.com/static/example/dashboard/skill/reference-bullet-time-ad-prompts/result.mp4",
    imageUrl:
      "https://content.creatok.com/static/example/dashboard/skill/reference-bullet-time-ad-prompts/thumbnail.jpg",
    prompt:
      "Commercial bullet-time 360-degree orbital camera around a suspended luxury serum bottle, frozen crystal water droplets floating in mid-air, rim studio lighting, 8k photorealistic.",
    remixHref: "/app/ai-video-generator?model=kling-4-omni",
    creator: "@StudioOrbit",
  },
  {
    id: "gal-overheight-truck",
    title: "都市街头巨物透明货车 CGI 奇观",
    mediaType: "video",
    tag: "创意CGI",
    model: "Seedance 2.5",
    aspectClass: "aspect-[4/5]",
    videoUrl: "https://content.creatok.com/static/example/dashboard/skill/overheight-truck-product-ad/video (2).mp4",
    imageUrl:
      "https://content.creatok.com/static/example/dashboard/skill/overheight-truck-product-ad/codex-clipboard-c04fd934-320b-47d3-a50b-15f45322d1c2.png",
    prompt:
      "FOOH street CGI spectacle: a giant transparent display truck carrying an oversized flagship skincare bottle slowly turning at a sunny Manhattan intersection, handheld pedestrian perspective.",
    remixHref: "/app/ai-video-generator?model=doubao-seedance-2.5",
    creator: "@FOOH_Master",
  },
  {
    id: "gal-spray-reveal",
    title: "逆光香氛水雾凝结瓶身显形",
    mediaType: "video",
    tag: "商业大片",
    model: "Gemini Omni 1.2 Flash",
    aspectClass: "aspect-[9/16]",
    videoUrl: "https://content.creatok.com/static/example/dashboard/skill/spray-reveal-product-video/result.mp4",
    imageUrl: "https://content.creatok.com/static/example/dashboard/skill/spray-reveal-product-video/thumbnail.jpg",
    prompt:
      "Ultra-fine perfume mist sprayed into warm golden-hour backlight, micro droplets smoothly coalescing in mid-air to materialize a sleek glass fragrance bottle, macro lens.",
    remixHref: "/app/ai-video-generator?model=gemini-omni-1.2-flash",
    creator: "@AuraVisuals",
  },
  {
    id: "gal-spider-web",
    title: "超现实蛛丝瞬间拉回单品钩子",
    mediaType: "video",
    tag: "创意CGI",
    model: "Kling 4.0 Omni",
    aspectClass: "aspect-[3/4]",
    videoUrl: "https://content.creatok.com/static/example/dashboard/skill/spider-web-object-retrieval/video (5).mp4",
    imageUrl:
      "https://content.creatok.com/static/example/dashboard/skill/spider-web-object-retrieval/codex-clipboard-043a7267-8854-4475-a703-f6745d53b851.png",
    prompt:
      "Dynamic POV action hook: translucent silk web shoots forward onto a distant sneaker and snaps it directly into crisp macro center frame within 1.5 seconds, motion blur.",
    remixHref: "/app/ai-video-generator?model=kling-4-omni",
    creator: "@HookAlchemy",
  },
  {
    id: "gal-burgundy-knit",
    title: "午后暖光酒红针织套装动态走秀",
    mediaType: "video",
    tag: "穿搭种草",
    model: "Wan 3.0",
    aspectClass: "aspect-[9/15]",
    videoUrl: "https://content.creatok.com/static/dashboard/recreation/burgundy-outfit/comparison.mp4",
    imageUrl:
      "https://content.creatok.com/static/dashboard/recreation/burgundy-outfit/comparison.mp4?x-tos-process=video%2Fsnapshot%2Ct_100%2Cf_jpg%2Cw_400%2Cm_fast",
    prompt:
      "Natural indoor sunlight lookbook video, fashion model turning gracefully in a fitted burgundy cashmere knit dress, realistic fabric drape and soft shadow transitions.",
    remixHref: "/app/viral-video-cloning",
    creator: "@ModaAtelier",
  },
  {
    id: "gal-nano-banana-bag",
    title: "奶油晨光真皮腋下包全套电商主图",
    mediaType: "image",
    tag: "电商套图",
    model: "Nano Banana 2.1",
    aspectClass: "aspect-[4/5]",
    imageUrl:
      "https://content.creatok.com/static/dashboard/image-product-listing-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    prompt:
      "Minimalist Parisian cafe marble table morning sunlight, cream pebble-leather shoulder bag placed beside a porcelain espresso cup, crisp stitching texture, editorial e-commerce hero shot.",
    remixHref: "/app/image/generator?model=nano-banana-2.1",
    creator: "@LuxeListing",
  },
  {
    id: "gal-hy-image-editorial",
    title: "高奢极简护肤静物岩石光影大片",
    mediaType: "image",
    tag: "商业大片",
    model: "Hy Image 3.5 Preview",
    aspectClass: "aspect-[3/4]",
    imageUrl:
      "https://content.creatok.com/static/dashboard/hy-image-3-5-preview.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    prompt:
      "Architectural travertine stone pedestal with dappled leaf shadows, frosted amber dropper bottle in soft diffused studio light, high-end cosmetic campaign photography.",
    remixHref: "/app/image/generator?model=hy-image-3.5-preview",
    creator: "@NordicStill",
  },
  {
    id: "gal-aplus-infographic",
    title: "亚马逊 A+ 级功能卖点爆炸分解图",
    mediaType: "image",
    tag: "电商套图",
    model: "GPT Image 2.6",
    aspectClass: "aspect-[1/1]",
    imageUrl:
      "https://content.creatok.com/static/dashboard/a-plus-content-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    prompt:
      "Clean Amazon A+ product feature breakdown composition, floating ergonomic acoustic earbuds with subtle silver callout lines, pure studio gradient backdrop, ultra-sharp detail.",
    remixHref: "/app/image/product-listing-aplus",
    creator: "@SellerCraft",
  },
  {
    id: "gal-shoppable-carousel",
    title: "TikTok 9:16 种草图文轮播视觉组",
    mediaType: "image",
    tag: "穿搭种草",
    model: "Nano Banana 2.1",
    aspectClass: "aspect-[9/14]",
    imageUrl:
      "https://content.creatok.com/static/dashboard/shoppable-photos-card.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
    prompt:
      "9:16 vertical TikTok shoppable photo carousel cover, trendy lifestyle flatlay of summer accessories on linen fabric, clean negative space at top for bold hook typography.",
    remixHref: "/app/image/shoppable-images",
    creator: "@CarouselPro",
  },
] as const;
