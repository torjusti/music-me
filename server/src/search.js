import lunr from 'lunr';
import { Song } from './models';

let index;

/**
 * Take all the songs stored and create an index on them used
 * for searching. The index can be used multiple times, but needs
 * to be entirely recomputed when updating song information. The
 * index is recomputed asynchronously in the background.
 */
export const recomputeIndex = async () => {
  const songs = await Song.findAll();

  index = lunr(function() {
    this.ref('id');

    this.field('title');
    this.field('artist');
    this.field('album');
    this.field('genre');

    songs.forEach(song => {
      this.add(song);
    });
  });
};

// Search using the computed index.
export const search = query => index.search(query);
