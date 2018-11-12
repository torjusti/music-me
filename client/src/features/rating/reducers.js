const initialState = {
  // Whether or not sorting based on rating is enabled.
  ratingEnabled: false,
  // Only songs with ratings greater than or equal to this value are shown.
  selectedRating: 1,
};

/**
 * Reducer which handles the client-side rating filtering logic.
 */
const rating = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_RATING':
      return { ...state, selectedRating: action.payload.selectedRating };

    case 'TOGGLE_RATING_ENABLED':
      return { ...state, ratingEnabled: !state.ratingEnabled };

    default:
      return state;
  }
};

export default rating;
