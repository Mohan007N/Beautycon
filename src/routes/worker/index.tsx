import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { workerDay } from "@/lib/mock-data";

export const Route = createFileRoute("/worker/")({
  head: () => ({
    meta: [
      { title: "Today — BeautyCon for stylists" },
      { name: "description", content: "Your day at a glance: services, clients and breaks." },
      { property: "og:title", content: "Today — BeautyCon for stylists" },
      { property: "og:description", content: "Less admin. More time for clients." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageTitle title="Today" sub="Less admin. More time for clients." />
      <Panel>
        <div className="space-y-2">
          {workerDay.map((s) => (
            <div key={s.time} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border px-4 py-3">
              <span className="w-12 shrink-0 text-xs tabular-nums text-muted-foreground">{s.time}</span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{s.title}</p>
                {s.client && <p className="text-xs text-muted-foreground">{s.client}</p>}
              </div>
              <span className="shrink-0 text-xs font-semibold capitalize text-gold">{s.state}</span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
