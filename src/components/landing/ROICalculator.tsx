import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Clock, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Eyebrow } from "@/components/kit/motion-primitives";
import { inr } from "@/lib/mock-data";

export function ROICalculator() {
  const [branches, setBranches] = useState<number>(3);
  const [appointments, setAppointments] = useState<number>(600);
  const [ticketSize, setTicketSize] = useState<number>(1800);

  // Revenue calculation metrics
  const monthlyGrossRevenue = appointments * ticketSize;
  // Estimated 22% boost from AI schedule optimization & automated re-engagement
  const estimatedMonthlyBoost = Math.round(monthlyGrossRevenue * 0.22);
  const hoursSavedPerMonth = branches * 45;
  const annualBoost = estimatedMonthlyBoost * 12;

  return (
    <section className="py-24 relative overflow-hidden bg-card/50 border-t border-border">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>Interactive SaaS Value Calculator</Eyebrow>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-semibold tracking-tight">
            Calculate your salon&rsquo;s <span className="text-gradient-gold italic">growth potential</span>.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            See how much revenue your salon chain unlocks by plugging schedule gaps, eliminating no-shows, and automating client re-engagement.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr] items-center">
          {/* Sliders Input Panel */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-soft space-y-6">
            <div className="flex items-center gap-2 font-semibold text-sm">
              <Calculator className="size-4 text-gold" /> Salon Chain Parameters
            </div>

            {/* Slider 1: Branches */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-muted-foreground">Number of Branches</span>
                <span className="text-gold font-bold text-sm">{branches} Locations</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={branches}
                onChange={(e) => setBranches(Number(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-gold"
              />
            </div>

            {/* Slider 2: Monthly Appointments */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-muted-foreground">Monthly Appointments (per branch)</span>
                <span className="text-gold font-bold text-sm">{appointments.toLocaleString()} Clients</span>
              </div>
              <input
                type="range"
                min="100"
                max="3000"
                step="50"
                value={appointments}
                onChange={(e) => setAppointments(Number(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-gold"
              />
            </div>

            {/* Slider 3: Average Ticket Size */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-muted-foreground">Average Ticket / Service Price</span>
                <span className="text-gold font-bold text-sm">{inr(ticketSize)}</span>
              </div>
              <input
                type="range"
                min="300"
                max="10000"
                step="100"
                value={ticketSize}
                onChange={(e) => setTicketSize(Number(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-gold"
              />
            </div>

            <p className="text-[11px] text-muted-foreground italic border-t border-border pt-4">
              *Calculated using benchmarked retention data across BeautyCon OS salon clients over 12 months.
            </p>
          </div>

          {/* Dynamic Growth Results Card */}
          <div className="rounded-3xl border border-gold/40 bg-gradient-to-br from-card via-gold/5 to-card p-6 sm:p-8 shadow-lift relative">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-xs font-bold text-gold mb-6 border border-gold/30">
              <Sparkles className="size-3.5" /> PROJECTED ANNUAL BOOST
            </div>

            <div className="space-y-6">
              <div>
                <p className="eyebrow text-muted-foreground">Est. Additional Annual Revenue</p>
                <p className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mt-1">
                  +{inr(annualBoost)} <span className="text-xs font-normal text-muted-foreground">/ year</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y border-border py-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <TrendingUp className="size-3.5 text-emerald-500" /> Monthly Revenue Lift
                  </div>
                  <p className="font-display text-xl font-bold text-emerald-600 dark:text-emerald-400">
                    +{inr(estimatedMonthlyBoost)}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <Clock className="size-3.5 text-gold" /> Admin Hours Saved
                  </div>
                  <p className="font-display text-xl font-bold text-foreground">
                    {hoursSavedPerMonth} hrs / mo
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/signup"
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-semibold text-primary-foreground shadow-md hover:scale-[1.02] transition-all"
                >
                  Claim Your Salon Growth Demo
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
