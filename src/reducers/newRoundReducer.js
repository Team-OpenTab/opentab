const initialState = { checkedUsers: [], amount: 0 };
function newRoundReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_CHECKED_USER':
      return Object.assign({}, state, { checkedUsers: state.checkedUsers.concat(action.user) });
    case 'REMOVE_CHECKED_USER':
      return Object.assign({}, state, {
        checkedUsers: state.checkedUsers.filter(user => user !== action.user),
      });

    case 'STORE_USERS_FINAL':
      // probably some socket code gets invoked instead
      return state;
    case 'STORE_INPUTTED_AMOUNT':
      return Object.assign({}, state, { amount: action.amount });
    default:
      return state;
  }
}
export default newRoundReducer;
