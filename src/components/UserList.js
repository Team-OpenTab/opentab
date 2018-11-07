import React from 'react';
import PropTypes from 'prop-types';
import UserListItem from './UserListItem';

function UserList({ users, balances }) {
  return (
    <ul className="user-list">
      {Object.keys(users).map(user => (
        <UserListItem
          key={user}
          user={users[user]}
          userId={Object.keys(users)[0]}
          balances={balances}
        >
          {user}
        </UserListItem>
      ))}
    </ul>
  );
}

UserList.propTypes = {
  users: PropTypes.object.isRequired,
  balances: PropTypes.object.isRequired,
};

export default UserList;
