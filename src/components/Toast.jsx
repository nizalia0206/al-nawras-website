import { Icon } from "./CatalogIcons.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Toast() {
  const { toast } = useCart();
  if (!toast) return null;
  return (
    <div className="toast-wrap">
      <div className="toast" key={toast.id}>
        <Icon.check />
        <span className="msg">{toast.message}</span>
      </div>
    </div>
  );
}
