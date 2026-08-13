import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  Zap,
  Award,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const scenes = [
  {
    key: "BOOK",
    stepNum: "01",
    title: "Customer books",
    subtitle: "Direct online & mobile booking",
    icon: CalendarCheck,
    body: [
      { label: "Service", val: "Hair Spa", tag: "Premium" },
      { label: "Time Slot", val: "5:30 PM", tag: "Prime Time" },
      { label: "Requested Stylist", val: "with Ananya", tag: "Senior Stylist" },
    ],
    note: "Booking confirmed in 9 seconds.",
    visualBadge: "Instant Confirmation",
    color: "from-amber-500/20 to-gold/20",
    badgeColor: "bg-gold/15 text-gold border-gold/30",
  },
  {
    key: "SCHEDULE",
    stepNum: "02",
    title: "BeautyCon engine",
    subtitle: "AI-driven workforce routing",
    icon: Zap,
    body: [
      { label: "Trigger", val: "Booking received", tag: "Real-time" },
      { label: "Optimization", val: "Smart scheduling", tag: "AI Engine" },
      { label: "Allocation", val: "Optimal stylist matched", tag: "Zero Conflict" },
    ],
    note: "No calls. No double-booking.",
    visualBadge: "Automated Routing",
    color: "from-blue-500/20 to-indigo-500/20",
    badgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  },
  {
    key: "OPERATE",
    stepNum: "03",
    title: "Ananya's day updates",
    subtitle: "Live staff rota & shift sync",
    icon: Clock,
    body: [
      { label: "5:00 PM", val: "Available", tag: "Prep Slot" },
      { label: "5:30 PM", val: "Hair Spa", tag: "In Progress" },
      { label: "6:30 PM", val: "Facial", tag: "Upcoming" },
    ],
    note: "The rota rewrites itself.",
    visualBadge: "Live Rota Sync",
    color: "from-emerald-500/20 to-teal-500/20",
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  {
    key: "GROW",
    stepNum: "04",
    title: "Owner dashboard",
    subtitle: "Executive intelligence & yield growth",
    icon: TrendingUp,
    body: [
      { label: "Bookings Today", val: "Appointments +1", tag: "+100%" },
      { label: "Daily Revenue", val: "Revenue +₹1,200", tag: "Settled" },
      { label: "Capacity Peak", val: "Utilization +4%", tag: "Optimal 90%" },
    ],
    note: "One booking. Zero chaos.",
    visualBadge: "Financial Growth",
    color: "from-purple-500/20 to-rose-500/20",
    badgeColor: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  },
];

export function ScrollStory() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % scenes.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const activeScene = scenes[activeIdx];

  return (
    <section className="relative overflow-hidden border-y border-border bg-ink py-20 text-ink-foreground sm:py-28">
      {/* Background Decor */}
      <div className="grid-canvas absolute inset-0 opacity-[0.06]" aria-hidden />
      <div
        className="absolute -left-40 top-1/4 size-[36rem] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "var(--gradient-gold)" }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-5">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold backdrop-blur-md">
            <Sparkles className="size-3.5 animate-pulse text-gold" />
            <span>LIFECYCLE OF A BOOKING</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-white">
            One Booking. <span className="text-gradient-gold italic font-normal">Zero Chaos.</span>
          </h2>
          <p className="mt-4 text-base text-ink-foreground/60 sm:text-lg leading-relaxed">
            Watch how a single client appointment seamlessly updates workforce rotas, matches optimal stylists, and drives salon revenue in real-time.
          </p>
        </div>

        {/* Step Navigation Bar */}
        <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
          {scenes.map((s, idx) => {
            const isActive = idx === activeIdx;
            const Icon = s.icon;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => {
                  setActiveIdx(idx);
                  setAutoPlay(false);
                }}
                className={cn(
                  "relative flex items-center gap-2.5 rounded-2xl px-4 py-3 text-xs font-bold transition-all duration-300 cursor-pointer border",
                  isActive
                    ? "border-gold/60 bg-gold/15 text-gold shadow-lg shadow-gold/10 scale-[1.03]"
                    : "border-white/10 bg-white/[0.03] text-ink-foreground/60 hover:bg-white/[0.08] hover:text-white",
                )}
              >
                <span className="grid size-6 place-items-center rounded-lg bg-white/10 text-[10px] font-extrabold">
                  {s.stepNum}
                </span>
                <Icon className="size-4 shrink-0" />
                <span className="tracking-wider">{s.key}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Pictorial Showcase Box */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-white/15 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-10 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScene.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center"
            >
              {/* Left Column: Context & Details */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="eyebrow rounded-full bg-gold/20 px-3 py-1 text-gold font-bold">
                      Step {activeScene.stepNum}
                    </span>
                    <span className={cn("rounded-full border px-3 py-1 text-[11px] font-semibold", activeScene.badgeColor)}>
                      {activeScene.visualBadge}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {activeScene.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-foreground/60 font-medium">
                    {activeScene.subtitle}
                  </p>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {activeScene.body.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 shadow-sm transition-colors hover:border-gold/30"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <CheckCircle2 className="size-4 shrink-0 text-gold" />
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase text-ink-foreground/45">
                            {item.label}
                          </p>
                          <p className="text-sm font-bold text-white truncate">{item.val}</p>
                        </div>
                      </div>
                      <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold text-ink-foreground/80">
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Outcome Note Pill */}
                <div className="flex items-center gap-3 rounded-2xl border border-gold/30 bg-gold/10 p-4 text-gold">
                  <Award className="size-5 shrink-0" />
                  <p className="font-display text-base font-bold tracking-tight">
                    {activeScene.note}
                  </p>
                </div>
              </div>

              {/* Right Column: High-Impact Visual Graphic Card */}
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br p-6 sm:p-8 shadow-2xl space-y-5" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(20,20,20,0.8) 100%)" }}>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      BeautyCon OS · Visual Engine
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-ink-foreground/50">
                    STATUS: LIVE_SYNC
                  </span>
                </div>

                {/* Pictorial Representation Card Content */}
                {activeScene.key === "BOOK" && (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-gold/40 bg-card/90 p-4 text-foreground shadow-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="grid size-10 place-items-center rounded-xl bg-gold/20 text-gold font-bold">
                            MK
                          </span>
                          <div>
                            <p className="font-bold text-sm">Maya Krish</p>
                            <p className="text-xs text-muted-foreground">Client ID #8492</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          Confirmed
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-xl bg-secondary p-2">
                          <p className="text-[10px] text-muted-foreground">Service</p>
                          <p className="text-xs font-bold">Hair Spa</p>
                        </div>
                        <div className="rounded-xl bg-secondary p-2">
                          <p className="text-[10px] text-muted-foreground">Time</p>
                          <p className="text-xs font-bold">5:30 PM</p>
                        </div>
                        <div className="rounded-xl bg-secondary p-2">
                          <p className="text-[10px] text-muted-foreground">Stylist</p>
                          <p className="text-xs font-bold text-gold">Ananya</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 p-3 text-xs">
                      <span className="text-ink-foreground/60">Booking Duration</span>
                      <span className="font-bold text-white">9 Seconds Total</span>
                    </div>
                  </div>
                )}

                {activeScene.key === "SCHEDULE" && (
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 text-white space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-blue-400">AI Routing Matrix</span>
                        <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold">99.8% Match</span>
                      </div>
                      <div className="space-y-2">
                        {["Skill Match: Hair Spa Certified", "Workload Balance: 82% → 90%", "Customer Preference: Ananya (Preferred)"].map((m) => (
                          <div key={m} className="flex items-center gap-2 text-xs font-semibold">
                            <CheckCircle2 className="size-3.5 text-blue-400 shrink-0" />
                            <span>{m}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-center text-xs font-bold text-emerald-400">
                      ✓ Zero Conflicts Detected · Schedule Locked
                    </div>
                  </div>
                )}

                {activeScene.key === "OPERATE" && (
                  <div className="space-y-2.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-ink-foreground/50">Ananya's Live Shift Timeline</p>
                    {[
                      { time: "5:00 PM", task: "Available / Prep", status: "Available", bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" },
                      { time: "5:30 PM", task: "Hair Spa (Maya K)", status: "In Progress", bg: "bg-gold/20 border-gold/40 text-gold font-bold" },
                      { time: "6:30 PM", task: "Gold Facial (Riya S)", status: "Upcoming", bg: "bg-blue-500/10 border-blue-500/30 text-blue-400" },
                    ].map((slot) => (
                      <div key={slot.time} className={cn("flex items-center justify-between rounded-xl border p-3 text-xs", slot.bg)}>
                        <span className="font-bold">{slot.time}</span>
                        <span>{slot.task}</span>
                        <span className="rounded-full px-2 py-0.5 text-[10px] uppercase font-bold">{slot.status}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeScene.key === "GROW" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                      <p className="text-xs text-ink-foreground/60">New Booking</p>
                      <p className="mt-1 font-display text-2xl font-extrabold text-gold">+1 Appt</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                      <p className="text-xs text-ink-foreground/60">Revenue Impact</p>
                      <p className="mt-1 font-display text-2xl font-extrabold text-emerald-400">+₹1,200</p>
                    </div>
                    <div className="col-span-2 rounded-2xl border border-gold/30 bg-gold/10 p-4 text-center">
                      <p className="text-xs text-gold font-semibold">Salon Utilization Peak</p>
                      <p className="mt-0.5 font-display text-3xl font-extrabold text-white">+4% Growth</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Complete 4-Step Pictorial Workflow Grid (All 4 Steps Visible Side-by-Side) */}
        <div className="mt-12">
          <p className="text-center text-xs font-bold tracking-widest uppercase text-gold/80 mb-6">
            FULL WORKFLOW OVERVIEW · 4 STAGES
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {scenes.map((s, i) => (
              <div
                key={s.key}
                onClick={() => {
                  setActiveIdx(i);
                  setAutoPlay(false);
                }}
                className={cn(
                  "rounded-2xl border p-4 transition-all duration-300 cursor-pointer space-y-3",
                  i === activeIdx
                    ? "border-gold bg-gold/10 shadow-lg shadow-gold/5"
                    : "border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.05]",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-gold">STEP {s.stepNum}</span>
                  <span className="text-xs font-mono text-ink-foreground/40">{s.key}</span>
                </div>
                <h4 className="font-display text-lg font-bold text-white">{s.title}</h4>
                <div className="space-y-1 text-xs text-ink-foreground/70">
                  {s.body.map((b) => (
                    <div key={b.label} className="flex justify-between">
                      <span className="text-ink-foreground/50">{b.label}:</span>
                      <span className="font-semibold text-white truncate max-w-[120px]">{b.val}</span>
                    </div>
                  ))}
                </div>
                <p className="pt-2 border-t border-white/10 text-[11px] font-bold text-gold">
                  {s.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

