const song = (state = {}, action) => {
  switch (action.type) {
    case 'RATE_SONG':
      if (state.id !== action.payload.id) {
        return state;
      }

      return { ...state, rating: action.payload.rating };

    default:
  }
};

const songs = (state = [], action) => {
  switch (action.type) {
    case 'SET_SONGS':
      return action.payload.songs;

    case 'RATE_SONG':
      return state.map(entry => song(entry, action));

    case 'SET_PAGE':
      return [];

    default:
      return state;
  }
};

export default songs;
