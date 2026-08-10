import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/kit/motion-primitives";

const nodes = [
  { id: "owner", label: "Owner", x: 18, y: 82 },
  { id: "worker", label: "Worker", x: 50, y: 88 },
  { id: "analytics", label: "Analytics", x: 82, y: 82 },
];

export function RealtimeFlow() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading
          eyebrow="Real time"
          lines={["One booking.", "Zero chaos."]}
          copy="The moment a customer taps confirm, every screen in your business already knows."
          align="center"
        />

        <Reveal delay={0.1} className="mt-14">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-3xl rounded-[2rem] border border-border bg-card p-6 shadow-soft sm:aspect-[16/9]">
            <svg viewBox="0 0 100 100" className="size-full" preserveAspectRatio="none" aria-hidden>
              <motion.path
                d="M50 10 L50 46"
                stroke="var(--border)"
                strokeWidth="0.5"
                fill="none"
              />
              {nodes.map((n) => (
                <g key={n.id}>
                  <path
                    d={`M50 46 C 50 65, ${n.x} 60, ${n.x} ${n.y - 8}`}
                    stroke="var(--border)"
                    strokeWidth="0.5"
                    fill="none"
                  />
                  <motion.path
                    d={`M50 46 C 50 65, ${n.x} 60, ${n.x} ${n.y - 8}`}
                    stroke="var(--gold)"
                    strokeWidth="0.8"
                    fill="none"
                    strokeDasharray="6 40"
                    animate={{ strokeDashoffset: [46, -46] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                  />
                </g>
              ))}
              <motion.path
                d="M50 10 L50 46"
                stroke="var(--gold)"
                strokeWidth="0.8"
                fill="none"
                strokeDasharray="6 30"
                animate={{ strokeDashoffset: [36, -36] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              />
            </svg>

            <Node label="Customer books" sub="Hair Spa · 5:30 PM" x={50} y={10} primary />
            <Node label="BeautyCon engine" sub="Routing · pricing · stock" x={50} y={46} core />
            {nodes.map((n, i) => (
              <Node
                key={n.id}
                label={n.label}
                sub={
                  n.id === "owner" ? "Revenue +₹1,200" : n.id === "worker" ? "Shift updated" : "KPIs recalculated"
                }
                x={n.x}
                y={n.y}
                delay={0.4 + i * 0.15}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Node({
  label,
  sub,
  x,
  y,
  primary,
  core,
  delay = 0,
}: {
  label: string;
  sub: string;
  x: number;
  y: number;
  primary?: boolean;
  core?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      style={{ left: `${x}%`, top: `${y}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className={
          core
            ? "rounded-2xl border border-gold/50 bg-ink px-4 py-3 text-center text-ink-foreground shadow-lift"
            : primary
              ? "rounded-2xl border border-border bg-background px-4 py-3 text-center shadow-soft"
              : "rounded-2xl border border-border bg-background px-3 py-2.5 text-center shadow-soft"
        }
      >
        <p className="whitespace-nowrap text-xs font-bold sm:text-sm">{label}</p>
        <p className={core ? "text-[10px] text-ink-foreground/60 sm:text-xs" : "text-[10px] text-muted-foreground sm:text-xs"}>
          {sub}
        </p>
      </div>
    </motion.div>
  );
}
