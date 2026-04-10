const dotenv = require("dotenv");

dotenv.config();

const parseBoolean = (val) => {
  if (!val) return false;
  return ["true", "1", "yes"].includes(val.toLowerCase());
};

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 4000,

  mongodbUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/finance_dashboard",

  jwtSecret: process.env.JWT_SECRET || "supersecret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",

  seedAdminOnStart: parseBoolean(process.env.SEED_ADMIN_ON_START),

  seedAdminName: process.env.SEED_ADMIN_NAME || "System Admin",
  seedAdminEmail: process.env.SEED_ADMIN_EMAIL || "admin@example.com",
  seedAdminPassword: process.env.SEED_ADMIN_PASSWORD || "Admin@123"
};

module.exports = env;