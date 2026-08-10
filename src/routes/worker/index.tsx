import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { workerDay } from "@/lib/mock-data";
import { useBeautyConStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/worker/")({
  head: () => ({
    meta: [
      { title: "Today — BeautyCon for Stylists" },
      { name: "description", content: "Your day at a glance: services, clients and breaks." },
      { property: "og:title", content: "Today — BeautyCon for Stylists" },
      { property: "og:description", content: "Less admin. More time for clients." },
    ],
  }),
  component: Page,
});

function Page() {
  const { activeBranch } = useBeautyConStore();

  return (
    <>
      <PageTitle title="Today's Shift" sub={`Stylist schedule for Luxe Studio · ${activeBranch}`} />
      <Panel>
        <div className="space-y-2.5">
          {workerDay.map((s) => (
            <div
              key={s.time}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-card p-3.5 sm:px-4 transition-colors hover:border-gold/30"
            >
              <span className="w-12 shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
                {s.time}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{s.title}</p>
                {s.client && <p className="text-xs text-muted-foreground mt-0.5">Client: {s.client}</p>}
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize border",
                  s.state === "done" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                  s.state === "active" && "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 animate-pulse",
                  s.state === "upcoming" && "border-slate-500/30 bg-slate-500/10 text-slate-600 dark:text-slate-400",
                )}
              >
                {s.state}
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
