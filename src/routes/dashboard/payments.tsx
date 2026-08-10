import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { payments } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/payments")({
  head: () => ({
    meta: [
      { title: "Payments — BeautyCon Dashboard" },
      { name: "description", content: "Settlements, methods and pending collections." },
      { property: "og:title", content: "Payments — BeautyCon Dashboard" },
      { property: "og:description", content: "Settlements, methods and pending collections." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageTitle title="Payments" sub="Settlements, methods and pending collections." />
      <Panel>
        <div className="space-y-2">
          {payments.map((row) => (
            <div key={row.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{row.customer} · {row.method}</p>
                <p className="truncate text-xs text-muted-foreground">{row.id} · {row.status} · {row.time}</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-gold">{row.amount}</span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
