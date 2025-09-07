import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import ToggleMode from "../../pages/LandingPage/components/Toggle/ToggleMode";
import { useTheme } from "../../context/ThemeContext";

const ProfileDropdown = ({
  isOpen,
  onToggle,
  avatar,
  companyName,
  email,
  onLogout,
  userRole,
}) => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-colors duration-300"
        onClick={onToggle}
      >
        {avatar ? (
          <img
            src={avatar}
            alt="Avatar"
            className="h-9 w-9 object-cover rounded-xl"
          />
        ) : (
          <div className="h-8 w-8 bg-gradient-to-br from-purple-400 to-purple-700 rounded-xl flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {companyName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-gray-900">{companyName}</p>
          <p className="text-xs text-gray-500">Employer</p>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
          <div className="px-4 py-3 border-bborder-gray-100">
            <p className="text-sm font-medium text-gray-900">{companyName}</p>
            <p className="text-xs text-gray-500">{email}</p>
          </div>

          <a
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() =>
              navigate(
                userRole === "jobseeker" ? "/profile" : "/company-profile"
              )
            }
          >
            View Profile
          </a>
          <div className="border-t border-gray-100 mt-2 pt-2">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              onClick={onLogout}
            >
              Sign Out
            </a>

            <div className="flex items-center justify-between px-4 py-2">
              <p className="text-sm font-medium text-gray-900">
                {darkMode ? "Dark Mode" : "Light Mode"}
              </p>
              <div
                onClick={(e) => e.stopPropagation()} 
              >
                <ToggleMode />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
