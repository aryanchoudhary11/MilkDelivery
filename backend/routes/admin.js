import express from "express";
import {
  getAllSubscriptions,
  getAdminStats,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/subscriptions", protect, getAllSubscriptions);
router.get("/stats", protect, getAdminStats);

export default router;
