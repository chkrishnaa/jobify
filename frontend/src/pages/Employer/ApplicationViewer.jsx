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
import StatusBadge from "../../components/StatusBadge";
import ApplicantProfilePreview from "../../components/Cards/ApplicantProfilePreview";

export default function ApplicationViewer() {
  const location = useLocation();
  const navigate = useNavigate();

  const jobId = location.state?.jobId || null;

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

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
    const filtered = applications.filter((app) => app.job.title.toLowerCase());
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
  }, [applications]);

  const handleDownloadResume = (resumeUrl) => {
    window.open(resumeUrl, "_blank");
  };

  return (
    <DashboardLayout activeMenu="manage-jobs">
      {loading && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading Applications ...</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50">
        <div className="">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4 mb-4 sm:mb-8">
              <button
                className="group flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-white bg-white/50 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-600 border border-gray-200 hover:border-transparent rounded-xl transition-all duration-300 shadow-lg shadow-gray-100 hover:shadow-xl"
                onClick={() => navigate("/manage-jobs")}
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1"></ArrowLeft>
                <span>Back</span>
              </button>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                Applications Overview
              </h1>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          {Object.keys(groupedApplications).length === 0 ? (
            <div className="text-center py-16">
              <Users className="mx-auto h-24 w-24 text-gray-200" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No Applications Available
              </h3>
              <p className="mt-2 text-gray-500">
                No applications found at that moment.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.values(groupedApplications).map(
                ({ job, applications }) => (
                  <div
                    key={job._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 sm:px-6 py-4">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <h2 className="text-lg font-semibold text-white">
                            {job.title}
                          </h2>
                          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 text-purple-200">
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
                          <span className="text-sm text-white font-medium">
                            {applications.length} Application
                            {applications.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {applications.map((application) => (
                          <div
                            className="relative flex flex-col p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
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
                                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                                    <span className="text-purple-600 font-semibold">
                                      {getInitials(application.applicant.name)}
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-gray-900">
                                  {application.applicant.name}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                  {application.applicant.email}
                                </p>
                                <div className="flex items-center gap-1 mt-1 text-gray-500 text-xs">
                                  <Calendar className="h-3 w-3" />
                                  <span className="">
                                    Applied{" "}
                                    {moment(application.createdAt)?.format(
                                      "DD MM, YYYY"
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 w-full">
                              <button
                                className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors duration-300 w-full sm:w-auto"
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
                                className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-300 w-full sm:w-auto"
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
            handleClose={()=>{
              setSelectedApplicant(null);
              fetchApplications();
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
