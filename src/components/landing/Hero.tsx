import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Bell, Calendar, Sparkles, TrendingUp } from "lucide-react";
import { useRef } from "react";
import { CountUp, Eyebrow } from "@/components/kit/motion-primitives";
import { inr } from "@/lib/mock-data";

const words = ["BEAUTY", "RUNS", "BETTER."];

function FloatCard({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <motion.div
        animate={reduce ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 6 + delay * 2, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-2xl border border-border bg-card/90 p-4 shadow-soft backdrop-blur"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="grid-canvas absolute inset-0 opacity-50" aria-hidden />
      <div
        className="absolute -right-40 -top-32 size-[42rem] rounded-full opacity-45 blur-3xl"
        style={{ background: "var(--gradient-gold)" }}
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" aria-hidden />

      <motion.div style={{ y, opacity: fade }} className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-36 sm:pt-44">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Eyebrow>The beauty business operating system</Eyebrow>
        </motion.div>

        <h1 className="mt-8 font-display text-[clamp(3.2rem,13vw,10.5rem)] leading-[0.86] tracking-[-0.03em]">
          {words.map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.05, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {i === 2 ? <span className="text-gradient-gold italic">{w}</span> : w}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-md"
          >
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Bookings, workforce scheduling, payments, inventory and AI decisions — one system that
              runs the salon while you run the craft.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/signup"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
              >
                Start Free
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                Explore Demo
              </Link>
            </div>
          </motion.div>

          {/* Floating live dashboard mockup */}
          <div className="relative">
            <FloatCard delay={0.5}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="eyebrow text-muted-foreground">Today · Anna Nagar</p>
                  <p className="mt-1 font-display text-3xl tracking-tight">
                    <CountUp value={48250} prefix="₹" />
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-foreground">
                  <TrendingUp className="size-3.5 text-gold" /> +18.4%
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { k: "Appointments", v: 124 },
                  { k: "Utilization", v: 86 },
                  { k: "Retention", v: 91 },
                ].map((s) => (
                  <div key={s.k} className="rounded-xl bg-secondary/60 px-3 py-2.5">
                    <p className="text-lg font-bold tabular-nums">
                      <CountUp value={s.v} suffix={s.k === "Appointments" ? "" : "%"} />
                    </p>
                    <p className="text-[11px] text-muted-foreground">{s.k}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                {[
                  { t: "5:30 PM", s: "Hair Spa", w: "Ananya", a: 1200 },
                  { t: "6:30 PM", s: "Gold Facial", w: "Priya", a: 2400 },
                ].map((a, i) => (
                  <motion.div
                    key={a.t}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
                    className="flex items-center gap-3 rounded-xl border border-border px-3 py-2.5"
                  >
                    <Calendar className="size-4 shrink-0 text-gold" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{a.s}</p>
                      <p className="text-xs text-muted-foreground">
                        {a.t} · {a.w}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold tabular-nums">{inr(a.a)}</span>
                  </motion.div>
                ))}
              </div>
            </FloatCard>

            <FloatCard delay={1.1} className="absolute -bottom-10 -left-4 w-56 sm:-left-10">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-gold" />
                <p className="eyebrow text-muted-foreground">AI Suggestion</p>
              </div>
              <p className="mt-2 text-sm leading-snug">
                Move Meera to 6 PM — utilization climbs to <span className="font-bold">94%</span>.
              </p>
            </FloatCard>

            <FloatCard delay={1.4} className="absolute -right-2 -top-10 w-48 sm:-right-8">
              <div className="flex items-center gap-2">
                <Bell className="size-4 text-rose" />
                <p className="text-xs font-semibold">New booking</p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Maya · Hair Spa · 5:30 PM</p>
            </FloatCard>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
