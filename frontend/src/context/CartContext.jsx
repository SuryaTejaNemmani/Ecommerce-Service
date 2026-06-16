import React, { createContext, useContext, useState } from "react";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [coupon, setCoupon] = useState(null);
	const [isCouponApplied, setIsCouponApplied] = useState(false);

	// Derived state for totals
	const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
	let total = subtotal;
	if (coupon && isCouponApplied) {
		const discount = subtotal * (coupon.discountPercentage / 100);
		total = subtotal - discount;
	}

	const getMyCoupon = async () => {
		try {
			const response = await axios.get("/coupons");
			setCoupon(response.data);
		} catch (error) {
			console.error("Error fetching coupon:", error);
		}
	};

	const applyCoupon = async (code) => {
		try {
			const response = await axios.post("/coupons/validate", { code });
			setCoupon(response.data);
			setIsCouponApplied(true);
			toast.success("Coupon applied successfully");
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to apply coupon");
		}
	};

	const removeCoupon = () => {
		setIsCouponApplied(false);
		toast.success("Coupon removed");
	};

	const getCartItems = async () => {
		try {
			const res = await axios.get("/cart");
			setCart(res.data);
		} catch (error) {
			setCart([]);
			toast.error(error.response?.data?.message || "Failed to fetch cart items");
		}
	};

	const clearCart = () => {
		setCart([]);
		setCoupon(null);
		setIsCouponApplied(false);
	};

	const addToCart = async (product) => {
		try {
			await axios.post("/cart", { productId: product._id });
			toast.success("Product added to cart");

			setCart((prevCart) => {
				const existingItem = prevCart.find((item) => item._id === product._id);
				if (existingItem) {
					return prevCart.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item));
				}
				return [...prevCart, { ...product, quantity: 1 }];
			});
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred");
		}
	};

	const removeFromCart = async (productId) => {
		try {
			await axios.delete(`/cart`, { data: { productId } });
			setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
		} catch (error) {
			console.error("Error removing from cart", error);
		}
	};

	const updateQuantity = async (productId, quantity) => {
		if (quantity === 0) {
			removeFromCart(productId);
			return;
		}

		try {
			await axios.put(`/cart/${productId}`, { quantity });
			setCart((prevCart) =>
				prevCart.map((item) => (item._id === productId ? { ...item, quantity } : item))
			);
		} catch (error) {
			console.error("Error updating quantity", error);
		}
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				coupon,
				total,
				subtotal,
				isCouponApplied,
				getMyCoupon,
				applyCoupon,
				removeCoupon,
				getCartItems,
				clearCart,
				addToCart,
				removeFromCart,
				updateQuantity,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	return useContext(CartContext);
}
