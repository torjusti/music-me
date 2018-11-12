const initialState = {
  visible: false,
  message: null,
};

const toasts = (state = initialState, action) => {
  switch (action.type) {
    case 'SAGA_SHOW_TOAST':
      return {
        ...state,
        visible: true,
        message: action.payload.message,
      };

    case 'HIDE_TOAST':
      return initialState;

    default:
      return state;
  }
};

export default toasts;
