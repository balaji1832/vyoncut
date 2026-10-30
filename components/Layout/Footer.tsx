"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowUp,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Support", href: "/contact#support" },
];

const machines = [
  {
    label: "Laser Cutting Machine",
    href: "/products/laser-cutting",
  },
  {
    label: "CNC Plasma Cutting Machine",
    href: "/products/cnc-plasma",
  },
  {
    label: "CNC Gas Cutting Machine",
    href: "/products/cnc-gas",
  },
  {
    label: "Portable Plasma Cutting Machine",
    href: "/products/portable-plasma",
  },
  {
    label: "Portable Gas Cutting Machine",
    href: "/products/portable-gas",
  },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  {
    label: "Technical Disclaimer",
    href: "/technical-disclaimer",
  },
  { label: "Terms of Service", href: "/terms-of-service" },
];

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500";

const headingClass =
  "mb-5 font-heading text-[11px] font-semibold uppercase tracking-[0.17em] text-white";

export default function Footer() {
  const reducedMotion = useReducedMotion();

  // Keep the initial server and browser output identical.
  // Read the current date only after mounting.
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }

  return (
    <footer className="relative isolate overflow-hidden bg-[#141619] text-zinc-400">
      {/* Soft background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_0%,rgba(237,28,36,0.09),transparent_50%),radial-gradient(ellipse_at_100%_100%,rgba(255,255,255,0.035),transparent_50%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />

      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        {/* Top invitation */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
          className="flex flex-col items-start justify-between gap-6 border-b border-white/10 py-9 sm:py-11 md:flex-row md:items-center"
        >
          <div>
            <p className="mb-3 text-[10px] font-semibold tracking-[0.2em] text-[#ed1c24] uppercase">
              Let’s build your next step
            </p>

            <h2 className="max-w-xl font-heading text-2xl leading-tight font-medium tracking-[-0.035em] text-white sm:text-3xl lg:text-4xl">
              The right machine.
              <span className="text-zinc-500"> The right support.</span>
            </h2>
          </div>

          <Link
            href="/contact#enquiry"
            className={`group inline-flex min-h-[50px] shrink-0 items-center gap-6 rounded-xl border border-white/15 bg-white/[0.03] py-2 pr-2 pl-5 text-sm font-semibold text-white transition-[background-color,border-color] duration-300 hover:border-[#ed1c24] hover:bg-[#ed1c24] ${focus}`}
          >
            Talk to Our Team

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </span>
          </Link>
        </motion.div>

        {/* Main footer content */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: reducedMotion ? 0 : 0.6,
            delay: reducedMotion ? 0 : 0.08,
          }}
          className="grid grid-cols-1 gap-x-8 gap-y-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.65fr_1fr_1.1fr] lg:gap-x-10 lg:py-14"
        >
          {/* Brand */}
          <div className="min-w-0">
            <Link
              href="/"
              aria-label="VYONCUT home"
              className={`group inline-flex rounded-xl bg-white px-4 py-2 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none ${focus}`}
            >
              <Image
                src="/icons/vyoncut-logo.svg"
                alt="VYONCUT"
                width={120}
                height={80}
                className="h-[66px] w-[110px] object-contain"
              />
            </Link>

            <p className="mt-5 max-w-[310px] text-sm leading-7 text-zinc-400">
              CNC laser and plasma cutting machines built for
              real-world fabrication. From choosing your machine
              to getting it running, we’re here to help.
            </p>

            <div className="mt-5 flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ed1c24]"
              />

              <p className="max-w-[280px] text-[10px] leading-5 font-medium tracking-[0.08em] text-zinc-500 uppercase">
                Installation · Training · Lifetime Support
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="min-w-0">
            <h3 className={headingClass}>Quick Navigation</h3>

            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group inline-flex min-h-10 items-center gap-2 rounded-sm text-sm transition-colors hover:text-white ${focus}`}
                  >
                    <span className="relative">
                      {item.label}

                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#ed1c24] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                      />
                    </span>

                    <ArrowUpRight
                      size={13}
                      aria-hidden="true"
                      className="-translate-x-1 text-[#ed1c24] opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Machines */}
          <div className="min-w-0">
            <h3 className={headingClass}>Machine Systems</h3>

            <ul className="space-y-1">
              {machines.map((machine) => (
                <li key={machine.href}>
                  <Link
                    href={machine.href}
                    className={`group flex min-h-10 items-start gap-3 rounded-sm py-2 text-sm leading-6 transition-colors hover:text-white ${focus}`}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-zinc-600 transition-colors group-hover:bg-[#ed1c24]"
                    />

                    <span className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none">
                      {machine.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="min-w-0">
            <h3 className={headingClass}>Support & Inquiries</h3>

            <address className="space-y-4 text-sm not-italic">
              <a
                href="tel:+916382620396"
                className={`group flex min-h-11 items-center gap-3 rounded-lg transition-colors hover:text-white ${focus}`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] transition-[border-color,background-color,color] group-hover:border-red-500/30 group-hover:bg-red-500/10 group-hover:text-[#ed1c24]">
                  <Phone size={15} aria-hidden="true" />
                </span>

                +91 63826 20396
              </a>

              <a
                href="mailto:info@vyoncut.com"
                className={`group flex min-h-11 items-center gap-3 rounded-lg transition-colors hover:text-white ${focus}`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] transition-[border-color,background-color,color] group-hover:border-red-500/30 group-hover:bg-red-500/10 group-hover:text-[#ed1c24]">
                  <Mail size={15} aria-hidden="true" />
                </span>

                <span className="min-w-0 break-all">
                  info@vyoncut.com
                </span>
              </a>

              <div className="flex items-start gap-3 pt-1">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02]">
                  <MapPin size={16} aria-hidden="true" />
                </span>

                <p className="min-w-0 leading-7">
                  No.116/47A, North Phase,
                  <br />
                  SIDCO Industrial Estate,
                  <br />
                  5th Street, Sector-1,
                  <br />
                  Ambattur, Chennai – 600 098.
                </p>
              </div>
            </address>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-5 border-t border-white/10 py-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs leading-6 text-zinc-500">
            © {year ?? "2026"} VYONCUT Inc. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <nav aria-label="Legal navigation">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {legalLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`inline-flex min-h-9 items-center rounded-sm text-[11px] text-zinc-500 transition-colors hover:text-white ${focus}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className={`group flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 text-zinc-400 transition-[background-color,border-color,color] duration-300 hover:border-[#ed1c24] hover:bg-[#ed1c24] hover:text-white ${focus}`}
            >
              <ArrowUp
                size={17}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}