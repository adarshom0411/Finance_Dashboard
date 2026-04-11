const { body, param, query } = require("express-validator");

const { RECORD_TYPES } = require("../constants/recordTypes");

const recordPayloadValidation = [
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a number greater than 0."),
  body("type")
    .isIn(Object.values(RECORD_TYPES))
    .withMessage("Type must be income or expense."),
  body("category").trim().notEmpty().withMessage("Category is required."),
  body("date").isISO8601().withMessage("Date must be a valid ISO 8601 value."),
  body("note")
    .optional()
    .isString()
    .withMessage("Notes must be a string.")
    .trim()
];

const createRecordValidation = recordPayloadValidation;

const updateRecordValidation = [
  param("id").isMongoId().withMessage("A valid record id is required."),
  body("amount")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a number greater than 0."),
  body("type")
    .optional()
    .isIn(Object.values(RECORD_TYPES))
    .withMessage("Type must be income or expense."),
  body("category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category cannot be empty."),
  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be a valid ISO 8601 value."),
  body("note")
    .optional()
    .isString()
    .withMessage("Notes must be a string.")
    .trim()
];

const recordIdValidation = [
  param("id").isMongoId().withMessage("A valid record id is required.")
];

const listRecordsValidation = [
  query("type")
    .optional()
    .isIn(Object.values(RECORD_TYPES))
    .withMessage("Type must be income or expense."),
  query("category").optional().isString().trim(),
  query("startDate").optional().isISO8601().withMessage("startDate must be a valid date."),
  query("endDate").optional().isISO8601().withMessage("endDate must be a valid date."),
  query("page").optional().isInt({ min: 1 }).withMessage("page must be at least 1."),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit must be between 1 and 100.")
];

const summaryQueryValidation = [
  query("startDate").optional().isISO8601().withMessage("startDate must be a valid date."),
  query("endDate").optional().isISO8601().withMessage("endDate must be a valid date."),
  query("groupBy")
    .optional()
    .isIn(["month", "week"])
    .withMessage("groupBy must be month or week.")
];

module.exports = {
  createRecordValidation,
  updateRecordValidation,
  recordIdValidation,
  listRecordsValidation,
  summaryQueryValidation
};
