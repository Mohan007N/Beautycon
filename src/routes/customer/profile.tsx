import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";

export const Route = createFileRoute("/customer/profile")({
  head: () => ({
    meta: [
      { title: "My profile — BeautyCon" },
      { name: "description", content: "Preferences, loyalty tier and saved stylists." },
      { property: "og:title", content: "My profile — BeautyCon" },
      { property: "og:description", content: "Preferences, loyalty and saved stylists." },
    ],
  }),
  component: Page,
});

const rows = [
  { k: "Loyalty tier", v: "Platinum · 24 visits" },
  { k: "Preferred stylist", v: "Ananya" },
  { k: "Hair notes", v: "Ammonia-free colour only · ash tones" },
  { k: "Saved payment", v: "UPI · maya@okbank" },
];

function Page() {
  return (
    <>
      <PageTitle title="Maya Krish" sub="Preferences and loyalty." />
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
