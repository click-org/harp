const { Artist } = require("../../models/artist");

module.exports.create = async (req, res, next) => {
  const name = req.body.name;

  try {
    const artist = await new Artist({
      name: name,
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
