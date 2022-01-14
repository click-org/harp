const { genre, language } = require("../util/constant");

module.exports.get = (req, res, next) => {
  const type = req.query.type;

  let data;
  switch (type) {
    case "genre":
      data = genre;
      break;
    case "language":
      data = language;
      break;
    default:
      break;
  }

  return res.json({
    status: 1,
    message: "success",
    data,
  });
};
