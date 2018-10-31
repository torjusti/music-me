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

    default:
      return state;
  }
};

export default page;
