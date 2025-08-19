const SavedJobs = require("../models/SavedJobs");

exports.saveJob = async (req, res) => {
  try {
    const exists = await SavedJobs.findOne({
      job: req.params.jobId,
      jobseeker: req.user._id,
    });
    if (exists) {
      res.status(400).json({ message: "Job already saved" });
    }

    const savedJob = await SavedJobs.create({
      job: req.params.jobId,
      jobseeker: req.user._id,
    });
    res.status(201).json(savedJob);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to save job", error: error.message });
  }
};

exports.unsaveJob = async (req, res) => {
  try {
    const deleted = await SavedJobs.findOneAndDelete({
      job: req.params.jobId,
      jobseeker: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Job not found in saved list" });
    }

    res.json({ message: "Job removed from saved jobs list" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to unsave job", error: error.message });
  }
};

exports.getMySavedJobs = async (req, res) => {
  try {
    const savedJobs = await SavedJobs.find({
      jobseeker: req.user._id,
    }).populate({
      path: "job",
      populate: {
        path: "company",
        select: "name companyName companyLogo",
      },
    });
    res.json(savedJobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch saves jobs", error: error.message });
  }
};
