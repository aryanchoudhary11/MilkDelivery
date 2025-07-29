import User from "../models/User.js";

export const getDeliverySchedule = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user || !user.subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    const { plan } = user.subscription;

    const today = new Date();
    const schedule = [];
    const numDays = 14; // show next 14 days

    for (let i = 0; i < numDays; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const day = date.getDay(); // 0=Sunday ... 6=Saturday

      if (
        plan === "Daily" ||
        (plan === "Alternate Days" && i % 2 === 0) ||
        (plan === "Weekends Only" && (day === 0 || day === 6))
      ) {
        schedule.push(date.toISOString().split("T")[0]);
      }
    }

    res.json({ schedule });
  } catch (err) {
    console.error("Delivery schedule error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
