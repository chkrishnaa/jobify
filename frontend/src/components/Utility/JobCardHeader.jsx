import { Clock } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const JobCardHeader = ({ category, type, createdAt, children }) => {
  const { darkMode } = useTheme();

  return (
    <div>
      {children}

      <div className="flex flex-wrap gap-1 sm:gap-3 mt-6 md:mt-4">
        <span
          className={`flex items-center px-2 sm:px-4 py-1 sm:py-2 border-2 ${
            darkMode
              ? "text-purple-100 bg-purple-800 border-purple-400"
              : "text-purple-700 bg-purple-100 border-purple-200"
          } text-xs sm:text-sm font-semibold rounded-lg sm:rounded-full`}
        >
          {category}
        </span>

        <span
          className={`flex items-center px-2 sm:px-4 py-1 sm:py-2 border-2 ${
            darkMode
              ? "text-blue-100 bg-blue-800 border-blue-400"
              : "text-blue-700 bg-blue-100 border-blue-200"
          } text-xs sm:text-sm font-semibold rounded-lg sm:rounded-full`}
        >
          {type}
        </span>

        <span
          className={`flex items-center px-2 sm:px-4 py-1 sm:py-2 border-2 gap-1 sm:gap-2 ${
            darkMode
              ? "text-gray-100 bg-gray-800 border-gray-400"
              : "text-gray-700 bg-gray-100 border-gray-200"
          } text-xs sm:text-sm font-semibold rounded-lg sm:rounded-full`}
        >
          <Clock className="h-3 sm:h-4 w-3 sm:w-4" />
          {createdAt}
        </span>
      </div>
    </div>
  );
};

export default JobCardHeader;
