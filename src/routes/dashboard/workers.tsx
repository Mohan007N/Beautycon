import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { useBeautyConStore } from "@/lib/store";
import { inr } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Star, UserCheck, Sparkles, Check, RefreshCw, Zap, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/workers")({
  head: () => ({
    meta: [
      { title: "Workforce & Scheduling — BeautyCon OS" },
      { name: "description", content: "Team utilization, skills matrix, ratings, and automated AI shift schedule optimizer." },
      { property: "og:title", content: "Workforce & Scheduling — BeautyCon OS" },
      { property: "og:description", content: "Team utilization & scheduling." },
    ],
  }),
  component: Page,
});

export function Page() {
  const { workers, toggleWorkerStatus, addWorker } = useBeautyConStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimStep, setOptimStep] = useState<string | null>(null);
  const [optimResult, setOptimResult] = useState<boolean>(false);

  // Form
  const [name, setName] = useState("");
  const [role, setRole] = useState("Senior Stylist");

  const runScheduleOptimization = () => {
    setIsOptimizing(true);
    setOptimResult(false);
    setOptimStep("Analyzing worker availability...");

    setTimeout(() => setOptimStep("Checking worker skills & certifications..."), 800);
    setTimeout(() => setOptimStep("Evaluating service duration benchmarks..."), 1600);
    setTimeout(() => setOptimStep("Resolving 3 shift overlap conflicts..."), 2400);
    setTimeout(() => {
      setIsOptimizing(false);
      setOptimStep(null);
      setOptimResult(true);
    }, 3200);
  };

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
      <PageTitle title="Workforce & Shift Roster" sub="Team utilization, skill matrices, ratings, and AI shift optimization.">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={runScheduleOptimization}
            disabled={isOptimizing}
            className="flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-bold text-gold hover:bg-gold/20 transition-all shadow-sm disabled:opacity-50"
          >
            <Sparkles className={cn("size-3.5", isOptimizing && "animate-spin")} />
            {isOptimizing ? "Optimizing..." : "OPTIMIZE SCHEDULE"}
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:scale-[1.02] transition-transform"
          >
            <Plus className="size-4" /> Add Team Member
          </button>
        </div>
      </PageTitle>

      {/* OPTIMIZATION PROGRESS AND RESULT BANNER */}
      {isOptimizing && (
        <div className="mb-4 rounded-2xl border border-gold/40 bg-gold/5 p-4 text-xs font-semibold text-gold flex items-center justify-between shadow-soft">
          <div className="flex items-center gap-2">
            <RefreshCw className="size-4 animate-spin text-gold" />
            <span>{optimStep}</span>
          </div>
          <span className="text-[11px] text-muted-foreground">AI Engine Active</span>
        </div>
      )}

      {optimResult && (
        <div className="mb-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center justify-between shadow-soft">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="size-5 text-emerald-500" />
            <div>
              <p className="font-bold text-sm">OPTIMIZATION COMPLETE</p>
              <p className="text-[11px] opacity-90 mt-0.5">
                8 appointments optimized · 3 conflicts resolved · Worker utilization <span className="font-bold">+12%</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOptimResult(false)}
            className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-500"
          >
            Apply Schedule
          </button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {workers.map((w) => {
          const isActive = w.utilization > 0;
          const skillsMap: Record<string, string[]> = {
            Ananya: ["Hair Spa", "Hair Styling", "Precision Cuts"],
            Priya: ["24K Gold Facial", "Lymphatic Drainage", "Skin Therapy"],
            Arun: ["Executive Beard Sculpt", "Razor Fade", "Hot Towel Shave"],
            Meera: ["Balayage Gloss", "Colour Refresh", "Scalp Care"],
          };
          const workerSkills = skillsMap[w.name] || ["Beauty Therapy", "Styling"];

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
                      {isActive ? "On Shift" : "Off Duty"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{w.role}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="size-3.5 fill-amber-500" /> {w.rating}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs border-y border-border py-3">
                <div>
                  <span className="text-muted-foreground">Shift Utilization</span>
                  <p className="font-bold text-foreground mt-0.5">{w.utilization}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Est. Monthly Revenue</span>
                  <p className="font-bold text-gold mt-0.5">{inr(w.utilization * 1720)}</p>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-[11px] text-muted-foreground font-semibold mb-1.5">Certified Skills</p>
                <div className="flex flex-wrap gap-1">
                  {workerSkills.map((s) => (
                    <span key={s} className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {s}
                    </span>
                  ))}
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
            <p className="mt-1 text-xs text-muted-foreground">Add new stylist or therapist to roster.</p>
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
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Role / Designation</label>
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
                  Add Team Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
