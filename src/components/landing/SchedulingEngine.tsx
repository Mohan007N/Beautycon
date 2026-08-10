import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal, SectionHeading } from "@/components/kit/motion-primitives";
import { workers } from "@/lib/mock-data";

const DAY_START = 9;
const DAY_END = 18;
const checks = ["Availability", "Skills", "Workload", "Customer preference", "Service duration"];

const pct = (h: number) => ((h - DAY_START) / (DAY_END - DAY_START)) * 100;

export function SchedulingEngine() {
  const [phase, setPhase] = useState(0); // 0 idle, 1 analyzing, 2 matched, 3 placed

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1200),
      setTimeout(() => setPhase(2), 4200),
      setTimeout(() => setPhase(3), 5400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative border-y border-border bg-ink py-24 text-ink-foreground sm:py-32">
      <div className="grid-canvas absolute inset-0 opacity-[0.07]" aria-hidden />
      <div className="relative mx-auto w-full max-w-6xl px-5">
        <div className="max-w-2xl">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-ink-foreground/60">
            <span className="size-1.5 rounded-full bg-gold" /> Smart workforce
          </span>
          <h2 className="mt-6 font-display text-4xl leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
            Your team.
            <br />
            Perfectly scheduled.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-foreground/60 sm:text-lg">
            Every new booking is routed to the stylist who can deliver it best — balanced for skill,
            workload and the customer's history.
          </p>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="rounded-[1.75rem] border border-white/12 bg-white/[0.04] p-5 sm:p-7">
              <div className="flex justify-between text-xs text-ink-foreground/45">
                <span>09:00</span>
                <span>13:30</span>
                <span>18:00</span>
              </div>
              <div className="mt-5 space-y-5">
                {workers.map((w, wi) => (
                  <div key={w.id}>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">{w.name}</p>
                      <p className="text-xs text-ink-foreground/45">{w.role}</p>
                    </div>
                    <div className="relative mt-2 h-8 overflow-hidden rounded-lg bg-white/[0.06]">
                      {w.blocks.map((b) => (
                        <motion.div
                          key={b.label}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: wi * 0.1, ease: [0.22, 1, 0.36, 1] }}
                          style={{
                            left: `${pct(b.start)}%`,
                            width: `${pct(b.end) - pct(b.start)}%`,
                            transformOrigin: "left",
                          }}
                          className="absolute inset-y-1 truncate rounded-md bg-white/25 px-2 text-[11px] leading-6 text-ink-foreground/85"
                        >
                          {b.label}
                        </motion.div>
                      ))}
                      <AnimatePresence>
                        {phase >= 3 && w.name === "Ananya" && (
                          <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ type: "spring", stiffness: 220, damping: 24 }}
                            style={{
                              left: `${pct(16.5)}%`,
                              width: `${pct(17.5) - pct(16.5)}%`,
                              transformOrigin: "left",
                              background: "var(--gradient-gold)",
                            }}
                            className="absolute inset-y-1 truncate rounded-md px-2 text-[11px] font-semibold leading-6 text-ink"
                          >
                            Hair Spa
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/12 bg-white/[0.04] p-5 sm:p-7">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-gold" />
                <p className="eyebrow text-ink-foreground/55">AI scheduling</p>
              </div>
              <p className="mt-4 text-sm text-ink-foreground/60">Analyzing new booking · Hair Spa · 5:30 PM</p>
              <ul className="mt-4 space-y-2.5">
                {checks.map((c, i) => (
                  <li key={c} className="flex items-center gap-2.5 text-sm">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: phase >= 1 ? 1 : 0 }}
                      transition={{ delay: 0.3 + i * 0.45, type: "spring", stiffness: 300, damping: 20 }}
                      className="grid size-5 shrink-0 place-items-center rounded-full bg-gold"
                    >
                      <Check className="size-3 text-ink" />
                    </motion.span>
                    <span className="text-ink-foreground/80">{c}</span>
                  </li>
                ))}
              </ul>

              <AnimatePresence>
                {phase >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 rounded-2xl border border-gold/40 bg-gold/10 p-4"
                  >
                    <p className="eyebrow text-gold">Optimal match found</p>
                    <p className="mt-2 font-display text-2xl tracking-tight">Ananya → 5:30 PM</p>
                    <p className="mt-1 text-xs text-ink-foreground/55">
                      Utilization 86% → 90% · Zero conflicts
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
