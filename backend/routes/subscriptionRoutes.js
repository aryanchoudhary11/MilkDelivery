import express from "express";
import { subscribeUser } from "../controllers/subscriptionController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/subscribe", protect, subscribeUser);

export default router;
