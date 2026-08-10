import { Link } from "@tanstack/react-router";

const columns = [
  {
    title: "Product",
    items: [
      { label: "Features", to: "/features" as const },
      { label: "Pricing", to: "/pricing" as const },
      { label: "Solutions", to: "/solutions" as const },
      { label: "AI", to: "/features" as const },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", to: "/about" as const },
      { label: "Careers", to: "/about" as const },
      { label: "Contact", to: "/about" as const },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Documentation", to: "/about" as const },
      { label: "Help Center", to: "/about" as const },
      { label: "Blog", to: "/about" as const },
    ],
  },
  {
    title: "Apps",
    items: [
      { label: "Customer app", to: "/customer" as const },
      { label: "Owner dashboard", to: "/dashboard" as const },
      { label: "Worker app", to: "/worker" as const },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink text-ink-foreground">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.4fr_2fr] lg:py-20">
        <div>
          <p className="font-display text-3xl tracking-tight">BeautyCon</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-foreground/60">
            The operating system for modern beauty businesses.
          </p>
          <p className="eyebrow mt-8 text-gold">Book. Schedule. Operate. Grow.</p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow text-ink-foreground/45">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-sm text-ink-foreground/75 transition-colors hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs text-ink-foreground/50">
          <span>© 2026 BeautyCon</span>
          <span>Chennai · Bangalore · Dubai</span>
        </div>
      </div>
    </footer>
  );
}
