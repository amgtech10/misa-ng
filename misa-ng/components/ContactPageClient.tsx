"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Building2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  CheckCircle2,
  Loader2,
  Globe2,
} from "lucide-react";

import { sendLead } from "@/lib/lead";

const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
  process.env.NEXT_PUBLIC_WHATSAPP ||
  "";

const email =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

const phone =
  process.env.NEXT_PUBLIC_CONTACT_PHONE || "";

const enquiries = [
  "Property Purchase",
  "List a Property",
  "Investment Opportunities",
  "Developer Partnership",
  "Property Advisory",
  "General Enquiry",
];

export default function ContactPageClient() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      interest: String(data.get("interest") || ""),
      note: String(data.get("message") || "").trim(),
      type: "Contact page enquiry",
    };

    try {
      await sendLead(payload);

      setSuccess(true);
      form.reset();
    } catch {
      setError(
        "We couldn't submit your enquiry. Please try again or contact us through WhatsApp."
      );
    } finally {
      setLoading(false);
    }
  }

  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
        "Hello MISA LTD, I would like to make an enquiry."
      )}`
    : null;

  return (
    <div className="overflow-hidden">

      {/* HERO */}

      <section className="relative px-5 pb-20 pt-36 sm:px-8 lg:px-16 lg:pb-28 lg:pt-48">

        <div className="pointer-events-none absolute -right-40 top-10 h-[450px] w-[450px] rounded-full bg-[#F59A16]/[0.07] blur-[130px]" />

        <div className="relative mx-auto max-w-7xl">

          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-[#F59A16]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#F59A16]">
              Get in touch
            </span>
          </div>

          <div className="max-w-4xl">

            <h1 className="font-serif text-5xl font-medium leading-[1.08] tracking-tight sm:text-6xl lg:text-[88px]">
              Let's start a{" "}
              <span className="italic text-[#F59A16]">
                conversation.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-sm leading-8 text-[#A7AFBF] sm:text-base">
              Whether you're exploring property opportunities, seeking
              investment guidance, or looking to partner with us,
              we're here to help you take the next step.
            </p>

          </div>

          <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-[#252D3A] pt-7">

            <span className="text-[10px] uppercase tracking-[0.2em] text-[#737B89]">
              MISA LTD
            </span>

            <span className="h-1 w-1 rounded-full bg-[#F59A16]" />

            <span className="text-[10px] uppercase tracking-[0.2em] text-[#737B89]">
              Property
            </span>

            <span className="h-1 w-1 rounded-full bg-[#F59A16]" />

            <span className="text-[10px] uppercase tracking-[0.2em] text-[#737B89]">
              Investment
            </span>

            <span className="h-1 w-1 rounded-full bg-[#F59A16]" />

            <span className="text-[10px] uppercase tracking-[0.2em] text-[#737B89]">
              Advisory
            </span>

          </div>

        </div>
      </section>


      {/* CONTACT CONTENT */}

      <section className="border-y border-[#252D3A] bg-[#0A0F17] px-5 py-20 sm:px-8 lg:px-16 lg:py-28">

        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.85fr_1.15fr]">

          {/* LEFT SIDE */}

          <div>

            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F59A16]">
              Contact information
            </span>

            <h2 className="mt-6 max-w-md font-serif text-4xl leading-tight sm:text-5xl">
              We're one conversation away.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-8 text-[#A7AFBF]">
              Tell us what you're looking for. Our team is ready to
              understand your needs and connect you with the right
              opportunities.
            </p>


            {/* CONTACT CARDS */}

            <div className="mt-12 space-y-4">

              <div className="flex gap-5 border border-[#252D3A] bg-[#0D121B] p-6 transition hover:border-[#F59A16]/50">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#F59A16]/20 bg-[#F59A16]/10 text-[#F59A16]">
                  <MapPin size={21} />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#737B89]">
                    Our location
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    Abuja, Nigeria
                  </p>

                  <p className="mt-1 text-xs text-[#737B89]">
                    Serving property opportunities across Nigeria.
                  </p>
                </div>

              </div>


              {email && (
                <a
                  href={`mailto:${email}`}
                  className="group flex gap-5 border border-[#252D3A] bg-[#0D121B] p-6 transition hover:border-[#F59A16]/50"
                >

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#F59A16]/20 bg-[#F59A16]/10 text-[#F59A16]">
                    <Mail size={21} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#737B89]">
                      Email us
                    </p>

                    <p className="mt-2 break-all text-sm font-medium">
                      {email}
                    </p>
                  </div>

                  <ArrowUpRight className="ml-auto shrink-0 text-[#737B89] transition group-hover:text-[#F59A16]" />
                </a>
              )}


              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="group flex gap-5 border border-[#252D3A] bg-[#0D121B] p-6 transition hover:border-[#F59A16]/50"
                >

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#F59A16]/20 bg-[#F59A16]/10 text-[#F59A16]">
                    <Phone size={21} />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#737B89]">
                      Call us
                    </p>

                    <p className="mt-2 text-sm font-medium">
                      {phone}
                    </p>
                  </div>

                  <ArrowUpRight className="ml-auto text-[#737B89] transition group-hover:text-[#F59A16]" />
                </a>
              )}

            </div>


            {/* WHATSAPP */}

            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-between border border-[#32D583]/30 bg-[#32D583]/[0.06] p-5 transition hover:bg-[#32D583]/[0.12]"
              >

                <div className="flex items-center gap-4">

                  <MessageCircle
                    size={23}
                    className="text-[#32D583]"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      Chat with us on WhatsApp
                    </p>

                    <p className="mt-1 text-xs text-[#737B89]">
                      Start a direct conversation.
                    </p>
                  </div>

                </div>

                <ArrowUpRight className="text-[#32D583]" />

              </a>
            )}

          </div>


          {/* RIGHT SIDE - FORM */}

          <div className="border border-[#252D3A] bg-[#0D121B] p-6 sm:p-9 lg:p-11">

            <div className="mb-10">

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F59A16]">
                Send an enquiry
              </span>

              <h3 className="mt-4 font-serif text-3xl sm:text-4xl">
                How can we help?
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#737B89]">
                Complete the form below and our team will get back to you.
              </p>

            </div>


            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid gap-6 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-3 block text-xs text-[#A7AFBF]"
                  >
                    Full name *
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                    className="w-full border border-[#252D3A] bg-[#080C12] px-4 py-4 text-sm outline-none transition placeholder:text-[#555D6A] focus:border-[#F59A16]"
                  />
                </div>


                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-3 block text-xs text-[#A7AFBF]"
                  >
                    Email address *
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full border border-[#252D3A] bg-[#080C12] px-4 py-4 text-sm outline-none transition placeholder:text-[#555D6A] focus:border-[#F59A16]"
                  />
                </div>

              </div>


              <div>

                <label
                  htmlFor="contact-phone"
                  className="mb-3 block text-xs text-[#A7AFBF]"
                >
                  Phone number
                </label>

                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+234 800 000 0000"
                  className="w-full border border-[#252D3A] bg-[#080C12] px-4 py-4 text-sm outline-none transition placeholder:text-[#555D6A] focus:border-[#F59A16]"
                />

              </div>


              <div>

                <label
                  htmlFor="contact-interest"
                  className="mb-3 block text-xs text-[#A7AFBF]"
                >
                  What would you like to discuss? *
                </label>

                <select
                  id="contact-interest"
                  name="interest"
                  required
                  defaultValue=""
                  className="w-full appearance-none border border-[#252D3A] bg-[#080C12] px-4 py-4 text-sm text-[#A7AFBF] outline-none transition focus:border-[#F59A16]"
                >

                  <option value="" disabled>
                    Select an enquiry type
                  </option>

                  {enquiries.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}

                </select>

              </div>


              <div>

                <label
                  htmlFor="contact-message"
                  className="mb-3 block text-xs text-[#A7AFBF]"
                >
                  Your message *
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us a little about what you're looking for..."
                  className="w-full resize-none border border-[#252D3A] bg-[#080C12] px-4 py-4 text-sm leading-7 outline-none transition placeholder:text-[#555D6A] focus:border-[#F59A16]"
                />

              </div>


              {error && (
                <p role="alert" className="text-sm text-red-400">
                  {error}
                </p>
              )}


              {success && (
                <div
                  role="status"
                  className="flex items-center gap-3 border border-[#32D583]/30 bg-[#32D583]/10 p-4 text-sm text-[#32D583]"
                >
                  <CheckCircle2 size={20} />

                  Thank you! Your enquiry has been submitted successfully.
                </div>
              )}


              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 bg-[#F59A16] px-6 py-5 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-[#FFB52A] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Sending enquiry...
                  </>
                ) : (
                  <>
                    Send your enquiry
                    <ArrowRight size={18} />
                  </>
                )}

              </button>


              <p className="text-center text-[10px] leading-6 text-[#737B89]">
                By submitting this form, you agree to be contacted by
                MISA LTD regarding your enquiry.
              </p>

            </form>

          </div>

        </div>

      </section>


      {/* FINAL CTA */}

      <section className="relative overflow-hidden px-5 py-24 text-center sm:px-8 lg:py-32">

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F59A16]/[0.06] blur-[120px]" />

        <div className="relative mx-auto max-w-3xl">

          <Globe2
            size={30}
            className="mx-auto text-[#F59A16]"
          />

          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#F59A16]">
            Your next opportunity starts here
          </p>

          <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-6xl">
            Let's make your next move{" "}
            <span className="italic text-[#F59A16]">
              count.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-[#A7AFBF]">
            Explore carefully selected property opportunities
            and build meaningful partnerships with MISA LTD.
          </p>

          <Link
            href="/properties"
            className="mt-10 inline-flex items-center gap-4 border border-[#F59A16] px-8 py-5 text-xs font-bold uppercase tracking-[0.2em] text-[#F59A16] transition hover:bg-[#F59A16] hover:text-black"
          >
            Explore properties
            <ArrowUpRight size={17} />
          </Link>

        </div>

      </section>

    </div>
  );
}