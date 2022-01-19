const mongoose = require("mongoose");
const { Album } = require("../../models/album");
const { Song } = require("../../models/song");

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

module.exports.remove = async (req, res, next) => {
  const albumId = req.params.album_id;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await Album.findByIdAndDelete(albumId).session(session);
    await Song.deleteMany({ album_id: albumId }).session(session);

    await session.commitTransaction();
    session.endSession();

    return res.json({
      status: 1,
      message: "success",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.edit = async (req, res, next) => {
  const albumId = req.params.album_id;
  const name = req.body.name;
  const coverSource = req.body.cover_source;
  const artistId = req.body.artist_id;

  let updateFields;
  if (name) {
    updateFields.name = name;
  }

  if (coverSource) {
    updateFields.cover_source = coverSource;
  }

  if (artistId) {
    updateFields.artist_id = artistId;
  }

  if (!updateFields) {
    return next(new Error("need update field"));
  }

  try {
    const album = await Album.findByIdAndUpdate(albumId, updateFields).exec();

    return res.json({
      status: 1,
      message: "success",
      data: album,
    });
  } catch (error) {
    return next(error);
  }
};
