import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { inr } from "@/lib/mock-data";
import { useBeautyConStore } from "@/lib/store";
import {
  Plus,
  Search,
  UserCheck,
  LayoutGrid,
  List,
  Sparkles,
  Phone,
  Mail,
  MessageSquare,
  ChevronRight,
  TrendingUp,
  Tag,
  Clock,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/customers")({
  head: () => ({
    meta: [
      { title: "Client CRM Pipeline — BeautyCon OS" },
      { name: "description", content: "Lead pipeline, client LTV, loyalty tiers, and automated retention." },
      { property: "og:title", content: "Client CRM Pipeline — BeautyCon OS" },
      { property: "og:description", content: "Lead pipeline, client LTV, loyalty tiers, and automated retention." },
    ],
  }),
  component: Page,
});

interface ExtendedCustomer {
  id: string;
  name: string;
  tier: "Platinum" | "Gold" | "Silver";
  visits: number;
  spend: number;
  last: string;
  email?: string;
  phone?: string;
  stage: "leads" | "active" | "vip" | "churn_risk";
  tags: string[];
  preferredStylist: string;
  notes: string;
}

export function Page() {
  const { customers, addCustomer } = useBeautyConStore();
  const [viewMode, setViewMode] = useState<"pipeline" | "table">("pipeline");
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [selectedCustomer, setSelectedCustomer] = useState<ExtendedCustomer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [tier, setTier] = useState<"Platinum" | "Gold" | "Silver">("Gold");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Map existing customers to extended CRM state
  const enrichedCustomers: ExtendedCustomer[] = customers.map((c, index) => {
    let stage: "leads" | "active" | "vip" | "churn_risk" = "active";
    if (c.tier === "Platinum") stage = "vip";
    else if (c.visits <= 2) stage = "leads";
    else if (c.last.includes("days ago") && parseInt(c.last) > 30) stage = "churn_risk";

    const defaultTags =
      c.tier === "Platinum"
        ? ["#VIPPlatinum", "#HighLTV", "#WeeklyRegular"]
        : c.tier === "Gold"
        ? ["#GoldLoyal", "#HairCareRegular"]
        : ["#NewClient", "#SingleVisit"];

    return {
      ...c,
      phone: `+91 98${index}54 22${index}1`,
      stage,
      tags: defaultTags,
      preferredStylist: index % 2 === 0 ? "Ananya" : "Priya",
      notes: "Prefers morning slots. Highly responds to automated SMS booking reminders.",
    };
  });

  const filtered = enrichedCustomers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesTier = tierFilter === "all" || c.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const pipelineColumns = [
    { id: "leads", label: "🎯 New Leads", color: "border-blue-500/30 bg-blue-500/5 text-blue-600" },
    { id: "active", label: "✨ Active", color: "border-emerald-500/30 bg-emerald-500/5 text-emerald-600" },
    { id: "vip", label: "👑 VIP Clients", color: "border-amber-500/30 bg-amber-500/5 text-amber-600" },
    { id: "churn_risk", label: "⚠️ At Risk", color: "border-rose-500/30 bg-rose-500/5 text-rose-600" },
  ];

  const triggerAction = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

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
    setPhone("");
    setIsModalOpen(false);
    triggerAction(`Customer ${name} added to CRM pipeline!`);
  };

  return (
    <>
      <PageTitle title="Client CRM & Pipeline" sub="Lead scoring, LTV profiles, loyalty tiers, and automated retention.">
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center rounded-xl border border-border bg-card p-1">
            <button
              type="button"
              onClick={() => setViewMode("pipeline")}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
                viewMode === "pipeline"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <LayoutGrid className="size-3.5" /> Pipeline Board
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
                viewMode === "table"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <List className="size-3.5" /> Table View
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:scale-[1.02] transition-transform"
          >
            <Plus className="size-4" /> Add CRM Client
          </button>
        </div>
      </PageTitle>

      {/* Trigger Notification Toast */}
      {notification && (
        <div className="mb-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
          <UserCheck className="size-4" /> {notification}
        </div>
      )}

      {/* Filter and Search Controls Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
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
            placeholder="Search by client name or tag (e.g. #VIP)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-border bg-card pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
      </div>

      {/* Pipeline Board Mode */}
      {viewMode === "pipeline" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-start">
          {pipelineColumns.map((col) => {
            const colClients = filtered.filter((c) => c.stage === col.id);
            return (
              <div key={col.id} className="rounded-2xl border border-border bg-card/60 p-4 shadow-soft">
                <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
                  <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold border", col.color)}>
                    {col.label}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground">{colClients.length}</span>
                </div>

                <div className="space-y-3 min-h-[300px]">
                  {colClients.length === 0 ? (
                    <div className="py-12 text-center text-xs text-muted-foreground border border-dashed border-border rounded-xl">
                      No clients in this stage
                    </div>
                  ) : (
                    colClients.map((client) => (
                      <div
                        key={client.id}
                        onClick={() => setSelectedCustomer(client)}
                        className="cursor-pointer rounded-xl border border-border bg-card p-3.5 transition-all hover:border-gold/50 hover:shadow-md group"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-sm group-hover:text-gold transition-colors">
                            {client.name}
                          </p>
                          <span className="font-bold text-xs text-gold">{inr(client.spend)}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1">
                          {client.visits} visits · Last: {client.last}
                        </p>
                        <div className="mt-2.5 flex flex-wrap gap-1">
                          {client.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-md bg-secondary/80 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View Mode */
        <Panel>
          <div className="space-y-2.5">
            {filtered.length === 0 ? (
              <p className="py-8 text-center text-xs text-muted-foreground">No customers found.</p>
            ) : (
              filtered.map((row) => (
                <div
                  key={row.id}
                  onClick={() => setSelectedCustomer(row)}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-card p-3.5 sm:px-4 cursor-pointer transition-colors hover:border-gold/40"
                >
                  <div className="min-w-0 flex items-center gap-3">
                    <div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 font-bold text-xs text-primary">
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
                        {row.visits} visits · Stylist: {row.preferredStylist} · Last: {row.last}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <span className="shrink-0 text-sm font-semibold text-gold">{inr(row.spend)}</span>
                      <p className="text-[10px] text-muted-foreground">Lifetime Spend</p>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </div>
                </div>
              ))
            )}
          </div>
        </Panel>
      )}

      {/* Customer Detail Drawer Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg h-full max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-2xl bg-gradient-gold text-ink font-bold text-lg">
                  {selectedCustomer.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">{selectedCustomer.name}</h3>
                  <p className="text-xs text-muted-foreground">{selectedCustomer.phone}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="grid size-8 place-items-center rounded-full hover:bg-accent"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-secondary/40 p-3">
                <p className="text-[11px] text-muted-foreground">Lifetime Spend (LTV)</p>
                <p className="font-display text-xl font-bold text-gold mt-1">{inr(selectedCustomer.spend)}</p>
              </div>
              <div className="rounded-xl border border-border bg-secondary/40 p-3">
                <p className="text-[11px] text-muted-foreground">Loyalty Tier</p>
                <p className="font-display text-xl font-bold mt-1">{selectedCustomer.tier}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border p-4 bg-background/50 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-gold">
                <Sparkles className="size-3.5" /> AI Client Insights
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{selectedCustomer.notes}</p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                {selectedCustomer.tags.map((t) => (
                  <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="eyebrow text-muted-foreground">Quick Client Engagement Actions</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => triggerAction(`WhatsApp re-engagement offer sent to ${selectedCustomer.name}`)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
                >
                  <MessageSquare className="size-3.5" /> Send WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => triggerAction(`Booking Reminder Email sent to ${selectedCustomer.name}`)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-xs font-semibold hover:bg-accent transition-colors"
                >
                  <Mail className="size-3.5 text-gold" /> Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <h3 className="font-display text-xl font-semibold">Register New CRM Client</h3>
            <p className="mt-1 text-xs text-muted-foreground">Add new lead to BeautyCon CRM pipeline.</p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anusha Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Loyalty Tier</label>
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
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Email Address</label>
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
                  Create Client Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
