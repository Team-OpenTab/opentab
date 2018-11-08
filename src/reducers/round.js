const initialState = { userId: 1, counterpartIds: [1, 2, 3, 4, 5], totalAmount: 0 };
function round(state = initialState, action) {
  switch (action.type) {
    case 'ADD_CHECKED_USER':
      return Object.assign({}, state, { counterpartIds: state.checkedUsers.concat(action.user) });
    case 'REMOVE_CHECKED_USER':
      return Object.assign({}, state, {
        checkedUsers: state.counterpartIds.filter(user => user !== action.user),
      });

    case 'STORE_USERS_FINAL':
      // probably some socket code gets invoked instead
      return state;
    case 'SET_AMOUNT':
      return Object.assign({}, state, { totalAmount: action.totalAmount });
    default:
      return state;
  }
}
export default round;
