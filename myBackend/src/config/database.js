const mongoose = require("mongoose");
const env = require("./env");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.mongodbUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("DB ERROR:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;