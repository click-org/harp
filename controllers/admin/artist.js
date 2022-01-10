const { Artist } = require("../../models/artist");

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
