const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("../config/env");
const AppError = require("../utils/AppError"); // ✅ ADDED

exports.register = async ({ name, email, password, role }) => {
  const exists = await User.findOne({ email });

  // ✅ FIX: use AppError instead of Error
  if (exists) throw new AppError("User already exists", 400);

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role: role || "admin"
  });

  // ✅ OPTIONAL SAFE RETURN (no password exposure)
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };
};

exports.login = async ({ email, password }) => {

  // ✅ FIX: include password
  const user = await User.findOne({ email }).select("+password");

  // ✅ FIX: proper error handling
  if (!user || !user.password) {
    throw new AppError("Invalid credentials", 401);
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new AppError("Invalid credentials", 401);
  }

  // ✅ ADDED: inactive user check
  if (!user.isActive) {
    throw new AppError("User account is inactive", 403);
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );

  return { token };
};