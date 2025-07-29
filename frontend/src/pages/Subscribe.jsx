import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Subscribe = () => {
  const [formData, setFormData] = useState({
    plan: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    milkType: "",
    quantity: "",
    deliveryTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to subscribe.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/subscribe",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Subscribed successfully!");
      setFormData({
        email: "",
        address: "",
        city: "",
        pincode: "",
        milkType: "",
        quantity: "",
        deliveryTime: "",
      });
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Subscription failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded-xl">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4 text-center">
        Subscribe for Milk Delivery
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
        />
        <select
          name="plan"
          required
          className="w-full p-2 border rounded"
          value={formData.plan}
          onChange={handleChange}
        >
          <option value="">Select Plan</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
        <input
          type="text"
          name="address"
          placeholder="Address"
          required
          className="w-full p-2 border rounded"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          required
          className="w-full p-2 border rounded"
          value={formData.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          required
          className="w-full p-2 border rounded"
          value={formData.pincode}
          onChange={handleChange}
        />
        <select
          name="milkType"
          required
          className="w-full p-2 border rounded"
          value={formData.milkType}
          onChange={handleChange}
        >
          <option value="">Select Milk Type</option>
          <option value="Cow">Cow</option>
          <option value="Buffalo">Buffalo</option>
        </select>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity (liters)"
          required
          className="w-full p-2 border rounded"
          value={formData.quantity}
          onChange={handleChange}
        />
        <select
          name="deliveryTime"
          required
          className="w-full p-2 border rounded"
          value={formData.deliveryTime}
          onChange={handleChange}
        >
          <option value="">Select Delivery Time</option>
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
