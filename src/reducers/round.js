const initialState = {
  roundId: '',
  buyerId: '',
  counterpartIds: [],
  totalAmount: 0,
  splitType: '',
};

function round(state = initialState, action) {
  switch (action.type) {
    case 'SET_ROUND_ID':
      return Object.assign({}, state, { roundId: action.roundId });
    case 'SET_ROUND_BUYER':
      return Object.assign({}, state, { buyerId: action.buyerId });
    case 'ADD_CHECKED_USER':
      return Object.assign({}, state, {
        counterpartIds: state.counterpartIds.concat(action.counterpart),
      });
    case 'REMOVE_CHECKED_USER':
      return Object.assign({}, state, {
        counterpartIds: state.counterpartIds.filter(
          counterpart => counterpart !== action.counterpart,
        ),
      });
    case 'RESET_ROUND':
      return Object.assign({}, initialState);
    case 'SET_AMOUNT':
      return Object.assign({}, state, { totalAmount: parseInt(action.totalAmount) });
    case 'SET_SPLIT_TYPE':
      return Object.assign({}, state, { splitType: action.splitType });
    default:
      return state;
  }
}
export default round;
