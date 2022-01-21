const router = require("express").Router();
const { param, query } = require("express-validator");

const { inputValidation } = require("../middlewares/input-validation");

const { getById, search, getWithQuery } = require("../controllers/song");
const { language, genre, sort } = require("../util/constant");

router.get(
  "/",
  [
    query("filter.artist_id")
      .optional()
      .isMongoId()
      .withMessage("invalid artist id"),
    query("filter.album_id")
      .optional()
      .isMongoId()
      .withMessage("invalid album id"),
    query("language").optional().isIn(language).withMessage("invalid language"),
    query("genre").optional().isIn(genre).withMessage("invalid genre"),
    query("sort").isIn(sort).withMessage("invalid sort"),
  ],
  inputValidation,
  getWithQuery
);

router.get(
  "/:song_id",
  [param("song_id").isMongoId().withMessage("invalid song id")],
  inputValidation,
  getById
);

router.get(
  "/search",
  [query("keyword").isString().withMessage("invalid keyword")],
  inputValidation,
  search
);

module.exports = router;
