import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/admin/subscriptions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSubscriptions(res.data);
      } catch (err) {
        console.error("Failed to fetch subscriptions:", err);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard – All Subscriptions
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subscriptions.map((sub, index) => (
          <div key={index} className="border p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">{sub.email}</h2>
            <p>Milk Type: {sub.subscription?.milkType}</p>
            <p>Quantity: {sub.subscription?.quantity} L</p>
            <p>Plan: {sub.subscription?.plan}</p>
            <p>Address: {sub.address || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
