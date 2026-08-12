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
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-2"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-xs font-bold text-gold backdrop-blur-md shadow-sm">
            <Sparkles className="size-3.5 animate-pulse" />
            <span>BeautyCon CRM 3.0 Live</span>
            <span className="h-3 w-px bg-gold/30" />
            <span className="text-[11px] font-semibold opacity-90">AI Client Retention Engine</span>
          </div>
        </motion.div>

        <h1 className="mt-6 font-display text-[clamp(2.8rem,10vw,8.5rem)] leading-[0.88] tracking-[-0.03em] font-extrabold uppercase">
          Run your beauty business. <br />
          <span className="text-gradient-gold italic font-normal lowercase">Without the chaos.</span>
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-md"
          >
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              BeautyCon brings bookings, workforce, customers, payments and business intelligence into one operating system.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/signup"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.03] shadow-md"
              >
                Start Free
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/dashboard/overview"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-accent"
              >
                Explore Product
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-4 text-[11px] text-muted-foreground">
              <span>✓ No credit card required</span>
              <span>✓ Instant 2-min setup</span>
              <span>✓ Cancel anytime</span>
            </div>
          </motion.div>

          {/* Floating live dashboard mockup & Luxury Salon Photo */}
          <div className="relative">
            {/* High-Resolution Luxury Salon Showcase Image */}
            <div className="relative overflow-hidden rounded-3xl border border-gold/30 shadow-2xl group">
              <img
                src="/images/hero_luxury_salon.png"
                alt="Luxury Salon Operating System"
                className="h-[420px] w-full object-cover brightness-[0.85] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            <FloatCard delay={0.5} className="absolute inset-x-4 bottom-4 sm:inset-x-6 backdrop-blur-md bg-card/90 border-gold/40">
              <div className="flex items-center justify-between">
                <div>
                  <p className="eyebrow text-gold font-bold">Today · Anna Nagar Branch</p>
                  <p className="mt-1 font-display text-2xl sm:text-3xl tracking-tight font-extrabold text-foreground">
                    <CountUp value={48250} prefix="₹" />
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="size-3.5" /> +18.4%
                </span>
              </div>
            </FloatCard>

            <FloatCard delay={1.1} className="absolute -bottom-8 -left-4 w-56 sm:-left-8 backdrop-blur-md bg-card/95 border-gold/40">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-gold animate-pulse" />
                <p className="eyebrow text-gold font-bold">AI Intelligence</p>
              </div>
              <p className="mt-1.5 text-xs text-foreground font-semibold leading-snug">
                Move Meera to 6 PM — utilization climbs to <span className="text-gold">94%</span>.
              </p>
            </FloatCard>

            <FloatCard delay={1.4} className="absolute -right-2 -top-6 w-48 sm:-right-6 backdrop-blur-md bg-card/95 border-gold/40">
              <div className="flex items-center gap-2">
                <Bell className="size-4 text-emerald-500 animate-bounce" />
                <p className="text-xs font-bold text-foreground">Live Booking Lock</p>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground font-medium">Maya · Hair Spa · 5:30 PM</p>
            </FloatCard>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
