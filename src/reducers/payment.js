const initialState = {
  payment: false,
  counterpartId: 0,
};

function payment(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_PAYMENT':
      return {
        payment: action.payment,
        counterpartId: action.counterpartId,
      };
    default:
      return state;
  }
}

export default payment;
