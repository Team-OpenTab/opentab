function stage(state = 'balances', action) {
  switch (action.type) {
    case 'GO_BACK':
      return Object.assign({}, state, action.previousState);
    default:
      return state;
  }
}

export default stage;
