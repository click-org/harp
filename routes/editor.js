const router = require("express").Router();
const { param, query, body } = require("express-validator");

const { period, groupTypes, language } = require("../util/constant");

router.get("/", []);

module.exports = router;
