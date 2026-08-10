import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { appointments } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/appointments")({
  head: () => ({
    meta: [
      { title: "Appointments — BeautyCon Dashboard" },
      { name: "description", content: "Every booking across chairs, rooms and stylists." },
      { property: "og:title", content: "Appointments — BeautyCon Dashboard" },
      { property: "og:description", content: "Every booking across chairs, rooms and stylists." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageTitle title="Appointments" sub="Every booking across chairs, rooms and stylists." />
      <Panel>
        <div className="space-y-2">
          {appointments.map((row) => (
            <div key={row.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{row.service} · {row.customer}</p>
                <p className="truncate text-xs text-muted-foreground">{row.time} · {row.worker} · {row.status}</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-gold">{row.amount}</span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
