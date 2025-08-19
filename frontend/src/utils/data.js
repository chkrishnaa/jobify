import {
  Search,
  Users,
  FileText,
  MessageSquare,
  BarChart3,
  Shield,
  Clock,
  Award,
  Briefcase,
  Building2,
  LayoutDashboard,
  Plus,
} from "lucide-react";

export const jobSeekerFeatures = [
  {
    icon: Search,
    title: "Smart Job Matching",
    description:
      "Our intelligent algorithm analyzes your profile, skills, and experience to recommend the most relevant job opportunities, saving you time and effort in your job search.",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description:
      "Effortlessly create a professional and polished resume using our intuitive builder. Choose from a variety of templates and customize it to highlight your strengths, making a strong first impression on potential employers.",
  },
  {
    icon: MessageSquare,
    title: "Direct Communication",
    description:
      "Seamlessly connect and communicate with employers and recruiters through our built-in messaging system. Ask questions, schedule interviews, and negotiate offers all in one place, streamlining the hiring process.",
  },
  {
    icon: Award,
    title: "Skill Assessment",
    description:
      "Demonstrate your expertise with verified skill tests and earn official badges to showcase on your profile. These badges provide tangible proof of your abilities, helping you stand out to employers and increase your chances of getting hired.",
  },
];

export const employerFeatures = [
  {
    icon: Users,
    title: "Access Top Talents",
    description:
      "Gain direct access to a diverse pool of highly skilled and qualified job seekers. Our platform helps you discover and connect with top-tier candidates who are the perfect fit for your company's needs.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Monitor and evaluate the performance of your job postings with our comprehensive analytics dashboard. Get valuable insights into candidate engagement, application rates, and other key metrics to optimize your hiring strategy.",
  },
  {
    icon: Shield,
    title: "Secure Hiring Process",
    description:
      "Conduct your recruitment with peace of mind. Our platform ensures a secure and transparent hiring environment, protecting both your company's information and the privacy of the candidates throughout the entire process.",
  },
  {
    icon: Clock,
    title: "Quick and Efficient Hiring",
    description:
      "Accelerate your hiring timeline with tools designed for efficiency. From posting jobs and screening resumes to communicating with candidates, our platform simplifies every step, allowing you to fill your open roles faster.",
  },
];

export const NAVIGATION_MENU = [
  {
    id: "employer-dashboard",
    name: "Dashboard",
    icon: LayoutDashboard
  },
  {
    id: "post-job",
    name: "Post Job",
    icon: Plus
  },
  {
    id: "manage-jobs",
    name: "Manage Jobs",
    icon: Briefcase
  },
  {
    id: "company-profile",
    name: "Company Profile",
    icon: Building2
  },
];

export const CATEGORIES = [
  {
    value: "Engineering",
    label: "Engineering"
  },
  {
    value: "Design",
    label: "Design"
  },
  {
    value: "Marketing",
    label: "Marketing"
  },
  {
    value: "Sales",
    label: "Sales"
  },
  {
    value: "IT & Software",
    label: "IT & Software"
  },
  {
    value: "Customer-service",
    label: "Customer Service"
  },
  {
    value: "Product",
    label: "Product"
  },
  {
    value: "Operations",
    label: "Operations"
  },
  {
    value: "Finance",
    label: "Finance"
  },
  {
    value: "HR",
    label: "Human Resources"
  },
  {
    value: "Other",
    label: "Other"
  },
];

export const JOB_TYPES = [
  {
    value: "Remote",
    label: "Remote",
  },
  {
    value: "Full-Time",
    label: "Full-Time",
  },
  {
    value: "Part-Time",
    label: "Part-Time",
  },
  {
    value: "Contract",
    label: "Contract",
  },
  {
    value: "Internship",
    label: "Internship",
  },
];

export const SALARY_RANGES = [
  "Less than $1000",
  "$1000 - $15,000",
  "More than $15,000",
];