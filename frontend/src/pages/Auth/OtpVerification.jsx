import { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { AlertCircle, Mail } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const OtpVerification = ({ onSuccess }) => {
    const { darkMode } = useTheme();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill("")); // 6-digit OTP
  const [sent, setSent] = useState(false);

  const inputRefs = useRef([]);

  // Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/send-otp", { email });
      toast.success("OTP sent to your email!");
      setSent(true);
    } catch (err) {
      toast.error("Failed to send OTP");
    }
  };

  // Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();

    // Combine OTP
    const otpValue = otp.join("");

    // TEMP: Always succeed to test Change Password UI
    toast.success("OTP verified!");
    onSuccess(email);
    // try {
    //   await axios.post("/api/auth/verify-otp", { email, otp: otpValue });
    //   toast.success("OTP verified!");
    //   onSuccess(email);
    // } catch (err) {
    //   toast.error("Invalid OTP");
    // }
  };

  // Handle OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input
    if (value && index < 5) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) nextInput.focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasteData)) {
      setOtp(pasteData.split(""));
      inputRefs.current[5].focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
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
            {!sent ? "Forgot Password" : "Verify OTP"}
          </h2>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>
            {!sent
              ? "Enter your email to receive OTP."
              : "Enter your OTP for verification"}
          </p>
        </div>

        {sent ? (
          <form className="space-y-4" onSubmit={sendOtp}>
            <div>
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } mb-2`}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-700 placeholder-gray-500"
                      : "border-gray-300 placeholder-gray-400"
                  } focus:ring-blue-500 focus:border-transparent transition-colors`}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className={`w-full bg-gradient-to-r ${
                darkMode
                  ? "from-blue-700 to-purple-700 text-gray-300 hover:from-blue-800 hover:to-purple-800"
                  : "from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              } py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={verifyOtp}>
            <div>
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } mb-2`}
              >
                Enter OTP
              </label>
              <div className="flex justify-between gap-1 sm:gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className={`w-9 h-9 sm:w-12 sm:h-12 text-center text-lg font-semibold rounded-md sm:rounded-lg border focus:ring-blue-600 focus:border-transparent transition-colors
                      ${
                        digit
                          ? `${
                              darkMode ? "border-gray-200" : "border-gray-200"
                            }`
                          : `${
                              darkMode
                                ? "bg-gray-800 border-gray-600"
                                : "bg-gray-100 border-gray-300"
                            }`
                      }
                      ${
                        index > 0 && otp[index - 1] === ""
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              className={`w-full bg-gradient-to-r ${
                darkMode
                  ? "from-blue-700 to-purple-700 text-gray-300 hover:from-blue-800 hover:to-purple-800"
                  : "from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              } py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
            >
              Verify OTP
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default OtpVerification;
