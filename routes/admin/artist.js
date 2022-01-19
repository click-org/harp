const router = require("express").Router();
const { body, param } = require("express-validator");

const { inputValidation } = require("../../middlewares/input-validation");
const { verifyToken } = require("../../middlewares/verify-token");

const { create, remove } = require("../../controllers/admin/artist");

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

module.exports = router;
