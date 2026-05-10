import axios from "axios";

const axiosInstance = axios.create({
	baseURL:
		import.meta.env.MODE === "development"
			? "http://localhost:5001/api"
			: "https://ecommerce-service-1wys.onrender.com/api",
});

// Attach token from localStorage to every request
axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default axiosInstance;