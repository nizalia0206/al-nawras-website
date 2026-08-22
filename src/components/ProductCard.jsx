import { SUPPLIERS } from "../data/products.js";
import { useNavigate } from "react-router-dom";
import { useTilt } from "../hooks/useTilt.js";
import { useLanguage } from "../context/LanguageContext";
import { productsPage } from "../i18n/pagesAr";

export default function ProductCard({ product }) {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { ref, onMouseMove, onMouseEnter, onMouseLeave, onTouchStart, onTouchEnd } = useTilt({ max: 10 });

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
          <a
            href={`https://wa.me/971551099885?text=${encodeURIComponent(
              `Hi Al Nawras, I'd like to get a quote for ${product.name}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-flame btn-block"
            aria-label={`Get a quote for ${product.name}`}
            onClick={(e) => e.stopPropagation()}
          >
            {lang === "ar" ? "احصل على عرض سعر" : "Get Quote"}
          </a>
        </div>
      </div>
      <span className="card-accent-line" aria-hidden="true" />
    </div>
  );
}
