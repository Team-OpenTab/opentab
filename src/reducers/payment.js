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
    default:
      return state;
  }
}

export default payment;
