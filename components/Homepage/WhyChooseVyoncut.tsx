"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Cog,
  Headset,
  Settings2,
  ShieldCheck,
  UserRoundCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";

type Benefit = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const benefits: Benefit[] = [
  {
    title: "Support",
    description:
      "Guidance and assistance throughout your machine journey.",
    icon: ShieldCheck,
  },
  {
    title: "Machine Setup",
    description:
      "Setup support to help prepare your machine for operation.",
    icon: Cog,
  },
  {
    title: "Training",
    description:
      "Helping operators understand machine use and workflow.",
    icon: UserRoundCheck,
  },
  {
    title: "Configuration",
    description:
      "Guidance based on your cutting and production requirements.",
    icon: Settings2,
  },
  {
    title: "Service",
    description:
      "Ongoing assistance to support reliable machine operation.",
    icon: Headset,
  },
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

const focusClass =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ed1c24]";

type BenefitCardProps = {
  benefit: Benefit;
  index: number;
  show: boolean;
  reducedMotion: boolean;
};

function BenefitCard({
  benefit,
  index,
  show,
  reducedMotion,
}: BenefitCardProps) {
  const Icon = benefit.icon;

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 25 }}
      animate={{
        opacity: show ? 1 : 0,
        y: show ? 0 : 25,
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.75,
        delay: reducedMotion ? 0 : index * 0.1,
        ease: smoothEase,
      }}
      className="h-full"
    >
      {/* Separate hover transition from the entrance animation */}
      <div
        className="
          group relative flex h-full min-h-[238px] flex-col
          items-center rounded-[20px] border border-red-200/80
          bg-white px-5 py-7 text-center
          shadow-[0_10px_24px_-16px_rgba(0,0,0,0.16)]
          transition-[translate,border-color,box-shadow]
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          lg:hover:-translate-y-2
          lg:hover:border-[#ed1c24]
          lg:hover:shadow-[0_22px_38px_-18px_rgba(237,28,36,0.3)]
          motion-reduce:transition-none
          motion-reduce:lg:hover:translate-y-0
        "
      >
        {/* Layered icon */}
        <div className="mb-4 flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full bg-[#fff0f2]">
          <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#ffdade]">
            <div
              className="
                flex h-[42px] w-[42px] items-center justify-center
                rounded-full bg-[#ffbdc7] text-[#ed1c24]
                transition-colors duration-500 ease-out
                lg:group-hover:bg-[#ed1c24]
                lg:group-hover:text-white
                motion-reduce:transition-none
              "
            >
              <Icon
                size={22}
                strokeWidth={1.9}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <h3 className="font-heading text-base font-semibold tracking-tight text-[#202327]">
          {benefit.title}
        </h3>

        <p className="mt-2 max-w-[195px] text-xs leading-[1.7] text-zinc-500">
          {benefit.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhyChooseVyoncut() {
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartRef = useRef<number | null>(null);
  const directionRef = useRef(1);

  const resumeTimerRef = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);

  const headingId = useId();
  const sliderId = useId();

  const reducedMotion = Boolean(useReducedMotion());

  const entered = useInView(sectionRef, {
    once: true,
    amount: 0.15,
  });

  const currentlyVisible = useInView(sectionRef, {
    amount: 0.15,
  });

  const [backgroundStarted, setBackgroundStarted] = useState(false);
  const [cardsReady, setCardsReady] = useState(false);
  const [visibleCards, setVisibleCards] = useState(1);
  const [slide, setSlide] = useState(0);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  const desktop = visibleCards === 5;
  const lastSlide = benefits.length - visibleCards;
  const safeSlide = Math.max(0, Math.min(slide, lastSlide));

  const showBackground = reducedMotion || backgroundStarted;
  const showCards = reducedMotion || cardsReady;

  // Match the Tailwind responsive card widths.
  useEffect(() => {
    const tabletQuery = window.matchMedia("(min-width: 640px)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    function updateSize() {
      setVisibleCards(
        desktopQuery.matches ? 5 : tabletQuery.matches ? 2 : 1
      );

      setSlide(0);
      directionRef.current = 1;
    }

    updateSize();

    tabletQuery.addEventListener("change", updateSize);
    desktopQuery.addEventListener("change", updateSize);

    return () => {
      tabletQuery.removeEventListener("change", updateSize);
      desktopQuery.removeEventListener("change", updateSize);
    };
  }, []);

  // Stop automatic sliding when the browser tab is hidden.
  useEffect(() => {
    function onVisibilityChange() {
      setPageVisible(!document.hidden);
    }

    onVisibilityChange();

    document.addEventListener(
      "visibilitychange",
      onVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        onVisibilityChange
      );
    };
  }, []);

  // Heading first, then the desktop background.
  useEffect(() => {
    if (!entered || reducedMotion) return;

    const timer = window.setTimeout(() => {
      setBackgroundStarted(true);

      // Mobile/tablet has no background animation to wait for.
      if (!desktop) setCardsReady(true);
    }, 850);

    return () => window.clearTimeout(timer);
  }, [entered, reducedMotion, desktop]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  // Slide gently back and forth without jumping at the end.
  useEffect(() => {
    if (
      desktop ||
      !showCards ||
      !currentlyVisible ||
      !pageVisible ||
      reducedMotion ||
      interactionPaused ||
      hovered ||
      focused
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setSlide((current) => {
        const position = Math.max(
          0,
          Math.min(current, lastSlide)
        );

        if (position >= lastSlide) {
          directionRef.current = -1;
        } else if (position <= 0) {
          directionRef.current = 1;
        }

        return position + directionRef.current;
      });
    }, 4000);

    return () => window.clearInterval(timer);
  }, [
    desktop,
    showCards,
    currentlyVisible,
    pageVisible,
    reducedMotion,
    interactionPaused,
    hovered,
    focused,
    lastSlide,
  ]);

  function pauseTemporarily() {
    setInteractionPaused(true);

    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = setTimeout(() => {
      setInteractionPaused(false);
    }, 7000);
  }

  function moveTo(next: number) {
    pauseTemporarily();
    setSlide(Math.max(0, Math.min(next, lastSlide)));
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby={headingId}
      className="relative isolate overflow-hidden bg-white py-12 sm:py-16 lg:py-20"
    >
      {/* Desktop background only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden lg:block"
      >
        <motion.div
          initial={
            reducedMotion
              ? false
              : { clipPath: "inset(0 100% 0 0)" }
          }
          animate={{
            clipPath: showBackground
              ? "inset(0 0% 0 0)"
              : "inset(0 100% 0 0)",
          }}
          transition={{
            duration: reducedMotion ? 0 : 1.2,
            ease: [0.65, 0, 0.35, 1],
          }}
          onAnimationComplete={() => {
            if (showBackground) setCardsReady(true);
          }}
          className="absolute inset-0"
        >
          <svg
            viewBox="0 0 1440 560"
            preserveAspectRatio="none"
            className="h-full w-full drop-shadow-[0_18px_14px_rgba(0,0,0,0.14)]"
          >
            <path
              d="
                M0 92
                C420 240 1010 500 1440 330
                L1440 415
                C1030 550 420 465 0 355
                Z
              "
              fill="#191c20"
            />
          </svg>
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={
            reducedMotion ? false : { opacity: 0, y: 20 }
          }
          animate={{
            opacity: entered || reducedMotion ? 1 : 0,
            y: entered || reducedMotion ? 0 : 20,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
            ease: smoothEase,
          }}
          className="mx-auto max-w-[600px] text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 text-[#ed1c24]">
            <Zap
              size={17}
              fill="currentColor"
              strokeWidth={1}
              aria-hidden="true"
            />

            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase">
              Why VYONCUT
            </p>
          </div>

          <h2
            id={headingId}
            className="font-heading text-[30px] leading-tight font-semibold tracking-[-0.035em] text-[#202327] sm:text-4xl"
          >
            Why <span className="text-[#ed1c24]">Choose</span>{" "}
            VYONCUT
          </h2>

          <p className="mx-auto mt-4 max-w-[490px] text-sm leading-6 text-zinc-500">
            Support at every step—from machine setup and operator
            training to your everyday production needs.
          </p>
        </motion.div>

        {/* Cards / responsive slider */}
        <div
          role="region"
          aria-label="VYONCUT benefits"
          aria-roledescription={desktop ? undefined : "carousel"}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setFocused(false);
            }
          }}
          className="relative mt-6 sm:mt-8"
        >
          <div
            id={sliderId}
            className="overflow-hidden"
            style={{ touchAction: "pan-y" }}
            onTouchStart={(event) => {
              touchStartRef.current = event.touches[0].clientX;
              pauseTemporarily();
            }}
            onTouchEnd={(event) => {
              if (touchStartRef.current === null || desktop) return;

              const distance =
                touchStartRef.current -
                event.changedTouches[0].clientX;

              if (Math.abs(distance) > 45) {
                moveTo(safeSlide + (distance > 0 ? 1 : -1));
              }

              touchStartRef.current = null;
            }}
            onTouchCancel={() => {
              touchStartRef.current = null;
            }}
          >
            <motion.ul
              animate={{
                x: desktop
                  ? "0%"
                  : `-${safeSlide * (100 / visibleCards)}%`,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.85,
                ease: smoothEase,
              }}
              className="flex pt-6 pb-8"
            >
              {benefits.map((benefit, index) => {
                const offscreen =
                  !desktop &&
                  (index < safeSlide ||
                    index >= safeSlide + visibleCards);

                return (
                  <li
                    key={benefit.title}
                    aria-hidden={offscreen || undefined}
                    className="w-full shrink-0 px-2 sm:w-1/2 lg:w-1/5"
                  >
                    <BenefitCard
                      benefit={benefit}
                      index={index}
                      show={showCards}
                      reducedMotion={reducedMotion}
                    />
                  </li>
                );
              })}
            </motion.ul>
          </div>

          {/* Mobile/tablet controls */}
          <div className="flex items-center justify-center gap-3 lg:hidden">
            <button
              type="button"
              aria-label="Previous benefit"
              aria-controls={sliderId}
              disabled={safeSlide === 0}
              onClick={() => moveTo(safeSlide - 1)}
              className={`flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-colors duration-300 hover:border-[#ed1c24] hover:text-[#ed1c24] disabled:cursor-not-allowed disabled:opacity-30 ${focusClass}`}
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>

            <div className="flex items-center">
              {Array.from(
                { length: lastSlide + 1 },
                (_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Show benefits starting with ${benefits[index].title}`}
                    aria-current={
                      safeSlide === index ? "true" : undefined
                    }
                    aria-controls={sliderId}
                    onClick={() => moveTo(index)}
                    className={`flex h-10 w-7 cursor-pointer items-center justify-center rounded-md ${focusClass}`}
                  >
                    <span
                      className={`h-1.5 rounded-full transition-[width,background-color] duration-500 motion-reduce:transition-none ${
                        safeSlide === index
                          ? "w-5 bg-[#ed1c24]"
                          : "w-1.5 bg-zinc-300"
                      }`}
                    />
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              aria-label="Next benefit"
              aria-controls={sliderId}
              disabled={safeSlide === lastSlide}
              onClick={() => moveTo(safeSlide + 1)}
              className={`flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-colors duration-300 hover:border-[#ed1c24] hover:text-[#ed1c24] disabled:cursor-not-allowed disabled:opacity-30 ${focusClass}`}
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}