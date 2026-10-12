import { tx } from "../i18n/tx";
import { useSiteSettings, waNumber } from "../context/SiteSettingsContext";
import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Icon } from "../components/CatalogIcons.jsx";
import Reveal from "../components/Reveal.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { CATEGORIES, SUPPLIERS } from "../data/products.js";
import { useLanguage } from "../context/LanguageContext";
import { productDetailPage } from "../i18n/pagesAr";
import useProducts from "../hooks/useProducts";

function suggestionsFor(product, PRODUCTS, count = 4) {
  const sameCat = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category);
  const sameSup = PRODUCTS.filter(
    (p) => p.id !== product.id && p.supplier === product.supplier && p.category !== product.category
  );
  const pool = [...sameCat, ...sameSup];
  const seen = new Set();
  const out = [];
  for (const p of pool) {
    if (seen.has(p.id)) continue;
    seen.add(p.id);
    out.push(p);
    if (out.length >= count) break;
  }
  return out;
}

export default function ProductDetail() {
  const { lang } = useLanguage();
  const ar = productDetailPage;
  const { id } = useParams();
  const { whatsapp } = useSiteSettings();
  const { products: PRODUCTS, loading } = useProducts();

  const product = PRODUCTS.find((p) => p.id === id);
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    setImgIdx(0);
    setQty(1);
    setTab("overview");
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    if (loading) return null;
    return (
      <div className="container" style={{ padding: "100px 20px", textAlign: "center" }}>
        <h2>{tx("pages.productDetail.productNotFound", lang, "Product not found", ar.productNotFound)}</h2>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: 16 }}>{tx("pages.productDetail.backToProducts", lang, "Back to Products", ar.backToProducts)}</Link>
      </div>
    );
  }

  const categoryName = CATEGORIES.find((c) => c.id === product.category)?.name;
  const suggestions = suggestionsFor(product, PRODUCTS, 4);

  return (
    <>
      <div className="container" style={{ paddingTop: 22 }}>
        <div className="breadcrumb">
          <Link to="/products">{tx("pages.productDetail.breadcrumbProducts", lang, "Products", ar.breadcrumbProducts)}</Link><span className="sep">/</span>
          <span style={{ color: "var(--slate-700)" }}>{categoryName}</span><span className="sep">/</span>
          <span style={{ color: "var(--navy-900)", fontWeight: 700 }}>{product.name}</span>
        </div>
      </div>

      <main className="detail-wrap">
        <div className="container">
          <div className="detail-grid">
            <div className="gallery">
              <div className="gallery-main">
                <img src={product.images[imgIdx]} alt={product.name} />
              </div>
              {product.images.length > 1 && (
                <div className="gallery-thumbs">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      className={i === imgIdx ? "active" : ""}
                      onClick={() => setImgIdx(i)}
                    >
                      <img src={img} alt={`View ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="detail-info">
              <div className="supplier-line">
                <span className="chip chip-navy">{SUPPLIERS[product.supplier]?.name}</span>
                <span className="chip chip-flame">{categoryName}</span>
              </div>
              <h1>{product.name}</h1>
              <p className="short-desc">{product.short}</p>
              <div className="stock-row"><span className="stock-dot" /> {tx("pages.productDetail.inStock", lang, "In stock — ships from UAE warehouse", ar.inStock)}</div>

              <div className="qty-row">
                <div className="qty-control">
                  <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}><Icon.minus /></button>
                  <span>{qty}</span>
                  <button aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}><Icon.plus /></button>
                </div>
                <span style={{ fontSize: 13, color: "var(--slate-500)" }}>{tx("pages.productDetail.units", lang, "units", ar.units)}</span>
              </div>

              <div className="action-row">
                <a
                  className="btn btn-flame"
                  href={`https://wa.me/${waNumber(whatsapp)}?text=${encodeURIComponent(`Hi Al Nawras, I'd like to get a quote for ${product.name} (${qty} unit${qty > 1 ? "s" : ""}).`)}`}
                  target="_blank" rel="noopener noreferrer"
                >
                  <Icon.phone /> {tx("pages.productDetail.get_quote", lang, "Get Quote", "احصل على عرض سعر")}
                </a>
              </div>

              <ul className="assurance-list">
                <li><Icon.check /> {tx("pages.productDetail.assurance1", lang, "Genuine products, backed by Al Nawras support", ar.assurance1)}</li>
                <li><Icon.check /> {tx("pages.productDetail.assurance2", lang, "Bulk & project pricing available", ar.assurance2)}</li>
                <li><Icon.check /> {tx("pages.productDetail.assurance3", lang, "Delivery & installation across the UAE", ar.assurance3)}</li>
              </ul>

              <div className="trust-badges">
                <div className="trust-badge"><Icon.shield /> {tx("pages.productDetail.trust1", lang, "Certified & UL/FM listed", ar.trust1)}</div>
                <div className="trust-badge"><Icon.check /> {tx("pages.productDetail.trust2", lang, "Local warranty support", ar.trust2)}</div>
              </div>

              <div className="tabs">
                <button className={`tab-btn ${tab === "overview" ? "active" : ""}`} onClick={() => setTab("overview")}>{tx("pages.productDetail.tabOverview", lang, "Overview", ar.tabOverview)}</button>
                <button className={`tab-btn ${tab === "specs" ? "active" : ""}`} onClick={() => setTab("specs")}>{tx("pages.productDetail.tabSpecs", lang, "Specifications", ar.tabSpecs)}</button>
              </div>
              <div className={`tab-panel ${tab === "overview" ? "active" : ""}`}><p>{product.description}</p></div>
              <div className={`tab-panel ${tab === "specs" ? "active" : ""}`}>
                <table className="spec-table">
                  <tbody>
                    {product.specs.map(([k, v]) => <tr key={k}><td>{k}</td><td>{v}</td></tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {suggestions.length > 0 && (
        <Reveal as="section" className="suggestions-section">
          <div className="container">
            <span className="eyebrow">{tx("pages.productDetail.youMayAlsoNeed", lang, "YOU MAY ALSO NEED", ar.youMayAlsoNeed)}</span>
            <h2 style={{ marginTop: 12 }}>{tx("pages.productDetail.frequentlyPaired", lang, "Frequently paired with this product", ar.frequentlyPaired)}</h2>
            <div className="product-grid sugg-grid">
              {suggestions.map((p) => (
                <ProductCard product={p} key={p.id} />
              ))}
            </div>
          </div>
        </Reveal>
      )}
    </>
  );
}
