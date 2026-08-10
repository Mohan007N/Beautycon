import { createFileRoute, Link } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { services } from "@/lib/mock-data";
import { Star } from "lucide-react";

export const Route = createFileRoute("/customer/")({
  head: () => ({
    meta: [
      { title: "Your beauty home — BeautyCon" },
      { name: "description", content: "Discover salons near you and book your next appointment in seconds." },
      { property: "og:title", content: "Your beauty home — BeautyCon" },
      { property: "og:description", content: "Discover salons and book in seconds." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageTitle title="Good morning, Maya" sub="What are you looking for?" />
      <div className="flex gap-2 overflow-x-auto pb-2">
        {["Hair", "Nails", "Skin", "Spa"].map((c) => (
          <span key={c} className="shrink-0 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold">{c}</span>
        ))}
      </div>
      <Panel title="Popular near you" className="mt-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((s) => (
            <Link key={s.id} to="/customer/book" className="rounded-xl border border-border px-4 py-3 transition-transform hover:-translate-y-1">
              <p className="font-semibold">{s.name}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="size-3 fill-gold text-gold" /> 4.9 · {s.duration} min · ₹{s.price}
              </p>
            </Link>
          ))}
        </div>
      </Panel>
    </>
  );
}
