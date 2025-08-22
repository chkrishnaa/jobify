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

export default function ManageJobs() {
  const navigate = useNavigate();
  const tableContainerRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 15;

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
  const LoadingRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-12"></div>
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          <div className="h-8 bg-gray-200 rounded w-16"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
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
          datePosted: moment(job?.createdAt).format("DD MM, YYYY"),
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
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-full mx-auto">
          <div className="mb-8">
            <div className="flex flex-row items-center justify-between gap-x-5">
              <div className="mb-4 sm:mb-8">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                  Job Management
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage your Job Postings and track your Applications here.
                </p>
              </div>
              <button
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-sm text-white font-semibold rounded-xl shadow-lg shadow-purple-500/10 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 transform -translate-y-3 hover:-translate-y-3.5 whitespace-nowrap"
                onClick={() => navigate("/post-job")}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Job
              </button>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-black/5 border border-white/20 p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400"></Search>
                </div>

                <input
                  type="text"
                  placeholder="Search jobs ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-0 transition-all duration-300 bg-gray-50/50 placeholder-gray-400"
                />
              </div>

              <div className="sm:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
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
              </div>
            </div>

            <div className="my-4">
              <p className="text-sm text-gray-600">
                Showing {paginatedJobs.length} of {filteredAndSortedJobs.length}{" "}
                jobs
              </p>
            </div>

            {/* Table */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden w-full">
              {filteredAndSortedJobs.length === 0 && !isLoading ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-10 h-10 text-gray-400"></Search>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No jobs found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : (
                <div
                  className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                  ref={tableContainerRef}
                >
                  <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                      <tr>
                        <th
                          className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100/60 transition-all duration-300"
                          onClick={() => handleSort("title")}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Job Title</span>
                            <SortIcon className="" field="title" />
                          </div>
                        </th>
                        <th
                          className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100/60 transition-all duration-300"
                          onClick={() => handleSort("status")}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Status</span>
                            <SortIcon className="" field="status" />
                          </div>
                        </th>
                        <th
                          className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100/60 transition-all duration-300"
                          onClick={() => handleSort("applicants")}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Applicants</span>
                            <SortIcon field="applicants" />
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {isLoading
                        ? Array.from({ length: 5 }).map((_, index) => (
                            <LoadingRow key={index} />
                          ))
                        : paginatedJobs.map((job) => (
                            <tr
                              key={job.id}
                              className="hover:bg-purple-50/30 transition-all duration-300 border-b border-gray-100/60"
                            >
                              <td className="px-6 py-5 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-semibold text-gray-900">
                                    {job.title}
                                  </div>
                                  <div className="text-xs text-gray-500 font-medium">
                                    {job.company}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <span
                                  className={`inline-flex px-3 py-1.5 text-xs font-semibold rounded-full ${
                                    job.status === "Active"
                                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                      : "bg-gray-100 text-gray-700 border border-gray-200"
                                  }`}
                                >
                                  {job.status}
                                </span>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <button
                                  className="flex items-center text-sm text-purple-600 hover:text-purple-800 font-semibold transition-colors duration-300 hover:bg-purple-100 px-2 py-1 rounded-lg"
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
                                    className="text-purple-600 hover:text-purple-800 p-2 rounded-lg hover:bg-purple-100 transition-colors duration-300"
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
                                      className="flex items-center gap-2 text-xs text-orange-600 hover:text-orange-800 p-2 rounded-lg hover:bg-orange-50 transition-colors duration-300"
                                    >
                                      <X className="h-4 w-4" />
                                      <span className="hidden sm:inline w-[30px] text-left">
                                        Close
                                      </span>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => handleStatusChange(job.id)}
                                      className="flex items-center gap-2 text-xs text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-colors duration-300"
                                    >
                                      <Plus className="h-4 w-4" />
                                      <span className="hidden sm:inline w-[30px] text-left">
                                        Open
                                      </span>
                                    </button>
                                  )}

                                  {/* Delete Button */}
                                  <button
                                    className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors duration-300"
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

            <div className="mt-6 flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>{" "}
                <button
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div className="">
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{startIndex + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(
                        startIndex + itemsPerPage,
                        filteredAndSortedJobs.length
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredAndSortedJobs.length}
                    </span>{" "}
                    results
                  </p>
                </div>
                <div className="">
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      className="relative inline-flex items-center p-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={()=>setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    ).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === page
                            ? "z-10 bg-purple-100 border-purple-500 text-purple-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={()=>setCurrentPage(
                        Math.min(totalPages, currentPage + 1)
                      )}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center p-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
