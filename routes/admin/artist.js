const router = require("express").Router();
const { header, body, query } = require("express-validator");

const { inputValidation } = require("../../middlewares/input-validation");

const { create } = require("../../controllers/admin/artist");

router.post(
  "/",
  [
    body("name").isString().withMessage("invalid name").trim(),
    body("image_source").isString().withMessage("invalid image source"),
    body("translation_name")
      .optional()
      .isString()
      .withMessage("invalid translation name")
      .trim(),
  ],
  inputValidation,
  create
);

module.exports = router;
