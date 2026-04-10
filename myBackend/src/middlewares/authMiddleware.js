const jwt = require("jsonwebtoken");
const env = require("../config/env");

exports.protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer")) {
    return res.status(401).json({
      success: false,
      message: "Not authorized"
    });
  }

  try {
    token = token.split(" ")[1];

    const decoded = jwt.verify(token, env.jwtSecret);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};