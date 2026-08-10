import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { CountUp, Reveal } from "@/components/kit/motion-primitives";
import { CTASection } from "@/components/landing/CTASection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About BeautyCon — the beauty business OS" },
      { name: "description", content: "BeautyCon builds the operating system for modern salons, spas and beauty groups across India and the Gulf." },
      { property: "og:title", content: "About BeautyCon" },
      { property: "og:description", content: "We build the software that runs the beauty floor." },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { k: "Salons running BeautyCon", v: 2400, suffix: "+" },
  { k: "Appointments processed monthly", v: 860000, suffix: "" },
  { k: "Average utilization lift", v: 21, suffix: "%" },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Company" title="We build the software that runs the beauty floor." copy="BeautyCon started in a two-chair studio in Chennai where the owner was answering calls with colour on her gloves. The product hasn't forgotten that." />
      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.07}>
              <div className="rounded-[1.5rem] border border-border bg-card p-6 shadow-soft">
                <p className="font-display text-5xl tracking-tight"><CountUp value={s.v} suffix={s.suffix} /></p>
                <p className="mt-2 text-sm text-muted-foreground">{s.k}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-14 max-w-2xl font-display text-3xl leading-snug tracking-tight sm:text-4xl">
            Your business is busy. Your system shouldn't be.
          </p>
        </Reveal>
      </section>
      <CTASection />
    </SiteLayout>
  );
}
