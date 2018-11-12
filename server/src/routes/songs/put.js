import { validationResult } from 'express-validator/check';
import { Song, Genre } from '../../models';
import { recomputeIndex } from '../../search';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

// Update a specific song
export const edit = async (req, res, next) => {
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
      await Genre.findOrCreate({ where: { genre: updated.genre } });
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
};
