import React, { useState, useEffect, useMemo } from "react";
import {
  Users,
  Calendar,
  MapPin,
  Briefcase,
  Download,
  Eye,
  ArrowLeft,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { getInitials } from "../../utils/helper";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatusBadge from "../../components/Utility/StatusBadge";
import ApplicantProfilePreview from "../../components/Cards/ApplicantProfilePreview";
import { useTheme } from "../../context/ThemeContext";
import LoadingSpinner from "../../components/Utility/LoadingSpinner";
import NoResults from "../../components/Utility/NoResults";
import ExportOptions from "../../components/Utility/ExportDatasheetButtons/ExportOptions";

export default function ApplicationViewer() {
  const { darkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const jobId = location.state?.jobId || null;

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All"); // default: show all

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.APPLICATIONS.GET_ALL_APPLICATIONS(jobId)
      );
      setApplications(response.data);
    } catch (error) {
      console.log("Failed to fetch applications", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) fetchApplications();
    else navigate("/manage-jobs");
  }, [jobId, navigate]);

  const groupedApplications = useMemo(() => {
    const filtered = applications.filter((app) => {
      if (statusFilter === "All") return true;
      return app.status === statusFilter;
    });

    return filtered.reduce((acc, app) => {
      const jobId = app.job._id;

      if (!acc[jobId]) {
        acc[jobId] = {
          job: app.job,
          applications: [],
        };
      }
      acc[jobId].applications.push(app);
      return acc;
    }, {});
  }, [applications, statusFilter]);

  const handleDownloadResume = (resumeUrl) => {
    window.open(resumeUrl, "_blank");
  };

  return (
    <DashboardLayout activeMenu="manage-jobs">
      {loading ? (
        <LoadingSpinner text="Loading Applications ..." color="purple" />
      ) : (
        <div className="min-h-screen">
          <div className="">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4 mb-4 sm:mb-8">
                <button
                  className={`group flex items-center space-x-2 px-3 py-2 text-sm font-medium
                  ${
                    darkMode
                      ? "text-gray-300 bg-gray-800/10 border border-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-purple-700 hover:to-purple-800 shadow-gray-600 hover:shadow-gray-500"
                      : "text-gray-600 bg-white/10 border border-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700 shadow-gray-400 hover:shadow-xl"
                  } border  hover:border-transparent rounded-xl transition-all duration-300`}
                  onClick={() => navigate("/manage-jobs")}
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1"></ArrowLeft>
                  <span>Back</span>
                </button>
                <h1
                  className={`text-xl font-bold bg-gradient-to-r ${
                    darkMode
                      ? "from-white to-gray-300"
                      : "from-gray-900 to-gray-500"
                  } bg-clip-text text-transparent`}
                >
                  Applications Overview
                </h1>
              </div>
            </div>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl text-sm font-medium border ${
              darkMode
                ? "bg-gray-800 text-gray-300 border-gray-600"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            <option value="All">All</option>
            <option value="Applied">Applied</option>
            <option value="In Review">In Review</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
          
          <div className="max-w-7xl mx-auto">
            {Object.keys(groupedApplications).length === 0 ? (
              <div
                className={`bg-gradient-to-br ${
                  darkMode
                    ? "from-gray-800 to-gray-950 shadow-[0_6px_18px_rgba(255,255,255,0.4)]"
                    : "from-gray-100 to-gray-300 shadow-xl"
                } rounded-xl overflow-hidden py-24`}
              >
                <NoResults
                  icon={Users}
                  title="No Applicants found"
                  text="We couldn't find any applicants."
                />
              </div>
            ) : (
              <div className="space-y-8">
                {Object.values(groupedApplications).map(
                  ({ job, applications }) => (
                    <div
                      key={job._id}
                      className={`${
                        darkMode
                          ? "bg-white shadow-[0_6px_18px_rgba(255,255,255,0.4)]"
                          : "bg-white shadow-xl"
                      } rounded-xl overflow-hidden`}
                    >
                      <div
                        className={`bg-gradient-to-r ${
                          darkMode
                            ? "from-purple-700 to-purple-800"
                            : "from-purple-500 to-purple-600"
                        } px-4 sm:px-6 py-4`}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="flex-1">
                            <h2
                              className={`text-lg font-semibold ${
                                darkMode ? "text-gray-200" : "text-white"
                              }`}
                            >
                              {job.title}
                            </h2>
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 font-semibold text-purple-200">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4"></MapPin>
                                <span className="text-sm">{job.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4" />
                                <span className="text-sm">{job.type}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-sm">{job.category}</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 flex-shrink-0">
                            <span
                              className={`text-sm ${
                                darkMode ? "text-gray-200" : "text-white"
                              } font-medium`}
                            >
                              {applications.length} Application
                              {applications.length !== 1 ? "s" : ""}
                            </span>
                          </div>

                          <ExportOptions
                            applications={applications}
                            darkMode={darkMode}
                          />
                        </div>
                      </div>
                      <div
                        className={`p-4 sm:p-6 ${
                          darkMode ? "bg-gray-900" : "bg-white/50"
                        }`}
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {applications.map((application) => (
                            <div
                              className={`relative flex flex-col p-4 border ${
                                darkMode
                                  ? "border-gray-700 hover:bg-gray-800"
                                  : "border-gray-200 hover:bg-gray-100"
                              } rounded-lg  transition-colors`}
                              key={application._id}
                            >
                              {/* Status Badge - Positioned at top-right */}
                              <div className="absolute top-3 right-3">
                                <StatusBadge status={application.status} />
                              </div>

                              <div className="flex items-start gap-4 mb-4 pr-20">
                                <div className="flex-shrink-0">
                                  {application.applicant.avatar ? (
                                    <img
                                      src={application.applicant.avatar}
                                      className="h-12 w-12 rounded-full object-cover"
                                      alt={application.applicant.name}
                                    />
                                  ) : (
                                    <div
                                      className={`h-12 w-12 rounded-full ${
                                        darkMode
                                          ? "bg-purple-500"
                                          : "bg-purple-300"
                                      } flex items-center justify-center`}
                                    >
                                      <span
                                        className={`${
                                          darkMode
                                            ? "text-purple-800"
                                            : "text-purple-600"
                                        } font-semibold`}
                                      >
                                        {getInitials(
                                          application.applicant.name
                                        )}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                <div className="min-w-0 flex-1">
                                  <h3
                                    className={`font-semibold ${
                                      darkMode
                                        ? "text-gray-100"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    {application.applicant.name}
                                  </h3>
                                  <p
                                    className={`${
                                      darkMode
                                        ? "text-gray-300"
                                        : "text-gray-600"
                                    } text-sm`}
                                  >
                                    {application.applicant.email}
                                  </p>
                                  <div
                                    className={`flex items-center gap-1 mt-1 ${
                                      darkMode
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                    } text-xs`}
                                  >
                                    <Calendar className="h-3 w-3" />
                                    <span className="">
                                      Applied -{" "}
                                      {moment(application.createdAt)?.format(
                                        "Do MMM, YYYY"
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row gap-2 w-full">
                                <button
                                  className={`inline-flex items-center justify-center gap-2 px-3 py-2 ${
                                    darkMode
                                      ? "bg-purple-700 text-gray-200 hover:bg-purple-800"
                                      : "bg-purple-600 text-white hover:bg-purple-700"
                                  } text-sm font-medium rounded-lg transition-colors duration-300 w-full sm:w-auto`}
                                  onClick={() =>
                                    handleDownloadResume(
                                      application.applicant.resume
                                    )
                                  }
                                >
                                  <Download className="h-4 w-4"></Download>
                                  Resume
                                </button>

                                <button
                                  className={`inline-flex items-center justify-center gap-2 px-3 py-2 ${
                                    darkMode
                                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                  } text-sm font-medium rounded-lg transition-colors duration-300 w-full sm:w-auto`}
                                  onClick={() =>
                                    setSelectedApplicant(application)
                                  }
                                >
                                  <Eye className="h-4 w-4" />
                                  View Profile
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
          {selectedApplicant && (
            <ApplicantProfilePreview
              selectedApplicant={selectedApplicant}
              setSelectedApplicant={setSelectedApplicant}
              handleDownloadResume={handleDownloadResume}
              handleClose={() => {
                setSelectedApplicant(null);
                fetchApplications();
              }}
            />
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
