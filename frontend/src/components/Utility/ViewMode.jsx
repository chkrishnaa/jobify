import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Grid, List } from "lucide-react";

const ViewMode = ({ viewMode, setViewMode }) => {
  const { darkMode } = useTheme();

  return (
    <div className="flex items-center gap-3 lg:gap-4">
      <div
        className={`flex items-center border ${
          darkMode
            ? "border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-700"
            : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
        } rounded-xl p-1`}
      >
        {/* Grid Button */}
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === "grid"
              ? "bg-blue-600 text-white shadow-sm"
              : darkMode
              ? "text-gray-300 hover:text-white hover:bg-gray-700"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <Grid className="h-4 w-4" />
        </button>

        {/* List Button */}
        <button
          onClick={() => setViewMode("list")}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === "list"
              ? "bg-blue-600 text-white shadow-sm"
              : darkMode
              ? "text-gray-300 hover:text-white hover:bg-gray-700"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <List className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ViewMode;
