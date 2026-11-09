import { toggleSetItem } from "@/lib/utils";

export type AppLocale = "zh" | "en";

export interface GenerationTask {
  readonly id: string;
  readonly toolPath: string;
  readonly toolTitle: string;
  readonly prompt: string;
  readonly model: string;
  readonly cost: number;
  readonly status: "completed" | "processing";
  readonly createdAt: string;
  readonly previewUrl: string;
  readonly mediaType: "video" | "image" | "audio" | "text";
}

export interface ApiKeyRecord {
  readonly id: string;
  readonly name: string;
  readonly maskedKey: string;
  readonly createdAt: string;
  readonly lastUsedAt: string;
}

export interface WorkspaceMember {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: "所有者" | "管理员" | "编辑者";
  readonly avatar: string;
  readonly creditsUsed: number;
}

export interface WorkspaceSettings {
  readonly teamName: string;
  readonly monthlyCreditLimit: number;
  readonly extraAgentUsage: boolean;
  readonly restrictDeleteCompleted: boolean;
}

export interface WorkspaceState {
  readonly locale: AppLocale;
  readonly credits: number;
  readonly user: {
    readonly name: string;
    readonly email: string;
    readonly workspaceName: string;
    readonly avatar: string;
  };
  readonly settings: WorkspaceSettings;
  readonly tasks: readonly GenerationTask[];
  readonly favoriteIds: readonly string[];
  readonly apiKeys: readonly ApiKeyRecord[];
  readonly members: readonly WorkspaceMember[];
}

export interface SubmitTaskInput {
  readonly toolPath: string;
  readonly toolTitle: string;
  readonly prompt: string;
  readonly model: string;
  readonly cost: number;
  readonly previewUrl: string;
  readonly mediaType: "video" | "image" | "audio" | "text";
}

export function createInitialWorkspaceState(): WorkspaceState {
  return {
    locale: "zh",
    credits: 6,
    user: {
      name: "liang",
      email: "liang@creatok.example",
      workspaceName: "liang's workspace",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocJUgaZDlbIZ9LsJ3jjq8s7z-CS4E7EF_0Wy8WxRvVTnIhbVeig=s96-c",
    },
    settings: {
      teamName: "liang's workspace",
      monthlyCreditLimit: 2000,
      extraAgentUsage: false,
      restrictDeleteCompleted: false,
    },
    tasks: [
      {
        id: "task-seed-1",
        toolPath: "/app/viral-video-cloning",
        toolTitle: "爆款复刻",
        prompt: "复刻车载香薰口播结构，替换为极简金属车载香薰瓶并保留原镜头节奏",
        model: "Kling 4.0 Omni",
        cost: 2,
        status: "completed",
        createdAt: "2026-11-08 09:42",
        previewUrl:
          "https://content.creatok.com/static/dashboard/recreation/car-fragrance/comparison.mp4",
        mediaType: "video",
      },
      {
        id: "task-seed-2",
        toolPath: "/app/image/product-listing",
        toolTitle: "商品套图",
        prompt: "奶油风真皮腋下包全套电商主图与场景细节图，自然晨光",
        model: "Nano Banana 2.1",
        cost: 1,
        status: "completed",
        createdAt: "2026-11-07 21:15",
        previewUrl:
          "https://content.creatok.com/static/dashboard/image-product-listing-example.webp?x-tos-process=image%2Fauto-orient%2C1%2Fresize%2Cw_400%2Fformat%2Cwebp%2Fquality%2Cq_80",
        mediaType: "image",
      },
    ],
    favoriteIds: [
      "cloning-example-car-product-swap-comparison",
      "8mwespY-a2mgC1Vtjmj5P",
    ],
    apiKeys: [
      {
        id: "key-default-1",
        name: "CreatOK CLI Default",
        maskedKey: "ck_live_9f82****************4c1a",
        createdAt: "2026-10-24",
        lastUsedAt: "刚刚",
      },
    ],
    members: [
      {
        id: "member-1",
        name: "liang",
        email: "liang@creatok.example",
        role: "所有者",
        avatar:
          "https://lh3.googleusercontent.com/a/ACg8ocJUgaZDlbIZ9LsJ3jjq8s7z-CS4E7EF_0Wy8WxRvVTnIhbVeig=s96-c",
        creditsUsed: 44,
      },
    ],
  };
}

export function submitTaskImmutable(
  state: WorkspaceState,
  input: SubmitTaskInput
): WorkspaceState {
  const newCredits = Math.max(0, state.credits - input.cost);
  const newTask: GenerationTask = {
    id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    toolPath: input.toolPath,
    toolTitle: input.toolTitle,
    prompt: input.prompt,
    model: input.model,
    cost: input.cost,
    status: "completed",
    createdAt: "刚刚",
    previewUrl: input.previewUrl,
    mediaType: input.mediaType,
  };

  return {
    ...state,
    credits: newCredits,
    tasks: [newTask, ...state.tasks],
  };
}

export function toggleFavoriteImmutable(
  state: WorkspaceState,
  itemId: string
): WorkspaceState {
  return {
    ...state,
    favoriteIds: toggleSetItem(state.favoriteIds, itemId),
  };
}

export function createApiKeyImmutable(
  state: WorkspaceState,
  name: string
): WorkspaceState {
  const cleanName = name.trim() || "Untitled Key";
  const suffix = Math.random().toString(36).slice(2, 6);
  const newKey: ApiKeyRecord = {
    id: `key-${Date.now()}-${suffix}`,
    name: cleanName,
    maskedKey: `ck_live_${suffix}****************9b2e`,
    createdAt: "2026-11-08",
    lastUsedAt: "从未使用",
  };

  return {
    ...state,
    apiKeys: [newKey, ...state.apiKeys],
  };
}

export function revokeApiKeyImmutable(
  state: WorkspaceState,
  id: string
): WorkspaceState {
  return {
    ...state,
    apiKeys: state.apiKeys.filter((item) => item.id !== id),
  };
}

export function updateSettingsImmutable(
  state: WorkspaceState,
  patch: Partial<WorkspaceSettings>
): WorkspaceState {
  const nextSettings: WorkspaceSettings = {
    ...state.settings,
    ...patch,
  };
  return {
    ...state,
    settings: nextSettings,
    user: patch.teamName
      ? { ...state.user, workspaceName: patch.teamName }
      : state.user,
  };
}

export function inviteMemberImmutable(
  state: WorkspaceState,
  email: string,
  role: WorkspaceMember["role"]
): WorkspaceState {
  const cleanEmail = email.trim();
  if (!cleanEmail) return state;
  const newMember: WorkspaceMember = {
    id: `member-${Date.now()}`,
    name: cleanEmail.split("@")[0] || "Member",
    email: cleanEmail,
    role,
    avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(cleanEmail)}`,
    creditsUsed: 0,
  };
  return {
    ...state,
    members: [...state.members, newMember],
  };
}

export function switchLocaleImmutable(
  state: WorkspaceState,
  locale: AppLocale
): WorkspaceState {
  return {
    ...state,
    locale,
  };
}
