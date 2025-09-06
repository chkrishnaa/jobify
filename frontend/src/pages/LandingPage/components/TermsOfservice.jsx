import { useState } from "react";
import { motion } from "framer-motion";

const termsSections = [
  {
    title: "Acceptance of Terms",
    content: `By using our website, mobile application, or services (“Services”), you agree to abide by these Terms of Service. 
You must comply with all applicable local, national, and international laws and use the Services responsibly. 
If you do not agree to these terms, please do not use our Services.`,
  },
  {
    title: "Eligibility",
    content: `You must be at least 13 years old (or the age of majority in your jurisdiction) to use our Services. 
By agreeing, you represent and warrant that you have the legal capacity to enter into these Terms.`,
  },
  {
    title: "Account Registration",
    content: `You may be required to create an account to access certain features. 
You are responsible for maintaining the confidentiality of your account information and password. 
Any activity under your account is your responsibility. Notify us immediately if you suspect unauthorized access.`,
  },
  {
    title: "Use of Services",
    content: `You agree not to engage in illegal, fraudulent, or abusive activities, transmit harmful software, viruses, or spam, 
impersonate any individual or entity, or violate intellectual property rights. 
We reserve the right to suspend or terminate accounts violating these rules.`,
  },
  {
    title: "Content",
    content: `User-Generated Content: Any content you post remains your responsibility. 
You grant us a worldwide license to use, display, and distribute content submitted through the Services. 
Prohibited Content: Content that is defamatory, obscene, offensive, or illegal is strictly prohibited.`,
  },
  {
    title: "Payment and Refunds",
    content: `Fees for paid services are listed on our platform. 
All payments are non-refundable unless otherwise stated. 
We reserve the right to change prices at any time with notice.`,
  },
  {
    title: "Intellectual Property",
    content: `All intellectual property on the Services (software, designs, text, graphics, logos) is owned by [Your Company] or its licensors. 
You may not copy, modify, or redistribute without permission.`,
  },
  {
    title: "Disclaimers",
    content: `Services are provided “as is” and “as available.” 
We do not guarantee uninterrupted or error-free service. 
We disclaim warranties of any kind, whether express or implied.`,
  },
  {
    title: "Limitation of Liability",
    content: `[Your Company] is not liable for indirect, incidental, or consequential damages. 
In no event shall our liability exceed the amount paid by you, if any, for the Services.`,
  },
  {
    title: "Termination",
    content: `We may suspend or terminate your account at our discretion, with or without cause. 
You may terminate your account at any time.`,
  },
  {
    title: "Governing Law",
    content: `These Terms are governed by the laws of [Your Country/State]. 
Any disputes will be resolved in the courts located in [City, State/Country].`,
  },
  {
    title: "Changes to Terms",
    content: `We may update these Terms from time to time. 
Continued use of the Services constitutes acceptance of the updated Terms. 
Notice of changes will be provided via our platform or email.`,
  },
];

const TermsOfService = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          Terms of Service (ToS)
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Effective Date: [Insert Date] | Welcome to [Your Company/App Name]!
          Please read carefully before using our services.
        </p>

        {/* Grid Layout for first 3 sections */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {termsSections.slice(0, 3).map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <p className="text-gray-700 text-justify">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Accordion for remaining sections */}
        <div className="space-y-4">
          {termsSections.slice(3).map((section, idx) => {
            const index = idx + 3;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                <h2 className="text-xl font-semibold mb-2 flex justify-between items-center">
                  {section.title}
                  <span>{activeIndex === index ? "-" : "+"}</span>
                </h2>
                {activeIndex === index && (
                  <p className="text-gray-700 mt-2 text-justify">{section.content}</p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Optional Carousel for last 2 points */}
        <div className="mt-12 relative">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Important Notices
          </h2>
          <div className="overflow-x-auto flex gap-4 snap-x snap-mandatory">
            {termsSections.slice(10).map((section, idx) => (
              <motion.div
                key={idx}
                className="min-w-[300px] bg-white p-6 rounded-lg shadow-md flex-shrink-0 snap-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                <p className="text-gray-700 text-justify">{section.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
