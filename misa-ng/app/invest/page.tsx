"use client";

import Link from "next/link";
import {
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";
import { sendLead } from "@/lib/lead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const COLORS = {
  background: "#050505",
  navy: "#0A0F17",
  panel: "#0D121B",
  border: "#252D3A",
  orange: "#F59A16",
  gold: "#FFB52A",
  deepOrange: "#A85F08",
  white: "#F5F5F5",
  gray: "#A7AFBF",
  muted: "#737B89",
  success: "#32D583",
} as const;

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

const inputClass =
  "min-h-[52px] w-full border border-[#252D3A] bg-[#050505] px-4 py-3 text-sm text-[#F5F5F5] outline-none placeholder:text-[#737B89] transition-colors duration-200 focus-visible:border-[#FFB52A] focus-visible:ring-1 focus-visible:ring-[#FFB52A] motion-reduce:transition-none";

const selectClass =
  "min-h-[52px] w-full cursor-pointer border border-[#252D3A] bg-[#050505] px-4 py-3 text-sm text-[#F5F5F5] outline-none transition-colors duration-200 focus-visible:border-[#FFB52A] focus-visible:ring-1 focus-visible:ring-[#FFB52A] motion-reduce:transition-none";

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
    <main
      className="relative min-h-screen overflow-clip bg-[#050505] text-[#F5F5F5] selection:bg-[#FFB52A] selection:text-[#050505]"
      style={
        {
          "--invest-gold": COLORS.gold,
          "--invest-border": COLORS.border,
        } as CSSProperties
      }
    >
      <Navbar />

      {/* BACKGROUND ATMOSPHERE */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -right-40 -top-40 h-[340px] w-[340px] rounded-full bg-[#FFB52A]/[0.045] blur-[120px] sm:h-[500px] sm:w-[500px]" />

        <div className="absolute -bottom-48 -left-40 h-[350px] w-[350px] rounded-full bg-[#0A0F17] blur-[120px] sm:h-[500px] sm:w-[500px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,245,245,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(245,245,245,0.018)_1px,transparent_1px)] bg-[size:64px_64px] opacity-25 sm:bg-[size:72px_72px]" />
      </div>

      {/* PAGE INTRODUCTION */}

      <section
        aria-labelledby="investment-heading"
        className="relative z-10 mx-auto max-w-[1200px] px-5 pb-10 pt-14 sm:px-8 sm:pb-14 sm:pt-20 lg:px-12"
      >
        <div className="mx-auto max-w-[850px]">
          <div className="mb-6 flex items-center gap-3 sm:mb-8">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#FFB52A] sm:w-10"
            />

            <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-[#FFB52A] sm:text-[10px] sm:tracking-[0.28em]">
              Private client registration
            </p>
          </div>

          <h1
            id="investment-heading"
            className="max-w-4xl font-serif text-[clamp(2.65rem,7.5vw,6rem)] leading-[1.02] tracking-[-0.05em]"
          >
            <span className="block text-[#F5F5F5]/45">
              A considered investment.
            </span>

            <span className="mt-2 block text-[#FFB52A]">
              A clearer
              <br className="hidden sm:block" /> next step.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-[13px] leading-7 text-[#A7AFBF] sm:mt-8 sm:text-base sm:leading-8">
            Tell us what you are looking for. We will use your brief to
            understand your priorities and help identify relevant property
            opportunities across our selected markets.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#252D3A] pt-5 sm:mt-10 sm:gap-x-8 sm:pt-6">
            <TrustPoint>Private enquiry</TrustPoint>
            <TrustPoint>Personalised assistance</TrustPoint>
            <TrustPoint>Four African markets</TrustPoint>
          </div>
        </div>
      </section>

      {/* REGISTRATION FORM */}

      <section
        aria-label="Investment registration form"
        className="relative z-10 mx-auto max-w-[1200px] px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12"
      >
        <div className="mx-auto max-w-[850px]">
          {status === "success" ? (
            <div
              role="status"
              aria-live="polite"
              className="border border-[#252D3A] bg-[#0D121B] p-6 sm:p-10 md:p-12"
            >
              <div className="flex h-14 w-14 items-center justify-center border border-[#32D583]/30 bg-[#32D583]/[0.08] text-2xl text-[#32D583]">
                ✓
              </div>

              <p className="mt-8 text-[9px] font-medium uppercase tracking-[0.25em] text-[#32D583]">
                Registration received
              </p>

              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight sm:text-5xl">
                Thank you, {form.firstName}.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-[#A7AFBF]">
                Your investment brief has been submitted. Our team can
                review your preferences and follow up using the contact
                information you provided.
              </p>

              <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
                <Link
                  href="/"
                  className="inline-flex min-h-[50px] items-center justify-center gap-3 bg-[#FFB52A] px-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#050505] transition-colors hover:bg-[#F59A16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A] motion-reduce:transition-none"
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
                  className="inline-flex min-h-[50px] items-center justify-center border border-[#252D3A] px-6 text-[10px] font-medium uppercase tracking-[0.14em] text-[#A7AFBF] transition-colors hover:border-[#FFB52A] hover:text-[#FFB52A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A] motion-reduce:transition-none"
                >
                  Submit another brief
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              aria-busy={status === "submitting"}
              className="border border-[#252D3A] bg-[#0A0F17]/95 shadow-[0_30px_100px_rgba(0,0,0,0.25)]"
            >
              {/* FORM HEADER */}

              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#252D3A] px-5 py-5 sm:px-8 sm:py-6">
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#FFB52A]">
                    Investment desk
                  </p>

                  <p className="mt-2 text-xs leading-5 text-[#A7AFBF]">
                    Complete your private investment brief.
                  </p>
                </div>

                <span className="border border-[#252D3A] px-3 py-2 text-[8px] uppercase tracking-[0.14em] text-[#A7AFBF]">
                  Private enquiry
                </span>
              </div>

              <div className="space-y-10 px-5 py-8 sm:space-y-12 sm:px-8 sm:py-10 md:px-9">
                {/* 01 — INVESTOR PROFILE */}

                <FormSection
                  number="01"
                  title="Who is investing?"
                  description="Tell us how you intend to invest."
                >
                  <fieldset>
                    <legend className="sr-only">Investor type</legend>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <ChoiceCard
                        selected={form.investorType === "individual"}
                        title="Individual"
                        description="Investing in a personal capacity"
                        onClick={() =>
                          updateField("investorType", "individual")
                        }
                      />

                      <ChoiceCard
                        selected={form.investorType === "business"}
                        title="Business / Institution"
                        description="Investing on behalf of an organisation"
                        onClick={() =>
                          updateField("investorType", "business")
                        }
                      />
                    </div>
                  </fieldset>
                </FormSection>

                {/* 02 — CONTACT DETAILS */}

                <FormSection
                  number="02"
                  title="Your details"
                  description="How should our team reach you?"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id="firstName"
                      label="First name"
                      required
                    >
                      <input
                        id="firstName"
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

                    <Field
                      id="lastName"
                      label="Last name"
                      required
                    >
                      <input
                        id="lastName"
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

                    <Field
                      id="email"
                      label="Email address"
                      required
                    >
                      <input
                        id="email"
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

                    <Field
                      id="phone"
                      label="Phone number"
                      required
                    >
                      <div className="flex min-h-[52px] items-stretch border border-[#252D3A] bg-[#050505] transition-colors focus-within:border-[#FFB52A] motion-reduce:transition-none">
                        <label
                          htmlFor="phoneCountry"
                          className="sr-only"
                        >
                          Country calling code
                        </label>

                        <select
                          id="phoneCountry"
                          name="phoneCountry"
                          value={form.phoneCountry}
                          onChange={(event) =>
                            updateField("phoneCountry", event.target.value)
                          }
                          className="max-w-[125px] shrink-0 cursor-pointer border-r border-[#252D3A] bg-[#0D121B] px-2 text-xs text-[#F5F5F5] outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#FFB52A] sm:max-w-[135px] sm:px-3"
                        >
                          {COUNTRIES.map((country) => (
                            <option key={country.iso} value={country.iso}>
                              {country.flag} {country.code}
                            </option>
                          ))}
                        </select>

                        <input
                          id="phone"
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
                          className="min-w-0 flex-1 bg-transparent px-3 text-sm text-[#F5F5F5] outline-none placeholder:text-[#737B89] focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#FFB52A] sm:px-4"
                        />
                      </div>
                    </Field>
                  </div>
                </FormSection>

                {/* 03 — INVESTMENT BRIEF */}

                <FormSection
                  number="03"
                  title="Your investment brief"
                  description="Help us understand the opportunity you have in mind."
                >
                  <div className="space-y-7">
                    <Field
                      id="preferredLocation"
                      label="Preferred investment country"
                      required
                    >
                      <select
                        id="preferredLocation"
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

                    <Field
                      id="budget"
                      label="Investment budget"
                      required
                    >
                      <ChoiceGroup
                        name="budget"
                        options={BUDGETS}
                        value={form.budget}
                        onChange={(value) => updateField("budget", value)}
                      />
                    </Field>

                    <Field
                      id="timeline"
                      label="When do you intend to invest?"
                      required
                    >
                      <ChoiceGroup
                        name="timeline"
                        options={TIMELINES}
                        value={form.timeline}
                        onChange={(value) => updateField("timeline", value)}
                      />
                    </Field>

                    <Field
                      id="propertyTypes"
                      label="What type of property interests you?"
                      required
                    >
                      <ChoiceGroup
                        name="propertyTypes"
                        options={PROPERTY_TYPES}
                        value={form.propertyTypes}
                        multiple
                        onChange={(value) =>
                          toggleArrayValue("propertyTypes", value)
                        }
                      />

                      <p className="mt-2 text-[10px] leading-5 text-[#737B89]">
                        Select all that apply.
                      </p>
                    </Field>

                    <Field
                      id="purpose"
                      label="Primary investment objective"
                      required
                    >
                      <ChoiceGroup
                        name="purpose"
                        options={INVESTMENT_PURPOSES}
                        value={form.purpose}
                        onChange={(value) => updateField("purpose", value)}
                      />
                    </Field>

                    <Field
                      id="viewingPreference"
                      label="Viewing preference"
                    >
                      <ChoiceGroup
                        name="viewingPreference"
                        options={["Arrange a viewing", "Just exploring"]}
                        value={form.viewingPreference}
                        onChange={(value) =>
                          updateField("viewingPreference", value)
                        }
                      />
                    </Field>
                  </div>
                </FormSection>

                {/* 04 — ADDITIONAL PREFERENCES */}

                <FormSection
                  number="04"
                  title="Additional preferences"
                  description="Optional details that help us personalise your experience."
                >
                  <div className="space-y-7">
                    <fieldset>
                      <legend className="mb-3 text-[10px] font-medium uppercase tracking-[0.14em] text-[#A7AFBF]">
                        Services you may need
                      </legend>

                      <div className="grid gap-2 sm:grid-cols-2">
                        {OPTIONAL_SERVICES.map((service, index) => {
                          const checked = form.services.includes(service);
                          const id = `service-${index}`;

                          return (
                            <label
                              key={service}
                              htmlFor={id}
                              className={`flex min-h-[49px] cursor-pointer items-start gap-3 border p-3.5 transition-colors duration-200 motion-reduce:transition-none ${
                                checked
                                  ? "border-[#FFB52A]/50 bg-[#FFB52A]/[0.06]"
                                  : "border-[#252D3A] bg-[#050505] hover:border-[#737B89]"
                              }`}
                            >
                              <input
                                id={id}
                                type="checkbox"
                                checked={checked}
                                onChange={() =>
                                  toggleArrayValue("services", service)
                                }
                                className="mt-0.5 h-4 w-4 shrink-0 accent-[#FFB52A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB52A]"
                              />

                              <span className="text-xs leading-5 text-[#A7AFBF]">
                                {service}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>

                    <Field id="note" label="Tell us more (optional)">
                      <textarea
                        id="note"
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

                      <p
                        aria-live="polite"
                        className="mt-2 text-right text-[10px] text-[#737B89]"
                      >
                        {form.note.length}/3000
                      </p>
                    </Field>

                    <Field
                      id="contactTime"
                      label="Preferred contact time"
                    >
                      <select
                        id="contactTime"
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

                    <label
                      htmlFor="privatePortal"
                      className="flex cursor-pointer items-start gap-3 border border-[#252D3A] bg-[#050505] p-4 transition-colors hover:border-[#737B89] motion-reduce:transition-none"
                    >
                      <input
                        id="privatePortal"
                        name="privatePortal"
                        type="checkbox"
                        checked={form.privatePortal}
                        onChange={(event) =>
                          updateField("privatePortal", event.target.checked)
                        }
                        className="mt-1 h-4 w-4 shrink-0 accent-[#FFB52A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB52A]"
                      />

                      <span>
                        <span className="block text-xs text-[#F5F5F5]">
                          I am interested in a private client portal.
                        </span>

                        <span className="mt-1 block text-[11px] leading-5 text-[#737B89]">
                          Receive information about a more personalised way
                          to review relevant property opportunities.
                        </span>
                      </span>
                    </label>
                  </div>
                </FormSection>

                {/* ERROR FEEDBACK */}

                {status === "error" && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="border border-[#F59A16]/40 bg-[#F59A16]/[0.06] p-4 text-sm leading-6 text-[#F5F5F5]"
                  >
                    {errorMessage}
                  </div>
                )}

                {/* SUBMISSION */}

                <div className="border-t border-[#252D3A] pt-7">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group flex min-h-[56px] w-full items-center justify-between gap-4 bg-[#FFB52A] px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-[#050505] transition-colors duration-200 hover:bg-[#F59A16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A] disabled:cursor-wait disabled:opacity-60 motion-reduce:transition-none sm:px-7 sm:tracking-[0.16em]"
                  >
                    <span>
                      {status === "submitting"
                        ? "Submitting your brief..."
                        : "Submit investment registration"}
                    </span>

                    <span
                      aria-hidden="true"
                      className="shrink-0 text-base transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                    >
                      {status === "submitting" ? "…" : "→"}
                    </span>
                  </button>

                  <p className="mt-4 text-center text-[10px] leading-5 text-[#737B89]">
                    By submitting this form, you agree that MISA NG may use
                    the details provided to respond to your enquiry.
                    Submission does not constitute an investment commitment
                    or guarantee of property availability.
                  </p>

                  <p
                    role="status"
                    aria-live="polite"
                    className="sr-only"
                  >
                    {status === "submitting"
                      ? "Submitting your investment registration."
                      : ""}
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}

      <footer className="relative z-10 border-t border-[#252D3A]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p className="text-[9px] uppercase tracking-[0.15em] text-[#737B89]">
            © {new Date().getFullYear()} MISA NG LTD
          </p>

          <p className="text-[9px] uppercase tracking-[0.15em] text-[#737B89]">
            Property · Investment · Advisory
          </p>

          <Link
            href="/"
            className="inline-flex min-h-8 items-center self-start text-[9px] uppercase tracking-[0.15em] text-[#A7AFBF] transition-colors hover:text-[#FFB52A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A] motion-reduce:transition-none sm:self-auto"
          >
            Return to MISA NG →
          </Link>
        </div>
      </footer>
      <Footer />
    </main>
  );
}

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

function TrustPoint({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.1em] text-[#A7AFBF] sm:tracking-[0.12em]">
      <span
        aria-hidden="true"
        className="h-1 w-1 shrink-0 rounded-full bg-[#FFB52A]"
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
    <section aria-labelledby={`form-section-${number}`}>
      <div className="mb-6 flex items-start gap-4">
        <span
          aria-hidden="true"
          className="pt-1 font-mono text-[10px] tracking-wider text-[#FFB52A]"
        >
          {number}
        </span>

        <div className="min-w-0">
          <h2
            id={`form-section-${number}`}
            className="font-serif text-2xl leading-tight tracking-[-0.025em] text-[#F5F5F5] sm:text-3xl"
          >
            {title}
          </h2>

          <p className="mt-2 text-xs leading-6 text-[#A7AFBF]">
            {description}
          </p>
        </div>
      </div>

      <div className="min-w-0 sm:pl-9">{children}</div>
    </section>
  );
}

function Field({
  id,
  label,
  required = false,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-2.5 block text-[9px] font-medium uppercase tracking-[0.14em] text-[#A7AFBF] sm:text-[10px] sm:tracking-[0.16em]"
      >
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
      className={`flex min-h-[100px] items-start gap-3 border p-4 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB52A] motion-reduce:transition-none sm:gap-4 ${
        selected
          ? "border-[#FFB52A]/60 bg-[#FFB52A]/[0.06]"
          : "border-[#252D3A] bg-[#050505] hover:border-[#737B89]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
          selected ? "border-[#FFB52A]" : "border-[#737B89]"
        }`}
      >
        {selected && (
          <span className="h-2 w-2 rounded-full bg-[#FFB52A]" />
        )}
      </span>

      <span className="min-w-0">
        <span className="block text-sm leading-5 text-[#F5F5F5]">
          {title}
        </span>

        <span className="mt-2 block text-[11px] leading-5 text-[#A7AFBF]">
          {description}
        </span>
      </span>
    </button>
  );
}

function ChoiceGroup({
  name,
  options,
  value,
  onChange,
  multiple = false,
}: {
  name: string;
  options: string[];
  value: string | string[];
  onChange: (value: string) => void;
  multiple?: boolean;
}) {
  const isArray = Array.isArray(value);

  return (
    <div
      role={multiple ? "group" : "radiogroup"}
      aria-label={name}
      className="grid grid-cols-1 gap-2 sm:grid-cols-2"
    >
      {options.map((option, index) => {
        const selected = isArray
          ? value.includes(option)
          : value === option;

        return (
          <button
            key={option}
            type="button"
            name={name}
            role={multiple ? undefined : "radio"}
            aria-checked={multiple ? undefined : selected}
            aria-pressed={multiple ? selected : undefined}
            onClick={() => onChange(option)}
            className={`flex min-h-[48px] min-w-0 items-center gap-3 border px-3.5 py-3 text-left text-xs leading-5 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB52A] motion-reduce:transition-none ${
              selected
                ? "border-[#FFB52A]/60 bg-[#FFB52A]/[0.06] text-[#F5F5F5]"
                : "border-[#252D3A] bg-[#050505] text-[#A7AFBF] hover:border-[#737B89] hover:text-[#F5F5F5]"
            }`}
          >
            <span
              aria-hidden="true"
              className={`flex h-4 w-4 shrink-0 items-center justify-center border ${
                selected
                  ? "border-[#FFB52A] bg-[#FFB52A] text-[#050505]"
                  : "border-[#737B89]"
              }`}
            >
              {selected && (
                <span className="text-[10px] font-bold">✓</span>
              )}
            </span>

            <span className="min-w-0">{option}</span>
          </button>
        );
      })}

    </div>
  );
}