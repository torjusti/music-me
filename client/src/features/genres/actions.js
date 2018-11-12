/**
 * Sets the checkbox state for the provided genre.
 */
export const setGenreSelected = (genre, selected) => ({
  type: 'SET_SELECTED_GENRE',
  payload: {
    genre,
    selected,
  },
});
