import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import TitleBar from './TitleBar';
import BalanceItem from './BalanceItem';
import '../../styles/components/Balances.scss';

class Balances extends React.Component {
  // componentDidMount() {
  //   this.props.fetchBalances(this.props.userId);
  //   this.props.fetchRoundHistory(this.props.userId);
  // }

  paymentClassName(close) {
    return cx('payment', {
      'payment--closed': this.props.payment.payment || close,
    });
  }

  showModal(event, close) {
    if (event.target.className === 'payment payment--closed' || close) {
      this.props.showPayment(false, null);
    }
  }

  markPaid() {
    this.props.settleBalance();
    this.props.showPayment(false, null);
  }

  // TODO: show payment options for example Paypal link or sms notification

  render() {
    const friendRequests = this.props.contacts.contactList
      .filter((contact) => !contact.approved)
      .map((contact) => contact.contact_id);

    return (
      <div className="balances-container">
        <TitleBar
          title={`Balance: £${this.props.balances.userBalance.toFixed(2)}`}
          previous="login"
          getStage={this.props.getStage}
          stage={this.props.stage}
          logoutUser={this.props.logoutUser}
        />
        <div className="balances-content">
          <div className="balances__add-contact">
            <input
              className="balances__search"
              type="text"
              placeholder="Search for contacts..."
              onChange={this.props.handleContactSearch}
              value={this.props.contacts.search.searchString}
            />
            <ul className="balances__contact-list">
              {this.props.contacts.search.searchResults.map((result) => (
                <li key={result.id}>
                  <div
                    className="balances__contact-item"
                    onClick={() => this.props.addContact(result.id)}
                    role="button"
                    tabIndex={0}
                  >
                    <img
                      className="balances-search__avatar"
                      src={
                        result.avatar === ''
                          ? `https://ui-avatars.com/api/rounded=true?name=${
                            result.username
                          }&size=50&background=eaae60`
                          : result.avatar
                      }
                      alt="avatar"
                    />
                    <div className="balances__contact-details">
                      <div className="balances__contact-item__user">{result.username}</div>
                      <div className="balances__contact-item__email">{result.email}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {!Object.keys(this.props.balances.counterpartBalances).length && (
            <div className="lonely-message">
              It feels lonely in here... Add your friends by searching above!
            </div>
          )}
          <div className="counterpart-list">
            {Object.keys(this.props.balances.counterpartBalances)
              .sort(
                (a, b) =>
                  (this.props.balances.counterpartBalances[a].sum >
                  this.props.balances.counterpartBalances[b].sum
                    ? 1
                    : -1),
              )
              .sort((a) => (this.props.balances.counterpartBalances[a].sum === '0.00' ? 1 : -1))
              .map((key) => (
                <BalanceItem
                  key={key}
                  contactId={key}
                  contact={this.props.balances.counterpartBalances[key]}
                  friendRequests={friendRequests}
                  approveContact={this.props.approveContact}
                  showPayment={this.props.showPayment}
                  contacts={this.props.contacts}
                />
              ))}
          </div>

          <div
            className={this.paymentClassName()}
            role="dialog"
            onClick={(event) => this.showModal(event)}
          >
            <div className="payment__content">
              <button className="payment-btn" type="button" onClick={() => this.markPaid()}>
                Mark Paid
              </button>
              {this.props.payment.receiverId &&
                this.props.balances.counterpartBalances[this.props.payment.receiverId].sum < 0 && (
                  <button
                    className="payment-btn"
                    type="button"
                    onClick={() => this.requestPayment()}
                  >
                    Request Payment
                  </button>
              )}
              <p onClick={() => this.props.showPayment(false, null)}>CLOSE</p>
            </div>
          </div>
        </div>
        {/* <CounterpartList users={users} balances={balances} /> */}
        <div className="button-container">
          {' '}
          <button
            type="button"
            className="new-round-btn"
            onClick={() => this.props.getStage('newRound')}
          >
            NEW TAB
          </button>
        </div>
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
  addContact: PropTypes.func.isRequired,
  stage: PropTypes.string.isRequired,
  contacts: PropTypes.object.isRequired,
  approveContact: PropTypes.func.isRequired,
  fetchRoundHistory: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default Balances;
