import React from 'react';
import PropTypes from 'prop-types';
import TitleBar from './TitleBar';

function Tabs({ userId, roundHistory, contacts, reOrderRound, getStage, stage }) {
  function crossReference(roundCounterparts, index) {
    return Object.keys(roundCounterparts).map(counterpart =>
      Object.values(contacts).map(contact => {
        if (contact.contact_id.toString() === counterpart) {
          return (
            <label>
              {contact.username} paid: {roundHistory[index].counterparts[counterpart]}
            </label>
          );
        }
        return null;
      }),
    );
  }
  return (
    <section>
      <TitleBar title="Tabs" previous="balances" getStage={getStage} stage={stage} />
      {roundHistory.map(round => {
        if (round.userId === userId) {
          return (
            <div>
              <p>I paid {round.roundTotal}, split as:</p>
              <p>{crossReference(round.counterparts, roundHistory.indexOf(round))}</p>
              <button onClick={() => reOrderRound(round)} type="button">
                RE-ORDER
              </button>
            </div>
          );
        }
        return (
          <div>
            <p>
              {Object.values(contacts).map(
                contact => (contact.contact_id === round.userId ? contact.username : null),
              )}{' '}
              paid: {round.roundTotal}
            </p>
            <p>{crossReference(round.counterparts, roundHistory.indexOf(round))}</p>
            <button onClick={() => reOrderRound(round)} type="button">
              RE-ORDER
            </button>
          </div>
        );
      })}
    </section>
  );
}

Tabs.propTypes = {
  userId: PropTypes.number.isRequired,
  roundHistory: PropTypes.array.isRequired,
  contacts: PropTypes.object.isRequired,
  reOrderRound: PropTypes.func.isRequired,
  getStage: PropTypes.func.isRequired,
  stage: PropTypes.string.isRequired,
};

export default Tabs;
