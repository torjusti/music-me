const initialState = {
  availableGenres: [],
  selectedGenres: [],
};

const genres = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return { ...state, availableGenres: action.payload.genres };

    case 'SET_SELECTED_GENRE':
      return {
        ...state,
        selectedGenres: action.payload.selected ?
          [...state.selectedGenres, action.payload.genre] :
          state.selectedGenres.filter(genre => genre !== action.payload.genre),
      };

    default:
      return state;
  }
};

export default genres;
