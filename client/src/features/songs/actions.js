/**
 * Action which eventually sends a rating for a song to the server.
 */
export const sendSongRating = (id, rating) => ({
  type: 'SEND_SONG_RATING',
  payload: { id, rating },
});

export const addSong = song => ({
  type: 'ADD_SONG',
  payload: { song },
});

export const updateSong = (id, song) => ({
  type: 'UPDATE_SONG',
  payload: { id, song },
});
