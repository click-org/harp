const { Artist } = require("../models/artist");

module.exports.search = async (req, res, next) => {
  const keyword = req.query.keyword;

  try {
    const artists = await Artist.find(
      { $text: { $search: `\"${keyword}\"` } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .select({ score: -1 })
      .exec();

    return res.json({
      status: 1,
      message: "success",
      data: artists,
    });
  } catch (error) {
    return next(error);
  }
};
