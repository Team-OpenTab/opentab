import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import io from 'socket.io-client';
import TitleBar from './TitleBar';
import '../../styles/components/Balances.scss';
// import CounterpartList from './CounterpartList';
import '../../styles/components/TitleBar.scss';

class Balances extends React.Component {
  componentDidMount() {
    this.props.fetchBalances(this.props.userId);
    const socket = io('localhost:8080');
    socket.on('refresh', () => {
      this.props.fetchBalances(this.props.userId);
      console.log('refresh received');
    });
  }

  paymentClassName(close) {
    return cx('payment', {
      'payment--closed': this.props.payment.payment || close,
    });
  }

  // closes payment modal if user clicks on background or close button.
  showModal(event, close) {
    if (event.target.className === 'payment payment--closed' || close) {
      this.props.showPayment(false, null);
    }
  }

  // TODO: Send post request to clear balances.
  markPaid() {
    console.log('mark paid, ', 'counterpartId: ', this.props.payment.counterpartId);
  }

  // TODO: show payment options for example Paypal link or sms notification
  showPayment() {
    console.log('request payment, ', 'counterpartId: ', this.props.payment.counterpartId);
  }

  // Can payment modal be seperated into a new component?
  render() {
    return (
      <div>
        <TitleBar title="Balance:" previous="App" />

        <div className="counterpart-list">
          {Object.keys(this.props.balances.counterpartBalances).map(key => (
            <div className="counterpart" key={key}>
              <div className="counterpart__name">
                {this.props.balances.counterpartBalances[key].username}
              </div>
              <div className="counterpart__balance">
                £{this.props.balances.counterpartBalances[key].sum}
              </div>
              <button
                className="counterpart__btn"
                id={key}
                type="button"
                onClick={() => this.props.showPayment(true, key)}
              >
                Pay
              </button>
            </div>
          ))}
        </div>

        <div
          className={this.paymentClassName()}
          role="dialog"
          onClick={event => this.showModal(event)}
        >
          <div className="payment__content">
            <button type="button" onClick={() => this.markPaid()}>
              Mark Paid
            </button>
            <button type="button" onClick={() => this.requestPayment()}>
              Request Payment
            </button>
            <p onClick={() => this.props.showPayment(false, null)}>Close</p>
          </div>
        </div>

        {/* <CounterpartList users={users} balances={balances} /> */}
        <button type="button" className="button" onClick={() => this.props.getStage('newRound')}>
          NEW ROUND
        </button>
      </div>
    );
  }
}

Balances.propTypes = {
  userId: PropTypes.number.isRequired,
  users: PropTypes.object,
  balances: PropTypes.object.isRequired,
  getStage: PropTypes.func.isRequired,
  showPayment: PropTypes.func.isRequired,
  payment: PropTypes.object.isRequired,
  fetchBalances: PropTypes.func.isRequired,
};

export default Balances;
