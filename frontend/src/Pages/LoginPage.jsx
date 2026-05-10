import './Auth.css';
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, loading } = useAuth();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};

	return (
		<div className='auth-page'>
			<motion.h2 
				className='auth-title'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				Login to your account
			</motion.h2>

			<motion.div
				className='auth-card'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<form onSubmit={handleSubmit} className='form-space'>
					<div className='form-group'>
						<label htmlFor='email' className='form-label'>Email address</label>
						<div className='form-input-wrap'>
							<Mail className='form-icon' size={20} />
							<input
								id='email'
								type='email'
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className='form-input form-input--padded'
								placeholder='you@example.com'
							/>
						</div>
					</div>

					<div className='form-group'>
						<label htmlFor='password' className='form-label'>Password</label>
						<div className='form-input-wrap'>
							<Lock className='form-icon' size={20} />
							<input
								id='password'
								type='password'
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className='form-input form-input--padded'
								placeholder='••••••••'
							/>
						</div>
					</div>

					<button
						type='submit'
						className='btn btn--primary btn--full'
						disabled={loading}
					>
						{loading ? (
							<>
								<Loader className='icon-spin' size={20} />
								Loading...
							</>
						) : (
							<>
								<LogIn size={20} />
								Login
							</>
						)}
					</button>
				</form>

				<p className='auth-footer'>
					Not a member?{" "}
					<Link to='/signup'>
						Sign up now <ArrowRight size={16} />
					</Link>
				</p>
			</motion.div>
		</div>
	);
};
export default LoginPage;