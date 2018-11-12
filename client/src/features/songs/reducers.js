/**
 * The reducer for a single song.
 */
const song = (state = {}, action) => {
  switch (action.type) {
    // Change the rating for this specific song. Note that this is only on the
    // client. A request is sent from the saga file.
    case 'RATE_SONG':
      if (state.id !== action.payload.id) {
        return state;
      }

      return { ...state, rating: action.payload.rating };

    case 'UPDATE_SONG_LOCALLY':
      if (state.id !== action.payload.id) {
        return state;
      }

      return { ...state, ...action.payload.song };

    default:
      return state;
  }
};

const initialState = {
  // Whether or not the data table is currently loading new data.
  loading: true,
  // The songs currently being shown in the table.
  data: [],
};

const songs = (state = initialState, action) => {
  switch (action.type) {
    // Update the songs which are being shown in the table.
    case 'SET_SONGS':
      return {
        ...state,
        loading: false,
        data: action.payload.songs,
      };

    // Rate a specific song, by feeding the action on to the song reducer.
    case 'RATE_SONG':
    case 'UPDATE_SONG_LOCALLY':
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
    case 'SET_COLUMN':
    case 'TOGGLE_DIRECTION':
    case 'CLEAR_ORDER':
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default songs;
