import React from "react";
import { Download } from "lucide-react";
import moment from "moment";

const ExportJSONButton = ({ applications = [], darkMode, minimal = false }) => {
  const buildJSON = (rows) => {
    if (minimal) {
      // Only applicant info
      return rows.map((app) => ({
        "Applicant Name": app.applicant?.name || "",
        "Applicant Email": app.applicant?.email || "",
        "Applied Date": app.createdAt
          ? moment(app.createdAt).format("YYYY-MM-DD HH:mm")
          : "",
        Status: app.status || "",
        "Resume URL": app.applicant?.resume || "",
      }));
    } else {
      // Full job + applicant info
      return rows.map((app) => ({
        "Job ID": app.job?._id || "",
        "Job Title": app.job?.title || "",
        "Applicant Name": app.applicant?.name || "",
        "Applicant Email": app.applicant?.email || "",
        "Applied Date": app.createdAt
          ? moment(app.createdAt).format("YYYY-MM-DD HH:mm")
          : "",
        Status: app.status || "",
        "Resume URL": app.applicant?.resume || "",
        Location: app.job?.location || "",
        Type: app.job?.type || "",
        Category: app.job?.category || "",
      }));
    }
  };

  const downloadJSON = (jsonData, filename = "applications.json") => {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    if (!applications || applications.length === 0) return;

    const jsonData = buildJSON(applications);

    const job = applications[0]?.job || {};
    let cleanTitle = job.title?.replace(/\s+/g, "").toLowerCase() || "Job";
    cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);

    const fileName = `${cleanTitle}-${job._id || "id"}.json`;

    downloadJSON(jsonData, fileName);
  };

  return (
    <button
      className={`ml-3 inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl no-print ${
        darkMode
          ? "bg-gray-800 text-gray-300 hover:bg-gradient-to-r hover:from-purple-700 hover:to-purple-800"
          : "bg-white/10 text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700"
      }`}
      onClick={handleExportJSON}
    >
      <Download className="h-4 w-4" />
      <span>Export JSON</span>
    </button>
  );
};

export default ExportJSONButton;
