const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("../config/env");

exports.register = async ({ name, email, password, role }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);

  return await User.create({
    name,
    email,
    password: hashed,
    role: role || "viewer" // ✅ FIX: allow role from request
  });
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );

  return { token };
};