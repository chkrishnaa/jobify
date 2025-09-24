import React, { useEffect, useState } from "react";
import { MapPin, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import JobInfo from "../Utility/JobInfo";
import JobCardHeader from "../Utility/JobCardHeader";
import moment from "moment";
import { useAuth } from "../../context/AuthContext";

const JobDetailsModal = ({ jobId, onClose }) => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!jobId) return;
      try {
        setLoading(true);
        setError("");
        const { data } = await axiosInstance.get(
          API_PATHS.JOBS.GET_JOB_BY_ID(jobId)
        );
        setJob(data);
      } catch (e) {
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [jobId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      <div
        className={`relative z-10 w-[90%] max-w-2xl rounded-md ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        } p-4 max-h-[90vh] overflow-y-auto print-area`}
      >
        <button
          className={`absolute top-3 right-3 p-2 rounded ${
            darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
          }`}
          onClick={onClose}
        >
          <X className={darkMode ? "text-gray-200" : "text-gray-800"} />
        </button>

        <div className="mt-10">
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {!loading && !error && job && (
            <div className="space-y-2">
              <div
                className={`${
                  darkMode ? "bg-gray-800" : "bg-gray-100"
                } p-4 rounded-lg`}
              >
                <JobCardHeader
                  category={job.category}
                  type={job.type}
                  createdAt={
                    job.createdAt
                      ? moment(job.createdAt).format("Do MMM, YYYY")
                      : "N/A"
                  }
                >
                  <div className="flex items-center justify-between mb-0">
                    <div className="flex-1">
                      <h1
                        className={`text-md sm:text-lg lg:text-xl font-semibold mb-2 leading-tight ${
                          darkMode ? "text-gray-200" : "text-gray-900"
                        }`}
                      >
                        {job.title}
                      </h1>

                      <div
                        className={`flex items-center space-x-4 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {job.isRemote ? "Remote" : job.location}
                          </span>
                          {job.isRemote && job.location && (
                            <span className="text-sm">{job.location}</span>
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

              <JobInfo
                salaryMin={job.salaryMin}
                salaryMax={job.salaryMax}
                description={job.description}
                requirements={job.requirements}
              />
            </div>
          )}
        </div>

        <button
          className={`bg-gradient-to-r text-sm no-print ${
            darkMode
              ? "from-green-400 to-green-600 text-green-50 hover:text-white hover:from-green-500 hover:to-green-700"
              : "from-green-50 to-green-100 text-green-700 hover:text-white hover:from-green-400 hover:to-green-600"
          } px-6 py-2.5 rounded-xl transition-all duration-300 font-semibold transform hover:-translate-y-0.5`}
          onClick={() => window.print()}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default JobDetailsModal;
