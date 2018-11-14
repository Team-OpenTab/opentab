import React from 'react';
import PropTypes from 'prop-types';
import TitleBar from './TitleBar';
import '../../styles/components/Tabs.scss';

const dateFormat = require('dateformat');

function Tabs({ userId, roundHistory, contacts, reOrderRound, getStage, stage }) {
  function crossReference(roundCounterparts, index) {
    return Object.keys(roundCounterparts).map((counterpart) =>
      contacts.map((contact) => {
        if (contact.contact_id.toString() === counterpart) {
          return (
            <label key={contact.contact_id}>
              {contact.username}: £{(-roundHistory[index].counterparts[counterpart]).toFixed(2)}
            </label>
          );
        }
        if (contact.contact_id === userId) {
          return (
            <label>Myself: {(-roundHistory[index].counterparts[counterpart]).toFixed(2)}</label>
          );
        }

        return null;
      }),
    );
  }
  return (
    <section>
      <TitleBar title="Tabs" previous="balances" getStage={getStage} stage={stage} />
      {roundHistory.map((round) => {
        if (round.userId === userId) {
          return (
            <div className="tab" key={round.roundTime}>
              <h2>{round.roundName}</h2>
              <p className="tab__payer">I paid £{(-round.roundTotal).toFixed(2)}, split as:</p>
              <p className="tab__payees">
                {crossReference(round.counterparts, roundHistory.indexOf(round))}
              </p>

              <p className="tab-footer__date">
                {dateFormat(new Date(round.roundTime), 'ddd dS mmm, HH:MM')}
              </p>
              <span className="tab-footer-container">
                <button
                  className="tab-footer__btn"
                  onClick={() => reOrderRound(round)}
                  type="button"
                >
                  <img
                    className="tab-reorder"
                    alt="re-order"
                    src="../../static/images/reorder.png"
                  />
                </button>
              </span>
            </div>
          );
        }
        return (
          <div className="tab" key={round.roundId}>
            <p className="tab__payer">
              {Object.values(contacts).map(
                (contact) => (contact.contact_id === round.userId ? contact.username : null),
              )}{' '}
              paid: {round.roundTotal}
            </p>
            <p className="tab__payees">
              {crossReference(round.counterparts, roundHistory.indexOf(round))}
            </p>
            <p className="tab-footer__date" />
            <button className="tab-footer__btn" onClick={() => reOrderRound(round)} type="button">
              <img className="tab-reorder" alt="re-order" src="../../static/images/reorder.png" />
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
  contacts: PropTypes.array.isRequired,
  reOrderRound: PropTypes.func.isRequired,
  getStage: PropTypes.func.isRequired,
  stage: PropTypes.string.isRequired,
};

export default Tabs;
