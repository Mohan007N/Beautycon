import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { CountUp } from "@/components/kit/motion-primitives";
import { inr, revenueSeries } from "@/lib/mock-data";
import { useBeautyConStore } from "@/lib/store";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Plus, Radio, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const {
    appointments,
    activeBranch,
    isLiveSimulation,
    toggleLiveSimulation,
    addAppointment,
    updateAppointmentStatus,
  } = useBeautyConStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState("");
  const [newService, setNewService] = useState("Hair Spa");
  const [newWorker, setNewWorker] = useState("Ananya");
  const [newAmount, setNewAmount] = useState(1200);

  const totalRev = appointments.reduce((acc, curr) => acc + curr.amount, 0) + 38000;
  const appCount = appointments.length;
  const activeWorkers = 86;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.trim()) return;
    addAppointment({
      customer: newCustomer,
      service: newService,
      worker: newWorker,
      time: "Just now",
      duration: 60,
      amount: Number(newAmount),
      status: "confirmed",
    });
    setNewCustomer("");
    setIsModalOpen(false);
  };

  return (
    <>
      <PageTitle
        title={`Good morning, Admin`}
        sub={`Here is how Luxe Studio · ${activeBranch} is running today.`}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:scale-[1.02] transition-transform"
          >
            <Plus className="size-4" /> New Booking
          </button>
        </div>
      </PageTitle>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { k: "Revenue Today", v: totalRev, prefix: "₹" },
          { k: "Appointments Today", v: appCount, prefix: "" },
          { k: "Stylist Utilization", v: activeWorkers, prefix: "", suffix: "%" },
        ].map((s) => (
          <Panel key={s.k} title={s.k}>
            <p className="font-display text-3xl sm:text-4xl tracking-tight font-semibold">
              <CountUp value={s.v} prefix={s.prefix} suffix={s.suffix ?? ""} />
            </p>
          </Panel>
        ))}
      </div>

      {/* Revenue Trend Chart */}
      <Panel title="Revenue Trend · Last 7 Days" className="mt-4">
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueSeries}>
              <defs>
                <linearGradient id="dash-rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--gold)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--gold)"
                strokeWidth={2.5}
                fill="url(#dash-rev)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      {/* Live Appointments Feed */}
      <Panel title="Live & Upcoming Appointments" className="mt-4">
        <div className="space-y-2.5">
          {appointments.slice(0, 8).map((a) => (
            <div
              key={a.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-card/60 p-3.5 sm:px-4 transition-colors hover:border-gold/30"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold">{a.service} · {a.customer}</p>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize border",
                      a.status === "confirmed" && "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
                      a.status === "in-progress" && "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 animate-pulse",
                      a.status === "completed" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                      a.status === "cancelled" && "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
                    )}
                  >
                    {a.status}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {a.time} · Stylist: {a.worker} · {a.duration} min
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="shrink-0 text-sm font-semibold text-gold">{inr(a.amount)}</span>
                <select
                  value={a.status}
                  onChange={(e) => updateAppointmentStatus(a.id, e.target.value as any)}
                  className="rounded-lg border border-border bg-background px-2 py-1 text-xs font-medium cursor-pointer"
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="in-progress">In-Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* New Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <h3 className="font-display text-xl font-semibold">New Appointment</h3>
            <p className="mt-1 text-xs text-muted-foreground">Add a walk-in or manual booking.</p>
            <form onSubmit={handleCreate} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sundaram"
                  value={newCustomer}
                  onChange={(e) => setNewCustomer(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Service</label>
                  <select
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="Hair Spa">Hair Spa</option>
                    <option value="Gold Facial">Gold Facial</option>
                    <option value="Balayage">Balayage</option>
                    <option value="Gel Manicure">Gel Manicure</option>
                    <option value="Beard Sculpt">Beard Sculpt</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Stylist</label>
                  <select
                    value={newWorker}
                    onChange={(e) => setNewWorker(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="Ananya">Ananya</option>
                    <option value="Priya">Priya</option>
                    <option value="Arun">Arun</option>
                    <option value="Meera">Meera</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={newAmount}
                  onChange={(e) => setNewAmount(Number(e.target.value))}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-border px-4 py-2 text-xs font-semibold hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
