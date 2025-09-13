import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,

  CheckCircle,
} from "lucide-react";
import {Link} from "react-router-dom"

import { validateEmail } from "../../utils/helper";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useTheme } from "../../context/ThemeContext";
import InputType from "../../components/Input/InputType";
import AuthCommonConponent from "../../components/Input/AuthCommonComponent";

const Login = () => {
  const { login } = useAuth();
  const { darkMode } = useTheme();
  
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
             Welcome Back!
           </h2>
           <p
             className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-4`}
           >
             You have been successfully logged in.
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
      } px-2 sm:px-4`}
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
            Welcome back
          </h2>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Sign in to your JobiFy account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Address */}

          <InputType
            label="Email Address"
            type="email"
            name="email"
            icon={Mail}
            placeholder="Enter your password"
            value={formData.email}
            onChange={handleInputChange}
            error={formState.errors.email}
          />

          {/* Password */}
          <InputType
            label="Password"
            type="password"
            name="password"
            icon={Lock}
            placeholder="Enter your email"
            value={formData.password}
            onChange={handleInputChange}
            error={formState.errors.password}
          />

          <AuthCommonConponent
            darkMode={darkMode}
            formState={formState}
            message={formState.errors.submit}
            submitLabel="Sign In"
            loadingLabel="Signing In ..."
            dividerLabel="or Sign In with"
            bottomText="Don't have an account?"
            bottomLinkText="Create an account"
            bottomLinkHref="/signup"
            showTerms={false}
          />
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
