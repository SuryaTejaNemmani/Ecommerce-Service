import './Navbar.css';
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
	const { user, logout } = useAuth();
	const isAdmin = user?.role === "admin";
	const { cart } = useCart();

	return (
		<header className='navbar'>
			<div className='navbar__inner'>
				<Link to='/' className='navbar__logo'>
					SkyMart
				</Link>

				<nav className='navbar__nav'>
					<Link to={"/"} className='navbar__link'>
						Home
					</Link>
					{user && (
						<Link to={"/cart"} className='navbar__cart'>
							<ShoppingCart size={20} />
							<span>Cart</span>
							{cart.length > 0 && (
								<span className='navbar__badge'>{cart.length}</span>
							)}
						</Link>
					)}
					{(isAdmin || user?.role === "seller") && (
						<Link className='navbar__btn navbar__btn--primary' to={"/secret-dashboard"}>
							<Lock size={18} />
							<span>Dashboard</span>
						</Link>
					)}

					{user ? (
						<button className='navbar__btn navbar__btn--gray' onClick={logout}>
							<LogOut size={18} />
							<span>Log Out</span>
						</button>
					) : (
						<>
							<Link to={"/signup"} className='navbar__btn navbar__btn--primary'>
								<UserPlus size={18} />
								<span>Sign Up</span>
							</Link>
							<Link to={"/login"} className='navbar__btn navbar__btn--gray'>
								<LogIn size={18} />
								<span>Login</span>
							</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	);
};
export default Navbar;