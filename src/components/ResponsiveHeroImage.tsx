import { getImageProps } from "next/image";

// The derivative is a centered 913 × 1217 crop. It is used only where
// object-cover already clips the original photo to an aspect ratio <= 3:4.
const portraitMedia = "(max-width: 767px) and (max-aspect-ratio: 3/4)";
// `not` negates the whole query, including the exact 3:4 boundary, so only
// one image is preloaded at any viewport size.
const landscapeMedia = `not all and ${portraitMedia}`;

export default function ResponsiveHeroImage({
  src,
  portraitSrc,
  alt,
  sizes,
  quality,
}: {
  src: string;
  portraitSrc: string;
  alt: string;
  sizes: string;
  quality: number;
}) {
  const common = { alt, fill: true, priority: true, fetchPriority: "high" as const,
    className: "object-cover", quality };
  const { props: landscape } = getImageProps({ ...common, src, sizes });
  const { props: portrait } = getImageProps({
    ...common,
    src: portraitSrc,
    // Hero height is max(100vh, 500px); preserve the source's native density.
    sizes: "max(75.1vh, 376px)",
  });

  return (
    <>
      <link rel="preload" as="image" media={portraitMedia}
        imageSrcSet={portrait.srcSet} imageSizes={portrait.sizes} fetchPriority="high" />
      <link rel="preload" as="image" media={landscapeMedia}
        imageSrcSet={landscape.srcSet} imageSizes={landscape.sizes} fetchPriority="high" />
      <picture>
        <source media={portraitMedia} srcSet={portrait.srcSet} sizes={portrait.sizes} />
        {/* getImageProps retains Next's responsive optimization without an
            unconditional Image preload that would download both versions. */}
        <img {...landscape} alt={alt} />
      </picture>
    </>
  );
}
