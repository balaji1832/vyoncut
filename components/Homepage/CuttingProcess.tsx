"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Crosshair,
  Flame,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";

type Specification = {
  label: string;
  value: string;
  level?: number;
};

type CuttingProcessItem = {
  id: string;
  title: string;
  description: string;
  button: string;
  href: string;
  image: string;
  icon: LucideIcon;
  method: string;
  samples: {
    src: string;
    alt: string;
  }[];
  specifications: Specification[];
};

const processes: CuttingProcessItem[] = [
  {
    id: "laser",
    title: "CNC Laser Cutting",
    description:
      "A precision-focused cutting process designed for high-speed, clean and accurate cutting of complex metal components.",
    button: "Explore Laser Cutting Machines",
    href: "/products/laser-cutting",
    image: "/images/laser-cutting-big.png",
    icon: Crosshair,
    method: "Laser Beam",
    samples: [
      {
        src: "/images/laser-sample-1.png",
        alt: "Intricate laser-cut metal component",
      },
      {
        src: "/images/laser-sample-2.png",
        alt: "Laser-cut sheet metal parts",
      },
      {
        src: "/images/laser-sample-3.png",
        alt: "Clean edges on a laser-cut component",
      },
    ],
    specifications: [
      {
        label: "Cutting Source",
        value: "High-Power Laser Beam",
      },
      {
        label: "Cutting Speed",
        value: "Very Fast",
        level: 5,
      },
      {
        label: "Cutting Accuracy",
        value: "Very High",
        level: 5,
      },
      {
        label: "Finish",
        value: "Very Smooth & Clean",
        level: 5,
      },
      {
        label: "Material",
        value: "Mild Steel, Stainless Steel, Aluminium",
      },
      {
        label: "Thickness Range",
        value: "Thin to Medium Plates",
      },
      {
        label: "Heat Affected Area",
        value: "Very Low",
        level: 1,
      },
      {
        label: "Operating Cost",
        value: "High",
        level: 4,
      },
      {
        label: "Main Advantage",
        value: "High accuracy & fine cutting",
      },
    ],
  },
  {
    id: "plasma",
    title: "CNC Plasma Cutting",
    description:
      "A high-speed thermal cutting process that uses an electrically generated plasma arc to cut conductive metals efficiently.",
    button: "Explore Plasma Cutting Machines",
    href: "/products/cnc-plasma",
    image: "/images/plasma-cutting-big.png",
    icon: Waves,
    method: "Plasma Arc",
    samples: [
      {
        src: "/images/plasma-sample-1.png",
        alt: "Plasma-cut metal component",
      },
      {
        src: "/images/plasma-sample-2.png",
        alt: "Profiled metal parts produced by plasma cutting",
      },
      {
        src: "/images/plasma-sample-3.png",
        alt: "Finished plasma-cut metal plate",
      },
    ],
    specifications: [
      {
        label: "Cutting Source",
        value: "Ionized Plasma",
      },
      {
        label: "Cutting Speed",
        value: "Fast",
        level: 4,
      },
      {
        label: "Cutting Accuracy",
        value: "High",
        level: 4,
      },
      {
        label: "Finish",
        value: "Clean",
        level: 4,
      },
      {
        label: "Material",
        value: "Mild Steel, Stainless Steel, Aluminium",
      },
      {
        label: "Thickness Range",
        value: "Thin to Medium / Thick Plates",
      },
      {
        label: "Heat Affected Area",
        value: "Medium",
        level: 3,
      },
      {
        label: "Operating Cost",
        value: "Medium",
        level: 3,
      },
      {
        label: "Main Advantage",
        value: "Fast cutting with excellent versatility",
      },
    ],
  },
  {
    id: "gas",
    title: "CNC Gas Cutting",
    description:
      "A heavy-duty thermal cutting process that uses fuel gas and oxygen to cut thick carbon steel plates reliably and economically.",
    button: "Explore Gas Cutting Machines",
    href: "/products/cnc-gas",
    image: "/images/gas-cutting-big.png",
    icon: Flame,
    method: "Oxy-Fuel Cutting",
    samples: [
      {
        src: "/images/gas-sample-1.png",
        alt: "Gas-cut thick steel component",
      },
      {
        src: "/images/gas-sample-2.png",
        alt: "Heavy steel profiles produced by gas cutting",
      },
      {
        src: "/images/gas-sample-3.png",
        alt: "Finished oxy-fuel-cut steel plate",
      },
    ],
    specifications: [
      {
        label: "Cutting Source",
        value: "Oxygen + Fuel Gas Flame",
      },
      {
        label: "Cutting Speed",
        value: "Moderate",
        level: 3,
      },
      {
        label: "Cutting Accuracy",
        value: "Good",
        level: 3,
      },
      {
        label: "Finish",
        value: "Standard",
        level: 3,
      },
      {
        label: "Material",
        value: "Mild Steel / Carbon Steel",
      },
      {
        label: "Thickness Range",
        value: "Medium to Very Thick Plates",
      },
      {
        label: "Heat Affected Area",
        value: "High",
        level: 4,
      },
      {
        label: "Operating Cost",
        value: "Low",
        level: 2,
      },
      {
        label: "Main Advantage",
        value: "Ideal for very thick steel cutting",
      },
    ],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ed1c24]";

/* Each element animates only when it enters the viewport. */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.95,
        delay: reducedMotion ? 0 : delay,
        ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function LevelIndicator({ level }: { level: number }) {
  const reducedMotion = useReducedMotion();

  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 items-center gap-[3px]"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className="relative h-[5px] w-2.5 overflow-hidden rounded-full bg-zinc-200 lg:w-3"
        >
          {index < level && (
            <motion.span
              initial={reducedMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{
                once: true,
                amount: 0.1,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.7,
                delay: reducedMotion ? 0 : index * 0.07,
                ease,
              }}
              className="absolute inset-0 origin-left rounded-full bg-[#ed1c24]"
            />
          )}
        </span>
      ))}
    </span>
  );
}

