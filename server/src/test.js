const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',

  // SQLite only
  storage: '../database.sqlite',

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false,
});

const Song = sequelize.define('song', {
  title: Sequelize.STRING,
  artist: Sequelize.STRING,
  album: Sequelize.STRING,
});

sequelize
  .sync()
  .then(() =>
    Song.create({
      title: 'Derp',
      artist: 'Test',
      album: 'Testing',
    })
  )
  .then(jane => {
    console.log(jane.toJSON());
  });
