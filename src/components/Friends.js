import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Friends.scss';

function Friends({ handleContactSearch, addContact, contacts, approveContact }) {
  const friendRequests = contacts.contactList
    .filter((contact) => !contact.approved)
    .map((contact) => contact.contact_id);

  return (
    <div className="friends__container">
      <div className="friends__content">
        <div className="friends__add-contact">
          <input
            className="friends__search"
            type="text"
            placeholder="Search for contacts..."
            onChange={handleContactSearch}
            value={contacts.search.searchString}
          />
          <ul className="friends__contact-list">
            {contacts.search.searchResults.map((result) => (
              <li key={result.id}>
                <div
                  className="friends__contact-item"
                  onClick={() => addContact(result.id)}
                  role="button"
                  tabIndex={0}
                >
                  <img
                    className="friends__search-avatar"
                    src={
                      result.avatar === ''
                        ? `https://ui-avatars.com/api/rounded=true?name=${
                          result.username
                        }&size=50&background=eaae60`
                        : result.avatar
                    }
                    alt="avatar"
                  />
                  <div className="friends__contact-details">
                    <div className="friends__contact-item__user">{result.username}</div>
                    <div className="friends__contact-item__email">{result.email}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {!contacts.contactList.length && (
          <div className="friends__lonely-message">
            It feels lonely in here... Add your friends by searching above!
          </div>
        )}
        <div className="friends__list">
          {contacts.contactList.map((contact) => (
            <div key={contact.contact_id} className="friend-container">
              <img
                className="friend-container__avatar"
                src={
                  contact.avatar === ''
                    ? `https://ui-avatars.com/api/rounded=true?name=${
                      contact.username
                    }&size=50&background=eaae60`
                    : contact.avatar
                }
                alt="avatar"
              />
              <div className="friend-container__details">
                <div className="friend-container__name">{contact.username}</div>
                <div className="friend-container__email">{contact.email}</div>
                <div className="friend-container__phone">{contact.phone}</div>
              </div>
              {friendRequests.includes(contact.contact_id) && (
                <button
                  className="friend-container__approve-btn"
                  type="button"
                  onClick={() => approveContact(contact.contact_id)}
                >
                  Approve
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Friends.propTypes = {
  handleContactSearch: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
  contacts: PropTypes.object.isRequired,
  approveContact: PropTypes.func.isRequired,
};

export default Friends;
