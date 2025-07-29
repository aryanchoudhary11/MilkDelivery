import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateSubscription,
  updateRoutePreferences,
} from "../controllers/userController.js";
import { subscribeUser } from "../controllers/subscriptionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// new routes
router.get("/profile/:id", getUserProfile);
router.put("/subscription/:userId", updateSubscription);
router.put("/route-preferences/:userId", updateRoutePreferences);
router.post("/subscribe", protect, subscribeUser);

export default router;
