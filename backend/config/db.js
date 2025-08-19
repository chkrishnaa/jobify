const mongoose = require("mongoose"); // 👈 add this line

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
     
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // exit process with failure
  }
};

module.exports = connectDB; // 👈 also export the function
