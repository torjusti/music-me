import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Song } from './models';
import { recomputeIndex, search } from './search';

const PAGE_SIZE = 2;

const app = express();

app.use(cors());

// Used for parsing JSON data using Express.
app.use(bodyParser.json());

// Either run on the specified port, or default to 8000.
const port = process.env.PORT || 8000;

/**
 * Create database tables on application start
 * if they do not already exist.
 */
const synchronizeDatabase = async () => {
  await Song.sync();
};

const initialize = async () => {
  // Create tables in the database.
  await synchronizeDatabase();

  // Create a search index from the database contents.
  await recomputeIndex();
};

/**
 * Initialize all dependencies and start the server.
 */
initialize().then(() => {
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
    genre: req.body.genre,
  });

  // Recompute the search index in the background.
  recomputeIndex();

  res.status(201).json(model.dataValues);
});

// Get all songs
app.get('/songs', async (req, res) => {
  const page = parseInt(req.query.page, 10);

  const searchQuery = req.query.search;

  let songs;

  if (searchQuery) {
    const result = search(searchQuery).map(result => result.ref);

    songs = await Song.findAll({
      where: {
        id: result,
      }
    });
  } else {
    songs = await Song.findAll();
  }

  const result = {
    pages: Math.ceil(songs.length / PAGE_SIZE),
    songs: songs.slice(PAGE_SIZE * page, PAGE_SIZE * (page + 1)),
  };

  res.status(200).json(result);
});

// Get a specific song
app.get('/songs/:id', async (req, res) => {
  const song = await Song.findByPk(req.params.id);
  res.status(200).json(song);
});

// Update a specific song
app.put('/songs/:id', async (req, res) => {
  const song = await Song.findByPk(req.params.id);

  // Merge the provided data with the old song.
  const updated = {
    title: req.body.title || song.dataValues.title,
    artist: req.body.artist || song.dataValues.artist,
    album: req.body.album || song.dataValues.album,
    genre: req.body.genre || song.dataValues.genre,
  };

  await Song.update(updated, {
    where: { id: req.params.id },
  });

  // Recompute the index in the background.
  recomputeIndex();

  res.status(200).json();
});

// Delete a specific song
app.delete('/songs/:id', async (req, res) => {
  await Song.destroy({
    where: { id: req.params.id },
  });

  // Recompute the index in the background.
  recomputeIndex();

  res.status(204).json();
});
