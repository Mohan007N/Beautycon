import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { CountUp } from "@/components/kit/motion-primitives";
import { inr, revenueSeries } from "@/lib/mock-data";
import { useBeautyConStore } from "@/lib/store";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import {
  Plus,
  Radio,
  Zap,
  Clock,
  UserCheck,
  AlertTriangle,
  PackageCheck,
  CreditCard,
  UserPlus,
  Scissors,
  Layers,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/overview")({
  head: () => ({
    meta: [
      { title: "Command Center — BeautyCon OS" },
      { name: "description", content: "Today's live operations, appointments, staff utilization, attention alerts, and business growth." },
      { property: "og:title", content: "Command Center — BeautyCon OS" },
      { property: "og:description", content: "Your salon operations, live." },
    ],
  }),
  component: Page,
});

export function Page() {
  const {
    appointments,
    activeBranch,
    addAppointment,
    updateAppointmentStatus,
  } = useBeautyConStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"appointment" | "customer" | "worker" | "service" | "payment" | "inventory">("appointment");
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  // Form State
  const [newCustomer, setNewCustomer] = useState("");
  const [newService, setNewService] = useState("Hair Spa");
  const [newWorker, setNewWorker] = useState("Ananya");
  const [newAmount, setNewAmount] = useState(1200);

  const totalRev = appointments.reduce((acc, curr) => acc + curr.amount, 0) + 38420;
  const appCount = appointments.length + 35;
  const activeWorkersCount = 12;
  const utilization = 82;

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

  const staffFloor = [
    { name: "Ananya", role: "Senior Stylist", status: "WITH_CUSTOMER", service: "Hair Spa", timeRemaining: 14, client: "Maya Krish" },
    { name: "Priya", role: "Skin Therapist", status: "WITH_CUSTOMER", service: "Gold Facial", timeRemaining: 27, client: "Riya Sharma" },
    { name: "Arun", role: "Barber", status: "AVAILABLE", service: "Free for Walk-in", timeRemaining: 0, client: null },
    { name: "Meera", role: "Colour Specialist", status: "BREAK", service: "Tea Break", timeRemaining: 10, client: null },
    { name: "Kavita", role: "Nail Artist", status: "WITH_CUSTOMER", service: "Gel Manicure", timeRemaining: 18, client: "Deepika R" },
    { name: "Rajesh", role: "Hair Stylist", status: "AVAILABLE", service: "Ready", timeRemaining: 0, client: null },
  ];

  const attentionAlerts = [
    { id: "a1", type: "red", title: "Appointment delayed", sub: "Maya · Hair Spa (12 minutes late)", action: "Notify Customer" },
    { id: "a2", type: "orange", title: "Worker status", sub: "Priya reported sick today · Coverage required", action: "Reassign Shifts" },
    { id: "a3", type: "yellow", title: "Low inventory alert", sub: "Keratin Smooth Serum · 4 units remaining", action: "Reorder Now" },
    { id: "a4", type: "blue", title: "Payment settlement", sub: "3 transaction settlements pending verification", action: "Verify Payments" },
  ];

  return (
    <>
      {/* Command Center Header */}
      <PageTitle
        title="Good morning, Ananya"
        sub={`Tuesday, August 12 · ${activeBranch} Branch Command Center`}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setModalType("appointment"); setIsModalOpen(true); }}
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-md hover:scale-[1.02] transition-transform"
          >
            <Plus className="size-4" /> New Appointment
          </button>
        </div>
      </PageTitle>

      {/* SECTION 1: BUSINESS SNAPSHOT */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { k: "Revenue Today", icon: "💰", v: totalRev, prefix: "₹", delta: "+14.8% ↑" },
          { k: "Bookings Today", icon: "📅", v: appCount, prefix: "", delta: "+8 today" },
          { k: "Active Clients", icon: "👥", v: 38, prefix: "", delta: "+5 new" },
          { k: "Staff Busy", icon: "⚡", v: utilization, prefix: "", suffix: "%", delta: "Optimal" },
        ].map((s) => (
          <Panel key={s.k} className="p-4 border-border/80 bg-card hover:border-gold/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
                <span className="text-base">{s.icon}</span> {s.k}
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {s.delta}
              </span>
            </div>
            <p className="font-display text-2xl sm:text-3xl tracking-tight font-extrabold mt-2 text-foreground">
              <CountUp value={s.v} prefix={s.prefix} suffix={s.suffix ?? ""} />
            </p>
          </Panel>
        ))}
      </div>

      {/* SECTION 2: TODAY'S OPERATIONS & TIMELINE */}
      <Panel title="Today's Operations · Timeline View" className="mt-4">
        <div className="flex items-center justify-between pb-3 border-b border-border text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">47 total appointments · 12 workers · 3 waiting · 2 delayed</span>
          <span className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" /> Live Timeline
          </span>
        </div>

        <div className="mt-4 space-y-3 overflow-x-auto custom-scrollbar">
          {[
            { worker: "Ananya", slot: "09:30 - 10:30", service: "Hair Spa", client: "Maya Krish", amount: 1200, status: "in-progress" },
            { worker: "Priya", slot: "10:00 - 11:00", service: "Gold Facial", client: "Riya Sharma", amount: 2400, status: "in-progress" },
            { worker: "Arun", slot: "10:30 - 11:00", service: "Beard Sculpt", client: "Rahul Menon", amount: 650, status: "confirmed" },
            { worker: "Meera", slot: "11:00 - 13:00", service: "Balayage Hair Colour", client: "Ishita Bose", amount: 5600, status: "confirmed" },
          ].map((op) => (
            <div
              key={op.client}
              onClick={() => setSelectedAppointment(op)}
              className="grid grid-cols-[100px_minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-border bg-card/60 p-3 hover:border-gold/40 cursor-pointer transition-all"
            >
              <div className="text-xs font-semibold text-muted-foreground">{op.slot}</div>
              <div className="flex items-center gap-3">
                <div className="grid size-8 place-items-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                  {op.worker.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-xs text-foreground">{op.service} · <span className="text-gold">{op.client}</span></p>
                  <p className="text-[11px] text-muted-foreground">Stylist: {op.worker}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-xs text-gold">{inr(op.amount)}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase border ${
                  op.status === "in-progress" ? "bg-amber-500/10 text-amber-600 border-amber-500/30 animate-pulse" : "bg-blue-500/10 text-blue-600 border-blue-500/30"
                }`}>
                  {op.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* SECTION 3: LIVE SALON FLOOR & ATTENTION CENTER */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Live Salon Floor */}
        <Panel title="Live Salon Floor · Staff Real-time Status">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <span className="text-xs text-muted-foreground">12 Staff Members Active</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" /> Live Tracking
            </span>
          </div>

          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {staffFloor.map((s) => (
              <div key={s.name} className="rounded-xl border border-border bg-card p-3 shadow-soft space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs">{s.name}</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase border",
                      s.status === "WITH_CUSTOMER" && "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
                      s.status === "AVAILABLE" && "bg-blue-500/10 text-blue-600 border-blue-500/30",
                      s.status === "BREAK" && "bg-amber-500/10 text-amber-600 border-amber-500/30",
                    )}
                  >
                    {s.status.replace("_", " ")}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground truncate">{s.service}</p>
                {s.timeRemaining > 0 && (
                  <p className="text-[10px] font-semibold text-gold flex items-center gap-1">
                    <Clock className="size-3" /> {s.timeRemaining} min remaining ({s.client})
                  </p>
                )}
              </div>
            ))}
          </div>
        </Panel>

        {/* Attention Center Alerts */}
        <Panel title="Needs Attention · Priority Alerts">
          <div className="space-y-2.5">
            {attentionAlerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  "rounded-xl border p-3.5 flex items-start justify-between gap-3 text-xs transition-colors",
                  alert.type === "red" && "border-rose-500/30 bg-rose-500/5",
                  alert.type === "orange" && "border-amber-500/30 bg-amber-500/5",
                  alert.type === "yellow" && "border-yellow-500/30 bg-yellow-500/5",
                  alert.type === "blue" && "border-blue-500/30 bg-blue-500/5",
                )}
              >
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className={cn(
                    "size-4 shrink-0 mt-0.5",
                    alert.type === "red" && "text-rose-600",
                    alert.type === "orange" && "text-amber-600",
                    alert.type === "yellow" && "text-yellow-600",
                    alert.type === "blue" && "text-blue-600",
                  )} />
                  <div>
                    <p className="font-semibold text-foreground">{alert.title}</p>
                    <p className="text-muted-foreground mt-0.5 text-[11px]">{alert.sub}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-lg border border-border bg-card px-2.5 py-1 text-[10px] font-semibold hover:bg-accent transition-colors"
                >
                  {alert.action}
                </button>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* SECTION 4: QUICK ACTIONS BAR */}
      <Panel title="Quick Management Actions" className="mt-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-6">
          {[
            { label: "+ New Booking", type: "appointment", icon: Plus },
            { label: "+ Add Client", type: "customer", icon: UserPlus },
            { label: "+ Add Worker", type: "worker", icon: UserCheck },
            { label: "+ Add Service", type: "service", icon: Scissors },
            { label: "+ Record Payment", type: "payment", icon: CreditCard },
            { label: "+ Add Stock", type: "inventory", icon: PackageCheck },
          ].map((act) => (
            <button
              key={act.label}
              type="button"
              onClick={() => { setModalType(act.type as any); setIsModalOpen(true); }}
              className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-card/70 p-3 text-xs font-semibold hover:bg-accent hover:border-gold/40 transition-all group"
            >
              <act.icon className="size-4 text-gold group-hover:scale-110 transition-transform" />
              <span className="truncate">{act.label}</span>
            </button>
          ))}
        </div>
      </Panel>

      {/* SECTION 5: REVENUE TREND CHART */}
      <Panel title="Revenue Trend · Last 7 Days" className="mt-4">
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueSeries}>
              <defs>
                <linearGradient id="dash-rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.4} />
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

      {/* APPOINTMENT INSPECTOR DRAWER */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h3 className="font-display text-xl font-bold">{selectedAppointment.service}</h3>
                <p className="text-xs text-muted-foreground">{selectedAppointment.slot} · {selectedAppointment.worker}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAppointment(null)}
                className="grid size-8 place-items-center rounded-full hover:bg-accent"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-border bg-secondary/40 p-3">
                <p className="text-[11px] text-muted-foreground">Client Name</p>
                <p className="font-bold text-sm text-foreground mt-0.5">{selectedAppointment.client}</p>
              </div>
              <div className="rounded-xl border border-border bg-secondary/40 p-3">
                <p className="text-[11px] text-muted-foreground">Total Price</p>
                <p className="font-bold text-lg text-gold mt-0.5">{inr(selectedAppointment.amount)}</p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <p className="eyebrow text-muted-foreground">Quick Status Actions</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAppointment(null)}
                  className="rounded-xl bg-emerald-600 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500"
                >
                  Start Service
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedAppointment(null)}
                  className="rounded-xl border border-border py-2.5 text-xs font-semibold hover:bg-accent"
                >
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUICK ACTION CREATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <h3 className="font-display text-xl font-semibold capitalize">Create {modalType}</h3>
            <p className="mt-1 text-xs text-muted-foreground">Add new record to BeautyCon OS.</p>
            <form onSubmit={handleCreate} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Name / Identifier</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sundaram"
                  value={newCustomer}
                  onChange={(e) => setNewCustomer(e.target.value)}
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
                  Confirm Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
