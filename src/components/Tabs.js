import React from 'react';
import PropTypes from 'prop-types';

function Tabs({ userId, roundHistory, contacts, reOrderRound }) {
  function crossReference(roundCounterparts) {
    return Object.keys(roundCounterparts).map(counterpart =>
      Object.values(contacts).map(contact => {
        if (contact.contact_id.toString() === counterpart) {
          return (
            <label>
              {contact.username} paid: {roundHistory.counterparts[counterpart]}
            </label>
          );
        }
        return null;
      }),
    );
  }
  return (
    <section>
      {roundHistory.map(round => {
        if (round.userId === userId) {
          return (
            <div>
              <p>I paid {round.roundTotal}, split as:</p>
              <p>{crossReference(round.counterparts)}</p>
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
            <p>{crossReference(round.counterparts)}</p>
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
};

export default Tabs;
