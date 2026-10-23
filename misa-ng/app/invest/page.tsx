"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { sendLead } from "@/lib/lead";
import Navbar from "@/components/Navbar";

const BRAND = "#FFB52A";
const NAVY = "#0A0F17";
const INK = "#080807";

const COUNTRIES = [
  {
    name: "Nigeria",
    code: "+234",
    flag: "🇳🇬",
    iso: "NG",
  },
  {
    name: "Ghana",
    code: "+233",
    flag: "🇬🇭",
    iso: "GH",
  },
  {
    name: "Kenya - Coming soon",
    code: "+254",
    flag: "🇰🇪",
    iso: "KE",
  },
  {
    name: "South Africa - Coming soon",
    code: "+27",
    flag: "🇿🇦",
    iso: "ZA",
  },
];

const BUDGETS = [
  "Below ₦25 million",
  "₦25m – ₦50m",
  "₦50m – ₦100m",
  "₦100m – ₦250m",
  "₦250m – ₦500m",
  "₦500m+",
];

const TIMELINES = [
  "Immediately",
  "Within 3 months",
  "3 – 6 months",
  "6 – 12 months",
  "12+ months",
  "Just researching",
];

const PROPERTY_TYPES = [
  "Residential",
  "Commercial",
  "Land",
  "Off-plan developments",
];

const INVESTMENT_PURPOSES = [
  "Personal residence",
  "Rental income",
  "Capital appreciation",
  "Property development",
];

const OPTIONAL_SERVICES = [
  "Mortgage / financing guidance",
  "Legal and title verification",
  "Property management",
  "Interior design",
  "Furnishing",
  "Relocation assistance",
  "Investment advisory",
];

type InvestmentForm = {
  investorType: "individual" | "business";
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  phoneCountry: string;
  preferredLocation: string;
  budget: string;
  timeline: string;
  propertyTypes: string[];
  purpose: string;
  viewingPreference: string;
  services: string[];
  note: string;
  contactTime: string;
  privatePortal: boolean;
};

const INITIAL_FORM: InvestmentForm = {
  investorType: "individual",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  phoneCountry: "NG",
  preferredLocation: "",
  budget: "",
  timeline: "",
  propertyTypes: [],
  purpose: "",
  viewingPreference: "Just exploring",
  services: [],
  note: "",
  contactTime: "Any time",
  privatePortal: false,
};

