import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { services } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/services")({
  head: () => ({
    meta: [
      { title: "Services — BeautyCon Dashboard" },
      { name: "description", content: "Menu, pricing and duration." },
      { property: "og:title", content: "Services — BeautyCon Dashboard" },
      { property: "og:description", content: "Menu, pricing and duration." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageTitle title="Services" sub="Menu, pricing and duration." />
      <Panel>
        <div className="space-y-2">
          {services.map((row) => (
            <div key={row.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{row.name}</p>
                <p className="truncate text-xs text-muted-foreground">{row.category} · {row.duration} min · {row.bookings} bookings</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-gold">{row.price}</span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
