import express from "express";
import { adminRoute, protectRoute, sellerOrAdminRoute } from "../middleware/auth.middleware.js";
import {
  getAnalyticsData,
  getDailySalesData,
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/", protectRoute, sellerOrAdminRoute, async (req, res) => {
  try {
    const isPersonal = req.query.personal === "true";
    const roleToUse = (req.user.role === "admin" && !isPersonal) ? "admin" : "seller";

    const analyticsData = await getAnalyticsData(req.user._id, roleToUse);

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const dailySalesData = await getDailySalesData(startDate, endDate, req.user._id, roleToUse);

    res.json({
      analyticsData,
      dailySalesData,
    });
  } catch (error) {
    console.log("Error in analytics route", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
