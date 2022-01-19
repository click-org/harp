const { Song } = require("../models/song");

module.exports.getById = async (req, res, next) => {
  const songId = req.params.song_id;

  try {
    const song = await Song.findByIdAndUpdate(songId, { $inc: { count: 1 } })
      .populate({
        path: "album_id",
        select: ["name", "cover_source", "translation_name"],
      })
      .populate({
        path: "artist_id",
        select: ["name", "image_source", "translation_name"],
      })
      .select("-createdAt -updatedAt -__v")
      .exec();

    return res.json({
      status: 1,
      message: "success",
      data: song,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.getWithQuery = async (req, res, next) => {
  const prevLatest = req.query.prev_latest;
  const filter = req.query.filter;

  try {
    const filterWith = {};

    if (filter) {
      const key = Object.keys(filter)[0];
      filterWith[key] = filter[key];
    }

    if (prevLatest) {
      filterWith.view_count = { $lt: filter.prevLatest };
    }

    const songs = await Song.find(filterWith)
      .limit(20)
      .sort({ view_count: -1 })
      .populate({
        path: "album_id",
        select: ["name", "cover_source", "translation_name"],
      })
      .populate({
        path: "artist_id",
        select: ["name", "image_source", "translation_name"],
      })
      .select("-createdAt -updatedAt -__v")
      .exec();

    return res.json({
      status: 1,
      message: "success",
      data: songs,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.search = async (req, res, next) => {
  const keyword = req.query.keyword;

  try {
    const songs = await Song.find(
      { $text: { $search: keyword, $caseSensitive: false } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .populate({ path: "album_id", select: ["name"] })
      .populate({ path: "artist_id", select: ["name"] })
      .select("-score -createdAt -updatedAt -__v")
      .exec();

    return res.json({
      status: 1,
      message: "success",
      data: songs,
    });
  } catch (error) {
    return next(error);
  }
};
