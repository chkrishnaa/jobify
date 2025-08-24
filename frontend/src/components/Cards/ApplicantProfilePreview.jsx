import { Download, X } from "lucide-react";
import { useState } from "react";
import { getInitials } from "../../utils/helper";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";

import StatusBadge from "../StatusBadge";

const statusOptions = ["Applied", "In Review", "Rejected", "Accepted"];

const ApplicantProfilePreview = ({
  selectedApplicant,
  setSelectedApplicant,
  handleDownloadResume,
  handleClose,
}) => {
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
    <div className="fixded inset-0 bg-[rgba(0,0,0,0.2] bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white ronded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Applicant Profile</h3>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" onClick={() => handleClose()}>
            <X className="h-5 w-5 text-gray-500"></X>
          </button>
        </div>

        <div className="p-6 ">
          <div className="">
            {selectedApplicant.applicant.avatar ? (
              <img
                className=""
                src={selectedApplicant.applicant.avatar}
                alt={selectedApplicant.applicant.name}
              />
            ) : (
              <div className="">
                <span className="">
                    {getInitials(selectedApplicant.applicant.name)}
                </span>
              </div>
            )}
            <h4 className="">
                {selectedApplicant.applicant.name}
            </h4>
            <p className="">{selectedApplicant.applicant.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfilePreview;
