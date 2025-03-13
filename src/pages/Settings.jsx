import { useState } from "react";
import {
  FaCog,
  FaUserShield,
  FaBell,
  FaLock,
  FaMoneyBillWave,
  FaDatabase,
  FaGlobe,
  FaKey,
} from "react-icons/fa";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoLogout, setAutoLogout] = useState(false);
  const [tab, setTab] = useState("users");

  return (
    <div className={`p-6 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FaCog className="mr-2" /> Website Settings
      </h2>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-2">
        {["users", "assessments", "notifications", "security", "payments", "integrations"].map(
          (item) => (
            <button
              key={item}
              className={`px-4 py-2 text-sm rounded-md transition-all duration-300 ${
                tab === item ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setTab(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          )
        )}
      </div>

      {/* User & Role Management */}
      {tab === "users" && (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg mx-auto">
          <h3 className="text-lg font-semibold mb-4">👥 User & Role Management</h3>
          <p className="text-sm text-gray-600">
            Manage admins, instructors, and students. Assign roles and permissions.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full sm:w-auto">
            Manage Users
          </button>
        </div>
      )}

      {/* Assessments & Exam Settings */}
      {tab === "assessments" && (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg mx-auto">
          <h3 className="text-lg font-semibold mb-4">📝 Assessment Settings</h3>
          <p className="text-sm text-gray-600">Configure grading, retakes, and exam policies.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full sm:w-auto">
            Manage Assessments
          </button>
        </div>
      )}

      {/* Notifications */}
      {tab === "notifications" && (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg mx-auto">
          <h3 className="text-lg font-semibold mb-4">🔔 Notification Settings</h3>
          <div className="flex justify-between items-center">
            <label>Email & Push Notifications</label>
            <button
              className={`px-4 py-2 rounded-md transition-all ${
                notifications ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => setNotifications(!notifications)}
            >
              {notifications ? "Enabled" : "Disabled"}
            </button>
          </div>
        </div>
      )}

      {/* Security & Privacy */}
      {tab === "security" && (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg mx-auto">
          <h3 className="text-lg font-semibold mb-4">🔒 Security & Privacy</h3>
          <div className="flex justify-between items-center mb-4">
            <label>Two-Factor Authentication (2FA)</label>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md">Enable</button>
          </div>
          <div className="flex justify-between items-center">
            <label>Auto Logout After Inactivity</label>
            <button
              className={`px-4 py-2 rounded-md transition-all ${
                autoLogout ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => setAutoLogout(!autoLogout)}
            >
              {autoLogout ? "Enabled" : "Disabled"}
            </button>
          </div>
        </div>
      )}

      {/* Payment & Subscription Settings */}
      {tab === "payments" && (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg mx-auto">
          <h3 className="text-lg font-semibold mb-4">💳 Payment & Subscription</h3>
          <p className="text-sm text-gray-600">Manage subscription plans and payment gateways.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full sm:w-auto">
            Manage Payments
          </button>
        </div>
      )}

      {/* Integrations & API Settings */}
      {tab === "integrations" && (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg mx-auto">
          <h3 className="text-lg font-semibold mb-4">🔗 Integrations & API</h3>
          <p className="text-sm text-gray-600">Connect third-party tools like Google, Zoom, Firebase.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full sm:w-auto">
            Manage Integrations
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;
