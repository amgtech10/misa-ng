"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Building2,
  Gem,
  Users,
  TrendingUp,
  ArrowLeftRight,
  Newspaper,
  Mail,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

import { openLead } from "@/lib/lead";

const links = [
  {
    label: "Properties",
    href: "/#properties",
    icon: Building2,
  },
  {
    label: "Gems",
    href: "/gems",
    icon: Gem,
    accent: true,
  },
  {
    label: "Developers",
    href: "/#developers",
    icon: Users,
  },
  {
    label: "Invest",
    href: "/invest",
    icon: TrendingUp,
  },
  {
    label: "Exchange",
    href: "/markets",
    icon: ArrowLeftRight,
    accent: true,
  },
  {
    label: "News",
    href: "/#newsfeed",
    icon: Newspaper,
  },
  {
    label: "Contact",
    href: "/#contact",
    icon: Mail,
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  /* ------------------------------------------------------------------------ */
  /* Scroll-aware header                                                      */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };

    updateScrollState();

    window.addEventListener("scroll", updateScrollState, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Keyboard and mobile-menu behaviour                                       */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const frame = window.requestAnimationFrame(() => {
      const firstLink =
        mobileMenuRef.current?.querySelector<HTMLAnchorElement>(
          "a[href]",
        );

      firstLink?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const menu = mobileMenuRef.current;

      if (!menu) return;

      const focusableElements = Array.from(
        menu.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => {
        return element.getAttribute("aria-hidden") !== "true";
      });

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [mobileOpen]);

  /* ------------------------------------------------------------------------ */
  /* Close the mobile menu when moving to desktop layout                      */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1280px)");

    const handleBreakpointChange = (
      event: MediaQueryListEvent,
    ) => {
      if (event.matches) {
        setMobileOpen(false);
      }
    };

    desktopQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      desktopQuery.removeEventListener(
        "change",
        handleBreakpointChange,
      );
    };
  }, []);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const openLeadFromMenu = (type: string) => {
    closeMobileMenu();
    openLead(type);
  };

  const actionButtonClasses =
    "inline-flex min-h-11 items-center justify-center gap-2 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB52A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F17] motion-reduce:transition-none";

  return (
    <>
      {/* ==================================================================== */}
      {/* FIXED HEADER                                                         */}
      {/* ==================================================================== */}

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 motion-reduce:transition-none ${
          scrolled
            ? "border-[#252D3A] bg-[#0A0F17]/95 shadow-[0_8px_32px_rgba(0,0,0,0.24)] backdrop-blur-xl"
            : "border-transparent bg-[#050505]/70 backdrop-blur-md"
        }`}
      >
        <nav
          className="mx-auto flex h-[68px] max-w-[1500px] items-center justify-between gap-3 px-4 min-[390px]:px-5 sm:h-[76px] sm:px-8 lg:px-10 xl:px-12"
          aria-label="Main navigation"
        >
          {/* Brand */}

          <Link
            href="/"
            onClick={closeMobileMenu}
            className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
            aria-label="MISA NG LTD home"
          >
            <span
              aria-hidden="true"
              className="relative flex h-9 w-9 shrink-0 items-center justify-center border border-[#252D3A] font-serif text-lg text-[#F5F5F5] transition-colors duration-200 group-hover:border-[#FFB52A] group-hover:text-[#FFB52A] sm:h-10 sm:w-10"
            >
              M

              <span className="absolute -right-px -top-px h-1.5 w-1.5 bg-[#FFB52A]" />
            </span>

            <span className="min-w-0 leading-none">
              <span className="block whitespace-nowrap font-serif text-[17px] tracking-[-0.035em] text-[#F5F5F5] sm:text-[19px]">
                MISA <span className="text-[#FFB52A]">NG</span>
              </span>

              <span className="mt-1.5 hidden whitespace-nowrap text-[7px] uppercase tracking-[0.18em] text-[#A7AFBF] min-[390px]:block sm:text-[8px] sm:tracking-[0.2em]">
                Property · Investment · Advisory
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}

          <div className="hidden items-center gap-0.5 2xl:gap-1 xl:flex">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`group inline-flex min-h-10 items-center justify-center gap-1.5 px-2.5 text-[11px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FFB52A] 2xl:gap-2 2xl:px-3 2xl:text-xs ${
                    link.accent
                      ? "text-[#FFB52A] hover:text-[#F59A16]"
                      : "text-[#A7AFBF] hover:text-[#F5F5F5]"
                  }`}
                >
                  <Icon
                    size={14}
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className="shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                  />

                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop actions */}

          <div className="hidden shrink-0 items-center gap-2 xl:flex 2xl:gap-3">
            <button
              type="button"
              onClick={() => openLead("Developer onboarding")}
              className={`${actionButtonClasses} border border-[#252D3A] text-[#F5F5F5] hover:border-[#FFB52A]/70 hover:text-[#FFB52A]`}
            >
              Partner with us
            </button>

            <button
              type="button"
              onClick={() => openLead("Registration")}
              className={`${actionButtonClasses} group bg-[#FFB52A] text-[#050505] hover:bg-[#F59A16]`}
            >
              Get started

              <ArrowUpRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </button>
          </div>

          {/* Mobile menu toggle */}

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-[#252D3A] text-[#F5F5F5] transition-colors duration-200 hover:border-[#FFB52A] hover:text-[#FFB52A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB52A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F17] xl:hidden motion-reduce:transition-none"
            aria-label={
              mobileOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? (
              <X size={20} strokeWidth={1.7} aria-hidden="true" />
            ) : (
              <Menu size={20} strokeWidth={1.7} aria-hidden="true" />
            )}
          </button>
        </nav>
      </header>

      {/* ==================================================================== */}
      {/* MOBILE NAVIGATION                                                    */}
      {/* ==================================================================== */}

      <div
        ref={mobileMenuRef}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        className={`fixed inset-0 z-40 overflow-y-auto bg-[#050505] transition-[opacity,visibility] duration-300 ease-out xl:hidden motion-reduce:transition-none ${
          mobileOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        {/* Atmospheric background */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-[#0A0F17] to-transparent"
        />

        <div className="relative flex min-h-full flex-col px-5 pb-8 pt-[100px] min-[390px]:px-6 sm:px-10 sm:pt-[112px]">
          {/* Introduction */}

          <div className="mb-7 border-b border-[#252D3A] pb-6 sm:mb-8">
            <p className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.24em] text-[#FFB52A] sm:text-[10px]">
              <span className="h-px w-7 bg-[#FFB52A]" aria-hidden="true" />
              Explore MISA
            </p>

            <p className="mt-3 max-w-xs font-serif text-2xl leading-snug text-[#F5F5F5] sm:text-3xl">
              Property.
              <br />
              Investment.
              <br />
              Opportunity.
            </p>

            <p className="mt-3 max-w-sm text-xs leading-6 text-[#A7AFBF] sm:text-sm">
              Property advisory and developer partnerships across Nigeria.
            </p>
          </div>

          {/* Navigation links */}

          <nav aria-label="Mobile navigation links">
            <div className="space-y-1">
              {links.map((link, index) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`group flex min-h-[60px] items-center justify-between border-b border-[#252D3A]/70 py-3 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FFB52A] ${
                      link.accent
                        ? "text-[#FFB52A]"
                        : "text-[#F5F5F5]"
                    }`}
                    style={{
                      transitionDelay: mobileOpen
                        ? `${index * 25}ms`
                        : "0ms",
                    }}
                  >
                    <span className="flex min-w-0 items-center gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#252D3A] bg-[#0D121B] transition-colors duration-200 group-hover:border-[#FFB52A]/50">
                        <Icon
                          size={18}
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </span>

                      <span className="text-sm font-medium tracking-[0.01em] sm:text-base">
                        {link.label}
                      </span>
                    </span>

                    <ArrowUpRight
                      size={17}
                      aria-hidden="true"
                      className="shrink-0 text-[#737B89] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FFB52A] motion-reduce:transition-none"
                    />
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Mobile actions */}

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => openLeadFromMenu("Developer onboarding")}
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#252D3A] px-4 py-4 text-[10px] font-medium uppercase tracking-[0.12em] text-[#F5F5F5] transition-colors duration-200 hover:border-[#FFB52A]/70 hover:text-[#FFB52A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB52A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] motion-reduce:transition-none"
            >
              <Users size={16} aria-hidden="true" />
              Partner with us
            </button>

            <button
              type="button"
              onClick={() => openLeadFromMenu("Registration")}
              className="group inline-flex min-h-12 items-center justify-center gap-2 bg-[#FFB52A] px-4 py-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#050505] transition-colors duration-200 hover:bg-[#F59A16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB52A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] motion-reduce:transition-none"
            >
              Get started

              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </button>
          </div>

          {/* Footer */}

          <div className="mt-auto pt-12">
            <div className="mb-4 h-px bg-[#252D3A]" />

            <p className="text-center text-[9px] uppercase leading-5 tracking-[0.16em] text-[#737B89] sm:text-[10px] sm:tracking-[0.2em]">
              MISA NG LTD
              <span className="mx-2 text-[#FFB52A]">·</span>
              Property · Investment · Advisory
            </p>
          </div>
        </div>
      </div>
    </>
  );
}