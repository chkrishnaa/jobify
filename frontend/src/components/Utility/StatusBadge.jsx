import React from "react";
import { useTheme } from "../../context/ThemeContext";

const StatusBadge = ({ status }) => {
  const { darkMode } = useTheme();
  const statusConfig = {
    Applied: darkMode
      ? "bg-gray-700 text-gray-100"
      : "bg-gray-200 text-gray-700",
    "In Review": darkMode
      ? "bg-blue-700 text-blue-100"
      : "bg-blue-200 text-blue-700",
    Accepted: darkMode
      ? "bg-green-700 text-green-100"
      : "bg-green-200 text-green-700",
    Rejected: darkMode ? "bg-red-700 text-red-100" : "bg-red-200 text-red-700",
  };

  return (
    <span
      className={`px-3 py-2 rounded text-sm font-medium ${
        statusConfig[status] ||
        (darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800")
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
