import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../../../context/ThemeContext";

const ToggleMode = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300
        ${
          darkMode
            ? "bg-gradient-to-r from-purple-700 to-blue-700"
            : "bg-gradient-to-r from-purple-600 to-blue-600"
        }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300
          ${
            darkMode ? "translate-x-4" : "translate-x-0"
          } flex items-center justify-center`}
      >
        {darkMode ? (
          <Sun className="text-blue-700 w-3 h-3" />
        ) : (
          <Moon className="text-purple-700 w-3 h-3" />
        )}
      </div>
    </button>
  );
};

export default ToggleMode;
