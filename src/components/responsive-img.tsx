import type { StaticImageData } from "next/image";
import { preload } from "react-dom";
import type { Photo } from "@/lib/photos";

/**
 * Static export has no image optimizer, so next/image cannot emit a srcset.
 * This serves a small and a large pre-sized file and lets the browser pick.
 * Priority images are preloaded with the same srcset so the hero is fetched first.
 */
export function ResponsiveImg({
  photo,
  small = photo?.small,
  large = photo?.large,
  alt,
  sizes,
  className,
  priority,
}: {
  photo?: Photo;
  small?: StaticImageData;
  large?: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  if (!small || !large) throw new Error("ResponsiveImg needs a photo or small and large images");
  const srcSet = `${small.src} ${small.width}w, ${large.src} ${large.width}w`;
  if (priority) preload(large.src, { as: "image", imageSrcSet: srcSet, imageSizes: sizes, fetchPriority: "high" });
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={large.src}
      srcSet={srcSet}
      sizes={sizes}
      width={large.width}
      height={large.height}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? "sync" : "async"}
    />
  );
}
