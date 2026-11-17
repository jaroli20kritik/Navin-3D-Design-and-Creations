/**
 * Runs after `vite build`. For every page of the site it writes
 *   dist/<page>/index.html
 * with that page's own <title>, description, canonical link, Open Graph /
 * Twitter tags and structured data, so that:
 *   - WhatsApp, Facebook, LinkedIn and X show a proper preview when a link is shared
 *   - GitHub Pages serves every page with status 200 (Google indexes them)
 * It also writes sitemap.xml, robots.txt and 404.html.
 *
 * Product data is read straight from src/ (Node 22 runs TypeScript files directly).
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { site } from "../src/config/site.ts";
import { products } from "../src/data/products.ts";
import { categoryById } from "../src/data/categories.ts";
import { fullTitle, pageSeo, keywords, productOgImage, siteOgImage, trimDescription } from "../src/config/seo.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const template = readFileSync(join(dist, "index.html"), "utf8");
const base = (process.env.BASE_PATH || "/").replace(/\/?$/, "/");
const siteUrl = site.url.replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const abs = (path) => `${siteUrl}/${path.replace(/^\/+/, "")}`;
const fileExists = (publicPath) => existsSync(join(dist, publicPath));

const sameAs = Object.values(site.social).filter(Boolean);
const business = {
  "@type": "Store",
  "@id": `${siteUrl}/#business`,
  name: site.name,
  description: pageSeo.home.description,
  url: `${siteUrl}/`,
  image: abs(siteOgImage),
  logo: abs("apple-touch-icon.png"),
  telephone: site.contact.phone || undefined,
  email: site.contact.email || undefined,
  address: { "@type": "PostalAddress", addressLocality: "Udaipur", addressRegion: "Rajasthan", addressCountry: "IN" },
  areaServed: "IN",
  ...(sameAs.length ? { sameAs } : {}),
};

/** @type {{ path: string, title: string, description: string, image: string, imageAlt: string, type?: string, jsonld: object[], priority: string, preload?: string }[]} */
const pages = [
  {
    path: "/",
    ...pageSeo.home,
    image: siteOgImage,
    imageAlt: `${site.name} — customised 3D designed gifts, idols and keychains`,
    jsonld: [business, { "@type": "WebSite", name: site.name, url: `${siteUrl}/` }],
    priority: "1.0",
    preload: "images/products/ganesha-kumkum-chawal-dibbi/1.webp",
  },
  { path: "/products/", ...pageSeo.products, image: siteOgImage, imageAlt: `${site.name} products`, jsonld: [], priority: "0.9" },
  { path: "/catalogue/", ...pageSeo.catalogue, image: siteOgImage, imageAlt: `${site.name} product catalogue`, jsonld: [], priority: "0.7" },
  { path: "/about/", ...pageSeo.about, image: siteOgImage, imageAlt: `About ${site.name}`, jsonld: [business], priority: "0.6" },
  { path: "/contact/", ...pageSeo.contact, image: siteOgImage, imageAlt: `Contact ${site.name}`, jsonld: [business], priority: "0.7" },
  ...products.map((p) => {
    const cat = categoryById(p.categories[0]);
    const image = fileExists(productOgImage(p.slug)) ? productOgImage(p.slug) : p.images[0] || siteOgImage;
    return {
      path: `/products/${p.slug}/`,
      title: p.name,
      description: trimDescription(`${p.shortDescription} ${p.description}`),
      image,
      imageAlt: `${p.name} by ${site.name}`,
      type: "product",
      priority: "0.8",
      preload: p.images[0],
      jsonld: [
        {
          "@type": "Product",
          name: p.name,
          description: p.description,
          image: p.images.map(abs),
          category: cat?.name,
          brand: { "@type": "Brand", name: site.name },
          ...(p.colors.length ? { color: p.colors.join(", ") } : {}),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
            { "@type": "ListItem", position: 2, name: "Products", item: `${siteUrl}/products/` },
            { "@type": "ListItem", position: 3, name: p.name, item: `${siteUrl}/products/${p.slug}/` },
          ],
        },
      ],
    };
  }),
];

function headFor(page) {
  const title = fullTitle(page.title);
  const url = `${siteUrl}${page.path}`;
  const img = abs(page.image);
  const isJpg = /\.jpe?g$/i.test(page.image);
  const lines = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<meta name="keywords" content="${esc(keywords)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:type" content="${page.type === "product" ? "product" : "website"}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(img)}" />`,
    `<meta property="og:image:secure_url" content="${esc(img)}" />`,
    ...(isJpg ? [`<meta property="og:image:type" content="image/jpeg" />`, `<meta property="og:image:width" content="1200" />`, `<meta property="og:image:height" content="630" />`] : []),
    `<meta property="og:image:alt" content="${esc(page.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${esc(img)}" />`,
  ];
  if (page.preload) lines.push(`<link rel="preload" as="image" href="${esc(base + page.preload.replace(/^\/+/, ""))}" fetchpriority="high" />`);
  if (page.jsonld.length) {
    const data = { "@context": "https://schema.org", "@graph": page.jsonld };
    lines.push(`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`);
  }
  return lines.join("\n    ");
}

const SEO_BLOCK = /<!-- seo:start[\s\S]*?<!-- seo:end -->/;
if (!SEO_BLOCK.test(template)) throw new Error("prerender: seo:start/seo:end markers not found in dist/index.html");

for (const page of pages) {
  const html = template.replace(SEO_BLOCK, headFor(page));
  const out = join(dist, page.path, "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}

// 404.html: GitHub Pages serves it for unknown addresses; the app then shows its own "not found" page.
writeFileSync(
  join(dist, "404.html"),
  template.replace(SEO_BLOCK, `<title>${esc(fullTitle("Page not found"))}</title>\n    <meta name="robots" content="noindex" />`),
);

writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    pages.map((p) => `  <url><loc>${siteUrl}${p.path}</loc><lastmod>${today}</lastmod><priority>${p.priority}</priority></url>`).join("\n") +
    `\n</urlset>\n`,
);

writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

console.log(`prerender: wrote ${pages.length} pages, 404.html, sitemap.xml and robots.txt`);
