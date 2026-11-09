"use client";

import React from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import {
  Bot,
  CheckCircle2,
  ImagePlus,
  Layers,
  Loader2,
  Sparkles,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type NodeRunStatus = "idle" | "running" | "done";

export type ProductInputNodeData = {
  readonly label: string;
  readonly productName: string;
  readonly productSpec: string;
  readonly productThumb: string;
  readonly status: NodeRunStatus;
};

export type SellingPointAgentNodeData = {
  readonly label: string;
  readonly model: string;
  readonly points: readonly string[];
  readonly status: NodeRunStatus;
};

export type StoryboardNodeData = {
  readonly label: string;
  readonly steps: readonly string[];
  readonly status: NodeRunStatus;
};

export type KlingVideoNodeData = {
  readonly label: string;
  readonly model: string;
  readonly videoUrl: string;
  readonly posterUrl: string;
  readonly status: NodeRunStatus;
};

function StatusBadge({ status }: { readonly status: NodeRunStatus }) {
  if (status === "running") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
        <Loader2 className="size-3 animate-spin" />
        运行中
      </span>
    );
  }
  if (status === "done") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
        <CheckCircle2 className="size-3" />
        已就绪
      </span>
    );
  }
  return (
    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
      待运行
    </span>
  );
}

export function ProductInputNode({
  data,
}: NodeProps<Node<ProductInputNodeData, "productInput">>) {
  return (
    <div
      className={cn(
        "w-72 rounded-2xl border bg-card p-3.5 text-card-foreground shadow-md transition-all",
        data.status === "running" && "border-amber-500 ring-2 ring-amber-500/25",
        data.status === "done" && "border-emerald-500/60"
      )}
    >
      <div className="flex items-center justify-between border-b pb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-sky-500/15 text-sky-600 dark:text-sky-400">
            <ImagePlus className="size-4" />
          </span>
          <span className="text-xs font-bold">{data.label}</span>
        </div>
        <StatusBadge status={data.status} />
      </div>

      <div className="mt-3 flex items-center gap-3">
        <img
          src={data.productThumb}
          alt={data.productName}
          className="size-16 shrink-0 rounded-xl border object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="line-clamp-2 text-xs font-semibold leading-snug">{data.productName}</div>
          <div className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">
            {data.productSpec}
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!size-3 !border-2 !border-background !bg-sky-500"
      />
    </div>
  );
}

export function SellingPointAgentNode({
  data,
}: NodeProps<Node<SellingPointAgentNodeData, "sellingPointAgent">>) {
  return (
    <div
      className={cn(
        "w-80 rounded-2xl border bg-card p-3.5 text-card-foreground shadow-md transition-all",
        data.status === "running" && "border-amber-500 ring-2 ring-amber-500/25",
        data.status === "done" && "border-violet-500/60"
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!size-3 !border-2 !border-background !bg-violet-500"
      />

      <div className="flex items-center justify-between border-b pb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-violet-500/15 text-violet-600 dark:text-violet-400">
            <Bot className="size-4" />
          </span>
          <div>
            <div className="text-xs font-bold">{data.label}</div>
            <div className="text-[10px] text-muted-foreground">{data.model}</div>
          </div>
        </div>
        <StatusBadge status={data.status} />
      </div>

      <ul className="mt-3 space-y-1.5">
        {data.points.map((pt) => (
          <li
            key={pt}
            className="rounded-lg bg-muted/50 px-2.5 py-1.5 text-[11px] leading-relaxed text-foreground/90"
          >
            {pt}
          </li>
        ))}
      </ul>

      <Handle
        type="source"
        position={Position.Right}
        className="!size-3 !border-2 !border-background !bg-violet-500"
      />
    </div>
  );
}

export function StoryboardNode({
  data,
}: NodeProps<Node<StoryboardNodeData, "storyboardNode">>) {
  return (
    <div
      className={cn(
        "w-80 rounded-2xl border bg-card p-3.5 text-card-foreground shadow-md transition-all",
        data.status === "running" && "border-amber-500 ring-2 ring-amber-500/25",
        data.status === "done" && "border-amber-500/60"
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!size-3 !border-2 !border-background !bg-amber-500"
      />

      <div className="flex items-center justify-between border-b pb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <Layers className="size-4" />
          </span>
          <span className="text-xs font-bold">{data.label}</span>
        </div>
        <StatusBadge status={data.status} />
      </div>

      <ol className="mt-3 space-y-1.5">
        {data.steps.map((step, idx) => (
          <li
            key={step}
            className="flex items-start gap-2 rounded-lg border border-border/60 bg-background px-2.5 py-1.5 text-[11px]"
          >
            <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded bg-muted text-[10px] font-bold">
              {idx + 1}
            </span>
            <span className="leading-snug text-muted-foreground">{step}</span>
          </li>
        ))}
      </ol>

      <Handle
        type="source"
        position={Position.Right}
        className="!size-3 !border-2 !border-background !bg-amber-500"
      />
    </div>
  );
}

export function KlingVideoNode({
  data,
}: NodeProps<Node<KlingVideoNodeData, "klingVideoNode">>) {
  return (
    <div
      className={cn(
        "w-72 rounded-2xl border bg-card p-3.5 text-card-foreground shadow-lg transition-all",
        data.status === "running" && "border-amber-500 ring-2 ring-amber-500/25",
        data.status === "done" && "border-emerald-500 ring-1 ring-emerald-500/25"
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!size-3 !border-2 !border-background !bg-emerald-500"
      />

      <div className="flex items-center justify-between border-b pb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <Video className="size-4" />
          </span>
          <div>
            <div className="text-xs font-bold">{data.label}</div>
            <div className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
              <Sparkles className="size-2.5 text-emerald-500" />
              {data.model} · 9:16
            </div>
          </div>
        </div>
        <StatusBadge status={data.status} />
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border bg-black">
        <video
          src={data.videoUrl}
          poster={data.posterUrl}
          controls
          muted
          loop
          playsInline
          className="aspect-[9/13] w-full object-cover"
        />
      </div>
    </div>
  );
}

export const WORKFLOW_NODE_TYPES = {
  productInput: ProductInputNode,
  sellingPointAgent: SellingPointAgentNode,
  storyboardNode: StoryboardNode,
  klingVideoNode: KlingVideoNode,
} as const;
