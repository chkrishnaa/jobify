// src/components/Utility/Pagination.jsx
import React from "react";

export default function Pagination({
  darkMode,
  currentPage,
  totalPages,
  startIndex,
  itemsPerPage,
  totalItems,
  setCurrentPage,
  color, // default color
}) {
  // Dynamic Tailwind classes based on color
  const activeClasses = darkMode
    ? `z-10 bg-${color}-900 border-${color}-500 text-${color}-300`
    : `z-10 bg-${color}-100 border-${color}-500 text-${color}-300`; // ✅ changed from -600 to -300

  return (
    <div className="mt-6 flex items-center justify-between">
      {/* Mobile Pagination */}
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          className={`relative inline-flex items-center px-4 py-2 border ${
            darkMode
              ? "border-gray-600 text-gray-200 bg-gray-800 hover:bg-gray-900"
              : "border-gray-400 text-gray-700 bg-white hover:bg-gray-50"
          } text-sm font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className={`relative inline-flex items-center px-4 py-2 border ${
            darkMode
              ? "border-gray-600 text-gray-200 bg-gray-800 hover:bg-gray-900"
              : "border-gray-400 text-gray-700 bg-white hover:bg-gray-50"
          } text-sm font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Desktop Pagination */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-200" : "text-gray-600"
            }`}
          >
            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(startIndex + itemsPerPage, totalItems)}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>

        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              className={`relative inline-flex items-center p-2 rounded-l-md border ${
                darkMode
                  ? "border-gray-600 text-gray-200 bg-gray-800 hover:bg-gray-900"
                  : "border-gray-400 text-gray-700 bg-white hover:bg-gray-50"
              } text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                    ${
                      currentPage === page
                        ? activeClasses
                        : darkMode
                        ? "border-gray-600 text-gray-200 bg-gray-800 hover:bg-gray-700"
                        : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"
                    }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center p-2 rounded-r-md border ${
                darkMode
                  ? "border-gray-600 text-gray-200 bg-gray-800 hover:bg-gray-900"
                  : "border-gray-400 text-gray-700 bg-white hover:bg-gray-50"
              } text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
