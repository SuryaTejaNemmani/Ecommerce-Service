import './AdminPage.css';
import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import { useProduct } from "../context/ProductContext";

const tabs = [
	{ id: "create", label: "Create Product", icon: PlusCircle },
	{ id: "products", label: "Products", icon: ShoppingBasket },
	{ id: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("create");
	const { fetchAllProducts } = useProduct();

	useEffect(() => {
		fetchAllProducts();
	}, []);

	return (
		<div className='admin-page'>
			<motion.h1
				className='admin-page__title'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				Admin Dashboard
			</motion.h1>

			<div className='admin-tabs'>
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`admin-tab ${activeTab === tab.id ? "admin-tab--active" : ""}`}
					>
						<tab.icon size={20} />
						{tab.label}
					</button>
				))}
			</div>
			{activeTab === "create" && <CreateProductForm />}
			{activeTab === "products" && <ProductsList />}
			{activeTab === "analytics" && <AnalyticsTab />}
		</div>
	);
};
export default AdminPage;