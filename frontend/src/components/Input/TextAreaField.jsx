import React from "react";
import { AlertCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const TextAreaField = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  rows = 10,
  ...props
}) => {
  const { darkMode } = useTheme();

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className={`block text-sm font-medium ${
          darkMode ? "text-gray-200" : "text-gray-700"
        }`}
      >
        {label}
        {required && (
          <span
            className={`${darkMode ? "text-red-400" : "text-red-500"} ml-1`}
          >
            *
          </span>
        )}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className={`w-full px-3 py-2.5 rounded-lg text-base transition-colors duration-200 resize-none focus:outline-none focus:ring-2 focus:ring-opacity-20
  ${
    darkMode
      ? `bg-gray-900 text-gray-200 border ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-gray-700 focus:border-purple-600"
        } placeholder-gray-500 disabled:bg-gray-800 disabled:text-gray-500`
      : `bg-white text-gray-900 border ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-purple-500"
        } placeholder-gray-400 disabled:bg-gray-50 disabled:text-gray-500`
  }`}
        style={{ minHeight: "150px" }}
        {...props}
      />
      {error && (
        <div
          className={`flex items-center space-x-1 text-sm ${
            darkMode ? "text-red-400" : "text-red-600"
          }`}
        >
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
      {helperText && !error && (
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default TextAreaField;
