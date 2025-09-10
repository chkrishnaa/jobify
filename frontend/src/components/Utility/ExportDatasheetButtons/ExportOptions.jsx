import React, { useState } from "react";
import ExportCSVButton from "./ExportCSVButton";
import ExportTSVButton from "./ExportTSVButton";
import ExportJSONButton from "./ExportJSONButton";
import ExportXLSXButton from "./ExportXLSXButton";
import { Download } from "lucide-react";

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
      <select
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        className={`px-3 py-2 rounded-xl text-sm font-medium border ${
          darkMode
            ? "bg-gray-800 text-gray-300 border-gray-600"
            : "bg-white text-gray-700 border-gray-300"
        }`}
      >
        <option value="">Select Format</option>
        <option value="csv">CSV</option>
        <option value="tsv">TSV</option>
        <option value="json">JSON</option>
        <option value="xlsx">XLSX</option>
      </select>

      {/* Always show export button, enable only when a format is selected */}
      <button
        className={`ml-3 inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl ${
          darkMode
            ? "bg-gray-800 text-gray-300 hover:bg-gradient-to-r hover:from-purple-700 hover:to-purple-800"
            : "bg-white/10 text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700"
        } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isDisabled}
        onClick={handleExport}
      >
        <Download />
        Export 
      </button>
    </div>
  );
};

export default ExportOptions;
