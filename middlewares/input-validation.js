const { validationResult } = require("express-validator");

module.exports.inputValidation = async (req, res, next) => {
  const validationErr = validationResult(req);

  if (!validationErr.isEmpty()) {
    return next(new Error(validationErr.errors[0].msg));
  }

  next();
};
