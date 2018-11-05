const selectedRating = (state = 1, action) => {
  switch (action.type) {
    case 'SET_SELECTED_RATING':
      return action.payload.selectedRating;

    default:
      return state;
  }
};

export default selectedRating;
