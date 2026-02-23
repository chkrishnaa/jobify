# JobiFy

**JobiFy** is a full-stack job portal built with the MERN stack (MongoDB, Express, React, Node.js). It connects job seekers with employers by offering a dedicated dashboard for each role: job seekers can search and apply for jobs, save listings, and manage their profile and resume; employers can post jobs, manage applications, and view analytics. The app uses JWT-based authentication, role-based access control, and a modern React frontend with Tailwind CSS and Vite.

The platform supports rich job listings with filters (keyword, location, category, job type, salary range), application tracking with statuses (Applied, In Review, Rejected, Accepted), and saved jobs for job seekers. Employers get an analytics overview (total jobs posted, applications received, hired count), the ability to close or reopen jobs, and tools to export applicant data in CSV, TSV, JSON, and XLSX. Profile and company pages support avatars and logos via Cloudinary, and the UI includes dark mode, responsive layout, and print/PDF-friendly views for job and application details.

JobiFy is suitable for portfolios, learning full-stack development, or as a base for a custom recruitment product. It demonstrates clean separation between frontend and backend, reusable components, and secure API design with protected routes and middleware.

---

## Overview

JobiFy is a MERN-based job portal that brings job seekers and employers together in one place. Job seekers can search and filter openings, apply with their resume, save jobs, and track application status; employers can post jobs, manage applicants, update application statuses, and export data. The app uses JWT authentication and role-based access so each user sees only the right dashboards and actions. Media (avatars, logos, resumes) is handled via Cloudinary, and the React front end offers dark mode, responsive layout, and print/PDF support. Overall, JobiFy is a complete recruitment-style web app built with a modern stack and clear separation between frontend and backend.

---

## Features

### For Job Seekers
- **Find Jobs** — Browse jobs with search (keyword), filters (location, category, job type, salary range), and pagination.
- **Job Details** — View full job description, requirements, salary range, company info; apply with one click using profile resume.
- **Saved Jobs** — Save and unsave jobs; view all saved jobs in a dedicated page.
- **User Profile** — Edit name, description, skills, avatar; upload and manage resume (PDF).
- **Application Tracking** — See application status (Applied, In Review, Rejected, Accepted) on job cards and profile.
- **Print / PDF** — Print or download job listing as PDF from job detail and modal views.

### For Employers
- **Employer Dashboard** — Overview with total jobs posted, applications received, and hired count (analytics).
- **Post Job** — Create jobs with title, description, requirements, location, category, type (Remote, Full-Time, Part-Time, Internship, Contract), and salary range.
- **Manage Jobs** — List, edit, delete jobs; toggle job open/closed.
- **Applicants** — View all applicants per job; filter by status; update application status; download resume; export applicants to CSV, TSV, JSON, or XLSX.
- **Company Profile** — Edit company name, description, and logo.

### General
- **Auth** — Register (job seeker / employer), login, JWT-based sessions; forgot-password flow and OTP verification; change password.
- **Landing Page** — Hero, features (job seeker & employer), analytics section, footer; links to Terms of Service and Privacy Policy.
- **Theme** — Dark mode and light mode with persistent preference.
- **Responsive** — Mobile-friendly layout and navigation.
- **Protected Routes** — Role-based access (employer-only routes for dashboard, post job, manage jobs, applicants, company profile).

---

## Advantages

- **Dual user base** — Single app serves both job seekers and employers with clear role-based flows.
- **Modern stack** — React 19, Vite 7, Tailwind CSS 4, Express 5, Mongoose 8 for a current, maintainable codebase.
- **Rich filtering** — Search and filter jobs by keyword, location, category, type, and salary for better discovery.
- **Application pipeline** — Status workflow (Applied → In Review → Rejected/Accepted) and bulk export (CSV, TSV, JSON, XLSX) for recruiters.
- **Cloud media** — Avatars, company logos, and resumes stored via Cloudinary for scalability.
- **Security** — Passwords hashed with bcrypt; JWT auth and protect middleware on sensitive APIs.
- **UX** — Dark mode, toasts, loading states, and print/PDF support improve usability.

