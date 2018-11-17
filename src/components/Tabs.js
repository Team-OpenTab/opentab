import React from 'react';
import PropTypes from 'prop-types';
import TitleBar from './TitleBar';
import '../../styles/components/Tabs.scss';

const dateFormat = require('dateformat');

function Tabs({
  userId,
  balance,
  roundHistory,
  contactList,
  reOrderRound,
  getStage,
  stage,
  logoutUser,
}) {
  function tabRecipientsList(roundCounterparts) {
    return Object.values(roundCounterparts).map(counterpart => {
      if (userId === counterpart.id) {
        return (
          <label key={counterpart.id}>
            {'Me'}: {(-counterpart.amount).toFixed(2)}
          </label>
        );
      }
      return (
        <label key={counterpart.id}>
          {counterpart.username}: {(-counterpart.amount).toFixed(2)}
        </label>
      );
    });
  }

  return (
    <div className="tabs-container">
      <TitleBar
        title={`Balance: £${balance.toFixed(2)}`}
        previous="balances"
        getStage={getStage}
        stage={stage}
        logoutUser={logoutUser}
      />
      <div className="tabs-content">
        {roundHistory.map(round => {
          const roundBuyer =
            round.userId === userId
              ? 'I'
              : contactList.filter(contact => contact.contact_id === round.userId)[0].username;
          return (
            <div className="tab" key={round.roundId}>
              <div className="tab__header">
                <div className="tab__wrapper">
                  <h2 className="tab__name">{round.roundName}</h2>
                  <p className="tab__date">
                    {dateFormat(new Date(round.roundTime), 'ddd dS mmm, HH:MM')}
                  </p>
                </div>
                <button className="tab__button" onClick={() => reOrderRound(round)} type="button">
                  <img
                    className="tab__reorder"
                    alt="re-order"
                    src="../../static/images/reorder.png"
                  />
                </button>
              </div>
              <p className="tab__payer">
                {roundBuyer} paid <b>£{(-round.roundTotal).toFixed(2)}</b>, split as:
              </p>
              <p className="tab__payees">{tabRecipientsList(round.counterparts)}</p>
            </div>
          );
        })}
      </div>
      <div className="button-container">
        <button type="button" className="new-round-btn" onClick={() => getStage('newRound')}>
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
  logoutUser: PropTypes.func.isRequired,
};

export default Tabs;
