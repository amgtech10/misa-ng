“use client”;

import { useId, useState } from “react”;
import type { ChangeEvent, FormEvent } from “react”;

export type Field = {
n: string;
l: string;
t?: string;
o?: string[];
r?: boolean;
h?: boolean;
p?: string;
};

type LeadFormProps = {
type: string;
title: string;
steps: Field[][];
cta?: string;
extra?: Record<string, string>;
};

type FormData = Record<string, string>;

type SubmitState = “idle” | “busy” | “done” | “err”;

export default function LeadForm({
type,
title,
steps,
cta = “Submit”,
extra = {},
}: LeadFormProps) {
const formId = useId();

const [step, setStep] = useState(0);
const [data, setData] = useState({});
const [status, setStatus] = useState(“idle”);
const [message, setMessage] = useState(””);

if (!steps.length) {
return null;
}

const safeStep = Math.min(step, steps.length - 1);
const currentFields = steps[safeStep] ?? [];
const lastStep = safeStep === steps.length - 1;
const isBusy = status === “busy”;

const progress = ((safeStep + 1) / steps.length) * 100;

const updateField =
(name: string) =>
(
e: ChangeEvent<
HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>
) => {
const value = e.target.value;

  setData((current) => ({
    ...current,
    [name]: value,
  }));
  setStatus((current) => (current === "err" ? "idle" : current));
  setMessage((current) => (status === "err" ? "" : current));
};

function validateCurrentStep(): boolean {
for (const field of currentFields) {
if (field.r && !data[field.n]?.trim()) {
return false;
}
}

return true;

}

function handleNext() {
if (isBusy) return;

if (!validateCurrentStep()) {
  setStatus("err");
  setMessage(
    "Please complete the required fields before continuing."
  );
  return;
}
setStatus("idle");
setMessage("");
setStep((current) => Math.min(current + 1, steps.length - 1));

}

function handleBack() {
if (isBusy) return;

setStatus("idle");
setMessage("");
setStep((current) => Math.max(0, current - 1));

}

async function handleSubmit(e: FormEvent) {
e.preventDefault();

if (isBusy) return;
if (!validateCurrentStep()) {
  setStatus("err");
  setMessage(
    "Please complete the required fields before submitting."
  );
  return;
}
setStatus("busy");
setMessage("");
try {
  const response = await fetch("/api/lead", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type,
      ...extra,
      ...data,
    }),
  });
  const result: unknown = await response
    .json()
    .catch(() => null);
  if (!response.ok) {
    const apiMessage =
      result &&
      typeof result === "object" &&
      "error" in result &&
      typeof result.error === "string"
        ? result.error
        : "We couldn't submit your enquiry. Please try again.";
    throw new Error(apiMessage);
  }
  setStatus("done");
  setMessage("");
} catch (error) {
  setStatus("err");
  setMessage(
    error instanceof Error
      ? error.message
      : "Something went wrong. Please try again."
  );
}

}

if (status === “done”) {
return (
    <div className="relative">
      <div className="flex h-12 w-12 items-center justify-center border border-brand/30 bg-brand/[0.08] text-brand">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden="true"
        >
          <path
            d="M5 12.5 9.2 17 19 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="mt-7 text-[9px] uppercase tracking-[0.28em] text-brand">
        Enquiry received
      </p>
      <h3 className="mt-3 max-w-md font-serif text-3xl leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl">
        Thank you.
        <br />
        <span className="italic text-white/40">
          We&apos;ll be in touch.
        </span>
      </h3>
      <p className="mt-5 max-w-lg text-sm leading-7 text-white/45">
        Your enquiry has been received by MISA NG. A member of our
        advisory team will review your request and contact you
        shortly.
      </p>
      <div className="mt-8 h-px w-full bg-white/[0.08]" />
      <p className="mt-5 text-[9px] uppercase tracking-[0.2em] text-white/25">
        MISA NG LTD · Property · Investment · Advisory
      </p>
    </div>
  </div>
);

}

