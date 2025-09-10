import {
  MapPin,
  IndianRupee,
  Building2,
  Clock,
  Users,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import moment from "moment";
import StatusBadge from "../../components/Utility/StatusBadge";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";
import JobInfo from "../../components/Utility/JobInfo";
import JobCardHeader from "../../components/Utility/JobCardHeader";
import { usePDF } from "react-to-pdf";

const JobDetails = () => {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const { jobId } = useParams();
  const pdfRef = useRef();
const navigate = useNavigate();
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const [jobDetails, setJobDetails] = useState(null);

  const getJobDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.JOBS.GET_JOB_BY_ID(jobId),
        { params: { userId: user?._id || null } }
      );
      setJobDetails(response.data);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  const applyToJob = async () => {
    try {
      if (jobId) {
        await axiosInstance.post(API_PATHS.APPLICATIONS.APPLY_TO_JOB(jobId));
        toast.success("Applied to Job Successfully!");
      }
      getJobDetailsById();
    } catch (error) {
      console.log("Error: ", error);
      const errorMsg = error?.response?.data?.message;
      toast.error(errorMsg || "Something went wrong! Please, try again later.");
    }
  };

  useEffect(() => {
    if (jobId) {
      getJobDetailsById();
    }
  }, [jobId, user]);

  return (
    <div
      className={`bg-gradient-to-br ${
        darkMode
          ? "from-blue-900 via-black to-purple-950"
          : "from-blue-100 via-white to-purple-200"
      } py-12 print:py-0 print:px-0`}
    >
      <Navbar className="" />

      <div className="container mx-auto pt-24 px-3 print:m-0 print:p-0 print:pt-0 print-area">
        {jobDetails && (
          <div
            className={`relative ${
              darkMode
                ? " bg-gray-800 shadow-[0_4px_12px_rgba(255,255,255,0.3)]"
                : " bg-white shadow-lg"
            } py-4 sm:py-8 px-4 sm:px-8 lg:px-12 rounded-lg`}
            ref={targetRef}
          >
            <div className="relative px-0 pb-8">
              <div className="relative z-10">
                <JobCardHeader
                  category={jobDetails.category}
                  type={jobDetails.type}
                  createdAt={
                    jobDetails.createdAt
                      ? moment(jobDetails.createdAt).format("Do MMM, YYYY")
                      : "N/A"
                  }
                >
                  <div className="flex items-center gap-3 mb-6">
                    {jobDetails?.company?.companyLogo ? (
                      <img
                        src={jobDetails?.company?.companyLogo}
                        alt="Company Logo"
                        className="h-20 w-20 object-cover rounded-2xl border-4 border-white/20 shadow-lg"
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

                    <div className="flex-1">
                      <h1
                        className={`text-lg lg:text-xl font-semibold mb-2 leading-tight ${
                          darkMode ? "text-gray-200" : "text-gray-900"
                        }`}
                      >
                        {jobDetails.title}
                      </h1>

                      <div
                        className={`flex items-center space-x-4 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {jobDetails.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {jobDetails?.applicationStatus ? (
                      <StatusBadge status={jobDetails.applicationStatus} />
                    ) : (
                      <button
                        className={`bg-gradient-to-r text-sm no-print ${
                          darkMode
                            ? "from-blue-400 to-blue-600 text-blue-50 hover:text-white hover:from-blue-500 hover:to-blue-700"
                            : "from-blue-50 to-blue-100 text-blue-700 hover:text-white hover:from-blue-400 hover:to-blue-600"
                        } px-6 py-2.5 rounded-xl transition-all duration-300 font-semibold transform hover:-translate-y-0.5`}
                        onClick={applyToJob}
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </JobCardHeader>
              </div>
            </div>

            <JobInfo
              salaryMin={jobDetails.salaryMin}
              salaryMax={jobDetails.salaryMax}
              description={jobDetails.description}
              requirements={jobDetails.requirements}
            />
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            className={`flex items-center bg-gradient-to-r text-sm no-print ${
              darkMode
                ? "from-green-400 to-green-600 text-green-50 hover:text-white hover:from-green-500 hover:to-green-700"
                : "from-green-50 to-green-100 text-green-700 hover:text-white hover:from-green-400 hover:to-green-600"
            } px-6 py-2.5 rounded-xl transition-all duration-300 font-semibold transform hover:-translate-y-0.5`}
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back</span>
          </button>

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

      <div className="hidden print:block print-area bottom">
        <div className="flex justify-between px-3 text-sm">
          <p>JobiFy - Find Your Dream Job</p>
          <p>{`Job ID: ${jobDetails?._id}`}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
