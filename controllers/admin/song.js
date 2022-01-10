const { Song } = require("../../models/song");

module.exports.create = async (req, res, next) => {
  const title = req.body.title;
  const albumId = req.body.album_id;
  const artistId = req.body.artist_id;
  const featuredArtist = req.body.featured_artist;
  const genre = req.body.genre;
  const language = req.body.language;
  const source = req.body.source;
  const coverSource = req.body.cover_source;
  const translationTitle = req.body.translation_title;

  try {
    const song = await new Song({
      title: title,
      album_id: albumId,
      artist_id: artistId,
      featured_artist: featuredArtist,
      genre: genre,
      language: language,
      source: source,
      cover_source: coverSource,
      translation_title: translationTitle,
    }).save();

    return res.json({
      status: 1,
      message: "success",
      data: song,
    });
  } catch (error) {
    return next(error);
  }
};
