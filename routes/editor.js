const router = require("express").Router();
const { param, query, body } = require("express-validator");

const { period, groupTypes, language } = require("../util/constant");

router.post("/", [
  body("song_list")
    .isArray({ min: 10, max: 100 })
    .withMessage("invalid song list"),
  body("language").isIn(language).withMessage("invalid language"),
  body("group_type").isIn(groupTypes).withMessage("invalid group type"),
  body("peroid").isIn(period).withMessage("invalid period"),
]);

module.exports = router;
