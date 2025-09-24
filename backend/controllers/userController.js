const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {
    const {
      name,
      avatar,
      resume,
      userDesc,
      userSkills,
      companyName,
      companyDescription,
      companyLogo,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // update fields
    user.name = name || user.name;

    // ✅ avatar fix: allow empty string but keep old if not provided
    if (req.body.hasOwnProperty("avatar")) {
      user.avatar = avatar;
    }

    user.resume = resume || user.resume;

    if (req.body.hasOwnProperty("userDesc")) {
      user.userDesc = userDesc;
    }

    if (req.body.hasOwnProperty("userSkills")) {
      user.userSkills = userSkills;
    }


    if (user.role === "employer") {
      user.companyName = companyName || user.companyName;
      user.companyDescription = companyDescription || user.companyDescription;
      user.companyLogo = companyLogo || user.companyLogo;
    }

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      avatar: user.avatar || "",
      role: user.role,
      userDesc: user.userDesc || "",
      userSkills: user.userSkills || [],
      companyName: user.companyName,
      companyDescription: user.companyDescription,
      companyLogo: user.companyLogo,
      resume: user.resume || "",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const { resumeUrl } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "jobseeker") {
      return res
        .status(404)
        .json({ message: "only jobseeker can delete resume" });
    }

    // For Cloudinary, we don't need to delete the file locally
    // The file will remain in Cloudinary storage
    user.resume = "";
    await user.save();

    res.json({ message: "resume Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
