const { SongRequest } = require("../models/songRequest");

module.exports.create = async (req, res, next) => {
  const songName = req.body.song_name;
  const artistName = req.body.artist_name;
  const albumName = req.body.album_name;

  try {
    const songRequest = await new SongRequest({
      song_name: songName,
      artist_name: artistName,
      album_name: albumName,
    }).save();

    return res.json({
      status: 1,
      message: "success",
      data: songRequest,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.get = async (req, res, next) => {
  const prevLatest = req.query.prev_latest;

  const filterWith = {};

  if (prevLatest) {
    filterWith.createdAt = { $lt: filter.prevLatest };
  }

  try {
    const songRequests = await SongRequest.find(filterWith)
      .limit(30)
      .sort({ createdAt: -1 })
      .select("-updatedAt -__v")
      .exec();

    return res.json({
      status: 1,
      message: "success",
      data: songRequests,
    });
  } catch (error) {
    return next(error);
  }
};
