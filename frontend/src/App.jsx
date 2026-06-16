import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import AdminPage from "./Pages/AdminPage";
import CategoryPage from "./Pages/CategoryPage";

import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./Pages/CartPage";
import { useCart } from "./context/CartContext";
import PurchaseSuccessPage from "./Pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./Pages/PurchaseCancelPage";

function App() {
	const { user, checkAuth, checkingAuth } = useAuth();
	const { getCartItems } = useCart();

	useEffect(() => {
		if (user) {
			getCartItems();
		}
	}, [user]);

	if (checkingAuth) return <LoadingSpinner />;

	return (
		<div className='app'>
			{/* Background gradient */}
			<div className='app__bg'></div>

			<div className='app__content'>
				<Navbar />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
					<Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
					<Route
						path='/secret-dashboard'
						element={user?.role === "admin" || user?.role === "seller" ? <AdminPage /> : <Navigate to='/login' />}
					/>
					<Route path='/category/:category' element={<CategoryPage />} />
					<Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
					<Route
						path='/purchase-success'
						element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}
					/>
					<Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</div>
			<Toaster />
		</div>
	);
}

export default App;