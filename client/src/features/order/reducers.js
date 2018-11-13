const initialState = {
  // The column on which we are filtering.
  orderBy: null,
  // Whether or not we are sorting ascendingly.
  isAsc: false,
};

/**
 * Reducer which handles clicks on column headers in order to sort.
 */
const order = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COLUMN':
      return { ...state, orderBy: action.payload.orderBy, isAsc: true };

    case 'TOGGLE_DIRECTION':
      return { ...state, isAsc: !state.isAsc };

    case 'CLEAR_ORDER':
      return { ...state, orderBy: null };

    default:
      return state;
  }
};

export default order;
