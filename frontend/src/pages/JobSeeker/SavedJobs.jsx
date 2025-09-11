import React, { useEffect, useState } from "react";
import { ArrowLeft, Bookmark, Grid, List } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Navbar from "../../components/layout/Navbar";
import JobCard from "../../components/Cards/JobCard";
import toast from "react-hot-toast";
import ViewMode from "../../components/Utility/ViewMode";
import { useTheme } from "../../context/ThemeContext";
import NoResults from "../../components/Utility/NoResults";

const SavedJobs = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [savedJobList, setSavedJobList] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  const getSavedJobs = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.JOBS.GET_SAVED_JOBS);
      setSavedJobList(response.data);
    } catch (error) {
      console.error("Error Fetching Jobs", error);
    }
  };

  const handleUnsaveJob = async (jobId) => {
    try {
      await axiosInstance.delete(API_PATHS.JOBS.UNSAVE_JOB(jobId));
      toast.success("Job Removed Successfully!");
      getSavedJobs();
    } catch (error) {
      toast.error("Something went wrong! Please, try again later.");
    }
  };

  useEffect(() => {
    if (user) {
      getSavedJobs();
    }
  }, [user]);

  return (
    <div
      className={`bg-gradient-to-br min-h-screen ${
        darkMode
          ? "from-blue-900 via-black to-purple-950"
          : "from-blue-100 via-white to-purple-200"
      } `}
    >
      <Navbar />

      <div className="container mx-auto pt-24">
        {savedJobList && (
          <div
            className={`${
              darkMode ? "bg-gray-900" : "bg-white"
            } p-6 rounded-lg`}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button
                  className={`group flex items-center space-x-2 text-sm font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-lg ${
                    darkMode
                      ? "text-gray-300 bg-gray-800/50 border border-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-800 shadow-gray-600 hover:shadow-gray-500"
                      : "text-gray-600 bg-white/50 border border-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 shadow-lg hover:shadow-xl"
                  } hover:border-transparent transform hover:-translate-y-0.5`}
                  onClick={() => navigate("/find-jobs")}
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </button>

                <h1 className="text-lg lg:text-xl font-semibold leading-tight text-gray-900">
                  Saved Jobs
                </h1>
              </div>

              <ViewMode viewMode={viewMode} setViewMode={setViewMode} />
            </div>

            <div className="px-0 pb-8 space-y-8">
              {savedJobList.length === 0 ? (
                <>
                  <NoResults
                    icon={Bookmark}
                    title="You haven't saved any jobs yet"
                    text="Start saving jobs that interest you to view them later"
                  />
                  <div className="flex justify-center">
                    <button
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                      onClick={() => navigate("/find-jobs")}
                    >
                      Browse Jobs
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
                        : "hidden"
                    }
                  >
                    {savedJobList.map((savedJob) => (
                      <JobCard
                        key={savedJob?.job?._id || savedJob?._id}
                        job={savedJob?.job}
                        onClick={() => navigate(`/job/${savedJob?.job?._id}`)}
                        onToggleSave={() => handleUnsaveJob(savedJob?.job?._id)}
                        saved
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
