import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  Boxes,
  CalendarDays,
  CreditCard,
  HeartHandshake,
  MessageSquare,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/kit/motion-primitives";
import { ServicesShowcase } from "@/components/landing/ServicesShowcase";
import { AIAssistant } from "@/components/landing/AIAssistant";
import { CTASection } from "@/components/landing/CTASection";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — BeautyCon" },
      {
        name: "description",
        content:
          "Booking, AI scheduling, CRM, inventory, payments and analytics — the full BeautyCon feature set for salons and spas.",
      },
      { property: "og:title", content: "Features — BeautyCon" },
      {
        property: "og:description",
        content: "Every system a beauty business runs on, in one product.",
      },
    ],
  }),
  component: FeaturesPage,
});

const features: { icon: LucideIcon; title: string; copy: string }[] = [
  { icon: CalendarDays, title: "Booking engine", copy: "Real-time availability across stylists, chairs and rooms with deposits and no-show protection." },
  { icon: UsersRound, title: "AI workforce scheduling", copy: "Shifts balanced by skill, workload, service duration and customer preference." },
  { icon: HeartHandshake, title: "Customer CRM", copy: "Visit history, formulas, allergies and preferences surfaced before the client sits down." },
  { icon: Boxes, title: "Inventory", copy: "Product consumption deducted per service, with predictive reorder points per branch." },
  { icon: CreditCard, title: "Payments & payouts", copy: "UPI, cards and wallets with automatic commission splits and daily reconciliation." },
  { icon: BarChart3, title: "Analytics", copy: "Revenue, retention, utilization and peak-hour intelligence, updated live." },
  { icon: MessageSquare, title: "Automations", copy: "Reminders, rebooking nudges and win-back campaigns on WhatsApp and SMS." },
  { icon: Sparkles, title: "BeautyCon Intelligence", copy: "Ask a question in plain language, get an answer and a recommended action." },
];

function FeaturesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Product Features"
        title="Every system a salon runs on."
        copy="Eight modules, one database, zero spreadsheets. Built for beauty businesses that operate on the floor, not in a back office."
      />
      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 0.06}>
              <article className="h-full rounded-[1.5rem] border border-border bg-card p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1">
                <f.icon className="size-5 text-gold" />
                <h2 className="mt-5 font-display text-xl tracking-tight">{f.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <ServicesShowcase />
      <AIAssistant />
      <CTASection />
    </SiteLayout>
  );
}
