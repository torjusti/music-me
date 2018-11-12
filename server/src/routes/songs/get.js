import { validationResult } from 'express-validator/check';
import { Song } from '../../models';

/**
 * Handle the retrieval of a specific song.
 */
const find = async (req, res, next) => {
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
};

export default find;