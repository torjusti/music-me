import { Song } from '../../models';
import { check, validationResult } from 'express-validator/check';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

/**
 * Handle the rating of a song. 
 */
const rate = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let song;
  try {
    // Check if the song exists, error if it does not exist.
    song = await Song.findByPk(req.body.id);
  } catch (error) {
    next(error);
  }

  if (!song) {
    return res.status(422).json();
  }

  try {
    // Update the song with the new rating.
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
};

export default rate;