const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(StatusCodes.BAD_REQUEST).json({
    message: "Validation failed.",
    errors: errors.array().map((error) => ({
      field: error.path,
      message: error.msg
    }))
  });
};

module.exports = validate;
