import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimatedText } from "@/components/kit/motion-primitives";

export function CTASection() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-ink text-ink-foreground">
      <div className="grid-canvas absolute inset-0 opacity-[0.06]" aria-hidden />
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.15, 1], opacity: [0.28, 0.42, 0.28] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "var(--gradient-gold)" }}
      />
      <div className="relative mx-auto w-full max-w-5xl px-5 py-24 text-center">
        <h2 className="font-display text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.94] tracking-tight">
          <AnimatedText lines={["Ready to run", "beauty differently?"]} />
        </h2>
        <p className="mx-auto mt-7 max-w-lg text-base text-ink-foreground/60 sm:text-lg">
          One platform for every appointment, every worker, and every decision.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/signup"
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
          >
            Start Free
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold transition-colors hover:bg-white/10"
          >
            Explore Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
