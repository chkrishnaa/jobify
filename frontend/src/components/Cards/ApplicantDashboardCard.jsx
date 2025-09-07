import { Clock } from "lucide-react";
import React from "react";
import { getInitials } from "../../utils/helper";
import { useTheme } from "../../context/ThemeContext";

const ApplicantDashboardCard = ({ applicant, position, time }) => {
  const { darkMode } = useTheme();
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border ${
        darkMode
          ? "border-gray-700 hover:border-gray-600 shadow-[0_2px_6px_rgba(255,255,255,0.08)] hover:shadow-[0_4px_8px_rgba(255,255,255,0.12)]"
          : "border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
      } transition-colors`}
    >
      <div className="flex items-center space-x-4">
        {applicant.avatar ? (
          <img
            src={applicant.avatar}
            alt="Avatar"
            className="h-10 w-10 object-cover rounded-xl"
          />
        ) : (
          <div
            className={`h-10 w-10 bg-gradient-to-br ${
              darkMode
                ? "from-purple-500 to-purple-700"
                : "from-purple-300 to-purple-500"
            } rounded-xl flex items-center justify-center`}
          >
            <span className="text-white font-medium text-sm">
              {getInitials(applicant.name)}
            </span>
          </div>
        )}
        <div className="">
          <h4
            className={`text-[15px] font-medium ${
              darkMode ? "text-gray-300" : "text-gray-900"
            }`}
          >
            {applicant.name}
          </h4>
          <p
            className={`text-xs ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {position}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-5">
        <div
          className={`flex items-center text-xs ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <Clock className="h-3 w-3 mr-1" />
          {time}
        </div>
      </div>
    </div>
  );
};

export default ApplicantDashboardCard;
