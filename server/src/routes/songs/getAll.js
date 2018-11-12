import Sequelize from 'sequelize';
import { validationResult } from 'express-validator/check';
import { Song } from '../../models';
import { search } from '../../search';

const Op = Sequelize.Op;

// The number of songs to show on a single page.
const PAGE_SIZE = 5;

/**
 * Retrieve all songs from the database.
 */
const getAll = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // The page in the table to return.
  const page = parseInt(req.query.page, 10);
  // The current search query, if any.
  const searchQuery = req.query.search;
  // The selected genres. Can be undefined, a list, or just a single
  // value, so we need to normalize this before using it.
  let selectedGenres = req.query.selectedGenres;
  selectedGenres = selectedGenres
    ? Array.isArray(selectedGenres)
      ? selectedGenres
      : [selectedGenres]
    : [];
  // The column to order by.
  const orderBy = req.query.orderBy;
  // Whether or not we are sorting ascendingly.
  const isAsc = req.query.isAsc === 'true';

  let songs;

  try {
    // Construct the objects which will be passed on to Sequelize.
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
    // Paginate the results by slicing the array of results.
    songs: songs.slice(PAGE_SIZE * page, PAGE_SIZE * (page + 1)),
  };

  res.status(200).json(result);
};

export default getAll;