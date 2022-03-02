const { Editor } = require("../models/editor");

module.exports.get = async (req, res, next) => {
  const language = req.query.language;
  const period = req.query.period;
  const group = req.query.group;

  const filterWith = {};

  if (language) {
    filterWith.language = language;
  }

  if (period) {
    filterWith.period = period;
  }

  if (group) {
    filterWith.group = group;
  }

  if (Object.keys(filterWith).length == 0) {
    return next(new Error("give some query"));
  }

  try {
    const editorChoice = await Editor.find(filterWith)
      .populate({
        path: "song_list",
        select: "-createdAt -updatedAt -__v",
        populate: [
          {
            path: "album_id",
            select: ["name", "cover_source", "translation_name"],
          },
          {
            path: "artist_id",
            select: ["name", "image_source", "translation_name"],
          },
        ],
      })
      .select("-createdAt -updatedAt -__v")
      .exec();

    return res.json({
      status: 1,
      message: "success",
      data: editorChoice,
    });
  } catch (error) {
    return next(error);
  }
};
