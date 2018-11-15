const initialState = {
  payment: false,
  receiverId: 0,
};

function payment(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_PAYMENT':
      return {
        payment: action.payment,
        receiverId: action.receiverId,
      };
    case 'RESET_PAYMENT':
      return initialState;
    default:
      return state;
  }
}

export default payment;
