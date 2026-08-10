import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { CountUp } from "@/components/kit/motion-primitives";
import { appointments, inr, revenueSeries } from "@/lib/mock-data";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export const Route = createFileRoute("/dashboard/overview")({
  head: () => ({
    meta: [
      { title: "Overview — BeautyCon Dashboard" },
      { name: "description", content: "Daily revenue, appointments and utilization for your salon at a glance." },
      { property: "og:title", content: "Overview — BeautyCon Dashboard" },
      { property: "og:description", content: "Your salon, live." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageTitle title="Good morning, Admin" sub="Here is how Luxe Studio is running today." />
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { k: "Revenue today", v: 48250, prefix: "₹" },
          { k: "Appointments", v: 124, prefix: "" },
          { k: "Utilization", v: 86, prefix: "", suffix: "%" },
        ].map((s) => (
          <Panel key={s.k} title={s.k}>
            <p className="font-display text-4xl tracking-tight">
              <CountUp value={s.v} prefix={s.prefix} suffix={s.suffix ?? ""} />
            </p>
          </Panel>
        ))}
      </div>

      <Panel title="Revenue · last 7 days" className="mt-4">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueSeries}>
              <defs>
                <linearGradient id="dash-rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--gold)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 11, stroke: "var(--muted-foreground)" }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="var(--gold)" strokeWidth={2.5} fill="url(#dash-rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel title="Upcoming appointments" className="mt-4">
        <div className="space-y-2">
          {appointments.map((a) => (
            <div key={a.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{a.service} · {a.customer}</p>
                <p className="text-xs text-muted-foreground">{a.time} · {a.worker} · {a.duration} min</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-gold">{inr(a.amount)}</span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
