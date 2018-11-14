import React from 'react';
import PropTypes from 'prop-types';
import TitleBar from './TitleBar';
import NewRoundRecipient from './NewRoundRecipient';
import NewRoundCounterpart from './NewRoundCounterpart';
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
  contacts,
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
            type="number"
            onChange={event => getAmount(event.target.value)}
          />
        </div>
        <div className="round-name">
          <div className="round-name__text">...</div>
          <input className="round-amount__input" placeholder="Tab Name" />
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
                value={recipients[userId]}
                onChange={event => getRecipientAmount(userId, event.target.value)}
              />
            ) : (
              <p className="new-round__even-amount">{recipients[userId]}</p>
            ))}
        </div>
        {/* RECIPIENTS */}
        {Object.keys(recipients)
          .filter(recipient => Number(recipient) !== userId)
          .map(recipient => (
            <NewRoundRecipient
              key={recipient}
              counterparts={counterparts}
              recipient={recipient}
              recipients={recipients}
              splitType={splitType}
              handleRoundCounterparts={handleRoundCounterparts}
              getRecipientAmount={getRecipientAmount}
              contacts={contacts}
            />
          ))}

        {Object.values(counterparts).map(counterpart => (
          <NewRoundCounterpart
            key={counterpart.counterpart_id}
            counterpart={counterpart}
            recipients={recipients}
            handleRoundCounterparts={handleRoundCounterparts}
            contacts={contacts}
          />
        ))}
      </div>
      <button type="button" className="buy-round-btn" onClick={getNewRound}>
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
  stage: PropTypes.string.isRequired,
  contacts: PropTypes.array.isRequired,
};

export default NewRound;