export default function InvestPage() {
  const [form, setForm] = useState<InvestmentForm>(INITIAL_FORM);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedPhoneCountry =
    COUNTRIES.find((country) => country.iso === form.phoneCountry) ??
    COUNTRIES[0];

  function updateField<K extends keyof InvestmentForm>(
    field: K,
    value: InvestmentForm[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function toggleArrayValue(
    field: "propertyTypes" | "services",
    value: string,
  ) {
    setForm((current) => {
      const values = current[field];

      return {
        ...current,
        [field]: values.includes(value)
          ? values.filter((item) => item !== value)
          : [...values, value],
      };
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("idle");
    setErrorMessage("");

    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.phone.trim() ||
      !form.email.trim()
    ) {
      setErrorMessage("Please complete all required contact details.");
      setStatus("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    if (!form.preferredLocation) {
      setErrorMessage("Please select your preferred investment country.");
      setStatus("error");
      return;
    }

    if (
      !form.budget ||
      !form.timeline ||
      form.propertyTypes.length === 0 ||
      !form.purpose
    ) {
      setErrorMessage(
        "Please complete your budget, timeline, property type, and investment purpose.",
      );
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      await sendLead({
        type: "Investment registration",
        name: `${form.firstName.trim()} ${form.lastName.trim()}`,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: `${selectedPhoneCountry.code} ${form.phone.trim()}`,
        phoneCountry: selectedPhoneCountry.name,
        preferredLocation: form.preferredLocation,
        investorType: form.investorType,
        budget: form.budget,
        timeline: form.timeline,
        propertyTypes: form.propertyTypes.join(", "),
        purpose: form.purpose,
        viewingPreference: form.viewingPreference,
        services: form.services.join(", "),
        note: form.note.trim(),
        contactTime: form.contactTime,
        privatePortal: form.privatePortal ? "Yes" : "No",
      });

      setStatus("success");
    } catch (error) {
      console.error("Investment registration failed:", error);

      setErrorMessage(
        "We couldn't submit your registration. Please try again.",
      );

      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#080807] text-white selection:bg-[#FFB52A] selection:text-[#080807]">
      
      <Navbar />
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#FFB52A]/[0.045] blur-[140px]" />

        <div className="absolute -bottom-48 -left-40 h-[500px] w-[500px] rounded-full bg-[#0A0F17] blur-[140px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:70px_70px] opacity-30" />
      </div>

      {/* Page introduction */}
      <section className="relative z-10 mx-auto max-w-[850px] px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20">
        <div className="mb-7 flex items-center gap-3">
          <span className="h-px w-9 bg-[#FFB52A]" />

          <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#FFB52A]">
            Private client registration
          </p>
        </div>

        <h1 className="max-w-3xl font-serif text-[42px] leading-[1.08] tracking-[-0.045em] text-white/40 sm:text-6xl md:text-7xl">
          A considered investment.
          <br />

          <span className="text-[#ffb52a]">
            A clearer <br /> next step.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-sm leading-7 text-white sm:text-base sm:leading-8">
          Tell us what you are looking for. We will use your brief to
          understand your priorities and help identify relevant property
          opportunities across our selected markets.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/10 pt-6">
          <TrustPoint>Private enquiry</TrustPoint>
          <TrustPoint>Personalised assistance</TrustPoint>
          <TrustPoint>Four African markets</TrustPoint>
        </div>
      </section>

      {/* Registration form */}
      <section className="relative z-10 mx-auto max-w-[850px] px-5 pb-24 sm:px-8">
        {status === "success" ? (
          <div className="border border-[#FFB52A]/25 bg-[#0A0F17]/85 p-7 sm:p-12">
            <div className="flex h-14 w-14 items-center justify-center border border-[#FFB52A]/40 bg-[#FFB52A]/10 text-2xl text-[#FFB52A]">
              ✓
            </div>

            <p className="mt-8 text-[9px] uppercase tracking-[0.25em] text-[#FFB52A]">
              Registration received
            </p>

            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-5xl">
              Thank you, {form.firstName}.
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-white/55">
              Your investment brief has been submitted. Our team can review
              your preferences and follow up using the contact information
              you provided.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex min-h-[48px] items-center justify-center gap-3 bg-[#FFB52A] px-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#080807] transition hover:bg-white"
              >
                Return home <span aria-hidden="true">→</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setForm(INITIAL_FORM);
                  setStatus("idle");
                  setErrorMessage("");
                }}
                className="inline-flex min-h-[48px] items-center justify-center border border-white/15 px-6 text-[10px] uppercase tracking-[0.15em] text-white/70 transition hover:border-white/40 hover:text-white"
              >
                Submit another brief
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="border border-white/[0.10] bg-[#0A0F17]/85 shadow-[0_30px_100px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          >
            {/* Form top */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-9">
              <div>
                <p className="text-[9px] uppercase tracking-[0.22em] text-[#FFB52A]">
                  Investment desk
                </p>

                <p className="mt-2 text-xs text-white/50">
                  Complete your private investment brief.
                </p>
              </div>

              <span className="border border-white/10 px-3 py-2 text-[8px] uppercase tracking-[0.16em] text-white/40">
                Secure enquiry
              </span>
            </div>

            <div className="space-y-12 px-5 py-8 sm:px-9 sm:py-10">
              {/* 01 — Investor profile */}
              <FormSection
                number="01"
                title="Who is investing?"
                description="Tell us how you intend to invest."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <ChoiceCard
                    selected={form.investorType === "individual"}
                    title="Individual"
                    description="Investing in a personal capacity"
                    onClick={() => updateField("investorType", "individual")}
                  />

                  <ChoiceCard
                    selected={form.investorType === "business"}
                    title="Business / Institution"
                    description="Investing on behalf of an organisation"
                    onClick={() => updateField("investorType", "business")}
                  />
                </div>
              </FormSection>

              {/* 02 — Contact details */}
              <FormSection
                number="02"
                title="Your details"
                description="How should our team reach you?"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="First name" required>
                    <input
                      autoComplete="given-name"
                      name="firstName"
                      value={form.firstName}
                      onChange={(event) =>
                        updateField("firstName", event.target.value)
                      }
                      required
                      placeholder="Your first name"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Last name" required>
                    <input
                      autoComplete="family-name"
                      name="lastName"
                      value={form.lastName}
                      onChange={(event) =>
                        updateField("lastName", event.target.value)
                      }
                      required
                      placeholder="Your last name"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Email address" required>
                    <input
                      autoComplete="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      required
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Phone number" required>
                    <div className="flex min-h-[51px] items-stretch border border-white/10 bg-[#080B11] transition-colors focus-within:border-[#FFB52A]/70">
                      <label
                        htmlFor="phoneCountry"
                        className="sr-only"
                      >
                        Country code
                      </label>

                      <select
                        id="phoneCountry"
                        name="phoneCountry"
                        value={form.phoneCountry}
                        onChange={(event) =>
                          updateField("phoneCountry", event.target.value)
                        }
                        className="max-w-[133px] shrink-0 cursor-pointer border-r border-white/10 bg-[#101722] px-2 text-xs text-white outline-none sm:px-3"
                      >
                        {COUNTRIES.map((country) => (
                          <option key={country.iso} value={country.iso}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>

                      <input
                        autoComplete="tel-national"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        value={form.phone}
                        onChange={(event) =>
                          updateField("phone", event.target.value)
                        }
                        required
                        placeholder="801 234 5678"
                        className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/25 sm:px-4"
                      />
                    </div>
                  </Field>
                </div>
              </FormSection>

              {/* 03 — Investment brief */}
              <FormSection
                number="03"
                title="Your investment brief"
                description="Help us understand the opportunity you have in mind."
              >
                <div className="space-y-7">
                  <Field
                    label="Preferred investment country"
                    required
                  >
                    <select
                      name="preferredLocation"
                      value={form.preferredLocation}
                      onChange={(event) =>
                        updateField("preferredLocation", event.target.value)
                      }
                      required
                      className={selectClass}
                    >
                      <option value="" disabled>
                        Select a country
                      </option>

                      {COUNTRIES.map((country) => (
                        <option key={country.iso} value={country.name}>
                          {country.flag} {country.name}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Investment budget" required>
                    <ChoiceGroup
                      options={BUDGETS}
                      value={form.budget}
                      onChange={(value) => updateField("budget", value)}
                    />
                  </Field>

                  <Field label="When do you intend to invest?" required>
                    <ChoiceGroup
                      options={TIMELINES}
                      value={form.timeline}
                      onChange={(value) => updateField("timeline", value)}
                    />
                  </Field>

                  <Field label="What type of property interests you?" required>
                    <ChoiceGroup
                      options={PROPERTY_TYPES}
                      value={form.propertyTypes}
                      multiple
                      onChange={(value) =>
                        toggleArrayValue("propertyTypes", value)
                      }
                    />

                    <p className="mt-2 text-[10px] text-white/35">
                      Select all that apply.
                    </p>
                  </Field>

                  <Field label="Primary investment objective" required>
                    <ChoiceGroup
                      options={INVESTMENT_PURPOSES}
                      value={form.purpose}
                      onChange={(value) => updateField("purpose", value)}
                    />
                  </Field>

                  <Field label="Viewing preference">
                    <ChoiceGroup
                      options={["Arrange a viewing", "Just exploring"]}
                      value={form.viewingPreference}
                      onChange={(value) =>
                        updateField("viewingPreference", value)
                      }
                    />
                  </Field>
                </div>
              </FormSection>

              {/* 04 — Additional preferences */}
              <FormSection
                number="04"
                title="Additional preferences"
                description="Optional details that help us personalise your experience."
              >
                <div className="space-y-7">
                  <Field label="Services you may need">
                    <div className="grid gap-2 sm:grid-cols-2">
                      {OPTIONAL_SERVICES.map((service) => {
                        const checked = form.services.includes(service);

                        return (
                          <label
                            key={service}
                            className={`flex cursor-pointer items-start gap-3 border p-3.5 transition-colors ${
                              checked
                                ? "border-[#FFB52A]/50 bg-[#FFB52A]/[0.06]"
                                : "border-white/[0.08] bg-[#080B11] hover:border-white/20"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                toggleArrayValue("services", service)
                              }
                              className="mt-0.5 h-4 w-4 shrink-0 accent-[#FFB52A]"
                            />

                            <span className="text-xs leading-5 text-white/70">
                              {service}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </Field>

                  <Field label="Tell us more (optional)">
                    <textarea
                      name="note"
                      value={form.note}
                      onChange={(event) =>
                        updateField("note", event.target.value)
                      }
                      rows={4}
                      maxLength={3000}
                      placeholder="Preferred cities, property requirements, investment goals, or questions..."
                      className={`${inputClass} min-h-[120px] resize-y`}
                    />

                    <p className="mt-2 text-right text-[10px] text-white/30">
                      {form.note.length}/3000
                    </p>
                  </Field>

                  <Field label="Preferred contact time">
                    <select
                      name="contactTime"
                      value={form.contactTime}
                      onChange={(event) =>
                        updateField("contactTime", event.target.value)
                      }
                      className={selectClass}
                    >
                      <option>Any time</option>
                      <option>Morning</option>
                      <option>Afternoon</option>
                      <option>Evening</option>
                    </select>
                  </Field>

                  <label className="flex cursor-pointer items-start gap-3 border border-white/[0.08] bg-[#080B11] p-4">
                    <input
                      type="checkbox"
                      checked={form.privatePortal}
                      onChange={(event) =>
                        updateField("privatePortal", event.target.checked)
                      }
                      className="mt-1 h-4 w-4 shrink-0 accent-[#FFB52A]"
                    />

                    <span>
                      <span className="block text-xs text-white/80">
                        I am interested in a private client portal.
                      </span>

                      <span className="mt-1 block text-[11px] leading-5 text-white/40">
                        Receive information about a more personalised way
                        to review relevant property opportunities.
                      </span>
                    </span>
                  </label>
                </div>
              </FormSection>

              {/* Error feedback */}
              {status === "error" && (
                <div
                  role="alert"
                  className="border border-red-400/25 bg-red-400/[0.06] p-4 text-sm leading-6 text-red-200"
                >
                  {errorMessage}
                </div>
              )}

              {/* Submit */}
              <div className="border-t border-white/10 pt-7">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group flex min-h-[56px] w-full items-center justify-between gap-4 bg-[#FFB52A] px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-[#080807] transition-colors duration-300 hover:bg-white disabled:cursor-wait disabled:opacity-60 sm:px-7"
                >
                  <span>
                    {status === "submitting"
                      ? "Submitting your brief..."
                      : "Submit investment registration"}
                  </span>

                  <span
                    aria-hidden="true"
                    className="text-base transition-transform duration-300 group-hover:translate-x-1"
                  >
                    {status === "submitting" ? "…" : "→"}
                  </span>
                </button>

                <p className="mt-4 text-center text-[10px] leading-5 text-white/35">
                  By submitting this form, you agree that MISA NG may use
                  the details provided to respond to your enquiry. Submission
                  does not constitute an investment commitment or guarantee
                  of property availability.
                </p>
              </div>
            </div>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-[9px] uppercase tracking-[0.16em] text-white/35">
            © {new Date().getFullYear()} MISA NG LTD
          </p>

          <p className="text-[9px] uppercase tracking-[0.16em] text-white/35">
            Property · Investment · Advisory
          </p>

          <Link
            href="/"
            className="text-[9px] uppercase tracking-[0.16em] text-white/45 transition hover:text-[#FFB52A]"
          >
            Return to MISA NG →
          </Link>
        </div>
      </footer>
    </main>
  );
}

/* ===========================================================
   REUSABLE COMPONENTS
=========================================================== */

const inputClass =
  "min-h-[51px] w-full border border-white/10 bg-[#080B11] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#FFB52A]/70";

const selectClass =
  "min-h-[51px] w-full cursor-pointer border border-white/10 bg-[#080B11] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#FFB52A]/70";

function TrustPoint({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.12em] text-white/45">
      <span
        aria-hidden="true"
        className="h-1 w-1 rounded-full bg-[#FFB52A]"
      />

      {children}
    </span>
  );
}

function FormSection({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="mb-6 flex items-start gap-4">
        <span className="pt-1 font-mono text-[10px] tracking-wider text-[#FFB52A]">
          {number}
        </span>

        <div>
          <h2 className="font-serif text-2xl tracking-tight text-white sm:text-3xl">
            {title}
          </h2>

          <p className="mt-2 text-xs leading-6 text-white/40">
            {description}
          </p>
        </div>
      </div>

      <div className="pl-0 sm:pl-9">{children}</div>
    </section>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-2.5 block text-[9px] font-medium uppercase tracking-[0.16em] text-white/55">
        {label}

        {required && (
          <span className="ml-1 text-[#FFB52A]" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

function ChoiceCard({
  selected,
  title,
  description,
  onClick,
}: {
  selected: boolean;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex min-h-[105px] items-start gap-4 border p-4 text-left transition-all duration-300 ${
        selected
          ? "border-[#FFB52A]/60 bg-[#FFB52A]/[0.06]"
          : "border-white/10 bg-[#080B11] hover:border-white/25"
      }`}
    >
      <span
        aria-hidden="true"
        className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
          selected ? "border-[#FFB52A]" : "border-white/25"
        }`}
      >
        {selected && (
          <span className="h-2 w-2 rounded-full bg-[#FFB52A]" />
        )}
      </span>

      <span>
        <span className="block text-sm text-white">{title}</span>

        <span className="mt-2 block text-[11px] leading-5 text-white/40">
          {description}
        </span>
      </span>
    </button>
  );
}

function ChoiceGroup({
  options,
  value,
  onChange,
  multiple = false,
}: {
  options: string[];
  value: string | string[];
  onChange: (value: string) => void;
  multiple?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {options.map((option) => {
        const selected = Array.isArray(value)
          ? value.includes(option)
          : value === option;

        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option)}
            className={`flex min-h-[47px] items-center gap-3 border px-3.5 py-3 text-left text-xs transition-all duration-200 ${
              selected
                ? "border-[#FFB52A]/50 bg-[#FFB52A]/[0.06] text-white"
                : "border-white/[0.09] bg-[#080B11] text-white/55 hover:border-white/25 hover:text-white/85"
            }`}
          >
            <span
              aria-hidden="true"
              className={`flex h-4 w-4 shrink-0 items-center justify-center border ${
                selected
                  ? "border-[#FFB52A] bg-[#FFB52A] text-[#080807]"
                  : "border-white/20"
              }`}
            >
              {selected && (
                <span className="text-[10px] font-bold">✓</span>
              )}
            </span>

            {option}
          </button>
        );
      })}
    </div>
  );
}