import lunr from 'lunr';
import { Song } from './models';

let index;

export const recomputeIndex = async () => {
  const songs = await Song.findAll();

  index = lunr(function() {
    this.ref('id');

    this.field('title');
    this.field('artist');
    this.field('album');

    songs.forEach(song => {
      this.add(song);
    });
  });
};

export const search = query => index.search(query);
