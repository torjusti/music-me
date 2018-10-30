const songs = (state = [], action) => {
  switch (action.type) {
    case 'SET_SONGS':
      return action.payload.songs;

    case 'SET_PAGE':
      return [];

    default:
      return state;
  }
};

export default songs;
