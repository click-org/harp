const router = require("express").Router();
const { body, param } = require("express-validator");

const { inputValidation } = require("../../middlewares/input-validation");
const { verifyToken } = require("../../middlewares/verify-token");

const { create, remove, edit } = require("../../controllers/admin/artist");

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
  verifyToken,
  create
);

router.delete(
  "/:artist_id",
  [param("artist_id").isMongoId().withMessage("invalid artist id")],
  inputValidation,
  remove
);

router.patch(
  "/:artist_id",
  [
    param("artist_id").isMongoId().withMessage("invalid artist id"),
    body("name").optional().isString().withMessage("invalid name"),
    body("image_source")
      .optional()
      .isString()
      .withMessage("invalid image source"),
  ],
  inputValidation,
  edit
);

module.exports = router;
