"use client";

import { COUNTRIES } from "@/lib/currency";
import { useCountryCurrency } from "./CurrencyProvider";

export default function CountrySelector() {
  const {
    country,
    countryCode,
    setCountryCode,
  } = useCountryCurrency();

  return (
    <div className="relative flex items-center gap-2 border border-[#252D3A] bg-[#0D121B] px-3 py-2 transition-colors hover:border-[#FFB52A]/50">

      <span className="text-lg" aria-hidden="true">
        {country.flag}
      </span>

      <select
        aria-label="Select your country and currency"
        value={countryCode}
        onChange={(event) =>
          setCountryCode(event.target.value)
        }
        className="max-w-[145px] cursor-pointer appearance-none bg-transparent pr-4 text-xs font-semibold text-[#F5F5F5] outline-none focus-visible:ring-2 focus-visible:ring-[#FFB52A]"
      >
        {COUNTRIES.map((item) => (
          <option
            key={item.code}
            value={item.code}
            className="bg-[#0D121B] text-white"
          >
            {item.name}
          </option>
        ))}
      </select>

      <span className="pointer-events-none text-[10px] text-[#FFB52A]">
        {country.currency}⌄
      </span>
    </div>
  );
}