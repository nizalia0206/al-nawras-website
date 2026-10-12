import { tx } from "../i18n/tx";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Icon } from "../components/CatalogIcons.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Dropdown from "../components/Dropdown.jsx";
import PageHeader from "../components/PageHeader";
import { CATEGORIES, SUPPLIERS } from "../data/products.js";
import { useLanguage } from "../context/LanguageContext";
import useProducts from "../hooks/useProducts";
import { productsPage } from "../i18n/pagesAr";
import { brandHeaderImage } from "../data/headerImages";

const BRAND_WORDMARK = {
  honeywell: "HW",
  waterfall: "WF",
  teknoware: "TK",
  h3c: "H3C",
  uranus: "UR",
  kdpipes: "KD",
};

export default function Products() {
  const { lang } = useLanguage();
  const ar = productsPage;
  const { products: PRODUCTS, loading: productsLoading } = useProducts();
  const [params, setParams] = useSearchParams();
  const [state, setState] = useState({
    category: params.get("cat") || "all",
    supplier: params.get("supplier") || "all",
    q: params.get("q") || "",
    sort: "relevance",
  });

  // Keep state in sync when the URL changes while already on /products
  // (e.g. header Partners dropdown or footer partner logos -> ?supplier=<brand>).
  // Without this the page is not remounted, so the brand and banner never update.
  useEffect(() => {
    const category = params.get("cat") || "all";
    const supplier = params.get("supplier") || "all";
    const q = params.get("q") || "";
    setState((s) =>
      s.category === category && s.supplier === supplier && s.q === q
        ? s
        : { ...s, category, supplier, q }
    );
  }, [params]);

  useEffect(() => {
    const next = {};
    if (state.category !== "all") next.cat = state.category;
    if (state.supplier !== "all") next.supplier = state.supplier;
    if (state.q) next.q = state.q;
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const list = useMemo(() => {
    const query = state.q.toLowerCase().trim();
    let l = !query
      ? PRODUCTS
      : PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            (p.short || "").toLowerCase().includes(query) ||
            (p.tags || []).some((t) => t.toLowerCase().includes(query)) ||
            (SUPPLIERS[p.supplier]?.name || "").toLowerCase().includes(query)
        );
    if (state.category !== "all") l = l.filter((p) => p.category === state.category);
    if (state.supplier !== "all") l = l.filter((p) => p.supplier === state.supplier);
    if (state.sort === "price-asc") l = [...l].sort((a, b) => a.price - b.price);
    else if (state.sort === "price-desc") l = [...l].sort((a, b) => b.price - a.price);
    else if (state.sort === "name-asc") l = [...l].sort((a, b) => a.name.localeCompare(b.name));
    return l;
  }, [state, PRODUCTS]);

  // When a partner logo (footer strip) or the header's Partners dropdown was clicked,
  // the page arrives with ?supplier=<brand> — show that brand's name in the banner
  // instead of the generic catalog title.
  const activeBrand = state.supplier !== "all" ? SUPPLIERS[state.supplier]?.name : null;

  // Show the brand's name in the browser tab when a partner link brought the visitor here.
  useEffect(() => {
    const prevTitle = document.title;
    if (activeBrand) document.title = `${activeBrand} Products | Al Nawras Safety & Security Systems LLC`;
    return () => {
      document.title = prevTitle;
    };
  }, [activeBrand]);

  return (
    <>
      <PageHeader
        eyebrow={lang === "ar" ? ar.eyebrow : activeBrand ? "Brand Partner" : "Full Catalog"}
        title={
          activeBrand
            ? lang === "ar"
              ? `منتجات ${activeBrand}`
              : `${activeBrand} Products`
            : tx("pages.products.title", lang, "Fire, Life Safety & ICT Products", ar.title)
        }
        desc={
          activeBrand
            ? lang === "ar"
              ? `تصفح كافة منتجات ${activeBrand} المتوفرة والمدعومة من قبل الأنوار للأنظمة الآمنة والأمنية.`
              : `Browse the full range of ${activeBrand} products, supplied, engineered and supported by Al Nawras Safety & Security Systems LLC.`
            : tx("pages.products.desc", lang, "Certified equipment from Honeywell, Waterfall, H3C, Teknoware, Uranus Cable and KD Pipes — supplied, engineered and supported by Al Nawras Safety & Security Systems LLC.", ar.desc)
        }
        crumbs={
          activeBrand
            ? [{ label: tx("pages.products.crumb", lang, "Products", ar.crumb), href: "/products" }, { label: activeBrand }]
            : [{ label: tx("pages.products.crumb", lang, "Products", ar.crumb) }]
        }
        image={brandHeaderImage(state.supplier)}
        vivid
      />
      <section className="bg-ambient products-hero" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <div className="container">
          <div className="search-bar">
            <Icon.search />
            <input
              type="text"
              placeholder={tx("pages.products.searchPlaceholder", lang, "Search products, brands, categories…", ar.searchPlaceholder)}
              value={state.q}
              onChange={(e) => setState((s) => ({ ...s, q: e.target.value }))}
            />
            <button type="button" onClick={() => {}}>{tx("pages.products.search", lang, "Search", ar.search)}</button>
          </div>
        </div>
      </section>

      <section className="supplier-strip">
        <div className="container brand-row">
          {Object.entries(SUPPLIERS).map(([key, s]) => (
            <button
              type="button"
              className={`brand-chip ${state.supplier === key ? "active" : ""}`}
              key={key}
              onClick={() => {
                setState((st) => ({ ...st, supplier: st.supplier === key ? "all" : key }));
                document.getElementById("catalog-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <span className="brand-mark" data-brand={key}>{BRAND_WORDMARK[key] || s.name.slice(0, 2).toUpperCase()}</span>
              <span className="brand-label">{s.name}</span>
            </button>
          ))}
        </div>
      </section>

      <main className="container" id="catalog-results">
        <div className="catalog-toolbar">
          <span className="result-count">
            {lang === "ar"
              ? `${list.length} ${list.length !== 1 ? ar.resultsFoundPlural : ar.resultsFound} ${ar.found}`
              : `${list.length} product${list.length !== 1 ? "s" : ""} found`}
          </span>
          <div className="toolbar-dropdowns">
            <Dropdown
              label={tx("pages.products.categoryLabel", lang, "Category", ar.categoryLabel)}
              value={state.category}
              onChange={(v) => setState((s) => ({ ...s, category: v }))}
              options={[
                { value: "all", label: `${tx("pages.products.allCategories", lang, "All Categories", ar.allCategories)} (${PRODUCTS.length})` },
                ...CATEGORIES.map((c) => ({
                  value: c.id,
                  label: `${c.name} (${PRODUCTS.filter((p) => p.category === c.id).length})`,
                })),
              ]}
            />
            <Dropdown
              label={tx("pages.products.supplierLabel", lang, "Supplier", ar.supplierLabel)}
              value={state.supplier}
              onChange={(v) => setState((st) => ({ ...st, supplier: v }))}
              options={[
                { value: "all", label: `${tx("pages.products.allSuppliers", lang, "All Suppliers", ar.allSuppliers)} (${PRODUCTS.length})` },
                ...Object.entries(SUPPLIERS).map(([id, s]) => ({
                  value: id,
                  label: `${s.name} (${PRODUCTS.filter((p) => p.supplier === id).length})`,
                })),
              ]}
            />
            <Dropdown
              value={state.sort}
              align="right"
              onChange={(v) => setState((s) => ({ ...s, sort: v }))}
              options={[
                { value: "relevance", label: tx("pages.products.sortRelevance", lang, "Sort: Relevance", ar.sortRelevance) },
                { value: "price-asc", label: tx("pages.products.sortPriceAsc", lang, "Price: Low to High", ar.sortPriceAsc) },
                { value: "price-desc", label: tx("pages.products.sortPriceDesc", lang, "Price: High to Low", ar.sortPriceDesc) },
                { value: "name-asc", label: tx("pages.products.sortNameAsc", lang, "Name: A\u2013Z", ar.sortNameAsc) },
              ]}
            />
          </div>
        </div>

        {/* Wait for the CMS catalog to finish loading before showing "No matching products" —
            otherwise, while Supabase is still fetching, the list can briefly be empty and this
            big search-icon empty-state flashes on screen for a moment before real results land. */}
        {list.length === 0 && !productsLoading ? (
          <div className="empty-state">
            <Icon.search />
            <h3>{tx("pages.products.noResultsTitle", lang, "No matching products", ar.noResultsTitle)}</h3>
            <p>{tx("pages.products.noResultsBody", lang, "Try a different search term or clear your filters.", ar.noResultsBody)}</p>
          </div>
        ) : list.length === 0 ? null : (
          <div className="product-grid">
            {list.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </main>
    </>
  );
}
