const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload.genres;

    default:
      return state;
  }
};

export default genres;
