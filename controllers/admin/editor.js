const { Editor } = require("../../models/editor");

module.exports.create = async (req, res, next) => {
  const language = req.body.language;
  const period = req.body.period;
  const groupType = req.body.group_type;
  const songList = req.body.song_list;

  try {
    const editor = await new Editor({
      song_list: songList,
      language: language,
      group_type: groupType,
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
  const groupType = req.body.group_type;
  const songList = req.body.song_list;

  try {
    const updateFields = {};

    if (language) {
      updateFields.language = language;
    }

    if (period) {
      updateFields.period = period;
    }

    if (groupType) {
      updateFields.group_type = groupType;
    }

    if (songList) {
      updateFields.song_list = songList;
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
