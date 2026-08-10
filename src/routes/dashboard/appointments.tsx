import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { inr } from "@/lib/mock-data";
import { useBeautyConStore } from "@/lib/store";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const { appointments, addAppointment, updateAppointmentStatus } = useBeautyConStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [customer, setCustomer] = useState("");
  const [service, setService] = useState("Gold Facial");
  const [worker, setWorker] = useState("Priya");
  const [amount, setAmount] = useState(2400);

  const filtered = appointments.filter((a) => {
    const matchesSearch =
      a.customer.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase()) ||
      a.worker.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.trim()) return;
    addAppointment({
      customer,
      service,
      worker,
      time: "Scheduled",
      duration: 60,
      amount: Number(amount),
      status: "confirmed",
    });
    setCustomer("");
    setIsModalOpen(false);
  };

  return (
    <>
      <PageTitle title="Appointments" sub="Every booking across chairs, rooms and stylists.">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:scale-[1.02] transition-transform"
        >
          <Plus className="size-4" /> Book Appointment
        </button>
      </PageTitle>

      {/* Filter and Search Bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-card p-1">
          {["all", "confirmed", "in-progress", "completed", "cancelled"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-colors",
                statusFilter === tab
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search customer, service or stylist..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-border bg-card pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
      </div>

      <Panel>
        <div className="space-y-2.5">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-xs text-muted-foreground">
              No appointments found matching your query.
            </p>
          ) : (
            filtered.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-card p-3.5 sm:px-4 transition-colors hover:border-gold/30"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold">
                      {row.service} · {row.customer}
                    </p>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize border",
                        row.status === "confirmed" &&
                          "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
                        row.status === "in-progress" &&
                          "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 animate-pulse",
                        row.status === "completed" &&
                          "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                        row.status === "cancelled" &&
                          "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
                      )}
                    >
                      {row.status}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {row.id} · {row.time} · Stylist: {row.worker} · {row.duration} min
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="shrink-0 text-sm font-semibold text-gold">
                    {inr(row.amount)}
                  </span>
                  <select
                    value={row.status}
                    onChange={(e) =>
                      updateAppointmentStatus(row.id, e.target.value as any)
                    }
                    className="rounded-lg border border-border bg-background px-2 py-1 text-xs font-medium cursor-pointer"
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      </Panel>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <h3 className="font-display text-xl font-semibold">Book Appointment</h3>
            <p className="mt-1 text-xs text-muted-foreground">Add a new client appointment.</p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Krish"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Service
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="Hair Spa">Hair Spa</option>
                    <option value="Gold Facial">Gold Facial</option>
                    <option value="Balayage">Balayage</option>
                    <option value="Gel Manicure">Gel Manicure</option>
                    <option value="Aroma Massage">Aroma Massage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Stylist
                  </label>
                  <select
                    value={worker}
                    onChange={(e) => setWorker(e.target.value)}
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
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
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
                  Create Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
