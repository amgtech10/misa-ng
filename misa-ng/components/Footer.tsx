import Link from "next/link";

const cols: [string, [string, string][]][] = [
  [
    "Discover",
    [
      ["Properties", "/properties"],
      ["Market intelligence", "/journal"],
      ["Invest", "/invest"],
      ["Developers", "/developers"],
    ],
  ],
  [
    "Company",
    [
      ["About MISA", "/about"],
      ["Contact", "/contact"],
    ],
  ],
  [
    "Legal",
    [
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
      ["Cookies", "/cookies"],
    ],
  ],
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#05080d]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-brand/[0.045] blur-[130px]" />

      <div className="relative mx-auto max-w-[1500px] px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}
        <div className="grid gap-16 lg:grid-cols-[1.55fr_.65fr_.65fr_.65fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <span className="relative grid h-10 w-10 place-items-center border border-white/15 text-[11px] tracking-[0.12em] text-white transition duration-300 group-hover:border-brand group-hover:text-brand">
                M
                <span className="absolute right-[-1px] top-[-1px] h-1.5 w-1.5 bg-brand" />
              </span>

              <span>
                <span className="block font-serif text-xl leading-none text-white">
                  MISA <span className="text-brand">NG</span>
                </span>

                <span className="mt-1.5 block text-[7px] uppercase tracking-[0.28em] text-white/30">
                  Property · Investment
                </span>
              </span>
            </Link>

            <h2 className="mt-10 max-w-xl font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] tracking-[-0.04em] text-white">
              Real estate,
              <br />
              <span className="italic text-white/30">
                approached differently.
              </span>
            </h2>

            <p className="mt-7 max-w-md text-[13px] leading-7 text-white/40">
              Municipal Integrated Service Agent NG Ltd — MISA NG LTD — is a
              commission-based agency for property, market intelligence and
              investment opportunities.
            </p>

            <p className="mt-3 max-w-md text-[11px] leading-6 text-white/25">
              Part of Strategic Infrastructure and Resource Partners
              (SIR-Partners).
            </p>

            {/* Contact CTA */}
            <div className="mt-8">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 border border-white/15 px-5 py-3.5 text-[9px] uppercase tracking-[0.2em] text-white/70 transition-all duration-300 hover:border-brand hover:text-white"
              >
                Start a conversation

                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Navigation columns */}
          {cols.map(([title, links]) => (
            <nav key={title}>
              <p className="text-[9px] uppercase tracking-[0.28em] text-white/25">
                {title}
              </p>

              <ul className="mt-6 space-y-4">
                {links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group inline-flex items-center gap-2 text-[13px] text-white/45 transition-colors duration-300 hover:text-white"
                    >
                      <span>{label}</span>

                      <span className="text-[10px] text-brand opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* =====================================================
            LOWER BAR
        ====================================================== */}
        <div className="mt-20 border-t border-white/[0.08] pt-6">
          <div className="flex flex-col justify-between gap-5 text-[9px] uppercase tracking-[0.18em] text-white/25 sm:flex-row sm:items-center">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
              <span>
                © {new Date().getFullYear()} MISA NG LTD
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-brand/50 sm:block" />

              <span>All rights reserved</span>
            </div>

            <div className="flex items-center gap-5">
              <span>Abuja</span>

              <span className="h-1 w-1 rounded-full bg-brand/50" />

              <span>Nigeria</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function WhatsApp() {
  const n =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    process.env.NEXT_PUBLIC_WHATSAPP ||
    "";

  if (!n) return null;

  return (
    <a
      href={`https://wa.me/${n}?text=${encodeURIComponent(
        "Hello MISA NG, I would like to enquire about a property."
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with MISA NG on WhatsApp"
      className="group fixed bottom-6 right-6 z-40"
    >
      {/* Glow */}
      <span className="absolute inset-0 rounded-full bg-profit/30 blur-xl transition duration-500 group-hover:scale-125" />

      {/* Button */}
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-profit text-ink shadow-2xl shadow-black/40 transition duration-300 group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-1.9.9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6c-.1.2-.3.3-.1.6.6 1 1.4 1.8 2.4 2.3.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.4.1.2.1.7-.1 1.2Z" />
        </svg>
      </span>
    </a>
  );
}