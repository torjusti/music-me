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
