import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { appointments, inr } from "@/lib/mock-data";

export const Route = createFileRoute("/customer/appointments")({
  head: () => ({
    meta: [
      { title: "My appointments — BeautyCon" },
      { name: "description", content: "Upcoming and past appointments with your stylists." },
      { property: "og:title", content: "My appointments — BeautyCon" },
      { property: "og:description", content: "Upcoming and past appointments." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageTitle title="My appointments" sub="Upcoming and past visits." />
      <Panel>
        <div className="space-y-2">
          {appointments.slice(0, 4).map((a) => (
            <div key={a.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{a.service}</p>
                <p className="text-xs text-muted-foreground">{a.time} · {a.worker} · {a.status}</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-gold">{inr(a.amount)}</span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
