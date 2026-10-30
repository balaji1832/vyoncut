"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type HeroBannerProps = {
  imageSrc?: string;
  tabletImageSrc?: string;
  mobileImageSrc?: string;
  imageAlt?: string;
  eyebrow?: string;
  heading?: string;
  highlightedHeading?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function HeroBanner({
  imageSrc = "/images/vyoncut-banner.jpg",
  tabletImageSrc,
  mobileImageSrc,
  imageAlt = "VYONCUT CNC cutting machine",
  eyebrow = "CNC Laser & Plasma Cutting Machines",
  heading = "Built for steel.",
  highlightedHeading = "Built for your next step.",
  description = "Move your fabrication business forward with VYONCUT laser and plasma cutting machines.",
  primaryLabel = "Explore Our Machines",
  primaryHref = "#products",
  secondaryLabel = "Book a Live Demo",
  secondaryHref = "/contact#enquiry",
}: HeroBannerProps) {
  const reducedMotion = useReducedMotion();
  const tabletSrc = tabletImageSrc ?? imageSrc;
  const mobileSrc = mobileImageSrc ?? tabletSrc;

  return (
    <section
      aria-label="VYONCUT cutting machines"
      className="relative isolate w-full overflow-hidden bg-zinc-950 lg:h-[650px]"
    >
      {/* Responsive banner photographs */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-center lg:block"
      />

      <Image
        src={tabletSrc}
        alt={imageAlt}
        fill
        sizes="(min-width: 768px) and (max-width: 1023px) 100vw, 1px"
        className="hidden object-cover object-[65%_center] md:block lg:hidden"
      />

      <Image
        src={mobileSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 767px) 100vw, 1px"
        className="object-cover object-[65%_center] md:hidden"
      />

      {/* Contrast overlays */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/15"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/10"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10"
      />

      <div className="relative z-10 mx-auto flex min-h-[660px] w-full max-w-[1320px] flex-col justify-center px-5 pt-32 pb-7 sm:px-8 md:min-h-[620px] md:px-10 lg:h-full lg:min-h-0 lg:px-12 lg:pt-28 lg:pb-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.75,
            delay: reducedMotion ? 0 : 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-[720px]"
        >
          <div className="mb-5 inline-flex max-w-full items-center gap-3">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ed1c24]" />

            <p className="text-[10px] leading-5 font-semibold tracking-[0.15em] text-white/80 uppercase sm:text-xs">
              {eyebrow}
            </p>
          </div>

          <h1 className="font-heading text-[clamp(2.35rem,4.5vw,4rem)] leading-[1.08] font-medium tracking-[-0.045em] text-white">
            <span className="block">{heading}</span>

            <span className="mt-1.5 block text-white/65">
              {highlightedHeading}
            </span>
          </h1>

          <p className="mt-5 max-w-[490px] text-[15px] leading-7 text-white/70 sm:text-base">
            {description}
          </p>

          <div className="mt-7 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap">
            <Link
              href={primaryHref}
              className="group inline-flex min-h-[50px] items-center justify-between gap-5 rounded-xl bg-[#ed1c24] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c91119] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {primaryLabel}

              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </Link>

            <Link
              href={secondaryHref}
              className="group inline-flex min-h-[50px] items-center justify-between gap-5 rounded-xl border border-white/30 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {secondaryLabel}

              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: reducedMotion ? 0 : 0.6,
            delay: reducedMotion ? 0 : 0.4,
          }}
          className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/15 pt-5 lg:mt-8"
        >
          {["Installation", "Training", "Lifetime Support"].map(
            (benefit) => (
              <span
                key={benefit}
                className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.1em] text-white/65 uppercase sm:text-[11px]"
              >
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-[#ed1c24]"
                />
                {benefit}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}