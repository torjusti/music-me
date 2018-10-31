const search = (state = null, action) => {
  switch (action.type) {
    case 'SET_QUERY':
      return action.payload.query;

    case 'CLEAR_QUERY':
      return null;

    default:
      return state;
  }
};

export default search;
