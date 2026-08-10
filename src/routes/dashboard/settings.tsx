import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({
    meta: [
      { title: "Settings — BeautyCon Dashboard" },
      { name: "description", content: "Branch details, working hours and notification preferences." },
      { property: "og:title", content: "Settings — BeautyCon Dashboard" },
      { property: "og:description", content: "Branch, hours and notification preferences." },
    ],
  }),
  component: Page,
});

const rows = [
  { k: "Branch", v: "Luxe Studio · Anna Nagar" },
  { k: "Working hours", v: "09:00 — 21:00, all days" },
  { k: "Booking window", v: "Up to 30 days ahead" },
  { k: "Deposit", v: "₹200 for services above ₹2,000" },
  { k: "Notifications", v: "WhatsApp + SMS reminders, 2 hours before" },
];

function Page() {
  return (
    <>
      <PageTitle title="Settings" sub="Branch, hours and notification preferences." />
      <Panel>
        <dl className="divide-y divide-border">
          {rows.map((r) => (
            <div key={r.k} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 py-3">
              <dt className="text-sm text-muted-foreground">{r.k}</dt>
              <dd className="truncate text-sm font-semibold">{r.v}</dd>
            </div>
          ))}
        </dl>
      </Panel>
    </>
  );
}
