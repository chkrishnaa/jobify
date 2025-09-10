import React from "react";
import { Briefcase } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

const Footer = () => {
    const { darkMode } = useTheme();

  return (
    <footer
      className={`relative ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      } overflow-hidden`}
    >
      <div className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center items-center space-x-2 mb-6">
                <div
                  className={`w-10 h-10 bg-gradient-to-r ${
                    darkMode
                      ? "from-blue-700 to-purple-700"
                      : "from-blue-600 to-purple-600"
                  } rounded-lg flex items-center justify-center`}
                >
                  <Briefcase
                    className={`h-6 w-6 ${
                      darkMode ? "text-gray-300" : "text-white"
                    }`}
                  ></Briefcase>
                </div>
                <h3
                  className={`text-2xl font-bold ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  JobiFy
                </h3>
              </div>

              <p
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                } max-w-md mx-auto`}
              >
                Connecting talented professionals with innovative companies
                worldwide. Your career success is our mission.
              </p>
            </div>

            <div className="space-y-4">
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                © {new Date().getFullYear()} Krishnakumar. All rights reserved.
              </p>
              <p
                className={`text-xs ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                Built with passion • Powered by creativity.
              </p>
              <p
                className={`text-xs ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                Made with ❤️ by Krishnakumar
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
