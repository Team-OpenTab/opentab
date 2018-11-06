import React from 'react';
import PropTypes from 'prop-types';
import UserList from './UserList';
import TitleBar from './TitleBar';
import '../../styles/components/TitleBar.scss';

function Balances({ goBack }) {
  return (
    <div>
      <TitleBar title="Balance:" previous="App" goBack={goBack} />
      <UserList />
    </div>
  );
}

Balances.propTypes = {
  goBack: PropTypes.object.isRequired,
};

export default Balances;
