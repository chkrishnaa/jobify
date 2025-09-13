import { ChevronDown, Download, X } from "lucide-react";
import { useState } from "react";
import { getInitials } from "../../utils/helper";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";

import StatusBadge from "../Utility/StatusBadge";
import { useTheme } from "../../context/ThemeContext";

const statusOptions = ["Applied", "In Review", "Rejected", "Accepted"];

const ApplicantProfilePreview = ({
  selectedApplicant,
  setSelectedApplicant,
  handleDownloadResume,
  handleClose,
}) => {
  const { darkMode } = useTheme();

  const [currentStatus, setCurrentStatus] = useState(selectedApplicant.status);
  const [loading, setLoading] = useState(false);

  const onChangeStatus = async (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    setLoading(true);

    try {
      const response = await axiosInstance.put(
        API_PATHS.APPLICATIONS.UPDATE_STATUS(selectedApplicant._id),
        {
          status: newStatus,
        }
      );

      if (response.status === 200) {
        setSelectedApplicant({ ...selectedApplicant, status: newStatus });
        toast.success("Status Updated Successfully!");
      }
    } catch (error) {
      console.error("Error updating status", error);
      setCurrentStatus(selectedApplicant.status);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/50">
      <div
        className={`${
          darkMode ? "bg-gray-900" : "bg-white"
        } rounded-lg sm:rounded-xl shadow-xl max-w-lg w-full`}
      >
        <div
          className={`flex items-center justify-between p-3 sm:p-6 border-b ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <h2
            className={`text-lg font-semibold bg-gradient-to-r ${
              darkMode ? "from-white to-gray-300" : "from-gray-900 to-gray-500"
            } bg-clip-text text-transparent`}
          >
            Applicant Profile
          </h2>
          <button
            className={`p-2 ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            } rounded-full transition-colors`}
            onClick={() => handleClose()}
          >
            <X
              className={`h-5 w-5 ${
                darkMode ? "text-gray-200" : "text-gray-900"
              }`}
            ></X>
          </button>
        </div>

        <div className="p-3 sm:p-6 max-h-[80vh] overflow-y-auto">
          <div className="text-center mb-6">
            {selectedApplicant.applicant.avatar ? (
              <img
                className="h-20 w-20 rounded-full object-center mx-auto"
                src={selectedApplicant.applicant.avatar}
                alt={selectedApplicant.applicant.name}
              />
            ) : (
              <div
                className={`h-20 w-20 rounded-full ${
                  darkMode ? "bg-gray-400" : "bg-purple-200"
                } flex items-center justify-center mx-auto`}
              >
                <span
                  className={`${
                    darkMode ? "text-purple-800" : "text-purple-600"
                  } font-semibold text-xl`}
                >
                  {getInitials(selectedApplicant.applicant.name)}
                </span>
              </div>
            )}
            <h4
              className={`mt-4 text-xl font-semibold ${
                darkMode ? "text-gray-300" : "text-gray-900"
              }`}
            >
              {selectedApplicant.applicant.name}
            </h4>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              {selectedApplicant.applicant.email}
            </p>
          </div>

          <div className="space-y-2 sm:space-y-4">
            <div
              className={`bg-gradient-to-br ${
                darkMode
                  ? "from-purple-800 to-purple-950"
                  : "from-purple-200 to-purple-100"
              } rounded-md sm:rounded-lg p-2 sm:p-4 mb-4 sm:mb-6`}
            >
              <h5
                className={`font-medium ${
                  darkMode ? "text-gray-100" : "text-gray-800"
                } mb-2`}
              >
                Applied Position
              </h5>
              <p className={`${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                {selectedApplicant.job.title}
              </p>
              <p
                className={`${
                  darkMode ? "text-gray-300" : "text-gray-600"
                } text-xs sm:text-sm mt-1`}
              >
                {selectedApplicant.job.location} · {selectedApplicant.job.type}
              </p>
            </div>

            <div className="p-1 sm:p-4">
              <h5
                className={`font-medium ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                } mb-2`}
              >
                Application Details
              </h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span
                    className={`flex self-center ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Status:
                  </span>
                  <StatusBadge
                    className=""
                    status={currentStatus}
                  ></StatusBadge>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Applied Data:
                  </span>
                  <span
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } text-sm font-semibold`}
                  >
                    {moment(selectedApplicant.createdAt)?.format(
                      "Do MMM, YYYY"
                    )}
                  </span>
                </div>
              </div>
            </div>
            <button
              className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 ${
                darkMode
                  ? "bg-purple-700 text-gray-300 hover:bg-purple-800"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              } font-medium rounded-md sm:rounded-lg transition-colors`}
              onClick={() =>
                handleDownloadResume(
                  selectedApplicant.applicant.name,
                  selectedApplicant.applicant.resume
                )
              }
            >
              <Download className="h-4 w-4"></Download>
              Download Resume
            </button>

            <div className="mt-4">
              <label
                className={`block mb-1 text-sm ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } font-medium`}
              >
                Change Application Status
              </label>
              <div className="relative inline-block w-full">
                <select
                  value={currentStatus}
                  onChange={onChangeStatus}
                  disabled={loading}
                  className={`w-full border rounded-md sm:rounded-lg p-2 appearance-none ${
                    darkMode
                      ? "border-gray-700 focus:ring-purple-600 text-gray-400"
                      : "border-gray-300 focus:ring-purple-500 text-gray-700"
                  }`}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              {loading && (
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  } mt-1`}
                >
                  Updating Status ...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfilePreview;
