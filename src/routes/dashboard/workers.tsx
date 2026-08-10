import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { workers } from "@/lib/mock-data";
import { motion } from "framer-motion";

export const Route = createFileRoute("/dashboard/workers")({
  head: () => ({
    meta: [
      { title: "Workers — BeautyCon Dashboard" },
      { name: "description", content: "Team utilization, ratings and shift load." },
      { property: "og:title", content: "Workers — BeautyCon Dashboard" },
      { property: "og:description", content: "Team utilization, ratings and shift load." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageTitle title="Workers" sub="Team utilization, ratings and shift load." />
      <div className="grid gap-4 sm:grid-cols-2">
        {workers.map((w) => (
          <Panel key={w.id}>
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{w.initials}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{w.name}</p>
                <p className="text-xs text-muted-foreground">{w.role} · ★ {w.rating}</p>
              </div>
              <span className="shrink-0 text-sm font-bold tabular-nums">{w.utilization}%</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
              <motion.div initial={{ width: 0 }} animate={{ width: `${w.utilization}%` }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-gold" />
            </div>
          </Panel>
        ))}
      </div>
    </>
  );
}
