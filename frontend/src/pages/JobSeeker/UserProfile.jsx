import React, { useEffect, useState } from "react";
import { Save, X, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import uploadImage from "../../utils/uploadImage";
import uploadResume from "../../utils/uploadResume";
import Navbar from "../../components/layout/Navbar";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user, updateUser } = useAuth();

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    resume: user?.resume || "",
  });

  const [formData, setFormData] = useState({ ...profileData });
  const [uploading, setUploading] = useState({ avatar: false, logo: false, resume: false });
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
      let uploadRes;
      
      if (type === 'resume') {
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
      if (type === 'resume') {
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
      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        formData
      );

      if (response.status === 200) {
        toast.success("Profile Details Updated Successfully!");
        setProfileData({ ...formData });
        updateUser({ ...formData });
        updateUser({ ...formData });
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
    };
    setProfileData({ ...userData });
    setFormData({ ...userData });
    
    // Cleanup function to revoke blob URLs
    return () => {
      // Clean up any blob URLs that might have been created
      if (formData.avatar && formData.avatar.startsWith('blob:')) {
        URL.revokeObjectURL(formData.avatar);
      }
    };
  }, [user]);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-8 px-4 mt-16 lg:m-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 flex justify-between items-center">
              <h1 className="text-xl font-medium text-white">Profile</h1>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="">
                    <img
                      src={formData?.avatar}
                      alt="Avatar"
                      className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
                    />
                    {uploading?.avatar && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                      />
                    </label>
                  </div>
                </div>
                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>{" "}
                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    value={formData.email}
                    disabled
                  />
                </div>
                {user?.resume ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resume
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
                        <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-600">PDF Resume</span>
                      </div>
                      
                      <a
                        href={user?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        View Resume
                      </a>

                      <button
                        className="cursor-pointer p-2 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={DeleteResume}
                      >
                        <Trash2 className="w-5 h-5 text-red-500"/>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resume (PDF only)
                    </label>
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleImageChange(e, "resume")}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                      />
                      {uploading?.resume && (
                        <div className="flex items-center gap-2 text-sm text-blue-600">
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          Uploading resume...
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-300">
                <Link
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                  onClick={handleCancel}
                  to="/find-jobs"
                >
                  <X className="w-4 h-4"></X>
                  <span>Cancel</span>
                </Link>
                <button
                  onClick={handleSave}
                  disabled={saving || uploading.avatar || uploading.logo || uploading.resume}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
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
