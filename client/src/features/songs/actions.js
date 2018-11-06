export const sendSongRating = (id, rating) => ({
  type: 'SEND_SONG_RATING',
  payload: { id, rating },
});
