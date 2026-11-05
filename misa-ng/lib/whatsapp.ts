export function getWhatsAppUrl(
  message = "Hello MISA NG, I would like to make an enquiry."
) {
  const number =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    process.env.NEXT_PUBLIC_WHATSAPP ||
    "";

  const cleanNumber = number.replace(/\D/g, "");

  if (!cleanNumber) {
    return "https://www.whatsapp.com/";
  }

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}