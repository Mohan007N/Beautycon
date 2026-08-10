import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { inr } from "@/lib/mock-data";
import { useBeautyConStore } from "@/lib/store";
import { AlertTriangle, Minus, Plus, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory — BeautyCon Dashboard" },
      { name: "description", content: "Stock levels and reorder points." },
      { property: "og:title", content: "Inventory — BeautyCon Dashboard" },
      { property: "og:description", content: "Stock levels and reorder points." },
    ],
  }),
  component: Page,
});

function Page() {
  const { inventory, updateInventoryStock, addInventoryItem } = useBeautyConStore();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [item, setItem] = useState("");
  const [supplier, setSupplier] = useState("");
  const [stock, setStock] = useState(20);
  const [reorder, setReorder] = useState(10);
  const [unit, setUnit] = useState(1200);

  const filtered = inventory.filter(
    (i) =>
      i.item.toLowerCase().includes(search.toLowerCase()) ||
      i.supplier.toLowerCase().includes(search.toLowerCase()),
  );

  const lowStockCount = inventory.filter((i) => i.stock <= i.reorder).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item.trim() || !supplier.trim()) return;
    addInventoryItem({
      item,
      supplier,
      stock: Number(stock),
      reorder: Number(reorder),
      unit: Number(unit),
    });
    setItem("");
    setSupplier("");
    setIsModalOpen(false);
  };

  return (
    <>
      <PageTitle title="Inventory" sub="Stock levels and reorder points.">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:scale-[1.02] transition-transform"
        >
          <Plus className="size-4" /> Add Item
        </button>
      </PageTitle>

      {/* Alert Banner if low stock */}
      {lowStockCount > 0 && (
        <div className="mb-4 flex items-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-700 dark:text-amber-400">
          <AlertTriangle className="size-4 shrink-0" />
          <span>
            <strong>{lowStockCount} items</strong> are below reorder threshold. Replenishment recommended.
          </span>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-4 flex justify-end">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search stock items or supplier..."
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
              No inventory items found.
            </p>
          ) : (
            filtered.map((row) => {
              const isLow = row.stock <= row.reorder;
              return (
                <div
                  key={row.id}
                  className={cn(
                    "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border bg-card p-3.5 sm:px-4 transition-colors",
                    isLow ? "border-amber-500/40 bg-amber-500/5" : "border-border hover:border-gold/30",
                  )}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold">{row.item}</p>
                      {isLow && (
                        <span className="shrink-0 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                          Reorder Alert
                        </span>
                      )}
                    </div>
                    <p className="truncate text-xs text-muted-foreground mt-0.5">
                      Supplier: {row.supplier} · Unit Price: {inr(row.unit)} · Reorder threshold: {row.reorder}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background p-1">
                      <button
                        type="button"
                        onClick={() => updateInventoryStock(row.id, -1)}
                        className="grid size-6 place-items-center rounded hover:bg-accent text-muted-foreground"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span
                        className={cn(
                          "w-8 text-center text-xs font-bold tabular-nums",
                          isLow ? "text-amber-600 dark:text-amber-400" : "text-foreground",
                        )}
                      >
                        {row.stock}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateInventoryStock(row.id, 1)}
                        className="grid size-6 place-items-center rounded hover:bg-accent text-muted-foreground"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Panel>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <h3 className="font-display text-xl font-semibold">Add Inventory Item</h3>
            <p className="mt-1 text-xs text-muted-foreground">Catalog new product or supply.</p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Organic Scalp Scrub 500ml"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Supplier
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lumière Pro"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Initial Stock
                  </label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Reorder At
                  </label>
                  <input
                    type="number"
                    required
                    value={reorder}
                    onChange={(e) => setReorder(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Unit (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={unit}
                    onChange={(e) => setUnit(Number(e.target.value))}
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
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
