import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal, SectionHeading } from "@/components/kit/motion-primitives";

const answer = [
  "Revenue decreased 8%.",
  "The main driver was a 14% drop in weekday afternoon bookings.",
  "I recommend a Tuesday–Thursday promotion on Skin services.",
];

export function AIAssistant() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = answer.map((_, i) => setTimeout(() => setVisible(i + 1), 900 + i * 900));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="absolute left-1/2 top-1/3 size-[38rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gradient-gold)" }}
        aria-hidden
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-5 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          eyebrow="BeautyCon Intelligence"
          lines={["Your business,", "with a second brain."]}
          copy="Ask anything about your salon. It reads every booking, invoice and shift — then tells you what to do next."
        />

        <Reveal delay={0.1}>
          <div className="rounded-[1.75rem] border border-border bg-card p-5 shadow-lift sm:p-7">
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm text-primary-foreground">
                Why was revenue lower this week?
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary">
                <Sparkles className="size-4 text-gold" />
              </span>
              <div className="min-w-0 flex-1 space-y-2">
                <AnimatePresence>
                  {answer.slice(0, visible).map((line) => (
                    <motion.p
                      key={line}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45 }}
                      className="rounded-2xl rounded-tl-md bg-secondary/70 px-4 py-3 text-sm leading-relaxed"
                    >
                      {line}
                    </motion.p>
                  ))}
                </AnimatePresence>
                {visible < answer.length && (
                  <div className="flex gap-1 px-2 py-2" aria-label="Generating response">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        animate={{ opacity: [0.25, 1, 0.25] }}
                        transition={{ duration: 1.1, repeat: Infinity, delay: d * 0.18 }}
                        className="size-1.5 rounded-full bg-muted-foreground"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <AnimatePresence>
              {visible === answer.length && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {["Create Promotion", "View Analytics", "Optimize Schedule"].map((a) => (
                    <button
                      key={a}
                      type="button"
                      className="group inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-xs font-semibold transition-colors hover:bg-secondary"
                    >
                      {a}
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
