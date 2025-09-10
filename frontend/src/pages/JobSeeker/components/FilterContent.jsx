import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CATEGORIES, JOB_TYPES } from "../../../utils/data";
import SalaryRangeSlider from "../../../components/Input/SalaryRangeSlider";
import { useTheme } from "../../../context/ThemeContext";

const FilterSection = ({ title, children, isExpanded, onToggle }) => {
  const { darkMode } = useTheme();
  return (
    <div
      className={`border-b ${
        darkMode ? "border-gray-700" : "border-gray-200"
      } pb-4 mb-4 last:border-b-0`}
    >
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors"
      >
        <span
          className={`text-lg font-semibold ${
            darkMode ? "text-gray-300" : "text-gray-800"
          }`}
        >
          {title}
        </span>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-blue-600" />
        ) : (
          <ChevronDown className="h-5 w-5 text-blue-600" />
        )}
      </button>
      {isExpanded && children}
    </div>
  );
};

const FilterContent = ({
  toggleSection,
  clearAllFilters,
  expandedSections,
  filters,
  handleFilterChange,
}) => {
      const { darkMode } = useTheme();

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <button
          className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
          onClick={clearAllFilters}
        >
          Clear All
        </button>
      </div>

      <FilterSection
        title="Job Type"
        isExpanded={expandedSections?.jobType}
        onToggle={() => toggleSection("jobType")}
      >
        <div className="space-y-3">
          {JOB_TYPES.map((type) => (
            <label
              key={type.value}
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                checked={filters.type === type.value}
                onChange={(e) =>
                  handleFilterChange("type", e.target.checked ? type.value : "")
                }
              />
              <span
                className={`${
                  darkMode ? "text-gray-400 " : "text-gray-700 "
                } ml-3 font-medium`}
              >
                {type.value}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Salaray Range"
        isExpanded={expandedSections.salary}
        onToggle={() => toggleSection("salary")}
      >
        <SalaryRangeSlider
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
      </FilterSection>
 
      <FilterSection
        title="Category"
        isExpanded={expandedSections.categories}
        onToggle={() => toggleSection("categories")}
      >
        <div className="space-y-3">
          {CATEGORIES.map((type) => (
            <label
              key={type.value}
              className="flex items-center cursor-pointer"
            >
              <input
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                type="checkbox"
                checked={filters?.category === type.value}
                onChange={(e) =>
                  handleFilterChange(
                    "category",
                    e.target.checked ? type.value : ""
                  )
                }
              />
              <span
                className={`${
                  darkMode ? "text-gray-400 " : "text-gray-700 "
                } ml-3 font-medium`}
              >
                {type.value}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </>
  );
};

export default FilterContent;
