import { Loader, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const AuthCommonConponent = ({
  darkMode,
  formState,
  submitLabel,
  message,
  loadingLabel,
  dividerLabel,
  bottomText,
  bottomLinkText,
  bottomLinkHref,
  showTerms = false,
}) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Error Message */}
      {(message || formState.errors?.submit) && (
        <>
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
              {message || formState.errors?.submit}
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

      {/* Forgot Password */}

      {/* Submit Button */}
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
            <Loader className="w-5 h-5 animate-spin" />
            <span>{loadingLabel}</span>
          </>
        ) : (
          <span>{submitLabel}</span>
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center space-x-3">
        <div
          className={`flex-1 h-px ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}
        ></div>
        <span
          className={`${
            darkMode ? "text-gray-400" : "text-gray-600"
          } text-sm whitespace-nowrap`}
        >
          {dividerLabel}
        </span>
        <div
          className={`flex-1 h-px ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}
        ></div>
      </div>

      {/* Social Login */}
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
            darkMode ? "hover:bg-purple-300" : "bg-white hover:bg-purple-200"
          } w-full h-full rounded-lg py-2 transition-all duration-300 space-x-2 sm:space-x-5`}
        >
          <i className="fa-brands fa-facebook-f text-purple-600"></i>
          <span className="font-semibold text-purple-600 ">Facebook</span>
        </button>
      </div>

      {/* Terms Checkbox (only in signup) */}
      {showTerms && (
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
      )}

      {/* Bottom Link */}
      <div className="text-center font-semibold">
        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          {bottomText}{" "}
          <a
            href={bottomLinkHref}
            className={`text-blue-600 ${
              darkMode ? "hover:text-blue-500" : "hover:text-blue-700"
            } font-medium`}
          >
            {bottomLinkText}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthCommonConponent;
