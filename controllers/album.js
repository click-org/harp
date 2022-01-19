const { Album } = require("../models/album");

module.exports.getByQuery = async (req, res, next) => {
  const artistId = req.query.artist_id;

  try {
    const albums = await Album.find({ artist_id: artistId })
      .select("-createdAt -updatedAt -__v")
      .exec();
    return res.json({
      status: 1,
      message: "success",
      data: albums,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.search = async (req, res, next) => {
  const keyword = req.query.keyword;

  try {
    const albums = await Album.find(
      { $text: { $search: keyword, $caseSensitive: false } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .populate({ path: "artist_id", select: ["name"] })
      .select("-score -createdAt -updatedAt -__v")
      .exec();
    return res.json({
      status: 1,
      message: "success",
      data: albums,
    });
  } catch (error) {
    return next(error);
  }
};
