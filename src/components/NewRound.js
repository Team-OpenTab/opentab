import React from 'react';
import PropTypes from 'prop-types';
// import Button from './Button';
import '../../styles/components/NewRound.scss';

function NewRound({
  counterparts,
  roundCounterparts,
  getAmount,
  totalAmount,
  getNewRound,
  getStage,
  handleRoundCounterparts,
}) {
  console.log(roundCounterparts);
  return (
    <section>
      <div className="title-bar">
        <p className="title-bar__back" onClick={() => getStage('balances')}>
          Back
        </p>
        <h2 className="title-bar__title">New Round</h2>
      </div>
      <div className="new-round__amount">
        <input value={totalAmount} onChange={event => getAmount(event.target.value)} />
      </div>
      <div className="new-round__users">
        {Object.values(counterparts).map(counterpart => (
          <div>
            <h3>{counterpart.username}</h3>
            <button
              type="button"
              onClick={handleRoundCounterparts}
              value={counterpart.counterpart_id}
              key={counterpart.counterpart_id}
            >
              {!roundCounterparts.includes(counterpart.counterpart_id.toString())
                ? 'Add'
                : 'Remove'}
            </button>
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
  roundCounterparts: PropTypes.array,
  getStage: PropTypes.func,
  getAmount: PropTypes.func,
  totalAmount: PropTypes.string,
  getNewRound: PropTypes.func.isRequired,
  handleRoundCounterparts: PropTypes.func.isRequired,
};

export default NewRound;
