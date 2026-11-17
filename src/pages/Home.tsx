import { Link } from "react-router-dom";
import {
  ArrowRight, Boxes, Download, Gift, Layers, MapPin, MessageCircle, Palette, PenTool, Sparkles, Truck, Wand2,
} from "lucide-react";
import { site } from "../config/site";
import { products } from "../data/products";
import { categories } from "../data/categories";
import { ProductCard } from "../components/ProductCard";
import { ProductImage } from "../components/ProductImage";
import { SectionHeading } from "../components/Common";
import { Reveal } from "../components/Reveal";
import { CatalogueBand } from "../components/CatalogueBand";
import { WhatsAppIcon } from "../components/BrandIcons";
import { usePageMeta } from "../lib/usePageMeta";
import { pageSeo } from "../config/seo";
import { customOrderMessage, generalEnquiryMessage, whatsappLink } from "../lib/contact";
import { asset } from "../lib/utils";

const featured = products.filter((p) => p.featured).slice(0, 8);

export default function Home() {
  usePageMeta(pageSeo.home.title, pageSeo.home.description);
  const customWa = whatsappLink(customOrderMessage());

  return (
    <>
      <Hero />
      <TrustStrip />

      {/* Featured */}
      <section className="container-x py-20 sm:py-24" aria-labelledby="featured-h">
        <SectionHeading
          eyebrow="Featured"
          title={<span id="featured-h">Pieces people ask about most</span>}
          description="Idols, festive décor and personalised keychains, crafted with fine, detailed 3D designs."
          action={<Link to="/products" className="btn btn-outline shrink-0">All products <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 70} className="h-full"><ProductCard product={p} /></Reveal>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-line bg-white py-20 sm:py-24" aria-labelledby="cat-h">
        <div className="container-x">
          <SectionHeading eyebrow="Shop by category" title={<span id="cat-h">Find the right piece</span>} align="center" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {categories.map((c, i) => {
              const count = products.filter((p) => p.categories.includes(c.id)).length;
              return (
                <Reveal key={c.id} delay={(i % 3) * 70}>
                  <Link
                    to={`/products?category=${c.id}`}
                    className="group relative block aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] sm:aspect-[4/3]"
                  >
                    <ProductImage src={c.cover} alt="" className="absolute inset-0" imgClassName="group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" aria-hidden="true" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-6">
                      <div>
                        <h3 className="text-base font-bold text-white sm:text-xl">{c.name}</h3>
                        <p className="mt-1 text-xs text-white/75 sm:text-sm">{count} {count === 1 ? "design" : "designs"}</p>
                        <p className="mt-2 hidden max-w-xs text-sm leading-snug text-white/80 lg:line-clamp-2">{c.description}</p>
                      </div>
                      <span className="hidden h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-ink transition group-hover:bg-gold group-hover:text-ink sm:grid">
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="container-x py-20 sm:py-24" aria-labelledby="why-h">
        <SectionHeading
          eyebrow="Why Navin 3D"
          title={<span id="why-h">Made here, made for you</span>}
          description="A small studio in Udaipur that designs and prints every piece itself, so we can change the details you care about."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: MapPin, title: "Designed & printed in Udaipur", text: "Every piece is modelled and printed by us, not resold from elsewhere." },
            { icon: Wand2, title: "Personal by design", text: "Names, initials, colours and profile links — printed for one person or a whole team." },
            { icon: Layers, title: "Fine, visible detail", text: "Crowns, jewellery, lettering and lattices captured in fine 3D detail." },
            { icon: Boxes, title: "Retail to wholesale", text: "Single gifts, return-gift sets and bulk orders for shops and events." },
          ].map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 70}>
              <div className="card h-full p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-50 text-accent ring-1 ring-accent/10"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Customisation & bulk */}
      <section id="custom" className="bg-white py-20 sm:py-24" aria-labelledby="custom-h">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="grid grid-cols-2 gap-4">
              <ProductImage src="images/products/initial-name-keychain/1.webp" alt="Initial and name keychain printed to order" className="aspect-[4/5] rounded-[var(--radius-card)]" />
              <div className="grid gap-4">
                <ProductImage src="images/products/custom-name-keychain/1.webp" alt="Custom name keychains in two colours" className="aspect-square rounded-[var(--radius-card)]" />
                <ProductImage src="images/products/nfc-instagram-keychain/1.webp" alt="NFC Instagram keychain" className="aspect-square rounded-[var(--radius-card)]" />
              </div>
            </div>
          </Reveal>
          <div>
            <p className="eyebrow mb-3">Customisation & bulk orders</p>
            <h2 id="custom-h" className="text-3xl font-extrabold sm:text-4xl lg:text-[44px] lg:leading-[1.08]">Have an idea? We'll print it.</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Send us a name, a sketch, a photo or a reference product. We'll tell you what's possible, the colours we can do and a price.
            </p>
            <ol className="mt-8 space-y-5">
              {[
                { icon: MessageCircle, title: "Tell us what you need", text: "Share your idea, quantity and date on WhatsApp or the contact form." },
                { icon: PenTool, title: "We design it in 3D", text: "We model or adapt the design and confirm details with you." },
                { icon: Palette, title: "Printed in your colours", text: "Printed, finished by hand and checked before it leaves." },
                { icon: Truck, title: "Picked up or delivered", text: "Single pieces or bulk sets for gifting, events and shops." },
              ].map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="flex gap-4">
                  <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-50 text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 font-display text-[10px] font-bold text-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <div>
                    <h3 className="font-bold"><span className="sr-only">Step {i + 1}: </span>{title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-9 flex flex-wrap gap-3">
              {customWa && (
                <a href={customWa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  <WhatsAppIcon size={18} /> Request a custom order
                </a>
              )}
              <Link to="/contact" className="btn btn-outline">Use the enquiry form</Link>
            </div>
          </div>
        </div>
      </section>

      <CatalogueBand />

      {/* Enquiry CTA */}
      <section className="container-x pb-24" aria-labelledby="cta-h">
        <div className="card flex flex-col items-start gap-6 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 id="cta-h" className="text-2xl font-extrabold sm:text-3xl">Looking for something specific?</h2>
            <p className="mt-3 text-muted">Ask about prices, colours, gifting sets or a design you don't see here. WhatsApp is the quickest way to reach us.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {whatsappLink() && (
              <a href={whatsappLink(generalEnquiryMessage())} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <WhatsAppIcon size={18} /> WhatsApp us
              </a>
            )}
            <Link to="/contact" className="btn btn-primary">Contact us <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Hero() {
  const heroImgs = ["images/products/ganesha-kumkum-chawal-dibbi/1.webp", "images/products/bal-krishna-flute-keychain/1.webp", "images/products/flexi-octopus-keychain/1.webp"];
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -right-40 -top-10 h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgb(14 26 61 / 0.045) 1px, transparent 1px), linear-gradient(90deg, rgb(14 26 61 / 0.045) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at 30% 20%, black 20%, transparent 75%)",
          }}
        />
      </div>
      <div className="container-x grid grid-cols-1 items-center gap-10 pb-14 pt-8 sm:pb-16 sm:pt-14 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pb-20 lg:pt-14 xl:gap-16 [&>*]:min-w-0">
        <div>
          <p className="inline-flex animate-rise items-center gap-2 rounded-full border border-gold/40 bg-gold-50 px-3 py-1.5 text-xs font-semibold text-gold-600">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> 3D design studio · Udaipur, Rajasthan
          </p>
          <h1 className="mt-5 animate-rise text-[2.35rem] font-extrabold leading-[1.05] min-[400px]:text-[2.6rem] sm:mt-6 sm:text-6xl lg:text-[3.4rem] xl:text-[4rem] 2xl:text-[4.4rem] [animation-delay:60ms]">
            Bring Your Ideas to Life with{" "}
            <span className="relative inline-block whitespace-nowrap text-accent">
              3D Designs
              <svg className="absolute -bottom-1.5 left-0 h-2.5 w-full text-gold" viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 7 C 50 2, 150 2, 198 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-6 max-w-xl animate-rise text-base leading-relaxed text-muted sm:text-lg [animation-delay:120ms]">
            Customised idols, festive décor, planters, desk accessories and personalised keychains — designed and printed to order in Udaipur, from a single gift to a bulk set.
          </p>
          <div className="mt-8 grid animate-rise grid-cols-1 gap-3 min-[420px]:flex min-[420px]:flex-wrap sm:mt-9 [animation-delay:180ms]">
            <Link to="/products" className="btn btn-primary px-6 py-3.5 text-[15px]">Explore products <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <a href={asset(site.catalogue.file)} download={site.catalogue.downloadName} className="btn btn-outline px-6 py-3.5 text-[15px]">
              <Download className="h-4 w-4" aria-hidden="true" /> Download catalogue
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] animate-rise [animation-delay:150ms] lg:max-w-[min(560px,calc(100dvh-11rem))]">
          <div className="grid aspect-[5/4] grid-cols-[1.25fr_1fr] grid-rows-2 gap-3 sm:gap-4">
            <ProductImage src={heroImgs[0]} alt="Ganesha Kumkum Chawal Dibbi, a 3D designed pooja piece in ivory" priority className="row-span-2 h-full rounded-[1.75rem] shadow-[var(--shadow-lift)] ring-1 ring-white/60" />
            <ProductImage src={heroImgs[1]} alt="Bal Krishna flute keychain" priority className="h-full rounded-[1.4rem] shadow-[var(--shadow-soft)]" />
            <ProductImage src={heroImgs[2]} alt="Flexi octopus fidget keychain" priority className="h-full rounded-[1.4rem] shadow-[var(--shadow-soft)]" />
          </div>
          <div className="absolute -left-2 bottom-6 flex animate-float items-center gap-3 rounded-2xl bg-white/95 p-2.5 pr-4 shadow-[var(--shadow-lift)] ring-1 ring-line backdrop-blur sm:-left-8 sm:bottom-10 sm:p-3 sm:pr-4">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-white sm:h-10 sm:w-10"><Gift className="h-5 w-5" aria-hidden="true" /></span>
            <span className="text-xs leading-tight sm:text-sm"><b className="block font-display">Personalised gifts</b><span className="text-muted">Names, initials, colours</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Quick facts under the hero (all from the site's own data). */
function TrustStrip() {
  const items = [
    { icon: Layers, value: `${products.length} designs`, label: `in ${categories.length} categories` },
    { icon: Wand2, value: "Personalised", label: "names, initials & colours" },
    { icon: Boxes, value: "Retail & bulk", label: "gifts, events and shops" },
    { icon: MapPin, value: "Made in Udaipur", label: "designed & printed by us" },
  ];
  return (
    <section aria-label="Why customers choose us" className="border-y border-line bg-white">
      <ul className="container-x grid grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, value, label }, i) => (
          <li
            key={value}
            className={
              "flex items-center gap-3 py-5 sm:gap-4 sm:py-6 " +
              (i % 2 === 1 ? "border-l border-line pl-4 sm:pl-6 " : "pr-3 ") +
              (i === 2 ? "lg:border-l lg:border-line lg:pl-6 " : "") +
              (i < 2 ? "border-b border-line lg:border-b-0" : "")
            }
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-50 text-gold-600 sm:h-11 sm:w-11">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 leading-tight">
              <b className="block font-display text-sm font-bold text-ink sm:text-base">{value}</b>
              <span className="text-xs text-muted sm:text-sm">{label}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
