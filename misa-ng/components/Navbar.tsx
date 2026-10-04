"use client";

import { useEffect, useState } from "react";
import { openLead } from "@/lib/lead";

const links = [
  ["Properties", "#properties"],
  ["Developers", "#developers"],
  ["Invest", "#invest"],
  ["News", "#newsfeed"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSolid(window.scrollY > 50);
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

  const closeMenu = () => setOpen(false);

  const handleLead = (type: string) => {
    setOpen(false);
    openLead(type);
  };

  return (
    <>
      {/* =====================================================
          DESKTOP / MAIN NAVBAR
      ====================================================== */}

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid || open
            ? "border-b border-white/10 bg-[#080807]/90 shadow-[0_12px_50px_rgba(0,0,0,.2)] backdrop-blur-xl"
            : "border-b border-white/[0.06] bg-[#080807]/20 backdrop-blur-[6px]"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-6 lg:px-10">
          {/* =================================================
              BRAND
          ================================================== */}

          <a
            href="#top"
            onClick={closeMenu}
            className="group flex items-center gap-3"
          >
            {/* Monogram */}
            <span className="relative flex h-9 w-9 items-center justify-center border border-white/20 text-[11px] tracking-[0.12em] text-white transition-all duration-300 group-hover:border-brand group-hover:text-brand">
              M

              <span className="absolute -right-px -top-px h-1.5 w-1.5 bg-brand" />
            </span>

            {/* Wordmark */}
            <span className="leading-none">
              <span className="block font-serif text-[18px] tracking-[-0.02em] text-white">
                MISA{" "}
                <span className="text-brand">NG</span>
              </span>

              <span className="mt-1 block text-[7px] uppercase tracking-[0.28em] text-white/35">
                Property · Investment
              </span>
            </span>
          </a>

          {/* =================================================
              NAVIGATION
          ================================================== */}

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="group relative py-2 text-[10px] uppercase tracking-[0.19em] text-white/55 transition duration-300 hover:text-white"
              >
                {label}

                <span className="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* =================================================
              ACTIONS
          ================================================== */}

          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={() =>
                handleLead("Developer onboarding")
              }
              className="group flex items-center gap-2 border border-white/15 px-4 py-2.5 text-[9px] uppercase tracking-[0.17em] text-white/65 transition-all duration-300 hover:border-white/35 hover:text-white"
            >
              List a project

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            <button
              onClick={() =>
                handleLead("Registration")
              }
              className="group flex items-center gap-3 bg-brand px-5 py-2.5 text-[9px] font-medium uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-gold"
            >
              Private enquiry

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================== */}

          <button
            type="button"
            aria-label={
              open ? "Close navigation" : "Open navigation"
            }
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="group flex items-center gap-3 lg:hidden"
          >
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/60">
              {open ? "Close" : "Menu"}
            </span>

            <span className="flex h-9 w-9 items-center justify-center border border-white/15 text-brand transition group-hover:border-brand">
              {open ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </header>

      {/* =====================================================
          MOBILE FULL SCREEN NAVIGATION
      ====================================================== */}

      <div
        className={`fixed inset-0 z-40 bg-[#080807] transition-all duration-500 lg:hidden ${
          open
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-6 pb-8 pt-[110px]">
          {/* Header */}
          <div className="border-b border-white/10 pb-7">
            <p className="text-[9px] uppercase tracking-[0.28em] text-gold">
              MISA NG LTD
            </p>

            <h2 className="mt-3 max-w-xs font-serif text-3xl leading-[1] text-white">
              Nigerian property,
              <br />
              <span className="italic text-gold">
                intelligently
              </span>{" "}
              brokered.
            </h2>
          </div>

          {/* Links */}
          <nav className="flex flex-1 flex-col justify-center">
            {links.map(([label, href], index) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                className="group flex items-center justify-between border-b border-white/[0.07] py-5"
              >
                <div className="flex items-center gap-5">
                  <span className="font-mono text-[9px] text-white/20">
                    0{index + 1}
                  </span>

                  <span className="font-serif text-3xl text-white/85 transition-colors duration-300 group-hover:text-brand">
                    {label}
                  </span>
                </div>

                <span className="text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand">
                  →
                </span>
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div>
            <button
              onClick={() =>
                handleLead("Registration")
              }
              className="flex w-full items-center justify-between bg-brand px-5 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-black transition hover:bg-gold"
            >
              <span>Start a private enquiry</span>

              <span>→</span>
            </button>

            <button
              onClick={() =>
                handleLead("Developer onboarding")
              }
              className="mt-3 flex w-full items-center justify-between border border-white/15 px-5 py-4 text-[10px] uppercase tracking-[0.18em] text-white/70 transition hover:border-white/40 hover:text-white"
            >
              <span>List a project</span>

              <span>→</span>
            </button>

            <p className="mt-5 text-center text-[8px] uppercase tracking-[0.22em] text-white/25">
              MISA NG LTD · Property · Investment · Advisory
            </p>
          </div>
        </div>
      </div>
    </>
  );
}