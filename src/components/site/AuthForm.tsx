import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

/** Front-end only auth form — mock submit until a backend is connected. */
export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(mode === "login" ? "Welcome back to BeautyCon" : "Workspace created — explore the demo");
    }, 900);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-ink p-12 text-ink-foreground lg:block">
        <div className="grid-canvas absolute inset-0 opacity-[0.07]" aria-hidden />
        <div className="absolute -bottom-32 -left-24 size-[34rem] rounded-full opacity-35 blur-3xl" style={{ background: "var(--gradient-gold)" }} aria-hidden />
        <div className="relative flex h-full flex-col justify-between">
          <Link to="/" className="font-display text-xl tracking-tight">BeautyCon</Link>
          <div>
            <p className="font-display text-5xl leading-[0.98] tracking-tight">One booking.<br />Zero chaos.</p>
            <p className="mt-5 max-w-sm text-sm text-ink-foreground/60">Book. Schedule. Operate. Grow.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-background px-5 py-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-sm">
          <Link to="/" className="font-display text-xl tracking-tight lg:hidden">BeautyCon</Link>
          <h1 className="mt-6 font-display text-4xl tracking-tight lg:mt-0">
            {mode === "login" ? "Welcome back" : "Create your workspace"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "login" ? "Sign in to your salon console." : "14 days free. No card required."}
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-3">
            {mode === "signup" && (
              <Field label="Salon name" id="salon" type="text" placeholder="Luxe Studio" />
            )}
            <Field label="Email" id="email" type="email" placeholder="you@salon.com" />
            <Field label="Password" id="password" type="password" placeholder="••••••••" />
            <button
              type="submit"
              disabled={loading}
              className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60"
            >
              {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Start free trial"}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            {mode === "login" ? (
              <>New to BeautyCon? <Link to="/signup" className="font-semibold text-foreground underline-offset-4 hover:underline">Create an account</Link></>
            ) : (
              <>Already running BeautyCon? <Link to="/login" className="font-semibold text-foreground underline-offset-4 hover:underline">Sign in</Link></>
            )}
          </p>
          <p className="mt-3 text-sm">
            <Link to="/dashboard" className="font-semibold text-gold underline-offset-4 hover:underline">Skip and explore the demo →</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ label, id, type, placeholder }: { label: string; id: string; type: string; placeholder: string }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow text-muted-foreground">{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        required
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
