const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports.Artist = mongoose.model("artist", artistSchema);
