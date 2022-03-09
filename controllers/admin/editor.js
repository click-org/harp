const { Editor } = require("../../models/editor");

module.exports.create = async (req, res, next) => {
  const language = req.body.language;
  const period = req.body.period;
  const group = req.body.group;
  const songList = req.body.song_list;

  try {
    const editor = await new Editor({
      song_list: songList,
      language: language,
      group: group,
      period: period,
    }).save();

    return res.json({
      status: 1,
      message: "success",
      data: editor,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.edit = async (req, res, next) => {
  const id = req.params.id;
  const language = req.body.language;
  const period = req.body.period;
  const group = req.body.group;
  const songList = req.body.song_list;

  try {
    const updateFields = {};

    if (language) {
      updateFields.language = language;
    }

    if (period) {
      updateFields.period = period;
    }

    if (group) {
      updateFields.group = group;
    }

    if (songList) {
      updateFields.song_list = songList;
    }

    if (Object.keys(updateFields).length == 0) {
      return next(new Error("provide some fields"));
    }

    const editor = await Editor.findByIdAndUpdate(id, updateFields, {
      new: true,
    }).exec();

    return res.json({
      status: 1,
      message: "success",
      data: editor,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.remove = async (req, res, next) => {
  const id = req.params.id;

  try {
    await Editor.findByIdAndDelete(id).exec();

    return res.json({
      status: 1,
      message: "success",
    });
  } catch (error) {
    return next(error);
  }
};
