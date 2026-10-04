"use client";

import { useEffect, useState } from "react";
import { sendLead } from "@/lib/lead";

type LeadStatus = "idle" | "busy" | "done";

type InputFieldProps = {
  id: string;
  name: string;
  label: string;
  inputType?: "text" | "email" | "tel";
  required?: boolean;
  placeholder?: string;
};

export default function LeadModal() {
  const [type, setType] = useState<string | null>(null);
  const [status, setStatus] = useState<LeadStatus>("idle");
  const [error, setError] = useState("");

  /*
   * Open modal when openLead() dispatches:
   *
   * window.dispatchEvent(
   *   new CustomEvent("misa:lead", { detail: "Registration" })
   * )
   */
  useEffect(() => {
    function handleOpen(event: Event) {
      const customEvent = event as CustomEvent<string>;

      setType(customEvent.detail);
      setStatus("idle");
      setError("");
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setType(null);
      }
    }

    window.addEventListener("misa:lead", handleOpen);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("misa:lead", handleOpen);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /*
   * Prevent the page behind the modal from scrolling.
   */
  useEffect(() => {
    if (!type) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [type]);

  if (!type) {
    return null;
  }

  function closeModal() {
    if (status === "busy") return;

    setType(null);
    setStatus("idle");
    setError("");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const selectedType = type;
    if (!selectedType) {
      setError("Please select an enquiry type.");
      return;
    }

    setStatus("busy");
    setError("");

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);

      const values: Record<string, string> = {};

      formData.forEach((value, key) => {
        values[key] = String(value);
      });

      await sendLead({
        ...values,
        type: selectedType,
      });

      setStatus("done");
    } catch (error) {
      setStatus("idle");

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Something went wrong. Please check your details and try again."
        );
      }
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#030507]/80 p-4 backdrop-blur-md sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closeModal();
        }
      }}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/[0.04] blur-[120px]"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        className="relative my-auto w-full max-w-xl overflow-hidden border border-white/[0.1] bg-[#0b0e13] shadow-[0_30px_100px_rgba(0,0,0,.55)] animate-rise"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Top gold line */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/70 to-transparent"
        />

        {/* Close button */}
        <button
          type="button"
          onClick={closeModal}
          disabled={status === "busy"}
          aria-label="Close enquiry form"
          className="group absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center border border-white/[0.08] text-white/35 transition duration-300 hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="text-xl font-light leading-none transition-transform duration-300 group-hover:rotate-90">
            ×
          </span>
        </button>

        <div className="p-6 sm:p-8 md:p-10">
          {status === "done" ? (
            <SuccessState
              enquiryType={type}
              onClose={closeModal}
            />
          ) : (
            <form onSubmit={handleSubmit}>
              {/* -------------------------------------------------- */}
              {/* HEADER */}
              {/* -------------------------------------------------- */}

              <div className="max-w-md pr-10">
                <p className="text-[9px] uppercase tracking-[0.28em] text-brand">
                  Private enquiry
                </p>

                <h2
                  id="lead-modal-title"
                  className="mt-3 font-serif text-[clamp(2rem,5vw,2.8rem)] leading-[0.95] tracking-[-0.03em] text-white"
                >
                  {type}
                </h2>

                <p className="mt-4 text-sm leading-6 text-white/40">
                  Tell us a little about what you&apos;re looking for and an
                  MISA advisor will get back to you.
                </p>
              </div>

              {/* -------------------------------------------------- */}
              {/* FORM FIELDS */}
              {/* -------------------------------------------------- */}

              <div className="mt-8 grid gap-5">
                <InputField
                  id="name"
                  name="name"
                  label="Full name"
                  required={true}
                  placeholder="Your full name"
                />

                <InputField
                  id="email"
                  name="email"
                  label="Email address"
                  inputType="email"
                  required={true}
                  placeholder="you@example.com"
                />

                <InputField
                  id="phone"
                  name="phone"
                  label="Phone / WhatsApp"
                  inputType="tel"
                  placeholder="+234..."
                />

                {/* Message */}
                <div>
                  <label
                    htmlFor="note"
                    className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-white/40"
                  >
                    Message
                  </label>

                  <textarea
                    id="note"
                    name="note"
                    rows={4}
                    placeholder="Tell us what you're interested in..."
                    className="w-full resize-none border border-white/[0.1] bg-white/[0.025] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 transition duration-300 focus:border-brand/60 focus:bg-white/[0.04] focus:ring-1 focus:ring-brand/20"
                  />
                </div>
              </div>

              {/* -------------------------------------------------- */}
              {/* ERROR */}
              {/* -------------------------------------------------- */}

              {error && (
                <div
                  role="alert"
                  className="mt-5 flex items-start gap-3 border border-red-400/15 bg-red-400/[0.04] px-4 py-3"
                >
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-400/10 text-[10px] text-red-400">
                    !
                  </span>

                  <p className="text-xs leading-5 text-red-300/80">
                    {error}
                  </p>
                </div>
              )}

              {/* -------------------------------------------------- */}
              {/* ACTIONS */}
              {/* -------------------------------------------------- */}

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={status === "busy"}
                  className="btn-line min-h-[50px] flex-1 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={status === "busy"}
                  className="group relative inline-flex min-h-[50px] flex-1 items-center justify-center gap-4 overflow-hidden bg-brand px-5 text-[9px] font-medium uppercase tracking-[0.2em] text-black transition duration-300 hover:bg-gold disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {/* Hover layer */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0"
                  />

                  <span className="relative z-10">
                    {status === "busy"
                      ? "Sending..."
                      : "Send request"}
                  </span>

                  {status === "busy" ? (
                    <span
                      aria-hidden="true"
                      className="relative z-10 h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black"
                    />
                  ) : (
                    <span className="relative z-10 text-sm transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  )}
                </button>
              </div>

              {/* Privacy */}
              <p className="mt-6 text-[8px] leading-5 tracking-[0.08em] text-white/20">
                Your information is treated confidentially and used only to
                respond to this enquiry.
              </p>
            </form>
          )}
        </div>

        {/* -------------------------------------------------------- */}
        {/* FOOTER */}
        {/* -------------------------------------------------------- */}

        <div className="border-t border-white/[0.07] px-6 py-4 sm:px-8 md:px-10">
          <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.2em] text-white/20">
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

/* ========================================================================== */
/* INPUT FIELD                                                                */
/* ========================================================================== */

function InputField({
  id,
  name,
  label,
  inputType = "text",
  required = false,
  placeholder,
}: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-white/40"
      >
        {label}

        {required === true && (
          <span
            className="ml-1 text-brand"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </label>

      <input
        id={id}
        name={name}
        type={inputType}
        required={required}
        placeholder={placeholder}
        className="min-h-[50px] w-full border border-white/[0.1] bg-white/[0.025] px-4 text-sm text-white outline-none placeholder:text-white/20 transition duration-300 focus:border-brand/60 focus:bg-white/[0.04] focus:ring-1 focus:ring-brand/20"
      />
    </div>
  );
}

/* ========================================================================== */
/* SUCCESS STATE                                                              */
/* ========================================================================== */

function SuccessState({
  enquiryType,
  onClose,
}: {
  enquiryType: string;
  onClose: () => void;
}) {
  return (
    <div className="py-6 sm:py-8">
      {/* Success icon */}
      <div className="flex h-14 w-14 items-center justify-center border border-brand/30 bg-brand/[0.07] text-brand">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path
            d="M5 12.5 9.2 17 19 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p className="mt-8 text-[9px] uppercase tracking-[0.28em] text-brand">
        Request received
      </p>

      <h2 className="mt-3 font-serif text-3xl leading-[0.95] tracking-[-0.03em] text-white sm:text-4xl">
        Thank you.
        <br />
        <span className="italic text-white/35">
          We&apos;ll take it from here.
        </span>
      </h2>

      <p className="mt-5 max-w-md text-sm leading-7 text-white/40">
        Your enquiry regarding{" "}
        <span className="text-white/70">{enquiryType}</span>{" "}
        has been received. An MISA advisor will contact you shortly.
      </p>

      <div className="mt-8 h-px bg-white/[0.08]" />

      <button
        type="button"
        onClick={onClose}
        className="mt-6 inline-flex min-h-[48px] items-center gap-3 border border-white/[0.12] px-5 text-[9px] uppercase tracking-[0.2em] text-white/60 transition duration-300 hover:border-brand hover:text-white"
      >
        Close
        <span>→</span>
      </button>
    </div>
  );
}