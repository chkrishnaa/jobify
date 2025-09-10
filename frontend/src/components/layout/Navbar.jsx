import React, { useState, useEffect } from "react";
import { Briefcase, Bookmark } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { darkMode } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileDropdownOpen) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [profileDropdownOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b ${
        darkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white/95"
      } backdrop-blur-sm`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/find-jobs" className="flex items-center space-x-3">
            <div
              className={`w-8 h-8 bg-gradient-to-r ${
                darkMode
                  ? "from-blue-600 to-blue-700"
                  : "from-blue-500 to-blue-600"
              } rounded-lg flex items-center justify-center`}
            >
              <Briefcase
                className={`w-5 h-5 ${
                  darkMode ? "text-gray-300" : "text-white"
                }`}
              />
            </div>
            <span
              className={`text-lg font-semibold ${
                darkMode ? "text-gray-200" : "text-gray-900"
              }`}
            >
              JobFinder
            </span>
          </Link>

          <div className="flex items-center space-x-3">
            {user && (
              <button
                className={`p-2 rounded-xl ${
                  darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
                } transition-colors duration-300 relative`}
                onClick={() => navigate("/saved-jobs")}
              >
                <Bookmark
                  className={`h-5 w-5 ${
                    darkMode
                      ? "text-gray-300 hover:text-gray-100"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                />
              </button>
            )}

            {isAuthenticated ? (
              <ProfileDropdown
                isOpen={profileDropdownOpen}
                onToggle={(e) => {
                  e.stopPropagation();
                  setProfileDropdownOpen(!profileDropdownOpen);
                }}
                avatar={user?.avatar || ""}
                companyName={user?.name || ""}
                email={user?.email || ""}
                userRole={user?.role || ""}
                onLogout={logout}
              />
            ) : (
              <>
                <a
                  href="/login"
                  className={`${
                    darkMode
                      ? "text-gray-300 hover:text-gray-100 hover:bg-gray-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  } transition-colors font-medium px-4 py-2 rounded-lg`}
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className={`bg-gradient-to-r ${
                    darkMode
                      ? "from-blue-700 to-purple-700 text-gray-300 hover:from-blue-800 hover:to-purple-800"
                      : "from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                  } px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md`}
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
