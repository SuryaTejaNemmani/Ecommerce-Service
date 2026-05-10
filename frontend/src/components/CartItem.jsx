import { Minus, Plus, Trash } from "lucide-react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="cart-item">
      <img className="cart-item__img" src={item.image} alt={item.name} />

      <div className="cart-item__details">
        <p className="cart-item__name">{item.name}</p>
        <p className="cart-item__desc">{item.description}</p>
        
        <div className="cart-item__actions">
          <button
            className="cart-item__remove"
            onClick={() => removeFromCart(item._id)}
          >
            <Trash size={16} style={{ marginRight: '0.25rem' }} /> Remove
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div className="cart-item__qty">
          <button
            className="cart-item__qty-btn"
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
          >
            <Minus size={14} />
          </button>
          <span className="cart-item__qty-num">{item.quantity}</span>
          <button
            className="cart-item__qty-btn"
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
          >
            <Plus size={14} />
          </button>
        </div>

        <div className="cart-item__price">
          ₹{item.price}
        </div>
      </div>
    </div>
  );
};
export default CartItem;
