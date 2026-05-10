import './HomePage.css';
import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProduct } from "../context/ProductContext";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
	{ href: "/Jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/T-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/Shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
	{ href: "/Glasses", name: "Glasses", imageUrl: "/glasses.png" },
	{ href: "/Jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/Suits", name: "Suits", imageUrl: "/suits.jpg" },
	{ href: "/Bags", name: "Bags", imageUrl: "/bags.jpg" },
	{ href: "/Electronics", name: "Electronics", imageUrl: "/electronics.jpg" },
	{ href: "/Sarees", name: "Sarees", imageUrl: "/sarees.jpg" }
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProduct();

	useEffect(() => {
		fetchFeaturedProducts();
	}, []);

	return (
		<div className='page'>
			<div className='home-header'>
				<h1 className='home-header__title'>Explore Our Categories</h1>
				<p className='home-header__sub'>Discover the latest trends in eco-friendly fashion</p>
			</div>

			<div className='categories-grid'>
				{categories.map((category) => (
					<CategoryItem category={category} key={category.name} />
				))}
			</div>

			{/* {!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />} */}
		</div>
	);
};
export default HomePage;