return (
<form
onSubmit={
lastStep
? handleSubmit
: (e) => e.preventDefault()
}
className=“relative overflow-hidden border border-white/[0.08] bg-[#0c0f14]/95 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8”
>
  <div className="relative">
    {/* Header */}
    <div className="flex items-start justify-between gap-6">
      <div>
        <p className="text-[9px] uppercase tracking-[0.28em] text-brand">
          Private enquiry
        </p>
        <h2 className="mt-2 font-serif text-2xl tracking-[-0.02em] text-white sm:text-3xl">
          {title}
        </h2>
      </div>
      {steps.length > 1 && (
        <div className="shrink-0 text-right">
          <span className="font-mono text-[10px] tracking-[0.15em] text-white/30">
            {String(safeStep + 1).padStart(2, "0")}{" "}
            <span className="text-white/15">/</span>{" "}
            {String(steps.length).padStart(2, "0")}
          </span>
          <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-white/20">
            Step
          </p>
        </div>
      )}
    </div>
    {/* Progress */}
    {steps.length > 1 && (
      <div className="mt-7">
        <div className="h-px w-full bg-white/[0.08]">
          <div
            className="h-px bg-brand transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[8px] uppercase tracking-[0.16em] text-white/20">
          <span>Enquiry</span>
          <span>
            {lastStep ? "Review & submit" : "Your details"}
          </span>
        </div>
      </div>
    )}
    {/* Fields */}
    <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5">
      {currentFields.map((field) => {
        const id = `${formId}-lead-${field.n}`;
        const value = data[field.n] ?? "";
        return (
          <div
            key={field.n}
            className={
              field.h
                ? "col-span-2 sm:col-span-1"
                : "col-span-2"
            }
          >
            <label htmlFor={id}>
              <span className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-white/40">
                {field.l}
                {field.r && (
                  <span
                    className="ml-1 text-brand"
                    aria-hidden="true"
                  >
                    *
                  </span>
                )}
              </span>
            </label>
            {/* Select */}
            {field.o ? (
              <div className="relative">
                <select
                  id={id}
                  name={field.n}
                  required={field.r}
                  value={value}
                  onChange={updateField(field.n)}
                  disabled={isBusy}
                  className="min-h-[50px] w-full appearance-none border border-white/[0.1] bg-white/[0.025] px-4 pr-10 text-sm text-white outline-none transition duration-300 focus:border-brand/60 focus:bg-white/[0.04] focus:ring-1 focus:ring-brand/20 disabled:opacity-50"
                >
                  <option value="" className="bg-[#0c0f14]">
                    {field.p || "Select an option"}
                  </option>
                  {field.o.map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="bg-[#0c0f14]"
                    >
                      {option}
                    </option>
                  ))}
                </select>
                <svg
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path
                    d="m7 10 5 5 5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ) : field.t === "area" ? (
              /* Textarea */
              <textarea
                id={id}
                name={field.n}
                required={field.r}
                rows={4}
                value={value}
                onChange={updateField(field.n)}
                placeholder={field.p}
                disabled={isBusy}
                className="min-h-[110px] w-full resize-none border border-white/[0.1] bg-white/[0.025] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 transition duration-300 focus:border-brand/60 focus:bg-white/[0.04] focus:ring-1 focus:ring-brand/20 disabled:opacity-50"
              />
            ) : (
              /* Input */
              <input
                id={id}
                name={field.n}
                type={field.t || "text"}
                required={field.r}
                value={value}
                onChange={updateField(field.n)}
                placeholder={field.p}
                disabled={isBusy}
                className="min-h-[50px] w-full border border-white/[0.1] bg-white/[0.025] px-4 text-sm text-white outline-none placeholder:text-white/20 transition duration-300 focus:border-brand/60 focus:bg-white/[0.04] focus:ring-1 focus:ring-brand/20 disabled:opacity-50"
              />
            )}
          </div>
        );
      })}
    </div>
    {/* Error */}
    {status === "err" && (
      <div
        className="mt-5 flex items-start gap-3 border border-red-400/15 bg-red-400/[0.04] px-4 py-3"
        role="alert"
      >
        <span className="mt-0.5 text-red-400" aria-hidden="true">
          !
        </span>
        <p className="text-xs leading-5 text-red-300/80">
          {message}
        </p>
      </div>
    )}
    {/* Actions */}
    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        {safeStep > 0 && (
          <button
            type="button"
            onClick={handleBack}
            disabled={isBusy}
            className="group inline-flex min-h-[48px] items-center gap-3 px-1 text-[9px] uppercase tracking-[0.2em] text-white/35 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back
          </button>
        )}
      </div>
      <button
        type={lastStep ? "submit" : "button"}
        onClick={!lastStep ? handleNext : undefined}
        disabled={isBusy}
        className="group relative inline-flex min-h-[50px] items-center justify-between gap-8 overflow-hidden bg-brand px-5 text-[9px] font-medium uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-gold disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0"
        />
        <span className="relative z-10">
          {isBusy
            ? "Sending…"
            : lastStep
              ? cta
              : "Continue"}
        </span>
        <span className="relative z-10 text-sm transition-transform duration-300 group-hover:translate-x-1">
          {isBusy ? (
            <span
              className="block h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black"
              aria-hidden="true"
            />
          ) : (
            "→"
          )}
        </span>
      </button>
    </div>
    {/* Footer */}
    <p className="mt-6 text-[8px] leading-5 tracking-[0.08em] text-white/20">
      Your information is treated confidentially and used only
      to respond to this enquiry.
    </p>
  </div>
</form>

);
}
