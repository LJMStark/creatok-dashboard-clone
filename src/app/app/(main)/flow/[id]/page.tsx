"use client";

import React, { Suspense, useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  ChevronLeft,
  Loader2,
  Play,
  Plus,
  RotateCcw,
  Sparkles,
  Workflow,
} from "lucide-react";
import { toast } from "sonner";
import {
  FLOW_COMMUNITY_TEMPLATES,
  type FlowTemplateCard,
} from "@/app/app/(main)/flow/_data/flow-templates";
import {
  WORKFLOW_NODE_TYPES,
  type NodeRunStatus,
} from "@/app/app/(main)/flow/_components/workflow-custom-nodes";
import { useWorkspace } from "@/store/workspace-context";

function buildInitialNodes(template: FlowTemplateCard, customIdea: string | null): Node[] {
  const preset = template.presetData;
  return [
    {
      id: "node-1-product",
      type: "productInput",
      position: { x: 40, y: 120 },
      data: {
        label: "商品图输入节点",
        productName: customIdea ? customIdea.slice(0, 26) : preset.productName,
        productSpec: preset.productSpec,
        productThumb: preset.productThumb,
        status: "done" as NodeRunStatus,
      },
    },
    {
      id: "node-2-agent",
      type: "sellingPointAgent",
      position: { x: 390, y: 80 },
      data: {
        label: "卖点拆解 Agent 节点",
        model: "Gemini Omni 1.2 Flash",
        points: preset.sellingPoints,
        status: "done" as NodeRunStatus,
      },
    },
    {
      id: "node-3-storyboard",
      type: "storyboardNode",
      position: { x: 770, y: 70 },
      data: {
        label: "分镜生成节点",
        steps: preset.storyboardSteps,
        status: "done" as NodeRunStatus,
      },
    },
    {
      id: "node-4-kling",
      type: "klingVideoNode",
      position: { x: 1150, y: 55 },
      data: {
        label: "Kling 4.0 视频合成节点",
        model: "Kling 4.0 Omni",
        videoUrl: preset.outputVideoUrl,
        posterUrl: preset.outputPosterUrl,
        status: "done" as NodeRunStatus,
      },
    },
  ];
}

const INITIAL_EDGES: Edge[] = [
  {
    id: "edge-1-2",
    source: "node-1-product",
    target: "node-2-agent",
    animated: true,
    style: { stroke: "#8b5cf6", strokeWidth: 2, strokeDasharray: "6 4" },
  },
  {
    id: "edge-2-3",
    source: "node-2-agent",
    target: "node-3-storyboard",
    animated: true,
    style: { stroke: "#f59e0b", strokeWidth: 2, strokeDasharray: "6 4" },
  },
  {
    id: "edge-3-4",
    source: "node-3-storyboard",
    target: "node-4-kling",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 2, strokeDasharray: "6 4" },
  },
];

