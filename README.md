# CreatOK Dashboard Clone

`https://www.creatok.ai/app/dashboard` 及其全站 60+ 关联路由的 1:1 可本地运行复刻工程。

## 1. 技术栈与同源组件库对照

本项目基于原站 HTML/CSS 与构建产物逆向取证，1:1 采用同源技术栈与组件原语，不凭截图手写近似替代方案：

- **核心框架**: Next.js 15.5 (App Router) + React 19 + TypeScript (Strict Mode)
- **字体系统**: `Geist`、`Geist Mono`、`Instrument Serif` (`next/font/google`)
- **样式与主题**: Tailwind CSS v3.4 (`tailwindcss-animate`、`@tailwindcss/typography`、`@tailwindcss/container-queries`) + `next-themes` (`:root` 与 `.dark` 全量 HSL 色彩令牌及 `--sidebar-*` 变量)
- **无头组件原语**: `@radix-ui/react-popover`、`dialog`、`dropdown-menu`、`tabs`、`accordion`、`switch`、`slider`、`tooltip`
- **动效与光束**: `framer-motion` + Magic UI (`rainbow` / `shimmer` / `shine` 关键帧) + 原站余弦振荡流光边框组件 `PulseBeam` (`src/components/magicui/pulse-beam.tsx`)
- **富文本与画布图表**: `@tiptap/react` (`ProseMirror` 输入器)、`@xyflow/react` (可视化节点工作流画布)、`recharts` (积分与 API 用量统计图表)、`cmdk`、`sonner`、`lucide-react`
- **测试工具**: Vitest + `@testing-library/react` + `playwright-core`

## 2. 目录结构

```text
src/
├── app/
│   ├── page.tsx                        # 根路径重定向至 /app/dashboard
│   ├── layout.tsx                      # 全局字体、Providers 与 Toaster
│   ├── globals.css                     # 原站提取的 HSL 设计令牌与动画关键帧
│   ├── app/
│   │   ├── (main)/                     # 共享 AppShell (Inset Sidebar + 内嵌状态栏) 的主工作台路由组
│   │   │   ├── dashboard/              # 工作台首页 (轮播、三态联动 Composer、工具条、资源瀑布流)
│   │   │   ├── chat/                   # 视频分析对话台
│   │   │   ├── trending/               # TikTok 爆款趋势雷达 (含图文切换与多维筛选)
│   │   │   ├── flow/                   # 节点画布首页与 [id] React Flow 编辑器
│   │   │   ├── platform/tiktok/        # TikTok 视频/图文发布工作台与排期日历
│   │   │   ├── assets/                 # 资产库 (6 大分类 Tab，联动生成记录)
│   │   │   ├── collections/            # 灵感收藏库
│   │   │   ├── gallery/                # 社区灵感广场
│   │   │   ├── inspiration-hub/        # 创意飞轮与手风琴 FAQ
│   │   │   ├── workspace/              # 团队设置、成员、账单、积分明细、CLI API Keys
│   │   │   ├── user/                   # 个人账户与收藏夹
│   │   │   └── [32 个 Studio 工具路由]  # 视频(12+别名) / 图片(13+索引) / 音频(2) / 运营工具(4)
│   │   ├── agent/                      # 独立侧栏的 AI Agent 创作台、插件、技能库与频道
│   │   └── api-platform/               # 独立侧栏的 API 开放平台 (概览、定价、密钥、调试台、日志、用量、账单)
│   └── zh/                             # 关联公开落地页 (/zh, /zh/pricing, /zh/cli, /zh/extension)
├── components/
│   ├── dashboard/                      # 首页各核心分区组件
│   ├── editor/                         # Tiptap 富文本输入框
│   ├── icons/                          # 动态 Lucide 图标映射器
│   ├── layout/                         # AppShell、AppSidebar、GlobalModals
│   ├── magicui/                        # PulseBeam 余弦流光边框
│   ├── settings/                       # 工作区二级导航壳 SettingsShell
│   └── studio/                         # 通用多模型创作工作台 StudioWorkbenchPage
├── data/                               # 导航树、首页内容与 31 个 Studio 工具配置表
└── store/                              # 纯函数不可变状态机 (workspace-reducer.ts & workspace-context.tsx)
```

## 3. 本地运行与测试验证

推荐使用 `pnpm` 运行：

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 运行单元测试与覆盖率检查 (15 项测试，语句覆盖率 > 99%)
pnpm test:coverage

# 生产编译构建 (预渲染全部 69 个页面路由)
pnpm build

# 启动生产服务器
pnpm start
```

## 4. 本地状态模拟与未还原云端项说明

以下依赖闭源云端集群与第三方平台私有凭证的能力，在前端通过 `WorkspaceProvider` 纯函数不可变状态机实现了完整的本地交互闭环：

1. **云端多模态 GPU 推理算力**: Kling 4.0、Veo 3.1、Gemini Omni 1.2、Nano Banana 2 等真实模型推理需依赖云端算力网关；本地提交生成任务时会执行积分扣减、生成任务实体并同步至历史记录、资产库与积分流水中，预览采用原站公开示例媒体资源。
2. **TikTok / TikTok Shop 官方 OAuth 与推流 API**: 真实挂车直发依赖字节跳动商业开发者密钥与店铺授权令牌；本地已完整实现账号/店铺绑定弹窗与日历排期状态流转。
3. **Google OAuth 会话与 Stripe 收银台 Webhook**: 本地预置脱敏后的已登录工作区状态，支持主题切换、中英文切换、API Key 创建/吊销及套餐交互演示。
4. **TikTok 全网实时爬虫流**: `/app/trending` 与 `/app/tiktok-downloader` 内置采集自原站的高转化电商视频/图文结构化数据集，支持筛选、悬停视频预览与一键复刻跳转。
