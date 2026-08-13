import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Clock,
  MapPin,
  Plus,
  Radio,
  Scissors,
  Sparkles,
  TrendingUp,
  UserCheck,
  Zap,
  X,
} from "lucide-react";
import { useState } from "react";
import { CountUp } from "@/components/kit/motion-primitives";
import { useBeautyConStore } from "@/lib/store";
import { inr } from "@/lib/mock-data";

export function Hero() {
  const { appointments, addAppointment, activeBranch } = useBeautyConStore();
  const [isQuickBookOpen, setIsQuickBookOpen] = useState(false);

  // Form State for Instant Real-Time Booking
  const [customerName, setCustomerName] = useState("");
  const [selectedService, setSelectedService] = useState("Hair Spa");
  const [selectedStylist, setSelectedStylist] = useState("Ananya");
  const [bookingPrice, setBookingPrice] = useState(1200);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState("");

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    addAppointment({
      customer: customerName,
      service: selectedService,
      worker: selectedStylist,
      time: "Just now",
      duration: 60,
      amount: Number(bookingPrice),
      status: "confirmed",
    });

    setBookingSuccessMsg(`✓ Booking confirmed for ${customerName} (${selectedService})!`);
    setCustomerName("");
    setTimeout(() => {
      setBookingSuccessMsg("");
      setIsQuickBookOpen(false);
    }, 2000);
  };

  const totalRev = appointments.reduce((acc, curr) => acc + curr.amount, 0) + 48250;
  const totalCount = appointments.length + 42;

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-background text-foreground flex flex-col justify-center">
      {/* Bright & Luminous Luxury Salon Background Picture for 1st Look */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/images/hero_vibrant.png"
          alt="Luxury Salon Spa Interior"
          className="size-full object-cover opacity-85 brightness-[0.92] contrast-[1.05]"
        />
        {/* Soft subtle lighting gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:py-32">
        {/* Real-time Ticker Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-gold/40 bg-card/90 px-4 py-2 text-xs font-bold text-foreground backdrop-blur-xl shadow-lg"
        >
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <span className="size-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="uppercase tracking-wider">Real-Time Sync Active</span>
          </span>
          <span className="h-3 w-px bg-border" />
          <span className="text-gold flex items-center gap-1">
            <Sparkles className="size-3.5 text-gold animate-spin" /> AI Rota Engine Online
          </span>
          <span className="h-3 w-px bg-border hidden sm:inline-block" />
          <span className="text-muted-foreground hidden sm:inline-block">
            {activeBranch} Branch · {totalCount} Live Bookings
          </span>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {/* Hero Left Column: Headline & Primary Actions */}
          <div className="space-y-6">
            <h1 className="font-display text-[clamp(2.5rem,7.5vw,5.8rem)] leading-[1.04] tracking-tight font-extrabold text-foreground">
              Run your salon in <br />
              <span className="text-gradient-gold italic font-normal">Real-Time.</span> <br />
              Without the chaos.
            </h1>

            <p className="max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed font-medium">
              BeautyCon powers your appointments, staff floor rotas, customer retention, and instant settlements in one live operating system.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsQuickBookOpen(true)}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-bold text-primary-foreground transition-all duration-300 hover:scale-[1.03] shadow-xl cursor-pointer"
              >
                <Plus className="size-4 text-gold group-hover:rotate-90 transition-transform" />
                <span>Test Live Booking</span>
              </button>

              <Link
                to="/dashboard/overview"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/90 backdrop-blur-md px-7 py-4 text-sm font-bold transition-all hover:bg-accent hover:border-gold/40 cursor-pointer shadow-md"
              >
                <span>Launch Command Center</span>
                <ArrowRight className="size-4 text-gold" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-3 text-xs font-semibold text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-500" /> Instant 2-min Setup
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-500" /> Multi-Branch Live Rota
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-500" /> Zero Double-Bookings
              </span>
            </div>
          </div>

          {/* Hero Right Column: Real-Time Operational Console Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-[2rem] border border-gold/40 bg-card/95 p-6 backdrop-blur-2xl shadow-2xl space-y-5"
          >
            {/* Console Header */}
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2.5">
                <div className="grid size-9 place-items-center rounded-xl bg-gold/15 text-gold font-bold">
                  <Radio className="size-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-foreground">
                    Salon Operations Console
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="size-3 text-gold" /> {activeBranch} Branch · Live
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                ● Live Floor
              </span>
            </div>

            {/* Metrics Snapshot */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border bg-background/60 p-4 space-y-1">
                <p className="text-[11px] font-bold uppercase text-muted-foreground">Today's Revenue</p>
                <p className="font-display text-2xl font-extrabold text-foreground">
                  <CountUp value={totalRev} prefix="₹" />
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="size-3" /> +18.4% vs Yesterday
                </span>
              </div>

              <div className="rounded-2xl border border-border bg-background/60 p-4 space-y-1">
                <p className="text-[11px] font-bold uppercase text-muted-foreground">Staff Utilization</p>
                <p className="font-display text-2xl font-extrabold text-gold">88%</p>
                <span className="text-[10px] font-bold text-muted-foreground">
                  12 Stylists Active
                </span>
              </div>
            </div>

            {/* Live Staff Chairs Status */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">Active Chairs Real-time Status</span>
                <span className="text-[11px] text-gold font-semibold">Updated 1s ago</span>
              </div>

              <div className="space-y-2">
                {[
                  { name: "Ananya", role: "Senior Stylist", service: "Hair Spa", client: "Maya Krish", time: "14 min left", status: "WITH_CUSTOMER" },
                  { name: "Priya", role: "Skin Therapist", service: "Gold Facial", client: "Riya Sharma", time: "27 min left", status: "WITH_CUSTOMER" },
                  { name: "Arun", role: "Barber", service: "Ready for Walk-in", client: null, time: "Free Now", status: "AVAILABLE" },
                ].map((st) => (
                  <div
                    key={st.name}
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-3 text-xs transition-all hover:border-gold/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid size-8 place-items-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                        {st.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-foreground">
                          {st.name} <span className="text-muted-foreground font-normal">({st.role})</span>
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {st.service} {st.client && `· ${st.client}`}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold border uppercase ${
                        st.status === "WITH_CUSTOMER"
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                          : "bg-blue-500/10 text-blue-600 border-blue-500/30"
                      }`}
                    >
                      {st.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Trigger Bar */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsQuickBookOpen(true)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gold py-3 text-xs font-extrabold text-ink transition-transform hover:scale-[1.01] shadow-md cursor-pointer"
              >
                <Plus className="size-4" /> Create Real-Time Booking
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* REAL-TIME INTERACTIVE QUICK BOOKING MODAL */}
      {isQuickBookOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-3xl border border-gold/40 bg-card p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">Create Real-Time Booking</h3>
                <p className="text-xs text-muted-foreground">Test BeautyCon's instant live booking engine.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsQuickBookOpen(false)}
                className="grid size-8 place-items-center rounded-full hover:bg-accent text-muted-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            {bookingSuccessMsg ? (
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center text-emerald-600 dark:text-emerald-400 space-y-2">
                <CheckCircle2 className="size-8 mx-auto text-emerald-500 animate-bounce" />
                <p className="font-bold text-sm">{bookingSuccessMsg}</p>
                <p className="text-xs opacity-80">Updating live salon rota and revenue metric...</p>
              </div>
            ) : (
              <form onSubmit={handleCreateBooking} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Deepika Sundaram"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-1">
                      Service
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      <option value="Hair Spa">Hair Spa (₹1,200)</option>
                      <option value="Gold Facial">Gold Facial (₹2,400)</option>
                      <option value="Balayage">Balayage (₹5,600)</option>
                      <option value="Gel Manicure">Gel Manicure (₹1,800)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-1">
                      Assigned Stylist
                    </label>
                    <select
                      value={selectedStylist}
                      onChange={(e) => setSelectedStylist(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      <option value="Ananya">Ananya</option>
                      <option value="Priya">Priya</option>
                      <option value="Arun">Arun</option>
                      <option value="Meera">Meera</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1">
                    Booking Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={bookingPrice}
                    onChange={(e) => setBookingPrice(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsQuickBookOpen(false)}
                    className="rounded-xl border border-border px-4 py-2 text-xs font-semibold hover:bg-accent"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-gold px-5 py-2 text-xs font-bold text-ink hover:bg-gold/90 shadow-md"
                  >
                    Confirm Live Booking
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}

