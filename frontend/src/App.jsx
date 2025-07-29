// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Subscribe from "./pages/Subscribe";
import AdminSubscriptions from "./pages/AdminSubscriptions";
import AdminStats from "./pages/AdminStats";
import Navbar from "./components/Navbar";

function App() {
  const userId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // 👈 check from localStorage

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected user route */}
        <Route
          path="/dashboard"
          element={userId ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Admin-only routes */}
        <Route
          path="/admin"
          element={
            userId && isAdmin ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/admin/stats"
          element={
            userId && isAdmin ? <AdminStats /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/admin/subscriptions"
          element={
            userId && isAdmin ? (
              <AdminSubscriptions />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        {/* Authenticated users only */}
        <Route
          path="/subscribe"
          element={userId ? <Subscribe /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
