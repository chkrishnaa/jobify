import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Save, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function EditProfilePage({
  formData,
  handleImageChange,
  handleInputChange,
  handleSave,
  handleCancel,
  saving,
  uploading,
}) {
  const { darkMode } = useTheme();

  return (
    <DashboardLayout activeMenu="company-profile">
      {formData && (
        <div className="min-h-screen py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div
              className={`bg-gradient-to-br ${
                darkMode
                  ? "from-gray-800 to-gray-950 shadow-[0_4px_12px_rgba(255,255,255,0.4)]"
                  : "from-white to-gray-200 shadow-lg"
              } rounded-xl overflow-hidden`}
            >
              <div
                className={`bg-gradient-to-r  ${
                  darkMode
                    ? "from-purple-700 to-purple-800"
                    : "from-purple-500 to-purple-600"
                } py-6 px-8`}
              >
                <h1 className={`text-lg md:text-xl font-medium text-white`}>
                  Edit Profile
                </h1>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h2
                      className={`text-lg font-semibold border-b ${
                        darkMode
                          ? "border-gray-700 text-gray-300"
                          : "border-gray-200 text-gray-800"
                      } pb-2`}
                    >
                      Personal Information
                    </h2>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={formData?.avatar}
                          alt="Avatar"
                          className={`w-20 h-20 rounded-full object-cover border-4 ${
                            darkMode ? "border-purple-400" : "border-purple-200"
                          }`}
                        />
                        {uploading?.avatar && (
                          <div
                            className={`absolute inset-0 bg-gradient-to-br${
                              darkMode
                                ? " from-purple-700 to-purple-800"
                                : "from-purple-500 to-purple-600"
                            } bg-opacity-50 rounded-full flex items-center justify-center`}
                          >
                            <div
                              className={`w-6 h-6 border-3 border-purple-200 border-t-transparent rounded-full animate-spin`}
                            ></div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block">
                          <span className="sr-only">Choose Avatar</span>
                          <input
                            type="file"
                            className={`block w-full text-sm 
  file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
  ${
    darkMode
      ? "text-gray-200 file:bg-purple-700 file:text-purple-100 hover:file:bg-purple-600"
      : "text-gray-700 file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
  } transition-colors`}
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, "avatar")}
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        } mb-2`}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                          darkMode
                            ? "border-gray-700 focus:ring-purple-600 placeholder:text-gray-400 text-gray-200"
                            : "border-gray-300 focus:ring-purple-500"
                        } focus:ring-opacity-20 transition-all`}
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        } mb-2`}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                          darkMode
                            ? "border-gray-700 focus:ring-purple-600 text-gray-200 bg-gray-700"
                            : "border-gray-300 focus:ring-purple-500 bg-gray-300"
                        } focus:ring-opacity-20 transition-all`}
                        value={formData.email}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h2
                      className={`text-lg font-semibold border-b ${
                        darkMode
                          ? "border-gray-700 text-gray-300"
                          : "border-gray-200 text-gray-800"
                      } pb-2`}
                    >
                      Company Information
                    </h2>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={formData.companyLogo}
                          alt="Company Logo"
                          className={`w-20 h-20 rounded-lg object-cover border-4 ${
                            darkMode ? "border-purple-400" : "border-purple-200"
                          }`}
                        />
                        {uploading.logo && (
                          <div
                            className={`absolute inset-0 bg-gradient-to-br${
                              darkMode
                                ? " from-purple-700 to-purple-800"
                                : "from-purple-500 to-purple-600"
                            } bg-opacity-50 rounded-lg flex items-center justify-center`}
                          >
                            className=
                            {`w-6 h-6 border-3 border-purple-200 border-t-transparent rounded-full animate-spin`}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block">
                          <span className="sr-only">Choose Company Logo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, "logo")}
                            className={`block w-full text-sm 
  file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
  ${
    darkMode
      ? "text-gray-200 file:bg-purple-700 file:text-purple-100 hover:file:bg-purple-600"
      : "text-gray-700 file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
  } transition-colors`}
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        } mb-2`}
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) =>
                          handleInputChange("companyName", e.target.value)
                        }
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                          darkMode
                            ? "border-gray-700 focus:ring-purple-600 placeholder:text-gray-400 text-gray-200"
                            : "border-gray-300 focus:ring-purple-500"
                        } focus:ring-opacity-20 transition-all`}
                        placeholder="Enter company name"
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        } mb-2`}
                      >
                        Company Description
                      </label>
                      <textarea
                        value={formData.companyDescription}
                        onChange={(e) =>
                          handleInputChange(
                            "companyDescription",
                            e.target.value
                          )
                        }
                        rows={8}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                          darkMode
                            ? "border-gray-700 focus:ring-purple-600 placeholder:text-gray-400 text-gray-200"
                            : "border-gray-300 focus:ring-purple-500"
                        } focus:ring-opacity-20 transition-all resize-none`}
                        placeholder="Describe your company ..."
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={`flex justify-end space-x-4 mt-8 pt-6 border-t ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <button
                    className={`px-6 py-3 border ${
                      darkMode
                        ? "border-gray-700 text-gray-300 hover:bg-gray-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    } rounded-lg transition-colors flex items-center space-x-2`}
                    onClick={handleCancel}
                  >
                    <X className="w-4 h-4"></X>
                    <span>Cancel</span>
                  </button>
                  <button
                    className={`px-6 py-3 ${
                      darkMode
                        ? "bg-purple-700 text-gray-300 hover:bg-purple-800"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    } rounded-lg flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                    onClick={handleSave}
                    disabled={saving || uploading.avatar || uploading.logo}
                  >
                    {saving ? (
                      <div
                        className={`w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin`}
                      ></div>
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>{saving ? "Saving ..." : "Save Changes"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
