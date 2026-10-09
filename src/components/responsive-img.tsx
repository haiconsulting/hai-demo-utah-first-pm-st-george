import type { StaticImageData } from "next/image";

/**
 * Static export has no image optimizer, so next/image cannot emit a srcset.
 * This serves a small and a large pre-sized file and lets the browser pick.
 */
export function ResponsiveImg({
  small,
  large,
  alt,
  sizes,
  className,
  priority,
}: {
  small: StaticImageData;
  large: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={large.src}
      srcSet={`${small.src} ${small.width}w, ${large.src} ${large.width}w`}
      sizes={sizes}
      width={large.width}
      height={large.height}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
