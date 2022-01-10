const { Album } = require("../../models/album");

module.exports.create = async (req, res, next) => {
  const name = req.body.name;
  const artistId = req.body.artist_id;
  const coverSource = req.body.cover_source;
  const translationName = req.body.translation_name;

  try {
    const album = await new Album({
      name: name,
      artist_id: artistId,
      cover_source: coverSource,
      translation_name: translationName,
    }).save();

    return res.json({
      status: 1,
      message: "success",
      data: album,
    });
  } catch (error) {
    return next(error);
  }
};
