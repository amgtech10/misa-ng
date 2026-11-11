import Link from "next/link";

import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";

import { getWhatsAppUrl } from "@/lib/whatsapp";

/* =========================================================
   FOOTER NAVIGATION
========================================================= */

const cols: [string, [string, string][]][] = [
  [
    "Discover",
    [
      ["Properties", "/properties"],
      ["Market intelligence", "/#newsfeed"],
      ["Invest", "/invest"],
      ["Developers", "/#developers"],
    ],
  ],
  [
    "Company",
    [
      ["About Us", "/about"],
      ["Contact Us", "/contact"],
    ],
  ],
  [
    "Legal",
    [
      ["Terms", "/terms"],
      ["Privacy policy", "/privacy"],
      ["FAQs", "/faqs"],
    ],
  ],
];

/* =========================================================
   SOCIAL LINKS

   Icons always display.
   Add your actual URLs through .env.local.
========================================================= */

const socialLinks = [
  {
    name: "Instagram",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || "",
    Icon: FaInstagram,
  },
  {
    name: "X",
    href: process.env.NEXT_PUBLIC_X_URL?.trim() || "",
    Icon: FaXTwitter,
  },
  {
    name: "Facebook",
    href: process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() || "",
    Icon: FaFacebookF,
  },
];

/* =========================================================
   DEVELOPER PORTFOLIO
========================================================= */

const DEVELOPER_PORTFOLIO = "https://amgtech.vercel.app";

/* =========================================================
   SHARED FOCUS STYLES
========================================================= */

const focusStyles =
  "rounded-sm outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#FFB52A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]";

/* =========================================================
   FOOTER COMPONENT
========================================================= */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative isolate overflow-hidden border-t border-[#252D3A] bg-[#050505] text-[#F5F5F5]"
    >
      {/* Ambient brand glow */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-32 -z-10 h-80 w-80 rounded-full bg-[#F59A16]/[0.06] blur-[100px]"
      />

      <div className="mx-auto w-full max-w-[1440px] px-5 pb-6 pt-12 sm:px-8 sm:pb-8 sm:pt-16 lg:px-12 lg:pt-20">

        {/* =================================================
            MAIN FOOTER GRID
        ================================================= */}

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-[1.7fr_1fr_0.8fr_0.8fr] lg:gap-12 xl:gap-16">

          {/* BRAND */}

          <div className="max-w-md">
            <Link
              href="/"
              aria-label="MISA LTD home"
              className={`inline-flex flex-col ${focusStyles}`}
            >
              <span className="font-serif text-3xl leading-none tracking-[-0.06em] text-[#F5F5F5] sm:text-5xl">
                MISA
                <span className="text-[#FFB25A]">.</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-[13px] leading-7 text-[#A7AFBF] sm:text-sm">
              Property, investment and resource. Connecting
              discerning buyers, investors and developers resource supply.
            </p>

          </div>

          {/* NAVIGATION COLUMNS */}

          {cols.map(([title, links]) => (
            <nav
              key={title}
              aria-label={`${title} links`}
              className="min-w-0"
            >
              <h2 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#FFB52A]">
                {title}
              </h2>

              <ul className="space-y-1">
                {links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className={`group inline-flex min-h-10 items-center gap-2 py-2 text-[13px] text-[#A7AFBF] hover:text-[#F5F5F5] sm:text-sm ${focusStyles}`}
                    >
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* =================================================
            SOCIAL SECTION
        ================================================= */}

        <section
          aria-labelledby="footer-social-heading"
          className="mt-12 border-t border-[#252D3A] pt-7 sm:mt-14 sm:pt-8 lg:mt-16"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">

            {/* SOCIAL INTRO */}

            <div>
              <h2
                id="footer-social-heading"
                className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#FFB52A]"
              >
                Social
              </h2>

              <p className="mt-2 text-[13px] leading-6 text-[#737B89]">
                Connect with us.
              </p>
            </div>

            {/* SOCIAL ICONS */}

            <div
              aria-label="MISA LTD social media"
              className="flex flex-wrap items-center gap-3"
            >
              {socialLinks.map(({ name, href, Icon }) => {
                const iconContent = (
                  <Icon
                    aria-hidden="true"
                    className="text-base transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none"
                  />
                );

                const classes =
                  "group flex h-11 w-11 items-center justify-center rounded-full border border-[#252D3A] bg-[#0D121B] text-[#A7AFBF] transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB52A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]";

                return href ? (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit MISA LTD on ${name}`}
                    title={name}
                    className={`${classes} hover:border-[#F59A16] hover:bg-[#F59A16] hover:text-[#050505]`}
                  >
                    {iconContent}
                  </a>
                ) : (
                  <span
                    key={name}
                    aria-label={`${name} link not configured`}
                    aria-disabled="true"
                    title={`${name} — link not configured`}
                    className={`${classes} cursor-not-allowed opacity-45`}
                  >
                    {iconContent}
                  </span>
                );
              })}

              {/* WHATSAPP */}

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact MISA LTD on WhatsApp"
                title="WhatsApp"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#252D3A] bg-[#0D121B] text-[#A7AFBF] transition-colors duration-200 hover:border-[#FFB52A] hover:bg-[#FFB52A] hover:text-[#050505] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB52A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5 transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none"
                >
                  <path d="M20.52 3.48A11.87 11.87 0 0 0 12.05 0C5.47 0 .12 5.35.12 11.93c0 2.1.55 4.15 1.59 5.96L0 24l6.27-1.64a11.9 11.9 0 0 0 5.78 1.47h.01c6.58 0 11.93-5.35 11.94-11.93a11.87 11.87 0 0 0-3.48-8.42ZM12.06 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98.99-3.63-.24-.37a9.88 9.88 0 0 1-1.52-5.26c0-5.47 4.45-9.92 9.92-9.92a9.86 9.86 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.94 9.92Zm5.44-7.43c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.46-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* =================================================
            BOTTOM BAR
        ================================================= */}

        <div className="mt-8 flex flex-col gap-4 border-t border-[#252D3A] pt-5 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pt-6">

          {/* COPYRIGHT */}

          <p className="text-[11px] leading-5 text-[#737B89]">
            © {year} MISA LTD. All rights reserved.
          </p>

          {/* BRAND CATEGORIES */}

          <p className="text-[9px] font-medium uppercase leading-5 tracking-[0.16em] text-[#737B89] sm:text-center">
            Property
            <span className="px-1.5 text-[#F59A16]">·</span>
            Investment
            <span className="px-1.5 text-[#F59A16]">·</span>
            Advisory
          </p>

          {/* DEVELOPER CREDIT */}

          <a
            href={DEVELOPER_PORTFOLIO}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit AMG Tech Solutions developer portfolio"
            className="group inline-flex min-h-10 items-center gap-2 self-start text-[10px] tracking-wide text-[#737B89] transition-colors duration-200 hover:text-[#FFB52A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB52A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505] motion-reduce:transition-none sm:self-auto"
          >
            <span>Designed & developed by</span>

            <span className="font-semibold uppercase text-[#A7AFBF] transition-colors group-hover:text-[#FFB52A]">
              AMG Tech Solutions
            </span>

            <span
              aria-hidden="true"
              className="text-[#F59A16] transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
            >
              ↗
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}