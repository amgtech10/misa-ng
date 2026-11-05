import { FaWhatsapp } from "react-icons/fa6";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppUrl(
        "Hello MISA NG, I would like to enquire about your property and investment opportunities."
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with MISA NG LTD on WhatsApp"
      title="Chat with us on WhatsApp"
      className="
        group fixed
        bottom-[calc(1.25rem+env(safe-area-inset-bottom))]
        right-4
        z-[60]
        flex h-12 w-12
        items-center justify-center
        rounded-full
        border border-[#FFB52A]
        bg-[#FFB52A]
        text-[#050505]
        shadow-[0_8px_30px_rgba(245,154,22,0.20)]
        transition-[transform,box-shadow,background-color]
        duration-300
        hover:scale-105
        hover:bg-[#FFD078]
        hover:shadow-[0_8px_35px_rgba(245,154,22,0.35)]
        motion-reduce:transition-none
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#FFB52A]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#050505]
        sm:right-6
        sm:h-14
        sm:w-14
      "
    >
      <FaWhatsapp
        aria-hidden="true"
        className="text-2xl transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
      />

      <span className="sr-only">
        Chat with MISA NG LTD
      </span>
    </a>
  );
}