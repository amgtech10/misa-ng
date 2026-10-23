"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const links = [
  { label: "Properties", href: "/properties" },
  { label: "Journal", href: "/journal" },
  { label: "Invest", href: "/invest" },
  { label: "About", href: "/about" },
];

export default function Nav() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  // Detect scrolling for the premium glass header.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock background scrolling while the mobile menu is open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeMenu]);

  // Close the menu when navigating to another page.
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-[#080807]/90 shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            : "border-b border-white/[0.06] bg-[#080807]/40 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between px-5 sm:px-6 lg:h-[82px] lg:px-10">
          {/* BRAND */}
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="MISA NG home"
            className="group flex min-w-0 items-center gap-3"
          >
            {/* Monogram */}
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 font-serif text-[22px] text-white transition-all duration-300 group-hover:border-brand group-hover:text-brand">
              M

              <span className="absolute -right-px -top-px h-1.5 w-1.5 bg-brand" />
            </span>

            {/* Wordmark */}
            <span className="min-w-0 leading-none">
              <span className="block whitespace-nowrap font-serif text-[19px] tracking-[-0.045em] text-white sm:text-[21px]">
                MISA <span className="text-brand">NG</span>
              </span>

              <span className="mt-1.5 hidden whitespace-nowrap text-[7px] uppercase tracking-[0.22em] text-white/40 min-[380px]:block sm:text-[8px]">
                Property · Investment · Advisory
              </span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-7 xl:gap-9 lg:flex"
          >
            {links.map(({ label, href }) => (
              <NavLink
                key={href}
                href={href}
                active={isActivePath(pathname, href)}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/developers"
              className="group inline-flex min-h-[43px] items-center justify-center gap-2 border border-white/15 px-4 text-[9px] font-medium uppercase tracking-[0.15em] text-white/75 transition-all duration-300 hover:border-white/40 hover:text-white"
            >
              Developers
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            <Link
              href="/invest"
              className="group inline-flex min-h-[43px] items-center justify-center gap-3 bg-brand px-5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#080807] transition-all duration-300 hover:bg-white"
            >
              Invest with us
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
            className="relative z-[60] flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] border border-white/15 text-white transition-colors duration-300 hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand lg:hidden"
          >
            <span
              className={`h-px w-[18px] bg-current transition-all duration-300 ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />

            <span
              className={`h-px w-[18px] bg-current transition-all duration-300 ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* MOBILE NAVIGATION */}
      <div
        id="mobile-navigation"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-[#080807] transition-[opacity,visibility] duration-500 lg:hidden ${
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full min-h-0 flex-col overflow-y-auto px-6 pb-7 pt-[104px] sm:px-8">
          {/* Intro */}
          <div className="border-b border-white/10 pb-6">
            <p className="text-[9px] uppercase tracking-[0.28em] text-brand">
              MISA NG LTD
            </p>

            <h2 className="mt-4 max-w-sm font-serif text-[30px] leading-[1.12] tracking-[-0.035em] text-white sm:text-4xl">
              Property,
              <br />
              intelligently brokered.
            </h2>

            <p className="mt-3 max-w-xs text-xs leading-6 text-white/40">
              Property opportunities, investment insight and developer
              partnerships across Nigeria.
            </p>
          </div>

          {/* Mobile links */}
          <nav
            aria-label="Mobile navigation"
            className="flex flex-1 flex-col justify-center py-5"
          >
            {links.map(({ label, href }, index) => {
              const active = isActivePath(pathname, href);

              return (
                <Link
                  key={href}
                  href={href}
                  tabIndex={open ? 0 : -1}
                  onClick={closeMenu}
                  aria-current={active ? "page" : undefined}
                  className={`group flex items-center justify-between border-b border-white/[0.08] py-4 transition-colors duration-300 ${
                    active ? "text-brand" : "text-white/85"
                  }`}
                >
                  <span className="flex items-center gap-5">
                    <span className="font-mono text-[9px] text-white/25">
                      0{index + 1}
                    </span>

                    <span className="font-serif text-[29px] tracking-[-0.025em] transition-colors duration-300 group-hover:text-brand sm:text-3xl">
                      {label}
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className="text-lg text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand"
                  >
                    →
                  </span>
                </Link>
              );
            })}

            {/* Developers */}
            <Link
              href="/developers"
              tabIndex={open ? 0 : -1}
              onClick={closeMenu}
              aria-current={
                isActivePath(pathname, "/developers") ? "page" : undefined
              }
              className="group flex items-center justify-between border-b border-white/[0.08] py-4"
            >
              <span className="flex items-center gap-5">
                <span className="font-mono text-[9px] text-white/25">
                  05
                </span>

                <span className="font-serif text-[29px] tracking-[-0.025em] text-white/85 transition-colors duration-300 group-hover:text-brand sm:text-3xl">
                  Developers
                </span>
              </span>

              <span
                aria-hidden="true"
                className="text-lg text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand"
              >
                →
              </span>
            </Link>
          </nav>

          {/* Bottom actions */}
          <div className="mt-auto pt-4">
            <Link
              href="/invest"
              tabIndex={open ? 0 : -1}
              onClick={closeMenu}
              className="group flex min-h-[54px] w-full items-center justify-between gap-4 bg-brand px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#080807] transition-colors duration-300 hover:bg-white"
            >
              <span>Start your investment brief</span>

              <span
                aria-hidden="true"
                className="text-base transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            <Link
              href="/#register"
              tabIndex={open ? 0 : -1}
              onClick={closeMenu}
              className="mt-3 flex min-h-[46px] items-center justify-center border border-white/15 px-5 text-[9px] uppercase tracking-[0.16em] text-white/65 transition-colors duration-300 hover:border-white/35 hover:text-white"
            >
              Make a private enquiry
            </Link>

            <p className="mt-5 text-center text-[8px] uppercase tracking-[0.22em] text-white/25">
              MISA NG LTD · Abuja · Nigeria
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ===========================================================
   DESKTOP NAVIGATION LINK
=========================================================== */

function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`group relative py-3 text-[9px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
        active ? "text-brand" : "text-white/55 hover:text-white"
      }`}
    >
      {children}

      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-0 h-px bg-brand transition-all duration-300 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

/* ===========================================================
   ACTIVE ROUTE
=========================================================== */

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}