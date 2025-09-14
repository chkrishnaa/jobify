import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { IndianRupee, Users } from "lucide-react";

const JobInfo = ({ ...props }) => {
  const { darkMode } = useTheme();

  const normalizeText = (text) => {
    if (!text) return "";

    return text
      .replace(/[ \t]+/g, " ") // collapse multiple spaces/tabs into one
      .replace(/\n{3,}/g, "\n\n") // collapse 3+ newlines into exactly 2
      .trim();
  };


  return (
    <div className="px-0 pb-4 sm:pb-8 print:py-0 space-y-4 sm:space-y-8">
      <div
        className={`relative overflow-hidden bg-gradient-to-r ${
          darkMode
            ? "from-emerald-300 to-teal-300 border border-emerald-950"
            : "from-emerald-50 to-teal-50 border border-emerald-100"
        } p-2 sm:p-6 rounded-lg sm:rounded-2xl`}
      >
        <div
          className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${
            darkMode
              ? "from-emerald-700/20 to-teal-700/20"
              : "from-emerald-400/10 to-teal-400/10"
          } rounded-full -translate-y-16 translate-x-16`}
        ></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`p-3 bg-gradient-to-r ${
                  darkMode
                    ? "from-emerald-400 to-teal-600"
                    : "from-emerald-300 to-teal-500"
                } rounded-xl`}
              >
                <IndianRupee className={`h-4 w-4 md:h-6 md:w-6 text-white`} />
              </div>

              <div className="">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
                  Compensation
                </h3>
                <div className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900">
                  {props.salaryMin} - {props.salaryMax}
                  <span className="text-xs sm:text-sm text-gray-600 font-normal ml-1">
                    {" "}
                    per year
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`hidden sm:flex items-center space-x-2 text-sm ${
                darkMode
                  ? "text-emerald-600 bg-gray-200"
                  : "text-emerald-700 bg-emerald-100"
              } px-3 py-1 rounded-full space-x-2`}
            >
              <Users className="h-4 w-4" />
              <span>Competitive</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3
          className={`text-2xl font-bold ${
            darkMode ? "text-gray-200" : "text-gray-900"
          } flex items-center space-x-3`}
        >
          <div
            className={`w-1 h-8 bg-gradient-to-b ${
              darkMode
                ? "from-blue-600 to-purple-700"
                : "from-blue-500 to-purple-600"
            } rounded-full`}
          ></div>
          <span className="text-base md:text-lg">About This Role</span>
        </h3>
        <div
          className={`relative overflow-hidden bg-gradient-to-br border ${
            darkMode
              ? "from-blue-400 to-purple-400 border-purple-400"
              : "from-blue-100 to-purple-100 border-purple-100"
          } p-2 sm:p-6 rounded-md sm:rounded-xl`}
        >
          <div
            className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${
              darkMode
                ? "from-blue-800/10 to-purple-800/10"
                : "from-blue-600/10 to-purple-600/10"
            } rounded-full -translate-y-16 translate-x-16`}
          ></div>
          <div
            className={`absolute bottom-[-8rem] left-[4rem] w-60 h-60 bg-gradient-to-br ${
              darkMode
                ? "from-blue-800/10 to-purple-600/10"
                : "from-blue-600/10 to-purple-400/10"
            } rounded-full`}
          ></div>
          <div
            className={`text-xs sm:text-sm ${
              darkMode ? "text-gray-950" : "text-gray-700"
            } leading-relaxed whitespace-pre-wrap text-justify font-sm`}
          >
            {normalizeText(props.description)}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3
          className={`text-2xl font-bold ${
            darkMode ? "text-gray-200" : "text-gray-900"
          } flex items-center space-x-3`}
        >
          <div
            className={`w-1 h-8 bg-gradient-to-b ${
              darkMode
                ? "from-purple-600 to-pink-700"
                : "from-purple-500 to-pink-600"
            } rounded-full`}
          ></div>
          <span className="text-base md:text-lg">What We're Looking For</span>
        </h3>
        <div
          className={`relative overflow-hidden bg-gradient-to-br border ${
            darkMode
              ? "from-purple-400 via-blue-300 to-pink-300 border-pink-300"
              : "from-purple-100 via-blue-100 to-pink-100 border-pink-100"
          } p-2 sm:p-6 rounded-md sm:rounded-xl`}
        >
          <div
            className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${
              darkMode
                ? "from-pink-800/10 to-pink-700/10"
                : "from-pink-600/10 to-pink-600/10"
            } rounded-full -translate-y-16 translate-x-16`}
          ></div>
          <div
            className={`absolute bottom-[-8rem] left-[4rem] w-60 h-60 bg-gradient-to-br ${
              darkMode
                ? "from-pink-800/10 to-pink-600/10"
                : "from-pink-600/10 to-pink-400/10"
            } rounded-full`}
          ></div>
          <div
            className={`text-xs sm:text-sm ${
              darkMode ? "text-gray-950" : "text-gray-700"
            } leading-relaxed whitespace-pre-wrap text-justify font-sm`}
          >
            {normalizeText(props.requirements)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobInfo;
