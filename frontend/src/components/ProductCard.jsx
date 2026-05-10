import './ProductCard.css';
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
	const { user } = useAuth();
	const { addToCart } = useCart();
	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
			addToCart(product);
		}
	};

	return (
		<div className='product-card'>
			<div className='product-card__img-wrap'>
				<img className='product-card__img' src={product.image} alt='product image'/>
			</div>
			<div className='product-card__body'>
				<h5 className='product-card__name'>{product.name}</h5>
				<p className='product-card__price'>₹{product.price}</p>
				<button
					className='btn btn--primary btn--full'
					onClick={handleAddToCart}
				>
					<ShoppingCart size={20} />
					Add to cart
				</button>
			</div>
		</div>
	);
};
export default ProductCard;