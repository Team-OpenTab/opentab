function balance(state = {}, action) {
  switch (action.type) {
    case 'GO_BACK':
      return Object.assign({}, state, action.previous);
    default:
      return state;
  }
}

export default balance;
