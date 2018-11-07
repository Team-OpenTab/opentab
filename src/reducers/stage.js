function stage(state = 'balances', action) {
  switch (action.type) {
    case 'GO_BACK':
      return Object.assign({}, state, action.previousState);
    case 'BUTTON_CHANGE_STAGE':
      console.log(action.buttonLabel);
      return action.buttonLabel;
    default:
      return state;
  }
}

export default stage;
