import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Search,
  Plus,
  Edit,
  X,
  Trash2,
  ChevronUp,
  ChevronDown,
  Users,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useTheme } from "../../context/ThemeContext";
import NoResults from "../../components/Utility/NoResults";
import Pagination from "../../components/Utility/Pagination";

export default function ManageJobs() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const tableContainerRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 5;

  const [jobs, setJobs] = useState([]);

  const filteredAndSortedJobs = useMemo(() => {
    let filtered = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "applicants") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [jobs, searchTerm, statusFilter, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = filteredAndSortedJobs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleStatusChange = async (jobId) => {
    try {
      const response = await axiosInstance.put(
        API_PATHS.JOBS.TOGGLE_CLOSE(jobId)
      );
      getPostedJobs(true);
    } catch (error) {
      console.error("Error toggling job status", error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axiosInstance.delete(API_PATHS.JOBS.DELETE_JOB(jobId));
      setJobs(jobs.filter((job) => job._id !== jobId));
      toast.success("Job Deleted Successfully!");
    } catch (error) {
      console.error("Error deleting job", error);
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field)
      return <ChevronUp className="h-4 w-4 text-gray-400" />;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 text-purple-600" />
    ) : (
      <ChevronDown className="h-4 w-4 text-purple-600" />
    );
  };

 const LoadingRow = ({ darkMode }) => (
   <tr className="animate-pulse">
     <td className="px-6 py-4">
       <div className="flex items-center space-x-3">
         <div
           className={`w-10 h-10 rounded-full ${
             darkMode ? "bg-gray-700" : "bg-gray-200"
           }`}
         ></div>
         <div className="space-y-2">
           <div
             className={`h-4 rounded w-32 ${
               darkMode ? "bg-gray-700" : "bg-gray-200"
             }`}
           ></div>
           <div
             className={`h-3 rounded w-24 ${
               darkMode ? "bg-gray-700" : "bg-gray-200"
             }`}
           ></div>
         </div>
       </div>
     </td>
     <td className="px-6 py-4">
       <div
         className={`h-6 rounded-full w-16 ${
           darkMode ? "bg-gray-700" : "bg-gray-200"
         }`}
       ></div>
     </td>
     <td className="px-6 py-4">
       <div
         className={`h-4 rounded w-12 ${
           darkMode ? "bg-gray-700" : "bg-gray-200"
         }`}
       ></div>
     </td>
     <td className="px-6 py-4">
       <div className="flex space-x-2">
         {[1, 2, 3].map((i) => (
           <div
             key={i}
             className={`h-8 rounded w-16 ${
               darkMode ? "bg-gray-700" : "bg-gray-200"
             }`}
           ></div>
         ))}
       </div>
     </td>
   </tr>
 );


  const getPostedJobs = async (disableLoader) => {
    setIsLoading(!disableLoader);
    try {
      const response = await axiosInstance.get(
        API_PATHS.JOBS.GET_JOBS_EMPLOYER
      );

      if (response.status === 200 && response.data?.length > 0) {
        const formattedJobs = response.data?.map((job) => ({
          id: job._id,
          title: job?.title,
          company: job?.company?.name,
          status: job?.isClosed ? "Closed" : "Active",
          applicants: job?.applicationCount || 0,
          datePosted: moment(job?.createdAt).format("Do MMM, YYYY"),
          logo: job?.company?.companyLogo,
        }));
        setJobs(formattedJobs);
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
      } else {
        console.error("Error Posting job. Please, try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPostedJobs(true);
    return () => {};
  }, []);

  useEffect(() => {
    const handleScrollCheck = () => {
      const container = tableContainerRef.current;
      if (!container) return;

      const table = container.querySelector("table");
      if (!table) return;

      if (table.scrollWidth > container.clientWidth) {
        container.style.overflowX = "auto";
        container.style.display = "block"; // ensure scroll works
      } else {
        container.style.overflowX = "visible";
      }
    };

    // Run after mount AND when jobs change
    handleScrollCheck();

    window.addEventListener("resize", handleScrollCheck);
    return () => window.removeEventListener("resize", handleScrollCheck);
  }, [paginatedJobs, filteredAndSortedJobs]); // 👈 run effect when table data changes

  return (
    <DashboardLayout activeMenu="manage-jobs">
      <div className="min-h-screen py-10 sm:py-20">
        <div className="w-full max-w-full mx-auto">
          <div className="mb-4 px-2 sm:px-0">
            <div className="flex flex-row items-center justify-between gap-x-5 mb-4">
              <h1
                className={`text-xl font-bold bg-gradient-to-r ${
                  darkMode
                    ? "from-white to-gray-400"
                    : "from-gray-900 to-gray-100"
                } bg-clip-text text-transparent`}
              >
                Job Management
              </h1>
              <button
                className="inline-flex items-center px-2 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-sm text-white font-semibold shadow-lg shadow-purple-500/10 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 transform -translate-y-3 hover:-translate-y-3.5 whitespace-nowrap"
                onClick={() => navigate("/post-job")}
              >
                <Plus className="w-5 h-5 mr-1 sm:mr-2" />
                Add New Job
              </button>
            </div>
            <div className="flex items-center mb-4 sm:mb-8">
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                } mt-1`}
              >
                Manage your Job Postings and track your Applications here.
              </p>
            </div>
          </div>

          <div
            className={`border-x-0 sm:border shadow-none ${
              darkMode
                ? "border-gray-900 bg-gray-900 sm:shadow-[0_4px_12px_rgba(255,255,255,0.4)]"
                : "border-white/20 bg-white/80 sm:shadow-xl"
            } backdrop-blur-sm  rounded-none sm:rounded-2xl px-2 py-4 sm:p-6 mb-8`}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search
                    className={`h-4 w-4 ${
                      darkMode ? "text-gray-300" : "text-gray-400"
                    }`}
                  ></Search>
                </div>

                <input
                  type="text"
                  placeholder="Search jobs ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`block w-full pl-10 pr-4 py-2 text-sm border focus:ring-2 ${
                    darkMode
                      ? "border-gray-700  focus:ring-purple-600 bg-gray-800/50 placeholder-gray-300"
                      : "border-gray-200  focus:ring-purple-500 bg-gray-50/50 placeholder-gray-400"
                  } rounded-lg outline-0 transition-all duration-300`}
                />
              </div>

              <div className="relative inline-block w-full sm:w-1/4 mb-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`block w-full pl-10 pr-4 py-2 text-sm border focus:ring-2 appearance-none ${
                    darkMode
                      ? "border-gray-700  focus:ring-purple-600 bg-gray-800/50 text-gray-100"
                      : "border-gray-200  focus:ring-purple-500 bg-gray-50/50"
                  } rounded-lg outline-0 transition-all duration-300`}
                >
                  <option value="All" className="">
                    All Status
                  </option>
                  <option value="Active" className="">
                    Active
                  </option>
                  <option value="Closed" className="">
                    Closed
                  </option>
                </select>

                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="my-4">
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Showing {paginatedJobs.length} of {filteredAndSortedJobs.length}{" "}
                jobs
              </p>
            </div>

            {/* Table */}
            <div
              className={` ${
                darkMode ? "bg-gray-800/80" : "bg-gray-200/50"
              } backdrop-blur-sm rounded-md sm:rounded-2xl overflow-hidden w-full`}
            >
              {filteredAndSortedJobs.length === 0 && !isLoading ? (
                <NoResults
                  icon={Search}
                  title="No jobs found"
                  text="Try adjusting your search or filter criteria."
                />
              ) : (
                <div
                  className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                  ref={tableContainerRef}
                >
                  <table
                    className={`w-full divide-y ${
                      darkMode ? "divide-gray-700" : "divide-gray-200"
                    }`}
                  >
                    <thead
                      className={`${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
                    >
                      <tr>
                        <th
                          className={`px-6 py-4 text-left text-xs font-semibold ${
                            darkMode
                              ? "text-gray-300 hover:bg-gray-700"
                              : "text-gray-600 hover:bg-gray-200"
                          } uppercase tracking-wider cursor-pointer transition-all duration-300`}
                          onClick={() => handleSort("title")}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Job Title</span>
                            <SortIcon className="" field="title" />
                          </div>
                        </th>
                        <th
                          className={`px-6 py-4 text-left text-xs font-semibold ${
                            darkMode
                              ? "text-gray-300 hover:bg-gray-700"
                              : "text-gray-600 hover:bg-gray-200"
                          } uppercase tracking-wider cursor-pointer transition-all duration-300`}
                          onClick={() => handleSort("status")}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Status</span>
                            <SortIcon className="" field="status" />
                          </div>
                        </th>
                        <th
                          className={`px-6 py-4 text-left text-xs font-semibold ${
                            darkMode
                              ? "text-gray-300 hover:bg-gray-700"
                              : "text-gray-600 hover:bg-gray-200"
                          } uppercase tracking-wider cursor-pointer transition-all duration-300`}
                          onClick={() => handleSort("applicants")}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Applicants</span>
                            <SortIcon field="applicants" />
                          </div>
                        </th>
                        <th
                          className={`px-6 py-4 text-left text-xs font-semibold ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          } uppercase tracking-wider cursor-pointer transition-all duration-300`}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      className={` ${
                        darkMode
                          ? "divide-gray-800 bg-gray-900"
                          : "divide-gray-200 bg-white"
                      }`}
                    >
                      {isLoading
                        ? Array.from({ length: 5 }).map((_, index) => (
                            <LoadingRow key={index} />
                          ))
                        : paginatedJobs.map((job) => (
                            <tr
                              key={job.id}
                              className={`border-b ${
                                darkMode
                                  ? "border-gray-800 hover:bg-purple-950"
                                  : "border-gray-100/60 hover:bg-purple-200"
                              } transition-all duration-300`}
                            >
                              <td className="px-6 py-5 whitespace-nowrap">
                                <div>
                                  <div
                                    className={`text-sm font-semibold ${
                                      darkMode
                                        ? "text-gray-100"
                                        : "text-gray-900"
                                    }`}
                                  >
                                    {job.title}
                                  </div>
                                  <div
                                    className={`text-xs ${
                                      darkMode
                                        ? "text-gray-300"
                                        : "text-gray-500"
                                    } font-medium`}
                                  >
                                    {job.company}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <span
                                  className={`inline-flex px-3 py-1.5 text-xs font-semibold rounded-full ${
                                    job.status === "Active"
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
                                  {job.status}
                                </span>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <button
                                  className={`flex items-center text-sm ${
                                    darkMode
                                      ? "text-purple-400 hover:text-purple-200 hover:bg-purple-800"
                                      : "text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                                  } font-semibold transition-colors duration-300 px-2 py-1 rounded-lg`}
                                  onClick={() =>
                                    navigate("/applicants", {
                                      state: {
                                        jobId: job.id,
                                      },
                                    })
                                  }
                                >
                                  <Users className="h-4 w-4 mr-1.5" />
                                  {job.applicants}
                                </button>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                  {/* Edit Button */}
                                  <button
                                    className={`${
                                      darkMode
                                        ? "text-purple-400 hover:text-purple-200 hover:bg-purple-800"
                                        : "text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                                    } p-2 rounded-lg transition-colors duration-300`}
                                    onClick={() =>
                                      navigate("/post-job", {
                                        state: { jobId: job.id },
                                      })
                                    }
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>

                                  {/* Status Button */}
                                  {job.status === "Active" ? (
                                    <button
                                      onClick={() => handleStatusChange(job.id)}
                                      className={`flex items-center gap-2 text-xs ${
                                        darkMode
                                          ? "text-red-400 hover:text-red-800 hover:bg-orange-300"
                                          : "text-red-500 hover:text-red-700 hover:bg-orange-100"
                                      } p-2 rounded-lg transition-colors duration-300`}
                                    >
                                      <X className="h-4 w-4" />
                                      <span className="hidden sm:inline w-[30px] text-left">
                                        Close
                                      </span>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => handleStatusChange(job.id)}
                                      className={`flex items-center gap-2 text-xs ${
                                        darkMode
                                          ? "text-green-400 hover:text-green-800 hover:bg-green-300"
                                          : "text-green-500 hover:text-green-700 hover:bg-green-100"
                                      } p-2 rounded-lg transition-colors duration-300`}
                                    >
                                      <Plus className="h-4 w-4" />
                                      <span className="hidden sm:inline w-[30px] text-left">
                                        Open
                                      </span>
                                    </button>
                                  )}

                                  {/* Delete Button */}
                                  <button
                                    className={`${
                                      darkMode
                                        ? "text-red-400 hover:text-red-800 hover:bg-orange-300"
                                        : "text-red-500 hover:text-red-700 hover:bg-orange-100"
                                    } p-2 rounded-lg transition-colors duration-300`}
                                    onClick={() => handleDeleteJob(job.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Pagination */}

            <Pagination
              darkMode={darkMode}
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              itemsPerPage={itemsPerPage}
              totalItems={filteredAndSortedJobs.length}
              setCurrentPage={setCurrentPage}
              color="purple"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
