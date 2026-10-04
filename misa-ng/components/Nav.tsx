"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  ["Properties", "/properties"],
  ["Journal", "/journal"],
  ["Invest", "/invest"],
  ["About", "/about"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-[#080807]/90 shadow-[0_10px_40px_rgba(0,0,0,.18)] backdrop-blur-xl"
            : "border-b border-white/[0.06] bg-[#080807]/35 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-6 lg:px-10">
          {/* =================================================
              LOGO
          ================================================== */}

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-3"
          >
            {/* M monogram */}
            <span className="relative flex h-9 w-9 items-center justify-center border border-white/20 text-[11px] font-medium tracking-[0.08em] text-white transition duration-300 group-hover:border-brand group-hover:text-brand">
              M

              <span className="absolute -right-[1px] -top-[1px] h-1.5 w-1.5 bg-brand" />
            </span>

            {/* Wordmark */}
            <span className="leading-none">
              <span className="block font-serif text-[18px] tracking-[-0.02em] text-white">
                MISA{" "}
                <span className="text-brand">NG</span>
              </span>

              <span className="mt-1 block text-[7px] uppercase tracking-[0.27em] text-white/35">
                Property · Investment
              </span>
            </span>
          </Link>

          {/* =================================================
              DESKTOP NAV
          ================================================== */}

          <nav className="hidden items-center gap-9 lg:flex">
            {links.map(([label, href]) => (
              <NavLink
                key={href}
                href={href}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* =================================================
              DESKTOP ACTIONS
          ================================================== */}

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/developers"
              className="group flex items-center gap-2 border border-white/15 px-4 py-2.5 text-[10px] uppercase tracking-[0.16em] text-white/70 transition duration-300 hover:border-white/35 hover:text-white"
            >
              Developers

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/#register"
              className="group flex items-center gap-3 bg-brand px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.16em] text-black transition duration-300 hover:bg-gold"
            >
              Private enquiry

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* =================================================
              MOBILE BUTTON
          ================================================== */}

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="relative flex h-10 w-10 items-center justify-center border border-white/15 text-white transition hover:border-brand lg:hidden"
          >
            <span className="text-sm">
              {open ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </header>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <div
        className={`fixed inset-0 z-40 bg-[#080807] transition-all duration-500 lg:hidden ${
          open
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-6 pb-8 pt-28">
          {/* Intro */}
          <div className="border-b border-white/10 pb-7">
            <p className="text-[9px] uppercase tracking-[0.28em] text-gold">
              MISA NG LTD
            </p>

            <p className="mt-3 max-w-xs font-serif text-2xl leading-tight text-white/90">
              Property,
              <br />
              intelligently brokered.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-1 flex-col justify-center">
            {links.map(([label, href], index) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between border-b border-white/[0.07] py-5"
              >
                <span className="flex items-center gap-5">
                  <span className="font-mono text-[9px] text-white/20">
                    0{index + 1}
                  </span>

                  <span className="font-serif text-3xl text-white/85 transition group-hover:text-brand">
                    {label}
                  </span>
                </span>

                <span className="text-white/20 transition duration-300 group-hover:translate-x-1 group-hover:text-brand">
                  →
                </span>
              </Link>
            ))}

            <Link
              href="/developers"
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between border-b border-white/[0.07] py-5"
            >
              <span className="flex items-center gap-5">
                <span className="font-mono text-[9px] text-white/20">
                  05
                </span>

                <span className="font-serif text-3xl text-white/85 transition group-hover:text-brand">
                  Developers
                </span>
              </span>

              <span className="text-white/20 transition duration-300 group-hover:translate-x-1 group-hover:text-brand">
                →
              </span>
            </Link>
          </nav>

          {/* Bottom CTA */}
          <div>
            <Link
              href="/#register"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-between bg-brand px-5 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-black transition hover:bg-gold"
            >
              <span>Start a private enquiry</span>

              <span>→</span>
            </Link>

            <p className="mt-4 text-center text-[8px] uppercase tracking-[0.2em] text-white/25">
              MISA NG LTD · Nigeria
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ===========================================================
   DESKTOP NAV LINK
=========================================================== */

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative py-2 text-[10px] uppercase tracking-[0.18em] text-white/55 transition duration-300 hover:text-white"
    >
      {children}

      {/* underline */}
      <span className="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}