import { useState } from "react";
import axios from "axios";

const SubscriptionForm = ({ userId }) => {
  const [milkType, setMilkType] = useState("Cow");
  const [quantity, setQuantity] = useState(1);
  const [plan, setPlan] = useState("Daily");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/users/subscription/${userId}`,
        {
          subscription: { milkType, quantity, plan },
        }
      );
      setMessage("✅ Subscription updated successfully!");
    } catch (err) {
      setMessage("❌ Failed to update subscription");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-6 bg-white shadow-lg rounded-xl border">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
        Update Subscription
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Milk Type:
          </label>
          <select
            value={milkType}
            onChange={(e) => setMilkType(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Cow">Cow</option>
            <option value="Buffalo">Buffalo</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Quantity (Litres):
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min={1}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Plan:</label>
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Update Subscription
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-green-600 font-medium">
          {message}
        </p>
      )}
    </div>
  );
};

export default SubscriptionForm;