---

## Positive Features to Consider

- **Clear project structure** — Separate `frontend` and `backend` with organized routes, controllers, models, and components.
- **Reusable UI** — Shared input components (InputField, SelectField, TextAreaField, SalaryRangeSlider), cards, modals, and utility components (Pagination, StatusBadge, LoadingSpinner).
- **Centralized API config** — `apiPaths.js` and axios instance with interceptors for auth and error handling.
- **Context-based state** — `AuthContext` for user/session and `ThemeContext` for dark/light mode.
- **Validation** — Email and password validation helpers; file type/size checks for avatar and resume uploads.
- **Accessibility & SEO** — Semantic markup, print styles, and clear navigation support better accessibility and sharing.

---

## Tech Stack

| Layer        | Technology |
|-------------|------------|
| **Frontend** | React 19, Vite 7, React Router DOM 7 |
| **Styling**  | Tailwind CSS 4, Framer Motion, Lucide React |
| **State / API** | React Context (Auth, Theme), Axios |
| **Backend**  | Node.js, Express 5 |
| **Database** | MongoDB (Mongoose 8) |
| **Auth**     | JWT (jsonwebtoken), bcryptjs |
| **File storage** | Cloudinary (images, PDF resume) |
| **Utilities** | react-hot-toast, moment, react-to-print, xlsx, file-saver |

---

## Project Structure

```
JobiFy/
├── backend/
│   ├── config/          # db, cloudinary
│   ├── controllers/     # auth, user, job, application, savedJobs, analytics
│   ├── middlewares/     # auth (protect), upload
│   ├── models/          # User, Job, Application, SavedJobs, Analytics
│   ├── routes/          # auth, user, job, application, savedJobs, analytics
│   ├── utils/           # cloudinaryUpload
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/  # Input, Cards, Modals, Utility, layout
│   │   ├── context/     # AuthContext, ThemeContext
│   │   ├── pages/       # Auth, JobSeeker, Employer, LandingPage
│   │   ├── routes/      # ProtectedRoute
│   │   ├── utils/       # apiPaths, axiosInstance, helper, uploadImage, uploadResume, data
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config (or similar)
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- Cloudinary account (for avatars, logos, resumes)

### Backend
1. Navigate to the backend folder and install dependencies:
   ```bash
   cd backend && npm install
   ```
2. Create a `.env` file in `backend/` with:
   ```env
   MONGO_URI=<your_mongodb_connection_string>
   PORT=8000
   JWT_SECRET=<your_jwt_secret>
   CLOUDINARY_CLOUD_NAME=<your_cloud_name>
   CLOUDINARY_API_KEY=<your_api_key>
   CLOUDINARY_API_SECRET=<your_api_secret>
   CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
   Backend runs at `http://localhost:8000` (or your `PORT`).

### Frontend
1. Navigate to the frontend folder and install dependencies:
   ```bash
   cd frontend && npm install
   ```
2. Create a `.env` (or `.env.local`) in `frontend/` with:
   ```env
   VITE_API_URL=http://localhost:8000
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   Open the URL shown (e.g. `http://localhost:5173`).

### Build for production
- **Backend:** `npm start` (runs `node server.js`).
- **Frontend:** `npm run build` then serve the `dist` folder or use `npm run preview` to test the build.

---

## Environment Variables Summary

| Variable | Where | Description |
|----------|--------|-------------|
| `MONGO_URI` | backend | MongoDB connection string |
| `PORT` | backend | Server port (default 5000 in code; 8000 typical) |
| `JWT_SECRET` | backend | Secret for signing JWT tokens |
| `CLOUDINARY_*` | backend | Cloudinary credentials for file uploads |
| `VITE_API_URL` | frontend | Backend base URL (e.g. `http://localhost:8000`) |

---

## License
ISC (or as specified in the project).
