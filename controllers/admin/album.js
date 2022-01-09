const { Album } = require("../../models/album");

module.exports.create = async (req, res, next) => {
  const name = req.body.name;
  const artistId = req.body.artist_id;

  try {
    const album = await new Album({
      name: name,
      artist_id: artistId,
    }).save();

    return res.json({
      status: 1,
      message: "success",
      artistId,
    });
  } catch (error) {
    return next(error);
  }
};
