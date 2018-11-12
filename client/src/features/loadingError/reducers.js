/**
 * Simple reducer which stores whether or not an
 * error occurred while loading data from the server.
 */
const loadingError = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_ERROR':
      return true;

    case 'FETCH_SONGS':
      return false;

    default:
      return state;
  }
};

export default loadingError;
