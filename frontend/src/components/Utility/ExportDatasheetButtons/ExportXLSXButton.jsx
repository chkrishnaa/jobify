import React from "react";
import { Download } from "lucide-react";
import moment from "moment";
import * as XLSX from "xlsx";

const ExportXLSXButton = ({ applications = [], darkMode, minimal = false }) => {
  const buildXLSXData = (rows) => {
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

  const downloadXLSX = (data, filename = "applications.xlsx") => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
    XLSX.writeFile(workbook, filename);
  };

  const handleExportXLSX = () => {
    if (!applications || applications.length === 0) return;

    const xlsxData = buildXLSXData(applications);

    const job = applications[0]?.job || {};
    let cleanTitle = job.title?.replace(/\s+/g, "").toLowerCase() || "Job";
    cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);

    const fileName = `${cleanTitle}-${job._id || "id"}.xlsx`;

    downloadXLSX(xlsxData, fileName);
  };

  return (
    <button
      className={`ml-3 inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl no-print ${
        darkMode
          ? "bg-gray-800 text-gray-300 hover:bg-gradient-to-r hover:from-purple-700 hover:to-purple-800"
          : "bg-white/10 text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700"
      }`}
      onClick={handleExportXLSX}
    >
      <Download className="h-4 w-4" />
      <span>Export XLSX</span>
    </button>
  );
};

export default ExportXLSXButton;
