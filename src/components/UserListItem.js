import React from 'react';
import PropTypes from 'prop-types';

function UserListItem({ user, userId, balances }) {
  return (
    <li className="user-list__item" id={userId}>
      {user} - {balances.counterpartBalances[userId]}
    </li>
  );
}

UserListItem.propTypes = {
  user: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  balances: PropTypes.object.isRequired,
};

export default UserListItem;
