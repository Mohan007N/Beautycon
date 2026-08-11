import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const scenes = [
  {
    key: "BOOK",
    title: "Customer books",
    body: ["Hair Spa", "5:30 PM", "with Ananya"],
    note: "Booking confirmed in 9 seconds.",
  },
  {
    key: "SCHEDULE",
    title: "BeautyCon engine",
    body: ["Booking received", "Smart scheduling", "Optimal stylist matched"],
    note: "No calls. No double-booking.",
  },
  {
    key: "OPERATE",
    title: "Ananya's day updates",
    body: ["5:00 PM  Available", "5:30 PM  Hair Spa", "6:30 PM  Facial"],
    note: "The rota rewrites itself.",
  },
  {
    key: "GROW",
    title: "Owner dashboard",
    body: ["Appointments +1", "Revenue +₹1,200", "Utilization +4%"],
    note: "One booking. Zero chaos.",
  },
];

function Scene({
  index,
  progress,
  scene,
}: {
  index: number;
  progress: MotionValue<number>;
  scene: (typeof scenes)[number];
}) {
  const span = 1 / scenes.length;
  const start = index * span;
  const opacity = useTransform(
    progress,
    [
      Math.max(0, start - span * 0.35),
      Math.max(0, Math.min(1, start + span * 0.15)),
      Math.max(0, Math.min(1, start + span * 0.75)),
      Math.min(1, start + span * 1.05),
    ],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [Math.max(0, start - span * 0.35), Math.max(0, Math.min(1, start + span * 0.15))],
    [40, 0],
  );

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <p className="eyebrow text-muted-foreground">{scene.title}</p>
      <div className="mt-5 space-y-2.5">
        {scene.body.map((line) => (
          <div
            key={line}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-soft"
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-secondary">
              <Check className="size-3.5 text-gold" />
            </span>
            <span className="text-sm font-semibold tracking-tight sm:text-base">{line}</span>
          </div>
        ))}
      </div>
      <p className="mt-6 font-display text-xl italic text-muted-foreground">{scene.note}</p>
    </motion.div>
  );
}

export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section ref={ref} className="relative bg-background" style={{ height: `${scenes.length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 lg:grid-cols-2 lg:items-center">
          <div className="relative h-[7.5rem] sm:h-40 lg:h-56">
            {scenes.map((s, i) => {
              const span = 1 / scenes.length;
              const start = i * span;
              return (
                <WordSlot key={s.key} word={s.key} progress={scrollYProgress} start={start} span={span} />
              );
            })}
          </div>
          <div className="relative h-72 sm:h-80">
            {scenes.map((s, i) => (
              <Scene key={s.key} index={i} progress={scrollYProgress} scene={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WordSlot({
  word,
  progress,
  start,
  span,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  span: number;
}) {
  const opacity = useTransform(
    progress,
    [
      Math.max(0, start - span * 0.3),
      Math.max(0, Math.min(1, start + span * 0.12)),
      Math.max(0, Math.min(1, start + span * 0.8)),
      Math.min(1, start + span * 1.05),
    ],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [Math.max(0, start - span * 0.3), Math.min(1, start + span * 1.05)],
    [70, -70],
  );

  return (
    <motion.p
      style={{ opacity, y }}
      className="absolute inset-x-0 font-display text-[clamp(3rem,10vw,8rem)] leading-none tracking-tight"
    >
      {word}
    </motion.p>
  );
}
