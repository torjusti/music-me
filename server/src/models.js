import Sequelize from 'sequelize';
import sequelize from './database';

export const Song = sequelize.define('song', {
  title: Sequelize.STRING,
  artist: Sequelize.STRING,
  album: Sequelize.STRING,
  genre: Sequelize.STRING,
  description: Sequelize.STRING,
});
