export const setGenreSelected = (genre, selected) => ({
  type: 'SET_SELECTED_GENRE',
  payload: {
    genre,
    selected,
  },
});
