import React from 'react';
import PropTypes from 'prop-types';
import TitleBar from './TitleBar';
import '../../styles/components/Tabs.scss';

const dateFormat = require('dateformat');

function Tabs({ userId, balance, roundHistory, contactList, reOrderRound, getStage, stage }) {
  function crossReference(roundCounterparts) {
    return Object.keys(roundCounterparts).map(recipientId => (
      <label key={recipientId}>
        {recipientId === userId.toString()
          ? 'Myself'
          : contactList.filter(contact => contact.contact_id.toString() === recipientId)[0]
            .username}
        : £{(-roundCounterparts[recipientId]).toFixed(2)}
      </label>
    ));
  }
  return (
    <div className="tabs-container">
      <TitleBar
        title={`Balance: £${balance.toFixed(2)}`}
        previous="balances"
        getStage={getStage}
        stage={stage}
      />
      <div className="tabs-content">
        {roundHistory.map(round => {
          if (round.userId === userId) {
            return (
              <div className="tab" key={round.roundTime}>
                <h2 className="tab__name">{round.roundName}</h2>
                <p className="tab__payer">I paid £{(-round.roundTotal).toFixed(2)}, split as:</p>
                <p className="tab__payees">{crossReference(round.counterparts)}</p>
                <span className="tab-footer-container">
                  <p className="tab-footer-container__date">
                    {dateFormat(new Date(round.roundTime), 'ddd dS mmm, HH:MM')}
                  </p>
                  <button
                    className="tab-footer-container__btn"
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
                {Object.values(contactList).map(
                  contact => (contact.contact_id === round.userId ? contact.username : null),
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
      </div>
      <div className="button-container">
        <button type="button" className="new-round-btn">
          NEW TAB
        </button>
      </div>
    </div>
  );
}

Tabs.propTypes = {
  userId: PropTypes.number.isRequired,
  roundHistory: PropTypes.array.isRequired,
  contactList: PropTypes.array.isRequired,
  reOrderRound: PropTypes.func.isRequired,
  getStage: PropTypes.func.isRequired,
  stage: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
};

export default Tabs;
