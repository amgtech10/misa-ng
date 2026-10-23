"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { sendLead } from "@/lib/lead";

type LeadStatus = "idle" | "busy" | "done";

type LeadData = {
  name: string;
  phone: string;
  email: string;
  interest: string;
  note: string;
};

const INITIAL_DATA: LeadData = {
  name: "",
  phone: "",
  email: "",
  interest: "",
  note: "",
};

const INTERESTS = [
  "Buy a property",
  "List a property",
  "Invest",
  "Onboard as a developer",
];

export default function LeadModal() {
  const [type, setType] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<LeadStatus>("idle");
  const [error, setError] = useState("");
  const [data, setData] = useState<LeadData>(INITIAL_DATA);

  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const isOpen = type !== null;
  const isBusy = status === "busy";

  /*
   * OPEN MODAL
   *
   * Compatible with the existing openLead() event:
   *
   * window.dispatchEvent(
   *   new CustomEvent("misa:lead", {
   *     detail: "Registration",
   *   })
   * );
   */
  useEffect(() => {
    function handleOpen(event: Event) {
      const customEvent = event as CustomEvent<string>;

      previousFocusRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

      setType(customEvent.detail || "Private enquiry");
      setStep(1);
      setStatus("idle");
      setError("");
      setData(INITIAL_DATA);
    }

    window.addEventListener("misa:lead", handleOpen);

    return () => {
      window.removeEventListener("misa:lead", handleOpen);
    };
  }, []);

  /*
   * LOCK BACKGROUND SCROLL
   */
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /*
   * KEYBOARD ACCESSIBILITY
   */
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isBusy) {
        closeModal();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isBusy]);

  /*
   * FOCUS THE MODAL WHEN IT OPENS
   */
  useEffect(() => {
    if (!isOpen) return;

    const timer = window.setTimeout(() => {
      dialogRef.current?.focus();
    }, 50);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  /*
   * CLOSE MODAL
   */
  const closeModal = useCallback(() => {
    if (status === "busy") return;

    setType(null);
    setStep(1);
    setStatus("idle");
    setError("");
    setData(INITIAL_DATA);

    window.setTimeout(() => {
      previousFocusRef.current?.focus();
    }, 0);
  }, [status]);

  /*
   * UPDATE FORM DATA
   */
  function updateField<K extends keyof LeadData>(
    field: K,
    value: LeadData[K],
  ) {
    setData((current) => ({
      ...current,
      [field]: value,
    }));

    if (error) setError("");
  }

  /*
   * VALIDATE CURRENT STEP
   */
  function validateStep(): boolean {
    setError("");

    if (step === 1) {
      const name = data.name.trim();
      const email = data.email.trim();

      if (!name) {
        setError("Please enter your full name.");
        return false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Please enter a valid email address.");
        return false;
      }

      return true;
    }

    if (step === 2) {
      if (!data.interest) {
        setError("Please select what you are interested in.");
        return false;
      }

      return true;
    }

    return true;
  }

  /*
   * CONTINUE TO NEXT STEP
   */
  function handleContinue() {
    if (!validateStep()) return;

    setStep((current) => Math.min(current + 1, 3));
  }

  /*
   * GO BACK
   */
  function handleBack() {
    setError("");
    setStep((current) => Math.max(current - 1, 1));
  }

  /*
   * SUBMIT ENQUIRY
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step < 3) {
      handleContinue();
      return;
    }

    if (!validateStep()) return;

    const selectedType = type;

    if (!selectedType) {
      setError("Your enquiry could not be identified. Please try again.");
      return;
    }

    setStatus("busy");
    setError("");

    try {
      await sendLead({
        name: data.name.trim(),
        phone: data.phone.trim(),
        email: data.email.trim(),
        interest: data.interest,
        note: data.note.trim(),
        type: selectedType,
      });

      setStatus("done");
    } catch (err) {
      setStatus("idle");

      setError(
        err instanceof Error
          ? err.message
          : "We couldn't submit your enquiry. Please try again.",
      );
    }
  }

  /*
   * DO NOT RENDER WHEN CLOSED
   */
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-x-hidden overflow-y-auto bg-[#030507]/85 p-3 backdrop-blur-md sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isBusy) {
          closeModal();
        }
      }}
    >
      {/* Ambient gold glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFB52A]/[0.06] blur-[120px]"
      />

      {/* Modal shell */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        aria-describedby="lead-modal-description"
        tabIndex={-1}
        className="animate-rise relative my-auto w-full max-w-[560px] overflow-hidden border border-white/[0.12] bg-[#080B10]/95 shadow-[0_30px_100px_rgba(0,0,0,0.65)] outline-none backdrop-blur-2xl"
      >
        {/* Gold top edge */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFB52A]/80 to-transparent"
        />

        {/* Close button */}
        <button
          type="button"
          onClick={closeModal}
          disabled={isBusy}
          aria-label="Close enquiry"
          className="group absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center border border-white/[0.12] text-white/45 transition duration-300 hover:border-[#FFB52A]/60 hover:text-[#FFB52A] disabled:cursor-not-allowed disabled:opacity-40 sm:right-6 sm:top-6"
        >
          <span
            aria-hidden="true"
            className="text-2xl font-light leading-none transition-transform duration-300 group-hover:rotate-90"
          >
            ×
          </span>
        </button>

        <div className="p-5 sm:p-8 md:p-10">
          {status === "done" ? (
            <SuccessState
              enquiryType={type}
              onClose={closeModal}
              onReset={() => {
                setData(INITIAL_DATA);
                setStep(1);
                setStatus("idle");
                setError("");
              }}
            />
          ) : (
            <>
              {/* Header */}
              <div className="pr-10">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-px w-7 bg-[#FFB52A]"
                  />

                  <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#FFB52A]">
                    MISA NG · Private client desk
                  </p>
                </div>

                <h2
                  id="lead-modal-title"
                  className="mt-5 font-serif text-[clamp(2rem,6vw,3.15rem)] leading-[0.98] tracking-[-0.045em] text-white"
                >
                  Get a private
                  <br />
                  <span className="italic text-white/40">
                    property shortlist.
                  </span>
                </h2>

                <p
                  id="lead-modal-description"
                  className="mt-4 max-w-sm text-[13px] leading-6 text-white/45"
                >
                  Tell us what you have in mind. Our team will help connect
                  you with the right property and investment opportunities.
                </p>
              </div>

              {/* Progress section */}
              <div className="mt-8 border-y border-white/[0.08] py-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-white/45">
                    Your enquiry
                  </p>

                  <p
                    className="text-[9px] tabular-nums tracking-[0.2em] text-[#FFB52A]"
                    aria-live="polite"
                  >
                    0{step} <span className="text-white/25">/ 03</span>
                  </p>
                </div>

                <div
                  className="mt-4 grid grid-cols-3 gap-2"
                  aria-label={`Step ${step} of 3`}
                >
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className={`h-[2px] transition-colors duration-500 ${
                        item <= step
                          ? "bg-[#FFB52A]"
                          : "bg-white/[0.12]"
                      }`}
                    />
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-white/65">
                    {step === 1
                      ? "Your details"
                      : step === 2
                        ? "Your interests"
                        : "Your property brief"}
                  </p>

                  <p className="text-[9px] uppercase tracking-[0.12em] text-white/25">
                    {step === 1
                      ? "Contact information"
                      : step === 2
                        ? "Choose an objective"
                        : "Additional details"}
                  </p>
                </div>
              </div>

              {/* Form */}
              <form
                className="mt-7"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* STEP 1: CONTACT DETAILS */}
                {step === 1 && (
                  <div className="animate-rise space-y-5">
                    <InputField
                      id="lead-name"
                      name="name"
                      label="Full name"
                      value={data.name}
                      placeholder="Your full name"
                      autoComplete="name"
                      required
                      onChange={(value) => updateField("name", value)}
                    />

                    <InputField
                      id="lead-phone"
                      name="phone"
                      label="Phone / WhatsApp"
                      inputType="tel"
                      value={data.phone}
                      placeholder="+234..."
                      autoComplete="tel"
                      onChange={(value) => updateField("phone", value)}
                    />

                    <InputField
                      id="lead-email"
                      name="email"
                      label="Email address"
                      inputType="email"
                      value={data.email}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      onChange={(value) => updateField("email", value)}
                    />
                  </div>
                )}

                {/* STEP 2: INTEREST */}
                {step === 2 && (
                  <div className="animate-rise">
                    <p className="mb-4 text-[10px] uppercase tracking-[0.18em] text-white/45">
                      What are you looking to do?
                    </p>

                    <div className="grid gap-3">
                      {INTERESTS.map((interest, index) => {
                        const selected = data.interest === interest;

                        return (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => updateField("interest", interest)}
                            aria-pressed={selected}
                            className={`group flex min-h-[60px] w-full items-center justify-between gap-4 border px-4 py-4 text-left transition duration-300 sm:px-5 ${
                              selected
                                ? "border-[#FFB52A]/65 bg-[#FFB52A]/[0.07]"
                                : "border-white/[0.1] bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]"
                            }`}
                          >
                            <span className="flex min-w-0 items-center gap-4">
                              <span
                                className={`text-[9px] tabular-nums ${
                                  selected
                                    ? "text-[#FFB52A]"
                                    : "text-white/25"
                                }`}
                              >
                                0{index + 1}
                              </span>

                              <span
                                className={`text-[11px] uppercase tracking-[0.12em] sm:text-xs ${
                                  selected
                                    ? "text-white"
                                    : "text-white/60"
                                }`}
                              >
                                {interest}
                              </span>
                            </span>

                            <span
                              aria-hidden="true"
                              className={`flex h-5 w-5 shrink-0 items-center justify-center border text-[11px] transition ${
                                selected
                                  ? "border-[#FFB52A] bg-[#FFB52A] text-[#080B10]"
                                  : "border-white/20 text-transparent"
                              }`}
                            >
                              ✓
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 3: PROPERTY BRIEF */}
                {step === 3 && (
                  <div className="animate-rise space-y-5">
                    <div className="border border-[#FFB52A]/20 bg-[#FFB52A]/[0.035] p-4">
                      <p className="text-[9px] uppercase tracking-[0.18em] text-[#FFB52A]">
                        Selected interest
                      </p>

                      <p className="mt-2 text-sm text-white/75">
                        {data.interest}
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="lead-note"
                        className="mb-2 block text-[9px] font-medium uppercase tracking-[0.2em] text-white/50"
                      >
                        Tell us about your requirements
                      </label>

                      <textarea
                        id="lead-note"
                        name="note"
                        rows={5}
                        value={data.note}
                        onChange={(event) =>
                          updateField("note", event.target.value)
                        }
                        placeholder="Preferred location, budget, property type, timeline, or anything else we should know..."
                        className="w-full resize-y border border-white/[0.12] bg-white/[0.025] px-4 py-4 text-sm leading-6 text-white outline-none transition duration-300 placeholder:text-white/25 focus:border-[#FFB52A]/60 focus:bg-white/[0.04] focus:ring-1 focus:ring-[#FFB52A]/20"
                      />

                      <p className="mt-2 text-[9px] leading-5 text-white/25">
                        Share as much or as little as you like.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div
                    role="alert"
                    className="mt-5 border border-red-400/20 bg-red-400/[0.05] px-4 py-3"
                  >
                    <p className="text-xs leading-5 text-red-300">
                      {error}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={isBusy}
                        className="inline-flex min-h-[48px] items-center justify-center gap-3 px-2 text-[9px] uppercase tracking-[0.2em] text-white/45 transition hover:text-white disabled:opacity-40"
                      >
                        <span aria-hidden="true">←</span>
                        Back
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isBusy}
                    className="group relative inline-flex min-h-[52px] w-full items-center justify-center gap-5 overflow-hidden bg-[#FFB52A] px-6 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#080B10] transition duration-300 hover:bg-[#FFD078] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB52A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080B10] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[205px]"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0"
                    />

                    <span className="relative z-10">
                      {isBusy
                        ? "Sending enquiry..."
                        : step === 3
                          ? "Send my brief"
                          : "Continue"}
                    </span>

                    {isBusy ? (
                      <span
                        aria-hidden="true"
                        className="relative z-10 h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="relative z-10 text-sm transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    )}
                  </button>
                </div>

                {/* Privacy note */}
                <p className="mt-6 max-w-sm text-[9px] leading-5 tracking-[0.04em] text-white/25">
                  Your details are treated confidentially and used only to
                  respond to your enquiry.
                </p>
              </form>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.08] px-5 py-4 sm:px-8 md:px-10">
          <div className="flex items-center justify-between gap-3 text-[8px] uppercase tracking-[0.18em] text-white/25">
            <span>MISA NG LTD</span>

            <span className="hidden sm:block">
              Property · Investment · Advisory
            </span>

            <span>Nigeria</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   INPUT FIELD
   ========================================================================== */

type InputFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  inputType?: "text" | "email" | "tel";
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
};

function InputField({
  id,
  name,
  label,
  value,
  inputType = "text",
  required = false,
  placeholder,
  autoComplete,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[9px] font-medium uppercase tracking-[0.2em] text-white/50"
      >
        {label}

        {required && (
          <span className="ml-1 text-[#FFB52A]" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <input
        id={id}
        name={name}
        type={inputType}
        value={value}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-[50px] w-full border border-white/[0.12] bg-white/[0.025] px-4 text-sm text-white outline-none transition duration-300 placeholder:text-white/25 focus:border-[#FFB52A]/60 focus:bg-white/[0.04] focus:ring-1 focus:ring-[#FFB52A]/20"
      />
    </div>
  );
}

/* ==========================================================================
   SUCCESS STATE
   ========================================================================== */

type SuccessStateProps = {
  enquiryType: string;
  onClose: () => void;
  onReset: () => void;
};

function SuccessState({
  enquiryType,
  onClose,
  onReset,
}: SuccessStateProps) {
  return (
    <div className="animate-rise py-5 sm:py-8">
      {/* Success icon */}
      <div className="flex h-14 w-14 items-center justify-center border border-[#FFB52A]/30 bg-[#FFB52A]/[0.07] text-[#FFB52A]">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path
            d="M5 12.5 9.2 17 19 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p className="mt-8 text-[9px] uppercase tracking-[0.28em] text-[#FFB52A]">
        Enquiry received
      </p>

      <h2
        id="lead-modal-title"
        className="mt-4 font-serif text-[clamp(2.2rem,7vw,3.5rem)] leading-[0.95] tracking-[-0.045em] text-white"
      >
        Your property
        <br />
        <span className="italic text-white/40">
          brief is with us.
        </span>
      </h2>

      <p className="mt-6 max-w-sm text-sm leading-7 text-white/45">
        Thank you for contacting MISA NG regarding{" "}
        <span className="text-white/80">{enquiryType}</span>. Our team will
        review your requirements and contact you about the next steps.
      </p>

      <div className="mt-8 border-y border-white/[0.08] py-5">
        <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">
          What happens next
        </p>

        <p className="mt-3 text-xs leading-6 text-white/55">
          An MISA advisor will review your enquiry and follow up using the
          contact details you provided.
        </p>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-[50px] flex-1 items-center justify-center bg-[#FFB52A] px-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#111] transition-colors hover:bg-white"
        >
          Close
        </button>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-[50px] flex-1 items-center justify-center border border-white/[0.12] px-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/70 transition-colors hover:border-white/30 hover:text-white"
        >
          Send another enquiry
        </button>
      </div>
    </div>
  );
}