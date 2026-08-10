import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Boxes,
  CalendarDays,
  Sparkles,
  UsersRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { Reveal, SectionHeading } from "@/components/kit/motion-primitives";
import { appointments, inr, inventory, customers, workers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type TabKey = "Bookings" | "Workforce" | "Customers" | "Inventory" | "Analytics" | "AI";

const tabs: { key: TabKey; icon: LucideIcon }[] = [
  { key: "Bookings", icon: CalendarDays },
  { key: "Workforce", icon: UsersRound },
  { key: "Customers", icon: Wallet },
  { key: "Inventory", icon: Boxes },
  { key: "Analytics", icon: BarChart3 },
  { key: "AI", icon: Sparkles },
];

const bars = [42, 58, 51, 74, 92, 68, 80];

function Panel({ tab }: { tab: TabKey }) {
  if (tab === "Bookings") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {appointments.slice(0, 4).map((a) => (
          <div key={a.id} className="rounded-2xl border border-border bg-background p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate font-semibold">{a.service}</p>
              <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold capitalize">
                {a.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {a.customer} · {a.worker}
            </p>
            <div className="mt-3 flex items-center justify-between text-sm font-semibold">
              <span>{a.time}</span>
              <span className="text-gold">{inr(a.amount)}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (tab === "Workforce") {
    return (
      <div className="space-y-3">
        {workers.map((w) => (
          <div key={w.id} className="rounded-2xl border border-border bg-background p-4">
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {w.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{w.name}</p>
                <p className="text-xs text-muted-foreground">{w.role}</p>
              </div>
              <span className="shrink-0 text-sm font-bold tabular-nums">{w.utilization}%</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${w.utilization}%` }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gold"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (tab === "Customers") {
    return (
      <div className="overflow-hidden rounded-2xl border border-border">
        {customers.map((c) => (
          <div key={c.id} className="flex items-center gap-3 border-b border-border bg-background px-4 py-3 last:border-0">
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{c.name}</p>
              <p className="text-xs text-muted-foreground">
                {c.visits} visits · {c.last}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold">{c.tier}</span>
            <span className="shrink-0 text-sm font-semibold tabular-nums">{inr(c.spend)}</span>
          </div>
        ))}
      </div>
    );
  }
  if (tab === "Inventory") {
    return (
      <div className="space-y-2.5">
        {inventory.map((i) => {
          const low = i.stock < i.reorder;
          return (
            <div key={i.id} className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{i.item}</p>
                <p className="text-xs text-muted-foreground">{i.supplier}</p>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold",
                  low ? "bg-rose/15 text-rose" : "bg-secondary",
                )}
              >
                {low ? "Reorder" : "In stock"} · {i.stock}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  if (tab === "Analytics") {
    return (
      <div className="rounded-2xl border border-border bg-background p-5">
        <p className="eyebrow text-muted-foreground">Revenue · last 7 days</p>
        <div className="mt-6 flex h-44 items-end gap-3">
          {bars.map((b, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${b}%` }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 rounded-t-lg"
              style={{ background: "var(--gradient-gold)" }}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-between text-xs text-muted-foreground">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-gold" />
        <p className="eyebrow text-muted-foreground">BeautyCon Intelligence</p>
      </div>
      <p className="mt-4 font-display text-2xl leading-snug">
        “Saturday evenings are 96% booked. Open two express slots at 8 PM to capture ₹14,400 more.”
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {["Open slots", "Notify waitlist", "Simulate impact"].map((a) => (
          <button
            key={a}
            type="button"
            className="rounded-full border border-border px-3.5 py-2 text-xs font-semibold transition-colors hover:bg-secondary"
          >
            {a}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProductShowcase() {
  const [tab, setTab] = useState<TabKey>("Bookings");

  return (
    <section className="relative border-y border-border bg-champagne/40 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading
          eyebrow="One platform"
          lines={["Everything your beauty", "business needs."]}
          copy="Six systems that usually live in six different tools — running as one, in real time."
        />

        <Reveal delay={0.1} className="mt-12">
          <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Product modules">
            {tabs.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "relative inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors",
                  tab === t.key ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab === t.key && (
                  <motion.span layoutId="showcase-pill" className="absolute inset-0 -z-10 rounded-full bg-primary" />
                )}
                <t.icon className="size-4" />
                {t.key}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-[1.75rem] border border-border bg-card p-4 shadow-lift sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <Panel tab={tab} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
