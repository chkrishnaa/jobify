import React from "react";
import { Download } from "lucide-react";
import moment from "moment";

const ExportTSVButton = ({ applications = [], darkMode, minimal = false }) => {
  const escape = (val) => {
    if (val === null || val === undefined) return "";
    const s = String(val).replace(/\t/g, " "); // replace tabs to avoid breaking TSV
    return s;
  };

  const buildTSV = (rows) => {
    let headers,
      tsvRows = [];

    if (minimal) {
      headers = [
        "Applicant Name",
        "Applicant Email",
        "Applied Date",
        "Status",
        "Resume URL",
      ];
      tsvRows.push(headers.join("\t"));

      rows.forEach((app) => {
        const applicant = app.applicant || {};
        const row = [
          escape(applicant.name),
          escape(applicant.email),
          escape(
            app.createdAt
              ? moment(app.createdAt).format("YYYY-MM-DD HH:mm")
              : ""
          ),
          escape(app.status),
          escape(applicant.resume),
        ];
        tsvRows.push(row.join("\t"));
      });
    } else {
      headers = [
        "Job ID",
        "Job Title",
        "Applicant Name",
        "Applicant Email",
        "Applied Date",
        "Status",
        "Resume URL",
        "Location",
        "Type",
        "Category",
      ];
      tsvRows.push(headers.join("\t"));

      rows.forEach((app) => {
        const job = app.job || {};
        const applicant = app.applicant || {};
        const row = [
          escape(job._id),
          escape(job.title),
          escape(applicant.name),
          escape(applicant.email),
          escape(
            app.createdAt
              ? moment(app.createdAt).format("YYYY-MM-DD HH:mm")
              : ""
          ),
          escape(app.status),
          escape(applicant.resume),
          escape(job.location),
          escape(job.type),
          escape(job.category),
        ];
        tsvRows.push(row.join("\t"));
      });
    }

    return tsvRows.join("\n");
  };

  const downloadTSV = (tsvString, filename = "applications.tsv") => {
    const blob = new Blob([tsvString], {
      type: "text/tab-separated-values;charset=utf-8;",
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

  const handleExportTSV = () => {
    if (!applications || applications.length === 0) return;

    const tsvData = buildTSV(applications);

    const job = applications[0]?.job || {};
    let cleanTitle = job.title?.replace(/\s+/g, "").toLowerCase() || "Job";
    cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);

    const fileName = `${cleanTitle}-${job._id || "id"}.tsv`;

    downloadTSV(tsvData, fileName);
  };

  return (
    <button
      className={`ml-3 inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl no-print ${
        darkMode
          ? "bg-gray-800 text-gray-300 hover:bg-gradient-to-r hover:from-purple-700 hover:to-purple-800"
          : "bg-white/10 text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700"
      }`}
      onClick={handleExportTSV}
    >
      <Download className="h-4 w-4" />
      <span>Export TSV</span>
    </button>
  );
};

export default ExportTSVButton;
