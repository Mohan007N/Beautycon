import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Reveal, SectionHeading } from "@/components/kit/motion-primitives";
import { cn } from "@/lib/utils";

export const plans = [
  {
    name: "Starter",
    monthly: 499,
    tagline: "For small salons finding their rhythm.",
    features: ["Up to 3 stylists", "Online booking page", "Calendar & reminders", "Basic payments", "Daily revenue report"],
  },
  {
    name: "Professional",
    monthly: 999,
    tagline: "For growing businesses that never stop.",
    popular: true,
    features: [
      "Up to 15 stylists",
      "AI workforce scheduling",
      "Inventory & consumption tracking",
      "CRM with visit history",
      "Full analytics suite",
      "WhatsApp & SMS automation",
    ],
  },
  {
    name: "Business",
    monthly: 1999,
    tagline: "For multi-location beauty groups.",
    features: [
      "Unlimited stylists",
      "Multi-branch command center",
      "BeautyCon Intelligence AI",
      "Payroll & commissions",
      "Custom roles & audit log",
      "Priority onboarding",
    ],
  },
];

export function PricingSection({ compact = false }: { compact?: boolean }) {
  const [yearly, setYearly] = useState(false);

  return (
    <section className={cn("py-24 sm:py-32", !compact && "border-t border-border")}>
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading
          eyebrow="Pricing"
          lines={["Priced like software.", "Pays for itself in a week."]}
          align="center"
        />

        <Reveal delay={0.05} className="mt-8">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1">
              {[
                { label: "Monthly", v: false },
                { label: "Yearly · save 20%", v: true },
              ].map((o) => (
                <button
                  key={o.label}
                  type="button"
                  onClick={() => setYearly(o.v)}
                  aria-pressed={yearly === o.v}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                    yearly === o.v ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {yearly === o.v && (
                    <motion.span layoutId="billing-pill" className="absolute inset-0 -z-10 rounded-full bg-primary" />
                  )}
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => {
            const price = yearly ? Math.round(p.monthly * 0.8) : p.monthly;
            return (
              <Reveal key={p.name} delay={0.05 * i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "flex h-full flex-col rounded-[1.75rem] border p-6 sm:p-7",
                    p.popular
                      ? "border-transparent bg-ink text-ink-foreground shadow-lift"
                      : "border-border bg-card shadow-soft",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="eyebrow opacity-70">{p.name}</p>
                    {p.popular && (
                      <span className="eyebrow rounded-full bg-gold px-2.5 py-1 text-ink">Most popular</span>
                    )}
                  </div>

                  <div className="mt-6 flex items-baseline gap-1">
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={price}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                        className="font-display text-5xl tracking-tight"
                      >
                        ₹{price.toLocaleString("en-IN")}
                      </motion.span>
                    </AnimatePresence>
                    <span className={cn("text-sm", p.popular ? "text-ink-foreground/55" : "text-muted-foreground")}>
                      /month
                    </span>
                  </div>
                  <p className={cn("mt-2 text-sm", p.popular ? "text-ink-foreground/60" : "text-muted-foreground")}>
                    {p.tagline}
                  </p>

                  <ul className="mt-7 flex-1 space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                        <span className={p.popular ? "text-ink-foreground/85" : ""}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/signup"
                    className={cn(
                      "group mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold transition-transform duration-300 hover:scale-[1.02]",
                      p.popular
                        ? "bg-gold text-ink"
                        : "border border-border bg-background hover:bg-secondary",
                    )}
                  >
                    Start free trial
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
