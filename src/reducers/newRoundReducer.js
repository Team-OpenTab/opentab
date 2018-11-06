const initialState = { checkedUsers: [], amount: 0 };
function newRoundReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_REMOVE_CHECKED_USER':
      // remove
      if (state.checkedUsers.includes(action.user)) {
        return Object.assign({}, state, {
          checkedUsers: state.checkedUsers.filter(user => user !== action.user),
        });
      }
      // add
      return Object.assign({}, state, { checkedUsers: state.checkedUsers.concat(action.user) });

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
