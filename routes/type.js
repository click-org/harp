const router = require("express").Router();
const { query } = require("express-validator");

const { inputValidation } = require("../middlewares/input-validation");

const { get } = require("../controllers/type");
const { musicTypes } = require("../util/constant");

router.get(
  "/",
  [query("type").isIn(musicTypes).withMessage("invalid type")],
  inputValidation,
  get
);

module.exports = router;
