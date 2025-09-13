import React from "react";
import { MapPin, Search } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

const SearchHeader = ({ filters, handleFilterChange }) => {
  const { darkMode } = useTheme();
  return (
    <div
      className={` border-none sm:border ${
        darkMode
          ? "border-gray-700 bg-gray-900 shadow-[0_6px_18px_rgba(255,255,255,0.4)]"
          : "border-white/20 bg-white/80 shadow-lg shadow-gray-200"
      } backdrop-blur-xl rounded-none sm:rounded-lg lg:rounded-2xl px-2 py-4 sm:px-4 lg:p-8 mb-6 lg:mb-8`}
    >
      <div className="flex flex-col gap-4 lg:gap-6">
        <div className="text-center lg:text-left">
          <h1
            className={`text-2xl lg:text-2xl font-semibold bg-gradient-to-r ${
              darkMode ? "from-white to-gray-400" : "from-gray-900 to-gray-100"
            } bg-clip-text text-transparent mb-2`}
          >
            Find Your Dream Job
          </h1>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            } lg:text-base`}
          >
            Discover opportunities that match your passion
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
          <div className="flex-1 relative">
            <Search
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                darkMode ? "text-gray-500" : "text-gray-400"
              } z-[1]`}
            ></Search>
            <input
              type="text"
              className={`w-full pl-12 pr-4 py-2 lg:py-2.5 border ${
                darkMode
                  ? "border-gray-700 bg-gray-900 placeholder:text-gray-500"
                  : "border-gray-200 bg-white/50 placeholder:text-gray-400"
              }  rounded-lg sm:rounded-2xl outline-0 text-basebackdrop-blur-sm`}
              placeholder="Job title, company, or keywords ..."
              value={filters.keyword}
              onChange={(e) => handleFilterChange("keyword", e.target.value)}
            />
          </div>

          <div className="relative min-w-0 lg:min-w-[200px]">
            <MapPin
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                darkMode ? "text-gray-500" : "text-gray-400"
              } z-[1]`}
            ></MapPin>
            <input
              type="text"
              className={`w-full pl-12 pr-4 py-2 lg:py-2.5 border ${
                darkMode
                  ? "border-gray-700 bg-gray-900 placeholder:text-gray-500"
                  : "border-gray-200 bg-white/50 placeholder:text-gray-400"
              }  rounded-lg sm:rounded-2xl outline-0 text-basebackdrop-blur-sm`}
              placeholder="Location"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            />
          </div>

          <button
            className={`bg-gradient-to-r ${
              darkMode
                ? "from-blue-500 to-blue-700 text-gray-300 hover:from-blue-700 hover:to-blue-900"
                : "from-blue-400 to-blue-600 text-white hover:from-blue-600 hover:to-blue-800"
            } px-6 lg:px-10 py-3 lg:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
          >
            Search Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
