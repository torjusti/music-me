import express from 'express';
import { check } from 'express-validator/check';

import { del } from './delete';
import { find } from './get';
import { findAll } from './getAll';
import { make } from './post';
import { edit } from './put';

export const router = express.Router();

router.delete(
  '/:id',
  [
    check('id').isInt({
      min: 0,
      allow_leading_zeroes: false,
    }),
  ],
  del,
);

router.get(
  '/:id',
  [
    check('id').isInt({
      min: 0,
      allow_leading_zeroes: false,
    }),
  ],
  find,
);

router.get(
  '/',
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
  findAll,
);

router.post(
  '/',
  [
    check('title')
      .isString()
      .isLength({ min: 1, max: 100 }),
    check('artist')
      .isString()
      .isLength({ min: 1, max: 100 }),
    check('album')
      .isString()
      .isLength({ min: 1, max: 100 }),
    check('genre')
      .isString()
      .isLength({ min: 1, max: 100 }),
    check('description').isString(),
    check('rating')
      .isInt()
      .optional(),
  ],
  make,
);

router.put(
  '/:id',
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
  edit,
);
