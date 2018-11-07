import React from 'react';
import PropTypes from 'prop-types';
import TitleBar from './TitleBar';
import '../../styles/components/TitleBar.scss';

function Balances({ goBack }) {
  return (
    <div>
      <TitleBar title="Balance:" previous="App" goBack={goBack} />
    </div>
  );
}

Balances.propTypes = {
  goBack: PropTypes.func.isRequired,
};

export default Balances;
