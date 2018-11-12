import { validationResult } from 'express-validator/check';
import { Song, Genre } from '../../models';
import { recomputeIndex } from '../../search';

const post = async (req, res, next) => {
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
};

export default post;