const router = require("express").Router();
const { query, param } = require("express-validator");

const { inputValidation } = require("../middlewares/input-validation");

const { search, getByQuery, get } = require("../controllers/album");

router.get(
  "/",
  [query("artist_id").optional().isMongoId().withMessage("invalid artist id")],
  inputValidation,
  getByQuery
);

router.get(
  "/search",
  [query("keyword").isString().withMessage("keyword")],
  inputValidation,
  search
);

router.get(
  "/:album_id",
  [param("album_id").isMongoId().withMessage("invalid album id")],
  inputValidation,
  get
);

module.exports = router;
