import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { useBeautyConStore } from "@/lib/store";
import { motion } from "framer-motion";
import { Plus, Star, UserCheck } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/workers")({
  head: () => ({
    meta: [
      { title: "Workers — BeautyCon Dashboard" },
      { name: "description", content: "Team utilization, ratings and shift load." },
      { property: "og:title", content: "Workers — BeautyCon Dashboard" },
      { property: "og:description", content: "Team utilization, ratings and shift load." },
    ],
  }),
  component: Page,
});

function Page() {
  const { workers, toggleWorkerStatus, addWorker } = useBeautyConStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form
  const [name, setName] = useState("");
  const [role, setRole] = useState("Stylist");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const initials = name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    addWorker({
      name,
      role,
      initials: initials || "ST",
    });
    setName("");
    setIsModalOpen(false);
  };

  return (
    <>
      <PageTitle title="Workers & Stylists" sub="Team utilization, ratings and live shift load.">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:scale-[1.02] transition-transform"
        >
          <Plus className="size-4" /> Add Team Member
        </button>
      </PageTitle>

      <div className="grid gap-4 sm:grid-cols-2">
        {workers.map((w) => {
          const isActive = w.utilization > 0;
          return (
            <Panel key={w.id}>
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-sm">
                  {w.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-semibold text-sm">{w.name}</p>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold border",
                        isActive
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "border-muted bg-muted text-muted-foreground",
                      )}
                    >
                      {isActive ? "On Duty" : "On Break"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    {w.role} · <Star className="size-3 fill-gold text-gold inline" /> {w.rating}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleWorkerStatus(w.id)}
                  className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium hover:bg-accent transition-colors"
                >
                  {isActive ? "Set Break" : "Set Active"}
                </button>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Shift Utilization</span>
                  <span className="font-bold tabular-nums">{w.utilization}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${w.utilization}%` }}
                    transition={{ duration: 0.8 }}
                    className={cn(
                      "h-full rounded-full transition-all",
                      w.utilization > 80 ? "bg-gold" : "bg-primary",
                    )}
                  />
                </div>
              </div>
            </Panel>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <h3 className="font-display text-xl font-semibold">Add Team Member</h3>
            <p className="mt-1 text-xs text-muted-foreground">Onboard a new stylist or barber.</p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Stylist Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meera Nair"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Role / Specialization
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  <option value="Senior Stylist">Senior Stylist</option>
                  <option value="Skin Therapist">Skin Therapist</option>
                  <option value="Barber">Barber</option>
                  <option value="Colour Specialist">Colour Specialist</option>
                  <option value="Nail Artist">Nail Artist</option>
                </select>
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
                  Onboard Stylist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
