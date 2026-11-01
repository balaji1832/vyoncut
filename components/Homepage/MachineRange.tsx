"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";

type Machine = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

const machines: Machine[] = [
  {
    id: "laser",
    title: "Laser Cutting Machines",
    description:
      "High-precision cutting technology for clean edges, intricate shapes, and consistent results across various metals.",
    image: "/images/laser-cutting.png",
    href: "/products/laser-cutting",
  },
  {
    id: "cnc-plasma",
    title: "CNC Plasma Cutting Machines",
    description:
      "Fast and efficient CNC-controlled plasma cutting designed for accurate profiling of medium to thick metal sheets.",
    image: "/images/cnc-plasma.png",
    href: "/products/cnc-plasma",
  },
  {
    id: "cnc-gas",
    title: "CNC Gas Cutting Machines",
    description:
      "Reliable oxy-fuel cutting solution ideal for heavy-duty applications and precise cutting of thick steel plates.",
    image: "/images/cnc-gas.png",
    href: "/products/cnc-gas",
  },
  {
    id: "portable-plasma",
    title: "Portable Plasma Cutting Machines",
    description:
      "Compact and flexible plasma cutting system built for on-site fabrication, repair, and quick metal cutting operations.",
    image: "/images/portable-plasma.png",
    href: "/products/portable-plasma",
  },
  {
    id: "portable-gas",
    title: "Portable Gas Cutting Machines",
    description:
      "Easy-to-move gas cutting equipment designed for dependable straight and profile cutting in workshops and field applications.",
    image: "/images/portable-gas.png",
    href: "/products/portable-gas",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ed1c24]";

export default function MachineRange() {
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartRef = useRef<number | null>(null);

  const headingId = useId();
  const sliderId = useId();
  const reducedMotion = Boolean(useReducedMotion());

  const visible = useInView(sectionRef, {
    amount: 0.2,
  });

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  const machine = machines[index];
  const duration = reducedMotion ? 0 : 0.95;

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);

    update();
    document.addEventListener("visibilitychange", update);

    return () => {
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    if (
      !visible ||
      !pageVisible ||
      hovered ||
      focused ||
      touching ||
      reducedMotion
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % machines.length);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [
    index,
    visible,
    pageVisible,
    hovered,
    focused,
    touching,
    reducedMotion,
  ]);

  function selectSlide(next: number, movement = 1) {
    setDirection(movement);

    setIndex(
      ((next % machines.length) + machines.length) % machines.length
    );
  }

  return (
    <section
      ref={sectionRef}
      id="products"
      aria-labelledby={headingId}
      className="overflow-hidden bg-white py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        {/* Section heading */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
            ease,
          }}
        >
          <div className="mb-3 inline-flex items-center gap-2 text-[#ed1c24]">
            <Zap
              size={17}
              fill="currentColor"
              strokeWidth={1}
              aria-hidden="true"
            />

            <p className="text-[10px] font-semibold tracking-[0.08em] uppercase">
              Five-Machine Lineup
            </p>
          </div>

          <h2
            id={headingId}
            className="max-w-[470px] font-heading text-[30px] leading-[1.2] font-semibold tracking-[-0.035em] text-[#202327] sm:text-4xl"
          >
            Explore Our{" "}
            <span className="text-[#ed1c24]">Cutting</span>
            <br className="hidden sm:block" /> Machine Range.
          </h2>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[700px] text-sm leading-6 text-zinc-500">
              Choose from laser, plasma and gas cutting machines
              available across CNC gantry and portable formats.
            </p>

            <span className="shrink-0 text-xs font-medium text-[#ed1c24]">
              All Machine Lineup ({machines.length})
            </span>
          </div>
        </motion.div>

        {/* Slider */}
        <div
          id={sliderId}
          role="region"
          aria-roledescription="carousel"
          aria-label="Cutting machine range"
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") {
              setHovered(true);
            }
          }}
          onPointerLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setFocused(false);
            }
          }}
          className="mt-9 grid min-w-0 grid-cols-1 items-center gap-6 sm:mt-11 lg:mt-12 lg:grid-cols-[0.85fr_1.85fr] lg:gap-8"
        >
          {/* Stable text area */}
          <div className="order-2 grid min-w-0 lg:order-1">
            {machines.map((item, itemIndex) => {
              const selected = index === itemIndex;

              return (
                <motion.div
                  key={item.id}
                  initial={false}
                  animate={{
                    opacity: selected ? 1 : 0,
                    y:
                      reducedMotion || selected
                        ? 0
                        : -12 * direction,
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.65,
                    ease,
                    delay: selected && !reducedMotion ? 0.12 : 0,
                  }}
                  aria-hidden={!selected}
                  inert={!selected}
                  className={`col-start-1 row-start-1 ${
                    selected
                      ? "relative z-10"
                      : "pointer-events-none"
                  }`}
                >
                  <h3 className="font-heading text-xl leading-snug font-semibold tracking-tight text-[#202327] sm:text-2xl lg:text-[21px]">
                    {itemIndex + 1}. {item.title}
                  </h3>

                  <p className="mt-4 max-w-[560px] text-sm leading-7 text-zinc-500 lg:max-w-[330px]">
                    {item.description}
                  </p>

                  <Link
                    href={item.href}
                    tabIndex={selected ? 0 : -1}
                    className={`group mt-5 inline-flex min-h-11 items-center gap-5 border-b border-red-300 text-sm font-medium text-[#ed1c24] transition-colors hover:border-[#ed1c24] ${focus}`}
                  >
                    View Details

                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      className="transition-transform duration-500 group-hover:translate-x-1 motion-reduce:transition-none"
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Images */}
          <div className="order-1 min-w-0 lg:order-2">
            <div
              className="grid min-w-0 grid-cols-1 items-center gap-4 lg:grid-cols-[1.4fr_1fr_0.7fr]"
              style={{ touchAction: "pan-y" }}
              onTouchStart={(event) => {
                touchStartRef.current = event.touches[0].clientX;
                setTouching(true);
              }}
              onTouchEnd={(event) => {
                if (touchStartRef.current !== null) {
                  const distance =
                    touchStartRef.current -
                    event.changedTouches[0].clientX;

                  if (Math.abs(distance) > 45) {
                    const movement = distance > 0 ? 1 : -1;

                    selectSlide(index + movement, movement);
                  }
                }

                touchStartRef.current = null;
                setTouching(false);
              }}
              onTouchCancel={() => {
                touchStartRef.current = null;
                setTouching(false);
              }}
            >
              {/* Active image: full colour */}
              <div className="min-w-0 rounded-[24px] bg-red-50 p-[5px] shadow-[0_0_24px_-8px_rgba(237,28,36,0.25)]">
                <div className="relative isolate aspect-[4/3] overflow-hidden rounded-[19px] bg-zinc-100 sm:aspect-[16/10] lg:aspect-[1.15/1]">
                  <AnimatePresence
                    initial={false}
                    custom={direction}
                  >
                    <motion.div
                      key={machine.id}
                      custom={direction}
                      variants={{
                        enter: (movement: number) => ({
                          opacity: 0,
                          x: reducedMotion ? 0 : movement * 38,
                          scale: reducedMotion ? 1 : 1.035,
                        }),
                        center: {
                          opacity: 1,
                          x: 0,
                          scale: 1,
                        },
                        exit: (movement: number) => ({
                          opacity: 0,
                          x: reducedMotion ? 0 : movement * -28,
                          scale: 1,
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration, ease }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={machine.image}
                        alt={machine.title}
                        fill
                        sizes="(min-width: 1024px) 340px, 100vw"
                        className="object-cover opacity-100 saturate-100"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Inactive previews: dull on laptop and desktop */}
              {[1, 2].map((offset) => {
                const previewIndex =
                  (index + offset) % machines.length;

                const preview = machines[previewIndex];

                return (
                  <button
                    key={offset}
                    type="button"
                    aria-label={`Show ${preview.title}`}
                    aria-controls={sliderId}
                    onClick={() => selectSlide(previewIndex)}
                    className={`group relative hidden aspect-[1.15/1] min-w-0 cursor-pointer overflow-hidden rounded-[18px] bg-zinc-100 lg:block ${focus}`}
                  >
                    {/* White background makes reduced opacity softer */}
                    <div className="absolute inset-0 bg-white" />

                    {/* Fixed opacity wrapper keeps previews dull
                        throughout their slide transitions. */}
                    <div
                      className={`absolute inset-0 ${
                        offset === 1
                          ? "opacity-45 saturate-[0.35]"
                          : "opacity-30 saturate-[0.2]"
                      }`}
                    >
                      <AnimatePresence initial={false}>
                        <motion.div
                          key={preview.id}
                          initial={{
                            opacity: 0,
                            x: reducedMotion ? 0 : 15,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          exit={{
                            opacity: 0,
                            x: reducedMotion ? 0 : -12,
                          }}
                          transition={{ duration, ease }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={preview.image}
                            alt=""
                            fill
                            sizes="220px"
                            className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="mt-5 flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Previous machine"
                aria-controls={sliderId}
                onClick={() => selectSlide(index - 1, -1)}
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-[#ed1c24] hover:text-[#ed1c24] ${focus}`}
              >
                <ChevronLeft size={17} aria-hidden="true" />
              </button>

              <div className="flex items-center">
                {machines.map((item, itemIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Show ${item.title}`}
                    aria-current={
                      index === itemIndex ? "true" : undefined
                    }
                    aria-controls={sliderId}
                    onClick={() =>
                      selectSlide(
                        itemIndex,
                        itemIndex > index ? 1 : -1
                      )
                    }
                    className={`flex h-10 w-7 cursor-pointer items-center justify-center rounded-sm ${focus}`}
                  >
                    <span
                      className={`h-[3px] rounded-full transition-[width,background-color] duration-500 motion-reduce:transition-none ${
                        index === itemIndex
                          ? "w-5 bg-[#ed1c24]"
                          : "w-3 bg-red-200"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                aria-label="Next machine"
                aria-controls={sliderId}
                onClick={() => selectSlide(index + 1)}
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-[#ed1c24] hover:text-[#ed1c24] ${focus}`}
              >
                <ChevronRight size={17} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}