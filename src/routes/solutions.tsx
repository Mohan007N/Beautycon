import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/kit/motion-primitives";
import { MultiBranch } from "@/components/landing/MultiBranch";
import { CTASection } from "@/components/landing/CTASection";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — BeautyCon for salons, spas & chains" },
      {
        name: "description",
        content: "How BeautyCon fits independent salons, luxury spas, barbershops, nail bars and multi-branch beauty groups.",
      },
      { property: "og:title", content: "Solutions — BeautyCon" },
      { property: "og:description", content: "Built for every shape of beauty business." },
    ],
  }),
  component: SolutionsPage,
});

const segments = [
  { title: "Independent salons", copy: "One chair or five. Get a booking page, reminders and a rota that fills itself.", stat: "+31% weekday bookings" },
  { title: "Luxury spas", copy: "Room, therapist and equipment scheduling with treatment protocols and consent records.", stat: "−62% scheduling conflicts" },
  { title: "Barbershops", copy: "Walk-in queues, express slots and per-barber commission tracking.", stat: "8 min average wait" },
  { title: "Nail & beauty bars", copy: "Product consumption per set, live stock and technician utilization.", stat: "₹18k monthly stock saved" },
  { title: "Multi-branch groups", copy: "Consolidated P&L, staff mobility across branches and unified customer identity.", stat: "5 cities, one console" },
  { title: "Academies", copy: "Trainee rosters, supervised services and progress-linked scheduling.", stat: "2× student throughput" },
];

function SolutionsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Solutions"
        title="Built for every shape of beauty business."
        copy="From a single studio to a five-city group — the same operating system, configured for how you actually work."
      />
      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {segments.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.06}>
              <article className="h-full rounded-[1.5rem] border border-border bg-card p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1">
                <h2 className="font-display text-2xl tracking-tight">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                <p className="eyebrow mt-6 text-gold">{s.stat}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <MultiBranch />
      <CTASection />
    </SiteLayout>
  );
}
