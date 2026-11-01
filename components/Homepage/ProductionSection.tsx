"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

import { usePageReady } from "@/components/Layout/PageLoader";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const pageReady = usePageReady();

  return (
    <motion.div
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 24,
            }
      }
      whileInView={
        pageReady
          ? { opacity: 1, y: 0 }
          : reducedMotion
            ? undefined
            : { opacity: 0, y: 24 }
      }
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.95,
        delay: reducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type ProductionSectionProps = {
  imageSrc?: string;
  imageAlt?: string;
};

const specifications = [
  {
    value: "0.5 – 200mm",
    label: "Thickness Spectrum",
  },
  {
    value: "5 Formats",
    label: "Gantry & Portable",
  },
  {
    value: "100%",
    label: "Heavy Duty Verified",
  },
];

export default function ProductionSection({
  imageSrc = "/images/vyoncut-production.jpg",
  imageAlt = "VYONCUT industrial cutting machine in operation",
}: ProductionSectionProps) {
  return (
    <section
      aria-labelledby="production-heading"
      className="overflow-hidden bg-white"
    >
      {/* Red announcement strip */}
      <div className="bg-[#ff0016] px-5 py-4 sm:px-8">
        <Reveal>
          <p className="mx-auto max-w-[1320px] text-center text-[10px] leading-5 font-semibold tracking-[0.08em] text-white uppercase sm:text-xs">
            Find the right cutting solution for your material,
            thickness and production needs.
          </p>
        </Reveal>
      </div>

      {/* Main section */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10 lg:px-12 lg:py-20 xl:gap-14">
        {/* Left content */}
        <div className="min-w-0">
          <Reveal>
            <div className="mb-5 flex items-center gap-2 text-[#ff0016]">
              <Zap
                size={18}
                fill="currentColor"
                strokeWidth={1}
                aria-hidden="true"
                className="shrink-0"
              />

              <p className="text-[10px] font-semibold tracking-[0.04em] uppercase sm:text-[11px]">
                Real-World Production.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h2
              id="production-heading"
              className="max-w-[590px] font-heading text-[clamp(1.8rem,2.65vw,2.5rem)] leading-[1.24] font-semibold tracking-[-0.035em] text-[#202327]"
            >
              Precision Cutting Machines For{" "}
              <span className="text-[#ff0016]">Real-World</span>{" "}
              Production.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-5 max-w-[540px] text-sm leading-6 text-zinc-500 sm:text-[15px] sm:leading-7">
              Explore laser, plasma and gas cutting solutions built
              for workshops, fabrication units and industrial
              production requirements.
            </p>
          </Reveal>

          {/* Specifications */}
          <div className="mt-7 grid grid-cols-1 gap-4 min-[420px]:grid-cols-3 min-[420px]:gap-0 sm:mt-8">
            {specifications.map((specification, index) => (
              <Reveal
                key={specification.label}
                delay={index * 0.08}
                className={`min-w-0 ${
                  index > 0
                    ? "min-[420px]:border-l min-[420px]:border-zinc-200 min-[420px]:pl-4 xl:pl-6"
                    : "min-[420px]:pr-3"
                }`}
              >
                <p className="font-heading text-base font-semibold tracking-tight text-[#202327] sm:text-lg">
                  {specification.value}
                </p>

                <p className="mt-2 text-[9px] leading-4 font-semibold text-[#ff0016] uppercase sm:text-[10px] xl:text-[11px]">
                  {specification.label}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Buttons */}
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-5">
              <Link
                href="#products"
                className="group inline-flex min-h-11 items-center justify-center gap-4 rounded-lg border border-red-200 bg-white px-4 py-3 text-xs font-semibold text-[#ff0016] transition-[background-color,border-color,color,box-shadow] duration-300 hover:border-[#ff0016] hover:bg-[#ff0016] hover:text-white hover:shadow-[0_8px_20px_rgba(255,0,22,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500 sm:text-sm"
              >
                Explore Machines

                <ArrowRight
                  size={17}
                  aria-hidden="true"
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </Link>

              <Link
                href="/contact#enquiry"
                className="group inline-flex min-h-11 items-center justify-center gap-4 rounded-lg border border-[#202327] bg-[#202327] px-4 py-3 text-xs font-semibold text-white transition-[background-color,border-color,box-shadow] duration-300 hover:border-[#ff0016] hover:bg-[#ff0016] hover:shadow-[0_8px_20px_rgba(255,0,22,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500 sm:text-sm"
              >
                Request a Quote

                <ArrowRight
                  size={17}
                  aria-hidden="true"
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Right photograph — 662 × 342 maximum */}
        <Reveal
          delay={0.12}
          className="w-full max-w-[662px] justify-self-center lg:justify-self-end"
        >
          <div className="group relative isolate aspect-[662/342] w-full overflow-hidden rounded-[22px] bg-zinc-100 shadow-[0_7px_0_0_#fff0f1] sm:rounded-[26px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width: 1440px) 662px, (min-width: 1024px) 50vw, (min-width: 768px) 662px, 100vw"
              className="object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/5"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
