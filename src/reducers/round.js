const initialState = {
  buyerId: '',
  recipients: {},
  totalAmount: '',
  splitType: 'even',
};

function round(state = initialState, action) {
  switch (action.type) {
    case 'SET_ROUND_BUYER':
      return Object.assign({}, state, { buyerId: action.buyerId });
    case 'ADD_RECIPIENT': {
      const newRecipients = Object.assign({}, state.recipients);
      newRecipients[action.recipient] = 0;
      return Object.assign({}, state, { recipients: newRecipients });
    }
    case 'REMOVE_RECIPIENT': {
      const newRecipients = Object.assign({}, state.recipients);
      delete newRecipients[action.recipient];
      return Object.assign({}, state, { recipients: newRecipients });
    }
    case 'SET_RECIPIENT_AMOUNT':
      return Object.assign({}, state, { recipients: action.recipients });
    case 'RESET_ROUND':
      return Object.assign({}, initialState);
    case 'SET_AMOUNT':
      return Object.assign({}, state, { totalAmount: action.totalAmount });
    case 'SET_SPLIT_TYPE':
      return Object.assign({}, state, { splitType: action.splitType });
    case 'SET_ROUND_HISTORY':
      return Object.assign({}, state, { roundHistory: action.roundHistory });
    default:
      return state;
  }
}
export default round;
