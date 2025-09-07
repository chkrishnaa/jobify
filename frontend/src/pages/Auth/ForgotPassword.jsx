import { useState } from "react";
import OtpVerification from "./OtpVerification";
import ChangePassword from "./ChangePassword";
import { useTheme } from "../../context/ThemeContext";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1 = OTP, 2 = Change Password
  const [email, setEmail] = useState("");
  const { darkMode } = useTheme();


  const handleOtpSuccess = (verifiedEmail) => {
    setEmail(verifiedEmail);
    setStep(2);
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}
    >
      {step === 1 && <OtpVerification onSuccess={handleOtpSuccess} />}
      {step === 2 && <ChangePassword email={email} />}
    </div>
  );
};

export default ForgotPassword;
