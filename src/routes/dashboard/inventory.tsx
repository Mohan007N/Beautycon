import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { inventory } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory — BeautyCon Dashboard" },
      { name: "description", content: "Stock levels and reorder points." },
      { property: "og:title", content: "Inventory — BeautyCon Dashboard" },
      { property: "og:description", content: "Stock levels and reorder points." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageTitle title="Inventory" sub="Stock levels and reorder points." />
      <Panel>
        <div className="space-y-2">
          {inventory.map((row) => (
            <div key={row.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{row.item}</p>
                <p className="truncate text-xs text-muted-foreground">{row.supplier} · reorder at {row.reorder}</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-gold">{row.stock}</span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
