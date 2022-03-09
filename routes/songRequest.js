const router = require("express").Router();
const { body, query } = require("express-validator");

const { inputValidation } = require("../middlewares/input-validation");

const { create, get } = require("../controllers/songRequest");

router.post(
  "/",
  [
    body("song_name").isString().withMessage("invalid song name"),
    body("artist_name")
      .optional()
      .isString()
      .withMessage("invalid artist name"),
    body("album_name").optional().isString().withMessage("invalid album name"),
  ],
  inputValidation,
  create
);

router.get(
  "/",
  [
    query("prev_latest")
      .optional()
      .isISO8601()
      .withMessage("invalid prev_latest"),
  ],
  inputValidation,
  get
);

module.exports = router;
