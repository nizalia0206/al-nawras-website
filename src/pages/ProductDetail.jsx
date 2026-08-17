import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Icon } from "../components/CatalogIcons.jsx";
import Reveal from "../components/Reveal.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useCart } from "../context/CartContext.jsx";
import { PRODUCTS, CATEGORIES, SUPPLIERS, CatalogAPI } from "../data/products.js";
import { useLanguage } from "../context/LanguageContext";
import { productDetailPage } from "../i18n/pagesAr";

export default function ProductDetail() {
  const { lang } = useLanguage();
  const ar = productDetailPage;
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = CatalogAPI.byId(id) || PRODUCTS[0];
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
    return (
      <div className="container" style={{ padding: "100px 20px", textAlign: "center" }}>
        <h2>{lang === "ar" ? ar.productNotFound : "Product not found"}</h2>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: 16 }}>{lang === "ar" ? ar.backToProducts : "Back to Products"}</Link>
      </div>
    );
  }

  const categoryName = CATEGORIES.find((c) => c.id === product.category)?.name;
  const suggestions = CatalogAPI.suggestions(product, 4);

  function handleAddToCart() {
    addToCart(product, qty);
  }
  function handleRequestQuote() {
    addToCart(product, qty);
    navigate("/cart?mode=quote");
  }

  return (
    <>
      <div className="container" style={{ paddingTop: 22 }}>
        <div className="breadcrumb">
          <Link to="/products">{lang === "ar" ? ar.breadcrumbProducts : "Products"}</Link><span className="sep">/</span>
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
              <div className="price-block">
                <span className="amount">{CatalogAPI.formatPrice(product)}</span>
                <span className="unit">{lang === "ar" ? ar.excludingVat : "excl. VAT · installation quoted separately"}</span>
              </div>
              <div className="stock-row"><span className="stock-dot" /> {lang === "ar" ? ar.inStock : "In stock — ships from UAE warehouse"}</div>

              <div className="qty-row">
                <div className="qty-control">
                  <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}><Icon.minus /></button>
                  <span>{qty}</span>
                  <button aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}><Icon.plus /></button>
                </div>
                <span style={{ fontSize: 13, color: "var(--slate-500)" }}>{lang === "ar" ? ar.units : "units"}</span>
              </div>

              <div className="action-row">
                <button className="btn btn-outline-navy" onClick={handleAddToCart}><Icon.cart /> {lang === "ar" ? ar.addToCart : "Add to Cart"}</button>
                <button className="btn btn-primary" style={{ background: "var(--navy-900)" }} onClick={handleRequestQuote}><Icon.phone /> {lang === "ar" ? ar.enquireNow : "Enquire Now"}</button>
                <a
                  className="btn btn-whatsapp"
                  href={`https://wa.me/?text=${encodeURIComponent(`Hi, I'd like a quote for ${product.name} (${qty} unit${qty > 1 ? "s" : ""}).`)}`}
                  target="_blank" rel="noopener noreferrer"
                >
                  <Icon.mail /> {lang === "ar" ? ar.whatsappQuote : "WhatsApp Quote"}
                </a>
              </div>

              <ul className="assurance-list">
                <li><Icon.check /> {lang === "ar" ? ar.assurance1 : "Genuine products, backed by Al Nawras support"}</li>
                <li><Icon.check /> {lang === "ar" ? ar.assurance2 : "Bulk & project pricing available"}</li>
                <li><Icon.check /> {lang === "ar" ? ar.assurance3 : "Delivery & installation across the UAE"}</li>
              </ul>

              <div className="trust-badges">
                <div className="trust-badge"><Icon.shield /> {lang === "ar" ? ar.trust1 : "Certified & UL/FM listed"}</div>
                <div className="trust-badge"><Icon.check /> {lang === "ar" ? ar.trust2 : "Local warranty support"}</div>
              </div>

              <div className="tabs">
                <button className={`tab-btn ${tab === "overview" ? "active" : ""}`} onClick={() => setTab("overview")}>{lang === "ar" ? ar.tabOverview : "Overview"}</button>
                <button className={`tab-btn ${tab === "specs" ? "active" : ""}`} onClick={() => setTab("specs")}>{lang === "ar" ? ar.tabSpecs : "Specifications"}</button>
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
            <span className="eyebrow">{lang === "ar" ? ar.youMayAlsoNeed : "YOU MAY ALSO NEED"}</span>
            <h2 style={{ marginTop: 12 }}>{lang === "ar" ? ar.frequentlyPaired : "Frequently paired with this product"}</h2>
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
