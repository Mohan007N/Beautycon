import { motion } from "framer-motion";
import { Coffee, Play, Star, Check, X } from "lucide-react";
import { useState } from "react";
import { Reveal, SectionHeading } from "@/components/kit/motion-primitives";
import { workerDay } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const categories = ["Hair", "Nails", "Skin", "Spa"];
const salons = [
  { name: "Luxe Studio", rating: 4.9, next: "Today · 5:30 PM", area: "Anna Nagar", img: "/images/hair_spa.png" },
  { name: "Atelier Rouge", rating: 4.8, next: "Today · 6:15 PM", area: "T. Nagar", img: "/images/gold_facial.png" },
  { name: "Maison Skin", rating: 5.0, next: "Tomorrow · 11:00 AM", area: "Velachery", img: "/images/balayage.png" },
];

export function ExperienceSection() {
  const [active, setActive] = useState("Hair");
  const [status, setStatus] = useState<"idle" | "started" | "done">("idle");

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading
          eyebrow="Two apps, one system"
          lines={["Less administration.", "More beauty."]}
          copy="Customers book in seconds. Stylists run their day from their pocket. Both stay in sync with the salon floor."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Customer app */}
          <Reveal>
            <div className="rounded-[2rem] border border-border bg-card p-5 shadow-lift sm:p-7">
              <p className="eyebrow text-muted-foreground">Customer app</p>
              <p className="mt-4 font-display text-3xl tracking-tight">Good morning, Maya</p>
              <p className="mt-1 text-sm text-muted-foreground">What are you looking for?</p>

              <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActive(c)}
                    className={cn(
                      "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300",
                      active === c
                        ? "border-transparent bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:bg-secondary",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <p className="eyebrow mt-7 text-muted-foreground">Popular near you</p>
              <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                {salons.map((s, i) => (
                  <motion.article
                    key={s.name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="w-56 shrink-0 rounded-2xl border border-border bg-background p-4"
                  >
                    <div className="h-24 overflow-hidden rounded-xl bg-secondary border border-border/50">
                      <img src={s.img} alt={s.name} className="size-full object-cover transition-transform duration-500 hover:scale-105" />
                    </div>
                    <p className="mt-3 font-semibold">{s.name}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="size-3 fill-gold text-gold" /> {s.rating} · {s.area}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-gold">{s.next}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Worker app */}
          <Reveal delay={0.1}>
            <div className="rounded-[2rem] border border-border bg-ink p-5 text-ink-foreground shadow-lift sm:p-7">
              <p className="eyebrow text-ink-foreground/50">Worker app · Today</p>
              <p className="mt-4 font-display text-3xl tracking-tight">Ananya's day</p>

              <div className="mt-5 space-y-2">
                {workerDay.map((s) => (
                  <div
                    key={s.time}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border px-4 py-3",
                      s.state === "active"
                        ? "border-gold/50 bg-gold/10"
                        : "border-white/10 bg-white/[0.04]",
                    )}
                  >
                    <span className="w-12 shrink-0 text-xs tabular-nums text-ink-foreground/50">{s.time}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{s.title}</p>
                      {s.client && <p className="text-xs text-ink-foreground/50">{s.client}</p>}
                    </div>
                    {s.state === "done" && <Check className="size-4 shrink-0 text-gold" />}
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { label: "Start service", icon: Play, key: "started" as const },
                  { label: "Complete", icon: Check, key: "done" as const },
                  { label: "Break", icon: Coffee, key: "idle" as const },
                  { label: "No-show", icon: X, key: "idle" as const },
                ].map((b) => (
                  <button
                    key={b.label}
                    type="button"
                    onClick={() => setStatus(b.key)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/12 px-3 py-2.5 text-xs font-semibold transition-colors hover:bg-white/10"
                  >
                    <b.icon className="size-3.5" />
                    {b.label}
                  </button>
                ))}
              </div>

              <motion.p
                key={status}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-xs text-ink-foreground/55"
              >
                {status === "started"
                  ? "Facial in progress · timer running · owner notified"
                  : status === "done"
                    ? "Service completed · invoice generated · ₹2,400 collected"
                    : "Tap an action to update the floor in real time."}
              </motion.p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
