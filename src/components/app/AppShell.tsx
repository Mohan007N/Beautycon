import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bell, PanelLeft } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface NavItem { label: string; to: string }

/** Shared authenticated shell: collapsible sidebar + topbar + animated outlet. */
export function AppShell({ items, brandNote }: { items: NavItem[]; brandNote: string }) {
  const [open, setOpen] = useState(true);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen w-full bg-background">
      <motion.aside
        animate={{ width: open ? 232 : 76 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 hidden h-screen shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar p-3 text-sidebar-foreground md:flex"
      >
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sidebar-primary text-[11px] font-extrabold text-sidebar-primary-foreground">B</span>
          {open && <span className="truncate font-display text-lg tracking-tight">BeautyCon</span>}
        </Link>
        <nav className="mt-4 flex-1 space-y-1">
          {items.map((i) => (
            <Link
              key={i.to}
              to={i.to}
              className={cn(
                "block truncate rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === i.to ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/65 hover:bg-sidebar-accent/60",
              )}
            >
              {open ? i.label : i.label.slice(0, 1)}
            </Link>
          ))}
        </nav>
        {open && <p className="px-3 pb-2 text-xs text-sidebar-foreground/40">{brandNote}</p>}
      </motion.aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur">
          <div className="flex min-w-0 items-center gap-2">
            <button type="button" onClick={() => setOpen((v) => !v)} aria-label="Toggle sidebar" className="grid size-9 shrink-0 place-items-center rounded-xl border border-border">
              <PanelLeft className="size-4" />
            </button>
            <p className="truncate text-sm font-semibold">{brandNote}</p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Notifications" className="grid size-9 place-items-center rounded-xl border border-border">
              <Bell className="size-4" />
            </button>
            <span className="grid size-9 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">AK</span>
          </div>
        </header>

        <div className="flex gap-1 overflow-x-auto border-b border-border px-3 py-2 md:hidden">
          {items.map((i) => (
            <Link key={i.to} to={i.to} className={cn("shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold", pathname === i.to ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>
              {i.label}
            </Link>
          ))}
        </div>

        <motion.main key={pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mx-auto w-full max-w-6xl flex-1 p-4 sm:p-6">
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}

export function PageTitle({ title, sub, children }: { title: string; sub?: string; children?: ReactNode }) {
  return (
    <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
      <div className="min-w-0">
        <h1 className="truncate font-display text-3xl tracking-tight">{title}</h1>
        {sub && <p className="mt-1 truncate text-sm text-muted-foreground">{sub}</p>}
      </div>
      {children}
    </div>
  );
}

export function Panel({ title, children, className }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-[1.25rem] border border-border bg-card p-5 shadow-soft", className)}>
      {title && <p className="eyebrow text-muted-foreground">{title}</p>}
      <div className={title ? "mt-4" : ""}>{children}</div>
    </section>
  );
}
