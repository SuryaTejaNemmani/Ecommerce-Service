import './CartPage.css';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
  const { cart } = useCart();

  return (
    <div className="cart-page">
      <div className="cart-layout">
        <motion.div
          className="cart-items-col"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {cart.length === 0 ? (
            <EmptyCartUI />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>
          )}
          {cart.length > 0 && <PeopleAlsoBought />}
        </motion.div>

        {cart.length > 0 && (
          <motion.div
            className="cart-sidebar"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <OrderSummary />
            <GiftCouponCard />
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default CartPage;

const EmptyCartUI = () => (
  <motion.div
    className="cart-empty"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ShoppingCart className="cart-empty__icon" size={96} />
    <h3 className="cart-empty__title">Your cart is empty</h3>
    <p className="cart-empty__sub">
      Looks like you haven't added anything to your cart yet.
    </p>
    <Link className="cart-empty__btn" to="/">
      Start Shopping
    </Link>
  </motion.div>
);
