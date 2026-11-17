/**
 * ============================================================
 *  SEARCH & SHARING TEXT — titles and descriptions for every page.
 * ============================================================
 * Used by the pages themselves and by scripts/prerender.mjs, which writes
 * a ready-made HTML file per page so Google, WhatsApp and Facebook see the
 * right title, description and preview image without running JavaScript.
 * Keep descriptions under ~155 characters.
 */
import { site } from "./site.ts";

export interface PageSeo {
  /** Short title; the business name is added automatically. "" = home page title. */
  title: string;
  description: string;
}

export const homeTitle = `${site.name} | Customised 3D Gifts, Idols & Keychains in Udaipur`;

export const fullTitle = (title: string): string => (title ? `${title} | ${site.name}` : homeTitle);

export const pageSeo = {
  home: {
    title: "",
    description:
      "Customised 3D designed gifts from Udaipur, Rajasthan: personalised name keychains, idols, festive décor, planters and desk accessories. Retail, wholesale and custom orders.",
  },
  products: {
    title: "Products — Keychains, Idols, Décor & Personalised Gifts",
    description:
      "Browse 3D designed keychains, idols, festive décor, planters, phone stands and personalised gifts. Enquire on WhatsApp for prices, colours and bulk orders.",
  },
  about: {
    title: "About Us — 3D Design Studio in Udaipur",
    description: `${site.name} is a 3D design studio in Udaipur, Rajasthan, making customised idols, décor, keychains and personalised gifts to order.`,
  },
  catalogue: {
    title: "Product Catalogue (PDF)",
    description: `Download the ${site.name} product catalogue: every design with photos and highlights in one PDF. Free to save and share.`,
  },
  contact: {
    title: "Contact Us — WhatsApp, Phone & Email",
    description: `Contact ${site.name} in Udaipur for prices, custom designs and bulk orders. WhatsApp ${site.contact.phone} or email us.`,
  },
} satisfies Record<string, PageSeo>;

export const keywords = [
  "customised gifts Udaipur",
  "personalised gifts",
  "3D printed gifts",
  "3D printing Udaipur",
  "custom name keychain",
  "personalised keychain",
  "Ganesha idol",
  "return gifts",
  "NFC keychain",
  "corporate gifts Rajasthan",
  site.name,
].join(", ");

/** Preview image for a product (made by the build), falling back to the site image. */
export const productOgImage = (slug: string): string => `og/products/${slug}.jpg`;
export const siteOgImage = "og/navin3d-og.jpg";

export const trimDescription = (text: string, max = 155): string =>
  text.length <= max ? text : text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,;:—-]\s*$/, "") + "…";
