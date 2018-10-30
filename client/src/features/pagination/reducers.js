const page = (state = 0, action) => {
  switch (action.type) {
    case 'SET_PAGE':
      return action.payload.page;

    default:
      return state;
  }
};

export default page;
