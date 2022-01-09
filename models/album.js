const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    artist_id: { type: mongoose.Types.ObjectId, required: true, ref: "artist" },
  },
  { timestamps: true }
);

module.exports.Album = mongoose.model("album", albumSchema);
