import { createFileRoute, Link } from "@tanstack/react-router";
import { inr } from "@/lib/mock-data";
import { useBeautyConStore } from "@/lib/store";
import { Clock, Play, CheckCircle2, User, Calendar, Award, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/worker/")({
  head: () => ({
    meta: [
      { title: "Stylist Today — BeautyCon Worker App" },
      { name: "description", content: "Mobile worker interface for shift schedule, appointments, and service check-in." },
      { property: "og:title", content: "Stylist Today — BeautyCon Worker App" },
      { property: "og:description", content: "Stylist shift manager." },
    ],
  }),
  component: Page,
});

export function Page() {
  const { activeBranch } = useBeautyConStore();
  const [serviceStarted, setServiceStarted] = useState(false);

  const nextApp = {
    time: "5:30 PM",
    service: "Hair Spa & Scalp Massage",
    client: "Maya Krish",
    duration: 60,
    price: 1200,
    notes: "Sensitive scalp. Prefers organic scalp oil.",
  };

  const todaySchedule = [
    { time: "09:30 AM", service: "Precision Cut & Finish", client: "Sneha Kapoor", status: "completed", price: 1400 },
    { time: "11:00 AM", service: "24K Gold Facial", client: "Anusha S", status: "completed", price: 2400 },
    { time: "01:00 PM", service: "Lunch Break", client: null, status: "break", price: 0 },
    { time: "02:30 PM", service: "Blowout & Hair Spa", client: "Pooja R", status: "completed", price: 1200 },
    { time: "04:00 PM", service: "Beard Trim & Sculpt", client: "Vikram D", status: "completed", price: 650 },
    { time: "05:30 PM", service: "Hair Spa", client: "Maya Krish", status: "upcoming", price: 1200 },
    { time: "07:00 PM", service: "Keratin Touchup", client: "Deepika R", status: "upcoming", price: 3200 },
  ];

  return (
    <div className="mx-auto max-w-md p-4 space-y-5">
      {/* Worker Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div>
          <p className="eyebrow text-gold">GOOD MORNING, ANANYA</p>
          <h1 className="font-display text-xl font-bold">{activeBranch} Branch</h1>
        </div>
        <div className="grid size-10 place-items-center rounded-2xl bg-primary text-xs font-bold text-primary-foreground shadow-sm">
          AN
        </div>
      </div>

      {/* TODAY'S STATUS SUMMARY */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3">
          <p className="font-bold text-lg text-emerald-600 dark:text-emerald-400">✓ 4</p>
          <p className="text-[10px] font-semibold text-muted-foreground">Completed</p>
        </div>
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3">
          <p className="font-bold text-lg text-amber-600 dark:text-amber-400">● 2</p>
          <p className="text-[10px] font-semibold text-muted-foreground">Upcoming</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-3">
          <p className="font-bold text-lg text-foreground">○ 1</p>
          <p className="text-[10px] font-semibold text-muted-foreground">Break</p>
        </div>
      </div>

      {/* NEXT APPOINTMENT FEATURED CARD */}
      <div className="rounded-3xl border border-gold/40 bg-gradient-to-br from-card via-gold/5 to-card p-5 shadow-lift space-y-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-xs font-bold text-gold border border-gold/30">
            <Clock className="size-3.5" /> NEXT APPOINTMENT
          </span>
          <span className="font-display text-base font-bold text-gold">{inr(nextApp.price)}</span>
        </div>

        <div>
          <p className="font-display text-2xl font-extrabold text-foreground">{nextApp.time}</p>
          <h3 className="font-semibold text-base text-foreground mt-0.5">{nextApp.service}</h3>
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <User className="size-3.5 text-gold" /> Client: <span className="font-semibold text-foreground">{nextApp.client}</span> ({nextApp.duration} min)
          </p>
        </div>

        {nextApp.notes && (
          <div className="rounded-xl border border-border/80 bg-background/50 p-3 text-xs">
            <span className="font-semibold text-gold">Client note: </span>
            <span className="text-muted-foreground">{nextApp.notes}</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => setServiceStarted((v) => !v)}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold shadow-md transition-all",
            serviceStarted
              ? "bg-emerald-600 text-white hover:bg-emerald-500"
              : "bg-primary text-primary-foreground hover:scale-[1.02]",
          )}
        >
          {serviceStarted ? (
            <>
              <CheckCircle2 className="size-4" /> Service In Progress (Click to Complete)
            </>
          ) : (
            <>
              <Play className="size-4" /> Start Service
            </>
          )}
        </button>
      </div>

      {/* TODAY'S FULL SHIFT SCHEDULE */}
      <div className="space-y-3">
        <p className="eyebrow text-muted-foreground">Today&rsquo;s Roster ({todaySchedule.length} Shifts)</p>
        <div className="space-y-2">
          {todaySchedule.map((s) => (
            <div
              key={s.time}
              className="flex items-center justify-between rounded-2xl border border-border bg-card p-3.5 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <span className="w-16 shrink-0 text-xs font-bold text-muted-foreground">{s.time}</span>
                <div>
                  <p className="font-semibold text-xs text-foreground">{s.service}</p>
                  {s.client && <p className="text-[11px] text-muted-foreground">{s.client}</p>}
                </div>
              </div>

              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase border",
                  s.status === "completed" && "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
                  s.status === "upcoming" && "bg-amber-500/10 text-amber-600 border-amber-500/30",
                  s.status === "break" && "bg-slate-500/10 text-slate-600 border-slate-500/30",
                )}
              >
                {s.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
