module.exports = (err, req, res, next) => {
  console.error(err);

  // ✅ Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server Error";

  // ✅ Handle Mongo duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }

  // ✅ Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // ✅ Handle validation errors (Mongoose)
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message
  });
};