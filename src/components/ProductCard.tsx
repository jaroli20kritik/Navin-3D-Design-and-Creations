import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles, Wand2 } from "lucide-react";
import type { Product } from "../data/products";
import { categoryById } from "../data/categories";
import { site } from "../config/site";
import { productEnquiryMessage, whatsappLink } from "../lib/contact";
import { ProductImage } from "./ProductImage";
import { WhatsAppIcon } from "./BrandIcons";

/**
 * Product card used on the home page, the products page and "You may also like".
 * Two per row on phones, up to four on desktops.
 */
export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const href = `/products/${product.slug}`;
  const category = categoryById(product.categories[0]);
  const wa = whatsappLink(productEnquiryMessage(product.name, product.customizable));
  const colours = product.colors.length > 2 ? `${product.colors.slice(0, 2).join(", ")} +${product.colors.length - 2}` : product.colors.join(", ");

  return (
    <article className="group card relative flex h-full flex-col overflow-hidden transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:ring-accent/25">
      <Link
        to={href}
        className="relative m-1.5 block aspect-square overflow-hidden rounded-[calc(var(--radius-card)-0.375rem)] sm:m-2"
        aria-label={`View ${product.name}`}
        tabIndex={-1}
      >
        <ProductImage
          src={product.images[0]}
          alt={`${product.name} — ${category?.name ?? "3D designed product"}`}
          priority={priority}
          className="absolute inset-0"
          imgClassName="group-hover:scale-[1.05]"
        />
        {product.images[1] && (
          <ProductImage
            src={product.images[1]}
            alt=""
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 max-md:hidden"
          />
        )}
        <div className="absolute inset-x-2 top-2 flex flex-wrap gap-1.5 sm:inset-x-3 sm:top-3">
          {product.isNew && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink shadow-sm sm:px-2.5 sm:py-1 sm:text-[11px]">
              <Sparkles className="h-3 w-3" aria-hidden="true" /> New
            </span>
          )}
        </div>
        {product.customizable && (
          <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-accent shadow-sm backdrop-blur sm:bottom-3 sm:left-3 sm:px-2.5 sm:py-1 sm:text-[11px]">
            <Wand2 className="h-3 w-3" aria-hidden="true" /> Customisable
          </span>
        )}
        <span className="absolute right-3 top-3 hidden h-9 w-9 place-items-center rounded-full bg-white/95 text-ink opacity-0 shadow-sm backdrop-blur transition duration-300 group-hover:opacity-100 md:grid">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-2 px-3 pb-3 pt-2 sm:gap-2.5 sm:px-5 sm:pb-5 sm:pt-3">
        <p className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-600 sm:text-[11px]">{category?.name}</p>
        <h3 className="line-clamp-2 min-h-[2.5em] text-[15px] font-bold leading-snug sm:text-[17px]">
          <Link to={href} className="after:absolute after:inset-0 after:content-[''] hover:text-accent focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        <p className="hidden text-sm leading-relaxed text-muted sm:line-clamp-2">{product.shortDescription}</p>
        {colours && (
          <p className="truncate text-xs text-muted">
            <span className="sr-only">Colours: </span>
            <span aria-hidden="true" className="mr-1 inline-block h-2 w-2 rounded-full bg-gold align-middle" />
            {colours}
          </p>
        )}
        <div className="mt-auto flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-2">
          <span className="text-[13px] font-bold text-ink sm:text-sm">{product.price || site.priceOnRequest}</span>
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp relative z-10 min-h-10 w-full px-3.5 py-2 text-xs sm:w-auto"
              aria-label={`Enquire about ${product.name} on WhatsApp`}
            >
              <WhatsAppIcon size={15} /> Enquire
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden" aria-hidden="true">
      <div className="skeleton m-2 aspect-square rounded-xl" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-3 w-1/3 rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-8 w-full rounded-full" />
      </div>
    </div>
  );
}
