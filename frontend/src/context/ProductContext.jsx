import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "../lib/axios";

const ProductContext = createContext();

export const useProduct = () => {
    return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
	const [products, setProductsState] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const createProduct = async (productData) => {
		setIsLoading(true);
		try {
			const res = await axios.post("/products", productData);
			setProductsState((prev) => [...prev, res.data]);
			setIsLoading(false);
		} catch (error) {
			toast.error(error.response?.data?.error || "Error creating product");
			setIsLoading(false);
		}
	};

	const fetchAllProducts = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get("/products");
			setProductsState(response.data.products);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			toast.error(error.response?.data?.error || "Failed to fetch products");
		}
	};

	const fetchProductsByCategory = async (category) => {
		setIsLoading(true);
		try {
			const response = await axios.get(`/products/category/${category}`);
			setProductsState(response.data);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			toast.error(error.response?.data?.error || "Failed to fetch products");
		}
	};

	const deleteProduct = async (productId) => {
		setIsLoading(true);
		try {
			await axios.delete(`/products/${productId}`);
			setProductsState((prev) => prev.filter((product) => product._id !== productId));
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			toast.error(error.response?.data?.error || "Failed to delete product");
		}
	};

	const toggleFeaturedProduct = async (productId) => {
		setIsLoading(true);
		try {
			const response = await axios.patch(`/products/${productId}`);
			setProductsState((prev) =>
				prev.map((product) =>
					product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
				)
			);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			toast.error(error.response?.data?.error || "Failed to update product");
		}
	};

	const fetchFeaturedProducts = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get("/products/featured");
			setProductsState(response.data);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.log("Error fetching featured products:", error);
		}
	};

	return (
		<ProductContext.Provider
			value={{
				products,
				isLoading,
				createProduct,
				fetchAllProducts,
				fetchProductsByCategory,
				deleteProduct,
				toggleFeaturedProduct,
				fetchFeaturedProducts,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};
