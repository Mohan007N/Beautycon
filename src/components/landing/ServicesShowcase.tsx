import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/kit/motion-primitives";
import { Star, Clock, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { inr } from "@/lib/mock-data";

const showcaseServices = [
  {
    id: "feat-1",
    name: "Signature Botanical Hair Spa",
    category: "Hair Therapy",
    price: 1200,
    duration: 60,
    rating: 4.9,
    reviews: 312,
    image: "/images/hair_spa.png",
    description: "Deep organic steam nourishment, scalp detox massage & split-end restorative seal.",
    highlights: ["100% Organic Extracts", "Scalp Pressure Massage", "Thermic Steam Treatment"],
  },
  {
    id: "feat-2",
    name: "24K Gold Radiance Facial",
    category: "Skincare",
    price: 2400,
    duration: 75,
    rating: 5.0,
    reviews: 248,
    image: "/images/gold_facial.png",
    description: "24-Karat gold leaf infusion therapy, collagen lift boost & lymphatic facial drainage.",
    highlights: ["Pure 24K Gold Leaf", "Micro-current Firming", "Hydration Lock Mask"],
  },
  {
    id: "feat-3",
    name: "French Balayage & Gloss",
    category: "Hair Colour",
    price: 5600,
    duration: 120,
    rating: 4.9,
    reviews: 184,
    image: "/images/balayage.png",
    description: "Hand-painted sun-kissed ombre dimension with zero-ammonia shine gloss toner.",
    highlights: ["Custom Shade Blend", "Zero Ammonia Damage", "Signature Blowout Included"],
  },
  {
    id: "feat-4",
    name: "Rosewood Gel Manicure",
    category: "Nail Care",
    price: 900,
    duration: 45,
    rating: 4.8,
    reviews: 290,
    image: "/images/gel_manicure.png",
    description: "Precision cuticle shaping, UV-cured glossy gel coat & nourishing herbal hand spa.",
    highlights: ["3+ Week Chip Resistance", "Vegan UV Formula", "Precision Cuticle Grooming"],
  },
  {
    id: "feat-5",
    name: "Precision Beard Sculpting",
    category: "Grooming",
    price: 650,
    duration: 30,
    rating: 4.9,
    reviews: 175,
    image: "/images/beard_sculpt.png",
    description: "Hot towel lather prep, straight-razor lineup, taper fade & argan conditioning oil.",
    highlights: ["Hot Towel Treatment", "Straight-Razor Lineup", "Essential Oil Hydration"],
  },
];

export function ServicesShowcase() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-background">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading
          eyebrow="Available Salon Services"
          lines={["Crafted for perfection.", "Booked in seconds."]}
          copy="Explore our curated catalog of luxury hair, skin, nail and grooming services powered by real-time scheduling."
          align="center"
        />

        {/* Feature Cards Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {showcaseServices.map((s, idx) => (
            <Reveal key={s.id} delay={idx * 0.1}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col h-full overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft hover:shadow-lift hover:border-gold/50 transition-all"
              >
                {/* Visual Image Banner with Glass Badges */}
                <div className="relative h-56 w-full overflow-hidden bg-secondary">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                    {s.category}
                  </span>

                  {/* Rating Badge */}
                  <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-gold/30 bg-gold/90 px-3 py-1 text-[11px] font-bold text-ink shadow-sm">
                    <Star className="size-3 fill-ink text-ink" /> {s.rating} ({s.reviews})
                  </span>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="font-display text-2xl font-bold tracking-tight text-gold">
                      {inr(s.price)}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-white/80">
                      <Clock className="size-3.5 text-gold" /> {s.duration} mins
                    </span>
                  </div>
                </div>

                {/* Card Info Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold tracking-tight group-hover:text-gold transition-colors">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="mt-4 space-y-1.5 border-t border-border/60 pt-4">
                    {s.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                        <CheckCircle2 className="size-3.5 text-gold shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Link */}
                  <Link
                    to="/customer/book"
                    className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-xs font-semibold text-primary-foreground group-hover:bg-gold group-hover:text-ink transition-colors shadow-sm"
                  >
                    <span>Instant Live Booking</span>
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
