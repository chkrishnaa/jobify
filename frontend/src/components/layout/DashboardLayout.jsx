import React, { useState, useEffect } from "react";
import { Briefcase, Building2, LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { NAVIGATION_MENU } from "../../utils/data";
import ProfileDropdown from "./ProfileDropdown";
import { useTheme } from "../../context/ThemeContext";

const NavigationItem = ({ item, isActive, onClick, isCollapsed }) => {
  const { darkMode } = useTheme();
  const Icon = item.icon;
  return (
    <button
      onClick={() => onClick(item.id)}
      className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 group ${
        isActive
          ? darkMode
            ? "bg-purple-800 text-purple-400 shadow-sm shadow-gray-700 backdrop-opacity-75"
            : "bg-purple-100 text-purple-700 shadow-sm shadow-purple-50"
          : darkMode
          ? "text-gray-300 hover:bg-gray-800 hover:text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <Icon
        className={`w-6 h-6 flex-shrink-0 ${
          isActive
            ? darkMode
              ? "text-purple-500"
              : "text-purple-600"
            : darkMode
            ? "text-gray-400"
            : "text-gray-500"
        }`}
      />
      {!isCollapsed && (
        <span
          className={`ml-3 truncate ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {item.name}
        </span>
      )}
    </button>
  );
};

const DashboardLayout = ({ activeMenu, children }) => {
  const { darkMode } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(activeMenu || "dashboard");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSideBarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      if (profileDropdownOpen) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [profileDropdownOpen]);

  const handleNavigation = (itemId) => {
    setActiveNavItem(itemId);
    navigate(`/${itemId}`);
    if (isMobile) {
      setSideBarOpen(false); // ✅ fixed
    }
  };

  const toggleSidebar = () => {
    setSideBarOpen((prev) => !prev);
  };

  const sidebarCollapsed = false; // ✅ keeps full width sidebar on desktop

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
      {/* Side Bar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 transform ${
          isMobile
            ? sideBarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        } ${sidebarCollapsed ? "w-16" : "w-64"} border-r ${
          darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        {/* Sidebar Header (inside sidebar div) */}
        <div
          className={`flex items-center justify-between h-16 border-b px-6 ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          {!sidebarCollapsed ? (
            <Link className="flex items-center space-x-3" to="/">
              <div
                className={`h-8 w-8 bg-gradient-to-br ${
                  darkMode
                    ? "from-blue-700 to-purple-700"
                    : "from-blue-600 to-purple-600"
                } rounded-lg flex items-center justify-center`}
              >
                <Briefcase
                  className={`h-5 w-5 ${
                    darkMode ? "text-gray-300" : "text-white"
                  }`}
                />
              </div>
              <span
                className={`${
                  darkMode ? "text-white" : "text-gray-900"
                } font-bold text-xl`}
              >
                JobFinder
              </span>
            </Link>
          ) : (
            <div
              className={`h-8 w-8 bg-gradient-to-br ${
                darkMode
                  ? "from-blue-700 to-purple-700"
                  : "from-blue-600 to-purple-600"
              } rounded-xl flex items-center justify-center`}
            >
              <Building2
                className={`h-5 w-5 ${
                  darkMode ? "text-gray-300" : "text-white"
                }`}
              />
            </div>
          )}

          {/* Mobile Close Button */}
          {isMobile && sideBarOpen && (
            <button
              className={`p-2 rounded-xl transition-colors duration-300 ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
              onClick={toggleSidebar}
            >
              <X
                className={`h-5 w-5 ${
                  darkMode ? "text-gray-200" : "text-gray-600"
                }`}
              />
            </button>
          )}
        </div>

        <nav className="p-4 space-y-2">
          {NAVIGATION_MENU.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              isActive={activeNavItem === item.id}
              onClick={handleNavigation}
              isCollapsed={sidebarCollapsed}
            />
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
              darkMode
                ? "text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            } transition-all duration-300`}
            onClick={logout}
          >
            <LogOut
              className={`h-5 w-5 flex-shrink-0 ${
                darkMode ? "text-gray-300" : "text-gray-500"
              }`}
            />
            {!sidebarCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && sideBarOpen && (
        <div
          className={`fixed inset-0 ${
            darkMode ? "bg-white" : "bg-gray-900"
          } bg-opacity-25 z-40 backdrop-blur-sm`}
          onClick={() => setSideBarOpen(false)}
        />
      )}

      {/* Main Content  */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 min-w-0 ${
          isMobile ? "ml-0" : sidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Top Navbar */}
        <header
          className={`border-b ${
            darkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-white/80 border-gray-200"
          } backdrop-blur-sm h-16 flex items-center justify-between px-6 sticky top-0 z-30`}
        >
          <div className="flex items-center space-x-4">
            {isMobile && (
              <button
                className={`p-2 rounded-xl ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                } transition-colors duration-300`}
                onClick={toggleSidebar}
              >
                {sideBarOpen ? (
                  <X
                    className={`h-5 w-5 ${
                      darkMode ? "text-gray-200" : "text-gray-600"
                    }`}
                  />
                ) : (
                  <Menu
                    className={`h-5 w-5 ${
                      darkMode ? "text-gray-200" : "text-gray-600"
                    }`}
                  />
                )}
              </button>
            )}
            <div>
              <h1
                className={`text-base font-semibold ${
                  darkMode ? "text-gray-200" : "text-gray-900"
                }`}
              >
                Welcome Back!
              </h1>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                } hidden sm:block`}
              >
                Here's what's happening with your job today.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Profile Dropdown placeholder */}
            <ProfileDropdown
              isOpen={profileDropdownOpen}
              onToggle={(e) => {
                e.stopPropagation();
                setProfileDropdownOpen(!profileDropdownOpen);
              }}
              avatar={user?.avatar || ""}
              companyName={user?.name || ""}
              email={user?.email || ""}
              onLogout={logout}
            />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
