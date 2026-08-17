import "../styles/al-shop.css";
import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Icon } from "../components/shop/Icons.jsx";
import { useCart } from "../context/CartContext.jsx";
import { CatalogAPI } from "../data/products.js";

const EMIRATES = ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"];

export default function Checkout() {
  const [params] = useSearchParams();
  const mode = params.get("mode") === "quote" ? "quote" : "buy";
  const { detailed, subtotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);

  const vat = subtotal * 0.05;
  const total = subtotal + vat;

  function handleSubmit(e) {
    e.preventDefault();
    clearCart();
    setSubmitted(true);
  }

  if (detailed.length === 0 && !submitted) {
    return (
      <main className="checkout-wrap">
        <div className="container">
          <div className="text-center" style={{ padding: "80px 20px" }}>
            <h2>Your cart is empty</h2>
            <p style={{ color: "var(--slate-500)", margin: "12px 0 26px" }}>
              Add products before proceeding to {mode === "buy" ? "checkout" : "a quote request"}.
            </p>
            <Link to="/products" className="btn btn-primary">Browse Products</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="al-shop-scope">
      <div className="container" style={{ paddingTop: 22 }}>
        <div className="breadcrumb">
          <Link to="/products">Products</Link><span className="sep">/</span>
          <Link to="/cart">Cart</Link><span className="sep">/</span>
          <span style={{ color: "var(--navy-900)", fontWeight: 700 }}>Checkout</span>
        </div>
      </div>

      <main className="checkout-wrap">
        <div className="container">
          {submitted ? (
            <div className="success-panel">
              <div className="icon-circle"><Icon.check /></div>
              <h2>{mode === "buy" ? "Order Confirmed" : "Quote Request Sent"}</h2>
              <p style={{ color: "var(--slate-500)", margin: "14px 0 30px" }}>
                {mode === "buy"
                  ? "Thank you — your order has been placed. A confirmation has been sent to your email, and our team will contact you to schedule delivery or installation."
                  : "Thank you — our engineering team has received your request and will follow up with a formal quotation within 1 business day."}
              </p>
              <Link to="/products" className="btn btn-primary">Continue Browsing</Link>
            </div>
          ) : (
            <>
              <h1 style={{ fontSize: "clamp(26px,3.4vw,34px)", marginBottom: 8 }}>
                {mode === "buy" ? "Secure Checkout" : "Request a Quote"}
              </h1>
              <p style={{ color: "var(--slate-500)", marginBottom: 34 }}>
                {mode === "buy"
                  ? "Enter your details to complete payment and schedule delivery."
                  : "Tell us about your project and our team will send a formal quotation within 1 business day."}
              </p>

              <div className="checkout-layout">
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-card">
                      <h3>Contact Details</h3>
                      <div className="field-row">
                        <div className="field"><label>Full Name *</label><input type="text" required placeholder="e.g. Ahmed Al Mansoori" /></div>
                        <div className="field"><label>Company Name</label><input type="text" placeholder="Company LLC" /></div>
                      </div>
                      <div className="field-row">
                        <div className="field"><label>Email *</label><input type="email" required placeholder="you@company.com" /></div>
                        <div className="field"><label>Phone *</label><input type="tel" required placeholder="+971 5X XXX XXXX" /></div>
                      </div>
                    </div>

                    {mode === "buy" ? (
                      <>
                        <div className="form-card">
                          <h3>Delivery Address</h3>
                          <div className="field"><label>Address *</label><input type="text" required placeholder="Street, building, area" /></div>
                          <div className="field-row">
                            <div className="field">
                              <label>Emirate *</label>
                              <select required defaultValue="">
                                <option value="" disabled>Select emirate</option>
                                {EMIRATES.map((e) => <option key={e}>{e}</option>)}
                              </select>
                            </div>
                            <div className="field"><label>PO Box</label><input type="text" placeholder="Optional" /></div>
                          </div>
                        </div>
                        <div className="form-card">
                          <h3>Payment</h3>
                          <div className="field"><label>Card Number *</label><input type="text" required placeholder="1234 1234 1234 1234" /></div>
                          <div className="field-row">
                            <div className="field"><label>Expiry *</label><input type="text" required placeholder="MM / YY" /></div>
                            <div className="field"><label>CVC *</label><input type="text" required placeholder="123" /></div>
                          </div>
                          <p style={{ fontSize: 12, color: "var(--slate-500)" }}>Payments are simulated in this preview build &mdash; no real transaction will be processed.</p>
                        </div>
                      </>
                    ) : (
                      <div className="form-card">
                        <h3>Project Details</h3>
                        <div className="field-row">
                          <div className="field"><label>Project Name</label><input type="text" placeholder="e.g. Marina Tower Fire Upgrade" /></div>
                          <div className="field">
                            <label>Timeline</label>
                            <select defaultValue="">
                              <option value="" disabled>Select timeline</option>
                              <option>Immediate</option><option>Within 1 month</option><option>1&ndash;3 months</option><option>Planning stage</option>
                            </select>
                          </div>
                        </div>
                        <div className="field"><label>Additional Notes</label><textarea placeholder="Site details, quantities, or special requirements&hellip;" /></div>
                      </div>
                    )}

                    <button type="submit" className="btn btn-primary btn-block">
                      {mode === "buy" ? `Pay AED ${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "Submit Quote Request"}
                    </button>
                  </form>
                </div>

                <div className="summary-card">
                  <h3 style={{ fontSize: 15, marginBottom: 14 }}>Order Summary</h3>
                  {detailed.map(({ product, qty }) => (
                    <div className="mini-item" key={product.id}>
                      <img src={product.images[0]} alt={product.name} />
                      <div className="info"><h5>{product.name}</h5><span>Qty {qty} &middot; {CatalogAPI.formatPrice(product)}</span></div>
                    </div>
                  ))}
                  <div className="summary-row"><span>Subtotal</span><span>AED {subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                  {mode === "buy" ? (
                    <>
                      <div className="summary-row"><span>VAT (5%)</span><span>AED {vat.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                      <div className="summary-row total"><span>Total</span><span>AED {total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                    </>
                  ) : (
                    <div className="summary-row total"><span>Estimated Total</span><span>AED {subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
