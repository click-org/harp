const router = require("express").Router();
const { param, query } = require("express-validator");

const { inputValidation } = require("../middlewares/input-validation");

const { period, groups, language } = require("../util/constant");

const { get } = require("../controllers/editor");

router.get(
  "/",
  [
    query("language").optional().isIn(language).withMessage("invalid language"),
    query("group").optional().isIn(groups).withMessage("invalid group"),
    query("period").optional().isIn(period).withMessage("invalid period"),
  ],
  inputValidation,
  get
);

module.exports = router;
