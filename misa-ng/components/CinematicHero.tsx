"use client";

import Image from "next/image";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  type ChangeEvent,
  type FormEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { sendLead } from "@/lib/lead";
import link from "next/link";
/* -------------------------------------------------------------------------- */
/* Configuration                                                              */
/* -------------------------------------------------------------------------- */

const BRAND = "#FFB52A";
const NAVY = "#0A0F17";
const INK = "#080807";

const interests = [
  "Buy a property",
  "List a property",
  "Invest",
  "Onboard as a developer",
];

type Interest = (typeof interests)[number];

type Scene = {
  word: string;
  sky: string;
  heights: number[];
  lit: number;
  image?: string;
  imagePosition?: string;
};

type LeadData = {
  name: string;
  phone: string;
  email: string;
  interest: Interest;
  note: string;
};

const initialLead: LeadData = {
  name: "",
  phone: "",
  email: "",
  interest: interests[0],
  note: "",
};

const scenes: Scene[] = [
  {
    word: "Residential",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
    imagePosition: "center",
    sky: "linear-gradient(180deg,#050505 0%,#0A0F17 35%,#A85F08 78%,#FFB52A 100%)",
    heights: [90, 140, 110, 170, 100, 150],
    lit: 0.9,
  },
  {
    word: "Commercial",
    sky: "linear-gradient(180deg,#050505 0%,#0A0F17 55%,#252D3A 100%)",
    heights: [260, 380, 300, 430, 340, 400],
    lit: 0.9,
  },
  {
    word: "Land",
    sky: "linear-gradient(180deg,#0A0F17 0%,#8a5a10 60%,#F59A16 100%)",
    heights: [14, 22, 12, 26, 16, 20],
    lit: 0,
  },
  {
    word: "Developments",
    sky: "linear-gradient(180deg,#050505 0%,#0D121B 50%,#A85F08 100%)",
    heights: [200, 120, 300, 160, 360, 140],
    lit: 0.5,
  },
];

const ease = [0.2, 0.7, 0.2, 1] as const;

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const rise = {
  hidden: { y: "110%" },
  show: {
    y: 0,
    transition: {
      duration: 0.9,
      ease,
    },
  },
};

const fade = (delay: number) => ({
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.75,
    delay,
    ease,
  },
});

/* -------------------------------------------------------------------------- */
/* Illustrated skyline                                                        */
/* -------------------------------------------------------------------------- */

function Art({ scene, id }: { scene: Scene; id: string }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={id}
          width="12"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <rect
            x="3"
            y="4"
            width="5"
            height="7"
            fill={BRAND}
            opacity={scene.lit}
          />
        </pattern>

        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#050505" stopOpacity="0" />
          <stop offset="100%" stopColor="#050505" stopOpacity=".8" />
        </linearGradient>
      </defs>

      <circle cx="600" cy="560" r="300" fill={BRAND} opacity=".12" />

      {Array.from({ length: 24 }, (_, index) => {
        const height =
          scene.heights[index % scene.heights.length] *
          (0.7 + ((index * 37) % 10) / 16);

        const width = 46;
        const x = index * 50;

        return (
          <g key={index}>
            <rect
              x={x}
              y={800 - height}
              width={width}
              height={height}
              fill="#050505"
              opacity=".9"
            />

            <rect
              x={x}
              y={800 - height}
              width={width}
              height={height}
              fill={`url(#${id})`}
            />
          </g>
        );
      })}

      <rect
        width="1200"
        height="800"
        fill={`url(#${id}-fade)`}
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Reusable form field                                                        */
/* -------------------------------------------------------------------------- */

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
};

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  required = false,
}: FieldProps) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-2 block text-[10px] font-medium uppercase tracking-[0.16em] text-white/50"
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
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-required={required}
        className="min-h-12 w-full rounded-none border border-white/10 bg-white/[0.035] px-4 py-3 text-base text-white outline-none transition-colors duration-300 placeholder:text-white/25 hover:border-white/20 focus:border-[#FFB52A] focus:bg-white/[0.055] focus-visible:ring-1 focus-visible:ring-[#FFB52A]/40 sm:text-sm"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Success state                                                              */
