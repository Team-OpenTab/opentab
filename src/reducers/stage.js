const initialState = 'login';

function stage(state = initialState, action) {
  switch (action.type) {
    case 'SET_STAGE':
      return action.stage;
    case 'RESET_STAGE':
      return initialState;
    default:
      return state;
  }
}

export default stage;
