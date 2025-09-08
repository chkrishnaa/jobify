import React from "react";
import {
  MapPin,
  IndianRupee,
  ArrowLeft,
  Building2,
  Clock,
  Users,
} from "lucide-react";
import { CATEGORIES, JOB_TYPES } from "../../utils/data";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const JobPostingPreview = ({ formData, setIsPreview }) => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const currencies = [{ label: "INR", value: "₹" }];
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div
          className={` mb-8 backdrop-blur-sm ${
            darkMode
              ? "bg-gray-900 shadow-[0_6px_18px_rgba(255,255,255,0.4)]"
              : "bg-white/80 border-white/20 shadow-xl"
          } rounded-2xl p-6`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2
                className={`text-xl font-bold bg-gradient-to-r ${
                  darkMode
                    ? "from-white to-gray-300"
                    : "from-gray-900 to-gray-500"
                } bg-clip-text text-transparent`}
              >
                Job Preview
              </h2>
            </div>
            <button
              onClick={() => setIsPreview(false)}
              className={`group flex items-center space-x-2 text-sm font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-lg ${
                darkMode
                  ? "text-gray-300 bg-gray-800/50 border border-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-700 hover:to-purple-800 shadow-gray-600 hover:shadow-gray-500"
                  : "text-gray-600 bg-white/50 border border-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700 shadow-gray-400 hover:shadow-xl"
              } hover:border-transparent transform hover:-translate-y-0.5`}
            >
              <ArrowLeft
                className={`h-4 w-4 transition-transform group-hover:-translate-x-1`}
              />
              <span>Back to Edit</span>
            </button>
          </div>
          <div className="">
            {/* Hero section with clean background */}
            <div
              className={`relative ${
                darkMode ? " bg-gray-800" : " bg-white"
              } py-8 px-4 my-8 rounded-lg`}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-0">
                  <div className="flex-1">
                    <h1
                      className={`text-lg lg:text-xl font-semibold mb-2 leading-tight ${
                        darkMode ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      {formData.jobTitle}
                    </h1>

                    <div
                      className={`flex items-center space-x-4 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4"></MapPin>
                        <span className="text-sm font-medium">
                          {formData.isRemote ? "Remote" : formData.location}
                        </span>
                        {formData.isRemote && formData.location && (
                          <span className={`text-sm `}>
                            {" "}
                            {formData.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {user?.companyLogo ? (
                    <img
                      src={user?.companyLogo}
                      alt="company logo"
                      className="h-16 w-16 md:h-20 md:w-20 object-cover rounded-2xl border-4 border-white/20 shadow-lg"
                    />
                  ) : (
                    <div
                      className={`h-20 w-20 ${
                        darkMode
                          ? "bg-gray-600 border-2 border-gray-700"
                          : "bg-gray-200 border-2 border-gray-300"
                      } rounded-2xl flex items-center justify-center`}
                    >
                      <Building2 className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 mt-6 md:mt-4">
                  <span
                    className={`px-4 py-2 border-2 ${
                      darkMode
                        ? "text-purple-100 bg-purple-800 border-purple-950"
                        : "text-purple-700 bg-purple-100 border-purple-200"
                    } text-sm font-semibold rounded-full`}
                  >
                    {
                      CATEGORIES.find((c) => c.value === formData.category)
                        ?.label
                    }
                  </span>
                  <span
                    className={`px-4 py-2 border-2 ${
                      darkMode
                        ? "text-blue-100 bg-blue-800 border-blue-950"
                        : "text-blue-700 bg-blue-100 border-blue-200"
                    } font-semibold rounded-full`}
                  >
                    {JOB_TYPES.find((j) => j.value === formData.jobType)?.label}
                  </span>

                  <div
                    className={`flex items-center border-2 ${
                      darkMode
                        ? "text-gray-100 bg-gray-500 border-gray-700"
                        : "text-gray-700 bg-gray-100 border-gray-200"
                    } space-x-1 px-4 py-2 text-sm font-semibold rounded-full`}
                  >
                    <Clock className="h-4 w-4" />
                    <span>Posted Today</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content section */}
            <div className="px-0 pb-8 space-y-8">
              <div
                className={`relative overflow-hidden bg-gradient-to-r ${
                  darkMode
                    ? "from-emerald-300 to-teal-300 border border-emerald-950"
                    : "from-emerald-50 to-teal-50 border border-emerald-100"
                } p-6 rounded-2xl`}
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
                        <IndianRupee
                          className={`h-4 w-4 md:h-6 md:w-6 text-white`}
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                          Compensation
                        </h3>
                        <div className="text-sm md:text-lg font-semibold text-gray-900">
                          {
                            currencies.find(
                              (c) => c.value === formData.currency
                            )?.label
                          }
                          {formData.salaryMin.toLocaleString()} -{" "}
                          {
                            currencies.find(
                              (c) => c.value === formData.currency
                            )?.label
                          }
                          {formData.salaryMax.toLocaleString()}
                          <span className="text-sm md:text-lg font-semibold text-gray-600 ml-1">
                            per year
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`hidden md:flex items-centerspace-x-2 text-sm ${
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
                  } p-6 rounded-xl`}
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
                    className={`text-sm ${
                      darkMode ? "text-gray-950" : "text-gray-700"
                    } leading-relaxed whitespace-pre-wrap text-justify`}
                  >
                    {formData.description}
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
                  <span className="text-base md:text-lg">
                    What We're Looking For
                  </span>
                </h3>
                <div
                  className={`relative overflow-hidden bg-gradient-to-br border ${
                    darkMode
                      ? "from-purple-400 to-pink-300 border-pink-300"
                      : "from-purple-100 to-pink-100 border-pink-100"
                  } p-6 rounded-xl`}
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
                    className={`text-sm ${
                      darkMode ? "text-gray-950" : "text-gray-700"
                    } leading-relaxed whitespace-pre-wrap text-justify`}
                  >
                    {formData.requirements}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingPreview;
