import express from 'express';
import bodyParser from 'body-parser';
import { Song } from './models';

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 8000;

const synchronizeDatabase = async () => {
  await Song.sync();
};

synchronizeDatabase().then(() => {
  app.listen(port, () => {
    console.log('Started server at port', port);
  });
});

// Create a song
app.post('/songs', async (req, res) => {
  const model = await Song.create({
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    gnere: req.body.genre,
  });

  res.status(201).json(model.dataValues);
});

// Get all songs
app.get('/songs', async (req, res) => {
  const songs = await Song.findAll();
  res.status(200).json(songs);
});

// Get a specific song
app.get('/songs/:id', async (req, res) => {
  const song = await Song.findById(req.params.id);
  res.status(200).json(song);
});

// Update a specific song
app.put('/songs/:id', async (req, res) => {
  const song = await Song.findById(req.params.id);

  const updated = {
    title: req.body.title || song.dataValues.title,
    artist: req.body.artist || song.dataValues.artist,
    album: req.body.album || song.dataValues.album,
    genre: req.body.genre || song.dataValues.genre,
  };

  await Song.update(updated, {
    where: { id: req.params.id },
  });

  res.status(200).json();
});

// Delete a specific song
app.delete('/songs/:id', async (req, res) => {
  await Song.destroy({
    where: { id: req.params.id },
  });

  res.status(204).json();
});
