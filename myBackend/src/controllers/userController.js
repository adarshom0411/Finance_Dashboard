const asyncHandler = require("../utils/asyncHandler");
const userService = require("../services/userService");

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getUsers();
  res.json({ success: true, data: users });
});

exports.createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json({ success: true, data: user });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.json({ success: true, data: user });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.json({ success: true, message: "Deleted" });
});


// =======================================================
// ✅ ADDED: Deactivate User (REQUIRED)
// =======================================================
exports.deactivateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, {
    isActive: false
  });

  res.json({
    success: true,
    message: "User deactivated successfully",
    data: user
  });
});