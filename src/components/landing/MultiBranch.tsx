import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { CountUp, Reveal, SectionHeading } from "@/components/kit/motion-primitives";
import { locations } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function MultiBranch() {
  const [selected, setSelected] = useState(locations[0]!.branches[0]!.name);
  const branch =
    locations.flatMap((l) => l.branches).find((b) => b.name === selected) ?? locations[0]!.branches[0]!;

  return (
    <section className="border-y border-border bg-champagne/40 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading
          eyebrow="Multi-branch"
          lines={["Every location.", "One command line."]}
          copy="Switch a branch and the whole business view follows — revenue, staffing, footfall and customers."
        />

        <Reveal delay={0.1} className="mt-12">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.4fr]">
            <div className="rounded-[1.75rem] border border-border bg-card p-5 shadow-soft">
              <p className="eyebrow text-muted-foreground">BeautyCon locations</p>
              <div className="mt-5 space-y-6">
                {locations.map((loc) => (
                  <div key={loc.city}>
                    <p className="font-display text-xl tracking-tight">{loc.city}</p>
                    <ul className="mt-2 space-y-1">
                      {loc.branches.map((b) => (
                        <li key={b.name}>
                          <button
                            type="button"
                            onClick={() => setSelected(b.name)}
                            aria-pressed={selected === b.name}
                            className={cn(
                              "flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
                              selected === b.name
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                            )}
                          >
                            <MapPin className="size-3.5 shrink-0" />
                            {b.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-border bg-card p-5 shadow-soft sm:p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={branch.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="eyebrow text-muted-foreground">Now viewing</p>
                  <p className="mt-2 font-display text-4xl tracking-tight">{branch.name}</p>
                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    {[
                      { k: "Monthly revenue", v: branch.revenue, prefix: "₹" },
                      { k: "Appointments", v: branch.appointments, prefix: "" },
                      { k: "Team members", v: branch.workers, prefix: "" },
                      { k: "Active customers", v: branch.customers, prefix: "" },
                    ].map((s) => (
                      <div key={s.k} className="rounded-2xl border border-border bg-background p-4">
                        <p className="eyebrow text-muted-foreground">{s.k}</p>
                        <p className="mt-2 font-display text-3xl tracking-tight">
                          <CountUp value={s.v} prefix={s.prefix} duration={900} />
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
