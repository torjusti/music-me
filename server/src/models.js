import Sequelize from 'sequelize';
import sequelize from './database';

/**
 * The database model for songs.
 */
export const Song = sequelize.define('song', {
  title: Sequelize.STRING,
  artist: Sequelize.STRING,
  album: Sequelize.STRING,
  genre: Sequelize.STRING,
  description: Sequelize.STRING,
  rating: Sequelize.INTEGER,
});

/**
 * The database model for genres.
 */
export const Genre = sequelize.define('genre', {
  genre: Sequelize.STRING,
});

/**
 * Create database tables on application start
 * if they do not already exist.
 */
export const synchronizeDatabase = async () => {
  await Song.sync();
  await Genre.sync();
};
