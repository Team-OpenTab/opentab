import React from 'react';
import PropTypes from 'prop-types';
import UserList from './UserList';
import TitleBar from './TitleBar';
import Button from './Button';
import '../../styles/components/TitleBar.scss';

function Balances({ goBack, handleButtonClick }) {
  return (
    <div>
      <TitleBar title="Balance:" previous="App" goBack={goBack} />
      <UserList />
      <Button
        buttonLabel="New Round"
        buttonDestination="newRound"
        handleButtonClick={handleButtonClick}
      />
    </div>
  );
}

Balances.propTypes = {
  goBack: PropTypes.func.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
};

export default Balances;
