export const setColumn = orderBy => ({
    type: 'SET_COLUMN',
    payload: {
        orderBy,
    },
});

export const toggleDirection = () => ({
    type: 'TOGGLE_DIRECTION',
});

export const clearOrder = () => ({
    type: 'CLEAR_ORDER'
});
