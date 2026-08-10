import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { PricingSection } from "@/components/landing/PricingSection";
import { CTASection } from "@/components/landing/CTASection";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — BeautyCon plans from ₹499/month" },
      { name: "description", content: "Starter, Professional and Business plans for salons, spas and multi-branch beauty groups. Yearly billing saves 20%." },
      { property: "og:title", content: "Pricing — BeautyCon" },
      { property: "og:description", content: "Priced like software. Pays for itself in a week." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Pricing" title="Simple plans. Serious operations." copy="Every plan includes unlimited bookings, the customer app and the worker app. No setup fee." />
      <PricingSection compact />
      <CTASection />
    </SiteLayout>
  );
}
