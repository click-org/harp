const router = require("express").Router();
const { header, body, query, param } = require("express-validator");

const { inputValidation } = require("../../middlewares/input-validation");
const { verifyToken } = require("../../middlewares/verify-token");

const { create, remove, edit } = require("../../controllers/admin/album");

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
  verifyToken,
  create
);

router.delete(
  "/:album_id",
  [param("album_id").isMongoId().withMessage("invalid album id")],
  inputValidation,
  remove
);

router.patch(
  "/:album_id",
  [
    param("album_id").isMongoId().withMessage("invalid album id"),
    body("name").optional().isString().withMessage("invalid name"),
    body("translation_name")
      .optional()
      .isString()
      .withMessage("invalid translation name"),
    body("cover_source")
      .optional()
      .isString()
      .withMessage("invalid cover source"),
    body("artist_id").optional().isMongoId().withMessage("invalid artist id"),
  ],
  inputValidation,
  edit
);

module.exports = router;
