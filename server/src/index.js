import express from 'express';
import { check, validationResult } from 'express-validator/check';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Genre, Song, synchronizeDatabase } from './models';
import { recomputeIndex, search } from './search';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

// The number of songs to show on a single page.
const PAGE_SIZE = 5;

const app = express();

// Allow cross-origin resource sharing.
app.use(cors());

// Used for parsing JSON data using Express.
app.use(bodyParser.json());

// Handle errors. This is a middleware which needs to
// be added last, after all other middlewares.
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json();
});

// Either run on the specified port, or default to 8000.
const port = process.env.PORT || 8000;

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
app.post(
  '/songs',
  [
    check('title').isString().isLength({ min: 1, max: 100 }),
    check('artist').isString().isLength({ min: 1, max: 100 }),
    check('album').isString().isLength({ min: 1, max: 100 }),
    check('genre').isString().isLength({ min: 1, max: 100 }),
    check('description').isString(),
    check('rating')
      .isInt()
      .optional(),
  ],
  async (req, res, next) => {
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
        rating: req.body.rating,
      });

      await Genre.findOrCreate({ where: { genre: req.body.genre } });
    } catch (error) {
      next(error);
    }

    // Recompute the search index in the background.
    recomputeIndex();

    res.status(201).json(model.dataValues);
  },
);

app.post(
  '/songs/rate',
  [
    check('id').isInt({
      min: 0,
      allow_leading_zeroes: false,
    }),
    check('rating').isInt({
      min: 1,
      max: 5,
      allow_leading_zeroes: false,
    }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let song;
    try {
      song = await Song.findByPk(req.body.id);
    } catch (error) {
      next(error);
    }

    if (!song) {
      return res.status(422).json();
    }

    try {
      await Song.update(
        {
          rating: parseInt(req.body.rating, 10),
        },
        {
          where: {
            id: {
              [Op.eq]: req.body.id,
            },
          },
        },
      );
    } catch (error) {
      next(error);
    }

    res.status(200).json();
  },
);

// Get all songs
app.get(
  '/songs',
  [
    check('page').isInt({
      min: 0,
      allow_leading_zeroes: false,
    }),
    check('search')
      .isString()
      .optional(),
    check('selectedGenres')
      .custom(value => {
        return (
          typeof value === 'string' ||
          (Array.isArray(value) &&
            value.every(entry => typeof entry === 'string'))
        );
      })
      .optional(),
    check('selectedRating')
      .isInt()
      .optional(),
    check('orderBy')
      .isString()
      .optional(),
    check('isAsc')
      .isBoolean()
      .optional(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const page = parseInt(req.query.page, 10);
    const searchQuery = req.query.search;
    let selectedGenres = req.query.selectedGenres;
    selectedGenres = selectedGenres
      ? Array.isArray(selectedGenres)
        ? selectedGenres
        : [selectedGenres]
      : [];
    const orderBy = req.query.orderBy;
    const isAsc = req.query.isAsc === 'true';

    let songs;

    try {
      const where = {};
      const order = [];

      if (selectedGenres.length) {
        where.genre = {
          [Op.in]: selectedGenres,
        };
      }

      if (req.query.selectedRating) {
        where.rating = {
          [Op.gte]: req.query.selectedRating,
        };
      }

      if (searchQuery) {
        where.id = {
          [Op.in]: search(
            // Strip all non-alphanumeric and space characters from the query, as
            // these are not handled by the search engine correctly.
            // See https://stackoverflow.com/questions/6053541/regex-every-non-alphanumeric-character-except-white-space-or-colon
            searchQuery.replace(/[^a-zA-Z\d\s]/g, ''),
          ).map(result => result.ref),
        };
      }

      if (orderBy) {
        order.push([orderBy, isAsc ? 'ASC' : 'DESC']);
      }

      songs = await Song.findAll({ where, order });
    } catch (error) {
      next(error);
    }

    const result = {
      pages: Math.ceil(songs.length / PAGE_SIZE),
      songs: songs.slice(PAGE_SIZE * page, PAGE_SIZE * (page + 1)),
    };

    res.status(200).json(result);
  },
);

// Get a specific song
app.get(
  '/songs/:id',
  [
    check('id').isInt({
      min: 0,
      allow_leading_zeroes: false,
    }),
  ],
  async (req, res, next) => {
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
  },
);

// Update a specific song
app.put(
  '/songs/:id',
  [
    check('id').isInt({
      min: 0,
      allow_leading_zeroes: false,
    }),
    check('title')
      .isString()
      .isLength({ min: 1, max: 100 })
      .optional(),
    check('artist')
      .isString()
      .isLength({ min: 1, max: 100 })
      .optional(),
    check('album')
      .isString()
      .isLength({ min: 1, max: 100 })
      .optional(),
    check('genre')
      .isString()
      .isLength({ min: 1, max: 100 })
      .optional(),
    check('description')
      .isString()
      .optional(),
    check('rating')
      .isInt()
      .optional(),
  ],
  async (req, res, next) => {
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
      rating: req.body.rating || song.dataValues.rating,
    };

    try {
      if (song) {
        const countGenre = await Song.count({
          where: {
            genre: {
              [Op.eq]: song.dataValues.genre,
            },
          },
        });

        // Remove the genre if this was the only song containing the genre.
        if (countGenre === 1) {
          await Genre.destroy({
            where: { genre: { [Op.eq]: song.dataValues.genre } },
          });
        }

        // Add the new genre if not already existing.
        Genre.findOrCreate({ where: { genre: req.body.genre } });
      }

      await Song.update(updated, {
        where: { id: { [Op.eq]: req.params.id } },
      });
    } catch (error) {
      next(error);
    }

    // Recompute the index in the background.
    recomputeIndex();

    res.status(200).json();
  },
);

// Delete a specific song
app.delete(
  '/songs/:id',
  [
    check('id').isInt({
      min: 0,
      allow_leading_zeroes: false,
    }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      const song = await Song.findByPk(req.params.id);

      if (song) {
        const countGenre = await Song.count({
          where: { genre: { [Op.eq]: song.dataValues.genre } },
        });

        // If it only exists one song instance with the genre
        if (countGenre === 1) {
          // remove the genre
          await Genre.destroy({
            where: { genre: { [Op.eq]: song.dataValues.genre } },
          });
        }
      }

      await Song.destroy({
        where: { id: { [Op.eq]: req.params.id } },
      });
    } catch (error) {
      next(error);
    }

    // Recompute the index in the background.
    recomputeIndex();

    res.status(204).json();
  },
);

// Get all genres
app.get('/genres', async (req, res, next) => {
  let genres;
  try {
    genres = await Genre.findAll();
  } catch (error) {
    next(error);
  }

  res.status(200).json(genres);
});
