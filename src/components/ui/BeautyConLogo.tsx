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
    sm: "size-8",
    md: "size-10",
    lg: "size-12",
  };

  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none group cursor-pointer", className)}>
      {/* Modern Sleek Luxury BeautyCon Emblem */}
      <div
        className={cn(
          "relative grid shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold via-gold/80 to-amber-600 p-2 shadow-lg shadow-gold/25 transition-transform duration-300 group-hover:scale-105 ring-1 ring-gold/40",
          iconSizes[size],
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-full text-black"
          aria-hidden="true"
        >
          {/* Scissors + Sparkle Crown Modern Icon */}
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="8.12" y1="8.12" x2="12" y2="12" />
          <line x1="20" y1="4" x2="8.12" y2="15.88" />
          <line x1="14.8" y1="14.8" x2="20" y2="20" />
          <path d="M18 7l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="currentColor" />
        </svg>
      </div>

      {showText && (
        <span
          className={cn(
            "font-display font-extrabold tracking-tight text-foreground text-lg leading-none flex items-center gap-1",
            textClassName,
          )}
        >
          BEAUTY<span className="text-gold italic font-bold">CON</span>
        </span>
      )}
    </div>
  );
}