/* Shared content for mobile sections and the desktop tab panel. */
function ProcessContent({
  process,
  titleId,
}: {
  process: CuttingProcessItem;
  titleId: string;
}) {
  const reducedMotion = useReducedMotion();
  const Icon = process.icon;

  return (
    <div className="grid min-w-0 grid-cols-1 items-stretch gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-[1.98fr_1.6fr_1fr]">
      {/* Main image */}
      <Reveal className="min-w-0">
        <div className="group relative isolate flex aspect-[478.83/628.88] min-h-full flex-col justify-end overflow-hidden rounded-[18px] bg-zinc-900">
          <motion.div
            initial={reducedMotion ? false : { scale: 1.07 }}
            whileInView={{ scale: 1 }}
            viewport={{
              once: true,
              amount: 0.12,
            }}
            transition={{
              duration: reducedMotion ? 0 : 1.5,
              ease,
            }}
            className="absolute inset-0"
          >
            <Image
              src={process.image}
              alt={`${process.title} machine operating`}
              fill
              sizes="(min-width: 1280px) 479px, (min-width: 768px) 45vw, 100vw"
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none"
            />
          </motion.div>

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/5"
          />

          <div className="relative p-5 pt-28 sm:p-6 sm:pt-28">
            <Reveal delay={0.08}>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/15 px-3 py-1.5 text-[10px] font-medium tracking-wide text-white/90 backdrop-blur-sm">
                <Icon size={13} aria-hidden="true" />
                {process.method}
              </span>
            </Reveal>

            <Reveal delay={0.14}>
              <h3
                id={titleId}
                className="font-heading text-[25px] leading-tight font-semibold tracking-[-0.035em] text-white lg:text-[27px]"
              >
                {process.title}
              </h3>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-3 max-w-[390px] text-[13px] leading-6 text-white/75">
                {process.description}
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <Link
                href={process.href}
                className={`group/button mt-5 inline-flex min-h-11 max-w-full items-center justify-between gap-3 rounded-lg bg-[#ed1c24] px-4 py-3 text-xs leading-5 font-semibold text-white transition-colors duration-500 hover:bg-[#cb111a] ${focus}`}
              >
                <span>{process.button}</span>

                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 transition-transform duration-500 group-hover/button:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </Reveal>

      {/* Specifications */}
      <div className="flex min-w-0 flex-col px-1 sm:px-2">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200/80 pt-1 pb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#ed1c24]">
                <Icon size={15} aria-hidden="true" />
              </span>

              <h4 className="font-heading text-[10px] font-semibold tracking-[0.06em] text-zinc-500 uppercase">
                Cutting Method
              </h4>
            </div>

            <span className="font-heading text-xs font-semibold text-zinc-800">
              {process.method}
            </span>
          </div>
        </Reveal>

        <dl className="flex flex-1 flex-col">
          {process.specifications.map((specification, index) => (
            <motion.div
              key={specification.label}
              initial={
                reducedMotion ? false : { opacity: 0, y: 14 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.8,
                delay: reducedMotion ? 0 : (index % 3) * 0.06,
                ease,
              }}
              className="grid flex-1 grid-cols-[0.85fr_1.15fr] items-center gap-3 border-b border-zinc-100 py-3.5 last:border-0 lg:py-3"
            >
              <dt className="text-xs leading-5 font-medium text-zinc-800 lg:text-[11px]">
                {specification.label}
              </dt>

              <dd className="flex min-w-0 flex-wrap items-center justify-end gap-2 text-right text-[11px] leading-5 text-zinc-500">
                <span className="break-words">
                  {specification.value}
                </span>

                {specification.level !== undefined && (
                  <LevelIndicator level={specification.level} />
                )}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>

      {/* Sample images */}
      <div className="min-w-0 rounded-[18px] border border-zinc-200/70 bg-zinc-50 p-3 md:col-span-2 lg:col-span-1">
        <Reveal>
          <div className="mb-3 flex items-center justify-between gap-3 px-1">
            <h4 className="font-heading text-[10px] font-semibold tracking-[0.08em] text-zinc-500 uppercase">
              Cut Sample Output
            </h4>

            <span className="h-1 w-5 rounded-full bg-[#ed1c24]" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-3 lg:grid-cols-1">
          {process.samples.map((sample, index) => (
            <Reveal key={sample.src} delay={index * 0.09}>
              <div className="group relative aspect-[241.5/177.63] w-full overflow-hidden rounded-xl border border-black/5 bg-zinc-200">
                <Image
                  src={sample.src}
                  alt={sample.alt}
                  fill
                  sizes="(min-width: 1024px) 242px, (min-width: 400px) 30vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05] motion-reduce:transform-none motion-reduce:transition-none"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CuttingProcess() {
  const id = useId();
  const reducedMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeProcess = processes[activeIndex];

  function handleTabKey(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    let nextIndex = index;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % processes.length;
        break;

      case "ArrowLeft":
        nextIndex =
          (index - 1 + processes.length) % processes.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = processes.length - 1;
        break;

      default:
        return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus({
      preventScroll: true,
    });
  }

  return (
    <section
      aria-labelledby={`${id}-heading`}
      className="overflow-hidden bg-white py-10 sm:py-12 lg:py-16"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-7 lg:px-10">
        {/* Section heading */}
        <div className="mx-auto max-w-[780px] text-center">
          <Reveal>
            <div className="mb-3 inline-flex items-center gap-2 text-[#ed1c24]">
              <Zap
                size={16}
                fill="currentColor"
                strokeWidth={1}
                aria-hidden="true"
              />

              <p className="text-[10px] font-semibold tracking-[0.1em] uppercase">
                Find The Right Process
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id={`${id}-heading`}
              className="font-heading text-[28px] leading-tight font-semibold tracking-[-0.035em] text-[#202327] sm:text-4xl"
            >
              Find The{" "}
              <span className="text-[#ed1c24]">Right</span>{" "}
              Cutting Process.
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-3 max-w-[730px] text-xs leading-6 text-zinc-500 sm:text-sm">
              Compare CNC gas, CNC plasma and CNC laser cutting to
              understand the differences in method, material
              suitability, speed, accuracy, finish and operating cost.
            </p>
          </Reveal>
        </div>

        {/* MOBILE: all processes stacked vertically */}
        <div className="mt-7 space-y-8 md:hidden">
          {processes.map((process, index) => {
            const Icon = process.icon;
            const titleId = `${id}-mobile-title-${process.id}`;

            return (
              <article
                key={process.id}
                aria-labelledby={titleId}
                className="min-w-0"
              >
                <Reveal>
                  <div className="mb-3 flex items-center gap-3 px-1">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#ed1c24]">
                      <Icon size={17} aria-hidden="true" />
                    </span>

                    <p className="flex-1 font-heading text-sm font-semibold text-zinc-800">
                      {process.title}
                    </p>

                    <span
                      aria-hidden="true"
                      className="font-heading text-xs font-medium text-zinc-400"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </Reveal>

                <div className="rounded-[24px] border border-zinc-200 bg-white p-3 shadow-[0_12px_35px_-28px_rgba(0,0,0,0.25)] sm:p-4">
                  <ProcessContent
                    process={process}
                    titleId={titleId}
                  />
                </div>
              </article>
            );
          })}
        </div>

        {/* TABLET / DESKTOP: tab navigation */}
        <div className="hidden md:block">
          <div
            role="tablist"
            aria-label="Choose a cutting process"
            aria-orientation="horizontal"
            className="mt-8 grid grid-cols-3 gap-3"
          >
            {processes.map((process, index) => {
              const Icon = process.icon;
              const selected = activeIndex === index;

              return (
                <Reveal
                  key={process.id}
                  delay={index * 0.08}
                  className="min-w-0"
                >
                  <button
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    id={`${id}-tab-${process.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`${id}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(event) =>
                      handleTabKey(event, index)
                    }
                    className={`relative isolate flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl px-4 py-3 transition-colors duration-500 ${
                      selected
                        ? "text-white"
                        : "bg-zinc-100 text-zinc-500 hover:bg-red-50 hover:text-[#ed1c24]"
                    } ${focus}`}
                  >
                    {selected && (
                      <motion.span
                        layoutId={`${id}-active-tab`}
                        transition={{
                          duration: reducedMotion ? 0 : 0.5,
                          ease,
                        }}
                        className="absolute inset-0 -z-10 rounded-xl bg-[#ed1c24] shadow-[0_5px_15px_rgba(237,28,36,0.15)]"
                      />
                    )}

                    <Icon
                      size={17}
                      aria-hidden="true"
                      className="shrink-0"
                    />

                    <span className="font-heading text-xs font-semibold lg:text-sm">
                      {process.title}
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>

          <div
            id={`${id}-panel`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${activeProcess.id}`}
            tabIndex={0}
            className={`mt-5 rounded-[24px] border border-zinc-200 bg-white p-4 lg:p-5 ${focus}`}
          >
            <ProcessContent
              key={activeProcess.id}
              process={activeProcess}
              titleId={`${id}-desktop-title-${activeProcess.id}`}
            />
          </div>
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-[800px] text-center text-[10px] leading-5 text-zinc-400">
            Process characteristics are indicative. Actual performance
            varies with machine configuration, material, thickness and
            operating conditions.
          </p>
        </Reveal>
      </div>
    </section>
  );
}