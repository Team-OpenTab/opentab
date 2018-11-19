import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BalanceItem from './BalanceItem';
import '../../styles/components/Balances.scss';

function Balances({ balances, getStage, showPayment, payment, settleBalance, contacts }) {
  function paymentClassName(close) {
    return cx('payment', {
      'payment--closed': payment.payment || close,
    });
  }

  function showModal(event, close) {
    if (event.target.className === 'payment payment--closed' || close) {
      showPayment(false, null);
    }
  }

  function markPaid() {
    settleBalance();
    showPayment(false, null);
  }

  return (
    <div className="balances-container">
      <div className="balances-content">
        {balances.userBalance !== 0 && (
          <div className="balances__text">
            {balances.userBalance < 0
              ? `You are owed £${(-balances.userBalance).toFixed(2)} in total`
              : `You owe £${balances.userBalance.toFixed(2)} in total`}
          </div>
        )}
        <div className="counterpart-list">
          {Object.keys(balances.counterpartBalances)
            .sort((a, b) => {
              const aSum = balances.counterpartBalances[a].sum;
              const bSum = balances.counterpartBalances[b].sum;
              return aSum > bSum ? 1 : -1;
            })
            .sort((a) => (balances.counterpartBalances[a].sum === '0.00' ? 1 : -1))
            .filter((id) =>
              contacts.contactList
                .filter((contact) => contact.approved)
                .map((contact) => contact.contact_id)
                .includes(Number(id)),
            )
            .filter((id) => balances.counterpartBalances[id].sum !== '0.00')
            .map((key) => (
              <BalanceItem
                key={key}
                contactId={key}
                contact={balances.counterpartBalances[key]}
                showPayment={showPayment}
                contacts={contacts}
              />
            ))}
        </div>

        <div className={paymentClassName()} role="dialog" onClick={(event) => showModal(event)}>
          <div className="payment__content">
            <button className="payment-btn" type="button" onClick={() => markPaid()}>
              Mark Paid
            </button>
            {payment.receiverId &&
              balances.counterpartBalances[payment.receiverId].sum < 0 && (
                <button className="payment-btn" type="button">
                  Request Payment
                </button>
            )}
            <p onClick={() => showPayment(false, null)}>CLOSE</p>
          </div>
        </div>
      </div>
      <div className="button-container">
        {' '}
        <button type="button" className="new-round-btn" onClick={() => getStage('newRound')}>
          NEW TAB
        </button>
      </div>
    </div>
  );
}

Balances.propTypes = {
  balances: PropTypes.object.isRequired,
  getStage: PropTypes.func.isRequired,
  showPayment: PropTypes.func.isRequired,
  payment: PropTypes.object.isRequired,
  settleBalance: PropTypes.func.isRequired,
  contacts: PropTypes.object.isRequired,
};

export default Balances;
