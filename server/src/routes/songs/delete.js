import { validationResult } from 'express-validator/check';
import { Song, Genre } from '../../models';
import { recomputeIndex } from '../../search';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

// Delete a specific song
export const del = async (req, res, next) => {
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
};
