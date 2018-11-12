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
        <button type="button" onClick={() => getSplitType('even')}>
          Split Evenly
        </button>
        <button type="button" onClick={() => getSplitType('manual')}>
          Split Manually
        </button>
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
          <input
            className="new-round__input"
            onChange={event => getRecipientAmount(userId, event.target.value)}
          />
        </div>

        {Object.keys(recipients).map(recipient => (
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
            <input
              className="new-round__input"
              vonChange={event => getRecipientAmount(recipient, event.target.value)}
            />
          </div>
        ))}

        {Object.values(counterparts).map(counterpart => (
          <div>
            {!Object.keys(recipients).includes(counterpart.counterpart_id.toString()) && (
              <div className="new-round__counterpart" key={counterpart.counterpart_id}>
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
                <input
                  className="new-round__input"
                  onChange={event =>
                    getRecipientAmount(counterpart.counterpart_id, event.target.value)
                  }
                />
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
  counterparts: PropTypes.object,
  recipients: PropTypes.object.isRequired,
  getStage: PropTypes.func,
  getAmount: PropTypes.func,
  totalAmount: PropTypes.number,
  getSplitType: PropTypes.func.isRequired,
  getNewRound: PropTypes.func.isRequired,
  getRecipientAmount: PropTypes.func.isRequired,
  handleRoundCounterparts: PropTypes.func.isRequired,
  userId: PropTypes.number,
};

export default NewRound;
