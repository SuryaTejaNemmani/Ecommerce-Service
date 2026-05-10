import crypto from "crypto";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import { razorpay } from "../lib/razorpay.js";

// POST /api/payments/create-order
export const createRazorpayOrder = async (req, res) => {
	try {
		const { products, couponCode } = req.body;

		if (!Array.isArray(products) || products.length === 0) {
			return res.status(400).json({ error: "Invalid or empty products array" });
		}

		// Calculate total in paise (INR smallest unit, 1 INR = 100 paise)
		let totalAmount = 0;
		products.forEach((product) => {
			totalAmount += Math.round(product.price * 100) * product.quantity;
		});

		// Apply coupon discount if provided
		let coupon = null;
		if (couponCode) {
			coupon = await Coupon.findOne({
				code: couponCode,
				userId: req.user._id,
				isActive: true,
			});
			if (coupon) {
				totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100);
			}
		}

		// Create Razorpay order
		const order = await razorpay.orders.create({
			amount: totalAmount, // in paise
			currency: "INR",
			receipt: `receipt_${Date.now()}`,
			notes: {
				userId: req.user._id.toString(),
				couponCode: couponCode || "",
				products: JSON.stringify(
					products.map((p) => ({
						id: p._id,
						quantity: p.quantity,
						price: p.price,
					}))
				),
			},
		});

		// If order value >= ₹200 (20000 paise), create a gift coupon
		if (totalAmount >= 20000) {
			await createNewCoupon(req.user._id);
		}

		res.status(200).json({
			orderId: order.id,
			amount: order.amount,
			currency: order.currency,
			keyId: process.env.RAZORPAY_KEY_ID,
		});
	} catch (error) {
		console.error("Error creating Razorpay order:", error);
		res.status(500).json({ message: "Error creating order", error: error.message });
	}
};

// POST /api/payments/verify-payment
export const verifyPayment = async (req, res) => {
	try {
		const {
			razorpay_order_id,
			razorpay_payment_id,
			razorpay_signature,
			products,
			couponCode,
		} = req.body;

		// 1. Verify signature
		const body = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSignature = crypto
			.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
			.update(body)
			.digest("hex");

		if (expectedSignature !== razorpay_signature) {
			return res.status(400).json({ message: "Invalid payment signature" });
		}

		// 2. Deactivate coupon if used
		if (couponCode) {
			await Coupon.findOneAndUpdate(
				{ code: couponCode, userId: req.user._id },
				{ isActive: false }
			);
		}

		// 3. Fetch payment details from Razorpay to get the paid amount
		const payment = await razorpay.payments.fetch(razorpay_payment_id);

		// 4. Create order in DB
		const newOrder = new Order({
			user: req.user._id,
			products: products.map((product) => ({
				product: product._id,
				quantity: product.quantity,
				price: product.price,
			})),
			totalAmount: payment.amount / 100, // convert paise → INR
			razorpayOrderId: razorpay_order_id,
			razorpayPaymentId: razorpay_payment_id,
			razorpaySignature: razorpay_signature,
		});

		await newOrder.save();

		res.status(200).json({
			success: true,
			message: "Payment verified, order created successfully.",
			orderId: newOrder._id,
		});
	} catch (error) {
		console.error("Error verifying payment:", error);
		res.status(500).json({ message: "Error verifying payment", error: error.message });
	}
};

async function createNewCoupon(userId) {
	await Coupon.findOneAndDelete({ userId });

	const newCoupon = new Coupon({
		code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
		discountPercentage: 10,
		expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
		userId: userId,
	});

	await newCoupon.save();
}
