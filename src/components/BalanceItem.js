import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

function BalanceItem({ contactId, contact, friendRequests, approveContact, showPayment }) {
  const balanceClasses = cx('counterpart__balance', {
    'counterpart__balance--red': contact.sum > 0,
    'counterpart__balance--green': contact.sum < 0,
  });

  return (
    <div className="counterpart">
      <div className="counterpart__name">{contact.username}</div>
      <div className={balanceClasses}>
        {contact.sum < 0 ? <div>Owes you</div> : contact.sum === '0.00' ? null : <div>You owe</div>}
        £{contact.sum[0] === '-' ? (-contact.sum).toFixed(2) : contact.sum}
      </div>
      {friendRequests.includes(Number(contactId)) && (
        <button
          className="counterpart__btn approve-btn"
          type="button"
          onClick={() => approveContact(contactId)}
        >
          Approve
        </button>
      )}
      {contact.sum !== '0.00' && (
        <button
          className="counterpart__btn pay-btn"
          id={contactId}
          type="button"
          onClick={() => showPayment(true, Number(contactId))}
        >
          Pay
        </button>
      )}
    </div>
  );
}

BalanceItem.propTypes = {
  contactId: PropTypes.string.isRequired,
  contact: PropTypes.object.isRequired,
  friendRequests: PropTypes.array.isRequired,
  approveContact: PropTypes.func.isRequired,
  showPayment: PropTypes.func.isRequired,
};
export default BalanceItem;
