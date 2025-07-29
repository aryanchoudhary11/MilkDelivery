// controllers/userController.js
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if the logged in user is admin
    const isAdmin = user.email === process.env.ADMIN_EMAIL;

    // Generate JWT token
    const token = generateToken(user._id);

    // Send response including isAdmin
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
      isAdmin, // ✅ added
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSubscription = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { subscription: req.body },
      { new: true, runValidators: true } // returns updated doc and runs validators
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Subscription update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// controllers/userController.js
export const updateRoutePreferences = async (req, res) => {
  try {
    const { userId } = req.params;
    const { preferredDeliveryTime, instructions } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          routePreferences: {
            preferredDeliveryTime,
            instructions,
          },
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Route preferences updated successfully",
      routePreferences: updatedUser.routePreferences,
    });
  } catch (error) {
    console.error("Error saving route preferences:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
