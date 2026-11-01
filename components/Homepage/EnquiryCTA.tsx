"use client";

import Image from "next/image";
import {
  useId,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Box,
  ChevronDown,
  LoaderCircle,
  MoveHorizontal,
  Zap,
} from "lucide-react";

type EnquiryData = {
  name: string;
  company: string;
  material: string;
  thickness: string;
  message: string;
};

type EnquiryCTAProps = {
  backgroundImage?: string;
  enquiryEmail?: string;
  onSubmitEnquiry?: (data: EnquiryData) => Promise<void>;
};

const materials = [
  "Mild Steel",
  "Stainless Steel",
  "Aluminium",
  "Carbon Steel",
  "Other / Not Sure",
];

const thicknessRanges = [
  "Below 3 mm",
  "3–6 mm",
  "6–12 mm",
  "12–25 mm",
  "Above 25 mm",
  "Not Sure",
];

const ease = [0.22, 1, 0.36, 1] as const;

const fieldClassName =
  "min-h-11 w-full min-w-0 rounded-md border border-[#e1e6ed] bg-[#f7f9fc] px-3 text-xs text-[#26344a] outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-[#8b9bb4] hover:border-zinc-300 focus:border-[#ed1c24]/60 focus:bg-white focus:ring-3 focus:ring-[#ed1c24]/8 disabled:cursor-wait disabled:opacity-60";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

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
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: reducedMotion ? 0 : 1,
        delay: reducedMotion ? 0 : delay,
        ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function EnquiryCTA({
  backgroundImage = "/images/enquiry-background.jpg",
  enquiryEmail = "info@vyoncut.com",
  onSubmitEnquiry,
}: EnquiryCTAProps) {
  const id = useId();
  const reducedMotion = useReducedMotion();

  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [hasError, setHasError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data: EnquiryData = {
      name: String(formData.get("name") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      material: String(formData.get("material") ?? ""),
      thickness: String(formData.get("thickness") ?? ""),
      message: String(formData.get("message") ?? "").trim(),
    };

    if (!data.name) {
      setHasError(true);
      setFeedback("Please enter your name.");
      return;
    }

    setSubmitting(true);
    setFeedback("");
    setHasError(false);

    try {
      if (onSubmitEnquiry) {
        await onSubmitEnquiry(data);

        setFeedback(
          "Thank you. Your consultation request has been submitted."
        );

        form.reset();
      } else {
        const subject = "VYONCUT — Expert Consultation Request";

        const body = [
          "Hello VYONCUT,",
          "",
          "I would like advice on a suitable cutting machine.",
          "",
          `Name: ${data.name}`,
          `Company: ${data.company || "Not provided"}`,
          `Material: ${data.material}`,
          `Thickness Range: ${data.thickness}`,
          "",
          `Message: ${data.message || "Not provided"}`,
        ].join("\n");

        window.location.href = `mailto:${enquiryEmail}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;

        setFeedback(
          "Continue in your email app to send your consultation request."
        );
      }
    } catch {
      setHasError(true);
      setFeedback(
        "Your request could not be submitted. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="enquiry"
      aria-labelledby={`${id}-heading`}
      className="relative isolate scroll-mt-24 overflow-hidden bg-[#f7f8f9]"
    >
      {/* Background image: tablet and desktop only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
      >
        <motion.div
          initial={reducedMotion ? false : { scale: 1.055 }}
          whileInView={{ scale: 1 }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: reducedMotion ? 0 : 1.8,
            ease,
          }}
          className="absolute inset-0"
        >
          <Image
            src={backgroundImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Soft white fade on the content side */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(241,244,242,0.84)_28%,rgba(70,93,99,0.58)_61%,rgba(14,34,43,0.75)_100%)]" />

        {/* Gentle bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
      </div>

      <div className="mx-auto grid max-w-[1360px] grid-cols-1 items-center gap-7 px-5 py-10 sm:px-8 sm:py-12 md:grid-cols-[1.08fr_1fr] md:gap-8 md:py-10 lg:gap-16 lg:px-12 lg:py-12">
        {/* Left content */}
        <div className="min-w-0 md:self-start md:pt-1 lg:pt-2">
          <Reveal>
            <div className="mb-3 inline-flex items-center gap-2 text-[#ed1c24]">
              <Zap
                size={16}
                fill="currentColor"
                strokeWidth={1}
                aria-hidden="true"
              />

              <p className="text-[10px] font-semibold tracking-[0.06em] uppercase">
                Enquiry CTA
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2
              id={`${id}-heading`}
              className="max-w-[570px] font-heading text-[29px] leading-[1.22] font-semibold tracking-[-0.035em] text-[#202327] sm:text-[34px] md:text-[30px] lg:text-[38px]"
            >
              Not Sure Which{" "}
              <span className="text-[#ed1c24]">Cutting</span>
              <br className="hidden min-[400px]:block" />{" "}
              Machine Fits Your Work?
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-4 max-w-[540px] text-[13px] leading-6 text-zinc-600 lg:text-sm">
              Share your material, thickness and production
              requirement with our team and discuss a suitable machine
              option for your application.
            </p>
          </Reveal>

          <div className="mt-6 grid max-w-[450px] grid-cols-2 gap-3 sm:gap-4 lg:mt-7">
            <Reveal delay={0.28}>
              <div className="group flex h-full min-h-[78px] items-center gap-2.5 rounded-xl border border-white/70 bg-white px-3 py-4 shadow-[0_8px_24px_-20px_rgba(0,0,0,0.2)] transition-[translate,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_12px_25px_-18px_rgba(237,28,36,0.25)] motion-reduce:transform-none md:bg-white/55 md:backdrop-blur-md lg:gap-3 lg:px-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-100 bg-white text-[#ed1c24] transition-colors duration-500 group-hover:bg-[#ed1c24] group-hover:text-white">
                  <Box size={17} strokeWidth={1.8} aria-hidden="true" />
                </span>

                <div className="min-w-0">
                  <h3 className="font-heading text-[10px] font-semibold tracking-wide text-zinc-800 uppercase">
                    Material
                  </h3>

                  <p className="mt-1 text-[10px] leading-4 text-zinc-500">
                    What do you cut?
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.38}>
              <div className="group flex h-full min-h-[78px] items-center gap-2.5 rounded-xl border border-white/70 bg-white px-3 py-4 shadow-[0_8px_24px_-20px_rgba(0,0,0,0.2)] transition-[translate,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_12px_25px_-18px_rgba(237,28,36,0.25)] motion-reduce:transform-none md:bg-white/55 md:backdrop-blur-md lg:gap-3 lg:px-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-100 bg-white text-[#ed1c24] transition-colors duration-500 group-hover:bg-[#ed1c24] group-hover:text-white">
                  <MoveHorizontal
                    size={18}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>

                <div className="min-w-0">
                  <h3 className="font-heading text-[10px] font-semibold tracking-wide text-zinc-800 uppercase">
                    Thickness
                  </h3>

                  <p className="mt-1 text-[10px] leading-4 text-zinc-500">
                    What thickness range?
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right form */}
        <Reveal
          delay={0.18}
          className="w-full min-w-0 md:justify-self-end"
        >
          <div className="rounded-[18px] border border-zinc-200/80 bg-white p-5 shadow-[0_18px_50px_-32px_rgba(0,0,0,0.38)] sm:p-7 md:bg-[#f7f7f7] lg:p-8">
            <Reveal delay={0.08}>
              <h3 className="font-heading text-xs font-semibold tracking-[0.025em] text-[#202327] uppercase sm:text-[13px]">
                Tell us what you need to cut.
              </h3>

              <p className="mt-2 text-[9px] leading-5 tracking-[0.08em] text-zinc-500 uppercase">
                Discuss a suitable VYONCUT cutting machine for your
                application.
              </p>
            </Reveal>

            <form onSubmit={handleSubmit} className="mt-4">
              <fieldset
                disabled={submitting}
                className="m-0 min-w-0 border-0 p-0"
              >
                <legend className="sr-only">
                  Your cutting requirements
                </legend>

                <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
                  <Reveal delay={0.12}>
                    <label htmlFor={`${id}-name`} className="sr-only">
                      Your name
                    </label>

                    <input
                      id={`${id}-name`}
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your Name"
                      required
                      maxLength={100}
                      className={fieldClassName}
                    />
                  </Reveal>

                  <Reveal delay={0.18}>
                    <label
                      htmlFor={`${id}-company`}
                      className="sr-only"
                    >
                      Company name
                    </label>

                    <input
                      id={`${id}-company`}
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Company Name"
                      maxLength={150}
                      className={fieldClassName}
                    />
                  </Reveal>

                  <Reveal delay={0.24}>
                    <label
                      htmlFor={`${id}-material`}
                      className="sr-only"
                    >
                      Material
                    </label>

                    <div className="relative">
                      <select
                        id={`${id}-material`}
                        name="material"
                        required
                        defaultValue=""
                        className={`${fieldClassName} cursor-pointer appearance-none pr-9`}
                      >
                        <option value="" disabled>
                          Material
                        </option>

                        {materials.map((material) => (
                          <option key={material} value={material}>
                            {material}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={14}
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-500"
                      />
                    </div>
                  </Reveal>

                  <Reveal delay={0.3}>
                    <label
                      htmlFor={`${id}-thickness`}
                      className="sr-only"
                    >
                      Thickness range
                    </label>

                    <div className="relative">
                      <select
                        id={`${id}-thickness`}
                        name="thickness"
                        required
                        defaultValue=""
                        className={`${fieldClassName} cursor-pointer appearance-none pr-9`}
                      >
                        <option value="" disabled>
                          Thickness Range
                        </option>

                        {thicknessRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={14}
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-500"
                      />
                    </div>
                  </Reveal>

                  <Reveal
                    delay={0.36}
                    className="min-[400px]:col-span-2"
                  >
                    <label
                      htmlFor={`${id}-message`}
                      className="sr-only"
                    >
                      Message, optional
                    </label>

                    <textarea
                      id={`${id}-message`}
                      name="message"
                      rows={3}
                      maxLength={2000}
                      placeholder="Message (Optional)"
                      className={`${fieldClassName} block min-h-[82px] resize-y py-3`}
                    />
                  </Reveal>
                </div>

                <Reveal delay={0.42}>
                  <button
                    type="submit"
                    className="group mt-5 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-[#ed0000] px-4 py-3 text-xs font-semibold text-white shadow-[0_6px_14px_-7px_rgba(237,0,0,0.55)] transition-[background-color,box-shadow] duration-500 hover:bg-[#ce0000] hover:shadow-[0_8px_18px_-7px_rgba(237,0,0,0.65)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ed1c24] disabled:cursor-wait disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <LoaderCircle
                          size={16}
                          aria-hidden="true"
                          className="animate-spin motion-reduce:animate-none"
                        />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Request Expert Consultation

                        <ArrowRight
                          size={16}
                          aria-hidden="true"
                          className="shrink-0 transition-transform duration-500 group-hover:translate-x-1 motion-reduce:transition-none"
                        />
                      </>
                    )}
                  </button>
                </Reveal>
              </fieldset>

              <p
                role="status"
                aria-live="polite"
                className={`text-xs leading-5 ${
                  feedback ? "mt-3" : ""
                } ${hasError ? "text-red-600" : "text-zinc-600"}`}
              >
                {feedback}
              </p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}