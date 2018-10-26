import express from 'express';
import bodyParser from 'body-parser';
import { Song } from './models';

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Started server at port', port);
});

//Create a song
app.post('/songs', (req, res) => {
  Song.sync().then(() =>
    Song.create({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      genre: req.body.genre,
    }).then(mod => res.status(201).json(mod.dataValues))
  );
});

//Get all songs
app.get('/songs', (req, res) => {
  Song.sync().then(() =>
    Song.findAll().then(songs => res.status(200).json(songs))
  );
});

//Get a song by Id
app.get('/songs/:songId', (req, res) => {
  Song.sync().then(() =>
    Song.findById(req.params.songId).then(song => res.status(200).json(song))
  );
});

//Update a song by Id
app.put('/songs/:songId', (req, res) => {
  Song.sync().then(() =>
    Song.update(
      {
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        genre: req.body.genre,
      },
      {
        where: { id: req.params.songId },
      }
    ).then(row => res.status(200).json())
  );
});

//Delete a song by Id
app.delete('/songs/:songId', (req, res) => {
  Song.sync().then(() => {
    Song.destroy({
      where: { id: req.params.songId },
    }).then(() => res.status(204).json());
  });
});
