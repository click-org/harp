const mongoose = require("mongoose");

const editorSchema = new mongoose.Schema(
  {
    song_list: { type: [mongoose.Types.ObjectId] },
    language: { type: String },
    group_type: { type: String, required: true },
    period: { type: String, required: true },
  },
  { timestamps: true }
);

editorSchema.index({ language: 1, type: 1, period: 1 }, { unique: true });

module.exports.Editor = mongoose.model("editor", editorSchema);
