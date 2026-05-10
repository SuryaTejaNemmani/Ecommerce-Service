import './PurchaseResult.css';
import { XCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
	return (
		<div className='result-page'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='result-card'
			>
				<div className='result-card__icon-wrap'>
					<XCircle color="#ef4444" size={64} />
				</div>
				<h1 className='result-card__title result-card__title--cancel'>Purchase Cancelled</h1>
				<p className='result-card__sub'>
					Your order has been cancelled. No charges have been made.
				</p>
				
				<div className='result-card__info' style={{ marginTop: '1.5rem' }}>
					<p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
						If you encountered any issues during the checkout process, please don't hesitate to
						contact our support team.
					</p>
				</div>

				<div className='result-card__actions'>
					<Link to={"/"} className='result-btn result-btn--gray'>
						<ArrowLeft size={18} />
						Return to Shop
					</Link>
				</div>
			</motion.div>
		</div>
	);
};

export default PurchaseCancelPage;