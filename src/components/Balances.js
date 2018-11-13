import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import io from 'socket.io-client';
import TitleBar from './TitleBar';
import BalanceItem from './BalanceItem';
import '../../styles/components/Balances.scss';
// import CounterpartList from './CounterpartList';

class Balances extends React.Component {
  componentDidMount() {
    this.props.fetchBalances(this.props.userId);
    this.props.fetchRoundHistory(this.props.userId);
    const socket = io('localhost:8080');
    socket.on('refresh', () => {
      this.props.fetchBalances(this.props.userId);
      this.props.fetchRoundHistory(this.props.userId);
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
    this.props.settleBalance();
    this.props.showPayment(false, null);
  }

  // TODO: show payment options for example Paypal link or sms notification

  // Can payment modal be seperated into a new component?
  render() {
    const friendRequests = this.props.contactList
      .filter(contact => !contact.approved)
      .map(contact => contact.contact_id);

    return (
      <div>
        <TitleBar
          title={`Balance: £${this.props.balances.userBalance.toFixed(2)}`}
          previous="login"
          getStage={this.props.getStage}
          stage={this.props.stage}
        />
        <div className="balances__add-contact">
          <input
            className="balances__search"
            type="text"
            placeholder="Search for contacts..."
            onChange={this.props.handleContactSearch}
            value={this.props.contactSearchString}
          />
          <ul>
            {this.props.contactSearchResults.map(result => (
              <div key={result.id}>
                <li>{result.username}</li>
                <button type="button" onClick={() => this.props.addContact(result.id)}>
                  Add to contacts
                </button>
              </div>
            ))}
          </ul>
        </div>
        {!Object.keys(this.props.balances.counterpartBalances).length && (
          <div>It feels lonely in here... Add your friends by searching above!</div>
        )}
        <div className="counterpart-list">
          {Object.keys(this.props.balances.counterpartBalances).map(key => (
            <BalanceItem
              key={key}
              contactId={key}
              contact={this.props.balances.counterpartBalances[key]}
              friendRequests={friendRequests}
              approveContact={this.props.approveContact}
              showPayment={this.props.showPayment}
            />
          ))}
        </div>

        <div
          className={this.paymentClassName()}
          role="dialog"
          onClick={event => this.showModal(event)}
        >
          <div className="payment__content">
            <button className="payment-btn" type="button" onClick={() => this.markPaid()}>
              Mark Paid
            </button>
            <button className="payment-btn" type="button" onClick={() => this.requestPayment()}>
              Request Payment
            </button>
            <p onClick={() => this.props.showPayment(false, null)}>CLOSE</p>
          </div>
        </div>

        {/* <CounterpartList users={users} balances={balances} /> */}
        <button
          type="button"
          className="new-round-btn"
          onClick={() => this.props.getStage('newRound')}
        >
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
  settleBalance: PropTypes.func.isRequired,
  fetchBalances: PropTypes.func.isRequired,
  handleContactSearch: PropTypes.func.isRequired,
  contactSearchResults: PropTypes.array.isRequired,
  addContact: PropTypes.func.isRequired,
  contactSearchString: PropTypes.string.isRequired,
  stage: PropTypes.string.isRequired,
  contactList: PropTypes.array.isRequired,
  approveContact: PropTypes.func.isRequired,
  fetchRoundHistory: PropTypes.func.isRequired,
};

export default Balances;
