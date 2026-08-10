import { motion } from "framer-motion";
import { BarChart3, Boxes, CreditCard, HeartHandshake, UsersRound, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { Reveal, SectionHeading } from "@/components/kit/motion-primitives";
import { cn } from "@/lib/utils";

interface Module {
  key: string;
  icon: LucideIcon;
  desc: string;
  angle: number;
}

const modules: Module[] = [
  { key: "Analytics", icon: BarChart3, desc: "Live P&L, cohort retention and forecast in one view.", angle: -90 },
  { key: "Payments", icon: CreditCard, desc: "UPI, cards, wallets and split payouts, auto-reconciled.", angle: -18 },
  { key: "CRM", icon: HeartHandshake, desc: "Every visit, preference and allergy remembered.", angle: 54 },
  { key: "Workforce", icon: UsersRound, desc: "Shifts, commissions and utilization, auto-balanced.", angle: 126 },
  { key: "Inventory", icon: Boxes, desc: "Product usage deducted per service, reorder predicted.", angle: 198 },
];

export function ERPOrbit() {
  const [hover, setHover] = useState<string | null>(null);
  const active = modules.find((m) => m.key === hover);

  return (
    <section className="relative overflow-hidden border-y border-border bg-ink py-24 text-ink-foreground sm:py-32">
      <div className="grid-canvas absolute inset-0 opacity-[0.06]" aria-hidden />
      <div className="relative mx-auto w-full max-w-6xl px-5">
        <div className="max-w-2xl">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-ink-foreground/60">
            <span className="size-1.5 rounded-full bg-gold" /> ERP command center
          </span>
          <h2 className="mt-6 font-display text-4xl leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
            Every module.
            <br />
            One nervous system.
          </h2>
        </div>

        <Reveal delay={0.1} className="mt-16">
          <div className="relative mx-auto aspect-square w-full max-w-xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[12%] rounded-full border border-dashed border-white/12"
            />
            <div className="absolute inset-[28%] rounded-full border border-white/8" />

            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="grid size-28 place-items-center rounded-full border border-gold/40 bg-ink shadow-lift sm:size-36">
                <span className="font-display text-base tracking-tight sm:text-xl">BEAUTYCON</span>
              </div>
            </div>

            {modules.map((m) => {
              const rad = (m.angle * Math.PI) / 180;
              const r = 42;
              const x = 50 + r * Math.cos(rad);
              const y = 50 + r * Math.sin(rad);
              const isActive = hover === m.key;
              return (
                <div key={m.key} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
                  <motion.button
                    type="button"
                    onMouseEnter={() => setHover(m.key)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(m.key)}
                    onBlur={() => setHover(null)}
                    animate={{ scale: isActive ? 1.12 : 1 }}
                    className={cn(
                      "-translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-2.5 text-xs font-semibold transition-colors sm:px-4 sm:py-3 sm:text-sm",
                      isActive
                        ? "border-gold/60 bg-gold/15 text-ink-foreground"
                        : "border-white/12 bg-white/[0.05] text-ink-foreground/75",
                    )}
                  >
                    <m.icon className="mx-auto mb-1 size-4 text-gold" />
                    {m.key}
                  </motion.button>
                </div>
              );
            })}
          </div>

          <motion.p
            key={active?.key ?? "idle"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-10 max-w-md text-center text-sm text-ink-foreground/60"
          >
            {active ? active.desc : "Hover a module to see how it connects to the core."}
          </motion.p>
        </Reveal>
      </div>
    </section>
  );
}
