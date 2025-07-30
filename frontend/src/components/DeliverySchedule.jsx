import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DeliverySchedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) return; // Prevent API call if userId is not ready

      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/delivery/schedule/${userId}`
        );
        setSchedule(res.data.schedule);
      } catch (err) {
        console.error("Error fetching schedule", err);
      }
    };

    fetchSchedule();
  }, []); // still depends on nothing

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        📅 Delivery Schedule
      </h2>

      {schedule.length === 0 ? (
        <p className="text-gray-500">No upcoming deliveries found.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          {schedule.map((date, index) => (
            <li key={index}>{new Date(date).toDateString()}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeliverySchedule;
