import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { inr } from "@/lib/mock-data";
import { useBeautyConStore } from "@/lib/store";
import { cn } from "@/lib/utils";

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
  const { appointments } = useBeautyConStore();

  return (
    <>
      <PageTitle title="My Appointments" sub="Upcoming and past salon visits." />
      <Panel>
        <div className="space-y-2.5">
          {appointments.length === 0 ? (
            <p className="py-8 text-center text-xs text-muted-foreground">
              No appointments booked yet.
            </p>
          ) : (
            appointments.map((a) => (
              <div
                key={a.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-card p-3.5 sm:px-4 transition-colors hover:border-gold/30"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold">{a.service}</p>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize border",
                        a.status === "confirmed" &&
                          "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
                        a.status === "in-progress" &&
                          "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 animate-pulse",
                        a.status === "completed" &&
                          "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                        a.status === "cancelled" &&
                          "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
                      )}
                    >
                      {a.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {a.time} · Stylist: {a.worker} · {a.duration} mins
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-gold">{inr(a.amount)}</span>
              </div>
            ))
          )}
        </div>
      </Panel>
    </>
  );
}
