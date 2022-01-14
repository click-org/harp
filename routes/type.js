const router = require("express").Router();
const { query } = require("express-validator");

const { inputValidation } = require("../middlewares/input-validation");

const { get } = require("../controllers/type");
const { type } = require("../util/constant");

router.get(
  "/",
  [query("type").isIn(type).withMessage("invalid type")],
  inputValidation,
  get
);

module.exports = router;
