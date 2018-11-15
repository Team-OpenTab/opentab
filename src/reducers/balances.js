const initialState = {
  userBalance: 0,
  counterpartBalances: {},
};

function balances(state = initialState, action) {
  switch (action.type) {
    case 'SET_COUNTERPART_BALANCES':
      return {
        userBalance: state.userBalance,
        counterpartBalances: action.balances,
      };
    case 'SET_USER_BALANCE':
      return {
        userBalance: action.balance,
        counterpartBalances: state.counterpartBalances,
      };
    case 'RESET_BALANCES':
      return initialState;
    default:
      return state;
  }
}

export default balances;
