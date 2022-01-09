const router = require("express").Router();
const { body } = require("express-validator");

const { Song } = require("../../models/song");

router.get("/", async function (req, res, next) {
  try {
    const song = await new Song({
      name: "Hein Soe Htet",
    }).save();
    res.send(song);
  } catch (error) {
    return next(new Error("internal error"));
  }
});

router.post("/", [
  body("title")
    .exists({ checkNull: true })
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage("required title")
    .isString()
    .withMessage("title is not string")
    .trim()
    .escape(),
  body("album")
    .exists({ checkNull: true })
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage("required album")
    .isString()
    .withMessage("title is not string")
    .trim()
    .escape(),
]);

module.exports = router;
