import express from "express";
import { getDeliverySchedule } from "../controllers/deliveryController.js";

const router = express.Router();

router.get("/schedule/:userId", getDeliverySchedule);

export default router;
