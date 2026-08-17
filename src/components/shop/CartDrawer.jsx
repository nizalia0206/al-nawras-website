import { Link } from "react-router-dom";
import { Icon } from "./Icons.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { CatalogAPI } from "../../data/products.js";

export default function CartDrawer({ open, onClose }) {
  const { detailed, subtotal, setQty, removeFromCart } = useCart();

  return (
    <>
      <div className={`cart-drawer-scrim ${open ? "open" : ""}`} onClick={onClose} />
      <aside className={`cart-drawer ${open ? "open" : ""}`} role="dialog" aria-label="Shopping cart">
        <div className="cart-drawer-head">
          <h3>Your Cart</h3>
          <button className="close-btn" aria-label="Close cart" onClick={onClose}><Icon.close /></button>
        </div>
        <div className="cart-drawer-body">
          {detailed.length === 0 ? (
            <div className="cart-empty">
              <Icon.cart style={{ width: 48, height: 48, opacity: 0.35 }} />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            detailed.map(({ product, qty }) => (
              <div className="cart-line" key={product.id}>
                <img src={product.images[0]} alt="" />
                <div className="cart-line-info">
                  <div className="name">{product.name}</div>
                  <div className="supplier">{product.supplier}</div>
                  <div className="cart-line-row">
                    <div className="qty-stepper">
                      <button onClick={() => setQty(product.id, qty - 1)} aria-label="Decrease"><Icon.minus /></button>
                      <span>{qty}</span>
                      <button onClick={() => setQty(product.id, qty + 1)} aria-label="Increase"><Icon.plus /></button>
                    </div>
                    <div className="cart-line-price">{CatalogAPI.formatPrice({ ...product, price: product.price * qty })}</div>
                  </div>
                  <button className="cart-line-remove" onClick={() => removeFromCart(product.id)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
        {detailed.length > 0 && (
          <div className="cart-drawer-foot">
            <div className="cart-summary-row total"><span>Subtotal</span><span>AED {subtotal.toLocaleString()}</span></div>
            <Link to="/checkout" className="btn btn-primary btn-block" onClick={onClose}>Checkout</Link>
          </div>
        )}
      </aside>
    </>
  );
}
