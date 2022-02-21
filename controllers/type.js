const { genre, language, sort, groups, period } = require("../util/constant");

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
    case "sort":
      data = sort;
      break;
    case "group":
      data = groups;
      break;
    case "peroid":
      data = period;
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
