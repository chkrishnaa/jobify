import { AlertCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const InputField = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  icon: Icon,
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
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full ${
            Icon ? "pl-10" : "pl-3"
          } pr-3 py-2.5 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-20
        ${
          darkMode
            ? `bg-gray-900 text-gray-200 border ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:border-purple-600"
              } disabled:bg-gray-800 disabled:text-gray-500`
            : `bg-white text-gray-900 border ${
                error
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-purple-500"
              } disabled:bg-gray-50 disabled:text-gray-500`
        }`}
          {...props}
        />
      </div>
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

export default InputField;
