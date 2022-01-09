const router = require("express").Router();
const { header, body, query } = require("express-validator");

const { inputValidation } = require("../../middlewares/input-validation");

const { create } = require("../../controllers/admin/artist");

router.post(
  "/",
  [body("name").isString().withMessage("invalid name")],
  inputValidation,
  create
);

module.exports = router;
