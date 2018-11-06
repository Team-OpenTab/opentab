import React from 'react';
import PropTypes from 'prop-types';

function AmountToPay({ affectAmountPaid, amount }) {
  return <input value={amount} onChange={event => affectAmountPaid(event.target.value)} />;
}

AmountToPay.propTypes = {
  affectAmountPaid: PropTypes.func,
  amount: PropTypes.number,
};
export default AmountToPay;
