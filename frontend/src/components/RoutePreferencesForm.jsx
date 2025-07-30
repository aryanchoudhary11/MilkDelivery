import React, { useState } from "react";
import axios from "axios";

const RoutePreferencesForm = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    preferredDeliveryTime: "",
    instructions: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    try {
      await axios.put(
        `${API_BASE_URL}/api/users/route-preferences/${userId}`,
        formData
      );
      alert("Preferences updated!");
    } catch (err) {
      alert("Error updating preferences");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">
        Route Preferences
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="preferredDeliveryTime"
            className="block mb-1 font-medium text-gray-700"
          >
            Preferred Delivery Time
          </label>
          <select
            name="preferredDeliveryTime"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Select--</option>
            <option value="morning">Morning (6 AM - 9 AM)</option>
            <option value="evening">Evening (6 PM - 9 PM)</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="instructions"
            className="block mb-1 font-medium text-gray-700"
          >
            Delivery Instructions
          </label>
          <textarea
            name="instructions"
            onChange={handleChange}
            rows={4}
            placeholder="Any specific instructions?"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
};

export default RoutePreferencesForm;
