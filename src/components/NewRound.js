import React from 'react';
import PropTypes from 'prop-types';
// import Button from './Button';
import '../../styles/components/NewRound.scss';

function NewRound({
  counterparts,
  recipients,
  getAmount,
  getSplitType,
  totalAmount,
  getNewRound,
  getStage,
  getRecipientAmount,
  handleRoundCounterparts,
  userId,
  splitType,
}) {
  return (
    <section>
      <div className="title-bar">
        <p className="title-bar__back" onClick={() => getStage('balances')}>
          Back
        </p>
        <h2 className="title-bar__title">New Round</h2>
      </div>

      <div className="new-round__amount">
        <h3>Round Amount</h3>
        <input value={totalAmount} onChange={event => getAmount(event.target.value)} />
        <input
          type="radio"
          name="splitType"
          id="radio1"
          value="even"
          onClick={event => getSplitType(event.target.value)}
          defaultChecked
        />
        <label htmlFor="radio1">Split Evenly</label>
        <input
          type="radio"
          name="splitType"
          id="radio2"
          value="manual"
          onClick={event => getSplitType(event.target.value)}
        />
        <label htmlFor="radio2">Split Manually</label>
      </div>
      <div className="new-round__users">
        <div className="new-round__counterpart">
          <h3 className="new-round__counterpart-name">You</h3>
          <button
            className="new-round__add-remove-counterpart-button"
            type="button"
            onClick={handleRoundCounterparts}
            value={userId}
          >
            {!Object.keys(recipients).includes(userId.toString()) ? 'Add' : 'Remove'}
          </button>
          {Object.keys(recipients).includes(userId.toString()) &&
            (splitType === 'manual' ? (
              <input
                className="new-round__input"
                onChange={event => getRecipientAmount(userId, event.target.value)}
              />
            ) : (
              <p className="new-round__even-amount">{recipients[userId].toFixed(2)}</p>
            ))}
        </div>
        {/* RECIPIENTS */}
        {Object.keys(recipients)
          .filter(recipient => Number(recipient) !== userId)
          .map(recipient => (
            <div className="new-round__counterpart added-recipient" key={recipient}>
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
                  onChange={event => getRecipientAmount(recipient, event.target.value)}
                />
              ) : (
                <p className="new-round__even-amount">{recipients[recipient].toFixed(2)}</p>
              )}
            </div>
          ))}

        {Object.values(counterparts).map(counterpart => (
          <div key={counterpart.counterpart_id}>
            {!Object.keys(recipients).includes(counterpart.counterpart_id.toString()) && (
              <div className="new-round__counterpart">
                <h3 className="new-round__counterpart-name">{counterpart.username}</h3>
                <button
                  className="new-round__add-remove-counterpart-button"
                  type="button"
                  onClick={handleRoundCounterparts}
                  value={counterpart.counterpart_id}
                >
                  {!Object.keys(recipients).includes(counterpart.counterpart_id.toString())
                    ? 'Add'
                    : 'Remove'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <button type="button" className="button" onClick={getNewRound}>
        BUY ROUND{' '}
      </button>
    </section>
  );
}
NewRound.propTypes = {
  counterparts: PropTypes.object.isRequired,
  recipients: PropTypes.object.isRequired,
  getStage: PropTypes.func.isRequired,
  getAmount: PropTypes.func.isRequired,
  totalAmount: PropTypes.string.isRequired,
  getSplitType: PropTypes.func.isRequired,
  getNewRound: PropTypes.func.isRequired,
  getRecipientAmount: PropTypes.func.isRequired,
  handleRoundCounterparts: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  splitType: PropTypes.string.isRequired,
};

export default NewRound;
