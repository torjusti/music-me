import express from 'express';
import { check, validationResult } from 'express-validator/check';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Song } from './models';
import { recomputeIndex, search } from './search';

// The number of songs to show on a single page.
const PAGE_SIZE = 2;

const app = express();

// Allow cross-origin resource sharing.
app.use(cors());

// Used for parsing JSON data using Express.
app.use(bodyParser.json());

// Handle errors. This is a middleware which needs to
// be added last, after all other middlewares.
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json();
})

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
app.post('/songs', [
  check('title').isString(),
  check('artist').isString(),
  check('album').isString(),
  check('genre').isString(),
  check('description').isString(),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let model;

  try {
    model = await Song.create({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      genre: req.body.genre,
      description: req.body.description,
    });
  } catch (error) {
    next(error);
  }

  // Recompute the search index in the background.
  recomputeIndex();

  res.status(201).json(model.dataValues);
});

// Get all songs
app.get('/songs', [
  check('page').isInt({
    min: 0,
    allow_leading_zeroes: false,
  }),
  check('search').isString().optional(),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const page = parseInt(req.query.page, 10);

  const searchQuery = req.query.search;

  let songs;

  try {
    if (searchQuery) {
      const result = search(
        // Strip all non-alphanumeric and space characters from the query, as
        // these are not handled by the search engine correctly.
        // See https://stackoverflow.com/questions/6053541/regex-every-non-alphanumeric-character-except-white-space-or-colon
        searchQuery.replace(/[^a-zA-Z\d\s]/g, ''),
      ).map(result => result.ref);

      songs = await Song.findAll({
        where: {
          id: result,
        },
      });
    } else {
      songs = await Song.findAll();
    }
  } catch (error) {
    next(error);
  }

  const result = {
    pages: Math.ceil(songs.length / PAGE_SIZE),
    songs: songs.slice(PAGE_SIZE * page, PAGE_SIZE * (page + 1)),
  };

  res.status(200).json(result);
});

// Get a specific song
app.get('/songs/:id', [
  check('id').isInt({
    min: 0,
    allow_leading_zeroes: false,
  }),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let song;

  try {
    song = await Song.findByPk(req.params.id);
  } catch (error) {
    next(error);
  }

  if (song) {
    res.status(200).json(song);
  } else {
    res.status(404).json();
  }
});

// Update a specific song
app.put('/songs/:id', [
  check('id').isInt({
    min: 0,
    allow_leading_zeroes: false,
  }),
  check('title').isString().optional(),
  check('artist').isString().optional(),
  check('album').isString().optional(),
  check('genre').isString().optional(),
  check('description').isString().optional(),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let song;
  
  try {
    song = await Song.findByPk(req.params.id);
  } catch (error) {
    next(error);
  }
  
  if (!song) {
    return res.status(422).json();
  }

  // Merge the provided data with the old song.
  const updated = {
    title: req.body.title || song.dataValues.title,
    artist: req.body.artist || song.dataValues.artist,
    album: req.body.album || song.dataValues.album,
    genre: req.body.genre || song.dataValues.genre,
    description: req.body.description || song.dataValues.description,
  };

  try {
    await Song.update(updated, {
      where: { id: req.params.id },
    });
  } catch (error) {
    next(error);
  }

  // Recompute the index in the background.
  recomputeIndex();

  res.status(200).json();
});

// Delete a specific song
app.delete('/songs/:id', [
  check('id').isInt({
    min: 0,
    allow_leading_zeroes: false,
  }),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    await Song.destroy({
      where: { id: req.params.id },
    });
  } catch (error) {
    next(error);
  }

  // Recompute the index in the background.
  recomputeIndex();

  res.status(204).json();
});