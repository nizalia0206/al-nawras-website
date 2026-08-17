import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "./CatalogIcons.jsx";
import { useCart } from "../context/CartContext.jsx";
import { CatalogAPI, SUPPLIERS } from "../data/products.js";
import { useTilt } from "../hooks/useTilt.js";
import { useLanguage } from "../context/LanguageContext";
import { productsPage } from "../i18n/pagesAr";

export default function ProductCard({ product }) {
  const { lang } = useLanguage();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { ref, onMouseMove, onMouseEnter, onMouseLeave, onTouchStart, onTouchEnd } = useTilt({ max: 10 });
  const [pulsing, setPulsing] = useState(false);
  const addBtnRef = useRef(null);

  function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setPulsing(true);
    setTimeout(() => setPulsing(false), 620);
  }

  function handleCardClick() {
    navigate(`/product/${product.id}`);
  }

  return (
    <div
      ref={ref}
      className="product-card"
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={handleCardClick}
      role="link"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      onKeyDown={(e) => { if (e.key === "Enter") handleCardClick(); }}
    >
      <div className="thumb">
        <span className="supplier-tag">{SUPPLIERS[product.supplier]?.name || product.supplier}</span>
        <img src={product.images[0]} alt={product.name} loading="lazy" />
        <span className="quick-view">{lang === "ar" ? productsPage.tapForDetails : "Tap for full details →"}</span>
      </div>
      <div className="body">
        <span className="cat-chip">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="short">{product.short}</p>
        <div className="price-row">
          <div className="price">{CatalogAPI.formatPrice(product)}</div>
          <button
            ref={addBtnRef}
            className={`add-btn ${pulsing ? "pulsing" : ""}`}
            aria-label={`Add ${product.name} to cart`}
            onClick={handleAdd}
          >
            <Icon.plus />
          </button>
        </div>
      </div>
    </div>
  );
}
