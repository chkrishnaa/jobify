import React from "react";
import { useTheme } from "../../context/ThemeContext";

const NoResults = ({ icon: Icon, title, text }) => {
  const { darkMode } = useTheme();

  return (
    <div className="text-center py-12">
      <div
        className={`w-24 h-24 mx-auto ${
          darkMode ? "bg-gray-700" : "bg-gray-100"
        } rounded-full flex items-center justify-center mb-4`}
      >
        <Icon
          className={`w-10 h-10 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        />
      </div>
      <h3
        className={`text-lg font-medium ${
          darkMode ? "text-gray-200" : "text-gray-900"
        } mb-2`}
      >
        {title}
      </h3>
      <p
        dangerouslySetInnerHTML={{ __html: text }}
        className={`${darkMode ? "text-gray-400" : "text-gray-700"}`}
      ></p>
    </div>
  );
};

export default NoResults;
