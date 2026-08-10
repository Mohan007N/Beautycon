import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { inr } from "@/lib/mock-data";
import { useBeautyConStore } from "@/lib/store";
import { CheckCircle2, Plus, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const { payments, settlePayment, addPayment } = useBeautyConStore();
  const [search, setSearch] = useState("");
  const [methodFilter, setMethodFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [customer, setCustomer] = useState("");
  const [method, setMethod] = useState("UPI");
  const [amount, setAmount] = useState(1500);

  const filtered = payments.filter((p) => {
    const matchesSearch =
      p.customer.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchesMethod = methodFilter === "all" || p.method === methodFilter;
    return matchesSearch && matchesMethod;
  });

  const totalSettled = payments
    .filter((p) => p.status === "Settled")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.trim()) return;
    addPayment({
      customer,
      method,
      amount: Number(amount),
    });
    setCustomer("");
    setIsModalOpen(false);
  };

  return (
    <>
      <PageTitle title="Payments & POS" sub="Settlements, payment gateways, and pending collections.">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:scale-[1.02] transition-transform"
        >
          <Plus className="size-4" /> Collect Payment
        </button>
      </PageTitle>

      {/* Summary KPI */}
      <div className="mb-4 rounded-2xl border border-border bg-card p-4 flex flex-wrap items-center justify-between gap-3 shadow-soft">
        <div>
          <p className="text-xs text-muted-foreground font-medium">Total Settled Collections Today</p>
          <p className="font-display text-2xl font-semibold text-gold mt-0.5">{inr(totalSettled + 18500)}</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 font-semibold text-emerald-600 dark:text-emerald-400">
            Instant Auto-Settlement Active
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-card p-1">
          {["all", "UPI", "Card", "Wallet", "Cash"].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMethodFilter(m)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                methodFilter === m
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {m === "all" ? "All Methods" : m}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search customer or transaction ID..."
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
              No transactions match your search.
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
                      {row.customer} · {row.method}
                    </p>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold border",
                        row.status === "Settled"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
                      )}
                    >
                      {row.status}
                    </span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground mt-0.5">
                    {row.id} · {row.time}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="shrink-0 text-sm font-semibold text-gold">
                    {inr(row.amount)}
                  </span>
                  {row.status === "Pending" ? (
                    <button
                      type="button"
                      onClick={() => settlePayment(row.id)}
                      className="rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
                    >
                      Settle Now
                    </button>
                  ) : (
                    <CheckCircle2 className="size-4 text-emerald-500" />
                  )}
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
            <h3 className="font-display text-xl font-semibold">Collect Payment</h3>
            <p className="mt-1 text-xs text-muted-foreground">Record POS transaction receipt.</p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Divya Raman"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Payment Method
                  </label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="UPI">UPI</option>
                    <option value="Card">Card</option>
                    <option value="Cash">Cash</option>
                    <option value="Wallet">Wallet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
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
                  Record Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
