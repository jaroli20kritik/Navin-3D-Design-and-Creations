import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronRight, Download, Mail, Menu, Phone, X } from "lucide-react";
import { Logo } from "../Logo";
import { site } from "../../config/site";
import { asset, cn } from "../../lib/utils";
import { emailLink, generalEnquiryMessage, phoneLink, whatsappLink } from "../../lib/contact";
import { WhatsAppIcon } from "../BrandIcons";

export const navItems = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/catalogue", label: "Catalogue" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { key } = useLocation();
  const wa = whatsappLink(generalEnquiryMessage());

  // Close the phone menu after any navigation, including a tap on the page you are already on.
  useEffect(() => setOpen(false), [key]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled || open ? "border-line bg-white/90 shadow-[0_8px_24px_-20px_rgb(14_26_61/0.45)] backdrop-blur-xl" : "border-transparent bg-paper/70 backdrop-blur",
      )}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Logo onClick={() => setOpen(false)} />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn("relative rounded-full px-4 py-2 text-sm font-medium transition-colors", isActive ? "bg-accent-50 text-accent" : "text-ink-2 hover:bg-ink/5 hover:text-ink")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={asset(site.catalogue.file)} download={site.catalogue.downloadName} className="btn btn-outline hidden px-4 py-2.5 sm:inline-flex">
            <Download className="h-4 w-4" aria-hidden="true" /> Catalogue
          </a>
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp hidden px-4 py-2.5 lg:inline-flex">
              <WhatsAppIcon size={16} /> Enquire
            </a>
          )}
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-t border-line bg-paper transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[calc(100dvh-72px)] overflow-y-auto opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="container-x flex flex-col py-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              tabIndex={open ? 0 : -1}
              className={({ isActive }) =>
                cn("flex items-center justify-between border-b border-line py-4 font-display text-lg font-bold", isActive ? "text-accent" : "text-ink")
              }
            >
              {item.label}
              <ChevronRight className="h-5 w-5 text-muted" aria-hidden="true" />
            </NavLink>
          ))}
          <a href={asset(site.catalogue.file)} download={site.catalogue.downloadName} tabIndex={open ? 0 : -1} className="btn btn-primary mt-5 w-full">
            <Download className="h-4 w-4" aria-hidden="true" /> Download catalogue (PDF)
          </a>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Talk to us</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="btn btn-whatsapp flex-col gap-1 rounded-2xl px-2 py-3 text-xs">
                <WhatsAppIcon size={18} /> WhatsApp
              </a>
            )}
            {site.contact.phone && (
              <a href={phoneLink()} tabIndex={open ? 0 : -1} className="btn btn-outline flex-col gap-1 rounded-2xl px-2 py-3 text-xs">
                <Phone className="h-[18px] w-[18px]" aria-hidden="true" /> Call
              </a>
            )}
            {site.contact.email && (
              <a href={emailLink()} tabIndex={open ? 0 : -1} className="btn btn-outline flex-col gap-1 rounded-2xl px-2 py-3 text-xs">
                <Mail className="h-[18px] w-[18px]" aria-hidden="true" /> Email
              </a>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
