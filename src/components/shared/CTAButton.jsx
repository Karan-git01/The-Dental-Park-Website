// src/components/shared/CTAButton.jsx
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const ctaVariants = cva(
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full text-[15px] font-medium transition-all duration-300 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        solid:
          "bg-brand text-white shadow-[0_8px_20px_-8px_var(--brand)] hover:bg-brand-hover hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-12px_var(--brand)]",
        outline:
          "border border-brand/45 bg-white text-ink hover:border-brand hover:-translate-y-0.5 hover:shadow-card",
        ghost: "border border-black/10 bg-white text-ink hover:border-brand/50",
      },
      size: {
        md: "h-[46px] px-6",
        lg: "h-[56px] px-8 text-base",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

export function CTAButton({
  className,
  variant,
  size,
  icon,
  children,
  as = "button",
  href,
  ...props
}) {
  const content = (
    <>
      {/* Soft sheen sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span className="relative inline-flex transition-transform duration-300 group-hover:scale-110">{icon}</span>
      <span className="relative">{children}</span>
    </>
  );
  if (as === "a") {
    return (
      <a href={href} className={cn(ctaVariants({ variant, size }), className)}>
        {content}
      </a>
    );
  }
  return (
    <button className={cn(ctaVariants({ variant, size }), className)} {...props}>
      {content}
    </button>
  );
}