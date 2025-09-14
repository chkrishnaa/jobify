import React from "react";
import { MapPin, ArrowLeft, Building2 } from "lucide-react";
import { CATEGORIES, JOB_TYPES } from "../../utils/data";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import JobInfo from "../Utility/JobInfo";
import JobCardHeader from "../Utility/JobCardHeader";
import moment from "moment";

const JobPostingPreview = ({ formData, setIsPreview }) => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  return (
    <>
      <div className="min-h-screen px-2 sm:px-0 py-10 sm:py-20 print:p-0 print:m-0">
        <div className="max-w-4xl mx-auto print-area print:rounded-2xl">
          <div
            className={`mb-8 backdrop-blur-sm ${
              darkMode
                ? "bg-gray-900 shadow-[0_6px_18px_rgba(255,255,255,0.4)]"
                : "bg-white/80 border-white/20 shadow-xl"
            } rounded-lg sm:rounded-2xl p-3 sm:p-6 print:pt-0`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2
                  className={`text-xl font-bold bg-gradient-to-r ${
                    darkMode
                      ? "from-white to-gray-300"
                      : "from-gray-900 to-gray-500"
                  } bg-clip-text text-transparent no-print`}
                >
                  Job Preview
                </h2>
              </div>

              <button
                onClick={() => setIsPreview(false)}
                className={`group flex items-center space-x-2 text-sm font-medium px-2 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 shadow-lg no-print ${
                  darkMode
                    ? "text-gray-300 bg-gray-800/50 border border-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-700 hover:to-purple-800 shadow-gray-600 hover:shadow-gray-500"
                    : "text-gray-600 bg-white/50 border border-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700 shadow-lg hover:shadow-xl"
                }`}
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            </div>

            <div>
              {/* Hero section */}
              <div
                className={`relative ${
                  darkMode ? " bg-gray-800" : " bg-white"
                } px-3 sm:px-4 py-3 sm:py-8 my-4 sm:my-8 rounded-lg`}
              >
                <div className="relative z-10">
                  <JobCardHeader
                    category={
                      CATEGORIES.find((c) => c.value === formData.category)
                        ?.label
                    }
                    type={
                      JOB_TYPES.find((j) => j.value === formData.jobType)?.label
                    }
                    createdAt="Posted Today"
                  >
                    <div className="flex items-center justify-between mb-0">
                      <div className="flex-1">
                        <h1
                          className={`text-md sm:text-lg lg:text-xl font-semibold mb-2 leading-tight ${
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
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              {formData.isRemote ? "Remote" : formData.location}
                            </span>
                            {formData.isRemote && formData.location && (
                              <span className="text-sm">
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
                          className="h-12 sm:h-16 w-12 sm:w-16 md:h-20 md:w-20 object-cover rounded-lg sm:rounded-2xl border-2 sm:border-4 border-white/20 shadow-lg"
                        />
                      ) : (
                        <div
                          className={`h-12 sm:h-16 w-12 sm:w-16 md:h-20 md:w-20 ${
                            darkMode
                              ? "bg-gray-600 border-2 border-gray-700"
                              : "bg-gray-200 border-2 border-gray-300"
                          } rounded-2xl flex items-center justify-center`}
                        >
                          <Building2 className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </JobCardHeader>
                </div>
              </div>

              {/* Job content */}
              <JobInfo
                salaryMin={formData.salaryMin}
                salaryMax={formData.salaryMax}
                description={formData.description}
                requirements={formData.requirements}
              />
            </div>
          </div>


          {/* 👇 Hide this button on print */}
          {/* <button
            className={`bg-gradient-to-r text-sm no-print ${
              darkMode
                ? "from-green-400 to-green-600 text-green-50 hover:text-white hover:from-green-500 hover:to-green-700"
                : "from-green-50 to-green-100 text-green-700 hover:text-white hover:from-green-400 hover:to-green-600"
            } px-6 py-2.5 rounded-xl transition-all duration-300 font-semibold transform hover:-translate-y-0.5`}
            onClick={() => window.print()}
          >
            Download PDF
          </button> */}
        </div>
      </div>

      {/* <div className="hidden print:block print-area">
        <div className="flex justify-between px-3 text-sm">
          <p>JobiFy - Find Your Dream Job</p>
          <p>Created At: {moment().format("Do MMM, YYYY [at] hh:mm A")}</p>
        </div>
      </div> */}
    </>
  );
};

export default JobPostingPreview;
