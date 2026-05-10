import './CreateProductForm.css';
import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProduct } from "../context/ProductContext";

const categories = ["Jeans", "T-shirts", "Shoes", "Glasses", "Jackets", "Suits", "Bags", "Sarees", "Electronics"];

const CreateProductForm = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});

	const { createProduct, isLoading } = useProduct();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createProduct(newProduct);
			setNewProduct({ name: "", description: "", price: "", category: "", image: "" });
		} catch {
			console.log("error creating a product");
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewProduct({ ...newProduct, image: reader.result });
			};

			reader.readAsDataURL(file); // base64
		}
	};

	return (
		<motion.div
			className='product-form'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className='product-form__title'>Create New Product</h2>

			<form onSubmit={handleSubmit} className='form-space'>
				<div className='form-group'>
					<label htmlFor='name' className='form-label'>Product Name</label>
					<input
						type='text'
						id='name'
						name='name'
						value={newProduct.name}
						onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						className='form-input'
						required
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='description' className='form-label'>Description</label>
					<textarea
						id='description'
						name='description'
						value={newProduct.description}
						onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
						rows='3'
						className='form-input'
						required
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='price' className='form-label'>Price</label>
					<input
						type='number'
						id='price'
						name='price'
						value={newProduct.price}
						onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						step='0.01'
						className='form-input'
						required
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='category' className='form-label'>Category</label>
					<select
						id='category'
						name='category'
						value={newProduct.category}
						onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
						className='form-input'
						required
					>
						<option value=''>Select a category</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>

				<div className='file-upload'>
					<input type='file' id='image' className='sr-only' accept='image/*' onChange={handleImageChange} />
					<label htmlFor='image' className='file-upload__label'>
						<Upload size={20} />
						Upload Image
					</label>
					{newProduct.image && <span className='file-upload__status'>Image uploaded</span>}
				</div>

				<button
					type='submit'
					className='btn btn--primary btn--full'
					disabled={isLoading}
					style={{ marginTop: '0.5rem' }}
				>
					{isLoading ? (
						<>
							<Loader className='icon-spin' size={20} />
							Loading...
						</>
					) : (
						<>
							<PlusCircle size={20} />
							Create Product
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
};
export default CreateProductForm;