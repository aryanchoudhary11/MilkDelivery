// backend/controllers/adminController.js
import User from "../models/User.js";

// Get all user subscriptions (from embedded subscription data)
export const getAllSubscriptions = async (req, res) => {
  try {
    const subscribedUsers = await User.find(
      { "subscription.milkType": { $exists: true } },
      {
        name: 1,
        email: 1,
        address: 1, // ✅ Include address
        "subscription.milkType": 1,
        "subscription.quantity": 1,
        "subscription.city": 1,
        "subscription.pincode": 1,
        "subscription.deliveryTime": 1,
        "subscription.plan": 1, // ✅ Include plan
        createdAt: 1,
      }
    ).sort({ createdAt: -1 });

    res.status(200).json(subscribedUsers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch subscriptions", error });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    const subscribedUsers = await User.find({
      "subscription.milkType": { $exists: true },
    });

    const totalSubscribers = subscribedUsers.length;

    const milkTypeCount = {};
    const deliveryTimeCount = {};
    const cityCount = {};

    subscribedUsers.forEach((user) => {
      const { milkType, deliveryTime, city } = user.subscription;

      milkTypeCount[milkType] = (milkTypeCount[milkType] || 0) + 1;
      deliveryTimeCount[deliveryTime] =
        (deliveryTimeCount[deliveryTime] || 0) + 1;
      cityCount[city] = (cityCount[city] || 0) + 1;
    });

    res.status(200).json({
      totalSubscribers,
      milkTypeCount,
      deliveryTimeCount,
      cityCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats", error });
  }
};
