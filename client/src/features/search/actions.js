export const setQuery = query => ({
  type: 'SET_QUERY',
  payload: { query },
});

export const clearQuery = () => ({
  type: 'CLEAR_QUERY',
});
