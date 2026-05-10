import './Auth.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { signup, loading } = useAuth();

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(formData);
	};

	return (
		<div className='auth-page'>
			<motion.h2
				className='auth-title'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				Create your account
			</motion.h2>

			<motion.div
				className='auth-card'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<form onSubmit={handleSubmit} className='form-space'>
					<div className='form-group'>
						<label htmlFor='name' className='form-label'>Full name</label>
						<div className='form-input-wrap'>
							<User className='form-icon' size={20} />
							<input
								id='name'
								type='text'
								required
								value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								className='form-input form-input--padded'
								placeholder='John Doe'
							/>
						</div>
					</div>

					<div className='form-group'>
						<label htmlFor='email' className='form-label'>Email address</label>
						<div className='form-input-wrap'>
							<Mail className='form-icon' size={20} />
							<input
								id='email'
								type='email'
								required
								value={formData.email}
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
								value={formData.password}
								onChange={(e) => setFormData({ ...formData, password: e.target.value })}
								className='form-input form-input--padded'
								placeholder='••••••••'
							/>
						</div>
					</div>

					<div className='form-group'>
						<label htmlFor='confirmPassword' className='form-label'>Confirm Password</label>
						<div className='form-input-wrap'>
							<Lock className='form-icon' size={20} />
							<input
								id='confirmPassword'
								type='password'
								required
								value={formData.confirmPassword}
								onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
								<UserPlus size={20} />
								Sign up
							</>
						)}
					</button>
				</form>

				<p className='auth-footer'>
					Already have an account?{" "}
					<Link to='/login'>
						Login here <ArrowRight size={16} />
					</Link>
				</p>
			</motion.div>
		</div>
	);
};
export default SignUpPage;