const router = require("express").Router();
const { param, query } = require("express-validator");

const { inputValidation } = require("../middlewares/input-validation");

const { search } = require("../controllers/artist");

router.get(
  "/search",
  [query("keyword").isString().withMessage("invalid keyword")],
  inputValidation,
  search
);

module.exports = router;
