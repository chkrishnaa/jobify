import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB for PDFs

const uploadResume = async (file) => {
  try {
    // Check file type
    if (file.type !== 'application/pdf') {
      throw new Error('Only PDF files are allowed for resumes');
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File size must be less than 10MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
    }

    // Additional validation for file extension
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      throw new Error('File must have a .pdf extension');
    }

    // Convert file to base64
    const base64 = await convertFileToBase64(file);
    
    // Send base64 string to backend
    const response = await axiosInstance.post(
      API_PATHS.RESUME.UPLOAD, // Using the dedicated resume endpoint
      { 
        image: base64,
        fileType: 'resume', // Add identifier for resume files
        fileName: file.name 
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading resume:", error);
    throw error;
  }
};

// Helper function to convert file to base64
const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default uploadResume;