function FlowCanvasEditorInner() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const { state, submitTask } = useWorkspace();

  const rawId = typeof params?.id === "string" ? params.id : "socks-ecommerce";
  const customIdea = searchParams.get("idea");

  const activeTemplate = useMemo(
    () =>
      FLOW_COMMUNITY_TEMPLATES.find((tpl) => tpl.id === rawId) ??
      FLOW_COMMUNITY_TEMPLATES[0],
    [rawId]
  );

  const initialNodes = useMemo(
    () => buildInitialNodes(activeTemplate, customIdea),
    [activeTemplate, customIdea]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);
  const [isRunning, setIsRunning] = useState(false);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            animated: true,
            style: { stroke: "#6366f1", strokeWidth: 2, strokeDasharray: "6 4" },
          },
          eds
        )
      );
      toast.success("已建立新的工作流节点连线");
    },
    [setEdges]
  );

  const setNodeStatus = useCallback(
    (targetId: string, nextStatus: NodeRunStatus) => {
      setNodes((prev) =>
        prev.map((node) =>
          node.id === targetId
            ? { ...node, data: { ...node.data, status: nextStatus } }
            : node
        )
      );
    },
    [setNodes]
  );

  const handleRunWorkflow = () => {
    if (isRunning) return;
    setIsRunning(true);

    const orderedIds = [
      "node-1-product",
      "node-2-agent",
      "node-3-storyboard",
      "node-4-kling",
    ];

    setNodes((prev) =>
      prev.map((node) => ({
        ...node,
        data: { ...node.data, status: "idle" as NodeRunStatus },
      }))
    );

    orderedIds.forEach((nodeId, index) => {
      setTimeout(() => {
        setNodeStatus(nodeId, "running");
      }, index * 450);

      setTimeout(() => {
        setNodeStatus(nodeId, "done");
        if (index === orderedIds.length - 1) {
          setIsRunning(false);
          submitTask({
            toolPath: `/app/flow/${activeTemplate.id}`,
            toolTitle: `画布工作流 · ${activeTemplate.title}`,
            prompt: customIdea || activeTemplate.presetData.productName,
            model: "Kling 4.0 Omni",
            cost: 2,
            previewUrl: activeTemplate.presetData.outputVideoUrl,
            mediaType: "video",
          });
          toast.success("全链路节点执行完毕，Kling 4.0 带货成片已更新！");
        }
      }, (index + 1) * 450);
    });
  };

  const handleAddBranchNode = () => {
    const branchId = `node-branch-${Date.now()}`;
    const nextNode: Node = {
      id: branchId,
      type: "storyboardNode",
      position: { x: 770, y: 370 },
      data: {
        label: "A/B 测品备选钩子分镜",
        steps: [
          "00-03s 街头路人盲测盲猜价格开场钩子",
          "03-10s 特写材质微距对比普通竞品细节",
        ],
        status: "idle" as NodeRunStatus,
      },
    };
    const nextEdge: Edge = {
      id: `edge-agent-${branchId}`,
      source: "node-2-agent",
      target: branchId,
      animated: true,
      style: { stroke: "#ec4899", strokeWidth: 2, strokeDasharray: "6 4" },
    };

    setNodes((prev) => [...prev, nextNode]);
    setEdges((prev) => [...prev, nextEdge]);
    toast.success("已在画布中添加 A/B 测品备选分镜分支节点");
  };

  const handleResetLayout = () => {
    setNodes(buildInitialNodes(activeTemplate, customIdea));
    setEdges(INITIAL_EDGES);
    toast.info("已重置画布初始拓扑布局");
  };

  return (
    <div className="flex h-full w-full flex-col">
      {/* Top Floating Canvas Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-card/95 px-4 py-2.5 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link
            href="/app/flow"
            className="inline-flex h-8 items-center gap-1 rounded-lg border bg-background px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ChevronLeft className="size-3.5" />
            返回画布首页
          </Link>

          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Workflow className="size-3.5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold">{activeTemplate.title}</h1>
                <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {nodes.length} 节点 · {edges.length} 连线
                </span>
              </div>
              <p className="hidden text-[11px] text-muted-foreground sm:block">
                支持自由拖拽节点、连接端口与滚轮无极缩放
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleAddBranchNode}
            className="inline-flex h-8 items-center gap-1.5 rounded-xl border bg-background px-3 text-xs font-medium hover:bg-accent"
          >
            <Plus className="size-3.5" />
            添加分支节点
          </button>

          <button
            type="button"
            onClick={handleResetLayout}
            className="inline-flex h-8 items-center gap-1.5 rounded-xl border bg-background px-3 text-xs font-medium hover:bg-accent"
          >
            <RotateCcw className="size-3.5" />
            重置视图
          </button>

          <button
            type="button"
            disabled={isRunning}
            onClick={handleRunWorkflow}
            className="inline-flex h-8 items-center gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {isRunning ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                正在按拓扑运行...
              </>
            ) : (
              <>
                <Play className="size-3.5" />
                一键运行工作流 (2 积分 · 余 {state.credits})
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive XYFlow Infinite Canvas */}
      <div className="relative min-h-[540px] w-full flex-1 bg-muted/20">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={WORKFLOW_NODE_TYPES}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          fitViewOptions={{ padding: 0.18 }}
          minZoom={0.35}
          maxZoom={1.8}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1.2} />
          <Controls position="bottom-left" className="!rounded-xl !border !bg-card !shadow-md" />
          <MiniMap
            position="bottom-right"
            pannable
            zoomable
            className="!rounded-xl !border !bg-card/90 !shadow-md"
          />
        </ReactFlow>

        {/* Bottom Floating Pipeline Legend */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border bg-background/90 px-4 py-1.5 text-[11px] text-muted-foreground shadow-sm backdrop-blur lg:inline-flex">
          <Sparkles className="size-3.5 text-emerald-500" />
          <span>商品图输入节点 → 卖点拆解 Agent 节点 → 分镜生成节点 → Kling 4.0 视频合成节点</span>
        </div>
      </div>
    </div>
  );
}

export default function FlowCanvasEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          正在初始化 AI 无限节点画布...
        </div>
      }
    >
      <FlowCanvasEditorInner />
    </Suspense>
  );
}
