import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, MessageSquare, Sparkles, TrendingUp, ShieldAlert, Award, ArrowRight, Phone, Mail } from "lucide-react";
import { inr } from "@/lib/mock-data";
import { Eyebrow } from "@/components/kit/motion-primitives";

interface CRMLead {
  id: string;
  name: string;
  stage: "leads" | "consultation" | "active" | "vip" | "churn_risk";
  ltv: number;
  score: number;
  lastVisit: string;
  preferredService: string;
  tags: string[];
  notes: string;
}

const pipelineData: CRMLead[] = [
  {
    id: "crm-1",
    name: "Priya Sundaram",
    stage: "vip",
    ltv: 48500,
    score: 98,
    lastVisit: "2 days ago",
    preferredService: "Gold Facial & Hair Spa",
    tags: ["#VIPPlatinum", "#HighLTV", "#WeeklyRegular"],
    notes: "Prefers Ananya as Senior Stylist. Always books weekend slots.",
  },
  {
    id: "crm-2",
    name: "Kavya Menon",
    stage: "active",
    ltv: 24200,
    score: 85,
    lastVisit: "1 week ago",
    preferredService: "Balayage Color Refresh",
    tags: ["#ColorLoyalist", "#ReferralSource"],
    notes: "Referred 3 new clients this month. Target for loyalty upgrade.",
  },
  {
    id: "crm-3",
    name: "Ananya Sharma",
    stage: "consultation",
    ltv: 8900,
    score: 72,
    lastVisit: "Scheduled Tomorrow",
    preferredService: "Bridal Package Consultation",
    tags: ["#Bridal2026", "#HighIntentLead"],
    notes: "Inquired about full bridal makeup package for 6 bridesmaids.",
  },
  {
    id: "crm-4",
    name: "Dr. Rajesh Iyer",
    stage: "churn_risk",
    ltv: 31000,
    score: 45,
    lastVisit: "48 days ago",
    preferredService: "Beard Sculpt & Executive Facials",
    tags: ["#AtRisk", "#AutomatedSMSQueued"],
    notes: "AI Triggered: Overdue for monthly grooming. Send 15% re-engagement offer.",
  },
  {
    id: "crm-5",
    name: "Deepika Rao",
    stage: "leads",
    ltv: 0,
    score: 64,
    lastVisit: "Instagram Ad Lead",
    preferredService: "Keratin Smooth Treatment",
    tags: ["#NewLead", "#InstaCampaign"],
    notes: "Downloaded service menu PDF. Automated WhatsApp sequence active.",
  },
];

export function CRMPipelineDemo() {
  const [activeStage, setActiveStage] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<CRMLead>(pipelineData[0]!);
  const [actionDone, setActionDone] = useState<string | null>(null);

  const stages = [
    { id: "all", label: "All Pipeline" },
    { id: "vip", label: "👑 VIP Loyalists" },
    { id: "active", label: "✨ Active Clients" },
    { id: "consultation", label: "📅 Consultation" },
    { id: "churn_risk", label: "⚠️ Churn Risk Alerts" },
    { id: "leads", label: "🎯 New Inbound Leads" },
  ];

  const filteredLeads =
    activeStage === "all"
      ? pipelineData
      : pipelineData.filter((l) => l.stage === activeStage);

  const handleAction = (msg: string) => {
    setActionDone(msg);
    setTimeout(() => setActionDone(null), 3000);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-card/30 to-background">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>Integrated Client CRM & Lifecycle Engine</Eyebrow>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-semibold tracking-tight">
            Turn one-time visitors into <span className="text-gradient-gold italic">lifetime VIPs</span>.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Automated lead capture, client LTV scoring, smart segmentation, and AI re-engagement rules — all inside a single CRM interface.
          </p>
        </div>

        {/* Stage Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {stages.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveStage(s.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                activeStage === s.id
                  ? "bg-primary text-primary-foreground shadow-md scale-105"
                  : "border border-border bg-card hover:bg-accent text-muted-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Interactive CRM Split View */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start">
          {/* Lead List Cards */}
          <div className="space-y-3">
            {filteredLeads.map((lead) => {
              const isSelected = selectedLead.id === lead.id;
              return (
                <motion.div
                  key={lead.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedLead(lead)}
                  className={`cursor-pointer rounded-2xl border p-4.5 transition-all shadow-soft ${
                    isSelected
                      ? "border-gold/50 bg-gold/5 ring-1 ring-gold/30"
                      : "border-border bg-card/80 hover:border-border/80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary font-bold text-sm">
                        {lead.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm">{lead.name}</h4>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                              lead.stage === "vip"
                                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                                : lead.stage === "churn_risk"
                                ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 animate-pulse"
                                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                            }`}
                          >
                            {lead.stage.replace("_", " ")}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {lead.preferredService} · {lead.lastVisit}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-display text-sm font-bold text-gold">{inr(lead.ltv)}</p>
                      <p className="text-[10px] text-muted-foreground">LTV Score: {lead.score}/100</p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {lead.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-secondary/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CRM Client Detail Inspector Drawer Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLead.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl border border-border bg-card p-6 shadow-lift sticky top-24"
            >
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="grid size-12 place-items-center rounded-2xl bg-gradient-gold text-ink font-bold text-lg shadow-sm">
                    {selectedLead.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">{selectedLead.name}</h3>
                    <p className="text-xs text-muted-foreground">Customer ID: {selectedLead.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="eyebrow text-muted-foreground">Lifetime Value</p>
                  <p className="font-display text-2xl font-bold text-gold">{inr(selectedLead.ltv)}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-secondary/40 p-3">
                  <p className="text-[11px] text-muted-foreground">Lead Health Score</p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full bg-gold transition-all duration-500"
                        style={{ width: `${selectedLead.score}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold">{selectedLead.score}%</span>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-secondary/40 p-3">
                  <p className="text-[11px] text-muted-foreground">Preferred Treatment</p>
                  <p className="mt-1 truncate text-xs font-semibold">{selectedLead.preferredService}</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-border/80 bg-background/50 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-gold mb-1">
                  <Sparkles className="size-3.5" /> AI CRM Insights & Notes
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{selectedLead.notes}</p>
              </div>

              {actionDone && (
                <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <UserCheck className="size-4" /> {actionDone}
                </div>
              )}

              {/* CRM Quick Actions Bar */}
              <div className="mt-6 space-y-2">
                <p className="eyebrow text-muted-foreground">Automated CRM Triggers</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleAction(`WhatsApp Re-engagement Sent to ${selectedLead.name}!`)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors"
                  >
                    <MessageSquare className="size-3.5" /> Send WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAction(`Appointment Slot Link Emailed to ${selectedLead.name}!`)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs font-semibold hover:bg-accent transition-colors"
                  >
                    <Mail className="size-3.5 text-gold" /> Send Slot Link
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
