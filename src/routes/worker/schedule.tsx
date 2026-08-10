import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/app/AppShell";
import { SchedulingEngine } from "@/components/landing/SchedulingEngine";

export const Route = createFileRoute("/worker/schedule")({
  head: () => ({
    meta: [
      { title: "My schedule — BeautyCon for stylists" },
      { name: "description", content: "See how BeautyCon balances your shifts against the whole team." },
      { property: "og:title", content: "My schedule — BeautyCon" },
      { property: "og:description", content: "Shifts balanced across the team." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageTitle title="Schedule" sub="Shifts balanced across the team." />
      <div className="-mx-4 overflow-hidden rounded-[1.25rem] sm:-mx-6">
        <SchedulingEngine />
      </div>
    </>
  );
}
