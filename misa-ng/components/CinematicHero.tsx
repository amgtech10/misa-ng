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

/* -------------------------------------------------------------------------- */
/* Brand configuration                                                        */
/* -------------------------------------------------------------------------- */

const BRAND = "#F59A16";
const GOLD = "#FFB52A";
const DEEP_ORANGE = "#A85F08";
const NAVY = "#0A0F17";
const PANEL = "#0D121B";
const BORDER = "#252D3A";
const WHITE = "#F5F5F5";
const SOFT_GRAY = "#A7AFBF";
const MUTED_GRAY = "#737B89";
const SUCCESS = "#32D583";

const interests = [
  "Buy a property",
  "List a property",
  "Invest",
  "Onboard as a developer",
] as const;

type Interest = (typeof interests)[number];

type LeadData = {
  name: string;
  phone: string;
  email: string;
  interest: Interest;
  note: string;
};

type Scene = {
  word: string;
  sky: string;
  heights: number[];
  lit: number;
  image?: string;
  imagePosition?: string;
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
    sky: "linear-gradient(180deg,#0A0F17 0%,#A85F08 60%,#F59A16 100%)",
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
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

const rise = {
  hidden: { y: "105%" },
  show: {
    y: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

const fade = (delay: number) => ({
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.65,
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
      focusable="false"
    >
      <defs>
        <pattern
          id={`${id}-windows`}
          width="12"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <rect
            x="3"
            y="4"
            width="5"
            height="7"
            fill={GOLD}
            opacity={scene.lit}
          />
        </pattern>

        <linearGradient
          id={`${id}-fade`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#050505" stopOpacity="0" />
          <stop offset="100%" stopColor="#050505" stopOpacity=".88" />
        </linearGradient>
      </defs>

      <circle cx="600" cy="560" r="300" fill={BRAND} opacity=".12" />

      {Array.from({ length: 24 }, (_, index) => {
        const height =
          scene.heights[index % scene.heights.length] *
          (0.7 + ((index * 37) % 10) / 16);

        const x = index * 50;

        return (
          <g key={index}>
            <rect
              x={x}
              y={800 - height}
              width="46"
              height={height}
              fill="#050505"
              opacity=".94"
            />

            <rect
              x={x}
              y={800 - height}
              width="46"
              height={height}
              fill={`url(#${id}-windows)`}
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
/* Shared input styles                                                        */
/* -------------------------------------------------------------------------- */

const inputClasses =
  "min-h-12 w-full rounded-sm border border-[#252D3A] bg-[#050505]/75 px-4 py-3 text-base text-[#F5F5F5] outline-none transition-colors duration-200 placeholder:text-[#737B89] hover:border-[#737B89] focus:border-[#FFB52A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB52A] sm:text-sm";

const labelClasses =
  "mb-2 block text-[10px] font-medium uppercase tracking-[0.16em] text-[#A7AFBF]";

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
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
  inputRef,
}: FieldProps) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className={labelClasses}>
        {label}
        {required && (
          <span className="ml-1 text-[#FFB52A]" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <input
        ref={inputRef}
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-required={required}
        className={inputClasses}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Success state                                                              */
/* -------------------------------------------------------------------------- */

function SuccessState({
  onReset,
}: {
  onReset: () => void;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0 : 0.4,
        ease,
      }}
      className="py-5 sm:py-8"
      role="status"
      aria-live="polite"
    >
      <div
        className="flex h-12 w-12 items-center justify-center border border-[#32D583]/35 bg-[#32D583]/10 text-xl text-[#32D583]"
        aria-hidden="true"
      >
        ✓
      </div>

      <p className="mt-7 text-[10px] uppercase tracking-[0.22em] text-[#FFB52A]">
        Enquiry received
      </p>

      <h2 className="mt-3 font-serif text-3xl font-normal leading-tight text-[#F5F5F5]">
        Your property brief
        <br />
        is with us.
      </h2>

      <p className="mt-4 max-w-sm text-sm leading-7 text-[#A7AFBF]">
        Thank you for contacting MISA NG. Our team will review
        your requirements and follow up regarding your enquiry.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-8 min-h-11 text-[10px] uppercase tracking-[0.16em] text-[#FFB52A] underline-offset-4 transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A]"
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

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const interestInputRef = useRef<HTMLSelectElement>(null);
  const noteInputRef = useRef<HTMLTextAreaElement>(null);

  const previousStepRef = useRef(step);

  const formHeadingId = useId();
  const formMessageId = useId();

  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundScale = useTransform(
    scrollYProgress,
    [0, 0.4],
    [1, 1.06],
  );

  /* ------------------------------------------------------------------------ */
  /* Rotate scenes, but respect reduced-motion preferences                   */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setSceneIndex((current) => (current + 1) % scenes.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  /* ------------------------------------------------------------------------ */
  /* Keep the category strip aligned when fonts or viewport change            */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    let cancelled = false;

    const measure = () => {
      if (cancelled) return;

      setCategoryOffset(
        categoryRefs.current[sceneIndex]?.offsetLeft ?? 0,
      );
    };

    measure();

    document.fonts?.ready.then(measure);

    window.addEventListener("resize", measure);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", measure);
    };
  }, [sceneIndex]);

  /* ------------------------------------------------------------------------ */
  /* Focus the new form step only after the visitor changes steps              */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (previousStepRef.current === step) return;

    previousStepRef.current = step;

    const timer = window.setTimeout(() => {
      if (step === 1) {
        nameInputRef.current?.focus({ preventScroll: true });
      } else if (step === 2) {
        interestInputRef.current?.focus({ preventScroll: true });
      } else if (step === 3) {
        noteInputRef.current?.focus({ preventScroll: true });
      }
    }, 80);

    return () => window.clearTimeout(timer);
  }, [step]);

  /* ------------------------------------------------------------------------ */
  /* Form helpers                                                             */
  /* ------------------------------------------------------------------------ */

  const updateField = useCallback(
    (
      key: keyof LeadData,
    ) => (
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
    const target = document.getElementById(id);

    if (!target) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    setMessage("");

    /* Step 1: validate contact information. */

    if (step === 1) {
      if (!data.name.trim()) {
        setMessage("Please enter your full name.");
        nameInputRef.current?.focus();
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
        setMessage("Please enter a valid email address.");
        emailInputRef.current?.focus();
        return;
      }

      setStep(2);
      return;
    }

    /* Step 2: capture the visitor's interest. */

    if (step === 2) {
      setStep(3);
      return;
    }

    /* Step 3: submit through the existing lead API. */

    setIsSubmitting(true);

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
    setMessage("");
    setIsSubmitting(false);
    setStep(1);
  };

  const currentScene = scenes[sceneIndex];

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        id="top"
        aria-labelledby="misa-hero-title"
        className="relative isolate overflow-clip bg-[#050505] text-[#F5F5F5] selection:bg-[#FFB52A] selection:text-[#050505]"
      >
        {/* ================================================================== */}
        {/* CINEMATIC BACKGROUND                                               */}
        {/* ================================================================== */}

        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[100svh] min-h-[620px] overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            style={{
              scale: prefersReducedMotion ? 1 : backgroundScale,
            }}
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
                        scale: 1.035,
                        filter: "blur(5px)",
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 1.15,
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
                      objectPosition:
                        currentScene.imagePosition ?? "center",
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

          {/* Contrast layers keep the content legible over every scene. */}

          <div className="absolute inset-0 bg-[#050505]/45" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/75 to-[#050505]/25" />

          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-transparent to-[#050505]" />

          <div className="absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full bg-[#A85F08]/10 blur-[140px] sm:h-[500px] sm:w-[500px]" />
        </div>

        {/* ================================================================== */}
        {/* HERO CONTENT                                                       */}
        {/* ================================================================== */}

        <div className="relative z-10 pt-8 sm:pt-12">
          <div className="mx-auto grid w-full max-w-[1500px] content-center items-center gap-12 px-5 pb-14 pt-12 sm:gap-14 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16 lg:px-12 lg:py-20 xl:px-16">
            {/* LEFT: BRAND MESSAGE */}

            <div className="min-w-0 max-w-[800px]">
              <motion.div
                {...fade(0.1)}
                className="flex items-center gap-3 sm:gap-4"
              >
                <span className="h-px w-8 shrink-0 bg-[#FFB52A] sm:w-12" />

                <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#FFB52A] sm:text-[10px] sm:tracking-[0.28em]">
                  Nigerian property advisory
                </span>
              </motion.div>

              <motion.h1
                id="misa-hero-title"
                variants={stagger}
                initial="hidden"
                animate="show"
                className="mt-7 font-serif text-[clamp(2.6rem,9.3vw,5.8rem)] font-normal uppercase leading-[0.98] tracking-[-0.045em] sm:mt-8 sm:text-[clamp(3.5rem,6vw,5.8rem)]"
              >
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    variants={rise}
                    className="block text-[#FFB52A]"
                  >
                    Property
                  </motion.span>
                </span>

                <span className="block overflow-hidden pb-1">
                  <motion.span
                    variants={rise}
                    className="block text-[#F5F5F5]/65"
                  >
                    brokered
                  </motion.span>
                </span>

                <span className="block overflow-hidden pb-1">
                  <motion.span
                    variants={rise}
                    className="block text-[#F5F5F5]"
                  >
                    across
                  </motion.span>
                </span>

                <span className="mt-3 block overflow-hidden pb-2 sm:mt-4">
                  <motion.span variants={rise} className="block">
                    <span className="sr-only">
                      Nigeria: residential, commercial, land and
                      developments.
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
                          duration: prefersReducedMotion ? 0 : 0.7,
                          ease,
                        }}
                        className="flex w-max gap-2.5 whitespace-nowrap sm:gap-3"
                      >
                        {scenes.map((scene, index) => (
                          <span
                            key={scene.word}
                            ref={(element) => {
                              categoryRefs.current[index] = element;
                            }}
                            className={`border px-2 py-1.5 text-[0.72em] transition-colors duration-500 sm:px-3 ${
                              index === sceneIndex
                                ? "border-[#FFB52A]/75 text-[#FFB52A]"
                                : "border-transparent text-[#A7AFBF]/45"
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
                {...fade(0.45)}
                className="mt-6 max-w-xl text-sm leading-7 text-[#A7AFBF] sm:mt-8 sm:text-base sm:leading-8 md:text-lg"
              >
                A commission-led property agency connecting discerning
                buyers, investors and developers with opportunities
                across Nigeria.
              </motion.p>

              {/* Primary actions */}

              <motion.div
                {...fade(0.6)}
                className="mt-7 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap sm:mt-9"
              >
                <button
                  type="button"
                  onClick={() => goTo("properties")}
                  className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[#FFB52A] px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#050505] transition-colors duration-200 hover:bg-[#F59A16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A] sm:px-6"
                >
                  Explore properties

                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => goTo("developers")}
                  className="inline-flex min-h-12 items-center justify-center border border-[#252D3A] bg-[#0A0F17]/70 px-5 py-4 text-[10px] uppercase tracking-[0.13em] text-[#F5F5F5] backdrop-blur-md transition-colors duration-200 hover:border-[#737B89] hover:bg-[#0D121B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A] sm:px-6"
                >
                  Partner with MISA
                </button>
              </motion.div>

              {/* Trust indicators */}

              <motion.div
                {...fade(0.8)}
                className="mt-9 grid max-w-2xl grid-cols-3 border-y border-[#252D3A] py-5 sm:mt-12 sm:py-6 lg:mt-14"
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
                          ? "border-l border-[#252D3A] px-2 sm:px-5"
                          : "border-l border-[#252D3A] pl-2 sm:pl-5"
                    }
                  >
                    <p className="font-serif text-xl font-normal text-[#F5F5F5] sm:text-3xl">
                      {number}
                    </p>

                    <p className="mt-2 text-[8px] uppercase leading-relaxed tracking-[0.08em] text-[#A7AFBF] sm:text-[9px] sm:tracking-[0.14em]">
                      {label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT: PRIVATE CLIENT ENQUIRY */}

            <motion.div
              {...fade(0.35)}
              className="flex min-w-0 justify-center lg:justify-end"
            >
              <div className="w-full max-w-[470px]">
                <div className="relative overflow-hidden border border-[#252D3A] bg-[#0D121B]/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-8">
                  <div
                    className="absolute left-0 top-0 h-px w-24 bg-[#FFB52A]"
                    aria-hidden="true"
                  />

                  {step === 4 ? (
                    <SuccessState onReset={resetForm} />
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#FFB52A] sm:text-[10px]">
                            Private client desk
                          </p>

                          <h2
                            id={formHeadingId}
                            className="mt-3 font-serif text-2xl font-normal leading-tight text-[#F5F5F5] sm:text-3xl"
                          >
                            Let us find your
                            <br />
                            next property.
                          </h2>

                          <p className="mt-3 max-w-xs text-xs leading-6 text-[#A7AFBF]">
                            Tell us what you are looking for. We will
                            help you explore your options.
                          </p>
                        </div>

                        <span
                          className="shrink-0 pt-1 font-mono text-[10px] text-[#A7AFBF]"
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
                            className={`h-[2px] flex-1 transition-colors duration-300 ${
                              number <= step
                                ? "bg-[#FFB52A]"
                                : "bg-[#252D3A]"
                            }`}
                          />
                        ))}
                      </div>

                      <form
                        className="mt-7"
                        onSubmit={handleSubmit}
                        aria-labelledby={formHeadingId}
                        aria-describedby={
                          message ? formMessageId : undefined
                        }
                        noValidate
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={step}
                            initial={
                              prefersReducedMotion
                                ? { opacity: 0 }
                                : { opacity: 0, x: 14 }
                            }
                            animate={{ opacity: 1, x: 0 }}
                            exit={
                              prefersReducedMotion
                                ? { opacity: 0 }
                                : { opacity: 0, x: -14 }
                            }
                            transition={{
                              duration: prefersReducedMotion ? 0.1 : 0.22,
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
                                  inputRef={nameInputRef}
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
                                  inputRef={emailInputRef}
                                />
                              </>
                            )}

                            {step === 2 && (
                              <div>
                                <label
                                  htmlFor="misa-interest"
                                  className={labelClasses}
                                >
                                  I am looking to
                                </label>

                                <select
                                  ref={interestInputRef}
                                  id="misa-interest"
                                  name="interest"
                                  value={data.interest}
                                  onChange={updateField("interest")}
                                  className={`${inputClasses} appearance-none bg-[#050505]`}
                                >
                                  {interests.map((interest) => (
                                    <option
                                      key={interest}
                                      value={interest}
                                      className="bg-[#0D121B] text-[#F5F5F5]"
                                    >
                                      {interest}
                                    </option>
                                  ))}
                                </select>

                                <p className="mt-3 text-xs leading-6 text-[#A7AFBF]">
                                  This helps us direct your enquiry
                                  to the appropriate team.
                                </p>
                              </div>
                            )}

                            {step === 3 && (
                              <div>
                                <label
                                  htmlFor="misa-note"
                                  className={labelClasses}
                                >
                                  Tell us about your brief
                                </label>

                                <textarea
                                  ref={noteInputRef}
                                  id="misa-note"
                                  name="note"
                                  rows={5}
                                  value={data.note}
                                  onChange={updateField("note")}
                                  placeholder="Preferred location, budget, property type or other requirements..."
                                  className={`${inputClasses} min-h-36 resize-y leading-7`}
                                />

                                <p className="mt-3 text-xs leading-6 text-[#A7AFBF]">
                                  Share as much or as little detail
                                  as you prefer.
                                </p>
                              </div>
                            )}
                          </motion.div>
                        </AnimatePresence>

                        {/* Validation and submission messages */}

                        {message && (
                          <p
                            id={formMessageId}
                            role="alert"
                            aria-live="assertive"
                            className="mt-4 border-l-2 border-[#F59A16] bg-[#F59A16]/[0.08] px-3 py-2 text-xs leading-5 text-[#F5F5F5]"
                          >
                            {message}
                          </p>
                        )}

                        {/* Form navigation */}

                        <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#252D3A] pt-5">
                          {step > 1 ? (
                            <button
                              type="button"
                              disabled={isSubmitting}
                              onClick={() => {
                                setMessage("");
                                setStep((current) => current - 1);
                              }}
                              className="min-h-11 px-1 text-[10px] uppercase tracking-[0.14em] text-[#A7AFBF] transition-colors hover:text-[#F5F5F5] disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A]"
                            >
                              ← Back
                            </button>
                          ) : (
                            <span className="text-[9px] uppercase tracking-[0.12em] text-[#737B89]">
                              Step {step} of 3
                            </span>
                          )}

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            aria-busy={isSubmitting}
                            className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#FFB52A] px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#050505] transition-colors duration-200 hover:bg-[#F59A16] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A] sm:px-6"
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

                <p className="mt-4 text-center text-[9px] uppercase tracking-[0.12em] text-[#A7AFBF] sm:tracking-[0.16em]">
                  Confidential enquiry · MISA NG LTD
                </p>
              </div>
            </motion.div>
          </div>

          {/* ================================================================= */}
          {/* SCROLL INDICATOR                                                  */}
          {/* ================================================================= */}

          <button
            type="button"
            onClick={() => goTo("properties")}
            className="mx-auto mb-8 hidden min-h-11 items-center gap-4 text-[9px] uppercase tracking-[0.28em] text-[#A7AFBF] transition-colors hover:text-[#F5F5F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A] lg:flex"
          >
            <span>Discover</span>
            <span
              className="h-10 w-px bg-[#252D3A]"
              aria-hidden="true"
            />
            <span aria-hidden="true">↓</span>
          </button>

          {/* ================================================================= */}
          {/* ABOUT MISA                                                        */}
          {/* ================================================================= */}

          <div className="relative border-t border-[#252D3A] bg-gradient-to-b from-[#050505] via-[#0A0F17] to-[#0A0F17] px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24 lg:px-12 lg:pb-28 xl:px-16">
            <motion.div
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: 20 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.7,
                ease,
              }}
              className="mx-auto max-w-[1500px]"
            >
              <div className="max-w-4xl">
                <h2 className="mb-5 flex items-center gap-3 font-serif text-3xl font-normal tracking-[-0.03em] text-[#F5F5F5] sm:text-4xl">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#FFB52A]"
                    aria-hidden="true"
                  />
                  MISA <span className="text-[#FFB52A]">NG</span>
                </h2>

                <p className="font-serif text-xl font-normal leading-relaxed text-[#F5F5F5] sm:text-2xl md:text-3xl">
                  We list verified properties, onboard developers
                  and structure investments across residential,
                  commercial and land. As part of Strategic
                  Infrastructure and Resource Partners (SIR-Partners),
                  we operate on a commission basis, with commissions
                  payable upon completed transactions under agreed terms.
                </p>

                <button
                  type="button"
                  onClick={() => goTo("invest")}
                  className="group mt-8 inline-flex min-h-11 items-center gap-4 text-xs text-[#A7AFBF] transition-colors hover:text-[#F5F5F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A]"
                >
                  Learn more

                  <span className="grid h-8 w-8 rotate-45 place-items-center bg-[#FFB52A] text-[#050505] transition-transform duration-200 group-hover:scale-105">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 -rotate-45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* GLOBAL REDUCED-MOTION SUPPORT                                      */}
        {/* ================================================================== */}

        <style jsx global>{`
          @media (prefers-reduced-motion: reduce) {
            html:focus-within {
              scroll-behavior: auto !important;
            }

            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              scroll-behavior: auto !important;
            }
          }
        `}</style>
      </section>
    </MotionConfig>
  );
}