import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, Loader2, Scissors, Sparkles, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal, SectionHeading } from "@/components/kit/motion-primitives";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Service", value: "Hair Styling", icon: Scissors },
  { label: "Stylist", value: "Ananya", icon: User },
  { label: "Date", value: "Saturday", icon: Sparkles },
  { label: "Time", value: "5:30 PM", icon: Clock },
];

const stages = ["Checking availability…", "Stylist available", "Appointment confirmed"];

export function BookingStory() {
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState(-1);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setStep(0);
      setStage(-1);
      steps.forEach((_, i) => timers.push(setTimeout(() => setStep(i + 1), 700 * (i + 1))));
      stages.forEach((_, i) => timers.push(setTimeout(() => setStage(i), 3200 + i * 900)));
      timers.push(setTimeout(run, 9500));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          eyebrow="Booking"
          lines={["Booking should", "feel effortless."]}
          copy="Four taps from intent to confirmation — with real availability, real stylists and instant payment."
        />

        <Reveal delay={0.1}>
          <div className="rounded-[1.75rem] border border-border bg-card p-5 shadow-lift sm:p-7">
            <div className="space-y-2.5">
              {steps.map((s, i) => {
                const done = step > i;
                return (
                  <motion.div
                    key={s.label}
                    animate={{
                      borderColor: done ? "var(--gold)" : "var(--border)",
                      backgroundColor: done ? "color-mix(in oklab, var(--gold) 8%, transparent)" : "transparent",
                    }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3 rounded-2xl border px-4 py-3.5"
                  >
                    <s.icon className={cn("size-4 shrink-0", done ? "text-gold" : "text-muted-foreground")} />
                    <span className="eyebrow shrink-0 text-muted-foreground">{s.label}</span>
                    <span className="ml-auto min-w-0 truncate text-sm font-semibold">{done ? s.value : "—"}</span>
                    <AnimatePresence>
                      {done && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="grid size-5 shrink-0 place-items-center rounded-full bg-gold"
                        >
                          <Check className="size-3 text-ink" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 min-h-24 rounded-2xl bg-secondary/60 p-4">
              <AnimatePresence mode="wait">
                {stage < 0 ? (
                  <motion.p key="idle" exit={{ opacity: 0 }} className="text-sm text-muted-foreground">
                    Waiting for selection…
                  </motion.p>
                ) : stage < 2 ? (
                  <motion.div
                    key={stage}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2 text-sm font-semibold"
                  >
                    {stage === 0 ? (
                      <Loader2 className="size-4 animate-spin text-gold" />
                    ) : (
                      <Check className="size-4 text-gold" />
                    )}
                    {stages[stage]}
                  </motion.div>
                ) : (
                  <motion.div
                    key="confirmed"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  >
                    <p className="eyebrow text-gold">Appointment confirmed</p>
                    <p className="mt-2 font-display text-2xl tracking-tight">Hair Styling · 5:30 PM</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Ananya · Luxe Studio, Anna Nagar · ₹1,400
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
