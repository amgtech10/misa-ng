import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

import WhatsAppButton from "@/components/WhatsAppButton";
import { CountryCurrencyProvider } from "@/components/CurrencyProvider";

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MISA. LTD | Property, Investment & Developer Partnerships",
  description:
    "Commission-based property agency in Nigeria: property listings, real estate and finance news, developer onboarding, and investment opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <CountryCurrencyProvider>
          {children}
          <WhatsAppButton />
        </CountryCurrencyProvider>
      </body>
    </html>
  );
}