const express = require("express");
const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const { uploadMiddleware, uploadToCloudinary, uploadBase64ToCloudinary } = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

// Route for file uploads (multipart/form-data)
router.post("/upload-image", uploadMiddleware, async (req, res) => {
  try {
    console.log("Upload request received");
    console.log("Files:", req.files);
    console.log("Fields:", req.fields);
    
    if (!req.files || !req.files.image) {
      console.log("No image file found in request");
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Handle formidable's array structure
    const fileArray = Array.isArray(req.files.image) ? req.files.image : [req.files.image];
    const file = fileArray[0]; // Take the first file
    
    if (!file) {
      return res.status(400).json({ message: "Invalid file" });
    }
    
    console.log("File object:", file);
    
    // Upload to Cloudinary
    const result = await uploadToCloudinary(file);
    
    res.status(200).json({ imageUrl: result.url });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

// Route for base64 uploads (application/json)
router.post("/upload-image-base64", async (req, res) => {
  try {
    console.log("Base64 upload request received");
    console.log("Body:", req.body);
    
    const { image } = req.body;
    
    if (!image) {
      return res.status(400).json({ message: "No base64 image provided" });
    }
    
    // Upload base64 to Cloudinary
    const result = await uploadBase64ToCloudinary(image);
    
    res.status(200).json({ imageUrl: result.url });
  } catch (error) {
    console.error("Base64 upload error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

module.exports = router;
