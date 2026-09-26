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
import headerImage from "../assets/page-headers/products.jpg";

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
            : lang === "ar"
            ? ar.title
            : "Fire, Life Safety & ICT Products"
        }
        desc={
          activeBrand
            ? lang === "ar"
              ? `تصفح كافة منتجات ${activeBrand} المتوفرة والمدعومة من قبل الأنوار للأنظمة الآمنة والأمنية.`
              : `Browse the full range of ${activeBrand} products, supplied, engineered and supported by Al Nawras Safety & Security Systems LLC.`
            : lang === "ar"
            ? ar.desc
            : "Certified equipment from Honeywell, Waterfall, H3C, Teknoware, Uranus Cable and KD Pipes — supplied, engineered and supported by Al Nawras Safety & Security Systems LLC."
        }
        crumbs={
          activeBrand
            ? [{ label: lang === "ar" ? ar.crumb : "Products", href: "/products" }, { label: activeBrand }]
            : [{ label: lang === "ar" ? ar.crumb : "Products" }]
        }
        image={headerImage}
      />
      <section className="bg-ambient products-hero" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <div className="container">
          <div className="search-bar">
            <Icon.search />
            <input
              type="text"
              placeholder={lang === "ar" ? ar.searchPlaceholder : "Search products, brands, categories…"}
              value={state.q}
              onChange={(e) => setState((s) => ({ ...s, q: e.target.value }))}
            />
            <button type="button" onClick={() => {}}>{lang === "ar" ? ar.search : "Search"}</button>
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
              label={lang === "ar" ? ar.categoryLabel : "Category"}
              value={state.category}
              onChange={(v) => setState((s) => ({ ...s, category: v }))}
              options={[
                { value: "all", label: `${lang === "ar" ? ar.allCategories : "All Categories"} (${PRODUCTS.length})` },
                ...CATEGORIES.map((c) => ({
                  value: c.id,
                  label: `${c.name} (${PRODUCTS.filter((p) => p.category === c.id).length})`,
                })),
              ]}
            />
            <Dropdown
              label={lang === "ar" ? ar.supplierLabel : "Supplier"}
              value={state.supplier}
              onChange={(v) => setState((st) => ({ ...st, supplier: v }))}
              options={[
                { value: "all", label: `${lang === "ar" ? ar.allSuppliers : "All Suppliers"} (${PRODUCTS.length})` },
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
                { value: "relevance", label: lang === "ar" ? ar.sortRelevance : "Sort: Relevance" },
                { value: "price-asc", label: lang === "ar" ? ar.sortPriceAsc : "Price: Low to High" },
                { value: "price-desc", label: lang === "ar" ? ar.sortPriceDesc : "Price: High to Low" },
                { value: "name-asc", label: lang === "ar" ? ar.sortNameAsc : "Name: A\u2013Z" },
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
            <h3>{lang === "ar" ? ar.noResultsTitle : "No matching products"}</h3>
            <p>{lang === "ar" ? ar.noResultsBody : "Try a different search term or clear your filters."}</p>
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
