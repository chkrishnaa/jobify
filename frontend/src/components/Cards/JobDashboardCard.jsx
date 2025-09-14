import React from "react";
import { Briefcase } from "lucide-react";
import moment from "moment";
import { useTheme } from "../../context/ThemeContext";

const JobDashboardCard = ({ job, avatar }) => {
  const { darkMode } = useTheme();
  return (
    <div
      className={`flex items-center justify-between p-2 sm:p-4 rounded-md sm:rounded-xl border ${
        darkMode
          ? "border-gray-700 hover:border-gray-600 shadow-[0_2px_6px_rgba(255,255,255,0.08)] hover:shadow-[0_4px_8px_rgba(255,255,255,0.12)]"
          : "border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
      } transition-colors`}
    >
      <div className="flex items-center space-x-2 sm:space-x-4">
        {avatar ? (
          <img
            src={avatar}
            alt="Avatar"
            className="h-8 w-8 sm:h-10 sm:w-10 object-cover rounded-md sm:rounded-xl"
          />
        ) : (
          <div
            className={`h-8 w-8 sm:h-10 sm:w-10 ${
              darkMode ? "bg-purple-300" : "bg-purple-100"
            } rounded-md sm:rounded-xl flex items-center justify-center overflow-hidden`}
          >
            <Briefcase
              className={`h-5 w-5 ${
                darkMode ? "text-purple-800" : "text-purple-600"
              }`}
            />
          </div>
        )}
        <div>
          <h4
            className={`text-[14px] sm:text-[16px] font-medium ${
              darkMode ? "text-gray-300" : "text-gray-900"
            }`}
          >
            {job.title}
          </h4>
          <p
            className={`text-xs ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {job.location} · {moment(job.createdAt)?.format("Do MMM, YYYY")}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <span
          className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${
            !job.isClosed
              ? `${
                  darkMode
                    ? "bg-green-300 text-green-900"
                    : "bg-green-100 text-green-700"
                }`
              : `${
                  darkMode
                    ? "bg-gray-800 text-gray-400"
                    : "bg-gray-300 text-gray-700"
                }`
          }`}
        >
          {job.isClosed ? "Closed" : "Active"}
        </span>
      </div>
    </div>
  );
};

export default JobDashboardCard;
