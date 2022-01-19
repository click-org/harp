const router = require("express").Router();
const { body, param } = require("express-validator");

const { inputValidation } = require("../../middlewares/input-validation");
const { verifyToken } = require("../../middlewares/verify-token");

const { create, remove } = require("../../controllers/admin/song");

const genre = ["pop", "rock", "country"];

router.post(
  "/",
  [
    body("title").isString().withMessage("invalid title").trim(),
    body("album_id").optional().isMongoId().withMessage("invalid album id"),
    body("artist_id").isMongoId().withMessage("invalid artist id"),
    body("featured_artist")
      .optional()
      .isArray({ min: 1, max: 10 })
      .withMessage("invalid featured artist"),
    body("genre")
      .isArray({ min: 1, max: 10 })
      .custom((types) => {
        types.forEach((type) => {
          if (!genre.includes(type)) {
            throw new Error("invalid genre");
          }
        });
        return true;
      }),
    body("language")
      .isIn(["myanmar", "korea", "english"])
      .withMessage("invalid language"),
    body("source").isString().withMessage("invalid source"),
    body("cover_source")
      .optional()
      .isString()
      .withMessage("invalid cover source"),
    body("translation_title")
      .optional()
      .isString()
      .withMessage("invalid translation title"),
  ],
  inputValidation,
  verifyToken,
  create
);

router.delete(
  "/:song_id",
  [param("song_id").isMongoId().withMessage("invalid song id")],
  inputValidation,
  remove
);

module.exports = router;
