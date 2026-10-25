import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaTwitter,
} from "react-icons/fa";

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
      ["Terms", "/terms"],
      ["Policy", "/privacy"],
      ["FAQs", "/faqs"],
    ],
  ],
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    Icon: FaInstagram,
  },
  {
    name: "X",
    href: "https://x.com/",
    Icon: FaTwitter,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    Icon: FaFacebookF,
  },
];

function getWhatsAppUrl() {
  const number =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    process.env.NEXT_PUBLIC_WHATSAPP ||
    "";

  const cleanNumber = number.replace(/\D/g, "");

  if (!cleanNumber) {
    return "https://www.whatsapp.com/";
  }

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    "Hello MISA NG, I would like to make an enquiry."
  )}`;
}

const focusStyles =
  "rounded-sm outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#FFB52A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]";

export default function Footer() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <footer
      id="contact"
      className="relative isolate overflow-hidden border-t border-[#252D3A] bg-[#050505] text-[#F5F5F5]"
    >
      {/* Restrained brand accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 -z-10 h-80 w-80 rounded-full bg-[#F59A16]/[0.06] blur-[100px]"
      />

      <div className="mx-auto max-w-[1440px] px-5 pb-6 pt-14 sm:px-8 sm:pb-8 sm:pt-16 lg:px-12 lg:pt-20">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-11 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-[1.7fr_0.8fr_0.8fr_0.8fr] lg:gap-12 xl:gap-16">
          {/* Brand */}
          <div className="max-w-[390px]">
            <Link
              href="/"
              aria-label="MISA NG LTD home"
              className={`inline-flex flex-col ${focusStyles}`}
            >
              <span className="font-serif text-[2.65rem] font-medium leading-none tracking-[-0.075em] text-[#F5F5F5] sm:text-5xl">
                MISA
                <span className="text-[#F59A16]">.</span>
              </span>

              <span className="mt-2 pl-0.5 text-[9px] font-medium uppercase tracking-[0.34em] text-[#737B89]">
                NG LTD
              </span>
            </Link>

            <p className="mt-6 max-w-[330px] text-[13px] leading-7 text-[#A7AFBF] sm:text-sm sm:leading-7">
              Property, investment and advisory. Connecting
              discerning buyers, investors and developers with
              opportunities across Nigeria.
            </p>

            <div className="mt-6 inline-flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFB52A]"
              />

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#737B89]">
                Abuja · Nigeria
              </span>
            </div>
          </div>

          {/* Navigation */}
          {cols.map(([title, links]) => (
            <nav key={title} aria-label={`${title} navigation`}>
              <h2 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#FFB52A]">
                {title}
              </h2>

              <ul className="space-y-4">
                {links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className={`group inline-flex items-center gap-2 text-[13px] text-[#A7AFBF] hover:text-[#F5F5F5] sm:text-sm ${focusStyles}`}
                    >
                      <span>{label}</span>

                      <span
                        aria-hidden="true"
                        className="text-[#F59A16] opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 motion-reduce:transition-none"
                      >
                        ↗
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Social links */}
        <section
          aria-labelledby="footer-social-heading"
          className="mt-12 border-t border-[#252D3A] pt-7 sm:mt-14 sm:pt-8 lg:mt-16"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <div>
              <h2
                id="footer-social-heading"
                className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#FFB52A]"
              >
                Social
              </h2>

              <p className="mt-2 text-[13px] leading-6 text-[#737B89]">
                Connect with MISA NG LTD.
              </p>
            </div>

            <div
              aria-label="MISA NG LTD social media"
              className="flex flex-wrap items-center gap-2.5"
            >
              {socialLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit MISA NG LTD on ${name}`}
                  title={name}
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#252D3A] bg-[#0D121B] text-[#A7AFBF] transition-colors duration-200 hover:border-[#F59A16] hover:bg-[#F59A16] hover:text-[#050505] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB52A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
                >
                  <Icon
                    aria-hidden="true"
                    className="text-base transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none"
                  />
                </a>
              ))}

              {/* WhatsApp */}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact MISA NG LTD on WhatsApp"
                title="WhatsApp"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#252D3A] bg-[#0D121B] text-[#A7AFBF] transition-colors duration-200 hover:border-[#FFB52A] hover:bg-[#FFB52A] hover:text-[#050505] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB52A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >
                <FaWhatsapp
                  aria-hidden="true"
                  className="text-lg transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none"
                />
              </a>
            </div>
          </div>
        </section>

        {/* Bottom bar */}
        <div className="mt-9 flex flex-col gap-3 border-t border-[#252D3A] pt-5 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pt-6">
          <p className="text-[11px] leading-5 text-[#737B89]">
            © {new Date().getFullYear()} MISA NG LTD. All rights reserved.
          </p>

          <p className="text-[9px] font-medium uppercase leading-5 tracking-[0.16em] text-[#737B89] sm:text-right">
            Property <span className="px-1.5 text-[#F59A16]">·</span>
            Investment <span className="px-1.5 text-[#F59A16]">·</span>
            Advisory
          </p>
        </div>
      </div>
    </footer>
  );
}

/* Floating WhatsApp button */
export function WhatsApp() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with MISA NG LTD on WhatsApp"
      title="Chat with us on WhatsApp"
      className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[#FFB52A] bg-[#FFB52A] text-[#050505] shadow-[0_8px_30px_rgba(245,154,22,0.20)] transition-[transform,box-shadow] duration-200 hover:scale-105 hover:shadow-[0_8px_35px_rgba(245,154,22,0.35)] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB52A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
    >
      <FaWhatsapp aria-hidden="true" className="text-2xl" />
    </a>
  );
}