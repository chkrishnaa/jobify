import React, { useState, useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { toast } from "react-hot-toast";

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
  maxWords = 500,
  ...props
}) => {
  const { darkMode } = useTheme();
  const [wordCount, setWordCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (value) {
      const words = value.trim().split(/\s+/).filter(Boolean);
      setWordCount(words.length);
    } else {
      setWordCount(0);
    }
  }, [value]);

  const handleInputChange = (e) => {
    const words = e.target.value.trim().split(/\s+/).filter(Boolean);

    if (words.length <= maxWords) {
      onChange(e);
    } else {
      toast.error("You have reached the maximum word limit.");
      setShowPopup(true); // show modal instead of alert
    }
  };

  return (
    <>
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
          onChange={handleInputChange}
          disabled={disabled}
          rows={rows}
          className={`w-full px-3 py-2.5 rounded-lg text-sm sm:text-base transition-colors duration-200 resize-none focus:outline-none focus:ring-2 focus:ring-opacity-20
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
        <div className="flex justify-between items-center">
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
          <p
            className={`text-xs ${
              wordCount >= maxWords
                ? darkMode
                  ? "text-red-400"
                  : "text-red-500"
                : darkMode
                ? "text-gray-400"
                : "text-gray-500"
            } ml-auto`}
          >
            {wordCount} / {maxWords} words
          </p>
        </div>
        {helperText && !error && (
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {helperText}
          </p>
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowPopup(false)}
          ></div>

          {/* Modal box */}
          <div
            className={`relative z-10 rounded-xl shadow-lg p-4 w-[90%] max-w-sm  ${
              darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
            }`}
          >
            <button
              onClick={() => setShowPopup(false)}
              className={`absolute top-3 right-3 rounded-xl text-gray-400 hover:text-white ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-300"
              } p-2`}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <AlertCircle
                className={`w-4 h-4 ${
                  darkMode ? "text-red-400" : "text-red-500"
                }`}
              />
              <h2 className="text-base font-semibold">Word Limit Reached</h2>
            </div>
            <p className="mt-2 text-sm">
              You can only enter up to <b>{maxWords}</b> words in this field.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className={`px-3 py-1 rounded-lg ${
                  darkMode
                    ? "bg-purple-700 text-gray-300 hover:bg-purple-800"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                } transition`}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TextAreaField;
