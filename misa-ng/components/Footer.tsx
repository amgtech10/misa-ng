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
    <footer className="relative isolate overflow-hidden border-t border-[#252D3A] bg-[#050505]">
      {/* Restrained ambient accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 -z-10 h-80 w-80 rounded-full bg-[#F59A16]/[0.06] blur-[100px] sm:h-96 sm:w-96"
      />

      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-14 sm:gap-16 lg:grid-cols-[1.8fr_0.8fr_0.8fr_0.8fr] lg:gap-12 xl:gap-16">
          {/* Brand and introduction */}
          <div className="max-w-xl">
            <Link
              href="/"
              aria-label="MISA NG LTD home"
              className="group inline-flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB52A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]"
            >
              <span className="relative grid h-11 w-11 shrink-0 place-items-center border border-[#252D3A] text-xs tracking-[0.14em] text-[#F5F5F5] transition-colors duration-300 group-hover:border-[#FFB52A] group-hover:text-[#FFB52A] motion-reduce:transition-none">
                M

                <span
                  aria-hidden="true"
                  className="absolute right-0 top-0 h-1.5 w-1.5 bg-[#FFB52A]"
                />
              </span>

              <span>
                <span className="block font-serif text-xl leading-none tracking-[-0.04em] text-[#F5F5F5]">
                  MISA <span className="text-[#FFB52A]">NG</span>
                </span>

                <span className="mt-2 block text-[10px] uppercase tracking-[0.18em] text-[#737B89]">
                  Property · Investment
                </span>
              </span>
            </Link>

            <h2 className="mt-10 max-w-lg font-serif text-[clamp(2.65rem,5.2vw,4.75rem)] leading-[0.98] tracking-[-0.045em] text-[#F5F5F5]">
              Real estate,
              <br />
              <span className="italic text-[#A7AFBF]">
                approached differently.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#A7AFBF]">
              Municipal Integrated Service Agent NG Ltd — MISA NG LTD — is a
              commission-based agency connecting clients with property,
              market intelligence and investment opportunities across Nigeria.
            </p>

            <p className="mt-4 max-w-md text-xs leading-6 text-[#737B89]">
              Part of Strategic Infrastructure and Resource Partners
              (SIR-Partners).
            </p>

            {/* Contact CTA */}
            <div className="mt-8">
              <Link
                href="/contact"
                className="group inline-flex min-h-12 items-center justify-between gap-8 border border-[#252D3A] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#F5F5F5] transition-colors duration-300 hover:border-[#F59A16] hover:text-[#FFB52A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB52A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505] motion-reduce:transition-none"
              >
                <span>Start a conversation</span>

                <span
                  aria-hidden="true"
                  className="text-base text-[#FFB52A] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Navigation columns */}
          {cols.map(([title, links]) => (
            <nav key={title} aria-label={title}>
              <h3 className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#737B89]">
                {title}
              </h3>

              <ul className="mt-5 space-y-1">
                {links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group inline-flex min-h-10 items-center gap-2 rounded-sm py-2 pr-2 text-sm text-[#A7AFBF] transition-colors duration-200 hover:text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB52A] motion-reduce:transition-none"
                    >
                      <span>{label}</span>

                      <span
                        aria-hidden="true"
                        className="text-xs text-[#FFB52A] opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transform-none motion-reduce:transition-none"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Lower bar */}
        <div className="mt-16 border-t border-[#252D3A] pt-6 sm:mt-20 sm:pt-7">
          <div className="flex flex-col gap-5 text-[10px] uppercase tracking-[0.12em] text-[#737B89] sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <span>
                © {new Date().getFullYear()} MISA NG LTD
              </span>

              <span
                aria-hidden="true"
                className="hidden h-1 w-1 rounded-full bg-[#A85F08] sm:block"
              />

              <span>All rights reserved</span>
            </div>

            <div
              aria-label="Location: Abuja, Nigeria"
              className="flex items-center gap-3"
            >
              <span>Abuja</span>

              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-[#A85F08]"
              />

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

  const number = n.replace(/\D/g, "");

  if (!number) return null;

  const message =
    "Hello MISA NG, I would like to enquire about a property.";

  return (
    <a
      href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with MISA NG on WhatsApp (opens in a new tab)"
      className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#32D583] text-[#050505] shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#32D583] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505] motion-reduce:transform-none motion-reduce:transition-none sm:bottom-7 sm:right-7"
    >
      {/* Subtle hover accent */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#32D583]/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
      />

      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-1.9.9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6c-.1.2-.3.3-.1.6.6 1 1.4 1.8 2.4 2.3.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.4.1 0 .1.7-.1 1.2Z" />
      </svg>
    </a>
  );
}