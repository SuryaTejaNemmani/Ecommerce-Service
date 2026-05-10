import './PurchaseResult.css';
import { CheckCircle, ArrowRight, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "../lib/axios";
import Confetti from "react-confetti";
import LoadingSpinner from "../components/LoadingSpinner";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const [error, setError] = useState(null);
	const [searchParams] = useSearchParams();
	const orderId = searchParams.get("orderId");
	const { clearCart } = useCart();

	useEffect(() => {
		const handleSuccess = async () => {
			if (orderId) {
				clearCart();
			}
			setIsProcessing(false);
		};

		handleSuccess();
	}, [orderId]);

	if (isProcessing) return <LoadingSpinner />;

	if (error) {
		return (
			<div className='result-page'>
				<div className='result-card'>
					<h1 className='result-card__title result-card__title--cancel'>Error</h1>
					<p className='result-card__sub'>{error}</p>
					<div className='result-card__actions' style={{ marginTop: '2rem' }}>
						<Link to='/' className='btn btn--primary btn--full'>
							Return to Home
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='result-page'>
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				style={{ zIndex: 99, pointerEvents: 'none' }}
				numberOfPieces={700}
				recycle={false}
			/>

			<div className='result-card'>
				<div className='result-card__icon-wrap'>
					<CheckCircle color="#10b981" size={64} />
				</div>
				<h1 className='result-card__title result-card__title--success'>Purchase Successful!</h1>
				<p className='result-card__sub'>
					Thank you for your order. We're processing it now.
				</p>
				<p className='result-card__note'>
					Check your email for order details and updates.
				</p>

				<div className='result-card__info'>
					<div className='result-card__info-row'>
						<span className='result-card__info-label'>Order number</span>
						<span className='result-card__info-value'>#{orderId || "unknown"}</span>
					</div>
					<div className='result-card__info-row'>
						<span className='result-card__info-label'>Estimated delivery</span>
						<span className='result-card__info-value'>3-5 business days</span>
					</div>
				</div>

				<div className='result-card__actions'>
					<Link to='/' className='result-btn result-btn--primary'>
						Continue Shopping
						<ArrowRight size={18} />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PurchaseSuccessPage;