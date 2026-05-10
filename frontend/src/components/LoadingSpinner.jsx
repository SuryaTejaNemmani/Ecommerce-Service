import './LoadingSpinner.css';
const LoadingSpinner = () => {
	return (
		<div className='loading-screen'>
			<div className='spinner'>
				<div className='spinner__ring'></div>
				<div className='spinner__ring spinner__ring--spin'></div>
				<div className='sr-only'>Loading</div>
			</div>
		</div>
	);
};

export default LoadingSpinner;