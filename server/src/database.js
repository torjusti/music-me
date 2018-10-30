import Sequelize from 'sequelize';

// Create a simple SQLite database which resides in the root directory.
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../database.sqlite',
});

export default sequelize;
