import React, { useEffect, useState } from "react";

const AdminStats = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/admin/subscriptions",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();
        setSubscriptions(data);
      } catch (error) {
        console.error("Failed to fetch subscriptions", error);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-xl shadow-md p-4 bg-white">
          <div className="text-gray-800">
            <h2 className="text-xl font-semibold mb-2">Total Subscriptions</h2>
            <p className="text-3xl">{subscriptions.length}</p>
          </div>
        </div>

        {/* Optional: More stats */}
        <div className="rounded-xl shadow-md p-4 bg-white">
          <div className="text-gray-800">
            <h2 className="text-xl font-semibold mb-2">Cities Covered</h2>
            <p className="text-3xl">
              {
                [
                  ...new Set(subscriptions.map((s) => s.subscription?.city)),
                ].filter(Boolean).length
              }
            </p>
          </div>
        </div>

        <div className="rounded-xl shadow-md p-4 bg-white">
          <div className="text-gray-800">
            <h2 className="text-xl font-semibold mb-2">
              Milk Types Subscribed
            </h2>
            <p className="text-3xl">
              {
                [
                  ...new Set(
                    subscriptions.map((s) => s.subscription?.milkType)
                  ),
                ].filter(Boolean).length
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
