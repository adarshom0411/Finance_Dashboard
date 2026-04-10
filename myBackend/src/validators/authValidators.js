const { body } = require("express-validator");

const loginValidation = [
  body("email").isEmail().withMessage("A valid email is required.").normalizeEmail(),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long.")
];

module.exports = {
  loginValidation
};
