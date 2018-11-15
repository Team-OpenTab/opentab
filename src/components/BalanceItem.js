import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

function BalanceItem({
  contactId,
  contact,
  friendRequests,
  approveContact,
  showPayment,
  contacts,
}) {
  const balanceClasses = cx('counterpart__balance', {
    'counterpart__balance--red': contact.sum > 0,
    'counterpart__balance--green': contact.sum < 0,
  });

  return (
    <div className="counterpart">
      <div className="counterpart__name">
        <img
          className="user-container__avatar"
          src={
            contacts.contactList[
              contacts.contactList.findIndex(x => x.contact_id === Number(contactId))
            ].avatar
          }
          alt="avatar"
        />

        <h3 className="user-container__name">{contact.username}</h3>
      </div>

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
          <img className="counterpart__arrow" alt="Pay" src="../../static/images/arrow.png" />
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
  contacts: PropTypes.object.isRequired,
};
export default BalanceItem;
