import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import TitleBar from './TitleBar';
import BalanceItem from './BalanceItem';
import '../../styles/components/Balances.scss';

function Balances({
  balances,
  getStage,
  showPayment,
  payment,
  settleBalance,
  handleContactSearch,
  addContact,
  stage,
  contacts,
  approveContact,
  logoutUser,
}) {
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

  const friendRequests = contacts.contactList
    .filter((contact) => !contact.approved)
    .map((contact) => contact.contact_id);

  return (
    <div className="balances-container">
      <TitleBar
        title={`Balance: £${balances.userBalance.toFixed(2)}`}
        previous="login"
        getStage={getStage}
        stage={stage}
        logoutUser={logoutUser}
      />
      <div className="balances-content">
        <div className="balances__add-contact">
          <input
            className="balances__search"
            type="text"
            placeholder="Search for contacts..."
            onChange={handleContactSearch}
            value={contacts.search.searchString}
          />
          <ul className="balances__contact-list">
            {contacts.search.searchResults.map((result) => (
              <li key={result.id}>
                <div
                  className="balances__contact-item"
                  onClick={() => addContact(result.id)}
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
        {!Object.keys(balances.counterpartBalances).length && (
          <div className="lonely-message">
            It feels lonely in here... Add your friends by searching above!
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
            .map((key) => (
              <BalanceItem
                key={key}
                contactId={key}
                contact={balances.counterpartBalances[key]}
                friendRequests={friendRequests}
                approveContact={approveContact}
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
  handleContactSearch: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
  stage: PropTypes.string.isRequired,
  contacts: PropTypes.object.isRequired,
  approveContact: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default Balances;
