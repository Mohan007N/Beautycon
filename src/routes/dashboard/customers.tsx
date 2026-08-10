import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { customers } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/customers")({
  head: () => ({
    meta: [
      { title: "Customers — BeautyCon Dashboard" },
      { name: "description", content: "Visit history, spend and loyalty tier." },
      { property: "og:title", content: "Customers — BeautyCon Dashboard" },
      { property: "og:description", content: "Visit history, spend and loyalty tier." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageTitle title="Customers" sub="Visit history, spend and loyalty tier." />
      <Panel>
        <div className="space-y-2">
          {customers.map((row) => (
            <div key={row.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{row.name}</p>
                <p className="truncate text-xs text-muted-foreground">{row.visits} visits · {row.tier} · {row.last}</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-gold">{row.spend}</span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
