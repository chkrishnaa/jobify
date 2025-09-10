import React from 'react'
import {Bookmark, Building, Building2, Calendar, MapPin} from 'lucide-react'
import {useAuth} from '../../context/AuthContext'
import StatusBadge from "../Utility/StatusBadge";
import moment from 'moment'
import { useTheme } from "../../context/ThemeContext";

const JobCard = ({ job, onClick, onToggleSave, onApply, saved, hideApply }) => {
  const { user } = useAuth();
  const { darkMode } = useTheme();

  const formatSalary = (min, max) => {
    const formatNumber = (num) => {
      if (num >= 1000) return `₹${(num / 1000).toFixed(1)}k`;
      return num;
    };
    return `${formatNumber(min)}/m`;
  };

  return (
    <div
      className={`bg-gradient-to-br ${
        darkMode
          ? "from-gray-800 to-gray-950 border border-gray-700 shadow-[0_4px_12px_rgba(255,255,255,0.4)] hover:shadow-[0_6px_18px_rgba(255,255,255,0.4)]"
          : "from-gray-50 to-gray-200 border border-gray-200 shadow-lg hover:shadow-xl"
      } rounded-2xl p-6  transition-all duration-300 group relative overflow-hidden cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          {job?.company?.companyLogo ? (
            <img
              src={job?.company?.companyLogo}
              alt="Company Logo"
              className={`w-14 h-14 object-cover rounded-2xl border-4 ${
                darkMode
                  ? "border-gray-700 shadow-[0_4px_12px_rgba(255,255,255,0.4)]"
                  : "border-white/20 shadow-lg"
              }`}
            />
          ) : (
            <div
              className={`w-14 h-14 border-2 ${
                darkMode
                  ? "border-gray-700 bg-gray-800"
                  : "border-gray-200 bg-gray-50"
              } rounded-2xl flex items-center justify-center`}
            >
              <Building2
                className={`h-8 w-8 ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              />
            </div>
          )}

          <div className="flex-1">
            <h3
              className={`font-semibold text-base ${
                darkMode
                  ? "text-gray-300 group-hover:text-blue-500"
                  : "text-gray-900 group-hover:text-blue-600"
              } transition-colors leading-snug`}
            >
              {job?.title}
            </h3>
            <p
              className={`${
                darkMode ? "text-gray-400" : "text-gray-600"
              } text-sm flex items-center gap-2 mt-1`}
            >
              <Building className="h-3.5 w-3.5" />
              {job?.company?.companyName}
            </p>
          </div>
        </div>

        {user && (
          <button
            className={`p-2 rounded-xl transition-colors ${
              darkMode
                ? "hover:bg-gray-800 text-gray-300"
                : "hover:bg-gray-200 text-gray-600"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
          >
            <Bookmark
              className={`w-5 h-5 ${
                job?.isSaved || saved
                  ? "text-blue-500" // ✅ consistent saved state color
                  : darkMode
                  ? "hover:text-blue-200" // ✅ subtle in dark mode
                  : "hover:text-blue-700" // ✅ subtle in light mode
              } text-blue-500`}
              fill={job?.isSaved || saved ? "currentColor" : "none"}
            />
          </button>
        )}
      </div>

      <div className="mb-5">
        <div className="flex items-center gap-2 text-xs">
          {/* Job Type Badge */}
          <span
            className={`px-3 py-1 rounded-full font-medium ${
              job?.type === "Full-Time"
                ? darkMode
                  ? "bg-green-700 text-green-200"
                  : "bg-green-100 text-green-800"
                : job?.type === "Part-Time"
                ? darkMode
                  ? "bg-yellow-700 text-yellow-200"
                  : "bg-yellow-100 text-yellow-800"
                : job?.type === "Contract"
                ? darkMode
                  ? "bg-purple-700 text-purple-200"
                  : "bg-purple-100 text-purple-800"
                : darkMode
                ? "bg-blue-700 text-blue-200"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {job?.type}
          </span>

          {/* Category Badge */}
          <span
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium ${
              darkMode
                ? "bg-gray-800 text-gray-300"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {job?.category}
          </span>
        </div>
      </div>

      <div
        className={`flex items-center justify-between text-sm font-medium ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {job?.createdAt
              ? moment(job.createdAt).format("Do MMM, YYYY")
              : "N/A"}
          </span>
        </div>
      </div>

      <div
        className={`flex items-center justify-end my-3 pb-4 border-b ${
          darkMode ? "border-gray-700" : "border-gray-100"
        } text-xs`}
      >
        <span
          className={`flex items-center gap-1.5 ${
            darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
          } px-3 py-1 rounded-full font-medium`}
        >
          <MapPin className="h-4 w-4" />
          {job?.location}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div
          className={`${
            darkMode ? "text-blue-500" : "text-blue-600"
          } fomt-semibold text-md font-semibold`}
        >
          {formatSalary(job?.salaryMin, job?.salaryMax)}
        </div>
        {!saved && (
          <>
            {job?.applicationStatus ? (
              <StatusBadge status={job?.applicationStatus} />
            ) : (
              !hideApply && (
                <button
                  className={`bg-gradient-to-r text-sm ${
                    darkMode
                      ? "from-blue-400 to-blue-600 text-blue-50 hover:text-white hover:from-blue-500 hover:to-blue-700"
                      : "from-blue-50 to-blue-100 text-blue-700 hover:text-white hover:from-blue-400 hover:to-blue-600"
                  } px-6 py-2.5 rounded-xl transition-all duration-300 font-semibold transform hover:-translate-y-0.5`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onApply();
                  }}
                >
                  Apply Now
                </button>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobCard
