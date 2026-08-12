import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { inr } from "@/lib/mock-data";
import { useBeautyConStore, ServiceItem } from "@/lib/store";
import { useAuthStore } from "@/stores/auth.store";
import { Plus, Search, Edit3, Trash2, Scissors, Sparkles, Check, X, Tag } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/services")({
  head: () => ({
    meta: [
      { title: "Service Menu & Pricing — BeautyCon OS" },
      { name: "description", content: "Manage salon service catalog, pricing, duration, haircuts, styling, massages, facials, and treatments." },
      { property: "og:title", content: "Service Menu & Pricing — BeautyCon OS" },
      { property: "og:description", content: "Manage salon service catalog & pricing." },
    ],
  }),
  component: Page,
});

export function Page() {
  const { services, addService, updateService, deleteService } = useBeautyConStore();
  const { user } = useAuthStore();
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState<string>("all");

  const isManagerOrAbove = user && ["OWNER", "ADMIN", "MANAGER"].includes(user.role);

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Hair");
  const [price, setPrice] = useState(1200);
  const [duration, setDuration] = useState(60);

  const categories = ["all", "Hair", "Skin", "Colour", "Massage", "Nails", "Spa", "Grooming"];

  const filtered = services.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = catFilter === "all" || s.category === catFilter;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    setName("");
    setCategory("Hair");
    setPrice(1200);
    setDuration(60);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (serv: ServiceItem) => {
    setEditingService(serv);
    setName(serv.name);
    setCategory(serv.category);
    setPrice(serv.price);
    setDuration(serv.duration);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addService({
      name,
      category,
      price: Number(price),
      duration: Number(duration),
    });
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !name.trim()) return;
    updateService(editingService.id, {
      name,
      category,
      price: Number(price),
      duration: Number(duration),
    });
    setEditingService(null);
  };

  return (
    <>
      <PageTitle
        title="Service Menu & Pricing"
        sub="Manage haircuts, styling, massages, facials, pricing, and treatment duration."
      >
        {isManagerOrAbove && (
          <button
            type="button"
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-md hover:scale-[1.02] transition-transform"
          >
            <Plus className="size-4" /> Add Service / Feature
          </button>
        )}
      </PageTitle>

      {/* Filter Tabs & Search Bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar rounded-full border border-border bg-card p-1">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCatFilter(c)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors shrink-0",
                catFilter === c
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {c === "all" ? "All Services" : c}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3.5 top-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search haircut, massage, facial..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-border bg-card pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
      </div>

      <Panel>
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-muted-foreground border border-dashed border-border rounded-2xl">
              No services found matching filter.
            </div>
          ) : (
            filtered.map((row) => (
              <div
                key={row.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:border-gold/40 shadow-soft"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold font-bold text-sm">
                    ✂️
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm text-foreground truncate">{row.name}</h4>
                      <span className="shrink-0 rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground uppercase">
                        {row.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Duration: <span className="font-semibold text-foreground">{row.duration} mins</span> · {row.bookings} bookings logged
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-display text-base font-bold text-gold">{inr(row.price)}</span>
                  {isManagerOrAbove && (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(row)}
                        className="flex items-center gap-1 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-accent hover:border-gold/40 transition-colors"
                      >
                        <Edit3 className="size-3.5 text-gold" /> Edit Price
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteService(row.id)}
                        className="grid size-8 place-items-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 transition-colors"
                        title="Delete Service"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Panel>

      {/* CREATE SERVICE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-display text-xl font-bold">Add New Service</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="grid size-8 place-items-center rounded-full hover:bg-accent"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Haircut & Beard Sculpting"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-2.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="Hair">Hair</option>
                    <option value="Skin">Skin</option>
                    <option value="Colour">Colour</option>
                    <option value="Massage">Massage</option>
                    <option value="Nails">Nails</option>
                    <option value="Spa">Spa</option>
                    <option value="Grooming">Grooming</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    min={50}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-background px-2.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Duration (m)</label>
                  <input
                    type="number"
                    required
                    min={10}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-background px-2.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-border px-4 py-2 text-xs font-semibold hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary px-5 py-2 text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90"
                >
                  Create Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT SERVICE MODAL */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-display text-xl font-bold">Edit Price & Details</h3>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="grid size-8 place-items-center rounded-full hover:bg-accent"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-2.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="Hair">Hair</option>
                    <option value="Skin">Skin</option>
                    <option value="Colour">Colour</option>
                    <option value="Massage">Massage</option>
                    <option value="Nails">Nails</option>
                    <option value="Spa">Spa</option>
                    <option value="Grooming">Grooming</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    min={50}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-background px-2.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Duration (m)</label>
                  <input
                    type="number"
                    required
                    min={10}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-background px-2.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="rounded-xl border border-border px-4 py-2 text-xs font-semibold hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gold px-5 py-2 text-xs font-bold text-black shadow-md hover:bg-gold/90"
                >
                  Save Price Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
