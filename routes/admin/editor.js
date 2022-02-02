const router = require("express").Router();
const { param, query, body } = require("express-validator");

const { inputValidation } = require("../../middlewares/input-validation");
const { verifyToken } = require("../../middlewares/verify-token");

const { period, groups, language } = require("../../util/constant");

const { create, edit, remove } = require("../../controllers/admin/editor");

router.post(
  "/",
  [
    body("song_list")
      .isArray({ min: 10, max: 100 })
      .withMessage("invalid song list"),
    body("language").isIn(language).withMessage("invalid language"),
    body("group").isIn(groups).withMessage("invalid group type"),
    body("period").isIn(period).withMessage("invalid period"),
  ],
  verifyToken,
  inputValidation,
  create
);

router.patch(
  "/:id",
  [
    param("id").isMongoId().withMessage("invalid id"),
    body("song_list")
      .optional()
      .isArray({ min: 10, max: 100 })
      .withMessage("invalid song list"),
    body("language").optional().isIn(language).withMessage("invalid language"),
    body("group_type")
      .optional()
      .isIn(groups)
      .withMessage("invalid group type"),
    body("peroid").optional().isIn(period).withMessage("invalid period"),
  ],
  verifyToken,
  inputValidation,
  edit
);

router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("invalid id")],
  verifyToken,
  inputValidation,
  remove
);

module.exports = router;
