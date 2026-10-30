"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const products = [
  { name: "EcoCUT Series", href: "/products/ecocut" },
  { name: "MiniCUT Series", href: "/products/minicut" },
  { name: "BenchCUT Series", href: "/products/benchcut" },
  { name: "Mantis Series", href: "/products/mantis" },
  { name: "Plamill Series", href: "/products/plamill" },
  { name: "Plamill GB Series", href: "/products/plamill-gb" },
];

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ed1c24]";

type HeaderProps = {
  transparentOnTop?: boolean;
};

export default function Header({
  transparentOnTop = true,
}: HeaderProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  const headerRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const productButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  const showProducts = productsOpen && menuPath === pathname;
  const showMobile = mobileOpen && menuPath === pathname;
  const transparent =
    transparentOnTop && pathname === "/" && !scrolled;

  const duration = reducedMotion ? 0 : 0.25;

  function active(href: string) {
    return href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);
  }

  function closeMenus() {
    setProductsOpen(false);
    setMobileOpen(false);
    setMobileProductsOpen(false);
  }

  function openProducts() {
    setMenuPath(pathname);
    setProductsOpen(true);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onOutside(event: PointerEvent) {
      if (!(event.target instanceof Node)) return;

      if (!headerRef.current?.contains(event.target)) {
        closeMenus();
      } else if (!productsRef.current?.contains(event.target)) {
        setProductsOpen(false);
      }
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      if (showProducts) productButtonRef.current?.focus();
      else if (showMobile) mobileButtonRef.current?.focus();

      closeMenus();
    }

    const breakpoint = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => closeMenus();

    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("keydown", onEscape);
    breakpoint.addEventListener("change", onBreakpoint);

    return () => {
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("keydown", onEscape);
      breakpoint.removeEventListener("change", onBreakpoint);
    };
  }, [showProducts, showMobile]);

  function desktopClass(isActive: boolean) {
    return [
      "group relative inline-flex h-11 items-center gap-2",
      "rounded-md px-2 text-[15px] font-medium",
      "transition-colors duration-300",
      transparent
        ? isActive
          ? "text-white"
          : "text-white/70 hover:text-white"
        : isActive
          ? "text-[#ed1c24]"
          : "text-zinc-600 hover:text-[#ed1c24]",
      focus,
    ].join(" ");
  }

  function labelContent(label: string, isActive: boolean) {
    return (
      <>
        {label}

        <span
          aria-hidden="true"
          className={`absolute inset-x-2 bottom-0 h-[2px] origin-left rounded-full bg-[#ed1c24] transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none ${
            isActive ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </>
    );
  }

  function productList(mobile = false) {
    return (
      <ul
        className={`grid gap-1.5 ${
          mobile ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2"
        }`}
      >
        {products.map((product) => (
          <li key={product.href}>
            <Link
              href={product.href}
              onClick={closeMenus}
              aria-current={active(product.href) ? "page" : undefined}
              className={`group flex min-h-[52px] items-center justify-between gap-3 rounded-lg border px-3 py-3 transition-[background-color,border-color,color] duration-300 hover:border-[#ed1c24] hover:bg-[#ed1c24] hover:text-white ${
                active(product.href)
                  ? "border-red-100 bg-red-50 text-[#ed1c24]"
                  : "border-zinc-100 bg-zinc-50/70 text-zinc-700"
              } ${focus}`}
            >
              <span className="font-heading text-[13px] font-medium">
                {product.name}
              </span>

              <ArrowUpRight
                size={15}
                aria-hidden="true"
                className="shrink-0 opacity-40 transition-[transform,opacity] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 motion-reduce:transition-none"
              />
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <motion.header
      ref={headerRef}
      initial={reducedMotion ? false : { opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6"
    >
      <div
        className={`relative mx-auto max-w-[1080px] rounded-2xl border transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 motion-reduce:transition-none ${
          transparent
            ? "border-transparent bg-transparent shadow-none backdrop-blur-none"
            : "border-zinc-200/80 bg-white/95 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.2)] backdrop-blur-xl"
        }`}
      >
        <div
          className={`grid grid-cols-[1fr_auto] items-center gap-4 px-3 transition-[height] duration-300 motion-reduce:transition-none sm:px-5 lg:grid-cols-[1fr_auto_1fr] ${
            scrolled ? "h-[76px]" : "h-[84px] lg:h-[92px]"
          }`}
        >
          {/* Logo — no white background */}
          <Link
            href="/"
            onClick={closeMenus}
            aria-label="VYONCUT home"
            className={`inline-flex w-fit items-center rounded-md bg-transparent ${focus}`}
          >
            <Image
              src="/icons/vyoncut-logo.svg"
              alt="VYONCUT"
              width={130}
              height={80}
              priority
              className={`w-[110px] object-contain transition-[height] duration-300 motion-reduce:transition-none lg:w-[128px] ${
                scrolled ? "h-[60px]" : "h-[68px] lg:h-[76px]"
              }`}
            />
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-5 lg:flex"
          >
            {links.map((item) => {
              const isActive = active(item.href);

              if (item.label !== "Products") {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenus}
                    aria-current={isActive ? "page" : undefined}
                    className={desktopClass(isActive)}
                  >
                    {labelContent(item.label, isActive)}
                  </Link>
                );
              }

              return (
                <div
                  key={item.href}
                  ref={productsRef}
                  className="relative"
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") openProducts();
                  }}
                  onPointerLeave={(event) => {
                    if (
                      event.pointerType === "mouse" &&
                      !event.currentTarget.contains(document.activeElement)
                    ) {
                      setProductsOpen(false);
                    }
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setProductsOpen(false);
                    }
                  }}
                >
                  <button
                    ref={productButtonRef}
                    type="button"
                    aria-expanded={showProducts}
                    aria-controls="desktop-products"
                    onClick={() => {
                      setMenuPath(pathname);
                      setProductsOpen(!showProducts);
                    }}
                    className={`${desktopClass(isActive)} cursor-pointer`}
                  >
                    {labelContent(item.label, isActive)}

                    <ChevronDown
                      size={14}
                      aria-hidden="true"
                      className={`transition-transform duration-300 motion-reduce:transition-none ${
                        showProducts ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Compact dropdown */}
                  <AnimatePresence>
                    {showProducts && (
                      <motion.div
                        key="desktop-products"
                        initial={{
                          opacity: 0,
                          y: reducedMotion ? 0 : -8,
                        }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          y: reducedMotion ? 0 : -5,
                        }}
                        transition={{ duration }}
                        className="absolute top-full left-1/2 w-[440px] -translate-x-1/2 pt-5"
                      >
                        <div
                          id="desktop-products"
                          className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]"
                        >
                          <div className="flex items-center justify-between gap-4 px-4 pt-4 pb-3">
                            <p className="text-[10px] font-semibold tracking-[0.15em] text-zinc-500 uppercase">
                              Explore Our Machines
                            </p>

                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 rounded-full bg-[#ed1c24]"
                            />
                          </div>

                          <div className="px-3 pb-3">
                            {productList()}
                          </div>

                          <Link
                            href="/contact#enquiry"
                            onClick={closeMenus}
                            className={`flex min-h-10 items-center justify-between gap-3 border-t border-zinc-100 px-4 text-[11px] font-medium text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-[#ed1c24] ${focus}`}
                          >
                            Need help choosing a machine?
                            <ArrowUpRight size={14} aria-hidden="true" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2">
            <Link
              href="/contact#enquiry"
              onClick={closeMenus}
              className={`group hidden min-h-11 items-center gap-3 rounded-lg bg-[#ed1c24] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#ca1119] sm:inline-flex ${focus}`}
            >
              Request a Quote

              <ArrowUpRight
                size={17}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </Link>

            <button
              ref={mobileButtonRef}
              type="button"
              aria-label={showMobile ? "Close navigation" : "Open navigation"}
              aria-expanded={showMobile}
              aria-controls="mobile-navigation"
              onClick={() => {
                setMenuPath(pathname);
                setMobileOpen(!showMobile);
                setMobileProductsOpen(false);
                setProductsOpen(false);
              }}
              className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border transition-colors duration-300 lg:hidden ${
                transparent
                  ? "border-white/30 bg-white/5 text-white"
                  : "border-zinc-200 bg-white text-zinc-900"
              } ${focus}`}
            >
              {showMobile ? (
                <X size={21} aria-hidden="true" />
              ) : (
                <Menu size={21} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile and tablet menu */}
        <AnimatePresence>
          {showMobile && (
            <motion.div
              key="mobile-navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration }}
              className="overflow-hidden rounded-2xl lg:hidden"
            >
              <nav
                id="mobile-navigation"
                aria-label="Mobile navigation"
                className="max-h-[calc(100dvh-128px)] overflow-y-auto border border-zinc-100 bg-white p-3"
              >
                {links.map((item) => (
                  <div key={item.href}>
                    {item.label === "Products" ? (
                      <button
                        type="button"
                        aria-expanded={mobileProductsOpen}
                        aria-controls="mobile-products"
                        onClick={() =>
                          setMobileProductsOpen((open) => !open)
                        }
                        className={`flex min-h-[52px] w-full cursor-pointer items-center justify-between rounded-lg px-3 font-heading text-base text-zinc-900 hover:bg-zinc-50 ${focus}`}
                      >
                        Products
                        <ChevronDown
                          size={16}
                          aria-hidden="true"
                          className={`transition-transform motion-reduce:transition-none ${
                            mobileProductsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={closeMenus}
                        aria-current={active(item.href) ? "page" : undefined}
                        className={`flex min-h-[52px] items-center justify-between rounded-lg px-3 font-heading text-base transition-colors hover:bg-zinc-50 ${
                          active(item.href)
                            ? "text-[#ed1c24]"
                            : "text-zinc-900"
                        } ${focus}`}
                      >
                        {item.label}
                        <ArrowUpRight
                          size={15}
                          aria-hidden="true"
                          className="text-zinc-400"
                        />
                      </Link>
                    )}

                    {item.label === "Products" && (
                      <AnimatePresence>
                        {mobileProductsOpen && (
                          <motion.div
                            key="mobile-products"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration }}
                            className="overflow-hidden"
                          >
                            <div id="mobile-products" className="py-2">
                              {productList(true)}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}

                <Link
                  href="/contact#enquiry"
                  onClick={closeMenus}
                  className={`mt-3 flex min-h-12 items-center justify-between rounded-lg bg-[#ed1c24] px-4 text-sm font-semibold text-white ${focus}`}
                >
                  Request a Quote
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}