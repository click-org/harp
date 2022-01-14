const express = require("express");
const { json } = require("body-parser");
const env = require("dotenv");
const mongoose = require("mongoose");

const admin = require("firebase-admin");

const songRoute = require("./routes/song");
const artistRoute = require("./routes/artist");
const albumRoute = require("./routes/album");

const adminSongRoute = require("./routes/admin/song");
const adminArtistRoute = require("./routes/admin/artist");
const adminAlbumRoute = require("./routes/admin/album");

env.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(json({ limit: "10mb" }));

app.use("/api/v1/song", songRoute);
app.use("/api/v1/artist", artistRoute);
app.use("/api/v1/album", albumRoute);
app.use("/api/v1/type", typeRoute);

app.use("/api/v1/admin/song", adminSongRoute);
app.use("/api/v1/admin/artist", adminArtistRoute);
app.use("/api/v1/admin/album", adminAlbumRoute);

app.use((error, req, res, next) => {
  return res.json({
    status: 0,
    detail: error.message,
  });
});

mongoose
  .connect(process.env.MONGODB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(process.env.FIREBASE_CONFIG)
      ),
    });
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
