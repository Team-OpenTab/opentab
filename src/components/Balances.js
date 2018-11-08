import React from 'react';
import PropTypes from 'prop-types';
import TitleBar from './TitleBar';
// import CounterpartList from './CounterpartList';
import '../../styles/components/TitleBar.scss';

function Balances({ balances, getStage }) {
  return (
    <div>
      <TitleBar title="Balance:" previous="App" />
      {Object.keys(balances.counterpartBalances).map(key => (
        <div key={key}>
          <div>User {key}</div>
          <div>Owes £{balances.counterpartBalances[key]}</div>
          <button type="button">Pay</button>
        </div>
      ))}

      {/* <CounterpartList users={users} balances={balances} /> */}
      <button type="button" className="button" onClick={() => getStage('newRound')}>
        NEW ROUND
      </button>
    </div>
  );
}

Balances.propTypes = {
  users: PropTypes.object,
  balances: PropTypes.object.isRequired,
  getStage: PropTypes.func.isRequired,
};

export default Balances;
