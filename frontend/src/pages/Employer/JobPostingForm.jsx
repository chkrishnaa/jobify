import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  AlertCircle,
  MapPin,
  IndianRupee,
  Briefcase,
  Users,
  Eye,
  Send,
} from "lucide-react";
import { API_PATHS } from "../../utils/apiPaths";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { CATEGORIES, JOB_TYPES } from "../../utils/data";
import toast from "react-hot-toast";
import InputField from "../../components/Input/InputField";
import SelectField from "../../components/Input/SelectField";
import TextAreaField from "../../components/Input/TextAreaField";
import JobPostingPreview from "../../components/Cards/JobPostingPreview";
import { useTheme } from "../../context/ThemeContext";

export default function JobPostingForm() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.state?.jobId || null;

  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    category: "",
    jobType: "",
    description: "",
    requirements: "",
    salaryMin: "",
    salaryMax: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const jobPayload = {
      title: formData.jobTitle,
      description: formData.description,
      requirements: formData.requirements,
      location: formData.location,
      category: formData.category,
      type: formData.jobType,
      salaryMin: formData.salaryMin,
      salaryMax: formData.salaryMax,
    };

    try {
      const response = jobId
        ? await axiosInstance.put(API_PATHS.JOBS.UPDATE_JOB(jobId), jobPayload)
        : await axiosInstance.post(API_PATHS.JOBS.POST_JOB, jobPayload);

      if (response.status === 200 || response.status === 201) {
        toast.success(
          jobId ? "Job Updated Successfully!" : "Job Posted Successfully!"
        );
        setFormData({
          jobTitle: "",
          location: "",
          category: "",
          jobType: "",
          description: "",
          requirements: "",
          salaryMin: "",
          salaryMax: "",
        });
        navigate("/employer-dashboard");
        return;
      }
      console.error("Unexpected response:", response);
      toast.error("Something went wrong. Please try again.");
    } catch (error) {
      if (error.response?.data?.message) {
        console.error("API Error:", error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Unexpected error:", error);
        toast.error("Failed to post/update job. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.jobTitle) {
      errors.jobTitle = "Job title is required";
    }

    if (!formData.category) {
      errors.category = "Please, select a category";
    }

    if (!formData.jobType) {
      errors.jobType = "Please, select a job type";
    }

    if (!formData.description.trim()) {
      errors.description = "Job description is required";
    }

    if (!formData.requirements.trim()) {
      errors.requirements = "Job requirements are required";
    }

    if (!formData.salaryMin || !formData.salaryMax) {
      errors.salary = "Both minimum and maximum salary ranges are required";
    } else if (parseInt(formData.salaryMin) >= parseInt(formData.salaryMax)) {
      errors.salary = "Maximum salary must be greater than minimum salary";
    }

    return errors;
  };

  const isFormValid = () => {
    const validationErrors = validateForm(formData);
    return Object.keys(validationErrors).length === 0;
  };

  if (isPreview) {
    return (
      <DashboardLayout activeMenu="post-job">
        <JobPostingPreview formData={formData} setIsPreview={setIsPreview} />
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout activeMenu="post-job">
      <div className="min-h-screen px-2 sm:px-0 py-10 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <div
            className={` ${
              darkMode
                ? "bg-gray-900 shadow-[0_4px_12px_rgba(255,255,255,0.4)]"
                : "bg-white shadow-lg"
            } rounded-md sm:rounded-2xl p-3 sm:p-6`}
          >
            <div className="flex items-center space-x-2 justify-between mb-4">
              <h2
                className={`text-xl font-bold bg-gradient-to-r ${
                  darkMode
                    ? "from-white to-gray-400"
                    : "from-gray-900 to-gray-100"
                } bg-clip-text text-transparent`}
              >
                Post a New Job
              </h2>
              <button
                onClick={() => setIsPreview(true)}
                disabled={!isFormValid()}
                className={`group flex items-center space-x-2 text-sm font-medium px-2 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg ${
                  !isFormValid()
                    ? darkMode
                      ? "bg-gray-700 text-gray-400 border border-gray-700 cursor-not-allowed shadow-gray-800"
                      : "bg-gray-300 text-gray-600 border border-gray-300 cursor-not-allowed shadow-gray-300"
                    : darkMode
                    ? "text-gray-300 bg-gray-800/50 border border-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700 hover:border-transparent transform hover:-translate-y-0.5 shadow-gray-800 hover:shadow-xl"
                    : "text-gray-600 bg-white/50 border border-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700 hover:border-transparent transform hover:-translate-y-0.5 shadow-gray-300 hover:shadow-xl"
                }`}
              >
                <Eye
                  className={`h-4 w-4 transition-transform ${
                    isFormValid() ? "group-hover:-translate-x-1" : ""
                  }`}
                />
                <span>Preview</span>
              </button>
            </div>
            <div className="flex items-center mb-4 sm:mb-8">
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                } mt-1`}
              >
                Fill out the form below to create your job posting.
              </p>
            </div>
            <div className="space-y-3 sm:space-y-6">
              <InputField
                label="Job Title"
                id="jobTitle"
                placeholder="e.g.Senior Full Stack Developer"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                error={errors.jobTitle}
                required
                icon={Briefcase}
              />

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-4 space-y-4 sm:space-y-0">
                  <div className="flex-1">
                    <InputField
                      label="Location"
                      id="location"
                      placeholder="e.g., New York, NY"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      error={errors.location}
                      required
                      icon={MapPin}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField
                  label="Category"
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  options={CATEGORIES}
                  placeholder="Select a category"
                  error={errors.category}
                  required
                  icon={Users}
                />

                <SelectField
                  label="Job Type"
                  id="jobType"
                  value={formData.jobType}
                  onChange={(e) => handleInputChange("jobType", e.target.value)}
                  options={JOB_TYPES}
                  placeholder="Select job type"
                  error={errors.jobType}
                  required
                  icon={Briefcase}
                />
              </div>

              <TextAreaField
                label="Job Description"
                id="description"
                placeholder="Describe your roles and responsibilities ..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                error={errors.description}
                helperText="Include key responsibilities, data-to-day tasks, and what makes this role exciting."
                required
              />

              <TextAreaField
                label="Requirements"
                id="requirements"
                placeholder="List key qualifications and skills ..."
                value={formData.requirements}
                onChange={(e) =>
                  handleInputChange("requirements", e.target.value)
                }
                error={errors.requirements}
                helperText="Include required skiill, experience level, education, and any preferred qualification."
                required
              />

              <div className="space-y-2">
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Salary Range{" "}
                  <span
                    className={`${
                      darkMode ? "text-red-400" : "text-red-500"
                    } ml-1`}
                  >
                    *
                  </span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <IndianRupee className="h-3 sm:h-4 w-3 sm:w-4 text-gray-400"></IndianRupee>
                    </div>
                    <input
                      type="number"
                      placeholder="Min"
                      value={formData.salaryMin}
                      onChange={(e) =>
                        handleInputChange("salaryMin", e.target.value)
                      }
                      className={`w-full pl-7 sm:pl-10 pr-3 py-2.5 border rounded-lg text-sm sm:text-base
  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-20 
  transition-colors duration-300
  ${
    darkMode
      ? "bg-gray-900 border-gray-700 text-gray-200 placeholder-gray-400"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
  }`}
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <IndianRupee className="h-3 sm:h-4 w-3 sm:w-4 text-gray-400"></IndianRupee>
                    </div>
                    <input
                      type="number"
                      placeholder="Max"
                      value={formData.salaryMax}
                      onChange={(e) =>
                        handleInputChange("salaryMax", e.target.value)
                      }
                      className={`w-full pl-7 sm:pl-10 pr-3 py-2.5 border rounded-lg text-sm sm:text-base
  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-20 
  transition-colors duration-300
  ${
    darkMode
      ? "bg-gray-900 border-gray-700 text-gray-200 placeholder-gray-400"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
  }`}
                    />
                  </div>
                </div>
                {errors.salary && (
                  <div
                    className={`flex items-center space-x-1 text-sm ${
                      darkMode ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.salary}</span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  className={`w-full flex place-items-center justify-center px-4 py-3 border border-transparent text-sm sm:text-base font-medium rounded-lg
${
  darkMode
    ? "text-gray-300 bg-purple-700 hover:bg-purple-800"
    : "text-white bg-purple-600 hover:bg-purple-700"
}                   focus:outline-none focus:ring-offset-2
                    ${
                      darkMode
                        ? "focus:ring-purple-600 disabled:bg-gray-500"
                        : "focus:ring-purple-500 disabled:bg-gray-400"
                    } disabled:cursor-not-allowed outline-none transition-colors duration-300`}
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isFormValid()}
                >
                  {isSubmitting ? (
                    <>
                      <div
                        className={`animate-spin rounded-full h-5 w-5 border-b-2 ${
                          darkMode ? "border-gray-700" : "border-white"
                        } mr-2`}
                      ></div>
                      Publishing Job ...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                      Publish Job
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
