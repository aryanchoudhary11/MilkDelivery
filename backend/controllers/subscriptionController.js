import User from "../models/User.js";

export const subscribeUser = async (req, res) => {
  console.log("🔍 req.user: ", req.user);

  const { plan, milkType, quantity, deliveryTime, city, pincode } = req.body;

  try {
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user in request" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        subscription: {
          plan,
          milkType,
          quantity,
          deliveryTime,
          city,
          pincode,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Subscription successful",
      subscription: updatedUser.subscription,
    });
  } catch (error) {
    console.error("❌ Error subscribing:", error);
    res
      .status(500)
      .json({ message: "Subscription failed", error: error.message });
  }
};
