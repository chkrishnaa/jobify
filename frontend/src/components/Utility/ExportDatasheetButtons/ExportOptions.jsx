import React, { useState } from "react";
import ExportCSVButton from "./ExportCSVButton";
import ExportTSVButton from "./ExportTSVButton";
import ExportJSONButton from "./ExportJSONButton";
import ExportXLSXButton from "./ExportXLSXButton";
import { ChevronDown, Download } from "lucide-react";

const ExportOptions = ({ applications = [], darkMode }) => {
  const [format, setFormat] = useState(""); // "" | "csv" | "tsv" | "json" | "xlsx"

  const isDisabled = format === "";

  // Handles export based on selected format
  const handleExport = () => {
    if (!applications || applications.length === 0) return;

    switch (format) {
      case "csv":
        ExportCSVButton({ applications, darkMode }).props.onClick();
        break;
      case "tsv":
        ExportTSVButton({ applications, darkMode }).props.onClick();
        break;
      case "json":
        ExportJSONButton({ applications, darkMode }).props.onClick();
        break;
      case "xlsx":
        ExportXLSXButton({ applications, darkMode }).props.onClick();
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Format Selector */}
      <div className="relative inline-block w-48">
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className={`w-full px-3 py-2 rounded-lg text-sm font-medium appearance-none pr-8 text-white
      ${
        darkMode
          ? "bg-purple-600 hover:bg-purple-500"
          : "bg-purple-700 hover:bg-purple-800"
      }`}
        >
          <option value="">Select Format</option>
          <option value="csv">CSV</option>
          <option value="tsv">TSV</option>
          <option value="json">JSON</option>
          <option value="xlsx">XLSX</option>
        </select>

        {/* Chevron inside the select field */}
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
      </div>

      {/* Always show export button, enable only when a format is selected */}
      <button
        className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-white ${
          darkMode
            ? "bg-purple-600 hover:bg-purple-500"
            : "bg-purple-700 hover:bg-purple-800"
        } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isDisabled}
        onClick={handleExport}
      >
        <Download className="h-4 w-4" />
        Export
      </button>
    </div>
  );
};

export default ExportOptions;
