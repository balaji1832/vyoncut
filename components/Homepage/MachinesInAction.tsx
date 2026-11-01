"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Play, Zap } from "lucide-react";

type MachineVideo = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  video: string;
  poster: string;
};

const machineVideos: MachineVideo[] = [
  {
    id: "cnc-plasma",
    title: "CNC Plasma Cutting Machine",
    description:
      "See the complete CNC plasma cutting process in action, from precise machine movement and cutting-head operation to the final finished component.",
    tags: ["Precision Cutting", "Clean Finish"],
    video: "/videos/cnc-plasma.mp4",
    poster: "/images/cnc-plasma.png",
  },
  {
    id: "cnc-gas",
    title: "CNC Gas Cutting Machine",
    description:
      "Watch the CNC gas cutting process in action, delivering controlled movement and powerful flame cutting for accurate processing of thick metal plates.",
    tags: ["Heavy-Duty Cutting", "High Accuracy"],
    video: "/videos/cnc-gas.mp4",
    poster: "/images/cnc-gas.png",
  },
  {
    id: "portable-plasma",
    title: "Portable Plasma Cutting Machine",
    description:
      "See the portable plasma cutting machine in action, offering fast setup, smooth movement and precise cutting for flexible on-site metal fabrication.",
    tags: ["Portable Cutting", "Fast Operation"],
    video: "/videos/portable-plasma.mp4",
    poster: "/images/portable-plasma.png",
  },
  {
    id: "portable-gas",
    title: "Portable Gas Cutting Machine",
    description:
      "Watch the portable gas cutting process in action, combining easy mobility and controlled flame cutting for dependable workshop and on-site applications.",
    tags: ["Easy Mobility", "Reliable Cutting"],
    video: "/videos/portable-gas.mp4",
    poster: "/images/portable-gas.png",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ed1c24]";

function VideoPlayer({ machine }: { machine: MachineVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState("");

  function handleError() {
    const code = videoRef.current?.error?.code;

    switch (code) {
      case 2:
        setError("The video could not load. Check the file URL.");
        break;
      case 3:
        setError(
          "This video could not be decoded. Export it as MP4 with H.264 video and AAC audio."
        );
        break;
      case 4:
        setError(
          "The video is missing or its format is unsupported. Check the file path and encoding."
        );
        break;
      default:
        setError("Unable to play this video.");
    }
  }

  return (
    <div>
      <div className="overflow-hidden rounded-[18px] border border-zinc-200 bg-zinc-950 p-[3px] shadow-[0_10px_28px_-20px_rgba(0,0,0,0.3)]">
        <video
          ref={videoRef}
          src={machine.video}
          poster={machine.poster}
          controls
          playsInline
          preload="metadata"
          onError={handleError}
          onLoadedMetadata={() => setError("")}
          aria-label={`${machine.title} demonstration`}
          className="block aspect-video w-full rounded-[15px] bg-black object-contain"
        >
          Your browser does not support HTML video.
        </video>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-2 rounded-lg border border-red-100 bg-red-50 p-3 text-xs leading-5 text-red-700"
        >
          <p>{error}</p>

          <a
            href={machine.video}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-2 inline-flex items-center gap-2 font-semibold underline underline-offset-4 ${focus}`}
          >
            Open video directly
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  );
}

export default function MachinesInAction() {
  const id = useId();
  const reducedMotion = Boolean(useReducedMotion());

  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const machine = machineVideos[activeIndex];

  function revealTab(index: number, smooth = true) {
    const container = tabListRef.current;
    const tab = tabRefs.current[index];

    if (
      !container ||
      !tab ||
      window.matchMedia("(min-width: 1024px)").matches
    ) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();

    // Center the selected tab inside its horizontal scroller.
    // Only this container scrolls; the page stays in place.
    const target =
      container.scrollLeft +
      tabRect.left -
      containerRect.left -
      (container.clientWidth - tabRect.width) / 2;

    const maximum =
      container.scrollWidth - container.clientWidth;

    container.scrollTo({
      left: Math.max(0, Math.min(target, maximum)),
      behavior:
        smooth && !reducedMotion ? "smooth" : "instant",
    });
  }

  useEffect(() => {
    revealTab(activeIndex);
  }, [activeIndex, reducedMotion]);

  useEffect(() => {
    const container = tabListRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      revealTab(activeIndex, false);
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [activeIndex, reducedMotion]);

  function selectMachine(index: number, moveFocus = false) {
    setActiveIndex(index);

    if (moveFocus) {
      tabRefs.current[index]?.focus({ preventScroll: true });
    }

    // Also handles clicking the already-selected tab.
    revealTab(index);
  }

  function handleTabKey(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    let next = index;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (index + 1) % machineVideos.length;
        break;

      case "ArrowLeft":
      case "ArrowUp":
        next =
          (index - 1 + machineVideos.length) %
          machineVideos.length;
        break;

      case "Home":
        next = 0;
        break;

      case "End":
        next = machineVideos.length - 1;
        break;

      default:
        return;
    }

    event.preventDefault();
    selectMachine(next, true);
  }

  return (
    <section
      aria-labelledby={`${id}-heading`}
      className="overflow-hidden bg-white py-9 sm:py-12 lg:py-14"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-7 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reducedMotion ? 0 : 0.7,
            ease,
          }}
          className="mx-auto max-w-[700px] text-center"
        >
          <div className="mb-2 inline-flex items-center gap-2 text-[#ed1c24]">
            <Zap
              size={15}
              fill="currentColor"
              strokeWidth={1}
              aria-hidden="true"
            />

            <p className="text-[10px] font-semibold tracking-[0.1em] uppercase">
              Watch Machines in Action
            </p>
          </div>

          <h2
            id={`${id}-heading`}
            className="font-heading text-[26px] leading-tight font-semibold tracking-[-0.035em] text-[#202327] sm:text-[34px]"
          >
            See Our{" "}
            <span className="text-[#ed1c24]">Machines</span>{" "}
            In Action.
          </h2>

          <p className="mx-auto mt-3 max-w-[620px] text-xs leading-6 text-zinc-500 sm:text-sm">
            Watch real VYONCUT machines cutting, moving and
            producing finished components in actual operating
            conditions.
          </p>
        </motion.div>

        <div className="mt-6 grid min-w-0 grid-cols-1 items-start gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
          {/* Machine selector */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reducedMotion ? 0 : 0.7,
              ease,
            }}
            className="order-1 min-w-0 lg:order-2"
          >
            <div
              ref={tabListRef}
              role="tablist"
              aria-label="Choose a machine video"
              className="flex gap-2 overflow-x-auto overscroll-x-contain px-1 py-1 [scrollbar-width:none] lg:flex-col lg:gap-2 lg:overflow-visible lg:p-0 [&::-webkit-scrollbar]:hidden"
            >
              {machineVideos.map((item, index) => {
                const selected = activeIndex === index;

                return (
                  <button
                    key={item.id}
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    id={`${id}-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`${id}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => selectMachine(index)}
                    onKeyDown={(event) =>
                      handleTabKey(event, index)
                    }
                    className={`group flex min-h-[62px] w-[min(280px,calc(100%-8px))] shrink-0 cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors duration-300 sm:w-[300px] lg:min-h-[68px] lg:w-full lg:px-4 ${
                      selected
                        ? "border-[#191c20] bg-[#191c20] text-white"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-red-200 hover:bg-red-50"
                    } ${focus}`}
                  >
                    <span className="shrink-0 text-[10px] font-medium opacity-50 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0 font-heading text-[13px] leading-5 font-medium sm:text-sm">
                      {item.title}
                    </span>

                    <span
                      className={`ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                        selected
                          ? "bg-white text-[#ed1c24]"
                          : "text-[#ed1c24]"
                      }`}
                    >
                      {selected ? (
                        <Play size={11} aria-hidden="true" />
                      ) : (
                        <ArrowUpRight size={16} aria-hidden="true" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-2 hidden px-4 text-xs leading-5 text-zinc-400 lg:block">
              Select a machine, then press Play.
            </p>
          </motion.div>

          {/* Video and description */}
          <div
            id={`${id}-panel`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${activeIndex}`}
            tabIndex={0}
            className={`order-2 min-w-0 rounded-xl lg:order-1 ${focus}`}
          >
            <motion.div
              key={machine.id}
              initial={
                reducedMotion ? false : { opacity: 0, y: 8 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reducedMotion ? 0 : 0.45,
                ease,
              }}
            >
              <VideoPlayer machine={machine} />

              <div className="mt-4">
                <h3 className="font-heading text-[17px] leading-snug font-semibold tracking-tight text-[#202327] sm:text-xl">
                  {activeIndex + 1}. {machine.title}
                </h3>

                <p className="mt-2 max-w-[650px] text-[13px] leading-6 text-zinc-500 sm:text-sm">
                  {machine.description}
                </p>

                <ul className="mt-3 flex flex-wrap gap-2">
                  {machine.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-semibold leading-5 text-[#ed1c24] sm:text-[11px]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}