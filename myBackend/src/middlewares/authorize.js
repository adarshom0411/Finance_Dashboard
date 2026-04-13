const { StatusCodes } = require("http-status-codes");

const AppError = require("../utils/AppError");
const { ROLE_PERMISSIONS } = require("../constants/roles");

const authorize = (...requiredPermissions) => (req, res, next) => {

  if (!req.user || !req.user.role) {
    return next(
      new AppError("Authentication required before authorization.", StatusCodes.UNAUTHORIZED)
    );
  }

  const permissions = ROLE_PERMISSIONS[req.user.role];
  if (!permissions) {
    return next(
      new AppError("Invalid user role.", StatusCodes.FORBIDDEN)
    );
  }

  if (!requiredPermissions || requiredPermissions.length === 0) {
    return next(
      new AppError("No permissions specified for this route.", StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }

  const isAuthorized = requiredPermissions.every((permission) =>
    permissions.includes(permission)
  );

  if (!isAuthorized) {
    return next(
      new AppError("You do not have permission to perform this action.", StatusCodes.FORBIDDEN)
    );
  }

  next();
};

module.exports = authorize;