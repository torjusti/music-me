import { Genre, Song } from './models';
import { synchronizeDatabase } from './models';
import unique from 'lodash/uniq';

const songs = [
  {
    title: 'Antitaxi',
    album: 'Psycho Tropical Berlin',
    artist: 'La Femme',
    genre: 'Pop',
    description:
      'A song by the french psycho-punk rock group La Femme about taking the bus instead of taxies.',
  },

  {
    title: 'Amour dans le motu',
    album: 'Psycho Tropical Berlin',
    artist: 'La Femme',
    genre: 'Pop',
    description:
      'A song by the french psysco-punk rock group La Femme about Vietnam and some other things.',
    rating: 2,
  },

  {
    title: 'La Femme',
    album: 'Psycho Tropical Berlin',
    artist: 'La Femme',
    genre: 'Pop',
    description:
      'A song by the french psysco-punk rock group La Femme about something. Quite hard to understand when the songs are in french.',
  },

  {
    title: 'Hypsoline',
    album: 'Psycho Tropical Berlin',
    artist: 'La Femme',
    genre: 'Pop',
    description:
      'Another song from this album. I hate writing long descriptions.',
    rating: 2,
  },

  {
    title: 'Sur la planche 2013',
    album: 'Psycho Tropical Berlin',
    artist: 'La Femme',
    genre: 'Pop',
    description:
      'A quite colorful song, by french psyco-punk rock group La Femme.',
  },

  {
    title: "It's time to wake up 2023",
    album: 'Psycho Tropical Berlin',
    artist: 'La Femme',
    genre: 'Pop',
    description:
      'Yet another song from this album. I guess they have been sleeping for 10 years now, or something.',
    rating: 5,
  },

  {
    title: 'Jungelknugen',
    album: 'Jungelknugen',
    artist: 'Todd Terje',
    genre: 'Electro',
    description:
      'A song which never really ends, instead it just has drop after drop. Sounds quite trippy.',
  },

  {
    title: 'Put Me Thru',
    album: 'Malibu',
    artist: 'Anderson .Paak',
    genre: 'RnB',
    description:
      'A really chill and nice song from Mr .Paak here. Cool guy, this dude. Album coming soon.',
    rating: 3,
  },

  {
    title: 'San Fransisco',
    album: 'San Fransisco',
    artist: 'Scott McKenzie',
    genre: 'Soft rock',
    description:
      'A really chill and nice song from Mr .Paak here. Cool guy, this dude. Album coming soon.',
  },

  {
    title: 'San Fransisco',
    album: 'San Fransisco',
    artist: 'Scott McKenzie',
    genre: 'Soft rock',
    description:
      "A song for if you're coming to San Fransisco - be sure to wear flowers in your hair!",
    rating: 1,
  },

  {
    title: 'Peaches En Regalia',
    album: 'Hot Rats',
    artist: 'Frank Zappa',
    genre: 'Progressive rock',
    description:
      "Super funky instrumental from Frank Zappa himself. I like Frank Zappa, though he probably doesn't like me.",
  },

  {
    title: 'High (feat. Elton John)',
    album: 'On The Rvn',
    artist: 'Young Thug',
    genre: 'Hip-Hop',
    description:
      'Thugger is an incredibly loveable guy, and when paired with Elton John, this song is simply genius. Really brings you back.',
    rating: 5,
  },

  {
    title: 'Livet er for kjipt',
    album: 'Livet er for kjipt',
    artist: 'Lars Kilevold',
    genre: 'Music for kids',
    description:
      'Music for kids, and students alike. This is the most relatable song we know, by far.',
  },

  {
    title: 'Love Is Everywhere',
    album: 'Village of the Pharoahs',
    artist: 'Pharoah Sanders',
    genre: 'Jazz',
    description:
      'Some really nice jazz by Pharoah Sanders, about love and how love is everywhere, probably.',
    rating: 5,
  },

  {
    title: 'All I Want For Christmas',
    album: 'All I Want For Christmas',
    artist: 'Casiokids',
    genre: 'Electro',
    description:
      'Nice christmas electro, from the Norwegian elecro group Casiokids. This is the original, only better!',
    rating: 4,
  },

  {
    title: 'Aquemini',
    album: 'Aquemini',
    artist: 'OutKast',
    genre: 'Hip-Hop',
    description:
      'One of the best tracks by the world-renown hip-hop group OutKast. The verse by Andre 3000 here is fantastic.',
  },

  {
    title: 'Burn',
    album: 'Halcyon Days',
    artist: 'Ellie Goulding',
    genre: 'Electro',
    description:
      'Ellie Goulding continues to impress with one of her greatest hits in Halcyon Days.',
    rating: 1,
  },

  {
    title: 'The City',
    album: 'Adventure (Deluxe)',
    artist: 'Madeon',
    genre: 'Electro',
    description:
      'This was an extended play by Madeon. This was released on 27 August 2012. It contains uncredited vocals from Zak Waters and Cass Lowe.',
  },

  {
    title: 'Shame, Shame, Shame',
    album: 'The Very Best of Jimmy Reed',
    artist: 'Jimmy Reed',
    genre: 'Blues Rock',
    description:
      'One of Jimmy Reeds greatest hits. This was originally released in 1976',
    rating: 3,
  },

  {
    title: 'Fly By Night',
    album: 'Fly By Night',
    artist: 'Broiler',
    genre: 'House',
    description:
      'This debuted together with the album and was also the most popular among the songs in the album.',
  },
  {
    title: 'Ocean Man',
    album: 'The Mollusk',
    artist: 'Ween',
    genre: 'Indie',
    description:
      'Ocean man, take me by the hand, lead me to the land that you understand. \n Ocean man, the voyage to the corner of the globe is a real trip.',
  },
  {
    title: 'All Star',
    album: 'Astro Lounge',
    artist: 'Smash Mouth',
    genre: 'Indie',
    description: 'Grammy Award for best pop-performance by duo or group',
  },
  {
    title: 'All Star',
    album: 'Astro Lounge',
    artist: 'Smash Mouth',
    genre: 'Indie',
    description: 'Grammy Award for best pop-performance by duo or group',
  },
  {
    title: 'Tri Poloski',
    album: 'Tri Poloski',
    artist: 'Davay',
    genre: 'Electro',
    description: 'The official Adidas anthem.',
  },
  {
    title: "Running in the 90's",
    album: 'Inital D',
    artist: 'Alan Ford',
    genre: 'Electro',
    description:
      "Gas gas gas! I'm gonna step on the gas! Tonight I'll fly! And be your lover! Yeah yeah yeah! I'll be so quick as a flash! And I'll be your hero!",
  },
  {
    title: 'Shallow Waters',
    album: 'Shallow Waters',
    artist: 'Sonny Alven & Jarand',
    genre: 'House',
    description:
      'This was published in 2014 with Sonny Alven as the original artist.',
    rating: 4,
  },
];

// Create database tables if they do not already exist, then populate the database
// using data from the above list.
synchronizeDatabase().then(async () => {
  // Destroy all previous songs.
  await Song.destroy({
    where: {},
    truncate: true,
  });

  // Destroy all previous genres.
  await Genre.destroy({
    where: {},
    truncate: true,
  });

  // Create all songs.
  songs.forEach(song => {
    Song.create(song);
  });

  // Find all unique genres in the list above, and
  // create genres for each of these.
  unique(songs.map(song => song.genre)).forEach(genre => {
    Genre.create({
      genre,
    });
  });
});
