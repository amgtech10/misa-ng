import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactPageClient from "@/components/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us | MISA LTD",
  description:
    "Get in touch with MISA LTD for property enquiries, investment opportunities, developer partnerships and real estate advisory services across Nigeria.",
  openGraph: {
    title: "Contact MISA LTD",
    description:
      "Let's discuss your next property or investment opportunity.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
        <ContactPageClient />
      </main>
      <Footer />
    </>
  );
}