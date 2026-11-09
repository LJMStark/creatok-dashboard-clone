"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Popover from "@radix-ui/react-popover";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { useTheme } from "next-themes";
import {
  Building2,
  Check,
  ChevronRight,
  ChevronsUpDown,
  Headset,
  Languages,
  LogOut,
  Monitor,
  Moon,
  PanelLeft,
  Sparkle,
  Sun,
  Terminal,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  SIDEBAR_GROUPS,
  SIDEBAR_POPOVER_MENUS,
  USER_MENU_LINKS,
  type PopoverMenuKey,
} from "@/data/navigation";
import { DynamicIcon } from "@/components/icons/dynamic-icon";
import { useWorkspace } from "@/store/workspace-context";
import { cn } from "@/lib/utils";

export interface AppSidebarProps {
  readonly collapsed: boolean;
  readonly onToggleCollapse: () => void;
  readonly mobileOpen: boolean;
  readonly onMobileOpenChange: (open: boolean) => void;
}

function ChromeExtensionIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728Z" />
    </svg>
  );
}

function SidebarInnerContent({
  collapsed,
  onToggleCollapse,
  onNavigate,
}: {
  readonly collapsed: boolean;
  readonly onToggleCollapse: () => void;
  readonly onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { state, switchLocale, setOpenSupportModal } = useWorkspace();
  const [openPopover, setOpenPopover] = useState<PopoverMenuKey | null>(null);
  const isEn = state.locale === "en";

  const isPopoverActive = (key: PopoverMenuKey) =>
    SIDEBAR_POPOVER_MENUS[key].some((sub) => pathname === sub.href);

  return (
    <div data-sidebar="sidebar" className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Header */}
      <div data-sidebar="header" className="flex flex-col gap-2 p-2">
        <div className={cn("flex items-center gap-2 py-2", collapsed && "justify-center")}>
          {!collapsed && (
            <Link href="/zh" onClick={onNavigate} className="flex items-center gap-2 pl-1">
              <img
                src="/logo-light_zh-compact.webp"
                alt="CreatOK"
                width={80}
                height={18}
                className="h-[18px] w-auto dark:hidden"
              />
              <img
                src="/logo-dark_zh-compact.webp"
                alt="CreatOK"
                width={80}
                height={18}
                className="hidden h-[18px] w-auto dark:block"
              />
            </Link>
          )}
          <button
            type="button"
            data-sidebar="trigger"
            aria-label="Toggle Sidebar"
            onClick={onToggleCollapse}
            className={cn(
              "inline-flex h-7 w-7 items-center justify-center rounded-md text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              !collapsed && "ml-auto"
            )}
          >
            <PanelLeft className="size-4" />
            <span className="sr-only">Toggle Sidebar</span>
          </button>
        </div>
      </div>

      {/* Nav Groups */}
      <div
        data-sidebar="content"
        className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden"
      >
        {SIDEBAR_GROUPS.map((group, groupIdx) => (
          <React.Fragment key={group.id}>
            {groupIdx > 0 && (
              <div
                data-sidebar="separator"
                className={cn("mx-4 my-1 h-[1px] shrink-0 bg-sidebar-border", collapsed && "mx-2")}
              />
            )}
            <div data-sidebar="group" className="relative flex w-full min-w-0 flex-col px-2 py-1.5">
              <ul data-sidebar="menu" className="flex w-full min-w-0 flex-col gap-1">
                {group.items.map((item) => {
                  const label = isEn ? item.titleEn : item.title;
                  if (item.popoverKey) {
                    const key = item.popoverKey;
                    const active = isPopoverActive(key);
                    const subItems = SIDEBAR_POPOVER_MENUS[key];
                    return (
                      <li key={item.title} data-sidebar="menu-item" className="group/menu-item relative">
                        <Popover.Root
                          open={openPopover === key}
                          onOpenChange={(open) => setOpenPopover(open ? key : null)}
                        >
                          <Popover.Trigger asChild>
                            <button
                              type="button"
                              data-sidebar="menu-button"
                              data-active={active}
                              className={cn(
                                "flex h-8 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                active && "bg-sidebar-accent font-semibold text-sidebar-accent-foreground",
                                collapsed && "justify-center !p-2"
                              )}
                            >
                              <DynamicIcon name={item.icon} className="size-4 shrink-0" />
                              {!collapsed && (
                                <>
                                  <span className="min-w-0 truncate font-medium">{label}</span>
                                  <ChevronRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                                </>
                              )}
                            </button>
                          </Popover.Trigger>
                          <Popover.Portal>
                            <Popover.Content
                              side="right"
                              align="start"
                              sideOffset={10}
                              className="z-50 w-56 rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95"
                            >
                              <div className="grid gap-0.5">
                                {subItems.map((sub) => {
                                  const subActive = pathname === sub.href;
                                  return (
                                    <Link
                                      key={sub.href}
                                      href={sub.href}
                                      onClick={() => {
                                        setOpenPopover(null);
                                        onNavigate?.();
                                      }}
                                      className={cn(
                                        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                                        subActive && "bg-accent font-medium text-accent-foreground"
                                      )}
                                    >
                                      <DynamicIcon
                                        name={sub.icon}
                                        className="size-4 shrink-0 text-muted-foreground"
                                      />
                                      <span className="truncate">
                                        {isEn ? sub.titleEn : sub.title}
                                      </span>
                                    </Link>
                                  );
                                })}
                              </div>
                            </Popover.Content>
                          </Popover.Portal>
                        </Popover.Root>
                      </li>
                    );
                  }

                  const active = pathname === item.href;
                  return (
                    <li key={item.title} data-sidebar="menu-item" className="group/menu-item relative">
                      <Link
                        href={item.href ?? "/app/dashboard"}
                        onClick={onNavigate}
                        data-sidebar="menu-button"
                        data-active={active}
                        className={cn(
                          "flex h-8 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          active
                            ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                            : "font-medium",
                          collapsed && "justify-center !p-2"
                        )}
                      >
                        <DynamicIcon name={item.icon} className="size-4 shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="min-w-0 truncate">{label}</span>
                            {item.badge && (
                              <span className="ml-1 inline-flex shrink-0 items-center whitespace-nowrap rounded-md bg-secondary px-1.5 py-0 text-[10px] font-semibold text-secondary-foreground">
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Footer */}
      <div data-sidebar="footer" className="flex flex-col gap-1.5 p-2">
        {!collapsed && (
          <div className="flex items-center gap-1">
            <div className="flex shrink-0 items-center">
              <Link
                href="/zh/cli"
                aria-label="Skills/CLI"
                onClick={onNavigate}
                className="flex h-7 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Terminal className="size-4" />
              </Link>
              <Link
                href="/zh/extension"
                aria-label="浏览器扩展"
                onClick={onNavigate}
                className="flex h-7 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <ChromeExtensionIcon />
              </Link>
              <button
                type="button"
                aria-label="客服"
                onClick={() => setOpenSupportModal(true)}
                className="flex h-7 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Headset className="size-4" />
              </button>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex h-7 w-full items-center rounded-lg bg-foreground/[0.06] dark:bg-muted/70">
                <Link
                  href="/app/workspace/credits"
                  aria-label={`剩余 ${state.credits} 积分`}
                  onClick={onNavigate}
                  className="flex h-full min-w-0 flex-1 items-center gap-1 rounded-lg px-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Sparkle className="size-3.5 shrink-0 text-emerald-500" />
                  <span className="font-medium">{state.credits}</span>
                </Link>
                <Link
                  href="/zh/pricing"
                  onClick={onNavigate}
                  className="flex h-full shrink-0 items-center rounded-lg px-2 text-xs font-medium text-amber-500 transition-colors hover:text-amber-600 dark:hover:text-amber-400"
                >
                  {isEn ? "Upgrade" : "升级"}
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* User Workspace Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              data-sidebar="menu-button"
              data-size="lg"
              className={cn(
                "flex h-12 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                collapsed && "justify-center !p-0 !size-9 mx-auto"
              )}
            >
              <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-violet-600 text-white">
                <img
                  src={state.user.avatar}
                  alt="头像"
                  className="aspect-square h-full w-full object-cover"
                />
              </span>
              {!collapsed && (
                <>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{state.user.name}</span>
                    <span className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
                      <Building2 className="size-3 shrink-0" />
                      <span className="truncate">{state.user.workspaceName}</span>
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 shrink-0 text-muted-foreground" />
                </>
              )}
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              side="top"
              align="start"
              sideOffset={8}
              className="z-50 w-60 rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-xl"
            >
              <div className="border-b px-2.5 py-2">
                <div className="text-xs font-semibold">{state.user.name}</div>
                <div className="truncate text-[11px] text-muted-foreground">{state.user.email}</div>
              </div>
              <div className="py-1">
                {USER_MENU_LINKS.map((uLink) => (
                  <DropdownMenu.Item key={uLink.href} asChild>
                    <Link
                      href={uLink.href}
                      onClick={onNavigate}
                      className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                    >
                      <DynamicIcon name={uLink.icon} className="size-4 text-muted-foreground" />
                      <span>{isEn ? uLink.titleEn : uLink.title}</span>
                    </Link>
                  </DropdownMenu.Item>
                ))}
              </div>
              <DropdownMenu.Separator className="my-1 h-px bg-border" />

              {/* Language Submenu */}
              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-sm outline-none hover:bg-accent">
                  <span className="flex items-center gap-2">
                    <Languages className="size-4 text-muted-foreground" />
                    {isEn ? "Language" : "语言"}
                  </span>
                  <ChevronRight className="size-3.5 text-muted-foreground" />
                </DropdownMenu.SubTrigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.SubContent
                    sideOffset={6}
                    className="z-50 w-36 rounded-xl border bg-popover p-1 text-popover-foreground shadow-lg"
                  >
                    <DropdownMenu.Item
                      onClick={() => switchLocale("zh")}
                      className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-sm outline-none hover:bg-accent"
                    >
                      简体中文 {state.locale === "zh" && <Check className="size-3.5" />}
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onClick={() => switchLocale("en")}
                      className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-sm outline-none hover:bg-accent"
                    >
                      English {state.locale === "en" && <Check className="size-3.5" />}
                    </DropdownMenu.Item>
                  </DropdownMenu.SubContent>
                </DropdownMenu.Portal>
              </DropdownMenu.Sub>

              {/* Theme Submenu */}
              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-sm outline-none hover:bg-accent">
                  <span className="flex items-center gap-2">
                    <Sun className="size-4 text-muted-foreground dark:hidden" />
                    <Moon className="hidden size-4 text-muted-foreground dark:block" />
                    {isEn ? "Theme" : "主题"}
                  </span>
                  <ChevronRight className="size-3.5 text-muted-foreground" />
                </DropdownMenu.SubTrigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.SubContent
                    sideOffset={6}
                    className="z-50 w-36 rounded-xl border bg-popover p-1 text-popover-foreground shadow-lg"
                  >
                    <DropdownMenu.Item
                      onClick={() => setTheme("light")}
                      className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-sm outline-none hover:bg-accent"
                    >
                      <span className="flex items-center gap-2">
                        <Sun className="size-3.5" /> 浅色
                      </span>
                      {theme === "light" && <Check className="size-3.5" />}
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onClick={() => setTheme("dark")}
                      className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-sm outline-none hover:bg-accent"
                    >
                      <span className="flex items-center gap-2">
                        <Moon className="size-3.5" /> 深色
                      </span>
                      {theme === "dark" && <Check className="size-3.5" />}
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onClick={() => setTheme("system")}
                      className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-sm outline-none hover:bg-accent"
                    >
                      <span className="flex items-center gap-2">
                        <Monitor className="size-3.5" /> 跟随系统
                      </span>
                      {theme === "system" && <Check className="size-3.5" />}
                    </DropdownMenu.Item>
                  </DropdownMenu.SubContent>
                </DropdownMenu.Portal>
              </DropdownMenu.Sub>

              <DropdownMenu.Item
                onClick={() => setOpenSupportModal(true)}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm outline-none hover:bg-accent"
              >
                <Headset className="size-4 text-muted-foreground" />
                <span>{isEn ? "Contact Us" : "联系我们"}</span>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1 h-px bg-border" />
              <DropdownMenu.Item
                onClick={() => toast.info("本地演示工作区已保持登录态")}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-destructive outline-none hover:bg-accent"
              >
                <LogOut className="size-4" />
                <span>{isEn ? "Sign Out" : "退出"}</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
}

export function AppSidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onMobileOpenChange,
}: AppSidebarProps) {
  const widthClass = collapsed ? "w-[3.75rem]" : "w-[15rem]";

  return (
    <>
      {/* Desktop Inset Sidebar */}
      <div
        data-state={collapsed ? "collapsed" : "expanded"}
        data-variant="inset"
        data-side="left"
        className="group peer hidden text-sidebar-foreground md:block"
      >
        <div className={cn("relative bg-transparent transition-[width] duration-200 ease-linear", widthClass)} />
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-20 hidden h-svh p-2 transition-[width] duration-200 ease-linear md:flex",
            widthClass
          )}
        >
          <SidebarInnerContent collapsed={collapsed} onToggleCollapse={onToggleCollapse} />
          <button
            type="button"
            data-sidebar="rail"
            aria-label="Resize Sidebar"
            onClick={onToggleCollapse}
            className="absolute inset-y-0 -right-2 z-20 hidden w-3 cursor-ew-resize transition-all after:absolute after:inset-y-4 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex"
          />
        </div>
      </div>

      {/* Mobile Drawer Sidebar */}
      <Dialog.Root open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[1px] md:hidden" />
          <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex w-[16.5rem] flex-col border-r bg-sidebar p-2 shadow-2xl focus:outline-none md:hidden">
            <Dialog.Title className="sr-only">CreatOK Navigation</Dialog.Title>
            <div className="absolute right-2 top-3 z-10">
              <Dialog.Close className="rounded-md p-1.5 text-muted-foreground hover:bg-accent">
                <X className="size-4" />
              </Dialog.Close>
            </div>
            <SidebarInnerContent
              collapsed={false}
              onToggleCollapse={() => onMobileOpenChange(false)}
              onNavigate={() => onMobileOpenChange(false)}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
