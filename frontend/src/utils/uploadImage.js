import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

const uploadImage = async (imageFile) => {
  try {
    // Check file size first
    if (imageFile.size > MAX_FILE_SIZE) {
      throw new Error(`File size must be less than 5MB. Current size: ${(imageFile.size / (1024 * 1024)).toFixed(2)}MB`);
    }

    // Compress and convert file to base64
    const compressedBase64 = await compressAndConvertToBase64(imageFile);
    
    // Send base64 string to backend
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE_BASE64,
      { image: compressedBase64 },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading the image:", error);
    throw error;
  }
};

// Helper function to compress image and convert to base64
const compressAndConvertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions (max 600x600 for better compression)
      const maxSize = 600;
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      // Start with high quality and reduce if needed
      let quality = 0.9;
      let base64 = canvas.toDataURL('image/jpeg', quality);
      
      // Check if base64 is still too large and reduce quality
      while (base64.length > MAX_FILE_SIZE * 0.75 && quality > 0.1) {
        quality -= 0.1;
        base64 = canvas.toDataURL('image/jpeg', quality);
      }
      
      // If still too large, reduce dimensions further
      if (base64.length > MAX_FILE_SIZE * 0.75) {
        const scaleFactor = 0.8;
        canvas.width = width * scaleFactor;
        canvas.height = height * scaleFactor;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        base64 = canvas.toDataURL('image/jpeg', 0.7);
      }
      
      console.log(`Compressed image: ${(base64.length / (1024 * 1024)).toFixed(2)}MB`);
      resolve(base64);
    };
    
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

// Fallback function to convert file to base64 without compression
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default uploadImage;