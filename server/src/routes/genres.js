import express from 'express';
import { Genre } from '../models';

export const router = express.Router();

// Get all genres
router.get('/', async (req, res, next) => {
  let genres;
  try {
    genres = await Genre.findAll();
  } catch (error) {
    next(error);
  }

  res.status(200).json(genres);
});
