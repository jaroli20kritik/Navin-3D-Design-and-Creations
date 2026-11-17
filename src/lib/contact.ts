import { site } from "../config/site";

const digits = (s: string) => s.replace(/\D/g, "");

/** wa.me link with an optional pre-filled message. "" when no number is configured. */
export const whatsappLink = (message?: string): string => {
  const n = digits(site.contact.whatsapp);
  if (!n) return "";
  return `https://wa.me/${n}` + (message ? `?text=${encodeURIComponent(message)}` : "");
};

export const phoneLink = (): string => (site.contact.phone ? `tel:${site.contact.phone.replace(/[^\d+]/g, "")}` : "");

export const emailLink = (subject?: string, body?: string): string => {
  if (!site.contact.email) return "";
  const q = new URLSearchParams();
  if (subject) q.set("subject", subject);
  if (body) q.set("body", body);
  const qs = q.toString().replace(/\+/g, "%20");
  return `mailto:${site.contact.email}${qs ? `?${qs}` : ""}`;
};

/* ------------------------------------------------------------
   Ready-to-send WhatsApp messages.
   Every enquiry button opens WhatsApp with one of these already typed in,
   so the customer only taps Send (after filling in the ✅ lines if they like).
   Edit the wording here and it changes everywhere on the site.
   ------------------------------------------------------------ */

const greeting = () => `Hello ${site.name}! 🙏`;

/** Product cards and product pages. */
export const productEnquiryMessage = (name: string, customizable = false): string =>
  [
    greeting(),
    `I'm interested in the *${name}*. Please share the price details.`,
    "",
    "✅ Quantity: ",
    "✅ Colour: ",
    ...(customizable ? ["✅ Name / text to print: "] : []),
    "✅ City: ",
  ].join("\n");

/** Floating WhatsApp button, navigation, footer and contact page. */
export const generalEnquiryMessage = (): string =>
  [
    greeting(),
    "I'd like to know more about your products. Please share the price details.",
    "",
    "✅ Product I'm interested in: ",
    "✅ Quantity: ",
    "✅ City: ",
  ].join("\n");

/** "Request a custom order" buttons. */
export const customOrderMessage = (): string =>
  [
    greeting(),
    "I'd like a custom / bulk order.",
    "",
    "✅ What I need: ",
    "✅ Quantity: ",
    "✅ Colours: ",
    "✅ City: ",
    "✅ Needed by (date): ",
  ].join("\n");

/** Catalogue page "Ask us for it" button. */
export const catalogueRequestMessage = (): string =>
  `${greeting()}\nPlease send me your latest product catalogue.`;
