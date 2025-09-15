import React, { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import LoadingSpinner from "../../components/Utility/LoadingSpinner";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import FilterContent from "./components/FilterContent";
import SearchHeader from "./components/SearchHeader";
import Navbar from "../../components/layout/Navbar";
import JobCard from "../../components/Cards/JobCard";
import { useTheme } from "../../context/ThemeContext";
import NoResults from "../../components/Utility/NoResults";
import ViewMode from "../../components/Utility/ViewMode";
import Pagination from "../../components/Utility/Pagination";

const JobSeekerDashboard = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedJobs = jobs.slice(startIndex, endIndex);

  const [filters, setFilters] = useState({
    keywords: "",
    location: "",
    category: "",

    type: "",
    minSalary: "",
    maxSalary: "",
  });

  const [expandedSections, setExpandedSections] = useState({
    jobType: true,
    salary: true,
    categories: true,
  });

  const fetchJobs = async (filterParams = {}) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();

      if (filterParams.keyword) params.append("keyword", filterParams.keyword);
      if (filterParams.location)
        params.append("location", filterParams.location);
      if (filterParams.minSalary)
        params.append("minSalary", filterParams.minSalary);
      if (filterParams.maxSalary)
        params.append("maxSalary", filterParams.maxSalary);
      if (filterParams.type) params.append("type", filterParams.type);
      if (filterParams.category)
        params.append("category", filterParams.category);
      if (user) params.append("userId", user?._id);

      const response = await axiosInstance.get(
        `${API_PATHS.JOBS.GET_ALL_JOBS}?${params.toString()}`
      );

      const jobsData = Array.isArray(response.data)
        ? response.data
        : response.data.jobs || [];

      setJobs(jobsData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to fetch jobs. Please, try again later.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const apiFilters = {
        keyword: filters.keyword,
        location: filters.location,
        minSalary: filters.minSalary,
        maxSalary: filters.maxSalary,
        category: filters.category,
        type: filters.type,
        experience: filters.experience,
        remoteOnly: filters.remoteOnly,
      };

      const hasFilters = Object.values(apiFilters).some(
        (value) =>
          value !== "" &&
          value !== false &&
          value !== null &&
          value !== undefined
      );

      if (hasFilters) {
        fetchJobs(apiFilters);
      } else {
        fetchJobs();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters, user]);

  useEffect(() => {
    setCurrentPage(1);
  }, [jobs]);


  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      keywords: "",
      location: "",
      category: "",
      type: "",
      minSalary: "",
      maxSalary: "",
    });
  };

  const MobileFilterOverlay = () => {
    return (
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          showMobileFilters ? "" : "hidden"
        }`}
      >
        <div
          className={`fixed inset-0 bg-black/50`}
          onClick={() => setShowMobileFilters(false)}
        />
        <div
          className={`fixed inset-y-0 right-0 w-[70%] sm:w-full max-w-xs ${
            darkMode ? "bg-gray-900" : "bg-white"
          } shadow-xl`}
        >
          <div
            className={`flex items-center justify-between p-4 sm:p-6 border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h3
              className={`font-bold ${
                darkMode ? "text-gray-200" : "text-gray-900"
              } text-xl`}
            >
              Filter Jobs
            </h3>
            <button
              onClick={() => setShowMobileFilters(false)}
              className={`p-1 sm:p-2 ${
                darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
              } rounded-lg transition-colors`}
            >
              <X
                className={`w-5 h-5 ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              />
            </button>
          </div>
          <div className="p-4 sm:p-6 overflow-y-auto h-full pb-20">
            <FilterContent
              toggleSection={toggleSection}
              clearAllFilters={clearAllFilters}
              expandedSections={expandedSections}
              filters={filters}
              handleFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </div>
    );
  };

  const toggleSaveJob = async (jobId, isSaved) => {
    try {
      if (isSaved) {
        await axiosInstance.delete(API_PATHS.JOBS.UNSAVE_JOB(jobId));
        toast.success("Job Removed Successfully!");
      } else {
        await axiosInstance.post(API_PATHS.JOBS.SAVE_JOB(jobId));
        toast.success("Job Saved Successfully!");
      }

      fetchJobs();
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Something went wrong! Please, try again later.");
    }
  };

  const applyToJob = async (jobId) => {
    try {
      if (jobId) {
        await axiosInstance.post(API_PATHS.APPLICATIONS.APPLY_TO_JOB(jobId));
        toast.success("Applied to Job Successfully!");
      }
      fetchJobs();
    } catch (error) {
      console.log("Error: ", error);
      const errorMsg = error?.response?.data?.message;
      toast.error(errorMsg || "Something went wrong! Please, try again later.");
    }
  };

  if (jobs.length === 0 && loading) {
    return <LoadingSpinner color="blue" />;
  }

  return (
    <div
      className={`bg-gradient-to-br ${
        darkMode
          ? "from-blue-900 via-black to-purple-950"
          : "from-blue-100 via-white to-purple-200"
      } `}
    >
      <Navbar />
      <div className="min-h-screen mt-16">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-4 lg:py-8">
          <SearchHeader
            filters={filters}
            handleFilterChange={handleFilterChange}
          />

          <div className="px-2">
            <div className="flex gap-6 lg:gap-8">
              <div className="hidden lg:block w-80 flex-shrink-0">
                <div
                  className={`border ${
                    darkMode
                      ? "border-gray-700 bg-gray-900"
                      : "border-white/20 bg-white/80"
                  } backdrop-blur-xl rounded-2xl shadow-lg p-6 sticky top-20`}
                >
                  <h3
                    className={`font-bold ${
                      darkMode ? "text-gray-200" : "text-gray-900"
                    } text-xl mb-6`}
                  >
                    Filter Jobs
                  </h3>
                  <FilterContent
                    toggleSection={toggleSection}
                    clearAllFilters={clearAllFilters}
                    expandedSections={expandedSections}
                    filters={filters}
                    handleFilterChange={handleFilterChange}
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 lg:mb-8 gap-4">
                  <div>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      } text-sm lg:text-base`}
                    >
                      Showing{" "}
                      <span className="font-bold textgray-900">
                        {jobs.length}
                      </span>{" "}
                      jobs
                    </p>
                  </div>

                  <div className="flex items-center justify-between lg:justify-end gap-4">
                    <button
                      className={`lg:hidden flex items-center gap-2 border ${
                        darkMode
                          ? "border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
                          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
                      } px-4 py-2 rounded-md sm:rounded-xl font-medium transition-colors`}
                      onClick={() => setShowMobileFilters(true)} // ✅ toggle sidebar
                    >
                      <Filter className="w-4 h-4" /> Filters
                    </button>
                    <ViewMode viewMode={viewMode} setViewMode={setViewMode} />
                  </div>
                </div>

                {jobs.length === 0 ? (
                  <div
                    className={`bg-gradient-to-br ${
                      darkMode
                        ? "from-gray-800 to-gray-950 shadow-[0_6px_18px_rgba(255,255,255,0.4)]"
                        : "from-gray-100 to-gray-300 shadow-xl"
                    } rounded-md sm:rounded-xl overflow-hidden`}
                  >
                    <NoResults
                      icon={Search}
                      title="No Jobs found"
                      text="Try adjusting your search criteria or filters."
                    />
                  </div>
                ) : (
                  <>
                    <div
                      className={
                        viewMode === "grid"
                          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6"
                          : "space-y-4 lg:space-y-6"
                      }
                    >
                      {paginatedJobs.map((job) => (
                        <JobCard
                          key={job._id}
                          job={job}
                          onClick={() => navigate(`/job/${job._id}`)}
                          onToggleSave={() =>
                            toggleSaveJob(job._id, job.isSaved)
                          }
                          onApply={() => applyToJob(job._id)}
                        />
                      ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-6">
                      <Pagination
                        darkMode={darkMode}
                        currentPage={currentPage}
                        totalPages={Math.ceil(jobs.length / itemsPerPage)}
                        startIndex={startIndex}
                        itemsPerPage={itemsPerPage}
                        totalItems={jobs.length}
                        setCurrentPage={setCurrentPage}
                        color="blue"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <MobileFilterOverlay />
      </div>
    </div>
  );
};

export default JobSeekerDashboard;