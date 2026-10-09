import { cn } from "@/lib/utils";

/**
 * Marks content that is not verified yet. Everything wrapped in this tag
 * must be confirmed by Utah First before the site goes live.
 */
export function Placeholder({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded border border-dashed border-[#b8862a] bg-[#fff4d6] px-1.5 py-0.5 align-middle font-sans text-[0.7rem] leading-tight font-semibold tracking-wide text-[#6b4700] not-italic",
        className,
      )}
    >
      <span aria-hidden="true">&#9888;</span>
      <span>
        <span className="sr-only">Placeholder, needs confirmation: </span>
        {children}
      </span>
    </span>
  );
}
