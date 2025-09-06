import { useState } from "react";
import { motion } from "framer-motion";

const privacySections = [
  {
    title: "Information We Collect",
    content: `We collect personal information such as your name, email, phone number, and account credentials when you register or interact with our services. 
Usage data like IP address, browser type, device information, and activity logs are collected automatically to enhance user experience. 
Cookies, analytics tools, and similar technologies may be used to personalize your experience and analyze trends. 
We also collect event-specific data when you participate in contests, webinars, surveys, or feedback forms. 
All data collection follows applicable legal and regulatory guidelines. 
Sensitive information is handled securely and only used for intended purposes. 
Transparency in data collection is a priority to build trust with our users.`,
  },
  {
    title: "How We Use Your Information",
    content: `Collected information is used to provide, maintain, and improve our services. 
We communicate updates, special offers, or support information based on your preferences. 
Data helps us analyze trends, prevent fraudulent activity, and enhance platform security. 
Event-specific data allows us to manage contests, webinars, and other interactive features efficiently. 
Personalization ensures a smoother and more relevant user experience. 
We never use your information for unauthorized purposes. 
Your data helps us continuously improve and innovate responsibly.`,
  },
  {
    title: "Information Sharing",
    content: `We do not sell your personal information under any circumstances. 
Information may be shared with trusted third-party service providers to operate, maintain, or enhance our platform. 
Legal obligations may require disclosure in compliance with applicable laws or regulations. 
In case of mergers, acquisitions, or business transfers, your data may be transferred securely to the successor entity. 
We ensure that all third parties follow strict privacy and security guidelines. 
Event-specific data shared for interactive activities is anonymized wherever possible. 
Your privacy remains protected even when information is shared for operational purposes.`,
  },
  {
    title: "Cookies and Tracking",
    content: `Cookies are used for website functionality, analytics, advertising, and to improve user experience. 
Analytics tools help us understand user behavior and optimize our platform. 
Advertising cookies may show relevant content and offers. 
You can manage or disable cookies through your browser settings at any time. 
Event participation tracking may involve temporary cookies to provide seamless access. 
Disabling cookies may affect certain features, but essential services remain accessible. 
We prioritize transparency about all tracking technologies.`,
  },
  {
    title: "Data Retention",
    content: `We retain personal information only as long as necessary to provide services or comply with legal obligations. 
You can request deletion of your data at any time by contacting our support team. 
Data related to completed events or transactions may be retained for recordkeeping purposes. 
Inactive or outdated data is securely deleted or anonymized periodically. 
We implement retention policies that align with privacy laws and best practices. 
Event-specific information is removed once the purpose has been fulfilled. 
Users have full control over their personal data lifecycle on our platform.`,
  },
  {
    title: "Security",
    content: `We implement reasonable technical and organizational measures to protect your data against unauthorized access, disclosure, or misuse. 
However, no method of transmission or storage is 100% secure. 
We regularly review and improve security practices to mitigate risks. 
Event-specific data is also secured using industry-standard protocols. 
Users are advised to maintain strong passwords and protect their account credentials. 
Data breaches, if any, will be reported in compliance with applicable laws. 
We prioritize safeguarding all collected information to maintain trust and reliability.`,
  },
  {
    title: "Your Rights",
    content: `Depending on your jurisdiction, you may have the right to access, update, or request deletion of your personal data. 
You may opt-out of marketing communications at any time. 
You can correct inaccurate information and request copies of the data we hold about you. 
Event participants may request their event-specific data to be deleted or anonymized. 
We strive to honor all data rights requests promptly and transparently. 
Users are encouraged to review their data settings regularly. 
These rights ensure control over personal information shared with our platform.`,
  },
  {
    title: "Third-Party Services",
    content: `Our platform may contain links to third-party websites, applications, or services. 
We are not responsible for their privacy practices or content. 
Personal information shared with third-party services is subject to their privacy policies. 
Event organizers using third-party tools must comply with applicable privacy laws. 
We recommend reviewing third-party privacy statements before interaction. 
Third-party integrations enhance functionality but do not compromise your privacy. 
User awareness ensures safe use of connected services.`,
  },
  {
    title: "Children’s Privacy",
    content: `Our services are not intended for children under 13 (or the age of majority in your jurisdiction). 
We do not knowingly collect personal information from children. 
Parents or guardians should monitor their children’s online activity. 
Event participation by minors is restricted or requires parental consent. 
If we discover that information from a child has been collected inadvertently, it will be deleted promptly. 
Children’s privacy protection is a top priority. 
Compliance with relevant laws like COPPA is maintained at all times.`,
  },
  {
    title: "Changes to Privacy Policy",
    content: `We may update this Privacy Policy occasionally to reflect changes in services, practices, or legal requirements. 
Updates will be posted with a revised effective date. 
Significant changes may be communicated via email or platform notifications. 
Users are encouraged to review the policy periodically to stay informed. 
Event-related changes will also be highlighted separately. 
Your continued use of our services constitutes acceptance of the updated Privacy Policy. 
Transparency and communication are central to our privacy approach.`,
  },
  {
    title: "Contact Us",
    content: `For any questions regarding our Privacy Policy or Terms of Service, please contact us at: 
Email: [support@yourcompany.com] 
Address: [Your Company Address] 
We aim to respond promptly to all inquiries. 
Feedback about privacy practices is always welcome. 
Event organizers and participants may also reach out regarding event-specific data handling. 
Your concerns are addressed with care and attention. 
We value your trust and strive to maintain the highest standards of privacy.`,
  },
];

const PrivacyPolicy = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
        <p className="text-center text-gray-600 mb-12">
          Effective Date: [Insert Date] | [Your Company/App Name] respects your
          privacy.
        </p>

        {/* Grid Layout for first 3 sections */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {privacySections.slice(0, 3).map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <p className="text-gray-700">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Accordion for remaining sections */}
        <div className="space-y-4">
          {privacySections.slice(3).map((section, idx) => {
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
                  <p className="text-gray-700 mt-2">{section.content}</p>
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
            {privacySections.slice(9).map((section, idx) => (
              <motion.div
                key={idx}
                className="min-w-[300px] bg-white p-6 rounded-lg shadow-md flex-shrink-0 snap-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                <p className="text-gray-700">{section.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
