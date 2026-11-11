export type Country = {
  code: string;
  name: string;
  flag: string;
  currency: string;
  symbol: string;
};

export const COUNTRIES: Country[] = [
  { code: "NG", name: "Nigeria", flag: "🇳🇬", currency: "NGN", symbol: "₦" },
  { code: "US", name: "United States", flag: "🇺🇸", currency: "USD", symbol: "$" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", currency: "GBP", symbol: "£" },
  { code: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD", symbol: "$" },
  { code: "AU", name: "Australia", flag: "🇦🇺", currency: "AUD", symbol: "$" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", currency: "AED", symbol: "د.إ" },
  { code: "GH", name: "Ghana", flag: "🇬🇭", currency: "GHS", symbol: "GH₵" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", currency: "ZAR", symbol: "R" },
  { code: "KE", name: "Kenya", flag: "🇰🇪", currency: "KES", symbol: "KSh" },
  { code: "IN", name: "India", flag: "🇮🇳", currency: "INR", symbol: "₹" },
  { code: "CN", name: "China", flag: "🇨🇳", currency: "CNY", symbol: "¥" },
  { code: "JP", name: "Japan", flag: "🇯🇵", currency: "JPY", symbol: "¥" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭", currency: "CHF", symbol: "CHF" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", currency: "SGD", symbol: "S$" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", currency: "SAR", symbol: "﷼" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿", currency: "NZD", symbol: "NZ$" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", currency: "BRL", symbol: "R$" },
  { code: "EU", name: "European Union", flag: "🇪🇺", currency: "EUR", symbol: "€" },
];

export const DEFAULT_COUNTRY = "NG";

export function getCountry(code: string) {
  return COUNTRIES.find((country) => country.code === code)
    ?? COUNTRIES[0];
}

export function formatCurrency(
  amount: number,
  currency: string,
  locale = "en"
) {
  if (!Number.isFinite(amount)) return "—";

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}

export function convertCurrency(
  amount: number,
  from: string,
  to: string,
  rates: Record<string, number>
): number | null {
  if (!Number.isFinite(amount) || amount < 0) {
    return null;
  }

  if (from === to) return amount;

  const fromRate = rates[from];
  const toRate = rates[to];

  if (
    !Number.isFinite(fromRate) ||
    !Number.isFinite(toRate) ||
    !fromRate ||
    !toRate ||
    fromRate <= 0 ||
    toRate <= 0
  ) {
    return null;
  }

  return (amount / fromRate) * toRate;
}