/* -------------------------------------------------------------------------- */

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="py-5 sm:py-8"
      role="status"
      aria-live="polite"
    >
      <div className="flex h-12 w-12 items-center justify-center border border-emerald-400/30 bg-emerald-400/10 text-xl text-emerald-300">
        ✓
      </div>

      <p className="mt-7 text-[10px] uppercase tracking-[0.24em] text-[#FFB52A]">
        Enquiry received
      </p>

      <h2 className="mt-3 font-serif text-3xl font-light leading-tight">
        Your property brief
        <br />
        is with us.
      </h2>

      <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">
        Thank you for contacting MISA NG. Our team will review your
        requirements and follow up regarding your enquiry.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-8 text-[10px] uppercase tracking-[0.16em] text-[#FFB52A] underline-offset-4 transition hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A]"
      >
        Submit another enquiry
      </button>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main component                                                             */
/* -------------------------------------------------------------------------- */

export default function CinematicHero() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<LeadData>(initialLead);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [sceneIndex, setSceneIndex] = useState(0);
  const [categoryOffset, setCategoryOffset] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const categoryRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const formHeadingId = useId();

  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundScale = useTransform(
    scrollYProgress,
    [0, 0.4],
    [1, 1.1],
  );

  /* ------------------------------------------------------------------------ */
  /* Scene transitions                                                        */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setSceneIndex((current) => (current + 1) % scenes.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  /* ------------------------------------------------------------------------ */
  /* Measure category positions                                               */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const measure = () => {
      setCategoryOffset(categoryRefs.current[sceneIndex]?.offsetLeft ?? 0);
    };

    measure();

    let cancelled = false;

    document.fonts?.ready.then(() => {
      if (!cancelled) measure();
    });

    window.addEventListener("resize", measure);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", measure);
    };
  }, [sceneIndex]);

  /* ------------------------------------------------------------------------ */
  /* Form helpers                                                             */
  /* ------------------------------------------------------------------------ */

  const updateField = useCallback(
    (key: keyof LeadData) =>
      (
        event: ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
      ) => {
        setData((previous) => ({
          ...previous,
          [key]: event.target.value,
        }));

        if (message) setMessage("");
      },
    [message],
  );

  const goTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setMessage("");

    if (step === 1) {
      if (!data.name.trim()) {
        setMessage("Please enter your full name.");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
        setMessage("Please enter a valid email address.");
        return;
      }

      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(3);
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      await sendLead({
        ...data,
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        note: data.note.trim(),
        type: "Hero registration",
      });

      setStep(4);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "We couldn't send your enquiry. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setData(initialLead);
    setStep(1);
    setMessage("");
    setIsSubmitting(false);
  };

  const currentScene = scenes[sceneIndex];

  return (
    <MotionConfig reducedMotion="user">

      <section
        ref={sectionRef}
        id="top"
        className="relative isolate overflow-clip bg-[#080807] text-white selection:bg-[#FFB52A] selection:text-black"
      >
        {/* ================================================================== */}
        {/* CINEMATIC BACKGROUND                                               */}
        {/* ================================================================== */}

        <div className="pointer-events-none absolute inset-x-0 top-0 h-[100svh] min-h-[620px] overflow-hidden">
          <motion.div
            style={{ scale: prefersReducedMotion ? 1 : backgroundScale }}
            className="absolute inset-0"
          >
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={sceneIndex}
                className="absolute inset-0"
                style={{ background: currentScene.sky }}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        scale: 1.08,
                        filter: "blur(8px)",
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0.15 : 1.4,
                  ease,
                }}
              >
                {currentScene.image ? (
                  <Image
                    src={currentScene.image}
                    alt=""
                    fill
                    priority={sceneIndex === 0}
                    sizes="100vw"
                    className="object-cover"
                    style={{
                      objectPosition: currentScene.imagePosition ?? "center",
                    }}
                  />
                ) : (
                  <Art
                    scene={currentScene}
                    id={`misa-skyline-${sceneIndex}`}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Image contrast */}
          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#080807] via-[#080807]/75 to-[#080807]/20" />

          <div className="absolute inset-0 bg-gradient-to-b from-[#080807]/30 via-transparent to-[#080807]" />

          <div className="absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full bg-[#D69A3A]/10 blur-[140px] sm:h-[500px] sm:w-[500px]" />
        </div>

        {/* ================================================================== */}
        {/* PAGE CONTENT                                                       */}
        {/* ================================================================== */}

        <div className="relative mt-12 z-10">
          {/* -------------------------------------------------------------- */}
          {/* HEADER                                                         */}
          {/* -------------------------------------------------------------- */}

    
          {/* -------------------------------------------------------------- */}
          {/* HERO GRID                                                      */}
          {/* -------------------------------------------------------------- */}

          <div className="mx-auto grid w-full max-w-[1500px] content-center items-center gap-12 px-4 pb-14 pt-16 sm:gap-14 sm:px-6 sm:pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-10 lg:py-20">
            {/* LEFT: BRAND MESSAGE */}

            <div className="min-w-0 max-w-[850px]">
              <motion.div
                {...fade(0.15)}
                className="flex items-center gap-3 sm:gap-4"
              >
                <span className="h-px w-8 shrink-0 bg-[#FFB52A] sm:w-12" />

                <span className="text-[9px] uppercase tracking-[0.2em] text-[#FFB52A] sm:text-[10px] sm:tracking-[0.3em]">
                  Nigerian property advisory
                </span>
              </motion.div>

              <motion.h1
                variants={stagger}
                initial="hidden"
                animate="show"
                className="mt-7 p-2 gap-3  font-serif text-[clamp(2.15rem,8.5vw,5.5rem)] font-dark  uppercase leading-[1.02] tracking-[-0.045em] sm:mt-8 sm:text-[clamp(3rem,6vw,5.5rem)]"
              >
                <span className="block overflow-hidden">
                  <motion.span variants={rise} className="block text-[#FFB52A]">
                    Property
                  </motion.span>
                </span>

                <span className="block overflow-hidden">
                  <motion.span variants={rise} className="block text-white/50">
                    brokered
                  </motion.span>
                </span>

            <span className="block overflow-hidden">
              <motion.span variants={rise} className="block text-zinc-200"
>
             Across
              </motion.span>
            
            </span>

                <span className="mt-4 block overflow-hidden">
                  <motion.span variants={rise} className="block">
                    <span className="sr-only">
                      Nigeria: residential, commercial, land and developments.
                    </span>

                    <span
                      className="block overflow-hidden"
                      aria-hidden="true"
                    >
                      <motion.span
                        animate={{
                          x: -categoryOffset,
                        }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.8,
                          ease,
                        }}
                        className="flex w-max gap-3 whitespace-nowrap sm:gap-4"
                      >
                        {scenes.map((scene, index) => (
                          <span
                            key={scene.word}
                            ref={(element) => {
                              categoryRefs.current[index] = element;
                            }}
                            className={`border px-2 py-1 text-[0.88em] transition-colors duration-500 sm:px-3 ${
                              index === sceneIndex
                                ? "border-white/80 text-[#FFB25A]"
                                : "border-transparent text-white/25"
                            }`}
                          >
                            {scene.word}
                          </span>
                        ))}
                      </motion.span>
                    </span>
                  </motion.span>
                </span>
              </motion.h1>

              <motion.p
                {...fade(0.65)}
                className="mt-7 max-w-xl text-sm leading-7 text-white/65 sm:mt-9 sm:text-base sm:leading-8 md:text-lg"
              >
                A commission-led property agency connecting discerning buyers,
                investors and developers with opportunities across Nigeria.
              </motion.p>

              {/* Primary actions */}

              <motion.div
                {...fade(0.8)}
                className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap sm:mt-9"
              >
                <button
                  type="button"
                  onClick={() => goTo("properties")}
                  className="group inline-flex min-h-12 items-center justify-center gap-1 bg-[#FFB52A] px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-black transition duration-300 hover:bg-[#FFD078] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A] sm:px-6"
                >
                  Explore properties

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => goTo("developers")}
                  className="inline-flex min-h-12 items-center justify-center border border-white/20 bg-white/[0.04] px-5 py-4 text-[10px] uppercase tracking-[0.15em] text-white backdrop-blur-md transition duration-300 hover:border-white/50 hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A] sm:px-6"
                >
                  Partner with MISA
                </button>
              </motion.div>

              {/* Trust indicators */}

              <motion.div
                {...fade(1)}
                className="mt-10 grid max-w-2xl grid-cols-3 border-y border-white/10 py-5 sm:mt-14 sm:py-6 lg:mt-16"
              >
                {[
                  ["01", "Trusted agency"],
                  ["360°", "Property advisory"],
                  ["100%", "Deal focused"],
                ].map(([number, label], index) => (
                  <div
                    key={label}
                    className={
                      index === 0
                        ? "pr-2 sm:pr-5"
                        : index === 1
                          ? "border-l border-white/10 px-2 sm:px-5"
                          : "border-l border-white/10 pl-2 sm:pl-5"
                    }
                  >
                    <p className="font-serif text-xl font-light text-white sm:text-3xl">
                      {number}
                    </p>

                    <p className="mt-2 text-[8px] uppercase leading-relaxed tracking-[0.1em] text-white/45 sm:text-[9px] sm:tracking-[0.16em]">
                      {label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT: PRIVATE CLIENT ENQUIRY */}

            <motion.div
              {...fade(0.45)}
              className="flex min-w-0 justify-center lg:justify-end"
            >
              <div className="w-full max-w-[470px]">
                <div className="relative overflow-hidden border border-white/[0.12] bg-[#0B0B0A]/85 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8 lg:bg-[#0B0B0A]/75">
                  <div className="absolute left-0 top-0 h-px w-24 bg-[#FFB52A]" />

                  {step === 4 ? (
                    <SuccessState onReset={resetForm} />
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.24em] text-[#FFB52A] sm:text-[10px]">
                            Private client desk
                          </p>

                          <h2
                            id={formHeadingId}
                            className="mt-3 font-serif text-2xl font-light leading-tight sm:text-3xl"
                          >
                            Let us find your
                            <br />
                            next property.
                          </h2>

                          <p className="mt-3 max-w-xs text-xs leading-6 text-white/45">
                            Tell us what you are looking for. We will help you
                            explore your options.
                          </p>
                        </div>

                        <span
                          className="shrink-0 pt-1 font-mono text-[10px] text-white/35"
                          aria-label={`Step ${step} of 3`}
                        >
                          0{step} / 03
                        </span>
                      </div>

                      {/* Progress indicator */}

                      <div
                        className="mt-7 flex gap-1.5"
                        role="progressbar"
                        aria-label="Enquiry completion"
                        aria-valuemin={1}
                        aria-valuemax={3}
                        aria-valuenow={step}
                      >
                        {[1, 2, 3].map((number) => (
                          <div
                            key={number}
                            className={`h-[2px] flex-1 transition-colors duration-500 ${
                              number <= step
                                ? "bg-[#FFB52A]"
                                : "bg-white/10"
                            }`}
                          />
                        ))}
                      </div>

                      <form
                        className="mt-7"
                        onSubmit={handleSubmit}
                        aria-labelledby={formHeadingId}
                        noValidate
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={step}
                            initial={
                              prefersReducedMotion
                                ? { opacity: 0 }
                                : { opacity: 0, x: 18 }
                            }
                            animate={{ opacity: 1, x: 0 }}
                            exit={
                              prefersReducedMotion
                                ? { opacity: 0 }
                                : { opacity: 0, x: -18 }
                            }
                            transition={{
                              duration: prefersReducedMotion ? 0.12 : 0.25,
                              ease,
                            }}
                            className="grid gap-4"
                          >
                            {step === 1 && (
                              <>
                                <Field
                                  id="misa-name"
                                  label="Full name"
                                  value={data.name}
                                  onChange={updateField("name")}
                                  placeholder="Your full name"
                                  autoComplete="name"
                                  required
                                />

                                <Field
                                  id="misa-phone"
                                  label="Phone number"
                                  type="tel"
                                  value={data.phone}
                                  onChange={updateField("phone")}
                                  placeholder="+234 800 000 0000"
                                  autoComplete="tel"
                                />

                                <Field
                                  id="misa-email"
                                  label="Email address"
                                  type="email"
                                  value={data.email}
                                  onChange={updateField("email")}
                                  placeholder="you@example.com"
                                  autoComplete="email"
                                  required
                                />
                              </>
                            )}

                            {step === 2 && (
                              <div>
                                <label
                                  htmlFor="misa-interest"
                                  className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-white/50"
                                >
                                  I am looking to
                                </label>

                                <select
                                  id="misa-interest"
                                  name="interest"
                                  value={data.interest}
                                  onChange={updateField("interest")}
                                  className="min-h-12 w-full appearance-none rounded-none border border-white/10 bg-[#11110F] px-4 py-3 text-base text-white outline-none transition-colors focus:border-[#FFB52A] focus-visible:ring-1 focus-visible:ring-[#FFB52A]/40 sm:text-sm"
                                >
                                  {interests.map((interest) => (
                                    <option
                                      key={interest}
                                      value={interest}
                                      className="bg-[#11110F] text-white"
                                    >
                                      {interest}
                                    </option>
                                  ))}
                                </select>

                                <p className="mt-3 text-xs leading-6 text-white/40">
                                  This helps us direct your enquiry to the
                                  appropriate team.
                                </p>
                              </div>
                            )}

                            {step === 3 && (
                              <div>
                                <label
                                  htmlFor="misa-note"
                                  className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-white/50"
                                >
                                  Tell us about your brief
                                </label>

                                <textarea
                                  id="misa-note"
                                  name="note"
                                  rows={5}
                                  value={data.note}
                                  onChange={updateField("note")}
                                  placeholder="Preferred location, budget, property type or other requirements..."
                                  className="min-h-36 w-full resize-y rounded-none border border-white/10 bg-white/[0.035] px-4 py-3 text-base leading-7 text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#FFB52A] focus-visible:ring-1 focus-visible:ring-[#FFB52A]/40 sm:text-sm"
                                />

                                <p className="mt-3 text-xs leading-6 text-white/40">
                                  Share as much or as little detail as you
                                  prefer.
                                </p>
                              </div>
                            )}
                          </motion.div>
                        </AnimatePresence>

                        {/* Error and loading messages */}

                        {message && (
                          <p
                            role="alert"
                            aria-live="assertive"
                            className="mt-4 border-l-2 border-[#FFB52A] bg-[#FFB52A]/[0.06] px-3 py-2 text-xs leading-5 text-[#FFD078]"
                          >
                            {message}
                          </p>
                        )}

                        {/* Form navigation */}

                        <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
                          {step > 1 ? (
                            <button
                              type="button"
                              disabled={isSubmitting}
                              onClick={() => {
                                setMessage("");
                                setStep((current) => current - 1);
                              }}
                              className="min-h-11 px-1 text-[10px] uppercase tracking-[0.15em] text-white/50 transition hover:text-white disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A]"
                            >
                              ← Back
                            </button>
                          ) : (
                            <span className="text-[9px] uppercase tracking-[0.12em] text-[#ffb25a]"
                            >
                              Step {step} of 3
                            </span>
                          )}

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            aria-busy={isSubmitting}
                            className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#FFB52A] px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-black transition duration-300 hover:bg-[#FFD078] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A] sm:px-6"
                          >
                            {isSubmitting
                              ? "Sending..."
                              : step === 3
                                ? "Send my brief"
                                : "Continue"}

                            {!isSubmitting && (
                              <span aria-hidden="true">
                                {step === 3 ? "↗" : "→"}
                              </span>
                            )}
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>

                <p className="mt-4 text-center text-[9px] uppercase tracking-[0.12em] text-white/30 sm:tracking-[0.16em]">
                  Confidential enquiry · MISA NG LTD
                </p>
              </div>
            </motion.div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* SCROLL INDICATOR                                               */}
          {/* -------------------------------------------------------------- */}

          <button
            type="button"
            onClick={() => goTo("properties")}
            className="mx-auto mb-8 hidden items-center gap-4 text-[9px] uppercase tracking-[0.3em] text-white/35 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A] lg:flex"
          >
            <span>Discover</span>
            <span className="h-10 w-px bg-white/20" />
            <span aria-hidden="true">↓</span>
          </button>

          {/* -------------------------------------------------------------- */}
          {/* ABOUT MISA                                                     */}
          {/* -------------------------------------------------------------- */}

          <div className="relative bg-gradient-to-b from-[#080807] via-[#0A0F17] to-[#0A0F17] px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-10 lg:pb-28">
            <motion.div
              initial={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 24 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.8,
                ease,
              }}
              className="mx-auto max-w-[1500px]"
            >
              <div className="max-w-3xl">
                <h3 className="mb-5 font-serif max-w-[220px] flex items-center gap-2 text-[2rem] tracking[-0.02] font-dark text-white">
                  <span className="h-3 w-3 font-serif rounded-full bg-[#FFB52A]" />
                  MISA<span className="text-[#ffb52a]">NG</span>
                </h3>

                <p className="font-serif text-xl font-light leading-relaxed text-white/90 sm:text-2xl md:text-3xl">
                  We list verified properties, onboard developers and structure
                  investments across residential, commercial and land. As part
                  of Strategic Infrastructure and Resource Partners
                  (SIR-Partners), we operate on a commission basis, with
                  commissions payable upon completed transactions under agreed
                  terms.
                </p>

                <button
                  type="button"
                  onClick={() => goTo("invest")}
                  className="group mt-8 inline-flex items-center gap-4 text-xs text-white/60 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A]"
                >
                  Learn more
                  <span className="grid h-7 w-7 rotate-45 place-items-center bg-[#ffb25a] text-black transition duration-300 group-hover:scale-110">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 -rotate-45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}