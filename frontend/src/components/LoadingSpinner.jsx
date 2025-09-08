import React from "react";
import { Briefcase } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const LoadingSpinner = () => {
  const {darkMode} = useTheme();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div
            className={`not-only:animate-spin rounded-full h-16 w-16 border-4 ${
              darkMode
                ? "border-blue-100 border-t-blue-500"
                : "border-blue-400 border-t-blue-600"
            } mx-auto mb-2`}
          ></div>
          <div className="not-only:absolute inset-0 flex items-center justify-center">
            <Briefcase
              className={`w-6 h-6 ${
                darkMode ? "text-blue-500" : "text-blue-600"
              }`}
            />
          </div>
        </div>
        <p
          className={`${
            darkMode ? "not-only:text-gray-400" : "not-only:text-gray-600"
          } font-medium`}
        >
          Finding Amazing Opportunities ...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
