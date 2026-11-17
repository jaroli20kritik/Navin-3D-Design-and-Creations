import { Suspense, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "../WhatsAppFloat";
import { ErrorBoundary, PageLoader } from "../Common";

function ScrollManager() {
  const { pathname, search, hash, key } = useLocation();
  const prev = useRef({ pathname, search, key });
  useEffect(() => {
    const last = prev.current;
    prev.current = { pathname, search, key };
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
    }
    if (pathname !== last.pathname) {
      // New page: start at the top.
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    } else if (key !== last.key && search === last.search) {
      // Link to the page you're already on (e.g. the logo on the home page): glide back to the top.
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    }
    // Only the filters/search changed (Products page): keep the scroll position.
  }, [pathname, search, hash, key]);
  return null;
}

export function Layout() {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main" className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main" className="flex-1">
        <ErrorBoundary key={pathname}>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
