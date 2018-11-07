import React from 'react';
import PropTypes from 'prop-types';
import Counterpart from './Counterpart';

function CounterpartList({ users, balances }) {
  return (
    <ul className="user-list">
      {Object.keys(users).map(user => (
        <Counterpart
          key={user}
          user={users[user]}
          userId={Object.keys(users)[0]}
          balances={balances}
        >
          {user}
        </Counterpart>
      ))}
    </ul>
  );
}

CounterpartList.propTypes = {
  users: PropTypes.object.isRequired,
  balances: PropTypes.object.isRequired,
};

export default CounterpartList;
