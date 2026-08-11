import { cn } from "@/lib/utils";

interface BeautyConLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  textClassName?: string;
}

export function BeautyConLogo({
  className,
  size = "md",
  showText = true,
  textClassName,
}: BeautyConLogoProps) {
  const iconSizes = {
    sm: "size-7",
    md: "size-9",
    lg: "size-11",
  };

  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      {/* Luxury Geometric Crown Lotus Logo Mark */}
      <div className={cn("relative grid shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold via-peach to-gold-soft p-1.5 shadow-md shadow-gold/20 transition-transform duration-300 hover:scale-105", iconSizes[size])}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-full text-ink stroke-[2.2]"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Outer Crown/Sparkle Petals */}
          <path d="M12 2L14.5 9L21.5 9.5 L16 14L18 21L12 17L6 21L8 14L2.5 9.5L9.5 9L12 2Z" fill="var(--ink)" fillOpacity="0.15" />
          <circle cx="12" cy="12" r="3" fill="var(--ink)" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-display font-extrabold tracking-tight text-foreground text-lg leading-none", textClassName)}>
            Beauty<span className="text-gold">Con</span>
          </span>
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-muted-foreground mt-0.5">
            SaaS OS
          </span>
        </div>
      )}
    </div>
  );
}
