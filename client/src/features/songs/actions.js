/**
 * Action which eventually sends a rating for a song to the server.
 */
export const sendSongRating = (id, rating) => ({
  type: 'SEND_SONG_RATING',
  payload: { id, rating },
});
