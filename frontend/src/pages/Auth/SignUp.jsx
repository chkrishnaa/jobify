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
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-950" : "bg-gray-50"
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
            Welcome to JobFinder! Your account has been successfully created.
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
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-950" : "bg-gray-50"
      } px-4 py-[100px]`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`${
          darkMode
            ? "bg-gray-900 shadow-[0_4px_12px_rgba(255,255,255,0.3)]"
            : "bg-white shadow-lg"
        } p-8 rounded-xl w-full max-w-md`}
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
          <div className="">
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              } mb-2`}
            >
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></User>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border appearance-none 
  ${
    formState.errors.fullName
      ? darkMode
        ? "border-red-400 bg-gray-800 text-gray-300 placeholder-gray-500"
        : "border-red-500 bg-white text-gray-900 placeholder-gray-400"
      : darkMode
      ? "border-gray-600 bg-gray-800 text-gray-300 placeholder-gray-500"
      : "border-gray-300 bg-white text-gray-900 placeholder-gray-400"
  }
  focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder="Enter your full name"
              ></input>
            </div>

            {formState.errors.fullName && (
              <p
                className={`${
                  darkMode ? "text-red-400" : "text-red-500"
                } text-sm mt-1 flex items-center`}
              >
                <AlertCircle className="w-4 h-4 mr-1"></AlertCircle>
                {formState.errors.fullName}
              </p>
            )}
          </div>

          <div className="">
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              } mb-2`}
            >
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></Mail>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border appearance-none 
  ${
    formState.errors.email
      ? darkMode
        ? "border-red-400 bg-gray-800 text-gray-300 placeholder-gray-500"
        : "border-red-500 bg-white text-gray-900 placeholder-gray-400"
      : darkMode
      ? "border-gray-600 bg-gray-800 text-gray-300 placeholder-gray-500"
      : "border-gray-300 bg-white text-gray-900 placeholder-gray-400"
  }
  focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder="Enter your email"
              ></input>
            </div>

            {formState.errors.email && (
              <p
                className={`${
                  darkMode ? "text-red-400" : "text-red-500"
                } text-sm mt-1 flex items-center`}
              >
                <AlertCircle className="w-4 h-4 mr-1"></AlertCircle>
                {formState.errors.email}
              </p>
            )}
          </div>

          <div className="">
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              } mb-2`}
            >
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></Lock>
              <input
                type={formState.showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border appearance-none 
  ${
    formState.errors.password
      ? darkMode
        ? "border-red-400 bg-gray-800 text-gray-300 placeholder-gray-500"
        : "border-red-500 bg-white text-gray-900 placeholder-gray-400"
      : darkMode
      ? "border-gray-600 bg-gray-800 text-gray-300 placeholder-gray-500"
      : "border-gray-300 bg-white text-gray-900 placeholder-gray-400"
  }
  focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder="Enter your password"
              ></input>

              <button
                type="button"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {formState.showPassword ? (
                  <EyeOff className="h-5 w-5"></EyeOff>
                ) : (
                  <Eye className="h-5 w-5"></Eye>
                )}
              </button>
            </div>

            {formState.errors.password && (
              <p
                className={`${
                  darkMode ? "text-red-400" : "text-red-500"
                } text-sm mt-1 flex items-center`}
              >
                <AlertCircle className="h-4 w-4 mr-1"></AlertCircle>{" "}
                {formState.errors.password}
              </p>
            )}
          </div>

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
              I am a *
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

          {formState.errors.submit && (
            <div
              className={`${
                darkMode
                  ? "border border-red-500 bg-red-100"
                  : "border border-red-200 bg-red-50"
              } rounded-lg p-3`}
            >
              <p
                className={`${
                  darkMode ? "text-red-400" : "text-red-500"
                } text-sm flex items-center`}
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                {formState.errors.submit}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={formState.loading}
            className={`w-full bg-gradient-to-r ${
              darkMode
                ? "from-blue-700 to-purple-700 text-gray-300 hover:from-blue-800 hover:to-purple-800"
                : "from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
            } py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
          >
            {formState.loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin"></Loader>
                <span>Creating Account ...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>

          <div className="flex items-center space-x-3">
            <div
              className={`flex-1 h-px ${
                darkMode ? "bg-gray-600" : "bg-gray-300"
              }`}
            ></div>
            <span
              className={`${
                darkMode ? "text-gray-400" : "text-gray-600"
              } text-sm whitespace-nowrap`}
            >
              or Create with
            </span>
            <div
              className={`flex-1 h-px ${
                darkMode ? "bg-gray-600" : "bg-gray-300"
              }`}
            ></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              className={`border-2 border-blue-600 ${
                darkMode ? "hover:bg-blue-300" : "bg-white hover:bg-blue-200"
              } w-full h-full rounded-lg py-2 transition-all duration-300 space-x-2 sm:space-x-5`}
            >
              <i className="fa-brands fa-google text-blue-600"></i>
              <span className="font-semibold text-blue-600">Google</span>
            </button>

            <button
              className={`border-2 border-purple-600 ${
                darkMode
                  ? "hover:bg-purple-300"
                  : "bg-white hover:bg-purple-200"
              } w-full h-full rounded-lg py-2 transition-all duration-300 space-x-2 sm:space-x-5`}
            >
              <i className="fa-brands fa-facebook-f text-purple-600"></i>{" "}
              <span className="font-semibold text-purple-600 ">Facebook</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded-full border border-gray-400 bg-transparent 
             checked:bg-blue-500 checked:border-blue-500 
             focus:ring-2 focus:ring-blue-400 transition-colors"
            />
            <span
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              } font-semibold`}
            >
              I agree to the{" "}
              <Link
                to="/terms-of-service"
                className="text-blue-600 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy-policy"
                className="text-purple-600 hover:underline"
              >
                Privacy Policy
              </Link>
            </span>
          </div>

          <div className="text-center font-semibold">
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Already have an account?{" "}
              <a
                href="/login"
                className={`text-blue-600 ${
                  darkMode ? "hover:text-blue-500" : "hover:text-blue-700"
                } font-medium`}
              >
                Sign In
              </a>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;
