"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { sendLead } from "@/lib/lead";

const interests = [
  "Buy a property",
  "List a property",
  "Invest",
  "Onboard as a developer",
];

export default function Hero() {
  const [step, setStep] = useState(1);

  const [d, setD] = useState({
    name: "",
    phone: "",
    email: "",
    interest: interests[0],
    note: "",
  });

  const [msg, setMsg] = useState("");

  const set =
    (key: string) =>
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setD((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  async function next() {
    if (
      step === 1 &&
      (!d.name.trim() || !/^\S+@\S+\.\S+$/.test(d.email))
    ) {
      setMsg("Please enter your name and a valid email address.");
      return;
    }

    setMsg("");

    if (step < 3) {
      setStep((prev) => prev + 1);
      return;
    }

    setMsg("Sending...");

    try {
      await sendLead({
        ...d,
        type: "Hero registration",
      });

      setMsg("");
      setStep(4);
    } catch (e) {
      setMsg((e as Error).message);
    }
  }

  const go = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-[#080807] text-white"
    >
      {/* =====================================================
          HERO IMAGE
      ====================================================== */}

      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90"
          alt="Luxury modern residence"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* =====================================================
          IMAGE TREATMENT
      ====================================================== */}

      {/* Overall cinematic darkness */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Deep left fade */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080807] via-[#080807]/85 to-transparent" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#080807] via-[#080807]/50 to-transparent" />

      {/* Subtle gold atmosphere */}
      <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#d69a3a]/10 blur-[160px]" />

      {/* =====================================================
          NAV / TOP BRAND MARK
      ====================================================== */}

      <div className="relative z-10 mx-auto flex max-w-[1500px] items-center justify-between px-6 pt-8 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center border border-white/25 text-[11px] tracking-widest text-gold">
            M
          </div>

          <div>
            <p className="text-[11px] font-medium tracking-[0.28em]">
              MISA NG LTD
            </p>

            <p className="mt-0.5 text-[8px] uppercase tracking-[0.2em] text-white/40">
              Property · Investment · Advisory
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-white/55 md:flex">
          <button
            onClick={() => go("properties")}
            className="transition hover:text-white"
          >
            Properties
          </button>

          <button
            onClick={() => go("developers")}
            className="transition hover:text-white"
          >
            Developers
          </button>

          <button
            onClick={() => go("news")}
            className="transition hover:text-white"
          >
            Intelligence
          </button>
        </div>

        <button
          onClick={() => go("properties")}
          className="border border-white/25 px-4 py-2 text-[10px] uppercase tracking-[0.18em] transition hover:border-brand hover:bg-brand hover:text-black"
        >
          Explore
        </button>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-90px)] max-w-[1500px] items-center gap-16 px-6 pb-20 pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:pb-24 lg:pt-12">
        {/* =================================================
            LEFT
        ================================================== */}

        <div className="max-w-[850px]">
          {/* Eyebrow */}
          <div className="flex animate-rise items-center gap-4">
            <span className="h-px w-12 bg-brand" />

            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
              Nigerian property advisory
            </span>
          </div>

          {/* Main heading */}
          <h1 className="mt-8 animate-rise font-serif text-[clamp(3.5rem,7vw,7.8rem)] font-normal leading-[0.88] tracking-[-0.055em] [animation-delay:.1s]">
            Property,
            <br />

            <span className="italic text-gold">
              intelligently
            </span>{" "}
            brokered.
          </h1>

          {/* Description */}
          <p className="mt-9 max-w-xl animate-rise text-base leading-7 text-white/65 [animation-delay:.2s] md:text-lg">
            A commission-led property agency connecting
            discerning buyers, investors and developers with
            opportunities across Nigeria.
          </p>

          {/* CTA */}
          <div className="mt-9 flex animate-rise flex-wrap items-center gap-4 [animation-delay:.3s]">
            <button
              onClick={() => go("properties")}
              className="group flex items-center gap-5 bg-brand px-6 py-4 text-xs font-medium uppercase tracking-[0.16em] text-black transition hover:bg-gold"
            >
              Explore properties

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            <button
              onClick={() => go("developers")}
              className="border border-white/20 bg-white/[0.03] px-6 py-4 text-xs uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:border-white/50"
            >
              Partner with MISA
            </button>
          </div>

          {/* =================================================
              MARKET STATS
          ================================================== */}

          <div className="mt-16 grid max-w-2xl grid-cols-3 border-y border-white/10 py-6">
            <div className="pr-5">
              <p className="font-serif text-2xl text-white md:text-3xl">
                01
              </p>

              <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-white/40">
                Trusted agency
              </p>
            </div>

            <div className="border-l border-white/10 px-5">
              <p className="font-serif text-2xl text-white md:text-3xl">
                360°
              </p>

              <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-white/40">
                Property advisory
              </p>
            </div>

            <div className="border-l border-white/10 pl-5">
              <p className="font-serif text-2xl text-white md:text-3xl">
                100%
              </p>

              <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-white/40">
                Deal focused
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            RIGHT — PRIVATE CLIENT FORM
        ================================================== */}

        <div className="flex justify-end">
          <div className="w-full max-w-[470px] animate-rise [animation-delay:.45s]">
            <div className="relative overflow-hidden border border-white/15 bg-[#0b0b0a]/75 p-6 shadow-[0_30px_100px_rgba(0,0,0,.5)] backdrop-blur-2xl sm:p-8">
              {/* Gold accent */}
              <div className="absolute left-0 top-0 h-px w-24 bg-brand" />

              {step === 4 ? (
                <SuccessState
                  onReset={() => {
                    setStep(1);
                    setD({
                      name: "",
                      phone: "",
                      email: "",
                      interest: interests[0],
                      note: "",
                    });
                  }}
                />
              ) : (
                <>
                  {/* Form heading */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.28em] text-gold">
                        Private client desk
                      </p>

                      <h2 className="mt-3 font-serif text-3xl leading-tight">
                        Let us find your
                        <br />
                        next property.
                      </h2>
                    </div>

                    <span className="font-mono text-[10px] text-white/30">
                      0{step} / 03
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="mt-7 flex gap-1">
                    {[1, 2, 3].map((x) => (
                      <div
                        key={x}
                        className={`h-[2px] flex-1 transition-all duration-500 ${
                          x <= step
                            ? "bg-brand"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>

                  {/* =================================================
                      STEP 1
                  ================================================== */}

                  <div className="mt-7 grid gap-4">
                    {step === 1 && (
                      <>
                        <Field
                          id="h-name"
                          label="Full name"
                          value={d.name}
                          onChange={set("name")}
                          placeholder="Your name"
                        />

                        <Field
                          id="h-phone"
                          label="Phone"
                          type="tel"
                          value={d.phone}
                          onChange={set("phone")}
                          placeholder="+234"
                        />

                        <Field
                          id="h-email"
                          label="Email"
                          type="email"
                          value={d.email}
                          onChange={set("email")}
                          placeholder="you@example.com"
                        />
                      </>
                    )}

                    {/* =================================================
                        STEP 2
                    ================================================== */}

                    {step === 2 && (
                      <div>
                        <label
                          htmlFor="h-int"
                          className="mb-2 block text-[9px] uppercase tracking-[0.18em] text-white/40"
                        >
                          I am looking to
                        </label>

                        <select
                          id="h-int"
                          value={d.interest}
                          onChange={set("interest")}
                          className="w-full appearance-none border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white outline-none transition focus:border-brand"
                        >
                          {interests.map((interest) => (
                            <option
                              key={interest}
                              className="bg-[#10100f] text-white"
                            >
                              {interest}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* =================================================
                        STEP 3
                    ================================================== */}

                    {step === 3 && (
                      <div>
                        <label
                          htmlFor="h-note"
                          className="mb-2 block text-[9px] uppercase tracking-[0.18em] text-white/40"
                        >
                          Tell us about your brief
                        </label>

                        <textarea
                          id="h-note"
                          rows={6}
                          value={d.note}
                          onChange={set("note")}
                          placeholder="Location, budget, property type or anything else..."
                          className="w-full resize-none border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-6 text-white outline-none placeholder:text-white/25 transition focus:border-brand"
                        />
                      </div>
                    )}

                    {msg && (
                      <p
                        role="alert"
                        className="text-xs text-brand"
                      >
                        {msg}
                      </p>
                    )}

                    {/* Buttons */}
                    <div className="mt-2 flex items-center justify-between">
                      {step > 1 ? (
                        <button
                          onClick={() =>
                            setStep((prev) => prev - 1)
                          }
                          className="text-[10px] uppercase tracking-[0.18em] text-white/40 transition hover:text-white"
                        >
                          ← Back
                        </button>
                      ) : (
                        <span />
                      )}

                      <button
                        onClick={next}
                        className="bg-brand px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.18em] text-black transition hover:bg-gold"
                      >
                        {step === 3
                          ? "Send my brief"
                          : "Continue →"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <p className="mt-4 text-center text-[9px] uppercase tracking-[0.16em] text-white/25">
              Confidential enquiry · MISA NG LTD
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          SCROLL MARKER
      ====================================================== */}

      <button
        onClick={() => go("properties")}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-4 text-[9px] uppercase tracking-[0.3em] text-white/35 transition hover:text-white md:flex"
      >
        <span>Discover</span>

        <span className="h-10 w-px bg-white/20" />

        <span>↓</span>
      </button>
    </section>
  );
}

/* ===========================================================
   FIELD COMPONENT
=========================================================== */

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[9px] uppercase tracking-[0.18em] text-white/40"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white outline-none placeholder:text-white/25 transition focus:border-brand"
      />
    </div>
  );
}

/* ===========================================================
   SUCCESS STATE
=========================================================== */

function SuccessState({
  onReset,
}: {
  onReset: () => void;
}) {
  return (
    <div className="py-8">
      <div className="flex h-12 w-12 items-center justify-center border border-profit/30 bg-profit/10 text-profit">
        ✓
      </div>

      <p className="mt-7 text-[9px] uppercase tracking-[0.25em] text-gold">
        Enquiry received
      </p>

      <h2 className="mt-3 font-serif text-3xl">
        Your property brief
        <br />
        is with us.
      </h2>

      <p className="mt-4 max-w-sm text-sm leading-6 text-white/50">
        A MISA representative will review your requirements
        and prepare a shortlist suited to your brief.
      </p>

      <button
        onClick={onReset}
        className="mt-8 text-[10px] uppercase tracking-[0.18em] text-brand underline-offset-4 hover:underline"
      >
        Submit another enquiry
      </button>
    </div>
  );
}
