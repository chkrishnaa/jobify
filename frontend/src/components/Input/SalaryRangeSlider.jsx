import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const SalaryRangeSlider = ({ filters, handleFilterChange }) => {
      const { darkMode } = useTheme();

  const [minSalary, setMinSalary] = useState(filters?.minSalary || 0);
  const [maxSalary, setMaxSalary] = useState(filters?.maxSalary || 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-200" : "text-gray-700"
            } mb-2`}
          >
            Min Salary
          </label>
          <input
            type="number"
            placeholder="0"
            min="0"
            step="1000"
            className={`w-full px-3 py-2 rounded-md shadow-sm focus:ring focus:ring-opacity-50 border
  ${
    darkMode
      ? "bg-gray-900 text-gray-200 border-gray-700 focus:border-purple-600 focus:ring-purple-500"
      : "bg-white text-gray-900 border-gray-300 focus:border-blue-300 focus:ring-blue-200"
  }`}
            value={minSalary || ""}
            onChange={({ target }) => setMinSalary(target.value)}
            onBlur={() =>
              handleFilterChange(
                "minSalary",
                minSalary ? parseInt(minSalary) : ""
              )
            }
          />
        </div>

        <div>
          <label
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-200" : "text-gray-700"
            } mb-2`}
          >
            Max Salary
          </label>
          <input
            type="number"
            placeholder="No Limit"
            min="0"
            step="1000"
            className={`w-full px-3 py-2 rounded-md shadow-sm focus:ring focus:ring-opacity-50
  ${
    darkMode
      ? "bg-gray-900 text-gray-200 border border-gray-700 focus:border-purple-600 focus:ring-purple-500"
      : "bg-white text-gray-900 border border-gray-300 focus:border-blue-300 focus:ring-blue-200"
  }`}
            value={maxSalary || ""}
            onChange={({ target }) => setMaxSalary(target.value)}
            onBlur={() =>
              handleFilterChange(
                "maxSalary",
                maxSalary ? parseInt(maxSalary) : ""
              )
            }
          />
        </div>
      </div>

      {minSalary || maxSalary ? (
        <div
          className={`text-sm px-3 py-2 rounded
      ${darkMode ? "text-gray-300 bg-gray-800" : "text-gray-600 bg-gray-50"}`}
        >
          Range: {minSalary ? `₹${minSalary.toLocaleString()}` : "₹0"} -{" "}
          {maxSalary ? `₹${maxSalary.toLocaleString()}` : "No limit"}
        </div>
      ) : null}
    </div>
  );
};

export default SalaryRangeSlider;
