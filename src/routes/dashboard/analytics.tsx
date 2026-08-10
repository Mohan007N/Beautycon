import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/app/AppShell";
import { AnalyticsStory } from "@/components/landing/AnalyticsStory";

export const Route = createFileRoute("/dashboard/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — BeautyCon Dashboard" },
      { name: "description", content: "Revenue, retention, peak hours and worker utilization." },
      { property: "og:title", content: "Analytics — BeautyCon Dashboard" },
      { property: "og:description", content: "Revenue, retention and utilization intelligence." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageTitle title="Analytics" sub="Revenue, retention and utilization intelligence." />
      <div className="-mx-4 sm:-mx-6">
        <AnalyticsStory />
      </div>
    </>
  );
}
