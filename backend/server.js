// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();
const app = express();

// ✅ Allow cross-origin requests from frontend
app.use(cors());

// ✅ Enable JSON body parsing
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ API Routes
app.use("/api/users", userRoutes);

app.use("/api/delivery", deliveryRoutes);

app.use("/api", subscriptionRoutes);

app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
