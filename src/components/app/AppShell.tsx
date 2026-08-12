import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Check, ChevronDown, MapPin, PanelLeft, Radio, Search, Sparkles, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useBeautyConStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { BeautyConLogo } from "@/components/ui/BeautyConLogo";
import { CommandKModal } from "./CommandKModal";

import { useSocketStore } from "@/stores/socket.store";
import { useAuthStore } from "@/stores/auth.store";
import { socketManager } from "@/lib/socket/socket";

export interface NavItem {
  label: string;
  to: string;
  icon?: string;
  group?: string;
}

const branches = [
  "Anna Nagar (Chennai)",
  "T. Nagar (Chennai)",
  "Velachery (Chennai)",
  "Indiranagar (Bangalore)",
  "Koramangala (Bangalore)",
];

/** Shared authenticated shell: collapsible sidebar + topbar + animated outlet. */
export function AppShell({
  items,
  brandNote,
  children,
}: {
  items: NavItem[];
  brandNote: string;
  children?: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const [branchOpen, setBranchOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const socketStatus = useSocketStore((s) => s.status);
  const latencyMs = useSocketStore((s) => s.latencyMs);
  const { user } = useAuthStore();

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "BC";

  const {
    notifications,
    activeBranch,
    setActiveBranch,
    isLiveSimulation,
    toggleLiveSimulation,
    markNotificationsRead,
    clearNotifications,
  } = useBeautyConStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 232 : 76 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 hidden h-screen shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar p-3 text-sidebar-foreground md:flex"
      >
        <Link to="/" className="flex items-center px-1 py-3">
          <BeautyConLogo size="sm" showText={sidebarOpen} textClassName="text-sidebar-foreground" />
        </Link>

        <nav className="mt-4 flex-1 space-y-3 overflow-y-auto custom-scrollbar">
          {items.map((i, idx) => {
            const isActive =
              pathname === i.to ||
              pathname === `${i.to}/` ||
              (i.to !== "/" && pathname.replace(/\/$/, "") === i.to.replace(/\/$/, ""));
            
            const prevItem = items[idx - 1];
            const showGroupHeader = sidebarOpen && i.group && (!prevItem || prevItem.group !== i.group);

            return (
              <div key={i.to}>
                {showGroupHeader && (
                  <p className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/40">
                    {i.group}
                  </p>
                )}
                <Link
                  to={i.to}
                  className={cn(
                    "flex items-center gap-2.5 truncate rounded-xl px-3 py-2 text-xs font-medium transition-all duration-200",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  )}
                >
                  <span className="text-sm shrink-0">{i.icon || "•"}</span>
                  {sidebarOpen && <span className="truncate">{i.label}</span>}
                </Link>
              </div>
            );
          })}
        </nav>

        {sidebarOpen && (
          <div className="mt-auto rounded-2xl border border-sidebar-border/60 bg-sidebar-accent/30 p-3 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-sidebar-foreground/50">Branch</span>
              <span className="font-semibold text-gold">{activeBranch}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-sidebar-foreground/50">Session</span>
              <span className="font-semibold text-sidebar-foreground/90">{user?.name || "Ananya Krish"}</span>
            </div>
          </div>
        )}
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label="Toggle sidebar"
              className="grid size-9 shrink-0 place-items-center rounded-xl border border-border bg-card hover:bg-accent transition-colors"
            >
              <PanelLeft className="size-4" />
            </button>

            {/* Branch Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setBranchOpen((v) => !v)}
                className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold hover:bg-accent transition-colors"
              >
                <MapPin className="size-3.5 text-gold" />
                <span className="truncate max-w-[140px] sm:max-w-[200px]">{activeBranch}</span>
                <ChevronDown className="size-3 text-muted-foreground" />
              </button>

              <AnimatePresence>
                {branchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute left-0 top-11 z-50 w-56 rounded-2xl border border-border bg-card p-1.5 shadow-xl"
                  >
                    <p className="px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                      Select Branch
                    </p>
                    {branches.map((b) => {
                      const branchCode = b.split(" ")[0] || "";
                      return (
                        <button
                          key={b}
                          type="button"
                          onClick={() => {
                            setActiveBranch(branchCode);
                            setBranchOpen(false);
                          }}
                          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs text-left font-medium hover:bg-accent transition-colors"
                        >
                          <span className="truncate">{b}</span>
                          {activeBranch.includes(branchCode) && (
                            <Check className="size-3.5 text-gold" />
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Real-time Socket Connection Status Indicator */}
            <div
              className={cn(
                "hidden sm:flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold border transition-all select-none",
                socketStatus === "CONNECTED" &&
                  "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                socketStatus === "RECONNECTING" &&
                  "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 animate-pulse",
                socketStatus === "DISCONNECTED" &&
                  "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
              )}
            >
              <span
                className={cn(
                  "size-2 rounded-full",
                  socketStatus === "CONNECTED" && "bg-emerald-500 animate-pulse",
                  socketStatus === "RECONNECTING" && "bg-amber-500 animate-spin",
                  socketStatus === "DISCONNECTED" && "bg-rose-500",
                )}
              />
              {socketStatus === "CONNECTED" && "🟢 System Online"}
              {socketStatus === "RECONNECTING" && "🟠 Reconnecting..."}
              {socketStatus === "DISCONNECTED" && "🔴 Offline"}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Cmd+K Search Trigger Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
            >
              <Search className="size-3.5 text-gold" />
              <span className="hidden sm:inline-block font-medium">Search...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                ⌘K
              </kbd>
            </button>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotifOpen((v) => !v);
                  if (!notifOpen && unreadCount > 0) {
                    markNotificationsRead();
                  }
                }}
                aria-label="Notifications"
                className="relative grid size-9 place-items-center rounded-xl border border-border bg-card hover:bg-accent transition-colors"
              >
                <Bell className="size-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 grid size-4.5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 top-11 z-50 w-80 sm:w-96 rounded-2xl border border-border bg-card p-4 shadow-2xl"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold">Notifications</p>
                        {notifications.length > 0 && (
                          <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                            {notifications.length}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {notifications.length > 0 && (
                          <button
                            type="button"
                            onClick={clearNotifications}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                          >
                            Clear all
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setNotifOpen(false)}
                          className="grid size-6 place-items-center rounded-lg hover:bg-accent"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 max-h-80 overflow-y-auto space-y-2 pr-1">
                      {notifications.length === 0 ? (
                        <p className="py-8 text-center text-xs text-muted-foreground">
                          No notifications yet.
                        </p>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            className={cn(
                              "rounded-xl border p-3 text-xs transition-colors",
                              n.read
                                ? "border-border/50 bg-background/50 text-muted-foreground"
                                : "border-gold/30 bg-gold/5 text-foreground font-medium",
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-foreground">{n.title}</span>
                              <span className="text-[10px] text-muted-foreground">{n.time}</span>
                            </div>
                            <p className="mt-1 text-muted-foreground leading-relaxed">
                              {n.description}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <span className="grid size-9 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-sm">
              {userInitials}
            </span>
          </div>
        </header>

        {/* Mobile Horizontal Subnav */}
        <div className="flex gap-1.5 overflow-x-auto border-b border-border px-3 py-2.5 md:hidden bg-card/50">
          {items.map((i) => (
            <Link
              key={i.to}
              to={i.to}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                pathname.replace(/\/$/, "") === i.to.replace(/\/$/, "")
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {i.label}
            </Link>
          ))}
        </div>

        {/* Animated Page Content Outlet */}
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mx-auto w-full max-w-6xl flex-1 p-4 sm:p-6"
        >
          {children ?? <Outlet />}
        </motion.main>
      </div>

      <CommandKModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export function PageTitle({
  title,
  sub,
  children,
}: {
  title: string;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
      <div className="min-w-0">
        <h1 className="truncate font-display text-2xl sm:text-3xl tracking-tight font-semibold">
          {title}
        </h1>
        {sub && <p className="mt-1 truncate text-xs sm:text-sm text-muted-foreground">{sub}</p>}
      </div>
      {children}
    </div>
  );
}

export function Panel({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-[1.25rem] border border-border bg-card p-5 shadow-soft", className)}>
      {title && <p className="eyebrow text-muted-foreground">{title}</p>}
      <div className={title ? "mt-4" : ""}>{children}</div>
    </section>
  );
}
