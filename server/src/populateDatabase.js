import { Genre, Song } from './models';
import { synchronizeDatabase } from './models';
import unique from 'lodash/uniq';

const songs = [
  {
    title: 'Antitaxi',
    album: 'Psycho Tropical Berlin',
    artist: 'La Femme',
    genre: 'Pop',
    description: 'A song by the french psycho-punk rock group La Femme about taking the bus instead of taxies.',
  },

  {
    title: 'Amour dans le motu',
    album: 'Psycho Tropical Berlin',
    artist: 'La Femme',
    genre: 'Pop',
    description: 'A song by the french psysco-punk rock group La Femme about Vietnam and some other things.',
  },

  {
    title: 'La Femme',
    album: 'Psycho Tropical Berlin',
    artist: 'La Femme',
    genre: 'Pop',
    description: 'A song by the french psysco-punk rock group La Femme about something. Quite hard to understand when the songs are in french.',
  },

  {
    title: 'Hypsoline',
    album: 'Psycho Tropical Berlin',
    artist: 'La Femme',
    genre: 'Pop',
    description: 'Another song from this album. I hate writing long descriptions.',
  },

  {
    title: 'Sur la planche 2013',
    album: 'Psycho Tropical Berlin',
    artist: 'La Femme',
    genre: 'Pop',
    description: 'A quite colorful song, by french psyco-punk rock group La Femme.',
  },

  {
    title: 'It\'s time to wake up 2023',
    album: 'Psycho Tropical Berlin',
    artist: 'La Femme',
    genre: 'Pop',
    description: 'Yet another song from this album. I guess they have been sleeping for 10 years now, or something.',
  },

  {
    title: 'Jungelknugen',
    album: 'Jungelknugen',
    artist: 'Todd Terje',
    genre: 'Electro',
    description: 'A song which never really ends, instead it just has drop after drop. Sounds quite trippy.',
  },

  {
    title: 'Put Me Thru',
    album: 'Malibu',
    artist: 'Anderson .Paak',
    genre: 'RnB',
    description: 'A really chill and nice song from Mr .Paak here. Cool guy, this dude. Album coming soon.',
  },

  {
    title: 'San Fransisco',
    album: 'San Fransisco',
    artist: 'Scott McKenzie',
    genre: 'Soft rock',
    description: 'A really chill and nice song from Mr .Paak here. Cool guy, this dude. Album coming soon.',
  },

  {
    title: 'San Fransisco',
    album: 'San Fransisco',
    artist: 'Scott McKenzie',
    genre: 'Soft rock',
    description: 'A song for if you\'re coming to San Fransisco - be sure to wear flowers in your hair!',
  },

  {
    title: 'Peaches En Regalia',
    album: 'Hot Rats',
    artist: 'Frank Zappa',
    genre: 'Progressive rock',
    description: 'Super funky instrumental from Frank Zappa himself. I like Frank Zappa, though he probably doesn\'t like me.',
  },

  {
    title: 'High (feat. Elton John)',
    album: 'On The Rvn',
    artist: 'Young Thug',
    genre: 'Hip-Hop',
    description: 'Thugger is an incredibly loveable guy, and when paired with Elton John, this song is simply genius. Really brings you back.',
  },

  {
    title: 'Livet er for kjipt',
    album: 'Livet er for kjipt',
    artist: 'Lars Kilevold',
    genre: 'Music for kids',
    description: 'Music for kids, and students alike. This is the most relatable song we know, by far.',
  },

  {
    title: 'Love Is Everywhere',
    album: 'Village of the Pharoahs',
    artist: 'Pharoah Sanders',
    genre: 'Jazz',
    description: 'Some really nice jazz by Pharoah Sanders, about love and how love is everywhere, probably.',
  },

  {
    title: 'All I Want For Christmas',
    album: 'All I Want For Christmas',
    artist: 'Casiokids',
    genre: 'Electro',
    description: 'Nice christmas electro, from the Norwegian elecro group Casiokids. This is the original, only better!',
  },

  {
    title: 'Aquimini',
    album: 'Aquimini',
    artist: 'OutKast',
    genre: 'Hip-Hop',
    description: 'One of the best tracks by the world-renown hip-hop group OutKast. The verse by Andre 3000 here is fantastic.',
  },
];


// Create database tables if they do not already exist, then populate the database.
synchronizeDatabase().then(async () => {
  await Song.destroy({
    where: {},
    truncate: true,
  });

  await Genre.destroy({
    where: {},
    truncate: true,
  });

  songs.forEach(song => {
    Song.create(song);
  });
  
  unique(songs.map(song => song.genre)).forEach(genre => {
    Genre.create({
      genre,
    });
  });
});
