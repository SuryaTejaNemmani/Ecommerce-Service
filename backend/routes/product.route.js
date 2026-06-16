import express from "express";
import {deleteProduct,toggleFeaturedProduct, getProductsByCategory,getRecommendedProducts,createProduct,getAllProducts,getFeaturedProducts } from "../controllers/product.controller.js";
import { adminRoute, protectRoute, sellerOrAdminRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/",protectRoute,sellerOrAdminRoute,getAllProducts);
router.get("/featured",getFeaturedProducts);
router.get("/category/:category",getProductsByCategory);
router.get("/recommendations",getRecommendedProducts);
router.post("/",protectRoute,sellerOrAdminRoute,createProduct);
router.patch("/:id",protectRoute,adminRoute,toggleFeaturedProduct);
router.delete("/:id",protectRoute,sellerOrAdminRoute,deleteProduct);

export default router;