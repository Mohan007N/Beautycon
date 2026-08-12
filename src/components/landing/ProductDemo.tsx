import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, ShieldCheck, Clock, CheckCircle2, Sparkles, ArrowRight, Radio, Bell } from "lucide-react";
import { inr } from "@/lib/mock-data";
import { Eyebrow } from "@/components/kit/motion-primitives";

export function ProductDemo() {
  const [activePersona, setActivePersona] = useState<"customer" | "owner" | "worker">("customer");
  const [bookingDone, setBookingDone] = useState(false);

  const personas = [
    { id: "customer", label: "Customer Experience", sub: "Book service in 30 seconds" },
    { id: "owner", label: "Owner Command Center", sub: "Live floor & revenue updates" },
    { id: "worker", label: "Stylist App", sub: "Instant schedule & check-in" },
  ];

  const handleSimulateBooking = () => {
    setBookingDone(true);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-card/40 border-y border-border">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>Interactive Multi-Persona Platform Architecture</Eyebrow>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-semibold tracking-tight">
            One platform. <span className="text-gradient-gold italic">Connected in real time</span>.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            See how a single customer booking instantly syncs across the Owner Command Center and Stylist Mobile App.
          </p>
        </div>

        {/* Persona Selector Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {personas.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePersona(p.id as any)}
              className={`rounded-2xl px-5 py-3 text-left transition-all ${
                activePersona === p.id
                  ? "bg-primary text-primary-foreground shadow-md scale-105"
                  : "border border-border bg-card hover:bg-accent text-muted-foreground"
              }`}
            >
              <p className="text-xs font-bold">{p.label}</p>
              <p className="text-[10px] opacity-80 mt-0.5">{p.sub}</p>
            </button>
          ))}
        </div>

        {/* Interactive Demo View Container */}
        <div className="mt-8 mx-auto max-w-3xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-lift relative">
          <AnimatePresence mode="wait">
            {activePersona === "customer" && (
              <motion.div
                key="customer-demo"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <span className="text-xs font-bold text-gold flex items-center gap-1.5">
                    <User className="size-4" /> CONSUMER MOBILE APP
                  </span>
                  <span className="text-xs text-muted-foreground">Anna Nagar Branch</span>
                </div>

                <div className="rounded-2xl border border-border bg-background p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm">Signature Hair Spa</h4>
                      <p className="text-xs text-muted-foreground">60 mins · Senior Stylist: Ananya</p>
                    </div>
                    <span className="font-bold text-sm text-gold">{inr(1200)}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-2">
                    <span>Slot: Today · 5:30 PM</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <Radio className="size-3 animate-pulse" /> Live Slot Lock
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateBooking}
                  className="w-full rounded-2xl bg-primary py-3.5 text-xs font-bold text-primary-foreground shadow-md hover:scale-[1.01] transition-transform"
                >
                  {bookingDone ? "✓ Appointment Confirmed (Check Owner/Worker tabs!)" : "Simulate Customer Booking"}
                </button>
              </motion.div>
            )}

            {activePersona === "owner" && (
              <motion.div
                key="owner-demo"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <span className="text-xs font-bold text-gold flex items-center gap-1.5">
                    <ShieldCheck className="size-4" /> OWNER COMMAND CENTER
                  </span>
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <Radio className="size-3 animate-pulse" /> Real-time Sync Active
                  </span>
                </div>

                {bookingDone ? (
                  <div className="rounded-2xl border border-gold/40 bg-gold/10 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gold flex items-center gap-1">
                        <Bell className="size-3.5 text-rose animate-bounce" /> NEW REAL-TIME BOOKING RECEIVED
                      </span>
                      <span className="text-[10px] text-muted-foreground">Just now</span>
                    </div>
                    <p className="font-bold text-sm">Maya Krish · Hair Spa (5:30 PM)</p>
                    <p className="text-xs text-muted-foreground">Assigned to Ananya · Revenue +₹1,200</p>
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs text-muted-foreground border border-dashed border-border rounded-2xl">
                    Switch to Customer tab and click &ldquo;Simulate Customer Booking&rdquo; to see live owner notification.
                  </div>
                )}
              </motion.div>
            )}

            {activePersona === "worker" && (
              <motion.div
                key="worker-demo"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <span className="text-xs font-bold text-gold flex items-center gap-1.5">
                    <Clock className="size-4" /> STYLIST APP (ANANYA&rsquo;S SHIFT)
                  </span>
                  <span className="text-xs text-muted-foreground">Roster Auto-updated</span>
                </div>

                {bookingDone ? (
                  <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        ● UPCOMING SHIFT ADDED
                      </span>
                      <span className="text-[10px] text-muted-foreground">5:30 PM Slot</span>
                    </div>
                    <p className="font-bold text-sm">Hair Spa · Client: Maya Krish</p>
                    <p className="text-xs text-muted-foreground">Notes: Sensitive scalp. Prefers organic oil.</p>
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs text-muted-foreground border border-dashed border-border rounded-2xl">
                    Switch to Customer tab and click &ldquo;Simulate Customer Booking&rdquo; to see live stylist shift update.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
