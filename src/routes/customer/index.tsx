import { createFileRoute, Link } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { inr } from "@/lib/mock-data";
import { useBeautyConStore } from "@/lib/store";
import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const { services, activeBranch } = useBeautyConStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Hair", "Skin", "Colour", "Nails", "Spa"];

  const filtered = selectedCategory === "All"
    ? services
    : services.filter((s) => s.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <>
      <PageTitle title="Good morning, Maya" sub={`Discover salon services at Luxe Studio · ${activeBranch}`} />
      
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setSelectedCategory(c)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors cursor-pointer",
              selectedCategory === c
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-card text-foreground hover:bg-accent",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <Panel title="Popular Services Near You" className="mt-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((s) => (
            <Link
              key={s.id}
              to="/customer/book"
              className="rounded-xl border border-border bg-card p-4 transition-transform hover:-translate-y-1 hover:border-gold/40 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">{s.name}</p>
                <span className="text-xs font-semibold text-gold">{inr(s.price)}</span>
              </div>
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Star className="size-3.5 fill-gold text-gold" /> 4.9 · {s.duration} mins · {s.category}
              </p>
            </Link>
          ))}
        </div>
      </Panel>
    </>
  );
}
