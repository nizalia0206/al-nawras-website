import { useEffect } from "react";

// The Products / Product Detail / Projects / Careers / Contact pages were
// built as their own standalone design system (brand.css, extra.css,
// luxury.css, motion.css) with global resets (body, h1-h4, a, button, img).
// Loading those globally in main.jsx would override the rest of this site's
// Tailwind styling on every page. Instead, this wrapper attaches the four
// stylesheets to <head> only while one of those pages is mounted, and
// removes them the moment the user navigates away — so Home/About/Systems
// pages are never affected.
const SHEETS = [
  "/catalog-styles/brand.css",
  "/catalog-styles/extra.css",
  "/catalog-styles/luxury.css",
  "/catalog-styles/motion.css",
];

export default function CatalogStyleScope({ children }) {
  useEffect(() => {
    const links = SHEETS.map((href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.dataset.catalogScope = "true";
      document.head.appendChild(link);
      return link;
    });
    return () => {
      links.forEach((link) => document.head.removeChild(link));
    };
  }, []);

  return children;
}
