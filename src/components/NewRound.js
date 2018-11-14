import React from 'react';
import PropTypes from 'prop-types';
import TitleBar from './TitleBar';
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
  stage,
  getRecipientAmount,
  handleRoundCounterparts,
  userId,
  splitType,
}) {
  return (
    <section>
      <TitleBar title="New Round" previous="balances" getStage={getStage} stage={stage} />
      <div className="new-round-container">
        <div className="round-amount">
          <div className="round-amount__currency">£</div>
          <input
            className="round-amount__input"
            value={totalAmount}
            placeholder="Total Amount"
            onChange={event => getAmount(event.target.value)}
            type="number"
          />
        </div>
        <div className="round-name">
          <div className="round-name__text">...</div>
          <input
            className="round-amount__input"
            value={totalAmount}
            placeholder="Tab Name"
            onChange={event => getAmount(event.target.value)}
            type="number"
          />
        </div>
        <div className="round-split">
          <div className="round-split__evenly">
            <input
              type="radio"
              name="splitType"
              id="radio1"
              value="even"
              onClick={event => getSplitType(event.target.value)}
              defaultChecked
            />

            <label htmlFor="radio1">Split Evenly</label>
          </div>
          <div className="round-split__manually">
            <input
              type="radio"
              name="splitType"
              id="radio2"
              value="manual"
              onClick={event => getSplitType(event.target.value)}
            />
            <label htmlFor="radio2">Split Manually</label>
          </div>
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
                  value={recipients[userId].toFixed(2)}
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
                    value={recipients[recipient].toFixed(2)}
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
      </div>
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
  stage: PropTypes.string.isRequired,
};

export default NewRound;
