const router = require("express").Router();
const { query } = require("express-validator");

const { inputValidation } = require("../middlewares/input-validation");

const { search, getByQuery } = require("../controllers/album");

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

module.exports = router;
