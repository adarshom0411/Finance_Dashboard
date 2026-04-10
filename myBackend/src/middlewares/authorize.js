const { StatusCodes } = require("http-status-codes");

const AppError = require("../utils/AppError");
const { ROLE_PERMISSIONS } = require("../constants/roles");

const authorize = (...requiredPermissions) => (req, res, next) => {
  const permissions = ROLE_PERMISSIONS[req.user.role] || [];
  const isAuthorized = requiredPermissions.every((permission) =>
    permissions.includes(permission)
  );

  if (!isAuthorized) {
    return next(new AppError("You do not have permission to perform this action.", StatusCodes.FORBIDDEN));
  }

  next();
};

module.exports = authorize;
