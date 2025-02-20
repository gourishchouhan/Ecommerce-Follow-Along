const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo Connected :>");
  } catch (error) {
    console.error("Mongo Failed :<", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;