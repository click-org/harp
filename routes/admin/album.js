const router = require("express").Router();
const { header, body, query } = require("express-validator");

const { inputValidation } = require("../../middlewares/input-validation");

const { create } = require("../../controllers/admin/album");

router.post(
  "/",
  [
    body("name").isString().withMessage("invalid name").trim(),
    body("artist_id").isMongoId().withMessage("invalid artist id"),
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
