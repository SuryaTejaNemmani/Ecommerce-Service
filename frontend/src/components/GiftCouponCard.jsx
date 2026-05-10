import './OrderSummary.css';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const GiftCouponCard = () => {
	const [userInputCode, setUserInputCode] = useState("");
	const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } = useCart();

	useEffect(() => {
		getMyCoupon();
	}, [getMyCoupon]);

	useEffect(() => {
		if (coupon) setUserInputCode(coupon.code);
	}, [coupon]);

	const handleApplyCoupon = () => {
		if (!userInputCode) return;
		applyCoupon(userInputCode);
	};

	const handleRemoveCoupon = async () => {
		await removeCoupon();
		setUserInputCode("");
	};

	return (
		<motion.div
			className='summary-card'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			<div className='form-group'>
				<label htmlFor='voucher' className='form-label'>
					Do you have a voucher or gift card?
				</label>
				<input
					type='text'
					id='voucher'
					className='form-input'
					placeholder='Enter code here'
					value={userInputCode}
					onChange={(e) => setUserInputCode(e.target.value)}
					required
				/>
			</div>

			<motion.button
				type='button'
				className='btn btn--primary btn--full'
				style={{ marginTop: '1rem' }}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={handleApplyCoupon}
			>
				Apply Code
			</motion.button>

			{isCouponApplied && coupon && (
				<div className='coupon-section'>
					<h3 className='coupon-section__title'>Applied Coupon</h3>

					<p className='coupon-section__info'>
						{coupon.code} - {coupon.discountPercentage}% off
					</p>

					<motion.button
						type='button'
						className='btn btn--danger btn--full'
						style={{ marginTop: '0.75rem' }}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={handleRemoveCoupon}
					>
						Remove Coupon
					</motion.button>
				</div>
			)}

			{coupon && !isCouponApplied && (
				<div className='coupon-section'>
					<h3 className='coupon-section__title'>Your Available Coupon:</h3>
					<p className='coupon-section__info'>
						{coupon.code} - {coupon.discountPercentage}% off
					</p>
				</div>
			)}
		</motion.div>
	);
};
export default GiftCouponCard;