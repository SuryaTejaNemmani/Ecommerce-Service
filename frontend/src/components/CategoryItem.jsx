import './CategoryItem.css';
import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
	return (
		<Link to={"/category" + category.href} className='category-item'>
			<img
				src={category.imageUrl}
				alt={category.name}
				className='category-item__image'
				loading='lazy'
			/>
			<div className='category-item__overlay'></div>
			<div className='category-item__content'>
				<h3 className='category-item__name'>{category.name}</h3>
				<p className='category-item__sub'>Explore {category.name}</p>
			</div>
		</Link>
	);
};

export default CategoryItem;