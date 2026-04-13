const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");
const AppError = require("../utils/AppError");
const { verifyToken } = require("../utils/jwt");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Authentication token is required.", StatusCodes.UNAUTHORIZED));
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);

    const user = await User.findById(payload.sub).select("+password");

    if (!user) {
      return next(new AppError("User associated with the token no longer exists.", StatusCodes.UNAUTHORIZED));
    }

    if (!user.isActive) {
      return next(new AppError("User account is inactive.", StatusCodes.FORBIDDEN));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new AppError("Invalid or expired authentication token.", StatusCodes.UNAUTHORIZED));
  }
};

module.exports = authenticate;