import mongoose from "mongoose";
import Product from "./models/product.model.js";
import dotenv from "dotenv";

dotenv.config();

const products = [
	{
		name: "Slim Fit Blue Jeans",
		description: "High-quality denim slim fit jeans for a modern look.",
		price: 1999,
		image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000&auto=format&fit=crop",
		category: "Jeans",
		isFeatured: true
	},
	{
		name: "Casual Cotton T-Shirt",
		description: "100% pure cotton breathable t-shirt.",
		price: 799,
		image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
		category: "T-shirts",
		isFeatured: true
	},
	{
		name: "Sporty Running Shoes",
		description: "Lightweight and durable running shoes.",
		price: 3499,
		image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
		category: "Shoes",
		isFeatured: true
	},
	{
		name: "Classic Aviator Sunglasses",
		description: "UV protected stylish aviator sunglasses.",
		price: 1299,
		image: "https://images.unsplash.com/photo-1511499767390-a7335958beba?q=80&w=1000&auto=format&fit=crop",
		category: "Glasses",
		isFeatured: false
	},
	{
		name: "Leather Laptop Bag",
		description: "Premium leather bag with multiple compartments.",
		price: 4500,
		image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
		category: "Bags",
		isFeatured: true
	}
];

const seedProducts = async () => {
	try {
		const mongoUri = process.env.MONGO_URI || "mongodb+srv://nemmanisuryateja_db_user:4XDjS9zP2K4NaL0f@ecommerce.grzrvl5.mongodb.net/?appName=ECommerce";
		
		await mongoose.connect(mongoUri);
		console.log('DB connected');

		// Clear existing products to avoid duplicates during seeding
		await Product.deleteMany({});
		console.log('Old products cleared');

		await Product.insertMany(products);
		console.log('Products seeded successfully!');
		
		process.exit(0);
	} catch (error) {
		console.error('Error seeding products:', error);
		process.exit(1);
	}
};

seedProducts();
