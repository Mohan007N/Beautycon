import { motion } from "framer-motion";
import { ShieldCheck, Star, Zap, Award, Sparkles } from "lucide-react";

export function TrustBar() {
  const brandLogos = [
    { name: "LUXE STUDIOS", tag: "34 Locations" },
    { name: "AURA WELLNESS", tag: "Enterprise" },
    { name: "BELLISSIMA SALONS", tag: "Multi-Chain" },
    { name: "ELEVATE SPA GROUP", tag: "Global Partner" },
    { name: "VELVET BEAUTY CLUB", tag: "VIP Franchise" },
  ];

  return (
    <section className="relative border-y border-border/60 bg-card/40 py-10 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[11px] font-bold text-gold">
              <Star className="size-3 fill-gold" /> TRUSTED BY INDUSTRY LEADERS
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Powering over <span className="font-semibold text-foreground">1,500+ luxury salons, spas & franchises</span> worldwide.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 opacity-80 transition-opacity hover:opacity-100">
            {brandLogos.map((b) => (
              <motion.div
                key={b.name}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <div className="grid size-8 place-items-center rounded-lg border border-border bg-card group-hover:border-gold/50 transition-colors">
                  <Sparkles className="size-3.5 text-gold" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold tracking-wider text-foreground/90 group-hover:text-gold transition-colors">
                    {b.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{b.tag}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dynamic Key Metric Pills */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Total Bookings Processed", val: "2.4M+", icon: Award },
            { label: "Annual Revenue Handled", val: "₹140 Cr+", icon: Zap },
            { label: "Average Client Retention", val: "+42%", icon: Star },
            { label: "Enterprise Platform Uptime", val: "99.99%", icon: ShieldCheck },
          ].map((m) => (
            <div
              key={m.label}
              className="flex items-center gap-3 rounded-2xl border border-border/80 bg-card/80 p-3.5 shadow-soft"
            >
              <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-secondary text-gold">
                <m.icon className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="font-display text-lg font-bold tracking-tight text-foreground">{m.val}</p>
                <p className="truncate text-[11px] text-muted-foreground">{m.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
