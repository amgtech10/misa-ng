"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Currency = {
  code: string;
  name: string;
  flag: string;
};

type RateResponse = {
  result: string;
  base_code?: string;
  rates?: Record<string, number>;
  time_last_update_utc?: string;
};

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
  green: "#32D583",
} as const;

const CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "NGN", name: "Nigerian Naira", flag: "🇳🇬" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "ZAR", name: "South African Rand", flag: "🇿🇦" },
  { code: "KES", name: "Kenyan Shilling", flag: "🇰🇪" },
  { code: "GHS", name: "Ghanaian Cedi", flag: "🇬🇭" },
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦" },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬" },
  { code: "BRL", name: "Brazilian Real", flag: "🇧🇷" },
  { code: "NZD", name: "New Zealand Dollar", flag: "🇳🇿" },
];

const NAV_ITEMS = [
  { label: "Dashboard", icon: "⌂" },
  { label: "Portfolio", icon: "▣" },
  { label: "Markets", icon: "▥" },
  { label: "News & Insights", icon: "▤" },
  { label: "Watchlist", icon: "☆" },
  { label: "Support", icon: "⚙" },
];

const formatNumber = (
  value: number,
  maximumFractionDigits = 4,
) =>
  value.toLocaleString("en-US", {
    maximumFractionDigits,
  });

function getCurrency(code: string) {
  return CURRENCIES.find((currency) => currency.code === code);
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB52A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]";

const buttonBase =
  `transition-colors duration-200 ${focusRing}`;

const panelClass =
  "border border-[#252D3A] bg-[#0D121B]";

