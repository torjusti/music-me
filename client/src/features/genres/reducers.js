const initialState = {
  // The genres which are available to filter on, as sent by the server.
  availableGenres: [],
  // A list of genre checkboxes selected by the user, to filter on.
  selectedGenres: [],
};

const genres = (state = initialState, action) => {
  switch (action.type) {
    // Set the list of available genres, as provided by the server.
    case 'SET_GENRES':
      return { ...state, availableGenres: action.payload.genres };

    // Either removes or adds the specified genre to the list
    // of genres, based on the accompagnying flag.
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
