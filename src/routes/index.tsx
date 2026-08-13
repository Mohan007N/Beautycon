import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/landing/Hero";
import { TrustBar } from "@/components/landing/TrustBar";
import { ScrollStory } from "@/components/landing/ScrollStory";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { CRMPipelineDemo } from "@/components/landing/CRMPipelineDemo";
import { ROICalculator } from "@/components/landing/ROICalculator";
import { MultiBranch } from "@/components/landing/MultiBranch";
import { PricingSection } from "@/components/landing/PricingSection";
import { CTASection } from "@/components/landing/CTASection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BeautyCon — The Beauty Business Operating System" },
      {
        name: "description",
        content:
          "BeautyCon brings bookings, workforce, customers, payments and business intelligence into one operating system.",
      },
      { property: "og:title", content: "BeautyCon — Run your beauty business. Without the chaos." },
      {
        property: "og:description",
        content: "One operating system for every appointment, workforce shift, customer, and financial decision.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <TrustBar />
      <ScrollStory />
      <ProductShowcase />
      <CRMPipelineDemo />
      <ROICalculator />
      <MultiBranch />
      <PricingSection compact />
      <CTASection />
    </SiteLayout>
  );
}

