const express = require("express");
const { json } = require("body-parser");
const env = require("dotenv");
const mongoose = require("mongoose");

const admin = require("firebase-admin");

const songRoute = require("./routes/admin/song");
const artistRoute = require("./routes/admin/artist");
const albumRoute = require("./routes/admin/album");

env.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(json({ limit: "10mb" }));
app.use("/api/v1/admin/song", songRoute);
app.use("/api/v1/admin/artist", artistRoute);
app.use("/api/v1/admin/album", albumRoute);

app.use((error, req, res, next) => {
  return res.json({
    status: error.status,
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
