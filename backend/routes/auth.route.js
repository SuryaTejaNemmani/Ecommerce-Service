import express from 'express';
import { getProfile, login, signup, logout } from '../controllers/auth.contollers.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protectRoute, getProfile);

export default router;