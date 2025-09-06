const { formidable } = require("formidable");
const cloudinary = require("../config/cloudinary");

// Configure formidable for file uploads
const form = formidable({
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowEmptyFiles: false,
  filter: ({ mimetype }) => {
    const allowedTypes = [
      "image/jpeg", 
      "image/jpg", 
      "image/png",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    return allowedTypes.includes(mimetype);
  }
});

// Middleware for parsing multipart form data
const uploadMiddleware = (req, res, next) => {
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: "File upload error", error: err.message });
    }
    
    req.fields = fields;
    req.files = files;
    next();
  });
};

// Upload file to Cloudinary from file path
const uploadToCloudinary = async (file) => {
  try {
    if (!file || !file.filepath) {
      throw new Error("Invalid file object");
    }

    console.log("Uploading file:", file.originalFilename, "from path:", file.filepath);
    
    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: "jobfinder",
      resource_type: "auto",
      transformation: [{ width: 1000, height: 1000, crop: "limit" }],
    });
    
    console.log("Upload successful:", result.secure_url);
    
    return {
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      size: result.bytes
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(`Upload failed: ${error.message}`);
  }
};

// Upload base64 string to Cloudinary
const uploadBase64ToCloudinary = async (base64String, options = {}) => {
  try {
    if (!base64String) {
      throw new Error("No base64 string provided");
    }

    const { fileType, fileName } = options;
    
    if (fileType === 'resume') {
      console.log("Uploading resume PDF to Cloudinary");
      
      const result = await cloudinary.uploader.upload(base64String, {
        folder: "jobfinder/resumes",
        resource_type: "auto",
        public_id: fileName ? fileName.replace('.pdf', '') : undefined,
        format: 'pdf'
      });
      
      console.log("Resume upload successful:", result.secure_url);
      
      return {
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        size: result.bytes
      };
    } else {
      console.log("Uploading base64 image to Cloudinary");
      
      const result = await cloudinary.uploader.upload(base64String, {
        folder: "jobfinder",
        resource_type: "auto",
        transformation: [{ width: 1000, height: 1000, crop: "limit" }],
      });
      
      console.log("Base64 upload successful:", result.secure_url);
      
      return {
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        size: result.bytes
      };
    }
  } catch (error) {
    console.error("Cloudinary base64 upload error:", error);
    throw new Error(`Upload failed: ${error.message}`);
  }
};

module.exports = { uploadMiddleware, uploadToCloudinary, uploadBase64ToCloudinary };