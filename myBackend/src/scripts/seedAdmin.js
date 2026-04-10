const connectDatabase = require("../config/database");
const env = require("../config/env");
const { ensureAdminUser } = require("../services/adminSeeder");

const run = async () => {
  await connectDatabase(env.mongodbUri);
  const result = await ensureAdminUser({
    name: env.seedAdminName,
    email: env.seedAdminEmail,
    password: env.seedAdminPassword
  });

  console.log(
    result.created
      ? `Admin user created for ${result.user.email}`
      : `Admin user already exists for ${result.user.email}`
  );
  process.exit(0);
};

run().catch((error) => {
  console.error("Failed to seed admin user:", error.message);
  process.exit(1);
});
