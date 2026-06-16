import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getAnalyticsData = async (userId, role) => {
	const isAdmin = role === "admin";
	
	const totalUsers = isAdmin ? await User.countDocuments() : null;
	const totalProducts = await Product.countDocuments(isAdmin ? {} : { seller: userId });

	// Base aggregation for sales and revenue
	const salesStatsPipeline = [
		{ $unwind: "$products" },
	];

	if (!isAdmin) {
		// Filter by seller's products
		salesStatsPipeline.push({
			$lookup: {
				from: "products",
				localField: "products.product",
				foreignField: "_id",
				as: "productDetail"
			}
		});
		salesStatsPipeline.push({ $unwind: "$productDetail" });
		salesStatsPipeline.push({ $match: { "productDetail.seller": new mongoose.Types.ObjectId(userId) } });
	}

	salesStatsPipeline.push({
		$group: {
			_id: null,
			totalSales: { $sum: "$products.quantity" },
			totalRevenue: { $sum: { $multiply: ["$products.price", "$products.quantity"] } },
		},
	});

	const salesData = await Order.aggregate(salesStatsPipeline);
	const { totalSales, totalRevenue } = salesData[0] || { totalSales: 0, totalRevenue: 0 };

	// Get sales per product
	const productSalesPipeline = [
		{ $unwind: "$products" },
		{
			$lookup: {
				from: "products",
				localField: "products.product",
				foreignField: "_id",
				as: "productDetails",
			},
		},
		{ $unwind: "$productDetails" },
	];

	if (!isAdmin) {
		productSalesPipeline.push({ $match: { "productDetails.seller": new mongoose.Types.ObjectId(userId) } });
	}

	productSalesPipeline.push(
		{
			$group: {
				_id: "$products.product",
				name: { $first: "$productDetails.name" },
				sales: { $sum: "$products.quantity" },
				revenue: { $sum: { $multiply: ["$products.price", "$products.quantity"] } },
			},
		},
		{ $sort: { sales: -1 } }
	);

	const productSalesData = await Order.aggregate(productSalesPipeline);

	return {
		users: totalUsers,
		products: totalProducts,
		totalSales,
		totalRevenue,
		productSales: productSalesData,
	};
};

export const getDailySalesData = async (startDate, endDate, userId, role) => {
	try {
		const isAdmin = role === "admin";
		
		const pipeline = [
			{
				$match: {
					createdAt: {
						$gte: startDate,
						$lte: endDate,
					},
				},
			},
			{ $unwind: "$products" }
		];

		if (!isAdmin) {
			pipeline.push({
				$lookup: {
					from: "products",
					localField: "products.product",
					foreignField: "_id",
					as: "productDetail"
				}
			});
			pipeline.push({ $unwind: "$productDetail" });
			pipeline.push({ $match: { "productDetail.seller": new mongoose.Types.ObjectId(userId) } });
		}

		pipeline.push({
			$group: {
				_id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
				sales: { $sum: "$products.quantity" },
				revenue: { $sum: { $multiply: ["$products.price", "$products.quantity"] } },
			},
		});
		pipeline.push({ $sort: { _id: 1 } });

		const dailySalesData = await Order.aggregate(pipeline);

		const dateArray = getDatesInRange(startDate, endDate);

		return dateArray.map((date) => {
			const foundData = dailySalesData.find((item) => item._id === date);

			return {
				date,
				sales: foundData?.sales || 0,
				revenue: foundData?.revenue || 0,
			};
		});
	} catch (error) {
		throw error;
	}
};

function getDatesInRange(startDate, endDate) {
	const dates = [];
	let currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		dates.push(currentDate.toISOString().split("T")[0]);
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return dates;
}