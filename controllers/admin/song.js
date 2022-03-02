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
  const lyric = req.body.lyric;
  const track = req.body.track;
  const releaseDate = req.body.release_date;

  try {
    const docExist = await Song.exists({ title: title, artist_id: artistId });

    if (docExist) {
      return next(new Error("song has already added"));
    } else {
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
        lyric: lyric,
        track: track,
        release_date: releaseDate,
      }).save();

      return res.json({
        status: 1,
        message: "success",
        data: song,
      });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports.remove = async (req, res, next) => {
  const songId = req.params.song_id;

  try {
    await Song.findByIdAndDelete(songId).exec();
    return res.json({
      status: 1,
      message: "success",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.edit = async (req, res, next) => {
  const songId = req.params.song_id;
  const albumId = req.body.album_id;
  const artistId = req.body.artist_id;
  const title = req.body.title;
  const translationTitle = req.body.translation_title;
  const genre = req.body.genre;
  const language = req.body.language;
  const source = req.body.source;
  const coverSource = req.body.cover_source;
  const featuredArtist = req.body.featured_artist;
  const track = req.body.track;
  const lyric = req.body.lyric;
  const releaseDate = req.body.release_date;

  const updateFields = {};
  if (albumId) {
    updateFields.album_id = albumId;
  }

  if (artistId) {
    updateFields.artist_id = artistId;
  }

  if (title) {
    updateFields.title = title;
  }

  if (translationTitle) {
    updateFields.translation_title = translationTitle;
  }

  if (genre) {
    updateFields.genre = genre;
  }

  if (language) {
    updateFields.language = language;
  }

  if (featuredArtist) {
    updateFields.featured_artist = featuredArtist;
  }

  if (source) {
    updateFields.source = source;
  }

  if (coverSource) {
    updateFields.cover_source = coverSource;
  }

  if (track) {
    updateFields.track = track;
  }

  if (lyric) {
    updateFields.lyric = lyric;
  }

  if (releaseDate) {
    updateFields.release_date = releaseDate;
  }

  if (Object.keys(updateFields).length == 0) {
    return next(new Error("need update field"));
  }

  try {
    const song = await Song.findByIdAndUpdate(songId, updateFields, {
      new: true,
    }).exec();

    return res.json({
      status: 1,
      message: "success",
      data: song,
    });
  } catch (error) {
    return next(error);
  }
};
