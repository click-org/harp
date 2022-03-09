const mongoose = require("mongoose");

const songRequestSchema = new mongoose.Schema(
  {
    song_name: { type: String, required: true },
    artist_name: { type: String },
    album_name: { type: String },
  },
  { timestamps: true }
);

module.exports.SongRequest = mongoose.model("song_request", songRequestSchema);
