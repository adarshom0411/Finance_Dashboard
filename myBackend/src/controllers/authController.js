const asyncHandler = require("../utils/asyncHandler");
const authService = require("../services/authService");

exports.register = asyncHandler(async (req, res) => {

  // ✅ ADDED: basic safety check (prevents undefined issues)
  if (!req.body || !req.body.password) {
    return res.status(400).json({
      success: false,
      message: "Password is required"
    });
  }

  // ❌ REMOVED: bcrypt hashing from controller
  const user = await authService.register(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
});

exports.login = asyncHandler(async (req, res) => {

  const data = await authService.login(req.body);

  res.json({
    success: true,
    data
  });
});