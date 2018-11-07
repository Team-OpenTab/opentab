import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import BalancesContainer from '../containers/BalancesContainer';
import NewRoundContainer from '../containers/NewRoundContainer';

class Content extends React.Component {
  componentDidMount() {
    const { fetchBalances } = this.props;
    fetchBalances(2);
    const socket = io('localhost:8080');
    socket.on('refresh', () => {
      fetchBalances(2);
      console.log('refresh received');
    });
  }

  render() {
    const { stage } = this.props;
    return (
      <div className="app">
        {stage === 'balances' && <BalancesContainer />}
        {stage === 'newRound' && <NewRoundContainer />}
      </div>
    );
  }
}

// stage/display to be object in future
Content.propTypes = {
  stage: PropTypes.string,
  fetchBalances: PropTypes.func,
};

export default Content;
