import React, { useState, useEffect } from "react";
import { Briefcase, Users, CheckCircle2, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layout/DashboardLayout";
import LoadingSpinner from "../../components/LoadingSpinner";

const Card = ({ className, children }) => {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
    >
      <div className="p-6">{children}</div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => {
  const colorClasses = {
    blue: "from-blue-400 to-blue-600",
    green: "from-emerald-400 to-emerald-600",
    purple: "from-violet-400 to-violet-600",
    orange: "from-orange-400 to-orange-600",
    pink: "from-pink-400 to-rose-600",
    teal: "from-teal-500 to-cyan-600",
    red: "from-red-400 to-rose-600",
    indigo: "from-indigo-400 to-indigo-600",
    yellow: "from-amber-400 to-orange-600",
    gray: "from-gray-400 to-gray-600",
  };

  return (
    <Card
      className={`bg-gradient-to-br ${colorClasses[color]} text-white border-0`}
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
        <div className="bg-white/10 p-3 rounded-xl">
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
        <LoadingSpinner />
      ) : (
        <div className="max-w-7xl mx-auto space-y-8">
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
        </div>
      )}
    </DashboardLayout>
  );
};

export default EmployerDashboard;
