import { AlertCircle, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const InputType = ({ ...props }) => {
  const { darkMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  // If input type is password, toggle between text/password
  const inputType =
    props.type === "password" && showPassword ? "text" : props.type;

  return (
    <div className="">
      <label
        className={`block text-sm font-medium ${
          darkMode ? "text-gray-200" : "text-gray-700"
        } mb-2`}
      >
        {props.label}
        {props.required && (
          <span
            className={`${darkMode ? "text-red-400" : "text-red-500"} ml-1`}
          >
            *
          </span>
        )}
      </label>
      <div className="relative">
        {/* Left icon */}
        <props.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

        {/* Input field */}
        <input
          type={inputType}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          className={`w-full pl-10 pr-10 py-3 rounded-lg border appearance-none text-sm sm:text-base
            ${
              props.error
                ? darkMode
                  ? "border-red-400 bg-gray-800 text-gray-300 placeholder-gray-500"
                  : "border-red-500 bg-white text-gray-900 placeholder-gray-400"
                : darkMode
                ? "border-gray-600 bg-gray-800 text-gray-300 placeholder-gray-500"
                : "border-gray-300 bg-white text-gray-900 placeholder-gray-400"
            }
            focus:ring-blue-500 focus:border-transparent transition-colors`}
          placeholder={props.placeholder}
        />

        {/* Eye toggle only for password */}
        {props.type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {/* Error message */}
      {props.error && (
        <p
          className={`${
            darkMode ? "text-red-400" : "text-red-500"
          } text-sm mt-1 flex items-center`}
        >
          <AlertCircle className="w-4 h-4 mr-1" />
          {props.error}
        </p>
      )}
    </div>
  );
};

export default InputType;
