const initialState = {
  userBalance: {},
  counterpartBalances: {},
};

function balances(state = initialState, action) {
  switch (action.type) {
    // case 'GO_BACK':
    //   return Object.assign({}, state, action.previous);
    case 'RECEIVE_COUNTERPART_BALANCES':
      return {
        userBalance: state.userBalance,
        counterpartBalances: action.balances,
      };
    case 'RECEIVE_USER_BALANCE':
      return {
        userBalance: action.balance,
        counterpartBalances: state.counterpartBalances,
      };
    default:
      return state;
  }
}

export default balances;
