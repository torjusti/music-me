const initialState = {
  availableGenres: [],
  selectedGenres: [],
};

const genres = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return {
        ...state,
        availableGenres: action.payload.genres,
        selectedGenres: state.selectedGenres.filter(genre =>
          action.payload.genres.some(entry => entry.genre === genre),
        ),
      };

    case 'SET_SELECTED_GENRE':
      return {
        ...state,
        selectedGenres: action.payload.selected
          ? [...state.selectedGenres, action.payload.genre]
          : state.selectedGenres.filter(
              genre => genre !== action.payload.genre,
            ),
      };

    default:
      return state;
  }
};

export default genres;
