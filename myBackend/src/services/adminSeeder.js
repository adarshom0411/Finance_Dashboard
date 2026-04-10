const User = require("../models/User");
const { ROLES } = require("../constants/roles");

const ensureAdminUser = async ({ name, email, password }) => {
  const existingAdmin = await User.findOne({ email });

  if (existingAdmin) {
    return {
      created: false,
      user: existingAdmin
    };
  }

  const user = await User.create({
    name,
    email,
    password,
    role: ROLES.ADMIN,
    status: "active"
  });

  return {
    created: true,
    user
  };
};

module.exports = {
  ensureAdminUser
};
