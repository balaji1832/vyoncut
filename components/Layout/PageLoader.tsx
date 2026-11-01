"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

type Props = {
  children: ReactNode;
};

const PageReadyContext = createContext(false);

export function usePageReady() {
  return useContext(PageReadyContext);
}

const panelEase = [0.76, 0, 0.24, 1] as const;
const softEase = [0.22, 1, 0.36, 1] as const;
const loaderDuration = 2400;

const gridBackground = {
  backgroundImage:
    "linear-gradient(rgba(17,17,17,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.035) 1px, transparent 1px)",
  backgroundSize: "52px 52px",
};

function LoaderTransition({ children }: Props) {
  const reduceMotion = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 24 });
  const ambientLight = useMotionTemplate`radial-gradient(circle at ${smoothX}% ${smoothY}%, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.38) 16%, rgba(255,255,255,0) 42%)`;

  useEffect(() => {
    const timer = window.setTimeout(
      () => setLoading(false),
      reduceMotion ? 250 : loaderDuration,
    );

    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    if (ready) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [ready]);

  const exitDuration = reduceMotion ? 0.15 : 0.9;

  return (
    <PageReadyContext.Provider value={ready}>
      {/* Keep the static shell rendered behind the fixed loader overlay. */}
      <div
        aria-busy={!ready}
        className="flex min-h-svh flex-col"
        inert={!ready ? true : undefined}
      >
        {children}
      </div>

      <AnimatePresence onExitComplete={() => setReady(true)}>
        {loading && (
          <motion.div
            key="vyoncut-loader"
            role="status"
            aria-live="polite"
            aria-label="Preparing the VYONCUT experience"
            initial="visible"
            animate="visible"
            exit="exit"
            variants={{
              visible: { opacity: 1 },
              exit: {
                opacity: reduceMotion ? 0 : 1,
                transition: { duration: exitDuration },
              },
            }}
            onPointerMove={(event) => {
              if (reduceMotion) return;
              const bounds = event.currentTarget.getBoundingClientRect();
              pointerX.set(((event.clientX - bounds.left) / bounds.width) * 100);
              pointerY.set(((event.clientY - bounds.top) / bounds.height) * 100);
            }}
            onPointerLeave={() => {
              pointerX.set(50);
              pointerY.set(50);
            }}
            className="fixed inset-0 z-[9999] isolate cursor-progress overflow-hidden text-[#111111]"
          >
            <span className="sr-only">Preparing VYONCUT</span>

            {/* The two panels open from the center like theater curtains. */}
            <motion.div
              variants={{
                visible: { x: "0%" },
                exit: { x: reduceMotion ? "0%" : "-101%" },
              }}
              transition={{ duration: exitDuration, ease: panelEase }}
              className="absolute inset-y-0 left-0 w-[calc(50%+1px)] bg-[#efede7]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.18),transparent_32%,rgba(0,0,0,0.025)_72%,transparent)]" />
            </motion.div>
            <motion.div
              variants={{
                visible: { x: "0%" },
                exit: { x: reduceMotion ? "0%" : "101%" },
              }}
              transition={{
                duration: exitDuration,
                delay: reduceMotion ? 0 : 0.035,
                ease: panelEase,
              }}
              className="absolute inset-y-0 right-0 w-[calc(50%+1px)] bg-[#efede7]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.025)_28%,transparent_68%,rgba(255,255,255,0.18))]" />
            </motion.div>

            <motion.div
              aria-hidden="true"
              variants={{
                visible: { opacity: 1, scale: 1 },
                exit: {
                  opacity: 0,
                  scale: reduceMotion ? 1 : 1.025,
                  transition: {
                    duration: reduceMotion ? 0.1 : 0.28,
                    ease: softEase,
                  },
                },
              }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0" style={gridBackground} />
              <motion.div
                style={{ background: ambientLight }}
                className="pointer-events-none absolute inset-0"
              />

              {/* Subtle diagonal architectural accents. */}
              <motion.div
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.25, delay: 0.1, ease: softEase }}
                className="absolute left-[-8vw] top-[18%] h-px w-[46vw] origin-left -rotate-[18deg] bg-gradient-to-r from-transparent via-black/10 to-transparent"
              />
              <motion.div
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.25, delay: 0.22, ease: softEase }}
                className="absolute bottom-[17%] right-[-8vw] h-px w-[46vw] origin-right -rotate-[18deg] bg-gradient-to-r from-transparent via-black/10 to-transparent"
              />

              {/* Technical header. */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.15, ease: softEase }}
                className="absolute inset-x-5 top-5 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.32em] text-black/45 sm:inset-x-8 sm:top-7 sm:text-[10px]"
              >
                <span className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ed1c24] shadow-[0_0_12px_rgba(237,28,36,0.75)]" />
                  System online
                </span>
                <span className="hidden sm:block">Precision cutting systems</span>
                <span>01 / 01</span>
              </motion.div>

              <div className="absolute inset-0 flex items-center justify-center px-5">
                <div className="relative flex w-full max-w-[620px] flex-col items-center">
                  <motion.p
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25, ease: softEase }}
                    className="mb-6 text-[9px] font-semibold uppercase tracking-[0.48em] text-black/45 sm:text-[10px]"
                  >
                    Engineered for accuracy
                  </motion.p>

                  {/* Precision frame and logo stage. */}
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.18, ease: softEase }}
                    whileHover={reduceMotion ? undefined : { scale: 1.018 }}
                    className="group relative flex h-[210px] w-full max-w-[390px] items-center justify-center sm:h-[250px] sm:max-w-[470px]"
                  >
                    {/* Corner guides. */}
                    <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-black/25 transition-all duration-500 group-hover:h-11 group-hover:w-11 group-hover:border-[#ed1c24]/60" />
                    <span className="absolute right-0 top-0 h-8 w-8 border-r border-t border-black/25 transition-all duration-500 group-hover:h-11 group-hover:w-11 group-hover:border-[#ed1c24]/60" />
                    <span className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-black/25 transition-all duration-500 group-hover:h-11 group-hover:w-11 group-hover:border-[#ed1c24]/60" />
                    <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-black/25 transition-all duration-500 group-hover:h-11 group-hover:w-11 group-hover:border-[#ed1c24]/60" />

                    {/* Calibration ticks. */}
                    <div className="absolute inset-x-10 top-0 flex justify-between">
                      {[0, 1, 2, 3, 4, 5, 6].map((tick) => (
                        <motion.span
                          key={tick}
                          initial={reduceMotion ? false : { scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: 0.28 + tick * 0.045 }}
                          className={`block origin-top bg-black/20 ${tick === 3 ? "h-3 w-px" : "h-1.5 w-px"}`}
                        />
                      ))}
                    </div>

                    <motion.div
                      initial={
                        reduceMotion
                          ? false
                          : {
                              clipPath: "inset(0 100% 0 0)",
                              opacity: 0,
                              scale: 0.92,
                              filter: "blur(9px)",
                            }
                      }
                      animate={{
                        clipPath: "inset(0 0% 0 0)",
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 1.05,
                        delay: reduceMotion ? 0 : 0.38,
                        ease: softEase,
                      }}
                      className="relative h-[145px] w-[230px] sm:h-[172px] sm:w-[280px]"
                    >
                      <Image
                        src="/icons/vyoncut-logo.svg"
                        alt=""
                        fill
                        priority
                        sizes="(min-width: 640px) 280px, 230px"
                        className="object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.08)]"
                      />

                      {!reduceMotion && (
                        <div
                          className="pointer-events-none absolute inset-0 overflow-hidden"
                          style={{
                            maskImage: "url('/icons/vyoncut-logo.svg')",
                            WebkitMaskImage: "url('/icons/vyoncut-logo.svg')",
                            maskSize: "contain",
                            WebkitMaskSize: "contain",
                            maskRepeat: "no-repeat",
                            WebkitMaskRepeat: "no-repeat",
                            maskPosition: "center",
                            WebkitMaskPosition: "center",
                          }}
                        >
                          <motion.div
                            initial={{ x: "-160%" }}
                            animate={{ x: "460%" }}
                            transition={{
                              duration: 0.9,
                              delay: 1.08,
                              ease: "easeInOut",
                            }}
                            className="absolute inset-y-0 left-0 w-1/3 -skew-x-[16deg] bg-gradient-to-r from-transparent via-white/95 to-transparent"
                          />
                        </div>
                      )}
                    </motion.div>

                    {/* Laser head, beam, and sparks. */}
                    {!reduceMotion && (
                      <motion.div
                        initial={{ left: "4%", opacity: 0 }}
                        animate={{ left: ["4%", "4%", "96%"], opacity: [0, 1, 1] }}
                        transition={{
                          duration: 1.25,
                          delay: 0.38,
                          times: [0, 0.08, 1],
                          ease: "easeInOut",
                        }}
                        className="pointer-events-none absolute inset-y-5 z-10 w-px"
                      >
                        <div className="absolute inset-y-0 w-px bg-[#ed1c24]/80 shadow-[0_0_15px_2px_rgba(237,28,36,0.38)]" />
                        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_3px_#ed1c24,0_0_24px_7px_rgba(237,28,36,0.45)]" />
                        {[[-11, -12], [10, -7], [-8, 13], [12, 11]].map(
                          ([x, y], index) => (
                            <motion.span
                              key={index}
                              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                              animate={{
                                x: [0, x],
                                y: [0, y],
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 0.42,
                                delay: 0.85 + index * 0.07,
                                repeat: 1,
                                repeatDelay: 0.18,
                              }}
                              className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-[#ed1c24]"
                            />
                          ),
                        )}
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Progress and system copy. */}
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.72, ease: softEase }}
                    className="mt-7 w-full max-w-[310px] sm:max-w-[360px]"
                  >
                    <div className="mb-2.5 flex items-center justify-between text-[8px] font-semibold uppercase tracking-[0.28em] text-black/45 sm:text-[9px]">
                      <span>Calibrating precision</span>
                      <motion.span
                        initial={{ opacity: 0.35 }}
                        animate={{ opacity: [0.35, 1, 0.35] }}
                        transition={{ duration: 0.9, repeat: Infinity }}
                        className="text-[#ed1c24]"
                      >
                        Active
                      </motion.span>
                    </div>
                    <div className="relative h-px overflow-hidden bg-black/15">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: reduceMotion ? 0 : loaderDuration / 1000 - 0.25,
                          ease: [0.2, 0.7, 0.25, 1],
                        }}
                        className="absolute inset-0 origin-left bg-[#ed1c24] shadow-[0_0_10px_rgba(237,28,36,0.45)]"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.95, ease: softEase }}
                className="absolute inset-x-5 bottom-5 flex items-end justify-between text-[8px] font-medium uppercase tracking-[0.24em] text-black/35 sm:inset-x-8 sm:bottom-7 sm:text-[9px]"
              >
                <span>Laser · Plasma · Gas</span>
                <span className="hidden sm:block">Move pointer to inspect</span>
                <span>Built for steel</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageReadyContext.Provider>
  );
}

export default function PageLoader({ children }: Props) {
  const pathname = usePathname();

  return <LoaderTransition key={pathname}>{children}</LoaderTransition>;
}
