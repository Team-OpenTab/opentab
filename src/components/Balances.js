import React from 'react';
import PropTypes from 'prop-types';
import TitleBar from './TitleBar';
import Button from './Button';
import UserList from './UserList';
import '../../styles/components/TitleBar.scss';

function Balances({ users, balances, goBack, handleButtonClick }) {
  return (
    <div>
      <TitleBar title="Balance:" previous="App" goBack={goBack} />
      <UserList users={users} balances={balances} />
      <Button
        buttonLabel="New Round"
        buttonDestination="newRound"
        handleButtonClick={handleButtonClick}
      />
    </div>
  );
}

Balances.propTypes = {
  users: PropTypes.object.isRequired,
  balances: PropTypes.object.isRequired,
  goBack: PropTypes.func.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
};

export default Balances;
