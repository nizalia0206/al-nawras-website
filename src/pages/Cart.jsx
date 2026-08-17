import "../styles/al-shop.css";
import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Icon } from "../components/shop/Icons.jsx";
import { useCart } from "../context/CartContext.jsx";
import { SUPPLIERS, CATEGORIES, CatalogAPI } from "../data/products.js";

export default function Cart() {
  const { detailed, subtotal, setQty, removeFromCart, showToast } = useCart();
  const [params] = useSearchParams();
  const [mode, setMode] = useState(params.get("mode") === "quote" ? "quote" : "buy");
  const navigate = useNavigate();

  const vat = subtotal * 0.05;
  const total = subtotal + vat;

  function handleProceed() {
    navigate(`/checkout?mode=${mode}`);
  }

  return (
    <div className="al-shop-scope">
      <div className="container" style={{ paddingTop: 22 }}>
        <div className="breadcrumb"><Link to="/products">Products</Link><span className="sep">/</span><span style={{ color: "var(--navy-900)", fontWeight: 700 }}>Your Cart</span></div>
      </div>

      <main className="cart-wrap">
        <div className="container">
          <h1 style={{ fontSize: "clamp(26px,3.4vw,36px)", marginBottom: 30 }}>Your Cart</h1>

          {detailed.length === 0 ? (
            <div className="empty-cart">
              <Icon.cart style={{ width: 56, height: 56, color: "var(--slate-300)", marginBottom: 20 }} />
              <h2 style={{ marginBottom: 10 }}>Your cart is empty</h2>
              <p style={{ color: "var(--slate-500)", marginBottom: 26 }}>Browse our catalog to add fire safety, ICT and security products.</p>
              <Link to="/products" className="btn btn-primary">Browse Products</Link>
            </div>
          ) : (
            <div className="cart-layout">
              <div>
                <div>
                  {detailed.map(({ product, qty }) => (
                    <div className="cart-item" key={product.id}>
                      <div className="thumb"><img src={product.images[0]} alt={product.name} /></div>
                      <div>
                        <h4>{product.name}</h4>
                        <div className="meta">{SUPPLIERS[product.supplier]?.name} &middot; {CATEGORIES.find((c) => c.id === product.category)?.name}</div>
                        <div className="price">{CatalogAPI.formatPrice(product)}</div>
                      </div>
                      <div className="cart-item-actions">
                        <div className="qty-control">
                          <button onClick={() => setQty(product.id, qty - 1)}><Icon.minus /></button>
                          <span>{qty}</span>
                          <button onClick={() => setQty(product.id, qty + 1)}><Icon.plus /></button>
                        </div>
                        <button className="remove-link" onClick={() => { removeFromCart(product.id); showToast("Item removed from cart"); }}>
                          <Icon.trash /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="summary-card">
                <div className="mode-toggle">
                  <button className={mode === "buy" ? "active" : ""} onClick={() => setMode("buy")}>Buy Now</button>
                  <button className={mode === "quote" ? "active" : ""} onClick={() => setMode("quote")}>Request Quote</button>
                </div>
                <p className="mode-hint">
                  {mode === "buy"
                    ? "Proceed to secure checkout to pay online and schedule delivery or installation."
                    : "Submit this list as a project inquiry &mdash; our engineering team will follow up with a formal quotation."}
                </p>

                <div className="summary-row"><span>Subtotal</span><span>AED {subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                {mode === "buy" && <div className="summary-row"><span>VAT (5%)</span><span>AED {vat.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>}
                <div className="summary-row total"><span>{mode === "buy" ? "Total" : "Estimated Total"}</span><span>AED {(mode === "buy" ? total : subtotal).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>

                <button className="btn btn-primary btn-block" style={{ marginTop: 18 }} onClick={handleProceed}>
                  {mode === "buy" ? "Proceed to Checkout" : "Submit Quote Request"} <Icon.arrowRight />
                </button>
                <Link to="/products" style={{ display: "block", textAlign: "center", marginTop: 14, fontSize: 13, fontWeight: 700, color: "var(--slate-500)" }}>
                  &larr; Continue browsing
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
