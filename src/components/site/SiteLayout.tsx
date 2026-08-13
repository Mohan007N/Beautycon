import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

/** Public marketing shell with a fast fade+scale page transition. */
export function SiteLayout({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.main
        initial={reduce ? false : { opacity: 0, scale: 0.995 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="grid-canvas absolute inset-0 opacity-40" aria-hidden />
      <div
        className="absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--gradient-gold)" }}
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-36 sm:pb-24 sm:pt-44">
        <p className="eyebrow text-muted-foreground">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {copy}
        </p>
      </div>
    </section>
  );
}
