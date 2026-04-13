const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const User = require("../models/User");
const AppError = require("../utils/AppError");

exports.register = async (data) => {
  const { name, email, password } = data;

  // ✅ ADDED: input validation (prevents bcrypt crash)
  if (!name || !email || !password) {
    throw new AppError("Name, email and password are required", 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  // ✅ SAFE: password guaranteed defined now
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };
};

exports.login = async ({ email, password }) => {

  // ✅ ADDED: input validation
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const user = await User.findOne({ email }).select("+password");

  // ✅ EXTRA SAFETY (prevents bcrypt crash)
  if (!user || !user.password) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  if (!user.isActive) {
    throw new AppError("User account is inactive", 403);
  }

  const token = jwt.generateToken({
    sub: user._id,
    role: user.role
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};