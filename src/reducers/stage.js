const initialState = 'balances';

function stage(state = initialState, action) {
  switch (action.type) {
    case 'SET_STAGE':
      return action.stage;
    default:
      return state;
  }
}

export default stage;
