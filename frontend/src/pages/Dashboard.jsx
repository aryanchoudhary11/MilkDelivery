import React, { useEffect, useState } from "react";
import axios from "axios";
import DeliverySchedule from "../components/DeliverySchedule";
import RoutePreferencesForm from "../components/RoutePreferencesForm";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    plan: "",
    quantity: "",
    milkType: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const res = await axios.get(
          `http://localhost:5000/api/users/profile/${userId}`
        );
        setUser(res.data);
        if (res.data.subscription) {
          setFormData(res.data.subscription);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.put(
        `http://localhost:5000/api/users/subscription/${userId}`,
        formData
      );
      alert("Subscription updated!");
      setUser(res.data);
      if (res.data.subscription) {
        setFormData(res.data.subscription);
      }
    } catch (err) {
      alert("Failed to update subscription");
      console.error(err);
    }
  };

  if (!user) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
      <p className="mb-6 text-gray-700">Email: {user.email}</p>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Current Subscription:</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            <strong>Plan:</strong> {user.subscription?.plan || "N/A"}
          </li>
          <li>
            <strong>Quantity:</strong> {user.subscription?.quantity || "0"}{" "}
            litres
          </li>
          <li>
            <strong>Milk Type:</strong> {user.subscription?.milkType || "N/A"}
          </li>
        </ul>
      </div>

      <h2 className="text-lg font-semibold mb-2">Update Subscription:</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plan
          </label>
          <select
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Plan --</option>
            <option value="Daily">Daily</option>
            <option value="Alternate Days">Alternate Days</option>
            <option value="Weekends Only">Weekends Only</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity (litres)
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="0.1"
            step="0.1"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Milk Type
          </label>
          <select
            name="milkType"
            value={formData.milkType}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Milk Type --</option>
            <option value="Cow">Cow</option>
            <option value="Buffalo">Buffalo</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Update Subscription
        </button>
      </form>

      <DeliverySchedule />
      <RoutePreferencesForm />
    </div>
  );
};

export default DashboardPage;
