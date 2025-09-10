import React from "react";
import { Download } from "lucide-react";
import moment from "moment";

const ExportCSVButton = ({ applications = [], darkMode }) => {
  const buildCSV = (rows) => {
    const headers = [
      "Applicant Name",
      "Applicant Email",
      "Applied Date",
      "Status",
      "Resume URL",
    ];

    const escape = (val) => {
      if (val === null || val === undefined) return "";
      const s = String(val).replace(/"/g, '""'); // escape quotes
      return `"${s}"`;
    };

    const csvRows = [headers.join(",")];

    rows.forEach((app) => {
      const applicant = app.applicant || {};
      const row = [
        escape(applicant.name || ""),
        escape(applicant.email || ""),
        escape(
          app.createdAt ? moment(app.createdAt).format("YYYY-MM-DD HH:mm") : ""
        ),
        escape(app.status || ""),
        escape(applicant.resume || ""),
      ];
      csvRows.push(row.join(","));
    });

    return csvRows.join("\n");
  };

  const downloadCSV = (csvString, filename = "applications.csv") => {
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

 const handleExportCSV = () => {
   if (!applications || applications.length === 0) return;
   const csv = buildCSV(applications);

   const job = applications[0]?.job || {};
   let cleanTitle = job.title?.replace(/\s+/g, "").toLowerCase() || "Job";
   cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);

   const fileName = `${cleanTitle}-${job._id || "id"}.csv`;

   downloadCSV(csv, fileName);
 };

  return (
    <button
      className={`ml-3 inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl no-print ${
        darkMode
          ? "bg-gray-800 text-gray-300 hover:bg-gradient-to-r hover:from-purple-700 hover:to-purple-800"
          : "bg-white/10 text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700"
      }`}
      onClick={handleExportCSV}
    >
      <Download className="h-4 w-4" />
      <span>Export</span>
    </button>
  );
};

export default ExportCSVButton;