export default function ExchangeDashboard() {
  const [active, setActive] = useState("Dashboard");
  const [base, setBase] = useState("USD");
  const [quote, setQuote] = useState("NGN");
  const [amount, setAmount] = useState("100");

  // Rates are always stored relative to USD.
  const [rates, setRates] = useState<Record<string, number>>({
    USD: 1,
  });

  const [updatedAt, setUpdatedAt] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [dialog, setDialog] = useState<
    "convert" | "support" | "rate" | null
  >(null);

  const [selectedCurrency, setSelectedCurrency] = useState("NGN");
  const [period, setPeriod] = useState("1M");
  const [tickerPaused, setTickerPaused] = useState(false);

  const requestId = useRef(0);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const loadRates = useCallback(async () => {
    const currentRequest = ++requestId.current;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://open.er-api.com/v6/latest/USD",
        { cache: "no-store" },
      );

      if (!response.ok) {
        throw new Error(
          "The exchange-rate provider is unavailable.",
        );
      }

      const data = (await response.json()) as RateResponse;

      if (
        data.result !== "success" ||
        data.base_code !== "USD" ||
        !data.rates ||
        typeof data.rates.NGN !== "number"
      ) {
        throw new Error(
          "The exchange-rate response is invalid.",
        );
      }

      if (currentRequest !== requestId.current) return;

      setRates({ ...data.rates, USD: 1 });

      setUpdatedAt(
        data.time_last_update_utc ||
          new Date().toISOString(),
      );
    } catch (err) {
      if (currentRequest !== requestId.current) return;

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load exchange rates. Please try again.",
      );
    } finally {
      if (currentRequest === requestId.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    void loadRates();

    const timer = window.setInterval(() => {
      void loadRates();
    }, 15 * 60 * 1000);

    return () => {
      window.clearInterval(timer);
      requestId.current += 1;
    };
  }, [loadRates]);

  // Keep every conversion based on the same USD reference table.
  const convert = useCallback(
    (
      value: number,
      from: string,
      to: string,
    ): number | null => {
      if (!Number.isFinite(value) || value < 0) {
        return null;
      }

      if (from === to) return value;

      const fromRate = rates[from];
      const toRate = rates[to];

      if (
        typeof fromRate !== "number" ||
        typeof toRate !== "number" ||
        !Number.isFinite(fromRate) ||
        !Number.isFinite(toRate) ||
        fromRate <= 0 ||
        toRate <= 0
      ) {
        return null;
      }

      return (value / fromRate) * toRate;
    },
    [rates],
  );

  const numericAmount =
    amount.trim() === "" ? NaN : Number(amount);

  const converted = useMemo(() => {
    if (
      !Number.isFinite(numericAmount) ||
      numericAmount < 0
    ) {
      return null;
    }

    return convert(numericAmount, base, quote);
  }, [numericAmount, base, quote, convert]);

  const rate = convert(1, base, quote);

  const rows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return CURRENCIES.filter((currency) => {
      const matchesSearch =
        !query ||
        `${currency.code} ${currency.name}`
          .toLowerCase()
          .includes(query);

      return matchesSearch && currency.code !== base;
    }).map((currency) => ({
      ...currency,
      rate: convert(1, base, currency.code),
    }));
  }, [search, base, convert]);

  const swap = () => {
    setBase(quote);
    setQuote(base);
  };

  const openNav = (label: string) => {
    setActive(label);

    if (label === "Support") {
      setDialog("support");
      return;
    }

    if (label === "Markets") {
      document
        .getElementById("currency-converter")
        ?.scrollIntoView({
          behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches
            ? "auto"
            : "smooth",
          block: "start",
        });
    }
  };

  const tickerItems = [
    { pair: "USD / NGN", from: "USD", to: "NGN" },
    { pair: "GBP / USD", from: "GBP", to: "USD" },
    { pair: "EUR / USD", from: "EUR", to: "USD" },
    { pair: "USD / CAD", from: "USD", to: "CAD" },
    { pair: "USD / JPY", from: "USD", to: "JPY" },
    { pair: "AUD / USD", from: "AUD", to: "USD" },
    { pair: "USD / GHS", from: "USD", to: "GHS" },
    { pair: "USD / ZAR", from: "USD", to: "ZAR" },
    { pair: "USD / KES", from: "USD", to: "KES" },
  ].map((item) => ({
    ...item,
    value: convert(1, item.from, item.to),
  }));

  const formattedUpdatedAt = updatedAt
    ? new Date(updatedAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
        timeZoneName: "short",
      })
    : "";

  // Basic modal focus management and Escape-key handling.
  useEffect(() => {
    if (!dialog) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    dialogCloseRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDialog(null);
        return;
      }

      if (event.key !== "Tab") return;

      const dialogElement =
        document.getElementById("misa-dashboard-dialog");

      if (!dialogElement) return;

      const focusable = Array.from(
        dialogElement.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) => element.offsetParent !== null,
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      previousFocusRef.current?.focus();
    };
  }, [dialog]);

  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      <style jsx global>{`
        @keyframes misa-ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .misa-ticker-track {
          animation: misa-ticker 48s linear infinite;
          width: max-content;
        }

        .misa-ticker.is-paused .misa-ticker-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .misa-ticker-track {
            animation: none;
          }

          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        select option {
          background: #0D121B;
          color: #F5F5F5;
        }

        input,
        select,
        textarea,
        button {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>

      {/* Exchange-rate ticker */}
      <section
        aria-label="Indicative currency reference rates"
        className={`misa-ticker ${
          tickerPaused ? "is-paused" : ""
        } overflow-hidden border-b border-[#252D3A] bg-[#0A0F17]`}
      >
        <div className="flex min-h-11 items-center justify-between gap-3 border-b border-[#252D3A]/70 px-4 sm:px-6">
          <p className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#A7AFBF] sm:text-[10px]">
            Currency reference feed
          </p>

          <button
            type="button"
            aria-pressed={tickerPaused}
            onClick={() => setTickerPaused((value) => !value)}
            className={`${buttonBase} shrink-0 text-[10px] text-[#A7AFBF] hover:text-[#FFB52A]`}
          >
            {tickerPaused ? "Resume ticker" : "Pause ticker"}
          </button>
        </div>

        <div className="overflow-hidden">
          <div className="misa-ticker-track flex min-w-max items-center gap-8 py-3 pl-5 sm:gap-10 sm:pl-7">
            {[...tickerItems, ...tickerItems].map(
              (item, index) => (
                <div
                  key={`${item.pair}-${index}`}
                  className="flex items-center gap-2.5 whitespace-nowrap"
                  aria-hidden={index >= tickerItems.length}
                >
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${
                      item.value == null
                        ? "bg-[#737B89]"
                        : "bg-[#32D583]"
                    }`}
                  />

                  <span className="text-[11px] font-semibold tracking-wide text-[#A7AFBF]">
                    {item.pair}
                  </span>

                  <span className="text-xs font-semibold tabular-nums text-[#F5F5F5]">
                    {item.value == null
                      ? "—"
                      : formatNumber(item.value, 4)}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <div className="flex min-h-[calc(100vh-78px)]">
        {/* Desktop sidebar */}
        <aside className="hidden w-[228px] shrink-0 flex-col border-r border-[#252D3A] bg-[#0A0F17] lg:flex xl:w-[248px]">
          <button
            type="button"
            onClick={() => setActive("Dashboard")}
            className={`${buttonBase} flex min-h-[88px] items-center gap-3 border-b border-[#252D3A] px-5 text-left`}
            aria-label="MISA Capital dashboard home"
          >
            <span
              aria-hidden="true"
              className="font-serif text-4xl text-[#FFB52A]"
            >
              M
            </span>

            <span>
              <span className="block text-2xl font-semibold tracking-tight text-[#F5F5F5]">
                MISA
              </span>

              <span className="mt-1 block text-[8px] tracking-[0.15em] text-[#A7AFBF]">
                CAPITAL · OPPORTUNITY · GROWTH
              </span>
            </span>
          </button>

          <nav
            aria-label="Dashboard navigation"
            className="space-y-1 px-3 py-6"
          >
            <p className="mb-3 px-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#737B89]">
              Workspace
            </p>

            {NAV_ITEMS.map((item) => (
              <button
                type="button"
                key={item.label}
                onClick={() => openNav(item.label)}
                aria-current={
                  active === item.label ? "page" : undefined
                }
                className={`${buttonBase} flex min-h-11 w-full items-center gap-3 border px-3 text-left text-[12px] ${
                  active === item.label
                    ? "border-[#FFB52A]/25 bg-[#FFB52A]/[0.08] text-[#FFB52A]"
                    : "border-transparent text-[#A7AFBF] hover:border-[#252D3A] hover:bg-[#0D121B] hover:text-[#F5F5F5]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="w-5 text-center text-lg"
                >
                  {item.icon}
                </span>

                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto p-4 pb-6">
            <div className="border border-[#252D3A] bg-[#0D121B] p-4">
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#FFB52A]">
                Market intelligence
              </p>

              <h2 className="mt-3 font-serif text-xl leading-snug text-[#F5F5F5]">
                Clarity for your next move.
              </h2>

              <p className="mt-2 text-[11px] leading-5 text-[#A7AFBF]">
                Review indicative currency rates and explore
                financial information.
              </p>

              <button
                type="button"
                onClick={() => openNav("Markets")}
                className={`${buttonBase} mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 border border-[#FFB52A]/40 px-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#FFB52A] hover:bg-[#FFB52A]/10`}
              >
                Explore markets <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          <div className="border-t border-[#252D3A] px-5 py-4">
            <p className="text-[9px] uppercase tracking-[0.12em] text-[#737B89]">
              MISA NG LTD
            </p>

            <p className="mt-1 text-[10px] text-[#A7AFBF]">
              Property · Investment · Advisory
            </p>
          </div>
        </aside>

        {/* Main dashboard */}
        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex min-h-[68px] items-center gap-3 border-b border-[#252D3A] bg-[#050505]/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="min-w-0 flex-1">
              <label
                htmlFor="currency-search"
                className="sr-only"
              >
                Search currencies
              </label>

              <div className="flex min-h-10 max-w-[560px] items-center gap-3 border border-[#252D3A] bg-[#0D121B] px-3 transition-colors focus-within:border-[#FFB52A]/60">
                <span
                  aria-hidden="true"
                  className="text-lg text-[#737B89]"
                >
                  ⌕
                </span>

                <input
                  id="currency-search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search currencies..."
                  className="min-w-0 flex-1 bg-transparent py-2 text-xs text-[#F5F5F5] outline-none placeholder:text-[#737B89]"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear currency search"
                    className={`${buttonBase} px-1 text-lg text-[#A7AFBF] hover:text-[#FFB52A]`}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            <button
              type="button"
              aria-label="Open exchange rate information"
              onClick={() => setDialog("rate")}
              className={`${buttonBase} relative grid h-10 w-10 shrink-0 place-items-center border border-[#252D3A] text-lg text-[#A7AFBF] hover:border-[#FFB52A]/50 hover:text-[#FFB52A]`}
            >
              <span aria-hidden="true">ⓘ</span>

              {error && (
                <span className="absolute right-1 top-1 h-1.5 w-1.5 bg-[#F59A16]" />
              )}
            </button>
          </header>

          <div className="mx-auto max-w-[1600px] space-y-7 px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-10">
            {/* Page heading */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#FFB52A] sm:text-[10px]">
                  MISA CAPITAL / MARKETS
                </p>

                <h1 className="font-serif text-3xl leading-tight tracking-[-0.035em] text-[#F5F5F5] sm:text-4xl lg:text-[42px]">
                  {active === "Dashboard"
                    ? "Exchange overview"
                    : active}
                </h1>

                <p className="mt-3 max-w-xl text-xs leading-6 text-[#A7AFBF] sm:text-sm">
                  A clear view of currency reference rates and
                  estimated conversions.
                </p>
              </div>

              <button
                type="button"
                onClick={() => void loadRates()}
                disabled={loading}
                className={`${buttonBase} inline-flex min-h-11 shrink-0 items-center justify-center gap-2 border border-[#252D3A] bg-[#0D121B] px-4 text-xs font-semibold text-[#F5F5F5] hover:border-[#FFB52A]/50 hover:text-[#FFB52A] disabled:cursor-wait disabled:opacity-60`}
              >
                <span aria-hidden="true">↻</span>
                {loading ? "Refreshing rates…" : "Refresh rates"}
              </button>
            </div>

            {/* Status */}
            {error && (
              <div
                role="alert"
                className="flex flex-col gap-3 border border-[#F59A16]/30 bg-[#F59A16]/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-[#F5F5F5]">
                    Exchange rates could not be refreshed.
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#A7AFBF]">
                    {error} Check your connection and try
                    again.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => void loadRates()}
                  className={`${buttonBase} min-h-10 shrink-0 border border-[#F59A16]/40 px-4 text-xs font-semibold text-[#FFB52A] hover:bg-[#F59A16]/10`}
                >
                  Try again
                </button>
              </div>
            )}

            {/* Overview metrics */}
            <section
              aria-label="Exchange rate overview"
              className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
            >
              <Metric
                icon="⇄"
                label="Base currency"
                value={`${getCurrency(base)?.flag ?? "🌐"} ${base}`}
                note={
                  getCurrency(base)?.name ??
                  "Selected currency"
                }
              />

              <Metric
                icon="▥"
                label="Currencies available"
                value={
                  loading && Object.keys(rates).length <= 1
                    ? "Loading…"
                    : Object.keys(rates).length.toString()
                }
                note="Currencies in the current rate feed"
              />

              <Metric
                icon="◷"
                label="Last provider update"
                value={
                  updatedAt
                    ? new Date(updatedAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          timeZone: "UTC",
                        },
                      )
                    : "Awaiting data"
                }
                note={
                  updatedAt
                    ? new Date(updatedAt).toLocaleTimeString(
                        "en-GB",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZone: "UTC",
                          timeZoneName: "short",
                        },
                      )
                    : "Provider timestamp"
                }
              />
            </section>

            {/* Converter and market illustration */}
            <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.8fr)]">
              <section
                id="currency-converter"
                className={`${panelClass} scroll-mt-24 p-4 sm:p-6 lg:p-7`}
              >
                <div className="mb-7 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFB52A]">
                      Currency tools
                    </p>

                    <h2 className="mt-2 font-serif text-2xl tracking-tight text-[#F5F5F5] sm:text-3xl">
                      Currency converter
                    </h2>

                    <p className="mt-2 text-xs leading-5 text-[#A7AFBF]">
                      Estimate a conversion using the current
                      reference-rate snapshot.
                    </p>
                  </div>

                  <span className="inline-flex min-h-7 items-center gap-2 border border-[#32D583]/20 px-2.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#32D583]">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-[#32D583]"
                    />
                    Reference data
                  </span>
                </div>

                <label
                  htmlFor="send-amount"
                  className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A7AFBF]"
                >
                  You send
                </label>

                <div className="grid gap-3 border border-[#252D3A] bg-[#0A0F17] p-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,210px)] sm:items-center sm:p-4">
                  <input
                    id="send-amount"
                    type="number"
                    min="0"
                    step="any"
                    inputMode="decimal"
                    value={amount}
                    onChange={(event) =>
                      setAmount(event.target.value)
                    }
                    className={`${focusRing} min-h-12 w-full min-w-0 bg-transparent text-2xl font-semibold tracking-tight text-[#F5F5F5] outline-none placeholder:text-[#737B89] sm:text-3xl`}
                    placeholder="Enter amount"
                  />

                  <CurrencySelect
                    label="Currency you send"
                    value={base}
                    onChange={setBase}
                  />
                </div>

                <div className="relative my-4 flex items-center justify-center">
                  <div
                    aria-hidden="true"
                    className="absolute w-full border-t border-[#252D3A]"
                  />

                  <button
                    type="button"
                    onClick={swap}
                    aria-label="Swap send and receive currencies"
                    title="Swap currencies"
                    className={`${buttonBase} relative grid h-10 w-10 place-items-center border border-[#A85F08] bg-[#0A0F17] text-xl text-[#FFB52A] hover:border-[#FFB52A] hover:bg-[#FFB52A]/10`}
                  >
                    ⇅
                  </button>
                </div>

                <label
                  htmlFor="receive-amount"
                  className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A7AFBF]"
                >
                  You receive
                </label>

                <div className="grid gap-3 border border-[#A85F08]/70 bg-[#FFB52A]/[0.035] p-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,210px)] sm:items-center sm:p-4">
                  <div
                    id="receive-amount"
                    aria-live="polite"
                    aria-atomic="true"
                    className="flex min-h-12 min-w-0 items-center break-words text-2xl font-semibold tracking-tight text-[#FFB52A] sm:text-3xl"
                  >
                    {amount.trim() === "" ||
                    !Number.isFinite(numericAmount)
                      ? "Enter an amount"
                      : converted == null
                        ? loading
                          ? "Loading rate…"
                          : "Rate unavailable"
                        : formatNumber(converted, 4)}
                  </div>

                  <CurrencySelect
                    label="Currency you receive"
                    value={quote}
                    onChange={setQuote}
                  />
                </div>

                <div className="mt-5 flex flex-col gap-3 border-b border-[#252D3A] pb-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-5 text-[#A7AFBF]">
                    {base === quote
                      ? "Both currencies are the same."
                      : rate == null
                        ? "Exchange rate unavailable."
                        : `1 ${base} = ${formatNumber(
                            rate,
                            6,
                          )} ${quote}`}
                  </p>

                  <button
                    type="button"
                    onClick={() => setDialog("convert")}
                    className={`${buttonBase} self-start text-xs font-semibold text-[#FFB52A] hover:text-[#F59A16] sm:self-auto`}
                  >
                    Conversion details <span aria-hidden="true">↗</span>
                  </button>
                </div>

                <div className="mt-4 flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 text-sm text-[#FFB52A]"
                  >
                    ⓘ
                  </span>

                  <p className="text-[11px] leading-5 text-[#A7AFBF]">
                    Indicative mid-market conversion only.
                    Banks and exchange providers may apply fees
                    and different buy or sell rates. This is not
                    an executable exchange quote.
                  </p>
                </div>
              </section>

              {/* Illustrative chart */}
              <section className={`${panelClass} p-4 sm:p-6`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#FFB52A]">
                      Market overview
                    </p>

                    <h2 className="mt-2 font-serif text-xl text-[#F5F5F5] sm:text-2xl">
                      Currency market pulse
                    </h2>

                    <p className="mt-2 text-xs leading-5 text-[#A7AFBF]">
                      Reference rates against {base}
                    </p>
                  </div>

                  <div
                    aria-label="Illustrative chart period"
                    className="flex border border-[#252D3A] p-0.5"
                  >
                    {["1D", "1W", "1M", "1Y"].map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setPeriod(p)}
                        aria-pressed={period === p}
                        className={`${buttonBase} min-h-8 min-w-9 px-2 text-[10px] ${
                          period === p
                            ? "bg-[#FFB52A] font-semibold text-[#050505]"
                            : "text-[#A7AFBF] hover:text-[#F5F5F5]"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative mt-6 h-[180px] overflow-hidden border border-[#252D3A] bg-[#0A0F17] sm:h-[210px]">
                  <svg
                    viewBox="0 0 600 180"
                    preserveAspectRatio="none"
                    className="h-full w-full"
                    role="img"
                    aria-label="Illustrative rising line, not historical exchange-rate data"
                  >
                    {[35, 75, 115, 155].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="600"
                        y2={y}
                        stroke="#252D3A"
                        strokeDasharray="4 5"
                      />
                    ))}

                    <path
                      d="M0 145 L35 130 L68 137 L100 108 L133 118 L166 89 L200 100 L235 73 L270 84 L300 58 L335 70 L370 49 L405 62 L440 35 L475 45 L510 28 L545 40 L580 17 L600 23 L600 180 L0 180Z"
                      fill="#F59A16"
                      fillOpacity="0.07"
                    />

                    <path
                      d="M0 145 L35 130 L68 137 L100 108 L133 118 L166 89 L200 100 L235 73 L270 84 L300 58 L335 70 L370 49 L405 62 L440 35 L475 45 L510 28 L545 40 L580 17 L600 23"
                      fill="none"
                      stroke="#FFB52A"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>

                  <span className="absolute bottom-3 left-3 max-w-[75%] text-[9px] leading-4 text-[#A7AFBF]">
                    Illustrative trend · Not historical data
                  </span>

                  <span className="absolute right-3 top-3 border border-[#252D3A] bg-[#0D121B] px-2 py-1 text-[10px] text-[#FFB52A]">
                    {period} view
                  </span>
                </div>

                <p className="mt-3 text-[10px] leading-5 text-[#737B89]">
                  Period selection changes the display label only.
                  Historical market data is not connected.
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#252D3A] pt-4">
                  <div className="min-w-0">
                    <p className="text-[9px] uppercase tracking-[0.08em] text-[#737B89]">
                      Base
                    </p>
                    <p className="mt-2 truncate text-sm font-semibold text-[#F5F5F5]">
                      {base}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="text-[9px] uppercase tracking-[0.08em] text-[#737B89]">
                      Pair
                    </p>
                    <p className="mt-2 truncate text-sm font-semibold text-[#F5F5F5]">
                      {base}/{quote}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="text-[9px] uppercase tracking-[0.08em] text-[#737B89]">
                      Rate
                    </p>
                    <p className="mt-2 truncate text-sm font-semibold text-[#FFB52A]">
                      {rate == null
                        ? "—"
                        : formatNumber(rate, 4)}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Currency table */}
            <section className={`${panelClass} overflow-hidden`}>
              <div className="flex flex-col gap-4 border-b border-[#252D3A] p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#FFB52A]">
                    Currency directory
                  </p>

                  <h2 className="mt-2 font-serif text-2xl text-[#F5F5F5]">
                    Global currency rates
                  </h2>

                  <p className="mt-2 text-xs text-[#A7AFBF]">
                    Indicative reference rates · Base: {base}
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <label
                    htmlFor="table-currency-search"
                    className="sr-only"
                  >
                    Filter currency table
                  </label>

                  <input
                    id="table-currency-search"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Filter currencies…"
                    className={`${focusRing} min-h-10 min-w-0 border border-[#252D3A] bg-[#0A0F17] px-3 text-xs text-[#F5F5F5] outline-none placeholder:text-[#737B89] sm:w-52`}
                  />

                  <button
                    type="button"
                    onClick={() => setDialog("rate")}
                    className={`${buttonBase} min-h-10 border border-[#252D3A] px-4 text-xs font-semibold text-[#A7AFBF] hover:border-[#FFB52A]/50 hover:text-[#FFB52A]`}
                  >
                    Rate information
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] text-left text-xs">
                  <caption className="sr-only">
                    Currency reference rates converted from {base}
                  </caption>

                  <thead className="border-b border-[#252D3A] bg-[#0A0F17] text-[#A7AFBF]">
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-4 font-medium"
                      >
                        Currency
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-4 font-medium"
                      >
                        Code
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-4 font-medium"
                      >
                        1 {base} equals
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-4 font-medium"
                      >
                        Pair
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-4 text-right font-medium"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#252D3A]">
                    {rows.slice(0, 12).map((currency) => (
                      <tr
                        key={currency.code}
                        className="transition-colors hover:bg-[#FFB52A]/[0.025]"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <span
                              aria-hidden="true"
                              className="grid h-9 w-9 shrink-0 place-items-center border border-[#252D3A] bg-[#0A0F17] text-lg"
                            >
                              {currency.flag}
                            </span>

                            <span className="font-medium text-[#F5F5F5]">
                              {currency.name}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4 font-semibold text-[#A7AFBF]">
                          {currency.code}
                        </td>

                        <td className="px-5 py-4 font-semibold tabular-nums text-[#F5F5F5]">
                          {currency.rate == null
                            ? "—"
                            : formatNumber(currency.rate, 6)}
                        </td>

                        <td className="px-5 py-4 text-[#A7AFBF]">
                          {base}/{currency.code}
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              setQuote(currency.code);
                              setSelectedCurrency(currency.code);
                              setDialog("rate");
                            }}
                            aria-label={`View ${base} to ${currency.code} rate`}
                            className={`${buttonBase} min-h-9 px-2 font-semibold text-[#FFB52A] hover:text-[#F59A16]`}
                          >
                            View rate <span aria-hidden="true">→</span>
                          </button>
                        </td>
                      </tr>
                    ))}

                    {!rows.length && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-5 py-12 text-center text-[#A7AFBF]"
                        >
                          No matching currencies found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-2 border-t border-[#252D3A] px-4 py-4 text-[10px] leading-5 text-[#737B89] sm:flex-row sm:items-start sm:justify-between sm:px-6">
                <span>
                  Showing {Math.min(rows.length, 12)} of{" "}
                  {rows.length} matching currencies
                </span>

                <span className="sm:max-w-[65%] sm:text-right">
                  {loading
                    ? "Refreshing provider data…"
                    : formattedUpdatedAt
                      ? `Provider update: ${formattedUpdatedAt}`
                      : "Awaiting provider data"}
                </span>
              </div>
            </section>

            {/* Footer */}
            <footer className="flex flex-col gap-3 border-t border-[#252D3A] pt-5 pb-2 text-[10px] leading-5 text-[#737B89] sm:flex-row sm:items-start sm:justify-between">
              <span>
                © {new Date().getFullYear()} MISA NG LTD ·
                Currency information
              </span>

              <span className="max-w-xl sm:text-right">
                Reference rates are informational and are not
                an offer or quote to execute a trade.
              </span>
            </footer>
          </div>
        </section>
      </div>

      {/* Dialogs */}
      {dialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#050505]/85 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setDialog(null);
            }
          }}
        >
          <div
            id="misa-dashboard-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            className="my-auto w-full max-w-lg border border-[#252D3A] bg-[#0D121B] p-5 shadow-2xl shadow-black/50 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#252D3A] pb-5">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFB52A]">
                  {dialog === "support"
                    ? "MISA support"
                    : dialog === "convert"
                      ? "Conversion details"
                      : "Market information"}
                </p>

                <h3
                  id="dialog-title"
                  className="mt-3 font-serif text-2xl text-[#F5F5F5] sm:text-3xl"
                >
                  {dialog === "support"
                    ? "How can we help?"
                    : dialog === "convert"
                      ? "Your estimated conversion"
                      : "Exchange rate details"}
                </h3>
              </div>

              <button
                ref={dialogCloseRef}
                type="button"
                aria-label="Close dialog"
                onClick={() => setDialog(null)}
                className={`${buttonBase} grid h-10 w-10 shrink-0 place-items-center border border-[#252D3A] text-xl text-[#A7AFBF] hover:text-[#FFB52A]`}
              >
                ×
              </button>
            </div>

            <div id="dialog-description">
              {dialog === "support" ? (
                <div className="mt-5 space-y-3">
                  <a
                    href="mailto:support@misa.capital"
                    className={`${buttonBase} flex items-center gap-3 border border-[#252D3A] p-4 hover:border-[#FFB52A]/50`}
                  >
                    <span
                      aria-hidden="true"
                      className="text-xl text-[#FFB52A]"
                    >
                      ✉
                    </span>

                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-[#F5F5F5]">
                        Email support
                      </span>

                      <span className="mt-1 block break-all text-xs text-[#A7AFBF]">
                        support@misa.capital
                      </span>
                    </span>

                    <span className="ml-auto text-[#FFB52A]">
                      ↗
                    </span>
                  </a>

                  <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noreferrer"
                    className={`${buttonBase} flex items-center gap-3 border border-[#252D3A] p-4 hover:border-[#FFB52A]/50`}
                  >
                    <span
                      aria-hidden="true"
                      className="text-xl text-[#FFB52A]"
                    >
                      ☏
                    </span>

                    <span>
                      <span className="block text-sm font-semibold text-[#F5F5F5]">
                        WhatsApp
                      </span>

                      <span className="mt-1 block text-xs text-[#A7AFBF]">
                        Open WhatsApp support
                      </span>
                    </span>

                    <span className="ml-auto text-[#FFB52A]">
                      ↗
                    </span>
                  </a>

                  <p className="border-l-2 border-[#FFB52A]/50 pl-3 text-xs leading-6 text-[#A7AFBF]">
                    For account and exchange-rate questions,
                    email our team.
                  </p>

                  <p className="text-[10px] leading-5 text-[#737B89]">
                    Verify the sample email address and replace
                    the generic WhatsApp URL with your official
                    support details before launch.
                  </p>
                </div>
              ) : (
                <div className="mt-5">
                  <div className="border border-[#252D3A] bg-[#0A0F17] p-4 sm:p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A7AFBF]">
                      Amount you send
                    </p>

                    <p className="mt-2 break-words text-lg font-semibold text-[#F5F5F5]">
                      {Number.isFinite(numericAmount) &&
                      numericAmount >= 0
                        ? formatNumber(numericAmount, 4)
                        : "—"}{" "}
                      {base}
                    </p>

                    <div className="my-4 border-t border-[#252D3A]" />

                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A7AFBF]">
                      Estimated recipient amount
                    </p>

                    <p className="mt-2 break-words text-2xl font-semibold text-[#FFB52A] sm:text-3xl">
                      {converted == null
                        ? "Rate unavailable"
                        : `${formatNumber(
                            converted,
                            4,
                          )} ${quote}`}
                    </p>

                    <p className="mt-4 text-xs text-[#A7AFBF]">
                      Reference rate:{" "}
                      {rate == null
                        ? "Unavailable"
                        : `1 ${base} = ${formatNumber(
                            rate,
                            6,
                          )} ${quote}`}
                    </p>
                  </div>

                  <p className="mt-4 text-xs leading-6 text-[#A7AFBF]">
                    {dialog === "rate"
                      ? `Selected currency: ${selectedCurrency}. Rates are indicative mid-market references and may differ from bank or exchange-service rates.`
                      : "This estimate uses the latest rate snapshot loaded in this dashboard. Fees, spreads, and settlement adjustments are not included."}
                  </p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setDialog(null)}
              className={`${buttonBase} mt-6 min-h-12 w-full bg-[#FFB52A] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#050505] hover:bg-[#F59A16]`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function Metric({
  icon,
  label,
  value,
  note,
}: {
  icon: string;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article className={`${panelClass} p-4 sm:p-5`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A7AFBF]">
            {label}
          </p>

          <p className="mt-3 break-words text-2xl font-semibold tracking-tight text-[#F5F5F5] sm:text-[28px]">
            {value}
          </p>

          <p className="mt-2 text-[11px] leading-5 text-[#737B89]">
            {note}
          </p>
        </div>

        <span
          aria-hidden="true"
          className="grid h-10 w-10 shrink-0 place-items-center border border-[#252D3A] bg-[#0A0F17] text-lg text-[#FFB52A]"
        >
          {icon}
        </span>
      </div>
    </article>
  );
}

function CurrencySelect({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  const currency = getCurrency(value);

  return (
    <div className="relative flex min-h-12 min-w-0 items-center gap-2 border border-[#252D3A] bg-[#0D121B] px-3 py-2.5 focus-within:border-[#FFB52A]/60">
      <span aria-hidden="true" className="shrink-0 text-lg">
        {currency?.flag ?? "🌐"}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        className={`${focusRing} min-w-0 flex-1 cursor-pointer appearance-none bg-transparent pr-5 text-sm font-semibold text-[#F5F5F5] outline-none`}
      >
        {CURRENCIES.map((item) => (
          <option key={item.code} value={item.code}>
            {item.code} — {item.name}
          </option>
        ))}
      </select>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 text-xs text-[#737B89]"
      >
        ⌄
      </span>
    </div>
  );
}