import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { appointments, inr } from "@/lib/mock-data";

export const Route = createFileRoute("/worker/appointments")({
  head: () => ({
    meta: [
      { title: "My appointments — BeautyCon for stylists" },
      { name: "description", content: "Assigned services with client notes and payouts." },
      { property: "og:title", content: "My appointments — BeautyCon" },
      { property: "og:description", content: "Assigned services and payouts." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageTitle title="Appointments" sub="Assigned services and payouts." />
      <Panel>
        <div className="space-y-2">
          {appointments.filter((a) => a.worker === "Ananya" || a.worker === "Priya").map((a) => (
            <div key={a.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{a.service} · {a.customer}</p>
                <p className="text-xs text-muted-foreground">{a.time} · {a.duration} min · {a.status}</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-gold">{inr(a.amount)}</span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
