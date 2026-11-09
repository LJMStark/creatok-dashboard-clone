"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Mail, ShieldCheck, Sparkles, UserPlus, X } from "lucide-react";
import { toast } from "sonner";
import { SettingsShell } from "@/components/settings/settings-shell";
import { useWorkspace } from "@/store/workspace-context";
import type { WorkspaceMember } from "@/store/workspace-reducer";

function WorkspaceMembersContent() {
  const searchParams = useSearchParams();
  const { state, inviteMember } = useWorkspace();

  const [inviteOpen, setInviteOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<WorkspaceMember["role"]>("编辑者");

  useEffect(() => {
    if (searchParams.get("invite") === "true") {
      setInviteOpen(true);
    }
  }, [searchParams]);

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = email.trim();
    if (!cleaned || !cleaned.includes("@")) {
      toast.error("请输入有效的成员邮箱地址");
      return;
    }
    if (state.members.some((m) => m.email.toLowerCase() === cleaned.toLowerCase())) {
      toast.error("该邮箱已在当前工作区成员列表中");
      return;
    }
    inviteMember(cleaned, role);
    setEmail("");
    setRole("编辑者");
    setInviteOpen(false);
    toast.success(`已向 ${cleaned} 发送协作邀请并加入团队列表`);
  };

  return (
    <SettingsShell
      title="成员管理"
      description="邀请运营、剪辑与投手协同共享资产库、TikTok 店铺排期及工作区积分池"
      headerAction={
        <button
          type="button"
          onClick={() => setInviteOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
        >
          <UserPlus className="size-3.5" />
          邀请成员
        </button>
      }
    >
      {/* Summary Strip */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border bg-card p-4">
          <div className="text-xs text-muted-foreground">当前团队人数</div>
          <div className="mt-1 text-xl font-semibold">{state.members.length} 人</div>
        </div>
        <div className="rounded-2xl border bg-card p-4">
          <div className="text-xs text-muted-foreground">角色权限模型</div>
          <div className="mt-1 flex items-center gap-1.5 text-sm font-medium">
            <ShieldCheck className="size-4 text-emerald-500" />
            RBAC 三级权限控制
          </div>
        </div>
        <div className="rounded-2xl border bg-card p-4">
          <div className="text-xs text-muted-foreground">本月团队累计消耗</div>
          <div className="mt-1 flex items-center gap-1.5 text-xl font-semibold">
            <Sparkles className="size-4 text-amber-500" />
            {state.members.reduce((sum, m) => sum + m.creditsUsed, 0)} 积分
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b bg-muted/30 text-xs text-muted-foreground">
                <th className="px-5 py-3 font-medium">成员</th>
                <th className="px-5 py-3 font-medium">邮箱</th>
                <th className="px-5 py-3 font-medium">权限角色</th>
                <th className="px-5 py-3 text-right font-medium">累计消耗积分</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {state.members.map((member) => (
                <tr key={member.id} className="transition-colors hover:bg-muted/20">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="size-8 rounded-full border object-cover"
                      />
                      <span className="font-medium">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">{member.email}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono text-xs font-medium">
                    {member.creditsUsed}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      <Dialog.Root open={inviteOpen} onOpenChange={setInviteOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-popover p-6 text-popover-foreground shadow-xl focus:outline-none">
            <div className="flex items-center justify-between">
              <Dialog.Title className="flex items-center gap-2 text-base font-semibold">
                <Mail className="size-4 text-primary" />
                邀请新成员加入工作区
              </Dialog.Title>
              <Dialog.Close className="rounded-md p-1 text-muted-foreground hover:bg-accent">
                <X className="size-4" />
              </Dialog.Close>
            </div>
            <Dialog.Description className="mt-1 text-xs text-muted-foreground">
              受邀成员可共同访问「{state.settings.teamName}」中的商品资产与创作工具。
            </Dialog.Description>

            <form onSubmit={handleInviteSubmit} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-medium">成员邮箱地址</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="teammate@company.com"
                  className="mt-1.5 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-xs font-medium">分配角色</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as WorkspaceMember["role"])}
                  className="mt-1.5 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none"
                >
                  <option value="编辑者">编辑者（可创建任务、使用资产库与排期）</option>
                  <option value="管理员">管理员（可管理成员、店铺授权与 API 密钥）</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Dialog.Close asChild>
                  <button type="button" className="rounded-lg border px-3.5 py-1.5 text-xs font-medium">
                    取消
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"
                >
                  发送邀请
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </SettingsShell>
  );
}

export default function WorkspaceMembersPage() {
  return (
    <Suspense fallback={null}>
      <WorkspaceMembersContent />
    </Suspense>
  );
}
