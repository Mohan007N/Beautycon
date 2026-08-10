import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Product", to: "/features" },
  { label: "Solutions", to: "/solutions" },
  { label: "Pricing", to: "/pricing" },
  { label: "Resources", to: "/about" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-5">
      <motion.nav
        animate={{ paddingTop: scrolled ? 8 : 14, paddingBottom: scrolled ? 8 : 14 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-full px-4 transition-colors duration-500 sm:px-6 lg:grid-cols-[1fr_auto_1fr]",
          scrolled ? "surface-glass shadow-soft" : "border border-transparent",
        )}
      >
        <Link to="/" className="flex min-w-0 items-center gap-2" aria-label="BeautyCon home">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-extrabold text-primary-foreground">
            B
          </span>
          <span className="truncate font-display text-lg tracking-tight">BeautyCon</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  pathname === l.to && "text-foreground",
                )}
              >
                {pathname === l.to && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-secondary"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-2">
          <Link
            to="/login"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="group hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
          >
            Get Started
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full border border-border bg-card/70 lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="surface-glass absolute inset-x-3 top-20 z-50 rounded-3xl p-4 shadow-lift lg:hidden"
          >
            <ul className="grid gap-1">
              {[...links, { label: "Login", to: "/login" as const }].map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 font-display text-2xl tracking-tight"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground"
            >
              Get Started <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
