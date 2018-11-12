/**
 * Sets the query to search on.
 */
export const setQuery = query => ({
  type: 'SET_QUERY',
  payload: { query },
});

/**
 * Stop filtering based on the search query.
 */
export const clearQuery = () => ({
  type: 'CLEAR_QUERY',
});
