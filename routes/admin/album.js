const router = require("express").Router();
const { header, body, query } = require("express-validator");

const { inputValidation } = require("../../middlewares/input-validation");

const { create } = require("../../controllers/admin/album");

router.post(
  "/",
  [
    body("name").isString().withMessage("invalid name"),
    body("artist_id").isMongoId().withMessage("invalid artist id"),
  ],
  inputValidation,
  create
);

module.exports = router;
