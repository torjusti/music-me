/**
 * Sets the lowest rating value that should be shown in the table.
 */
export const setRatingSelected = selectedRating => ({
  type: 'SET_SELECTED_RATING',
  payload: { selectedRating },
});

/**
 * Sets whether or not filtering based on rating is enabled.
 */
export const toggleRatingEnabled = () => ({
  type: 'TOGGLE_RATING_ENABLED',
});
