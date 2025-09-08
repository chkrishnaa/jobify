import React, { useState } from "react";
import { Building2, Mail, Edit3 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import uploadImage from "../../utils/uploadImage";

import DashboardLayout from "../../components/layout/DashboardLayout";
import EditProfileDetails from "../../pages/Employer/EditProfileDetails";
import { useTheme } from "../../context/ThemeContext";

const EmployerProfilePage = () => {
  const { darkMode } = useTheme();
  const { user, updateUser } = useAuth();

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    companyName: user?.companyName || "",
    companyDescription: user?.companyDescription || "",
    companyLogo: user?.companyLogo || "",
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });
  const [uploading, setUploading] = useState({ avatar: false, logo: false });
  const [saving, setSaving] = useState(false);

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
      const imgUploadRes = await uploadImage(file);
      const avatarUrl = imgUploadRes.imageUrl || "";

      const field = type === "avatar" ? "avatar" : "companyLogo";
      handleInputChange(field, avatarUrl);
    } catch (error) {
      console.error("Error uploading image", error);
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
      const previewUrl = URL.createObjectURL(file);
      const field = type === "avatar" ? "avatar" : "companyLogo";
      handleInputChange(field, previewUrl);
      handleImageUpload(file, type);
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        formData
      );

      if (response.status === 200) {
        toast.success("Profile Details Updated Successfully!");
        updateUser({ ...formData });
        setProfileData({ ...formData }); // Update local profileData state
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error updating profile details", error);
    } finally {
      setSaving(false);
    }
  };
  const handleCancel = () => {
    setFormData({ ...profileData });
    setEditMode(false);
  };

  if (editMode) {
    return (
      <EditProfileDetails
        formData={formData}
        handleImageChange={handleImageChange}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        uploading={uploading}
        saving={saving}
      />
    );
  }

  return (
    <DashboardLayout activeMenu="company-profile">
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
              className={`bg-gradient-to-r ${
                darkMode
                  ? "from-purple-700 to-purple-800"
                  : "from-purple-500 to-purple-600"
              } py-6 px-8 flex justify-between items-center`}
            >
              <h1 className={`text-xl font-medium text-white`}>
                Employer Profile
              </h1>
              <button
                className={`bg-white/20 ${
                  darkMode ? "text-gray-200" : "text-white"
                } hover:bg-opacity-10 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2`}
                onClick={() => setEditMode(true)}
              >
                <Edit3 className="w-4 h-4"></Edit3>
                <span>Edit Profile</span>
              </button>
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
                    <img
                      src={profileData.avatar}
                      alt="Avatar"
                      className={`w-20 h-20 rounded-full object-cover border-4 ${
                        darkMode ? "border-purple-400" : "border-purple-200"
                      }`}
                    />
                    <div className="">
                      <h3
                        className={`text-lg font-semibold ${
                          darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                      >
                        {profileData.name}
                      </h3>
                      <div
                        className={`flex items-center text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        } mt-1`}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{profileData.email}</span>
                      </div>
                    </div>
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
                    <img
                      src={profileData.companyLogo}
                      alt="Company Logo"
                      className={`w-20 h-20 rounded-lg object-cover border-4 ${
                        darkMode ? "border-purple-400" : "border-purple-200"
                      }`}
                    />
                    <div className="">
                      <h3
                        className={`text-lg font-semibold ${
                          darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                      >
                        {profileData.companyName}
                      </h3>
                      <div
                        className={`flex items-center text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        } mt-1`}
                      >
                        <Building2 className="w-4 h-4 mr-2"></Building2>
                        <span>Company</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2
                  className={`text-lg font-semibold border-b ${
                    darkMode
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-200 text-gray-800"
                  } pb-2`}
                >
                  About Company
                </h2>
                <p
                  className={`mt-4 text-sm ${
                    darkMode
                      ? "text-gray-300 bg-gray-900"
                      : "text-gray-600 bg-gray-200"
                  } leading-relaxed p-2 sm:p-6 rounded-lg text-justify whitespace-pre-line`}
                >
                  {profileData.companyDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployerProfilePage;
