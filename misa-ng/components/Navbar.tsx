"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Building2,
  Gem,
  Users,
  TrendingUp,
  Newspaper,
  Mail,
  Menu,
  X,
  ArrowUpRight,
  BarChart3,
} from "lucide-react";

import { openLead } from "@/lib/lead";
import CountrySelector from "@/components/CountrySelector";

const links = [
  {
    label: "Properties",
    href: "/properties",
    icon: Building2,
  },
  {
    label: "Gemstones",
    href: "/gems",
    icon: Gem,
  },
  {
    label: "Invest",
    href: "/invest",
    icon: TrendingUp,
  },
  {
    label: "Exchange",
    href: "/markets",
    icon: BarChart3,
  },
  {
    label: "News",
    href: "#newsfeed",
    icon: Newspaper,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Mail,
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Detect page scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu and restore focus
  const closeMobileMenu = () => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  };

  // Lock body scrolling while mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }

      // Basic keyboard focus management
      if (event.key === "Tab" && menuRef.current) {
        const focusableElements =
          menuRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), select:not([disabled]), input:not([disabled])'
          );

        const firstElement = focusableElements[0];
        const lastElement =
          focusableElements[focusableElements.length - 1];

        if (!firstElement || !lastElement) return;

        if (
          event.shiftKey &&
          document.activeElement === firstElement
        ) {
          event.preventDefault();
          lastElement.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === lastElement
        ) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Focus first menu link when opened
    const firstLink =
      menuRef.current?.querySelector<HTMLElement>("a[href]");

    firstLink?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  // Close menu when screen becomes desktop-sized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280 && mobileOpen) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileOpen]);

  const handleNavigation = () => {
    setMobileOpen(false);
  };

  const handleRegistration = () => {
    setMobileOpen(false);
    openLead("Registration");
  };

  const handleDeveloperOnboarding = () => {
    setMobileOpen(false);
    openLead("Developer onboarding");
  };

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`fixed inset-x-0 top-0 z-[100] border-b transition-all duration-300 ${
          scrolled
            ? "border-[#252D3A] bg-[#050505]/95 shadow-[0_8px_35px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            : "border-white/[0.06] bg-[#050505]/75 backdrop-blur-md"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:h-[76px] lg:px-12"
        >
          {/* BRAND */}
          <Link
            href="/"
            aria-label="MISA homepage"
            onClick={handleNavigation}
            className="group flex shrink-0 items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center border border-[#F59A16]/40 bg-[#F59A16]/10 transition-colors group-hover:bg-[#F59A16]/20">
              M
            </div>

            <div className="flex flex-col">
              <span className="text-[17px] font-bold leading-none tracking-tightest text-[#F5F5F5]">
                MI<span className="text-[#F59A16]">SA</span>
              </span>

              <span className="mt-1.5 text-[8px] font-medium uppercase tracking-[0.22em] text-[#737B89]">
                Property & Investment
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-7 xl:flex 2xl:gap-9">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavigation}
                className="group relative py-2 text-[11px] font-semibold tracking-[0.08em] text-[#A7AFBF] transition-colors hover:text-white"
              >
                {link.label}

                <span className="absolute bottom-0 left-0 h-px w-0 bg-[#F59A16] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden shrink-0 items-center gap-2 xl:flex 2xl:gap-3">
            {/* COUNTRY / CURRENCY SELECTOR */}
            <CountrySelector />

            <button
              type="button"
              onClick={handleDeveloperOnboarding}
              className="whitespace-nowrap border border-[#252D3A] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#F5F5F5] transition-all hover:border-[#F59A16] hover:text-[#FFB52A]"
            >
              Partner with us
            </button>

            <button
              type="button"
              onClick={handleRegistration}
              className="group flex items-center gap-2 whitespace-nowrap bg-[#F59A16] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#050505] transition-all hover:bg-[#FFB52A]"
            >
              Get started

              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileOpen((previous) => !previous)}
            aria-label={
              mobileOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="flex h-10 w-10 items-center justify-center border border-[#252D3A] text-[#F5F5F5] transition-colors hover:border-[#F59A16] hover:text-[#F59A16] xl:hidden"
          >
            {mobileOpen ? (
              <X size={20} strokeWidth={1.7} />
            ) : (
              <Menu size={20} strokeWidth={1.7} />
            )}
          </button>
        </nav>
      </header>

      {/* MOBILE NAVIGATION */}
      <div
        id="mobile-navigation"
        ref={menuRef}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 z-[90] overflow-y-auto bg-[#050505] pt-[88px] transition-all duration-300 xl:hidden ${
          mobileOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <div className="mx-auto flex min-h-full max-w-[600px] flex-col px-6 pb-10 sm:px-10">
          {/* MOBILE INTRO */}
          <div className="mb-8 border-b border-[#252D3A] pb-6">
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#F59A16]">
              Municipal Integrated Service Agent
            </p>

            <h2 className="max-w-[320px] font-serif text-3xl leading-tight text-[#F5F5F5]">
              Property opportunities.
              <span className="text-[#F59A16]">
                {" "}Strategic partnerships.
              </span>
            </h2>
          </div>

          {/* MOBILE LINKS */}
          <div className="flex flex-col">
            {links.map((link, index) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleNavigation}
                  tabIndex={mobileOpen ? 0 : -1}
                  className="group flex items-center justify-between border-b border-[#252D3A] py-5 transition-colors hover:border-[#F59A16]/50"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-medium text-[#737B89]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-base font-medium text-[#F5F5F5] transition-colors group-hover:text-[#FFB52A]">
                      {link.label}
                    </span>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center border border-[#252D3A] text-[#A7AFBF] transition-all group-hover:border-[#F59A16] group-hover:text-[#F59A16]">
                    <Icon size={16} strokeWidth={1.5} />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* MOBILE COUNTRY SELECTOR */}
          <div className="mb-6 mt-8 border border-[#252D3A] bg-[#0D121B] p-4">
            <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#A7AFBF]">
              Your location & currency
            </p>

            <CountrySelector />
          </div>

          {/* MOBILE ACTIONS */}
          <div className="mt-auto flex flex-col gap-3">
            <button
              type="button"
              onClick={handleDeveloperOnboarding}
              className="flex w-full items-center justify-between border border-[#252D3A] px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F5F5F5] transition-colors hover:border-[#F59A16] hover:text-[#FFB52A]"
            >
              Partner with us

              <Users size={17} />
            </button>

            <button
              type="button"
              onClick={handleRegistration}
              className="flex w-full items-center justify-between bg-[#F59A16] px-5 py-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#050505] transition-colors hover:bg-[#FFB52A]"
            >
              Get started

              <ArrowUpRight size={17} />
            </button>
          </div>

          {/* MOBILE FOOTER */}
          <div className="mt-8 flex items-center justify-between border-t border-[#252D3A] pt-5">
            <span className="text-[9px] uppercase tracking-[0.16em] text-[#737B89]">
              MISA LTD
            </span>

            <span className="text-[9px] uppercase tracking-[0.16em] text-[#737B89]">
              Abuja · Nigeria
            </span>
          </div>
        </div>
      </div>
    </>
  );
}