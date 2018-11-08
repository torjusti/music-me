const initialState = {
    orderBy: null,
    isAsc: false
};

const order = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COLUMN':
            return {...state, orderBy: action.payload.orderBy, isAsc: true};
        case 'TOGGLE_DIRECTION':
            return {...state, isAsc: state.isAsc ? false : true};
        case 'CLEAR_ORDER':
            return {...state, orderBy: null};
        default:
            return state;

    }
};

export default order;