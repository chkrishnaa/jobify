import React, { useState, useEffect } from "react";
import { Briefcase, Users, CheckCircle2, TrendingUp, Plus, Building2, User, User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layout/DashboardLayout";
import LoadingSpinner from "../../components/Utility/LoadingSpinner";
import JobDashboardCard from "../../components/Cards/JobDashboardCard";
import ApplicantDashboardCard from "../../components/Cards/ApplicantDashboardCard";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import NoResults from "../../components/Utility/NoResults";

const Card = ({ title, headerAction, subtitle, className, children }) => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`border ${
        darkMode
          ? "bg-gray-900 border-gray-800 shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_10px_rgba(255,255,255,0.15)]"
          : "bg-white border-gray-100 shadow-sm hover:shadow-md"
      } rounded-xl transition-shadow duration-300 ${className}`}
    >
      {(title || headerAction) && (
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="">
            {title && (
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                } mt-1`}
              >
                {subtitle}
              </p>
            )}
          </div>
          {headerAction}
        </div>
      )}
      <div className={title ? "px-6 pb-6" : "p-6"}>{children}</div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => {
  const { darkMode } = useTheme();

  const colorClasses = {
    blue: "from-blue-400 to-blue-600",
    green: "from-emerald-400 to-emerald-600",
    purple: "from-violet-400 to-violet-600",
    orange: "from-orange-400 to-orange-600",
    pink: "from-pink-400 to-rose-600",
    teal: "from-teal-400 to-cyan-600",
    red: "from-red-400 to-rose-600",
    indigo: "from-indigo-400 to-indigo-600",
    yellow: "from-amber-400 to-orange-600",
    gray: "from-slate-400 to-gray-600",
  };

  const darkColorClasses = {
    blue: "from-blue-600 to-blue-800",
    green: "from-emerald-600 to-emerald-800",
    purple: "from-violet-600 to-violet-800",
    orange: "from-orange-600 to-orange-800",
    pink: "from-pink-600 to-rose-800",
    teal: "from-teal-600 to-cyan-800",
    red: "from-red-600 to-rose-800",
    indigo: "from-indigo-600 to-indigo-800",
    yellow: "from-amber-600 to-orange-800",
    gray: "from-slate-600 to-gray-800",
  };

  return (
    <Card
      className={`bg-gradient-to-br ${
        darkMode ? darkColorClasses[color] : colorClasses[color]
      } text-white border-0`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        <div className="bg-white/20 p-3 rounded-xl">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
};

// ✅ Utility to pick 3 unique random colors
const getUniqueColors = () => {
  const allColors = [
    "blue",
    "green",
    "purple",
    "orange",
    "pink",
    "teal",
    "red",
    "indigo",
    "yellow",
    "gray",
  ];

  // shuffle colors
  const shuffled = allColors.sort(() => 0.5 - Math.random());

  // pick first 3 unique
  return shuffled.slice(0, 3);
};

const EmployerDashboard = () => {
  const user = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // store 3 unique colors for the StatCards
  const [statColors, setStatColors] = useState([]);

  const getDashboardOverview = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.OVERVIEW);
      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDashboardOverview();
    setStatColors(getUniqueColors()); // pick random unique colors when page loads
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="employer-dashboard">
      {isLoading ? (
        <LoadingSpinner text="Finding Amazing Opportunities ..." color="purple" />
      ) : (
        <div className="max-w-7xl mx-auto space-y-8 ">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="Active Jobs"
              value={dashboardData?.counts?.totalActiveJobs || 0}
              icon={Briefcase}
              trend={true}
              trendValue={`${dashboardData?.counts?.trends?.activeJobs || 0}%`}
              color={statColors[0]}
            />

            <StatCard
              title="Total Applicants"
              value={dashboardData?.counts?.totalApplications || 0}
              icon={Users}
              trend={true}
              trendValue={`${
                dashboardData?.counts?.trends?.totalApplicants || 0
              }%`}
              color={statColors[1]}
            />

            <StatCard
              title="Hired"
              value={dashboardData?.counts?.totalHired || 0}
              icon={CheckCircle2}
              trend={true}
              trendValue={`${dashboardData?.counts?.trends?.totalHired || 0}%`}
              color={statColors[2]}
            />
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card
              title="Recent Job Posts"
              subtitle="Your Latest Job Postings"
              headerAction={
                dashboardData?.data?.recentJobs?.length > 4 && (
                  <button
                    className={`text-sm ${
                      darkMode
                        ? "text-purple-500 hover:text-purple-400"
                        : "text-purple-600 hover:text-purple-700"
                    } font-medium`}
                    onClick={() => navigate("/manage-jobs")}
                  >
                    View all
                  </button>
                )
              }
            >
              <div className="space-y-3">
                {dashboardData?.data?.recentJobs?.length > 0 ? (
                  dashboardData?.data?.recentJobs
                    ?.slice(0, 5)
                    ?.map((job, index) => (
                      <JobDashboardCard
                        key={index}
                        job={job}
                        avatar={user?.avatar || ""}
                      />
                    ))
                ) : (
                  <NoResults
                    icon={Building2}
                    title="No Jobs posted"
                    text="You haven't posted any jobs yet.<br/>Create a job to start receiving applications."
                  />
                )}
              </div>
            </Card>

            <Card
              title="Recent Applicants"
              subtitle="Latest Candidates Applied"
              headerAction={
                dashboardData?.data?.recentApplications?.length > 4 && (
                  <button
                    className={`text-sm ${
                      darkMode
                        ? "text-purple-500 hover:text-purple-400"
                        : "text-purple-600 hover:text-purple-700"
                    } font-medium`}
                    onClick={() => navigate("/manage-jobs")}
                  >
                    View all
                  </button>
                )
              }
            >
              <div className="space-y-3">
                {dashboardData?.data?.recentApplications?.length > 0 ? (
                  dashboardData?.data?.recentApplications
                    ?.slice(0, 5)
                    ?.map((data, index) => (
                      <ApplicantDashboardCard
                        key={index}
                        applicant={data?.applicant || ""}
                        position={data?.job?.title || ""}
                        time={moment(data?.updatedAt).fromNow()}
                      />
                    ))
                ) : (
                  <NoResults
                    icon={User2}
                    title="No Applicants found"
                    text="We couldn't find any applicants."
                  />
                )}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card
            title="Quick Actions"
            subtitle="Common tasks to get you started"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Post New Job",
                  icon: Plus,
                  color: "bg-blue-50 text-blue-700",
                  path: "/post-job",
                },
                {
                  title: "Review Applications",
                  icon: Users,
                  color: "bg-green-50 text-green-700",
                  path: "/manage-jobs",
                },
                {
                  title: "Company Settings",
                  icon: Building2,
                  color: "bg-orange-50 text-orange-700",
                  path: "/company-profile",
                },
              ].map((action, index) => (
                <button
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-xl border ${
                    darkMode
                      ? "border-gray-700 hover:border-gray-600 shadow-[0_2px_6px_rgba(255,255,255,0.08)] hover:shadow-[0_4px_8px_rgba(255,255,255,0.12)]"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  } transition-all duration-200 text-left`}
                  onClick={() => navigate(action.path)}
                >
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-900"
                    }`}
                  >
                    {action.title}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EmployerDashboard;
