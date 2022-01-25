const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image_source: { type: String, required: true },
    translation_name: { type: String },
  },
  { timestamps: true }
);

artistSchema.index(
  { name: "text", translation_name: "text" },
  { sparse: true, default_language: "none" }
);

module.exports.Artist = mongoose.model("artist", artistSchema);
