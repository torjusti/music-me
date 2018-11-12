const initialState = {
  // The total amount of pages in the table.
  totalPages: 0,
  // The currently displayed page in the table.
  page: 0,
};

/**
 * Reducer which handles the pagination functionality.
 */
const page = (state = initialState, action) => {
  switch (action.type) {
    // Set the currently displayed page in the table.
    case 'SET_PAGE':
      return { ...state, page: action.payload.page };

    // Set the total number of pages in the table.
    case 'SET_TOTAL_PAGES':
      return { ...state, totalPages: action.payload.totalPages };

    // Actions which should cause the table to jump back to the first
    // page. This should typically happen when all the data is exchanged.
    case 'SET_QUERY':
    case 'CLEAR_QUERY':
    case 'SET_SELECTED_GENRE':
    case 'SET_SELECTED_RATING':
    case 'TOGGLE_RATING_ENABLED':
      return { ...state, page: 0 };

    default:
      return state;
  }
};

export default page;
