import './OrderSummary.css';
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import axios from "../lib/axios";

const OrderSummary = () => {
	const { total, subtotal, coupon, isCouponApplied, cart, clearCart } = useCart();

	const savings = subtotal - total;
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);

	const handleRazorpayCheckout = async () => {
		try {
			// 1. Create order on backend
			const response = await axios.post("/payments/create-order", {
				products: cart,
				couponCode: isCouponApplied ? coupon.code : null,
			});

			const { orderId, currency, amount, keyId } = response.data;

			// 2. Initialize Razorpay Checkout
			const options = {
				key: keyId, 
				amount: amount.toString(),
				currency: currency,
				name: "SkyMart",
				description: "Test Transaction",
				order_id: orderId,
				handler: async function (response) {
					try {
						// 3. Verify payment on backend
						const data = {
							razorpay_payment_id: response.razorpay_payment_id,
							razorpay_order_id: response.razorpay_order_id,
							razorpay_signature: response.razorpay_signature,
							products: cart,
							couponCode: isCouponApplied ? coupon.code : null,
						};

						const verifyResponse = await axios.post("/payments/verify-payment", data);

						if (verifyResponse.data.success) {
							clearCart();
							window.location.href = `/purchase-success?orderId=${verifyResponse.data.orderId}`;
						} else {
							window.location.href = "/purchase-cancel";
						}
					} catch (error) {
						console.error("Payment verification failed:", error);
						window.location.href = "/purchase-cancel";
					}
				},
				prefill: {
					name: "John Doe", 
					email: "john.doe@example.com",
					contact: "9999999999"
				},
				theme: {
					color: "#10b981"
				}
			};

			const paymentObject = new window.Razorpay(options);
			paymentObject.on('payment.failed', function () {
				window.location.href = "/purchase-cancel";
			});
			
			paymentObject.open();

		} catch (error) {
			console.error("Payment initiation failed:", error);
		}
	};

	return (
		<motion.div
			className='summary-card'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<h2 className='summary-card__title'>Order summary</h2>

			<div className='summary-row'>
				<span className='summary-row__label'>Original price</span>
				<span className='summary-row__value'>₹{formattedSubtotal}</span>
			</div>

			{savings > 0 && (
				<div className='summary-row'>
					<span className='summary-row__label'>Savings</span>
					<span className='summary-row__value summary-row__value--accent'>-₹{formattedSavings}</span>
				</div>
			)}

			{coupon && isCouponApplied && (
				<div className='summary-row'>
					<span className='summary-row__label'>Coupon ({coupon.code})</span>
					<span className='summary-row__value summary-row__value--accent'>-{coupon.discountPercentage}%</span>
				</div>
			)}

			<div className='summary-divider'></div>

			<div className='summary-row summary-total'>
				<span className='summary-row__label'>Total</span>
				<span className='summary-row__value summary-row__value--accent'>₹{formattedTotal}</span>
			</div>

			<button
				className='btn btn--primary btn--full'
				style={{ marginTop: '1.5rem' }}
				onClick={handleRazorpayCheckout}
			>
				Proceed to Checkout
			</button>

			<div className='summary-links'>
				<span>or</span>
				<Link to='/'>
					Continue Shopping
					<MoveRight size={16} />
				</Link>
			</div>
		</motion.div>
	);
};
export default OrderSummary;
