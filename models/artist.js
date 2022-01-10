const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image_source: { type: String, required: true },
    translation_name: { type: String },
  },
  { timestamps: true }
);

module.exports.Artist = mongoose.model("artist", artistSchema);
