export const setGenreSelected = (genre, selected) => ({
  type: 'SET_GENRE_SELECTED',
  payload: {
    genre,
    selected,
  },
});
