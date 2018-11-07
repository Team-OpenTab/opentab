import React from 'react';
import PropTypes from 'prop-types';

function Counterpart({ user, userId, balances }) {
  return (
    <li className="user-list__item" id={userId}>
      {user} - {balances.counterpartBalances[userId]}
    </li>
  );
}

Counterpart.propTypes = {
  user: PropTypes.object,
  userId: PropTypes.string,
  balances: PropTypes.object,
};

export default Counterpart;
