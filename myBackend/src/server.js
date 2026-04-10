const app = require("./app");
const connectDB = require("./config/database");
const env = require("./config/env");

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (err) {
    console.error("Server failed:", err.message);
    process.exit(1);
  }
};

startServer();