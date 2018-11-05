const initialState = {
  totalPages: 0,
  page: 0,
};

const page = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, page: action.payload.page };

    case 'SET_TOTAL_PAGES':
      return { ...state, totalPages: action.payload.totalPages };

    case 'SET_QUERY':
    case 'CLEAR_QUERY':
    case 'SET_SELECTED_GENRE':
    case 'SET_SELECTED_RATING':
      return { ...state, page: 0 };

    default:
      return state;
  }
};

export default page;
