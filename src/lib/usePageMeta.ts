import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { site } from "../config/site";
import { fullTitle, siteOgImage } from "../config/seo";
import { pageUrl } from "./utils";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/** Same address format the build writes: every page except home ends with "/". */
export const canonicalPath = (pathname: string): string =>
  pathname === "/" || pathname.endsWith("/") ? pathname : `${pathname}/`;

/**
 * Keeps the page <title>, description and sharing tags in step while visitors move
 * between pages. (The first load already has them: see scripts/prerender.mjs.)
 */
export function usePageMeta(title: string, description: string = site.description, image?: string) {
  const { pathname } = useLocation();
  useEffect(() => {
    const full = fullTitle(title);
    document.title = full;
    setMeta("name", "description", description);
    setMeta("property", "og:title", full);
    setMeta("property", "og:description", description);
    setMeta("name", "twitter:title", full);
    setMeta("name", "twitter:description", description);
    const url = pageUrl(canonicalPath(pathname), site.url);
    if (!url) return; // claude.ai preview build: no real page address
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", pageUrl("/" + (image || siteOgImage).replace(/^\/+/, ""), site.url));
    let canon = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement("link");
      canon.rel = "canonical";
      document.head.appendChild(canon);
    }
    canon.href = url;
  }, [title, description, image, pathname]);
}
