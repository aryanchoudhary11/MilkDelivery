import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminSubscriptions = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        const response = await axios.get(
          `${API_BASE_URL}/api/admin/subscriptions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubscriptions(response.data);
      } catch (error) {
        console.error("Failed to fetch subscriptions", error);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
        All Subscriptions
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Milk Type</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Delivery Time</th>
              <th className="p-2 border">City</th>
              <th className="p-2 border">Pincode</th>
              <th className="p-2 border">Subscribed At</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">
                  {user.subscription?.milkType || "—"}
                </td>
                <td className="p-2 border">
                  {user.subscription?.quantity || "—"}
                </td>
                <td className="p-2 border">
                  {user.subscription?.deliveryTime || "—"}
                </td>
                <td className="p-2 border">{user.subscription?.city || "—"}</td>
                <td className="p-2 border">
                  {user.subscription?.pincode || "—"}
                </td>
                <td className="p-2 border">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {subscriptions.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No subscriptions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSubscriptions;
