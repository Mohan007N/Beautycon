import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { inr } from "@/lib/mock-data";
import {
  Sparkles,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Calendar,
  Zap,
  ArrowRight,
  MessageSquare,
  Search,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/ai")({
  head: () => ({
    meta: [
      { title: "BeautyCon Intelligence — AI Business Copilot" },
      { name: "description", content: "Actionable salon revenue explanations, schedule optimization, and business copilot." },
      { property: "og:title", content: "BeautyCon Intelligence — AI Business Copilot" },
      { property: "og:description", content: "Actionable business copilot." },
    ],
  }),
  component: Page,
});

export function Page() {
  const [query, setQuery] = useState("");
  const [activeCopilotAnswer, setActiveCopilotAnswer] = useState<{
    q: string;
    ans: string;
    actionLabel?: string;
  } | null>(null);

  const copilotPrompts = [
    "Why is revenue down this week?",
    "Which service generates the highest profit?",
    "Who is my top-performing stylist?",
    "Which high-value clients are at risk of churn?",
    "Optimize Saturday's staffing schedule",
  ];

  const handleAsk = (promptText: string) => {
    setQuery(promptText);
    if (promptText.includes("revenue down")) {
      setActiveCopilotAnswer({
        q: promptText,
        ans: "Revenue dipped 8.4% this week primarily due to a 14% drop in Tuesday & Thursday afternoon slots (2 PM - 5 PM). Morning and weekend slots remain at 94% utilization.",
        actionLabel: "Launch Off-Peak Campaign",
      });
    } else if (promptText.includes("highest profit")) {
      setActiveCopilotAnswer({
        q: promptText,
        ans: "Balayage Hair Colour and 24K Gold Facials yield the highest net margin (68% margin). Balayage has grown +22% MoM.",
        actionLabel: "Promote Balayage Package",
      });
    } else if (promptText.includes("top-performing stylist")) {
      setActiveCopilotAnswer({
        q: promptText,
        ans: "Ananya is your top performer with 86% utilization, 4.9/5 star client rating, and ₹1,48,000 in monthly revenue generated.",
        actionLabel: "View Ananya's Roster",
      });
    } else if (promptText.includes("at risk")) {
      setActiveCopilotAnswer({
        q: promptText,
        ans: "We detected 6 VIP clients (including Dr. Rajesh Iyer) overdue for their regular 24-day visit window. Estimated lost revenue risk: ₹34,000.",
        actionLabel: "Send Automated WhatsApp Reminders",
      });
    } else {
      setActiveCopilotAnswer({
        q: promptText,
        ans: "Analyzing Saturday's load... Moving Meera's shift start to 10 AM increases peak capacity by +14% and eliminates 3 schedule overlap conflicts.",
        actionLabel: "Apply Schedule Optimization",
      });
    }
  };

  return (
    <>
      <PageTitle
        title="BeautyCon Intelligence"
        sub="Your salon operations with an actionable second brain."
      >
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs font-bold text-gold">
            <Sparkles className="size-3.5 animate-pulse" /> AI Engine Active
          </span>
        </div>
      </PageTitle>

      {/* SECTION 1: ACTIONABLE REVENUE ANALYSIS & INSIGHTS */}
      <Panel title="Automated Business Diagnostics">
        <div className="rounded-2xl border border-gold/40 bg-gradient-to-br from-card via-gold/5 to-card p-6 shadow-lift space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
              <Sparkles className="size-4" /> Weekly Performance Diagnostic
            </div>
            <span className="rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-bold text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center gap-1">
              <TrendingDown className="size-3.5" /> Revenue down 8.4% this week
            </span>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold">Primary Reason</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Tuesday & Thursday afternoon slot bookings (2:00 PM – 5:00 PM) decreased by <span className="font-semibold text-foreground">14%</span>. Stylist utilization during off-peak hours dropped to 52%.
            </p>
          </div>

          <div className="pt-2 border-t border-border/80">
            <p className="eyebrow text-muted-foreground mb-3">Recommended Actions</p>
            <div className="grid gap-2 sm:grid-cols-3">
              <button
                type="button"
                className="flex items-center justify-between rounded-xl bg-primary px-4 py-3 text-xs font-semibold text-primary-foreground hover:scale-[1.02] transition-transform shadow-md"
              >
                <span>1. Target 46 Inactive Clients</span>
                <ArrowRight className="size-3.5" />
              </button>
              <button
                type="button"
                className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold hover:bg-accent transition-colors"
              >
                <span>2. Optimize Staffing (4-7 PM)</span>
                <ArrowRight className="size-3.5 text-gold" />
              </button>
              <button
                type="button"
                className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold hover:bg-accent transition-colors"
              >
                <span>3. Create Off-Peak Campaign</span>
                <ArrowRight className="size-3.5 text-gold" />
              </button>
            </div>
          </div>
        </div>
      </Panel>

      {/* SECTION 2: AI BUSINESS COPILOT INTERACTIVE CONVERSATION */}
      <Panel title="AI Business Copilot" className="mt-4">
        <p className="text-xs text-muted-foreground mb-4">
          Ask questions about your revenue, stylists, inventory, or salon schedule.
        </p>

        {/* Quick Query Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {copilotPrompts.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => handleAsk(p)}
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium hover:border-gold/40 hover:text-gold transition-colors"
            >
              &ldquo;{p}&rdquo;
            </button>
          ))}
        </div>

        {/* Search Query Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (query) handleAsk(query);
          }}
          className="relative"
        >
          <Search className="absolute left-4 top-3.5 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Ask BeautyCon Intelligence e.g., 'Who is my top stylist?'..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-2xl border border-border bg-background pl-11 pr-24 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 rounded-xl bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Ask AI
          </button>
        </form>

        {/* Copilot Answer Panel */}
        {activeCopilotAnswer && (
          <div className="mt-4 rounded-2xl border border-border bg-secondary/30 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-gold">
              <Sparkles className="size-4" /> BeautyCon Copilot Response
            </div>
            <p className="text-xs font-semibold text-muted-foreground">&ldquo;{activeCopilotAnswer.q}&rdquo;</p>
            <p className="text-sm text-foreground leading-relaxed font-medium">{activeCopilotAnswer.ans}</p>
            {activeCopilotAnswer.actionLabel && (
              <div className="pt-2">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:scale-[1.02] transition-transform"
                >
                  <Zap className="size-3.5" /> {activeCopilotAnswer.actionLabel}
                </button>
              </div>
            )}
          </div>
        )}
      </Panel>
    </>
  );
}
