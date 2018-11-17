const initialState = {
  buyerId: '',
  roundName: '',
  recipients: {},
  totalAmount: '',
  splitType: 'even',
  roundHistory: [],
};

function round(state = initialState, action) {
  switch (action.type) {
    case 'SET_ROUND_BUYER':
      return Object.assign({}, state, { buyerId: action.buyerId });
    case 'SET_ROUND_NAME':
      return Object.assign({}, state, { roundName: action.roundName });
    case 'ADD_RECIPIENT': {
      const newRecipients = Object.assign({}, state.recipients);
      newRecipients[action.recipient] = { amount: '0.00' };
      return Object.assign({}, state, { recipients: newRecipients });
    }
    case 'REMOVE_RECIPIENT': {
      const newRecipients = Object.assign({}, state.recipients);
      delete newRecipients[action.recipient];
      return Object.assign({}, state, { recipients: newRecipients });
    }
    case 'SET_RECIPIENTS':
      return Object.assign({}, state, { recipients: action.recipients });
    case 'RESET_ROUND':
      return initialState;
    case 'SET_AMOUNT':
      return Object.assign({}, state, { totalAmount: action.totalAmount });
    case 'SET_SPLIT_TYPE':
      return Object.assign({}, state, { splitType: action.splitType });
    case 'SET_ROUND_HISTORY':
      return Object.assign({}, state, { roundHistory: action.roundHistory });
    case 'REORDER_ROUND':
      return state;
    default:
      return state;
  }
}
export default round;
