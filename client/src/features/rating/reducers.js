const initialState = {
  ratingEnabled: false,
  selectedRating: 1,
};

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
