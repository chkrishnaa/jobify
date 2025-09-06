import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

const ChangePassword = ({ email }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [formState, setFormState] = useState({
    showPassword: false,
    errors: {
      password: "",
      confirm: "",
    },
  });

  const changePassword = async (e) => {
    e.preventDefault();

    // Reset errors
    setFormState((prev) => ({
      ...prev,
      errors: { password: "", confirm: "" },
    }));

    // Validation
    let hasError = false;
    const errors = { password: "", confirm: "" };

    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      hasError = true;
    }

    if (password !== confirm) {
      errors.confirm = "Passwords do not match";
      hasError = true;
    }

    if (hasError) {
      setFormState((prev) => ({ ...prev, errors }));
      return;
    }

    // TEMP: Simulate success (for UI testing)
    toast.success("Password changed successfully!");

    // Uncomment for actual API call
    /*
    try {
      await axios.post("/api/auth/change-password", { email, password });
      toast.success("Password changed successfully!");
    } catch (err) {
      toast.error("Failed to change password");
    }
    */
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Change Password
          </h2>
          <p className="text-gray-600">
            Create a new password for your account
          </p>
        </div>

        <form className="space-y-4" onSubmit={changePassword}>
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={formState.showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                  formState.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder="Enter new password"
              />
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
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {formState.errors.password && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {formState.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={formState.showPassword ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                  formState.errors.confirm
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder="Confirm password"
              />
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
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {formState.errors.confirm && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {formState.errors.confirm}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Change Password
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ChangePassword;
