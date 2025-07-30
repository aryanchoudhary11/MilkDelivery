import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.isAdmin) setIsAdmin(true);
        else setIsAdmin(false);
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };

    if (userId && token) {
      fetchUserInfo();
    }
  }, [userId, token]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-100 shadow p-4 flex justify-between items-center">
      <div className="text-xl font-semibold text-blue-700">MilkDeliveryApp</div>

      <div className="flex gap-4 items-center">
        {!userId ? (
          <>
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="text-blue-600 hover:underline">
              Dashboard
            </Link>
            <Link to="/subscribe" className="text-blue-600 hover:underline">
              Subscribe
            </Link>

            {isAdmin && (
              <>
                <Link to="/admin" className="text-blue-600 hover:underline">
                  Admin
                </Link>
                <Link
                  to="/admin/subscriptions"
                  className="text-blue-600 hover:underline"
                >
                  Subscriptions
                </Link>
                <Link
                  to="/admin/stats"
                  className="text-blue-600 hover:underline"
                >
                  Stats
                </Link>
              </>
            )}

            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline ml-4"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
