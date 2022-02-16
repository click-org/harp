const mongoose = require("mongoose");

const editorSchema = new mongoose.Schema(
  {
    song_list: [{ type: mongoose.Types.ObjectId, ref: "song" }],
    language: { type: String },
    group: { type: String, required: true },
    period: { type: String, required: true },
  },
  { timestamps: true }
);

editorSchema.index({ language: 1, group: 1, period: 1 }, { unique: true });

module.exports.Editor = mongoose.model("editor", editorSchema);
