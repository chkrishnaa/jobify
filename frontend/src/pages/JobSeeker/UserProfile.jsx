import React, { useEffect, useState } from "react";
import { Save, X, Trash2, Download } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import uploadImage from "../../utils/uploadImage";
import uploadResume from "../../utils/uploadResume";
import Navbar from "../../components/layout/Navbar";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const { darkMode } = useTheme();

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    resume: user?.resume || "",
  });

  const [formData, setFormData] = useState({ ...profileData, resumeDraft: "" });
  const [uploading, setUploading] = useState({
    avatar: false,
    logo: false,
    resume: false,
  });
  const [saving, setSaving] = useState(false);
  const [showResumeWarning, setShowResumeWarning] = useState(true);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = async (file, type) => {
    setUploading((prev) => ({
      ...prev,
      [type]: true,
    }));
    try {
      let uploadRes;

      if (type === "resume") {
        uploadRes = await uploadResume(file);
      } else {
        uploadRes = await uploadImage(file);
      }

      const fileUrl = uploadRes.imageUrl || "";
      handleInputChange(type, fileUrl);
    } catch (error) {
      console.error("File Upload Failed", error);
      toast.error(error.message || "Upload failed");
    } finally {
      setUploading((prev) => ({
        ...prev,
        [type]: false,
      }));
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "resume") {
        // For resumes, don't create preview URLs - just upload directly
        handleImageUpload(file, type);
      } else {
        // For images, create preview URL
        const previewUrl = URL.createObjectURL(file);
        handleInputChange(type, previewUrl);
        handleImageUpload(file, type);
      }
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
        ...formData,
        resume: formData.resumeDraft || formData.resume, // ✅ commit draft if exists
      });

      if (response.status === 200) {
        toast.success("Profile Details Updated Successfully!");
        setProfileData({
          ...formData,
          resume: formData.resumeDraft || formData.resume,
        });
        updateUser({
          ...formData,
          resume: formData.resumeDraft || formData.resume,
        });

        // ✅ Reset draft after save
        setFormData((prev) => ({
          ...prev,
          resume: formData.resumeDraft || formData.resume,
          resumeDraft: "",
        }));
        setShowResumeWarning(false);

        if (formData.resumeDraft) {
          toast.success("Resume Uploaded Successfully 🎉");
        }
      }
    } catch (error) {
      console.error("Profile Update Failed.", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...profileData });
  };

  // Add inside your component
  const getDirectDownloadLink = (url) => {
    // Check if it's a Google Drive link
    if (url.includes("drive.google.com")) {
      const match = url.match(/\/d\/([^/]+)\//);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=download&id=${match[1]}`;
      }
    }
    return url; // return original if not drive
  };

  const handleDownloadResume = () => {
    try {
      const directUrl = getDirectDownloadLink(formData.resume);

      // Create a hidden <a> tag and trigger click
      const a = document.createElement("a");
      a.href = directUrl;
      a.setAttribute(
        "download",
        `${user?.name?.split(" ")[0] || "User"}Resume.pdf`
      );
      a.setAttribute("target", "_blank"); // ensure it works even if download attr is ignored
      document.body.appendChild(a);
      a.click();
      a.remove();

      toast.success("Resume Downloaded Successfully!");
    } catch (error) {
      console.error("Download failed", error);
      toast.error("Failed to download resume");
    }
  };




  const DeleteResume = async () => {
    setSaving(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.DELETE_RESUME, {
        resumeUrl: user.resume || "",
      });

      if (response.status === 200) {
        toast.success("Resume Deleted Successfully!");
        setProfileData({ ...formData, resume: "" });
        updateUser({ ...formData, resume: "" });

        // ✅ Show warning again
        setShowResumeWarning(true);
      }
    } catch (error) {
      console.error("Profile Update Failed.", error);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const userData = {
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar || "",
      resume: user?.resume || "", // ✅ include resume in reset
    };
    setProfileData({ ...userData });
    setFormData({ ...userData });

    // Cleanup function to revoke blob URLs
    return () => {
      // Clean up any blob URLs that might have been created
      if (formData.avatar && formData.avatar.startsWith("blob:")) {
        URL.revokeObjectURL(formData.avatar);
      }
    };
  }, [user]);

  return (
    <div
      className={`bg-gradient-to-br ${
        darkMode
          ? "from-blue-900 via-black to-purple-950"
          : "from-blue-100 via-white to-purple-200"
      } py-6 sm:py-24 px-0 sm:px-6`}
    >
      <Navbar />

      <div className="min-h-screen mt-16">
        <div className="max-w-4xl mx-auto">
          <div
            className={`${
              darkMode ? "bg-gray-900" : "bg-white"
            } rounded-none sm:rounded-xl shadow-none sm:shadow-lg overflow-hidden`}
          >
            <div
              className={`bg-gradient-to-r ${
                darkMode
                  ? "from-blue-600 to-blue-800"
                  : "from-blue-400 to-blue-600"
              } px-2 sm:px-8 py-6 flex justify-between items-center`}
            >
              <h1 className={`text-lg sm:text-xl font-medium text-white`}>
                Profile
              </h1>
            </div>

            <div className="px-3 py-6 sm:p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={formData?.avatar}
                      alt="Avatar"
                      className={`w-15 sm:w-20 h-15 sm:h-20 rounded-full object-cover border-3 sm:border-4 ${
                        darkMode ? "border-blue-400" : "border-blue-200"
                      }`}
                    />
                    {uploading?.avatar && (
                      <div className="absolute inset-0 bg-blue-300 bg-opacity-50 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block">
                      <span className="sr-only">Choose avatar</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "avatar")}
                        className={`block w-full text-xs sm:text-sm 
  file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
  ${
    darkMode
      ? "text-gray-200 file:bg-blue-700 file:text-blue-100 hover:file:bg-blue-600"
      : "text-gray-700 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
  }
  transition-colors`}
                      />
                    </label>
                  </div>
                </div>
                <div className="">
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } mb-2`}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${
                      darkMode
                        ? "border-gray-700 focus:ring-purple-600 text-gray-200"
                        : "border-gray-300 focus:ring-purple-500"
                    } focus:ring-opacity-20 transition-all`}
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>{" "}
                <div className="">
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } mb-2 `}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${
                      darkMode
                        ? "border-gray-700 focus:ring-purple-600 text-gray-200 bg-gray-700"
                        : "border-gray-300 focus:ring-purple-500 bg-gray-300"
                    } focus:ring-opacity-20 transition-all`}
                    value={formData.email}
                    disabled
                  />
                </div>
                {formData?.resume ? (
                  // ✅ Show after save
                  <div>
                    <label
                      className={`block text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } mb-2`}
                    >
                      Resume
                    </label>
                    <div
                      className={`flex justify-between items-center gap-3 px-2 sm:px-3 py-1 sm:py-2 rounded-lg border ${
                        darkMode
                          ? "bg-gray-800 border-gray-700"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      {/* PDF Icon */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="h-7 sm:h-8 w-7 sm:w-8 rounded-sm font-extrabold scale-125 bg-red-600 text-white text-xs sm:text-sm flex items-center justify-center">
                          PDF
                        </div>

                        {/* ✅ FirstName + Resume.pdf */}
                        <a
                          href={formData.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-600 underline truncate max-w-[120px] sm:max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap text-sm sm:text-base"
                        >
                          {user?.name?.split(" ")[0] || "User"}Resume.pdf
                        </a>
                      </div>

                      {/* Delete */}
                      <div className="flex items-center gap-0 sm:gap-2">
                        <button
                          onClick={handleDownloadResume}
                          className={`flex items-center text-xs ${
                            darkMode
                              ? "text-green-400 hover:text-green-800 hover:bg-green-300"
                              : "text-green-500 hover:text-green-700 hover:bg-green-100"
                          } p-2 rounded-lg transition-colors duration-300`}
                        >
                          <Download className="h-4 sm:h-5 w-4 sm:w-5" />
                        </button>

                        <button
                          className={`${
                            darkMode
                              ? "text-red-400 hover:text-red-800 hover:bg-orange-300"
                              : "text-red-500 hover:text-red-700 hover:bg-orange-100"
                          } p-2 rounded-lg transition-colors duration-300`}
                          onClick={DeleteResume}
                        >
                          <Trash2 className="h-4 sm:h-5 w-4 sm:w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // 🔹 Input before save
                  <div>
                    <label
                      className={`block text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } mb-2`}
                    >
                      Resume Link
                    </label>
                    <div className="relative w-full">
                      <input
                        type="url"
                        placeholder="Paste your resume link here"
                        value={formData.resumeDraft}
                        onChange={(e) => {
                          handleInputChange("resumeDraft", e.target.value);
                          setShowResumeWarning(true);
                        }}
                        className={`w-full px-4 py-3 pr-20 border rounded-lg focus:outline-none focus:ring-2 ${
                          darkMode
                            ? "border-gray-700 focus:ring-purple-600 text-gray-200"
                            : "border-gray-300 focus:ring-purple-500"
                        } focus:ring-opacity-20 transition-all text-sm`}
                      />

                      {formData.resumeDraft && (
                        <a
                          href={formData.resumeDraft}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 text-sm font-medium hover:underline"
                        >
                          Open
                        </a>
                      )}
                    </div>

                    {showResumeWarning && (
                      <p className="text-xs text-yellow-600 mt-1">
                        ⚠️ The PDF link should be accessible publicly.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div
                className={`flex justify-end space-x-4 mt-8 pt-6 border-t ${
                  darkMode ? "border-gray-700" : "border-gray-300"
                }`}
              >
                <Link
                  className={`px-3 sm:px-6 py-2 sm:py-3 border text-sm sm:text-base ${
                    darkMode
                      ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                      : "border-gray-300 text-gray-700 hover:bg-gray-200"
                  } rounded-lg transition-colors flex items-center space-x-2`}
                  onClick={handleCancel}
                  to="/find-jobs"
                >
                  <X className="w-4 h-4"></X>
                  <span>Cancel</span>
                </Link>
                <button
                  onClick={handleSave}
                  disabled={
                    saving ||
                    uploading.avatar ||
                    uploading.logo ||
                    uploading.resume
                  }
                  className={`px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base ${
                    darkMode
                      ? "bg-blue-700 text-gray-300 hover:bg-blue-800"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  } rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2`}
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
    </div>
  );
};

export default UserProfile;
