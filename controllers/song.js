const { Song } = require("../models/song");

module.exports.getById = async (req, res, next) => {
  const songId = req.params.song_id;

  try {
    const song = await Song.findByIdAndUpdate(songId, { $inc: { count: 1 } })
      .populate({ path: "album_id", select: ["name", "cover_source"] })
      .populate({ path: "artist_id", select: ["name", "image_source"] })
      .select({ createdAt: -1, updatedAt: -1 })
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
  const pageSize = req.query.page_size;
  const prevLatest = req.query.prev_latest;
  const filter = req.query.filter;
  const sort = req.query.sort;

  try {
    let filterWith;
    let sortBy;

    if (filter) {
      filterWith = { [filter[0]]: filter[1] };
    }

    if (sort == "popularity") {
      sortBy = { view_count: -1 };
      if (prevLatest) {
        filterWith.view_count = { $lt: filter.prevLatest };
      }
    } else {
      sortBy = { title: 1 };
      if (prevLatest) {
        filterWith.title = { $gt: filter.prevLatest };
      }
    }

    const songs = await Song.find(filterWith)
      .limit(pageSize)
      .sort(sortBy)
      .populate({ path: "album_id", select: ["name", "cover_source"] })
      .populate({ path: "artist_id", select: ["name", "image_source"] })
      .select({ createdAt: -1, updatedAt: -1 })
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
      { $text: { $search: `\"${keyword}\"` } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .populate({ path: "album_id", select: ["name"] })
      .populate({ path: "artist_id", select: ["name"] })
      .select({ score: -1, createdAt: -1, updatedAt: -1 })
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
