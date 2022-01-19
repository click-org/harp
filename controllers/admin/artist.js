const mongoose = require("mongoose");

const { Artist } = require("../../models/artist");
const { Album } = require("../../models/album");
const { Song } = require("../../models/song");

module.exports.create = async (req, res, next) => {
  const name = req.body.name;
  const translationName = req.body.translation_name;
  const imageSource = req.body.image_source;

  try {
    const artist = await new Artist({
      name: name,
      image_source: imageSource,
      translation_name: translationName,
    }).save();

    return res.json({
      status: 1,
      message: "success",
      data: artist,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.remove = async (req, res, next) => {
  const artistId = req.params.artist_id;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await Artist.findByIdAndDelete(artistId).session(session);
    await Album.deleteMany({ artist_id: artistId }).session(session);
    await Song.deleteMany({ artist_id: artistId }).session(session);

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
  const artistId = req.params.artist_id;
  const name = req.body.name;
  const imageSource = req.body.image_source;
  const translationName = req.body.translation_name;

  const updateFields = {};

  if (name) {
    updateFields.name = name;
  }

  if (imageSource) {
    updateFields.image_source = imageSource;
  }

  if (translationName) {
    updateFields.translation_name = translationName;
  }

  if (updateFields == {}) {
    return next(new Error("need update field"));
  }

  try {
    const artist = await Artist.findByIdAndUpdate(
      artistId,
      updateFields
    ).exec();

    return res.json({
      status: 1,
      message: "success",
      data: artist,
    });
  } catch (error) {
    return next(error);
  }
};
