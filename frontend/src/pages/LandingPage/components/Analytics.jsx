import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, TrendingUp, Target } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

const Analytics = () => {
    const { darkMode } = useTheme();

  const stats = [
    {
      icon: Users,
      title: "Active Users",
      value: "2.4M+",
      growth: "+15%",
    },
    {
      icon: Briefcase,
      title: "Job Posted",
      value: "7.4M+",
      growth: "+21%",
    },
    {
      icon: TrendingUp,
      title: "Matching Rate",
      value: "2.4M+",
      growth: "+10%",
    },
    {
      icon: Target,
      title: "Successful Hires",
      value: "7.4M+",
      growth: "+11%",
    },
  ];

  return (
    <section
      className={`py-20 ${
        darkMode ? "bg-gray-950" : "bg-white"
      } relative overflow-hidden`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Platform
            <span
              className={`bg-gradient-to-r ${
                darkMode
                  ? "from-blue-700 to-purple-700"
                  : "from-blue-600 to-purple-600"
              } bg-clip-text text-transparent`}
            >
              {" "}
              Analytics
            </span>
          </h2>
          <p
            className={`text-lg sm:text-xl ${
              darkMode ? "text-gray-300" : "text-gray-600"
            } max-w-3xl mx-auto`}
          >
            Harnessing the power of platform analytics, you can gain real-time
            insights into user behavior, engagement, and trends, enabling you to
            make data-driven decisions instantly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`p-6 rounded-2xl transition-all duration-300
    ${
      darkMode
        ? "border-gray-800 bg-gray-950 shadow-[0_4px_20px_rgba(255,255,255,0.3)] hover:shadow-[0_6px_24px_rgba(255,255,255,0.5)]"
        : "border-gray-100 bg-white shadow-lg hover:shadow-xl"
    }
  `}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 ${
                    darkMode
                      ? `bg-${index % 2 === 0 ? "blue" : "purple"}-300`
                      : `bg-${index % 2 === 0 ? "blue" : "purple"}-100`
                  } rounded-xl flex items-center justify-center`}
                >
                  <stat.icon
                    className={`h-5 w-5 sm:h-6 sm:w-6 ${
                      darkMode
                        ? `text-${index % 2 === 0 ? "blue" : "purple"}-800`
                        : `text-${index % 2 === 0 ? "blue" : "purple"}-600`
                    }`}
                  ></stat.icon>
                </div>
                <span
                  className={`${
                    darkMode
                      ? "text-green-700 bg-green-200"
                      : "text-green-500 bg-green-50"
                  } text-xs sm:text-sm font-semibold px-2 py-1 rounded-full`}
                >
                  {stat.growth}
                </span>
              </div>
              <h3
                className={`text-3xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                } mb-2`}
              >
                {stat.value}
              </h3>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {stat.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Analytics;
