"use client";

import React, { useState } from "react";
import { CheckCircle2, KeyRound, Laptop, LogOut, ShieldCheck, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { SettingsShell } from "@/components/settings/settings-shell";
import { useWorkspace } from "@/store/workspace-context";

interface DeviceSession {
  readonly id: string;
  readonly device: string;
  readonly location: string;
  readonly lastActive: string;
  readonly current: boolean;
  readonly type: "desktop" | "mobile";
}

const INITIAL_SESSIONS: readonly DeviceSession[] = [
  {
    id: "sess-mac-current",
    device: "macOS · Chrome 131.0",
    location: "中国 · 广东（当前设备）",
    lastActive: "刚刚在线",
    current: true,
    type: "desktop",
  },
  {
    id: "sess-ios-safari",
    device: "iPhone 16 Pro · Mobile Safari",
    location: "香港特别行政区",
    lastActive: "2 小时前",
    current: false,
    type: "mobile",
  },
  {
    id: "sess-cli-agent",
    device: "CreatOK CLI v1.4.2 (Node.js 22)",
    location: "macOS Terminal",
    lastActive: "昨天 21:18",
    current: false,
    type: "desktop",
  },
];

export default function UserAccountPage() {
  const { state } = useWorkspace();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sessions, setSessions] = useState<readonly DeviceSession[]>(INITIAL_SESSIONS);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast.error("新密码长度至少需要 8 个字符");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("两次输入的密码不一致，请重新核对");
      return;
    }
    setNewPassword("");
    setConfirmPassword("");
    toast.success("账户登录密码已设置成功");
  };

  const handleRevokeSession = (id: string) => {
    setSessions((prev) => prev.filter((item) => item.id !== id));
    toast.info("已远程下线该设备会话");
  };

  return (
    <SettingsShell
      title="账户设置"
      description="管理您的个人登录资料、第三方账号绑定、独立密码与活跃设备安全"
    >
      {/* Profile & Google OAuth Card */}
      <div className="rounded-2xl border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={state.user.avatar}
              alt={state.user.name}
              className="size-14 rounded-2xl border object-cover"
            />
            <div>
              <div className="text-base font-semibold">{state.user.name}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{state.user.email}</div>
              <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-3" /> 已验证主邮箱
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-muted/30 px-4 py-3 text-xs">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="size-4 text-emerald-500" />
              Google 登录绑定状态
            </div>
            <div className="mt-1 text-muted-foreground">
              已绑定 Google 账号：<span className="font-medium text-foreground">{state.user.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Set Password Form */}
      <form onSubmit={handlePasswordSubmit} className="rounded-2xl border bg-card p-5">
        <div className="flex items-center gap-2">
          <KeyRound className="size-4 text-primary" />
          <h2 className="text-sm font-semibold">设置密码</h2>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          您当前通过 Google 快捷登录，设置独立密码后可同时使用「邮箱 + 密码」登录工作台。
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium">新密码</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="至少 8 位字母与数字组合"
              className="mt-1.5 w-full rounded-xl border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-xs font-medium">确认新密码</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="再次输入新密码"
              className="mt-1.5 w-full rounded-xl border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
          >
            更新登录密码
          </button>
        </div>
      </form>

      {/* Active Device Sessions */}
      <div className="rounded-2xl border bg-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">设备管理</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              正在登录此 CreatOK 账户的浏览器与 CLI 终端会话列表
            </p>
          </div>
          {sessions.length > 1 && (
            <button
              type="button"
              onClick={() => {
                setSessions((prev) => prev.filter((s) => s.current));
                toast.success("已退出其他全部非当前设备");
              }}
              className="rounded-xl border px-3 py-1.5 text-xs font-medium hover:bg-accent"
            >
              下线其他全部设备
            </button>
          )}
        </div>

        <div className="mt-4 divide-y rounded-xl border">
          {sessions.map((sess) => (
            <div key={sess.id} className="flex flex-wrap items-center justify-between gap-3 p-3.5">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  {sess.type === "mobile" ? (
                    <Smartphone className="size-4" />
                  ) : (
                    <Laptop className="size-4" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span>{sess.device}</span>
                    {sess.current && (
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-600 dark:text-emerald-400">
                        当前会话
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">
                    {sess.location} · {sess.lastActive}
                  </div>
                </div>
              </div>

              {!sess.current && (
                <button
                  type="button"
                  onClick={() => handleRevokeSession(sess.id)}
                  className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs text-muted-foreground hover:border-destructive/40 hover:text-destructive"
                >
                  <LogOut className="size-3" />
                  退出设备
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </SettingsShell>
  );
}
