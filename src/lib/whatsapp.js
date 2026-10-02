import { personalInfo, whatsappMessages } from "../data/personal";

const number = personalInfo.whatsapp.replace(/\D/g, "");

if (import.meta.env.DEV && !number) {
  console.warn("[portfolio] Preencha personalInfo.whatsapp em src/data/personal.js");
}

/** Link do WhatsApp com mensagem pronta. */
export function whatsappLink(message = whatsappMessages.default) {
  const base = number ? `https://wa.me/${number}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(message)}`;
}
