const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    album_id: { type: mongoose.Types.ObjectId, ref: "album" },
    artist_id: { type: mongoose.Types.ObjectId, required: true, ref: "artist" },
    featured_artist: { type: String },
    genre: { type: [String], required: true },
    language: { type: String, required: true },
    view_count: { type: Number, default: 0 },
    source: { type: String, required: true },
    cover_source: { type: String },
    translation_title: { type: String },
    lyric: { type: String },
    track: { type: Number },
    release_date: { type: Date },
  },
  { timestamps: true }
);

songSchema.index({ view_count: 1 });
songSchema.index(
  { title: "text", translation_title: "text" },
  { sparse: true, default_language: "none", language_override: "none" }
);

module.exports.Song = mongoose.model("song", songSchema);
