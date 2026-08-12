import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/landing/Hero";
import { ProductDemo } from "@/components/landing/ProductDemo";
import { TrustBar } from "@/components/landing/TrustBar";
import { CRMPipelineDemo } from "@/components/landing/CRMPipelineDemo";
import { ROICalculator } from "@/components/landing/ROICalculator";
import { ScrollStory } from "@/components/landing/ScrollStory";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { ServicesShowcase } from "@/components/landing/ServicesShowcase";
import { BookingStory } from "@/components/landing/BookingStory";
import { SchedulingEngine } from "@/components/landing/SchedulingEngine";
import { AIAssistant } from "@/components/landing/AIAssistant";
import { AnalyticsStory } from "@/components/landing/AnalyticsStory";
import { ExperienceSection } from "@/components/landing/ExperienceSection";
import { ERPOrbit } from "@/components/landing/ERPOrbit";
import { RealtimeFlow } from "@/components/landing/RealtimeFlow";
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
      <ProductDemo />
      <TrustBar />
      <CRMPipelineDemo />
      <ScrollStory />
      <ProductShowcase />
      <ROICalculator />
      <ServicesShowcase />
      <BookingStory />
      <SchedulingEngine />
      <AIAssistant />
      <AnalyticsStory />
      <ExperienceSection />
      <ERPOrbit />
      <RealtimeFlow />
      <MultiBranch />
      <PricingSection compact />
      <CTASection />
    </SiteLayout>
  );
}
