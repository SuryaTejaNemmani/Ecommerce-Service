import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [checkingAuth, setCheckingAuth] = useState(true);

	const signup = async ({ name, email, password, confirmPassword, role }) => {
		setLoading(true);

		if (password !== confirmPassword) {
			setLoading(false);
			return toast.error("Passwords do not match");
		}

		try {
			const res = await axios.post("/auth/signup", { name, email, password, role });
			const { token, ...userData } = res.data;
			localStorage.setItem("token", token);
			setUser(userData);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			toast.error(error.response?.data?.message || "An error occurred");
			console.log(error);
		}
	};

	const login = async (email, password) => {
		setLoading(true);

		try {
			const res = await axios.post("/auth/login", { email, password });
			const { token, ...userData } = res.data;
			localStorage.setItem("token", token);
			setUser(userData);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			toast.error(error.response?.data?.message || "An error occurred");
			console.log(error);
		}
	};

	const logout = async () => {
		try {
			await axios.post("/auth/logout");
		} catch (error) {
			console.log(error);
		} finally {
			localStorage.removeItem("token");
			setUser(null);
		}
	};

	const checkAuth = async () => {
		setCheckingAuth(true);
		const token = localStorage.getItem("token");

		if (!token) {
			setCheckingAuth(false);
			setUser(null);
			return;
		}

		try {
			const response = await axios.get("/auth/profile");
			setUser(response.data);
		} catch (error) {
			console.log(error.message);
			localStorage.removeItem("token");
			setUser(null);
		} finally {
			setCheckingAuth(false);
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<AuthContext.Provider value={{ user, loading, checkingAuth, signup, login, logout, checkAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
