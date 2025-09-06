import { useState } from "react";
import { motion } from "framer-motion";

const privacyData = [
  {
    title: "Information We Collect",
    description: `We collect personal information including name, email, phone number, and account credentials when you use our services. 
      Usage data such as IP address, device type, browser, and activity logs is also collected to improve your experience. 
      Cookies and tracking technologies help us understand user behavior and optimize our platform. 
      All data collection follows applicable legal and regulatory guidelines. 
      Sensitive information is handled with additional security. 
      Users are informed of the data collected at the point of registration or interaction. 
      We maintain transparency and aim to protect user privacy at all times.`,
  },
  {
    title: "How We Use Your Information",
    description: `Collected data is used to provide and maintain our services, communicate updates, and personalize your experience. 
      Information helps us analyze trends, prevent fraud, and ensure security on our platform. 
      We do not sell personal information to third parties. 
      Data may be shared with trusted service providers solely to operate and enhance the platform. 
      Legal obligations may require us to disclose information in certain situations. 
      Users have the right to manage their preferences and opt-out of marketing communications. 
      We prioritize responsible and ethical use of collected data.`,
  },
  {
    title: "Data Security & User Rights",
    description: `We implement reasonable security measures to protect personal information from unauthorized access or disclosure. 
      However, no system is completely secure, and users should take precautions when sharing sensitive data. 
      Users can request access to their data, correct inaccuracies, or request deletion at any time. 
      Children under 13 are not permitted to use the platform, and we do not knowingly collect data from minors. 
      Links to third-party websites are provided for convenience, and we are not responsible for their privacy practices. 
      Updates to this privacy policy will be posted with a revised effective date. 
      We encourage users to review our policies regularly to stay informed.`,
  },
];

const PrivacyPolicy = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>
        <p className="text-center text-gray-600 mb-10">
          Effective Date: [Insert Date] | Your privacy is important to us
        </p>

        <div className="grid gap-4">
          {privacyData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <h2 className="text-xl font-semibold mb-2 flex justify-between items-center">
                {item.title}
                <span>{activeIndex === index ? "-" : "+"}</span>
              </h2>
              {activeIndex === index && (
                <p className="text-gray-700 mt-2">{item.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
