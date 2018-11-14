import React from 'react';
import PropTypes from 'prop-types';

function NewRoundRecipient({
  counterparts,
  recipient,
  recipients,
  splitType,
  handleRoundCounterparts,
  getRecipientAmount,
}) {
  return (
    <div className="new-round__counterpart added-recipient">
      <h3 className="new-round__counterpart-name">{counterparts[recipient].username}</h3>
      <button
        className="new-round__add-remove-counterpart-button"
        type="button"
        onClick={handleRoundCounterparts}
        value={recipient}
      >
        {!Object.keys(recipients).includes(recipient.toString()) ? 'Add' : 'Remove'}
      </button>
      {splitType === 'manual' ? (
        <input
          className="new-round__input"
          value={recipients[recipient]}
          onChange={(event) => getRecipientAmount(recipient, event.target.value)}
        />
      ) : (
        <p className="new-round__even-amount">{recipients[recipient]}</p>
      )}
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
};

export default NewRoundRecipient;
