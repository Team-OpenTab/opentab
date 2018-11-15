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
  roundName,
  resetRound,
  getRoundName,
  user,
}) {
  return (
    <div>
      <TitleBar
        title="New Round"
        previous="balances"
        resetRound={resetRound}
        getStage={getStage}
        stage={stage}
      />

      <div className="new-round-content">
        <div className="round-input-container">
          <div className="round-input-container__icon">£</div>
          <input
            className="round-input-container__input"
            value={totalAmount}
            placeholder="Total Amount"
            type="number"
            onChange={event => getAmount(event.target.value)}
          />
        </div>

        <div className="round-input-container">
          <div className="round-input-container__icon">...</div>
          <input
            className="round-input-container__input"
            placeholder="Tab Name"
            value={roundName}
            onChange={event => getRoundName(event.target.value)}
          />
        </div>

        <div className="round-split">
          <div className="round-split__evenly">
            <input
              type="radio"
              name="splitType"
              id="radio1"
              checked={splitType === 'even'}
              onChange={() => getSplitType('even')}
            />
            <label htmlFor="radio1">Split Evenly</label>
          </div>
          <div className="round-split__manually">
            <input
              type="radio"
              name="splitType"
              id="radio2"
              checked={splitType === 'manual'}
              onChange={() => getSplitType('manual')}
            />
            <label htmlFor="radio2">Split Manually</label>
          </div>
        </div>
        <div className="new-round-recipient-container">
          <div className="user-container">
            <img className="user-container__avatar" src={user.avatar} alt="avatar" />

            <h3 className="user-container__name">You</h3>
          </div>

          {Object.keys(recipients).includes(userId.toString()) && <p>£&nbsp;</p>}

          {Object.keys(recipients).includes(userId.toString()) &&
            (splitType === 'manual' ? (
              <input
                className="new-round__input"
                value={recipients[userId]}
                onChange={event => getRecipientAmount(userId, event.target.value)}
              />
            ) : (
              <div className="new-round__input">{recipients[userId]}</div>
            ))}

          <button
            className="new-round-add-remove-btn"
            type="button"
            onClick={handleRoundCounterparts}
            value={userId}
          >
            {!Object.keys(recipients).includes(userId.toString()) ? '+' : 'x'}
          </button>
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

      <button type="button" className="new-round-btn" onClick={getNewRound}>
        BUY ROUND{' '}
      </button>
    </div>
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
  roundName: PropTypes.string.isRequired,
  getRoundName: PropTypes.func.isRequired,
  resetRound: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default NewRound;
