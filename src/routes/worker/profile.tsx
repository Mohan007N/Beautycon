import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";

export const Route = createFileRoute("/worker/profile")({
  head: () => ({
    meta: [
      { title: "My profile — BeautyCon for stylists" },
      { name: "description", content: "Skills, ratings, commissions and availability." },
      { property: "og:title", content: "My profile — BeautyCon" },
      { property: "og:description", content: "Skills, ratings and commissions." },
    ],
  }),
  component: Page,
});

const rows = [
  { k: "Role", v: "Senior Stylist" },
  { k: "Skills", v: "Cutting · Colour · Keratin · Hair spa" },
  { k: "Rating", v: "4.9 from 312 clients" },
  { k: "This month", v: "₹41,600 commission earned" },
  { k: "Availability", v: "Mon–Sat · 09:00 to 18:00" },
];

function Page() {
  return (
    <>
      <PageTitle title="Ananya" sub="Skills, ratings and commissions." />
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
