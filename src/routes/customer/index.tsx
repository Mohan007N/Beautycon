import { createFileRoute, Link } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { inr } from "@/lib/mock-data";
import { useBeautyConStore } from "@/lib/store";
import { Star, Clock, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const Route = createFileRoute("/customer/")({
  head: () => ({
    meta: [
      { title: "Your beauty home — BeautyCon" },
      { name: "description", content: "Discover salons near you and book your next appointment with real-time slot lock." },
      { property: "og:title", content: "Your beauty home — BeautyCon" },
      { property: "og:description", content: "Discover salons and book in seconds." },
    ],
  }),
  component: Page,
});

function Page() {
  const { services, activeBranch } = useBeautyConStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Hair", "Skin", "Colour", "Nails", "Grooming"];

  const filtered = selectedCategory === "All"
    ? services
    : services.filter((s) => s.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <>
      <PageTitle title="Good morning, Maya" sub={`Discover luxury salon services at Luxe Studio · ${activeBranch}`} />
      
      {/* Category Pills Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setSelectedCategory(c)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 cursor-pointer",
              selectedCategory === c
                ? "border-gold bg-gold text-ink font-bold shadow-md scale-[1.03]"
                : "border-border bg-card text-foreground hover:bg-accent/60 hover:border-gold/40",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <Panel title="Popular Services Near You" className="mt-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s, idx) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
            >
              <Link
                to="/customer/book"
                className="group flex flex-col h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-lift"
              >
                {/* Feature Image Header */}
                <div className="relative h-44 w-full overflow-hidden bg-secondary">
                  <img
                    src={(s as any).image || "/images/hair_spa.png"}
                    alt={s.name}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                    {s.category}
                  </span>
                  <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-gold/40 bg-gold/90 px-2.5 py-1 text-[11px] font-bold text-ink shadow-sm">
                    {inr(s.price)}
                  </span>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-semibold text-base group-hover:text-gold transition-colors">{s.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {(s as any).description || "Signature treatment crafted by top senior stylists."}
                  </p>

                  <div className="mt-auto pt-3 flex items-center justify-between border-t border-border/60 text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground font-medium">
                      <Clock className="size-3.5 text-gold" /> {s.duration} mins
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-gold group-hover:translate-x-0.5 transition-transform">
                      Book Now <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Panel>
    </>
  );
}
