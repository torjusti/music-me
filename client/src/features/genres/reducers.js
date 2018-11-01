const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload.genre;

    default:
      return state;
  }
};

export default genres;
