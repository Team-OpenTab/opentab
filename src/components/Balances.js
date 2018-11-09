import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import TitleBar from './TitleBar';
import '../../styles/components/Balances.scss';
// import CounterpartList from './CounterpartList';
import '../../styles/components/TitleBar.scss';

function Balances({ balances, getStage, showPayment, payment, settleBalance }) {
  function paymentClassName(close) {
    return cx('payment', {
      'payment--closed': payment.payment || close,
    });
  }

  // closes payment modal if user clicks on background or close button.
  function showModal(event, close) {
    if (event.target.className === 'payment payment--closed' || close) {
      showPayment(false, null);
    }
  }

  // TODO: Send post request to clear balances.
  function markPaid() {
    console.log('mark paid, ', 'receiverId: ', payment.receiverId);

    settleBalance();
    showPayment(false, null);
  }

  // TODO: show payment options for example Paypal link or sms notification
  function requestPayment() {
    console.log('request payment, ', 'receiverId: ', payment.receiverId);
  }

  // Can payment modal be seperated into a new component?
  return (
    <div>
      <TitleBar title="Balance:" previous="App" />

      <div className="counterpart-list">
        {Object.keys(balances.counterpartBalances).map(key => (
          <div className="counterpart" key={key}>
            <div className="counterpart__name">User {key}</div>
            <div className="counterpart__balance">£{balances.counterpartBalances[key]}</div>
            <button
              className="counterpart__btn"
              id={key}
              type="button"
              onClick={() => showPayment(true, Number(key))}
            >
              Pay
            </button>
          </div>
        ))}
      </div>

      <div className={paymentClassName()} role="dialog" onClick={event => showModal(event)}>
        <div className="payment__content">
          <button type="button" onClick={() => markPaid()}>
            Mark Paid
          </button>
          <button type="button" onClick={() => requestPayment()}>
            Request Payment
          </button>
          <p onClick={() => showPayment(false, null)}>Close</p>
        </div>
      </div>

      {/* <CounterpartList users={users} balances={balances} /> */}
      <button type="button" className="button" onClick={() => getStage('newRound')}>
        NEW ROUND
      </button>
    </div>
  );
}

Balances.propTypes = {
  users: PropTypes.object,
  balances: PropTypes.object.isRequired,
  getStage: PropTypes.func.isRequired,
  showPayment: PropTypes.func.isRequired,
  payment: PropTypes.object.isRequired,
  settleBalance: PropTypes.object.isRequired,
};

export default Balances;
