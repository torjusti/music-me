/**
 * Sets the column on which we are sorting.
 */
export const setColumn = orderBy => ({
  type: 'SET_COLUMN',
  payload: { orderBy },
});

/**
 * Toggles the sorting direction on the currently selected column.
 */
export const toggleDirection = () => ({
  type: 'TOGGLE_DIRECTION',
});

/**
 * Signifies that we should stop sorting on the currently selected column.
 */
export const clearOrder = () => ({
  type: 'CLEAR_ORDER',
});
