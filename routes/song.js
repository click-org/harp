const router = require("express").Router();
const { param, query } = require("express-validator");

const { inputValidation } = require("../middlewares/input-validation");

const { getById, search } = require("../controllers/song");

// router.get("/", [query().optional().isString()]);

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
