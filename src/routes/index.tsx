import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/landing/Hero";
import { ScrollStory } from "@/components/landing/ScrollStory";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
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
          "Bookings, AI workforce scheduling, payments, inventory and analytics for salons and spas. Book. Schedule. Operate. Grow.",
      },
      { property: "og:title", content: "BeautyCon — Beauty runs better" },
      {
        property: "og:description",
        content: "One platform for every appointment, every worker, and every decision.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      
      <Hero />
      <ScrollStory />
      <ProductShowcase />
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
