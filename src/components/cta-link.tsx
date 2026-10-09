import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const ctaVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap no-underline transition-colors duration-200 active:translate-y-px [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-rock text-white shadow-[0_8px_20px_-8px_rgb(122_46_29/0.55)] hover:bg-rock-deep",
        outline: "border-2 border-night/80 text-night hover:bg-night hover:text-white",
        light: "bg-cream text-night hover:bg-white",
        ghostLight: "border-2 border-sand/70 text-sand hover:bg-sand hover:text-night",
      },
      size: {
        md: "h-11 px-5 text-[0.95rem]",
        lg: "h-12 px-6 text-base",
        sm: "h-9 px-4 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Props = VariantProps<typeof ctaVariants> & {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function CtaLink({ href, variant, size, className, external, children, ...rest }: Props) {
  const cls = cn(ctaVariants({ variant, size }), className);
  const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);
  if (isExternal) {
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { rel: "noopener" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
