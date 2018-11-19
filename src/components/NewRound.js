import React from 'react';
import PropTypes from 'prop-types';
import NewRoundRecipient from './NewRoundRecipient';
import NewRoundCounterpart from './NewRoundCounterpart';
import '../../styles/components/NewRound.scss';

function NewRound({
  counterparts,
  getAmount,
  getSplitType,
  getNewRound,
  getRecipientAmount,
  handleRoundCounterparts,
  userId,
  contacts,
  getRoundName,
  user,
  round,
  totalAmount,
  recipients,
}) {
  return (
    <div className="new-round-container">
      <div className="new-round-content">
        <div className="round-input-container">
          <div className="round-input-container__icon">...</div>
          <input
            className="round-input-container__input"
            placeholder="Tab Name"
            value={round.roundName}
            onChange={(event) => getRoundName(event.target.value)}
          />
        </div>
        <div className="round-input-container">
          <div className="round-input-container__icon">£</div>
          <input
            className="round-input-container__input"
            value={totalAmount}
            placeholder="Total Amount"
            type="number"
            onChange={(event) => getAmount(event.target.value)}
          />
        </div>
        <div className="switch-container">
          <div className="onoffswitch">
            <input
              type="checkbox"
              name="onoffswitch"
              className="onoffswitch-checkbox"
              id="myonoffswitch"
              checked={round.splitType === 'even'}
              onChange={() => getSplitType(round.splitType === 'even' ? 'manual' : 'even')}
            />
            <label className="onoffswitch-label" htmlFor="myonoffswitch">
              <span className="onoffswitch-inner" />
              <span className="onoffswitch-switch" />
            </label>
          </div>
        </div>
        <div className="new-round-recipient-container">
          <div className="user-container">
            <img
              className="user-container__avatar"
              src={
                user.avatar === undefined || user.avatar === ''
                  ? `https://ui-avatars.com/api/rounded=true?name=${
                    user.username
                  }&size=50&background=eaae60`
                  : user.avatar
              }
              alt=""
            />
            <h3 className="user-container__name">You</h3>
          </div>

          {Object.keys(round.recipients).includes(userId.toString()) && <p>£&nbsp;</p>}

          {Object.keys(round.recipients).includes(userId.toString()) &&
            (round.splitType === 'manual' ? (
              <input
                className="new-round__input"
                value={parseFloat(round.recipients[userId].amount).toFixed(2)}
                onChange={(event) => getRecipientAmount(userId, event.target.value)}
              />
            ) : (
              <div className="new-round__input">
                {parseFloat(round.recipients[userId].amount).toFixed(2)}
              </div>
            ))}

          <button
            className="new-round-add-remove-btn"
            type="button"
            onClick={() => handleRoundCounterparts(userId)}
          >
            {!Object.keys(recipients).includes(userId.toString()) ? (
              <i className="fas fa-plus-circle" />
            ) : (
              <i className="fas fa-minus-circle" />
            )}
          </button>
        </div>
        {/* RECIPIENTS */}
        {Object.keys(round.recipients)
          .filter((recipient) => Number(recipient) !== userId)
          .map((recipient) => (
            <NewRoundRecipient
              key={recipient}
              counterparts={counterparts}
              recipient={recipient}
              recipients={round.recipients}
              splitType={round.splitType}
              handleRoundCounterparts={handleRoundCounterparts}
              getRecipientAmount={getRecipientAmount}
              contacts={contacts}
            />
          ))}

        {Object.values(counterparts).map((counterpart) => (
          <NewRoundCounterpart
            key={counterpart.counterpart_id}
            counterpart={counterpart}
            recipients={round.recipients}
            handleRoundCounterparts={handleRoundCounterparts}
            contacts={contacts}
          />
        ))}
      </div>
      {round.roundName !== '' &&
        Object.keys(round.recipients).length &&
        round.totalAmount !== '' && (
          <div className="button-container">
            <button type="button" className="new-round-btn" onClick={getNewRound}>
              OPEN TAB{' '}
            </button>
          </div>
      )}
    </div>
  );
}
NewRound.propTypes = {
  counterparts: PropTypes.object.isRequired,
  getAmount: PropTypes.func.isRequired,
  getSplitType: PropTypes.func.isRequired,
  getNewRound: PropTypes.func.isRequired,
  getRecipientAmount: PropTypes.func.isRequired,
  handleRoundCounterparts: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  stage: PropTypes.string.isRequired,
  contacts: PropTypes.array.isRequired,
  getRoundName: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  round: PropTypes.object.isRequired,
  totalAmount: PropTypes.string.isRequired,
  recipients: PropTypes.object.isRequired,
};

export default NewRound;
