import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Upload,
  Eye,
  EyeOff,
  UserCheck,
  Building2,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import {
  validateEmail,
  validatePassword,
  validateAvatar,
} from "../../utils/helper";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { useTheme } from "../../context/ThemeContext";
import InputType from "../../components/Input/InputType";
import AuthCommonConponent from "../../components/Input/AuthCommonComponent";

const SignUp = () => {
  const { login } = useAuth();
  const { darkMode } = useTheme();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    avatar: null,
  });

  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    showPassword: false,
    avatarPreview: null,
    success: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formState.errors[name]) {
      setFormState((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          [name]: "",
        },
      }));
    }
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));

    if (formState.errors.role) {
      setFormState((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          role: "",
        },
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const error = validateAvatar(file);
      if (error) {
        setFormState((prev) => ({
          ...prev,
          errors: {
            ...prev.errors,
            avatar: error,
          },
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        avatar: file,
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormState((prev) => ({
          ...prev,
          avatarPreview: e.target.result,
          errors: {
            ...prev.errors,
            avatar: "",
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = {
      fullName: !formData.fullName ? "Enter full name" : "",
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      role: !formData.role ? "Please, select a role" : "",
      avatar: "",
    };

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });

    setFormState((prev) => ({
      ...prev,
      errors,
    }));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormState((prev) => ({
      ...prev,
      loading: true,
    }));

    try {
      let avatarUrl = "";

      if (formData.avatar) {
        const imgUploadRes = await uploadImage(formData.avatar);
        avatarUrl = imgUploadRes.imageUrl || imgUploadRes.imgUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        avatar: avatarUrl,
      });

      setFormState((prev) => ({
        ...prev,
        loading: false,
        success: true,
        errors: {},
      }));

      const { token } = response.data;
      if (token) {
        login(response.data, token);

        setTimeout(() => {
          window.location.href =
            formData.role === "employer" ? "/employer-dashboard" : "/find-jobs";
        }, 2000);
      }
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        errors: {
          submit:
            error.response?.data?.message ||
            "Registration failed. Please, enter valid credentials.",
        },
      }));
    }
  };

  if (formState.success) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center  bg-gradient-to-br ${
          darkMode
            ? "from-blue-900 via-black to-purple-950"
            : "from-blue-100 via-white to-purple-200"
        } px-4`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`${
            darkMode
              ? "bg-gray-900 shadow-[0_4px_12px_rgba(255,255,255,0.3)]"
              : "bg-white shadow-lg"
          } p-8 rounded-xl w-full max-w-md text-center`}
        >
          <CheckCircle
            className={`w-16 h-16 ${
              darkMode ? "text-green-600" : "text-green-500"
            } mx-auto mb-4`}
          ></CheckCircle>
          <h2
            className={`text-2xl font-bold ${
              darkMode ? "text-gray-300" : "text-gray-900"
            } mb-2`}
          >
            Account Created!
          </h2>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>
            Welcome to JobiFy! Your account has been successfully created.
          </p>
          <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto" />
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            } mt-2`}
          >
            Redirecting to your dashboard ...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${
        darkMode
          ? "from-blue-900 via-black to-purple-950"
          : "from-blue-100 via-white to-purple-200"
      } px-2 sm:px-4 py-[100px]`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`${
          darkMode
            ? "bg-gray-900 shadow-[0_4px_12px_rgba(255,255,255,0.3)]"
            : "bg-white shadow-lg"
        } p-5 sm:p-8 rounded-xl w-full max-w-md`}
      >
        <div className="text-center mb-8">
          <h2
            className={`text-2xl font-bold ${
              darkMode ? "text-gray-300" : "text-gray-900"
            } mb-2`}
          >
            Create an Account
          </h2>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Create a JobFnder account and Join thousands of professionals
            finding their Dream jobs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputType
            label="Full Name"
            type="text"
            name="fullName"
            icon={User}
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleInputChange}
            error={formState.errors.fullName}
            required={true}
          />

          <InputType
            label="Email Address"
            type="email"
            name="email"
            icon={Mail}
            placeholder="Enter your password"
            value={formData.email}
            onChange={handleInputChange}
            error={formState.errors.email}
            required={true}
          />

          <InputType
            label="Password"
            type="password"
            name="password"
            icon={Lock}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            error={formState.errors.password}
            required={true}
          />

          {/* avatar Upload */}
          <div className="">
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              } mb-2`}
            >
              Profile Picture (Optional)
            </label>
            <div className="flex items-center space-x-4">
              <div
                className={`w-16 h-16 rounded-full ${
                  darkMode ? "bg-gray-800" : "bg-gray-100"
                } flex items-center justify-center overflow-hidden`}
              >
                {formState.avatarPreview ? (
                  <img
                    src={formState.avatarPreview}
                    alt="Avatar Preview"
                    className="w-full h-full object-cover"
                  ></img>
                ) : (
                  <User
                    className={`w-8 h-8 ${
                      darkMode ? "text-gray-300" : "text-gray-400"
                    }`}
                  ></User>
                )}
              </div>

              <div className="flex-1">
                <input
                  type="file"
                  id="avatar"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <label
                  htmlFor="avatar"
                  className={`cursor-pointer border ${
                    darkMode
                      ? "border-gray-600 bg-gray-800 text-gray-400 hover:bg-gray-700"
                      : "border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
                  } rounded-lg px-4 py-2 text-sm font-medium transition-colors flex items-center space-x-2`}
                >
                  <Upload className="w-4 h-4"></Upload>
                  <span className="">Upload Photo</span>
                </label>
                <p
                  className={`text-xs mt-1 ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  JPG, JPEG, PNG up to 5MB
                </p>
              </div>
            </div>
            {formState.errors.avatar && (
              <p
                className={`${
                  darkMode ? "text-red-400" : "text-red-500"
                } text-sm mt-1 flex items-center`}
              >
                <AlertCircle className="w-4 h-4 mr-1"></AlertCircle>
                {formState.errors.avatar}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              } mb-2`}
            >
              I am a{" "}
              <span
                className={`${darkMode ? "text-red-400" : "text-red-500"} ml-1`}
              >
                *
              </span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleRoleChange("jobseeker")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.role === "jobseeker"
                    ? `${
                        darkMode
                          ? "border-blue-700 bg-blue-100"
                          : "border-blue-500 bg-blue-50"
                      } text-blue-700`
                    : `${
                        darkMode
                          ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                          : "border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`
                }`}
              >
                <UserCheck
                  className={`w-8 h-8 mx-auto mb-2 ${
                    formData.role === "jobseeker"
                      ? "text-blue-700"
                      : darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                />
                <div className="font-medium">Job Seeker</div>
                <div
                  className={`text-xs ${
                    formData.role === "jobseeker"
                      ? "text-blue-700"
                      : darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  Looking for Opportunities
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange("employer")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.role === "employer"
                    ? `${
                        darkMode
                          ? "border-purple-700 bg-purple-100"
                          : "border-purple-500 bg-purple-50"
                      } text-purple-700`
                    : `${
                        darkMode
                          ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                          : "border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`
                }`}
              >
                <Building2
                  className={`w-8 h-8 mx-auto mb-2 ${
                    formData.role === "employer"
                      ? "text-purple-700"
                      : darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                />
                <div className="font-medium">Employer</div>
                <div
                  className={`text-xs ${
                    formData.role === "employer"
                      ? "text-purple-700"
                      : darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  Hiring Talents
                </div>
              </button>
            </div>

            {formState.errors.role && (
              <p
                className={`${
                  darkMode ? "text-red-400" : "text-red-500"
                } text-sm mt-1 flex items-center`}
              >
                <AlertCircle className="w-4 h-4 mr-1"></AlertCircle>
                {formState.errors.role}
              </p>
            )}
          </div>

          <AuthCommonConponent
            darkMode={darkMode}
            formState={formState}
            message={formState.errors.submit}
            submitLabel="Create Account"
            loadingLabel="Creating Account ..."
            dividerLabel="or Create with"
            bottomText="Already have an account?"
            bottomLinkText="Sign In"
            bottomLinkHref="/login"
            showTerms={true}
          />
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;