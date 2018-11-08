export const setRatingSelected = selectedRating => ({
  type: 'SET_SELECTED_RATING',
  payload: {
    selectedRating,
  },
});

export const toggleRatingEnabled = () => ({
  type: 'TOGGLE_RATING_ENABLED',
});
