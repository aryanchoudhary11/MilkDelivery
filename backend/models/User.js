// models/User.js

import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  plan: String,
  milkType: String,
  quantity: Number,
  deliveryTime: String,
  city: String,
  pincode: String,
});

const routePreferencesSchema = new mongoose.Schema({
  preferredDeliveryTime: String,
  instructions: String,
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscription: subscriptionSchema,
  routePreferences: routePreferencesSchema, // ✅ Add this line
});

const User = mongoose.model("User", userSchema);
export default User;
