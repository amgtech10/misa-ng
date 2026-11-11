"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  COUNTRIES,
  DEFAULT_COUNTRY,
  getCountry,
  formatCurrency,
  convertCurrency,
} from "@/lib/currency";

type CurrencyContextType = {
  countryCode: string;
  country: (typeof COUNTRIES)[number];
  currency: string;
  rates: Record<string, number>;
  loading: boolean;
  error: string;
  setCountryCode: (code: string) => void;
  convert: (amount: number, from: string) => number | null;
  format: (amount: number) => string;
};

const CurrencyContext =
  createContext<CurrencyContextType | null>(null);

export function CountryCurrencyProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [countryCode, setCountryCodeState] =
    useState(DEFAULT_COUNTRY);

  const [rates, setRates] = useState<Record<string, number>>({
    USD: 1,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const country = getCountry(countryCode);

  // Restore saved country.
  useEffect(() => {
    const saved = localStorage.getItem("misa-country");

    if (saved && COUNTRIES.some((item) => item.code === saved)) {
      setCountryCodeState(saved);
    }
  }, []);

  // Save country selection.
  const setCountryCode = useCallback((code: string) => {
    const exists = COUNTRIES.some(
      (country) => country.code === code
    );

    if (!exists) return;

    setCountryCodeState(code);
    localStorage.setItem("misa-country", code);
  }, []);

  // Load live reference rates.
  const loadRates = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://open.er-api.com/v6/latest/USD",
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error("Unable to retrieve exchange rates.");
      }

      const data = await response.json();

      if (
        data.result !== "success" ||
        data.base_code !== "USD" ||
        !data.rates
      ) {
        throw new Error("Invalid exchange-rate response.");
      }

      setRates({
        ...data.rates,
        USD: 1,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Exchange rates unavailable."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRates();

    const timer = window.setInterval(
      () => void loadRates(),
      15 * 60 * 1000
    );

    return () => window.clearInterval(timer);
  }, [loadRates]);

  // Convert any source currency to visitor's currency.
  const convert = useCallback(
    (amount: number, from: string) => {
      return convertCurrency(
        amount,
        from,
        country.currency,
        rates
      );
    },
    [country.currency, rates]
  );

  // Format in visitor's currency.
  const format = useCallback(
    (amount: number) => {
      return formatCurrency(amount, country.currency);
    },
    [country.currency]
  );

  const value = useMemo(
    () => ({
      countryCode,
      country,
      currency: country.currency,
      rates,
      loading,
      error,
      setCountryCode,
      convert,
      format,
    }),
    [
      countryCode,
      country,
      rates,
      loading,
      error,
      setCountryCode,
      convert,
      format,
    ]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCountryCurrency() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error(
      "useCountryCurrency must be used inside CountryCurrencyProvider"
    );
  }

  return context;
}