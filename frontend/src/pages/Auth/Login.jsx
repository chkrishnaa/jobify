import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {Link} from "react-router-dom"

import { validateEmail } from "../../utils/helper";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Login = () => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    showPassword: false,
    success: false,
  });

  const validatePassword = (password) => {
    if (!password.trim()) {
      return "Password is required";
    }
    return "";
  };

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

  const validateForm = () => {
    const errors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
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
      //Login API integration
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      setFormState((prev) => ({
        ...prev,
        loading: false,
        success: true,
        errors: {},
      }));

      const { token, role } = response.data;

      if (token) {
        login(response.data, token);

        setTimeout(() => {
          window.location.href =
            role === "employer" ? "/employer-dashboard" : "/find-jobs";
        }, 2000);
      }
      //Redirect based on user role

      setTimeout(() => {
        const redirectPath =
          user.role === "employer" ? "/employer-dashboard" : "/find-jobs";
        window.location.href = redirectPath;
      }, 1500);
      
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        errors: {
          submit:
            error.response?.data?.message ||
            "Login failed. Please, check your credentials.",
        },
      }));
    }
  };

  if (formState.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4"></CheckCircle>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-600 mb-4">
            You have been successfully logged in.
          </p>
          <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto" />
          <p className="text-sm text-gray-500 mt-2">
            Redirecting to your dashboard ...
          </p>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-garay-900 mb-2">
            Welcome back
          </h2>
          <p className="text-gray-600">Sign in to your JobFinder account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Address */}
          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></Mail>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  formState.errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder="Enter your email"
              ></input>
            </div>

            {formState.errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1"></AlertCircle>
                {formState.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></Lock>
              <input
                type={formState.showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  formState.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-blue-500 focus:border-transparent transition-colors`}
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
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1"></AlertCircle>{" "}
                {formState.errors.password}
              </p>
            )}
          </div>

          {formState.errors.submit && (
            <>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {formState.errors.submit}
                </p>
              </div>

              <div className="flex justify-end mt-1">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline font-semibold"
                >
                  Forgot Password?
                </Link>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={formState.loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {formState.loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin"></Loader>
                <span>Signing In ...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>

          <div className="flex items-center space-x-3">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-600 whitespace-nowrap">
              or Sign In with
            </span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white text-gray-600 w-full h-full rounded-lg py-2 hover:bg-blue-200 hover:text-gray-800 transition-all duration-300 space-x-5 border-2 border-blue-600">
              <i className="fa-brands fa-google text-blue-600"></i>
              <span className="font-semibold text-blue-600">Google</span>
            </button>

            <button className="bg-white text-gray-600 w-full h-full rounded-lg py-2 hover:bg-purple-200 hover:text-gray-800 transition-all duration-300 space-x-5 border-2 border-purple-600">
              <i className="fa-brands fa-facebook-f text-purple-600 hover:text-blue-700 duration-300 transition-colors"></i>{" "}
              <span className="font-semibold text-purple-600 hover:text-purple-700 duration-300 transition-colors">
                Facebook
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4" />
            <span className="text-sm text-gray-600 font-semibold">
              I agree to the{" "}
              <Link to="/terms-of-service" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy-policy" className="text-purple-600 hover:underline">
                Privacy Policy
              </Link>
            </span>
          </div>

          <div className="text-center font-semibold">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create an account
              </a>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
