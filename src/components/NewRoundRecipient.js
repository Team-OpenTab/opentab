import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/NewRound.scss';

function NewRoundRecipient({
  counterparts,
  recipient,
  recipients,
  splitType,
  handleRoundCounterparts,
  getRecipientAmount,
  contacts,
}) {
  return (
    <div className="new-round-recipient-container user-added">
      <div className="user-container">
        <img
          className="user-container__avatar"
          src={contacts[contacts.findIndex(x => x.contact_id === Number(recipient))].avatar}
          alt="avatar"
        />

        <h3 className="user-container__name">{counterparts[recipient].username}</h3>
      </div>

      <p>£&nbsp;</p>
      {splitType === 'manual' ? (
        <input
          className="new-round__input"
          value={recipients[recipient]}
          type="number"
          onChange={event => getRecipientAmount(recipient, event.target.value)}
        />
      ) : (
        <div className="new-round__input">{recipients[recipient]}</div>
      )}

      <button
        className="new-round-add-remove-btn"
        type="button"
        onClick={handleRoundCounterparts}
        value={recipient}
      >
        {!Object.keys(recipients).includes(recipient.toString()) ? '+' : 'x-'}
      </button>
    </div>
  );
}

NewRoundRecipient.propTypes = {
  counterparts: PropTypes.object.isRequired,
  recipients: PropTypes.object.isRequired,
  recipient: PropTypes.string.isRequired,
  getRecipientAmount: PropTypes.func.isRequired,
  handleRoundCounterparts: PropTypes.func.isRequired,
  splitType: PropTypes.string.isRequired,
  contacts: PropTypes.array.isRequired,
};

export default NewRoundRecipient;
