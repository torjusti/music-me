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

const initialState = {
  loading: true,
  data: [],
};

const songs = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SONGS':
      return {
        ...state,
        loading: false,
        data: action.payload.songs,
      };

    case 'RATE_SONG':
      return { ...state, data: state.data.map(entry => song(entry, action)) };

    // Show the loading icon when loading new data. The actions here
    // are the ones which cause data to get loaded again.
    case 'FETCH_SONGS':
    case 'SET_PAGE':
    case 'SET_QUERY':
    case 'CLEAR_QUERY':
    case 'SET_SELECTED_GENRE':
    case 'SET_SELECTED_RATING':
    case 'TOGGLE_RATING_ENABLED':
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default songs;
