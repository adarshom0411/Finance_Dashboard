const { body, param, query } = require("express-validator");

const { ROLES } = require("../constants/roles");

const createUserValidation = [
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("email").isEmail().withMessage("A valid email is required.").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
  body("role")
    .optional()
    .isIn(Object.values(ROLES))
    .withMessage("Role must be viewer, analyst, or admin."),
  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive.")
];

const updateUserValidation = [
  param("id").isMongoId().withMessage("A valid user id is required."),
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty."),
  body("role")
    .optional()
    .isIn(Object.values(ROLES))
    .withMessage("Role must be viewer, analyst, or admin."),
  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive."),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
];

const userIdValidation = [
  param("id").isMongoId().withMessage("A valid user id is required.")
];

const listUsersValidation = [
  query("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive."),
  query("role")
    .optional()
    .isIn(Object.values(ROLES))
    .withMessage("Role must be viewer, analyst, or admin.")
];

module.exports = {
  createUserValidation,
  updateUserValidation,
  userIdValidation,
  listUsersValidation
};
