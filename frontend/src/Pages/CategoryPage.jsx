import './CategoryPage.css';
import { useEffect } from "react";
import { useProduct } from "../context/ProductContext";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
	const { fetchProductsByCategory, products } = useProduct();

	const { category } = useParams();

	useEffect(() => {
		fetchProductsByCategory(category);
	}, [category]);

	return (
		<div className='category-page'>
			<motion.h1
				className='category-page__title'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				{category.charAt(0).toUpperCase() + category.slice(1)}
			</motion.h1>

			<motion.div
				className='product-grid'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				{products?.length === 0 && (
					<h2 className='no-products'>
						No products found
					</h2>
				)}

				{products?.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</motion.div>
		</div>
	);
};
export default CategoryPage;