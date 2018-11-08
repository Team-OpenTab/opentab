const initialState = {
  id: 1,
  username: 'Yetkin',
};

function user(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return Object.assign({}, action.user);
    default:
      return state;
  }
}

export default user;
