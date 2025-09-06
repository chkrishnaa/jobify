import { useState } from "react";
import OtpVerification from "./OtpVerification";
import ChangePassword from "./ChangePassword";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1 = OTP, 2 = Change Password
  const [email, setEmail] = useState("");

  const handleOtpSuccess = (verifiedEmail) => {
    setEmail(verifiedEmail);
    setStep(2);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {step === 1 && <OtpVerification onSuccess={handleOtpSuccess} />}
      {step === 2 && <ChangePassword email={email} />}
    </div>
  );
};

export default ForgotPassword;
