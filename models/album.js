const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    artist_id: { type: mongoose.Types.ObjectId, ref: "artist" },
    cover_source: { type: String, required: true },
    translation_name: { type: String },
  },
  { timestamps: true }
);

albumSchema.index({ name: "text", translation_name: "text" }, { sparse: true });

module.exports.Album = mongoose.model("album", albumSchema);
