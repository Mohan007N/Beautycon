import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { inr } from "@/lib/mock-data";
import { useBeautyConStore } from "@/lib/store";
import { Plus, Search, UserCheck } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const { customers, addCustomer } = useBeautyConStore();
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form
  const [name, setName] = useState("");
  const [tier, setTier] = useState<"Platinum" | "Gold" | "Silver">("Gold");
  const [email, setEmail] = useState("");

  const filtered = customers.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesTier = tierFilter === "all" || c.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addCustomer({
      name,
      tier,
      email,
    });
    setName("");
    setEmail("");
    setIsModalOpen(false);
  };

  return (
    <>
      <PageTitle title="Customers" sub="Visit history, spend and loyalty tier.">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:scale-[1.02] transition-transform"
        >
          <Plus className="size-4" /> Add Customer
        </button>
      </PageTitle>

      {/* Filter and Search */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-card p-1">
          {["all", "Platinum", "Gold", "Silver"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTierFilter(t)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                tierFilter === t
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t === "all" ? "All Tiers" : t}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search customer name..."
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
              No customers found.
            </p>
          ) : (
            filtered.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-card p-3.5 sm:px-4 transition-colors hover:border-gold/30"
              >
                <div className="min-w-0 flex items-center gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-xs font-bold text-foreground">
                    {row.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold">{row.name}</p>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold border",
                          row.tier === "Platinum" &&
                            "border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400",
                          row.tier === "Gold" &&
                            "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
                          row.tier === "Silver" &&
                            "border-slate-500/30 bg-slate-500/10 text-slate-600 dark:text-slate-400",
                        )}
                      >
                        {row.tier}
                      </span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground mt-0.5">
                      {row.visits} visits · Last visit: {row.last}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="shrink-0 text-sm font-semibold text-gold">
                    {inr(row.spend)}
                  </span>
                  <p className="text-[10px] text-muted-foreground">Lifetime Spend</p>
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
            <h3 className="font-display text-xl font-semibold">Register Customer</h3>
            <p className="mt-1 text-xs text-muted-foreground">Add new client to directory.</p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anusha Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Loyalty Tier
                </label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as any)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinum">Platinum</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="anusha@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
