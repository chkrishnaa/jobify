import React from "react";
import { jobSeekerFeatures, employerFeatures } from "../../../utils/data";
import { useTheme } from "../../../context/ThemeContext";

const Features = () => {
    const { darkMode } = useTheme();

  return (
    <section
      className={`py-20 ${
        darkMode ? "bg-gray-950" : "bg-white"
      } relative overflow-hidden`}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Everything you need to
            <span
              className={`block bg-gradient-to-r ${
                darkMode
                  ? "from-blue-700 to-purple-700"
                  : "from-blue-600 to-purple-600"
              } bg-clip-text text-transparent`}
            >
              Succeed
            </span>
          </h2>
          <p
            className={`text-xl ${
              darkMode ? "text-gray-300" : "text-gray-600"
            } max-w-3xl mx-auto`}
          >
            Whether you're looking for your next opportunity or the perfect
            candidate, JobFinder has got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          <div className="">
            <div className="text-center mb-12">
              <h3
                className={`text-3xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                } mb-4`}
              >
                For Job Seekers
              </h3>
              <div
                className={`w-24 h-1 bg-gradient-to-r ${
                  darkMode
                    ? "from-blue-500 to-blue-800"
                    : "from-blue-400 to-blue-700"
                } mx-auto rounded-full`}
              ></div>
            </div>

            <div className="space-y-8">
              {jobSeekerFeatures.map((feature, index) => (
                <div
                  className={`group flex items-start space-x-4 p-6 rounded-2xl transform transition-all duration-300 cursor-pointer
    ${
      darkMode
        ? "bg-gray-900/40 hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-700 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
        : "bg-white hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 hover:shadow-[0_8px_20px_rgba(59,130,246,0.3)]"
    }
    hover:scale-[1.02] hover:-translate-y-1`}
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
      ${
        darkMode
          ? "bg-blue-300 group-hover:bg-blue-500"
          : "bg-blue-100 group-hover:bg-blue-300"
      }`}
                  >
                    <feature.icon
                      className={`h-6 w-6 transform transition-transform duration-300
        ${
          darkMode
            ? "text-blue-800 group-hover:rotate-6 group-hover:scale-110"
            : "text-blue-600 group-hover:rotate-6 group-hover:scale-110"
        }`}
                    />
                  </div>
                  <div>
                    <h4
                      className={`text-xl font-semibold transition-colors duration-300 mb-2
        ${
          darkMode
            ? "text-gray-50 group-hover:text-white"
            : "text-gray-900 group-hover:text-blue-800"
        }`}
                    >
                      {feature.title}
                    </h4>
                    <p
                      className={`leading-relaxed text-justify transition-colors duration-300
        ${
          darkMode
            ? "text-gray-300 group-hover:text-gray-200"
            : "text-gray-600 group-hover:text-gray-700"
        }`}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-center mb-12">
              <h3
                className={`text-3xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                } mb-4`}
              >
                For Employers
              </h3>
              <div
                className={`w-24 h-1 bg-gradient-to-r ${
                  darkMode
                    ? "from-purple-500 to-purple-800"
                    : "from-purple-400 to-purple-700"
                } mx-auto rounded-full`}
              ></div>
            </div>

            <div className="space-y-8">
              {employerFeatures.map((feature, index) => (
                <div
                  className={`group flex items-start space-x-4 p-6 rounded-2xl transform transition-all duration-300 cursor-pointer
    ${
      darkMode
        ? "bg-gray-900/40 hover:bg-gradient-to-r hover:from-purple-800 hover:to-purple-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]"
        : "bg-white hover:bg-gradient-to-r hover:from-purple-100 hover:to-purple-200 hover:shadow-[0_8px_20px_rgba(168,85,247,0.3)]"
    }
    hover:scale-[1.02] hover:-translate-y-1`}
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
      ${
        darkMode
          ? "bg-purple-300 group-hover:bg-purple-500"
          : "bg-purple-100 group-hover:bg-purple-300"
      }`}
                  >
                    <feature.icon
                      className={`h-6 w-6 transform transition-transform duration-300
        ${
          darkMode
            ? "text-purple-800 group-hover:rotate-6 group-hover:scale-110"
            : "text-purple-600 group-hover:rotate-6 group-hover:scale-110"
        }`}
                    />
                  </div>
                  <div>
                    <h4
                      className={`text-xl font-semibold transition-colors duration-300 mb-2
        ${
          darkMode
            ? "text-gray-50 group-hover:text-white"
            : "text-gray-900 group-hover:text-purple-800"
        }`}
                    >
                      {feature.title}
                    </h4>
                    <p
                      className={`leading-relaxed text-justify transition-colors duration-300
        ${
          darkMode
            ? "text-gray-300 group-hover:text-gray-200"
            : "text-gray-600 group-hover:text-gray-700"
        }`}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
