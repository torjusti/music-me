import Sequelize from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',

  // SQLite only
  storage: '../database.sqlite',

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false,
});

export default sequelize;
