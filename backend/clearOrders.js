import mongoose from "mongoose";
import Order from "./models/order.model.js";
import Coupon from "./models/coupon.model.js";
import dotenv from "dotenv";

dotenv.config();

const clearData = async () => {
	try {
		const mongoUri = process.env.MONGO_URI || "mongodb+srv://nemmanisuryateja_db_user:4XDjS9zP2K4NaL0f@ecommerce.grzrvl5.mongodb.net/?appName=ECommerce";
		
		await mongoose.connect(mongoUri);
		console.log('DB connected');

		// Clear all orders
		await Order.deleteMany({});
		console.log('All orders cleared');

		// Optionally clear coupons to start completely fresh
		await Coupon.deleteMany({});
		console.log('All coupons cleared');

		console.log('Data cleared successfully! Your analytics will now reset to zero.');
		
		process.exit(0);
	} catch (error) {
		console.error('Error clearing data:', error);
		process.exit(1);
	}
};

clearData();
